// 📁 backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo Mezon bot client
const client = new MezonClient(process.env.MEZON_API_KEY);

let channel = null; // Channel sẽ được lấy 1 lần rồi lưu lại

async function initMezon() {
  await client.login();
  console.log("✅ Đã login Mezon bot");

  // 🔗 Channel thật bạn đang dùng:
  const channelId = "1840703113489551360";
  channel = await client.channels.fetch(channelId);
  console.log("✅ Đã kết nối đến channel:", channel.name);
}

app.post("/move", async (req, res) => {
  const move = req.body.move;
  if (!move) return res.status(400).json({ error: "Thiếu nước đi" });

  try {
    // Gửi tin nhắn vào Mezon bot
    await channel.send({ t: `*chess ${move}` });
    console.log(`⬅️ Đã gửi: *chess ${move}`);
    return res.json({ status: "Đã gửi nước đi vào Mezon bot" });
  } catch (err) {
    console.error("❌ Lỗi khi gửi message:", err);
    return res.status(500).json({ error: "Gửi message thất bại" });
  }
});

// Khởi động server Express + login Mezon
app.listen(3000, async () => {
  console.log("🚀 Backend đang chạy tại http://localhost:3000");
  await initMezon();
});
