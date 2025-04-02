// Score.js

import React from "react";

const Score = ({ score, className }) => (
    <div className={className}>
        <h2>Your Score: {score}</h2>
        <p>Thank you for playing!</p>
    </div>
);

export default Score;
