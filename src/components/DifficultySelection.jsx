import React from 'react';
import { motion } from 'framer-motion';

const DifficultySelection = ({ group, onSelectDifficulty, onBack }) => {
    const levels = [
        { id: 'easy', label: 'EASY', color: '#00ff00', points: '+10 PTS' },
        { id: 'medium', label: 'MEDIUM', color: '#ffff00', points: '+25 PTS' },
        { id: 'hard', label: 'HARD', color: '#ff0000', points: '+50 PTS' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <div className="mb-4 font-pixel text-sm" style={{ color: group.color }}>
                {group.name}'S TURN
            </div>
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl md:text-3xl font-pixel mb-4 text-white"
            >
                SELECT GRAVITY
            </motion.h2>
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-pixel mb-12 text-white"
            >
                WELL
            </motion.h2>

            <div className="flex flex-col gap-6 w-full max-w-xs">
                {levels.map((level) => (
                    <motion.button
                        key={level.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        whileHover={{ scale: 1.1, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectDifficulty(level.id)}
                        className="arcade-button font-pixel py-5 text-lg relative"
                        style={{ backgroundColor: level.color, color: '#000' }}
                    >
                        {level.label}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] opacity-70">
                            {level.points}
                        </span>
                    </motion.button>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={onBack}
                className="mt-10 font-pixel text-gray-500 text-xs underline"
            >
                BACK TO THEMES
            </motion.button>
        </div>
    );
};

export default DifficultySelection;
