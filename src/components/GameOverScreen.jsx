import React from 'react';
import { motion } from 'framer-motion';

const GameOverScreen = ({ groups, onRestart }) => {
    // Sort groups by score descending for ranking
    const ranked = [...groups].sort((a, b) => b.score - a.score);
    const topScore = ranked[0]?.score ?? 0;
    const isTie = ranked.filter(g => g.score === topScore).length > 1;

    const medals = ['🏆', '🥈', '🥉', ''];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6"
            >
                <h2 className="text-4xl md:text-5xl font-pixel text-red-500 mb-2">GAME</h2>
                <h2 className="text-4xl md:text-5xl font-pixel text-red-500">OVER</h2>
            </motion.div>

            {/* Rankings */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="raised-card w-full max-w-sm mb-8"
            >
                <div className="text-[10px] text-gray-400 mb-4 font-pixel">FINAL STANDINGS</div>
                <div className="flex flex-col gap-4">
                    {ranked.map((g, i) => (
                        <div
                            key={g.id}
                            className="flex items-center justify-between px-3 py-2"
                            style={{
                                borderLeft: `4px solid ${g.color}`,
                                backgroundColor: i === 0 && !isTie ? 'rgba(255,255,255,0.05)' : 'transparent',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{medals[i] || ''}</span>
                                <span className="font-pixel text-xs" style={{ color: g.color }}>
                                    {g.name}
                                </span>
                            </div>
                            <span className="font-pixel text-lg" style={{ color: g.color }}>
                                {g.score}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Winner / Tie Banner */}
                <div className="border-t-2 border-gray-700 pt-4 mt-4">
                    {isTie ? (
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-yellow-400 font-pixel text-sm"
                        >
                            IT'S A TIE!
                        </motion.div>
                    ) : (
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="font-pixel"
                        >
                            <div className="text-[10px] text-gray-400 mb-2">WINNER</div>
                            <div
                                className="text-xl"
                                style={{ color: ranked[0].color, textShadow: `0 0 15px ${ranked[0].color}` }}
                            >
                                🏆 {ranked[0].name} 🏆
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={onRestart}
                className="arcade-button bg-neon-cyan text-black font-pixel px-10 py-5 text-lg"
            >
                INSERT COIN
            </motion.button>

            <p className="mt-6 font-pixel text-[8px] text-gray-500">
                CREDIT: 00 // TAI'S CHARADES
            </p>
        </div>
    );
};

export default GameOverScreen;
