import React, { useEffect, useState } from 'react';

const Background = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Generate random stars
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${Math.random() * 3 + 1}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden -z-10">
            {/* Starfield */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        animation: `star-flicker ${star.duration} infinite ease-in-out ${star.delay}`,
                    }}
                />
            ))}

            {/* CRT Scanline Overlay */}
            <div className="crt-overlay crt-flicker" />
        </div>
    );
};

export default Background;
