const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");

dotenv.config();

async function main() {
  const client = new MezonClient(process.env.APPLICATION_TOKEN);

  await client.login();

  client.onChannelMessage(async (event) => {
    if (event?.content?.t === "*ping") {
      const channelFetch = await client.channels.fetch(event.channel_id)
      const messageFetch = await channelFetch.messages.fetch(event.message_id)
      await messageFetch.reply({ t: 'pong' })
    }
  })
}

main()
  .then(() => {
    console.log("bot start!");
  })
  .catch((error) => {
    console.error(error);
  });
