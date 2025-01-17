// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const leaderboardFilePath = path.join(__dirname, 'leaderboard.json');

// // GET leaderboard
// app.get('/api/leaderboard', (req, res) => {
//   const gamemode = req.query.gamemode;
//   fs.readFile(leaderboardFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error reading leaderboard file');
//     }
//     try {
//       const leaderboard = JSON.parse(data);
//       const filteredLeaderboard = leaderboard.filter(entry => entry.gamemode === gamemode);
//       res.send(filteredLeaderboard);
//     } catch (parseError) {
//       console.error(parseError);
//       res.status(500).send('Error parsing leaderboard file');
//     }
//   });
// });

// // POST new leaderboard entry
// app.post('/api/leaderboard', (req, res) => {
//   const newEntry = req.body;
//   console.log('Received new entry:', newEntry); // Log the received entry

//   fs.readFile(leaderboardFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error reading leaderboard file');
//     }

//     try {
//       const leaderboard = JSON.parse(data);
//       leaderboard.push(newEntry);
//       console.log('Updated leaderboard:', leaderboard); // Log the updated leaderboard

//       fs.writeFile(leaderboardFilePath, JSON.stringify(leaderboard, null, 2), (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Error writing to leaderboard file');
//         }

//         res.status(200).send('Leaderboard updated');
//       });
//     } catch (parseError) {
//       console.error(parseError);
//       res.status(500).send('Error parsing leaderboard file');
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express from 'express';
import fs from 'fs/promises'; // Gebruik fs.promises voor eenvoudiger werken met async/await
import path from 'path';
import cors from 'cors';

const app = express();
app.use(express.json()); // Gebruik moderne body-parser
app.use(cors()); // Enable CORS

// Padberekening
const leaderboardFilePath = path.resolve(process.cwd(), 'leaderboard.json');

// GET leaderboard
app.get('/api/leaderboard', async (req, res) => {
  const gamemode = req.query.gamemode;

  try {
    const data = await fs.readFile(leaderboardFilePath, 'utf8');
    const leaderboard = JSON.parse(data);
    const filteredLeaderboard = gamemode
      ? leaderboard.filter(entry => entry.gamemode === gamemode)
      : leaderboard;
    res.json(filteredLeaderboard);
  } catch (err) {
    console.error('Error reading or parsing leaderboard file:', err);
    res.status(500).send('Error reading or parsing leaderboard file');
  }
});

// POST new leaderboard entry
app.post('/api/leaderboard', async (req, res) => {
  const newEntry = req.body;

  try {
    const data = await fs.readFile(leaderboardFilePath, 'utf8');
    const leaderboard = JSON.parse(data);
    leaderboard.push(newEntry);

    await fs.writeFile(leaderboardFilePath, JSON.stringify(leaderboard, null, 2));
    res.status(201).send('Leaderboard updated');
  } catch (err) {
    console.error('Error reading or writing leaderboard file:', err);
    res.status(500).send('Error reading or writing leaderboard file');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export de express-app als een handler
export default app;
