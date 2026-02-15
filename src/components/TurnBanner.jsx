import React from 'react';
import { motion } from 'framer-motion';

const TurnBanner = ({ group, groups, roundNumber, totalRounds, onReady }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            {/* Scoreboard */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="raised-card w-full max-w-md mb-10"
            >
                <div className="text-[10px] text-gray-400 mb-4 font-pixel">SCOREBOARD</div>
                <div className="flex flex-wrap justify-center gap-6">
                    {groups.map((g) => (
                        <div key={g.id} className="text-center min-w-[70px]">
                            <div className="text-[9px] mb-1 font-pixel" style={{ color: g.color }}>
                                {g.name}
                            </div>
                            <div className="text-xl font-pixel" style={{ color: g.color }}>
                                {g.score}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-[8px] text-gray-500 mt-4 font-pixel">
                    ROUND {roundNumber} / {totalRounds}
                </div>
            </motion.div>

            {/* Current Group Indicator */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-10"
            >
                <div className="text-sm text-gray-400 mb-4 font-pixel">GET READY</div>
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl md:text-4xl font-pixel"
                    style={{ color: group.color, textShadow: `0 0 20px ${group.color}` }}
                >
                    {group.name}
                </motion.div>
                <div className="text-xs text-gray-400 mt-3 font-pixel">IT'S YOUR TURN!</div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onReady}
                className="arcade-button font-pixel px-10 py-5 text-lg text-black"
                style={{ backgroundColor: group.color }}
            >
                GO!
            </motion.button>
        </div>
    );
};

export default TurnBanner;
