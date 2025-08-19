import React from 'react';
import ResonanceCore from '../../core/ResonanceCore';

export default function AetherControlPanel() {
  return (
    <section className="bg-astral-panel p-6 rounded-2xl shadow-bloom">
      <h2 className="font-astral text-2xl text-astral-gold mb-4">
        AETHER Control Panel
      </h2>

      <ResonanceCore />

      <button
        className="mt-8 px-5 py-3 rounded-xl bg-astral-aura/30 hover:bg-astral-aura/50 text-astral-gold font-astral shadow-bloom transition"
        type="button"
      >
        Nurture the AI
      </button>
    </section>
  );
}