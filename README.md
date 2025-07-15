# ♟️ Mezon Chess Bot

Một con bot Mezon cho phép bạn chơi cờ vua trực tiếp bằng cách gửi tin nhắn như `*chess e2e4`. Bot sẽ phản đòn bằng Stockfish – engine cờ vua mạnh nhất thế giới.

---

## 🚀 Tính năng

- Nhận lệnh từ người dùng: `*chess <nước đi>`
- Kiểm tra hợp lệ bằng `chess.js`
- Phản đòn thông minh bằng Stockfish (`node-uci`)
- Giao tiếp trên nền tảng [mezon.ai](https://mezon.ai/) qua `mezon-sdk`

---

## 📦 Cài đặt

### 1. Clone repo

```bash
git clone https://github.com/tiendat2k6/mezon-chess-bot.git
cd mezon-chess-bot
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Tải và đặt **Stockfish**

- Tải bản `stockfish` tại: https://stockfishchess.org/download/
- Giải nén và **đặt file `stockfish.exe` vào thư mục `./stockfish/`**

---

## 🔑 Tạo file `.env`

Tạo file `.env` và thêm dòng sau:

```env
MEZON_API_KEY=YOUR_API_KEY
```

(*Bạn cần thay bằng key thật của mình*)

---

## ▶️ Chạy bot

```bash
...\mezon-bot-example\backend> node index.js
```

Khi thấy dòng:

```
♟️ Bot chess started!
```

→ Bạn đã sẵn sàng chơi!

---

## 🕹️ Cách sử dụng

Trên nền tảng [https://mezon.ai](https://mezon.ai), vào clan có bot, gửi:

```text
*chess e2e4
```

Bot sẽ trả lời:

```text
✅ Bạn đã đi: e2e4
🤖 Bot đi: c7c5
```

---

## 🗂️ Cấu trúc thư mục

```
mezon-chess-bot/
├── index.js           # Mã chính
├── .env               # Chứa MEZON_API_KEY
├── stockfish/         # Chứa file stockfish.exe
├── package.json       # Khai báo dependencies
└── README.md          # File hướng dẫn
```

---

## 📚 Phụ thuộc

- [chess.js](https://github.com/jhlywa/chess.js) – kiểm tra hợp lệ nước đi
- [node-uci](https://github.com/jmcerrejon/node-uci) – giao tiếp với Stockfish
- [mezon-sdk](https://www.npmjs.com/package/mezon-sdk) – SDK chính thức để tạo bot Mezon

---

## 👤 Tác giả

Phan Tiến Đạt
Lương Minh Ngọc
