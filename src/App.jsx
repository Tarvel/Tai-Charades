import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Background from './components/Background';
import StartScreen from './components/StartScreen';
import DifficultySelection from './components/DifficultySelection';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import TurnBanner from './components/TurnBanner';
import charadesData from '../Charades_Data.json';

const themes = [
  { id: 'music', label: 'MUSIC', color: '#00ffff' },
  { id: 'sports', label: 'SPORTS', color: '#ff00ff' },
  { id: 'locations', label: 'PLACES', color: '#00ff00' },
  { id: 'movies_tv', label: 'MOVIES/TV', color: '#ffff00' },
  { id: 'actions_jobs', label: 'JOBS', color: '#ff0000' },
];

const App = () => {
  const [gameState, setGameState] = useState('START');
  const [groups, setGroups] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [totalRounds, setTotalRounds] = useState(5);
  const [turnsPlayed, setTurnsPlayed] = useState(0);

  const currentGroup = groups[currentGroupIndex] || { name: 'GROUP', color: '#fff', score: 0 };

  const handleStartGame = (groupNames, rounds) => {
    const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];
    const newGroups = groupNames.map((name, i) => ({
      id: i,
      name: name || `GROUP ${String.fromCharCode(65 + i)}`,
      score: 0,
      color: colors[i % colors.length]
    }));

    setGroups(newGroups);
    setTotalRounds(rounds * newGroups.length);
    setTurnsPlayed(0);
    setCurrentGroupIndex(0);
    setGameState('TURN_BANNER');
  };

  const handleTurnEnd = useCallback((pointsScored) => {
    setGroups(prev => prev.map((g, i) =>
      i === currentGroupIndex ? { ...g, score: g.score + pointsScored } : g
    ));

    const newTurnsPlayed = turnsPlayed + 1;
    setTurnsPlayed(newTurnsPlayed);

    if (newTurnsPlayed >= totalRounds) {
      setGameState('GAMEOVER');
    } else {
      setCurrentGroupIndex((currentGroupIndex + 1) % groups.length);
      setGameState('TURN_BANNER');
    }
  }, [currentGroupIndex, turnsPlayed, totalRounds, groups.length]);

  const handleRestart = () => {
    setGameState('START');
    setGroups([]);
    setCurrentGroupIndex(0);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setTurnsPlayed(0);
  };

  return (
    <div className="relative min-h-screen w-full font-pixel overflow-hidden">
      <Background />
      <main className="relative z-10">
        {gameState === 'START' && (
          <StartScreen onStartGame={handleStartGame} />
        )}

        {gameState === 'TURN_BANNER' && (
          <TurnBanner
            group={currentGroup}
            groups={groups}
            roundNumber={Math.floor(turnsPlayed / groups.length) + 1}
            totalRounds={totalRounds / groups.length}
            onReady={() => setGameState('THEME')}
          />
        )}

        {gameState === 'THEME' && (
          <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <ScoreBar groups={groups} />
            <div className="mb-6 font-pixel text-sm" style={{ color: currentGroup.color }}>
              {currentGroup.name}'S TURN
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-2xl font-pixel mb-10 text-white"
            >
              CHOOSE THEME
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedCategory(theme.id);
                    setGameState('DIFFICULTY');
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-black flex items-center justify-center text-[8px] md:text-xs p-2 text-center font-pixel shadow-retro-raised"
                    style={{ backgroundColor: theme.color, color: '#000' }}
                  >
                    {theme.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'DIFFICULTY' && (
          <DifficultySelection
            group={currentGroup}
            onSelectDifficulty={(d) => {
              setSelectedDifficulty(d);
              setGameState('PLAYING');
            }}
            onBack={() => setGameState('THEME')}
          />
        )}

        {gameState === 'PLAYING' && (
          <GameScreen
            category={selectedCategory}
            difficulty={selectedDifficulty}
            data={charadesData}
            group={currentGroup}
            groups={groups}
            onTurnEnd={handleTurnEnd}
          />
        )}

        {gameState === 'GAMEOVER' && (
          <GameOverScreen
            groups={groups}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
};

const ScoreBar = ({ groups }) => (
  <div className="w-full max-w-2xl flex flex-wrap justify-center gap-4 font-pixel text-[8px] md:text-[10px] mb-8 px-4">
    {groups.map(group => (
      <div key={group.id} style={{ color: group.color }}>
        {group.name}: {group.score}
      </div>
    ))}
  </div>
);

export default App;
