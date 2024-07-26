import React, { useEffect } from 'react';

function Coin({ flip, setFlip, result }) {
    useEffect(() => {
        if (flip) {
            const coin = document.getElementById('coin');
            coin.classList.remove('flip-animation');
            void coin.offsetWidth;
            coin.classList.add('flip-animation');
            const handleAnimationEnd = () => {
                coin.classList.remove('flip-animation');
                setFlip(false);
            };
            coin.addEventListener('animationend', handleAnimationEnd);
            return () => {
                coin.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [flip, setFlip]);

    return (
        <div className="Toss">
            <div id="coin" className={result}>
                <div className="side-a"></div>
                <div className="side-b"></div>
            </div>
        </div>
    );
}

export default Coin;
