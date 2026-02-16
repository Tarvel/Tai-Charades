import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POINTS = { easy: 10, medium: 25, hard: 50 };

const GameScreen = ({ category, difficulty, data, group, groups, onTurnEnd }) => {
    const [word, setWord] = useState('');
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [showResult, setShowResult] = useState(null);

    useEffect(() => {
        if (data[category] && data[category][difficulty]) {
            const words = data[category][difficulty];
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setWord(randomWord);
        }
    }, [category, difficulty, data]);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const handleResult = (won) => {
        setIsTimerRunning(false);
        setShowResult(won ? 'win' : 'fail');
        const points = won ? POINTS[difficulty] : 0;
        setTimeout(() => onTurnEnd(points), 1200);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen py-8 px-4 relative">
            {/* HUD */}
            <div className="w-full max-w-2xl">
                {/* Multi-group score bar */}
                <div className="flex flex-wrap justify-center gap-4 font-pixel text-[8px] md:text-[10px] mb-4 px-2">
                    {groups.map(g => (
                        <div key={g.id} style={{ color: g.color, fontWeight: g.id === group.id ? 'bold' : 'normal' }}>
                            {g.name}: {g.score}
                        </div>
                    ))}
                </div>

                {/* Group + Timer row */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] text-gray-400 mb-1 font-pixel">NOW PLAYING</span>
                        <span className="text-sm font-pixel" style={{ color: group.color }}>{group.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-gray-400 mb-1 font-pixel">STOPWATCH</span>
                        <span className={`text-xl font-pixel ${isTimerRunning ? 'text-neon-lime animate-pulse' : 'text-gray-500'}`}>
                            {formatTime(timeElapsed)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Word Box */}
            <div className="flex-1 flex items-center justify-center w-full relative">
                <AnimatePresence mode="wait">
                    {showResult ? (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                        >
                            <div className={`text-5xl md:text-7xl font-pixel mb-4 ${showResult === 'win' ? 'text-neon-lime' : 'text-red-500'}`}>
                                {showResult === 'win' ? 'CORRECT!' : 'FAIL!'}
                            </div>
                            {showResult === 'win' && (
                                <div className="text-neon-lime text-xl font-pixel">+{POINTS[difficulty]} PTS</div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center gap-8">
                            <motion.div
                                key="word"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -8, 8, -8, 0],
                                }}
                                transition={{
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    duration: 0.5,
                                }}
                                className="raised-card w-full max-w-md aspect-video flex flex-col items-center justify-center"
                                style={{ borderColor: group.color }}
                            >
                                <span className="text-[8px] text-gray-500 mb-3 font-pixel uppercase">
                                    {category.replace('_', ' ')} // {difficulty}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-pixel text-white text-center px-4 leading-relaxed">
                                    {word || "LOADING..."}
                                </h2>
                            </motion.div>

                            {!timerStarted && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setIsTimerRunning(true);
                                        setTimerStarted(true);
                                    }}
                                    className="arcade-button bg-neon-cyan text-black font-pixel px-8 py-4 text-sm"
                                >
                                    START TIMER
                                </motion.button>
                            )}

                            {isTimerRunning && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsTimerRunning(false)}
                                    className="arcade-button bg-orange-500 text-black font-pixel px-8 py-4 text-sm"
                                >
                                    STOP TIMER
                                </motion.button>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* WIN / FAIL Buttons */}
            {!showResult && (
                <div className="flex gap-6 w-full max-w-md mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResult(false)}
                        className="arcade-button bg-red-600 flex-1 font-pixel py-7 text-white text-xl"
                    >
                        FAIL
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResult(true)}
                        className="arcade-button bg-green-600 flex-1 font-pixel py-7 text-white text-xl"
                    >
                        WIN
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default GameScreen;
