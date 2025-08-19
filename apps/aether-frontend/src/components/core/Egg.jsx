import React from 'react';

export default function Egg({ size = 96, label }) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: size, height: size }}
    >
      <div
        className="w-full h-full rounded-full shadow-bloom"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #bc6ff1 0%, #633bfa 70%)',
        }}
      />
      {label && (
        <span className="mt-2 text-xs font-astral tracking-wide text-astral-gold">
          {label}
        </span>
      )}
    </div>
  );
}