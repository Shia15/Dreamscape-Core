import React from 'react';

export default function EnergyMeter({ value = 78, size = 140 }) {
  const r = (size - 8) / 2;
  const C = Math.PI * 2 * r;
  const progress = (value / 100) * C;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1a1531" strokeWidth="6" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="url(#energyGradient)"
        strokeWidth="6"
        strokeDasharray={C}
        strokeDashoffset={C - progress}
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bc6ff1" />
          <stop offset="100%" stopColor="#633bfa" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        className="font-astral text-astral-gold text-lg"
      >
        {value}%
      </text>
    </svg>
  );
}
