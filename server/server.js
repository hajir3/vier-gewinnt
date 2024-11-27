import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { checkWinner } from '../client/logic/winLogic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Endpoint to check for a winner
app.post('/check-winner', express.json(), (req, res) => {
  const { board } = req.body;
  const winner = checkWinner(board);
  res.json({ winner });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});