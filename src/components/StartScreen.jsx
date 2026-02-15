import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GROUP_COLORS = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];

const StartScreen = ({ onStartGame }) => {
    const [numGroups, setNumGroups] = useState(2);
    const [names, setNames] = useState(['', '', '', '']);
    const [rounds, setRounds] = useState(5);

    const updateName = (index, value) => {
        setNames(prev => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    };

    const handleStart = () => {
        const groupNames = names.slice(0, numGroups);
        onStartGame(groupNames, rounds);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-y-auto">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-5xl font-pixel mb-3 neon-text-cyan leading-tight"
            >
                TAI'S
            </motion.h1>
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-pixel mb-10 neon-text-cyan leading-tight"
            >
                CHARADES
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="raised-card w-full max-w-sm mb-6"
            >
                {/* Number of Groups */}
                <label className="block text-white text-[10px] mb-3 text-left font-pixel">NUM GROUPS</label>
                <div className="flex gap-3 mb-6">
                    {[2, 3, 4].map((n) => (
                        <button
                            key={n}
                            onClick={() => setNumGroups(n)}
                            className={`arcade-button text-xs px-5 py-3 font-pixel ${numGroups === n ? 'bg-neon-lime text-black' : 'bg-gray-800 text-gray-400'
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                {/* Group Name Inputs */}
                {Array.from({ length: numGroups }).map((_, i) => (
                    <div key={i} className="mb-4">
                        <label
                            className="block text-[10px] mb-2 text-left font-pixel"
                            style={{ color: GROUP_COLORS[i] }}
                        >
                            GROUP {String.fromCharCode(65 + i)} NAME
                        </label>
                        <input
                            type="text"
                            value={names[i]}
                            onChange={(e) => updateName(i, e.target.value)}
                            placeholder={`GROUP ${String.fromCharCode(65 + i)}`}
                            maxLength={12}
                            className="w-full bg-black border-2 font-pixel text-xs p-3 outline-none placeholder-gray-600"
                            style={{ borderColor: GROUP_COLORS[i], color: GROUP_COLORS[i] }}
                        />
                    </div>
                ))}

                {/* Rounds */}
                <label className="block text-neon-lime text-[10px] mb-3 text-left font-pixel mt-4">ROUNDS</label>
                <div className="flex gap-3 justify-center">
                    {[3, 5, 7, 10].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRounds(r)}
                            className={`arcade-button text-xs px-4 py-3 font-pixel ${rounds === r ? 'bg-neon-lime text-black' : 'bg-gray-800 text-gray-400'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
                className="arcade-button bg-neon-lime text-black font-pixel px-10 py-5 text-lg"
            >
                START GAME
            </motion.button>

            <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-gray-500 font-pixel text-[8px]"
            >
                GAME MASTER MODE // {numGroups} GROUPS
            </motion.p>
        </div>
    );
};

export default StartScreen;
