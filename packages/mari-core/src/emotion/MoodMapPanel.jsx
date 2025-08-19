// Page 16 – Agent Mood Mapping Panel
// Tailwind UI Component with Real-Time Tone Shifting + Logging

import React, { useState, useEffect } from "react";

const MoodMapPanel = () => {
  const [axisX, setAxisX] = useState(0); // -100 (soft) to +100 (assertive)
  const [axisY, setAxisY] = useState(0); // -100 (calm) to +100 (activated)

  const getTone = () => {
    if (axisX < -30 && axisY < -30) return "Dreamer";
    if (axisX > 30 && axisY < -30) return "Guardian";
    if (axisX < -30 && axisY > 30) return "Nurturer";
    if (axisX > 30 && axisY > 30) return "Catalyst";
    if (axisY > 60) return "Rebel";
    return "Visionary";
  };

  const activeAgent = getTone();

  useEffect(() => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      mood_axis: { x: axisX, y: axisY },
      agentTone: activeAgent
    };
    console.log("[mood-mapping.log]", logEntry);
  }, [axisX, axisY]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 mt-10 bg-zinc-950 text-white rounded-3xl shadow-xl">
      <h2 className="text-xl font-bold text-center text-pink-300 mb-6 tracking-wide">
        Agent Mood Mapping Panel
      </h2>

      <div className="text-center mb-4">
        <p className="text-sm text-zinc-400">Current Mood Position</p>
        <p className="text-lg font-semibold text-blue-300">{activeAgent}</p>
      </div>

      <div className="mb-6">
        <label className="text-sm text-zinc-400">Mood Axis X (Soft ←→ Assertive)</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={axisX}
          onChange={(e) => setAxisX(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
        <p className="text-xs text-center text-zinc-400">{axisX}</p>
      </div>

      <div className="mb-6">
        <label className="text-sm text-zinc-400">Mood Axis Y (Calm ←→ Activated)</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={axisY}
          onChange={(e) => setAxisY(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <p className="text-xs text-center text-zinc-400">{axisY}</p>
      </div>

      <div
        className="w-24 h-24 mx-auto rounded-full opacity-60 blur-md animate-pulse mb-4"
        style={{
          backgroundColor:
            activeAgent === "Dreamer" ? "#6366F1" :
            activeAgent === "Catalyst" ? "#F97316" :
            activeAgent === "Nurturer" ? "#10B981" :
            activeAgent === "Guardian" ? "#3B82F6" :
            activeAgent === "Rebel" ? "#F43F5E" : "#A78BFA"
        }}
      />

      <p className="text-xs text-zinc-500 text-center">
        Auto-logging to: <code>mood-mapping.log</code>
      </p>
    </div>
  );
};

export default MoodMapPanel;
