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
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json()); // Gebruik moderne body-parser
app.use(cors()); // Enable CORS

// Padberekening
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const leaderboardFilePath = path.join(__dirname, 'leaderboard.json');

// GET leaderboard
app.get('/api/leaderboard', (req, res) => {
  const gamemode = req.query.gamemode;

  fs.readFile(leaderboardFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading leaderboard file:', err);
      return res.status(500).send('Error reading leaderboard file');
    }

    try {
      const leaderboard = JSON.parse(data);
      const filteredLeaderboard = gamemode
        ? leaderboard.filter(entry => entry.gamemode === gamemode)
        : leaderboard;
      res.json(filteredLeaderboard);
    } catch (parseError) {
      console.error('Error parsing leaderboard file:', parseError);
      res.status(500).send('Error parsing leaderboard file');
    }
  });
});

// POST new leaderboard entry
app.post('/api/leaderboard', (req, res) => {
  const newEntry = req.body;

  fs.readFile(leaderboardFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading leaderboard file:', err);
      return res.status(500).send('Error reading leaderboard file');
    }

    try {
      const leaderboard = JSON.parse(data);
      leaderboard.push(newEntry);

      fs.writeFile(leaderboardFilePath, JSON.stringify(leaderboard, null, 2), (err) => {
        if (err) {
          console.error('Error writing to leaderboard file:', err);
          return res.status(500).send('Error writing to leaderboard file');
        }

        res.status(200).send('Leaderboard updated');
      });
    } catch (parseError) {
      console.error('Error parsing leaderboard file:', parseError);
      res.status(500).send('Error parsing leaderboard file');
    }
  });
});

// Export de express-app als een handler
export default app;
