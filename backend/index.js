const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");
const { Chess } = require("chess.js");
const { Engine } = require("node-uci");

dotenv.config();

const games = new Map(); // Mỗi channel là 1 ván cờ

async function startNewEngine() {
  const engine = new Engine("./stockfish/stockfish.exe");
  await engine.init();
  return engine;
}

async function playBotMove(chess, engine) {
  await engine.position(chess.fen());
  const result = await engine.go({ depth: 15 }); // chơi tốt nhưng vẫn nhanh
  const move = result.bestmove;
  chess.move(move);
  return move;
}

async function main() {
  const client = new MezonClient(process.env.MEZON_API_KEY);
  await client.login();

  client.onChannelMessage(async (event) => {
    const message = event?.content?.t;
    const channel_id = event.channel_id;
    const message_id = event.message_id;

    if (!message || !message.startsWith("*chess")) return;

    const channel = await client.channels.fetch(channel_id);
    const msg = await channel.messages.fetch(message_id);

    const args = message.trim().split(" ");
    const moveStr = args[1];

    let chess = games.get(channel_id);
    if (!chess) {
      chess = new Chess();
      games.set(channel_id, chess);
    }

    // ⚠️ Bắt lỗi khi người chơi đi sai
    try {
      chess.move(moveStr, { sloppy: true });
    } catch (err) {
      await msg.reply({
        t: `❌ Nước đi "${moveStr}" không hợp lệ!\nCác nước đi hợp lệ: ${chess.moves().join(", ")}`
      });
      return; // Không phản đòn, cho người chơi đi lại
    }

    // ✅ Nước đi hợp lệ
    await msg.reply({ t: `✅ Bạn đã đi: ${moveStr}` });

    const engine = await startNewEngine();
    const botMove = await playBotMove(chess, engine);
    await engine.quit();

    await channel.send({ t: `🤖 Bot đi: ${botMove}` });

    if (chess.isGameOver()) {
      await channel.send({ t: "🏁 Ván cờ kết thúc!" });
      games.delete(channel_id);
    }
  });
}

main()
  .then(() => {
    console.log("♟️ Bot chess started!");
  })
  .catch((err) => {
    console.error(err);
  });
