document.addEventListener('DOMContentLoaded', function () {
  console.log("✅ DOM loaded");

  // Khởi tạo game logic
  const game = new Chess();

  // Tạo bàn cờ
  const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: function (source, target) {
      const move = game.move({ from: source, to: target, promotion: 'q' });

      if (move === null) {
        return 'snapback';
      }

      updateStatus();
    }
  });

  function updateStatus() {
    const statusEl = document.getElementById('status');
    if (game.isGameOver()) {
      statusEl.textContent = '🏁 Ván cờ kết thúc!';
    } else {
      statusEl.textContent = `🔁 Lượt: ${game.turn() === 'w' ? 'Trắng' : 'Đen'}`;
    }
  }

  updateStatus();
});
