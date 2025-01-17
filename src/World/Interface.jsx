import React, { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";
import axios from 'axios';

const Interface = ({ setSelectedEnvironment }) => {
  const time = useRef();
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const pause = useGame((state) => state.pause);
  const phase = useGame((state) => state.phase);
  const fails = useGame((state) => state.fails);
  const setGamemode = useGame((state) => state.setGamemode);
  // const setEnvironment = useGame((state) => state.setEnvironment);
  const gamemode = useGame((state) => state.gamemode);

  const audio = useGame((state) => state.audio);

  const [failCount, setFailCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFinishForm, setShowFinishForm] = useState(false);
  const [showGamemodeSelection, setShowGamemodeSelection] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedGamemode, setSelectedGamemode] = useState("easy");

  /*
  *
  * keys
  *   
  */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showGamemodeSelection) {
          setShowGamemodeSelection(false);
          setMenuOpen(true);
        } else if (showLeaderboard) {
          setShowLeaderboard(false);
          setMenuOpen(true);
        } else if (showEnvironment){
          setShowEnvironment(false);
          setMenuOpen(true);
        } else {
          if (!menuOpen) {
            document.exitPointerLock();
          } else {
            document.body.requestPointerLock();
          }
          setMenuOpen((prev) => !prev);
          pause();
        }
      } else if (event.key === "z") { 
        start(); // Start the game when "Z" is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, pause, start, showGamemodeSelection, showLeaderboard, showEnvironment]);

  /*
  *
  * Time
  *   
  */
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  /*
  *
  * Fails
  *   
  */
  useEffect(() => {
    setFailCount(fails);
  },[fails])

  /*
  *
  * end
  *   
  */
  useEffect(() => {
    if (phase === "ended") {
      setShowFinishForm(true);
      document.exitPointerLock(); // Release pointer lock when game ends
    }
  }, [phase]);

  const handleRestart = () => {
    restart();
    setMenuOpen(false);
    document.body.requestPointerLock();
  };

  /*
  *
  * gamemode
  *   
  */
  const handleSetGamemode = (mode) => {
    setGamemode(mode);
    setMenuOpen(false);
    document.body.requestPointerLock();
  };

  /*
  *
  * environment
  *   
  */
  // const handleSetEnvironment = (env) => {
  //   setEnvironment(env);
  //   setMenuOpen(false);
  //   document.body.requestPointerLock();
  // }


  /*
  *
  * Leaderboard
  *   
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEntry = {
      name: playerName,
      time: parseFloat(time.current.textContent) ,
      fails: failCount,
      gamemode: gamemode, // Include the gamemode
    };
    console.log("Submitting leaderboard entry:", newEntry);

    try {
      await axios.post('https://jump-thrs.vercel.app/api/leaderboard', newEntry);
      setShowFinishForm(false);
      setPlayerName("");
      fetchLeaderboard();
      setShowLeaderboard(true); // Show leaderboard after submitting the score
      restart(); // Reset the game after submitting the score
    } catch (error) {
      console.error("Error submitting leaderboard entry:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('https://jump-thrs.vercel.app/api/leaderboard', {
        params: { gamemode: selectedGamemode } // Include the gamemode as a query parameter
      });
      console.log(response.data); // Log the response data for debugging
      if (response.headers['content-type'].includes('application/json')) {
        setLeaderboard(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };
  

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGamemode]);

  /////////
  //MUSIC//
  /////////
  const handleNextSong = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      const audioFiles = ["/Tetris.mp3", "/CrayaSIEP C.mp3", "/Granula4.mp3", "/KILLINGNAME.mp3", "/overthinking_V3.mp3", "/TEKHOUSE_V1.mp3", "/Tinnitus.mp3"];
      const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const newAudio = new Audio(randomAudioFile);
      newAudio.loop = true;
      newAudio.volume = 0.2;
      newAudio.play();
      useGame.getState().setAudio(newAudio);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "n" || event.key === "N") {
        handleNextSong();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audio]);

  /////////
  //RETURN//
  /////////
  return (
    <div className="interface">
      {/* Finish Form */}
      {showFinishForm && (
        <div className="finish-form" style={{ pointerEvents: 'auto' }}>
          <h2>Congratulations! Enter your name:</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Fails */}
      <div className="fail-count">
          {failCount} Fails
      </div>

      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Menu esc */}
        {!menuOpen && !showGamemodeSelection && !showLeaderboard && !showEnvironment && (
          <div className="esc">
            Esc for Menu
          </div>
        )}

        {/* Next Song */}
      {/* <div className="song">
        <p>Press N for Next Song</p>
      </div> */}



      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>Z</div>
        </div>
        <div className="raw">
          <div className={`key ${left ? "active" : ""}`}>Q</div>
          <div className={`key ${backward ? "active" : ""}`}>S</div>
          <div className={`key ${right ? "active" : ""}`}>D</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}>Space</div>
        </div>
      </div>

      {/* Menu */}
      {menuOpen && (
        <div className="menu" style={{ pointerEvents: 'auto' }}>
          <h2>Menu</h2>
          {/* restart */}
          <button onClick={handleRestart}>Restart</button>
          {/* gamemode */}
          <button onClick={() =>  { setShowGamemodeSelection(true); setMenuOpen(false); }}>Gamemode</button>
          {/* leaderboard */}
          <button onClick={() => { fetchLeaderboard(); setShowLeaderboard(true); setMenuOpen(false) }}>Leaderboard</button>
          {/* Environment */}
          <button onClick={() => { setMenuOpen(false); setShowEnvironment(true) }}>Environment</button>
          
          {/* Voeg hier meer menu-opties toe */}
          
          {/* Esc */}
          <p>Press Esc to close</p>
        </div>
      )}

      {/* Gamemode Selection */}
      {showGamemodeSelection && (
        <div className="menu" style={{ pointerEvents: 'auto' }}>
          <h2>Select Gamemode</h2>
          <button onClick={() => { handleRestart(); setShowGamemodeSelection(false); handleSetGamemode("easy")}}>Easy Mode</button>
          <button onClick={() => { handleRestart(); setShowGamemodeSelection(false); handleSetGamemode("normal")}}>Normal Mode</button>
          <button onClick={() => { handleRestart(); setShowGamemodeSelection(false); handleSetGamemode("hard")}}>Hard Mode</button>
          {/* Esc */}
          <p>Press Esc to close</p>
        </div>
      )}

      {/* leaderboard Selection */}
        {showLeaderboard && (
          <div className="menu" style={{ pointerEvents: 'auto' }}>
            <h3>Leaderboard</h3>
            <div className="gamemode-tabs">
              <button onClick={() => setSelectedGamemode("easy")}>Easy</button>
              <button onClick={() => setSelectedGamemode("normal")}>Normal</button>
              <button onClick={() => setSelectedGamemode("hard")}>Hard</button>
            </div>
            <ul>
              {Array.isArray(leaderboard) && leaderboard
          .filter(entry => entry.gamemode === selectedGamemode)
          .sort((a, b) => a.time - b.time || a.fails - b.fails) // Sort by time, then by fails
          .map((entry, index) => (
            <li key={index}>
              {entry.name}: {entry.time}s, {entry.fails} fails
            </li>
          ))}
            </ul>
            {/* Esc */}
          <p>Press Esc to close</p>
        </div>
      )}

      {/* envirement Selection */}
      {showEnvironment && (
        <div className="menu" style={{ pointerEvents: 'auto' }}>
          <h2>Select Environment</h2>
          {/* <button onClick={() => { setShowEnvironment(false); setShowStartWindow(true); handleSetEnvironment("autumn_field_puresky_4k.hdr") }}>Sky</button>
          <button onClick={() => { setShowEnvironment(false); setShowStartWindow(true); handleSetEnvironment("rogland_clear_night_4k.hdr")}}>Desert</button>
          <button onClick={() => { setShowEnvironment(false); setShowStartWindow(true); handleSetEnvironment("overcast_soil_puresky_4k.hdr") }}>Clouds</button> */}
          
          <button onClick={() => setSelectedEnvironment("hdr/autumn_field_puresky_4k.hdr")}>Blue Sky</button>
          <button onClick={() => setSelectedEnvironment("hdr/rogland_clear_night_4k.hdr")}>Night Dessert</button>
          <button onClick={() => setSelectedEnvironment("hdr/overcast_soil_puresky_4k.hdr")}>Heavenly Clouds</button>
         
          {/* Esc */}
          <p>Press Esc to close</p>
        </div>
      )}
    </div>
  );
};

export default Interface;
