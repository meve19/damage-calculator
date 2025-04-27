// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// "dist" フォルダを公開
app.use(express.static(path.join(__dirname, 'dist')));

// 全ルーティングをindex.htmlに飛ばす（React Router用）
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
