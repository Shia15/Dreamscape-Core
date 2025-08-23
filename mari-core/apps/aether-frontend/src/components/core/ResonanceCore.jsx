import React from 'react';
import Egg from './Egg';
import EnergyMeter from './EnergyMeter';

export default function ResonanceCore() {
  return (
    <div className="relative flex items-center justify-center p-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <EnergyMeter value={78} size={260} />
      </div>

      <Egg size={160} label="Core" />

      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <Egg size={60} label="Alethēia" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -left-8">
        <Egg size={60} label="Mnēsis" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-8">
        <Egg size={60} label="Reverie" />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <Egg size={60} label="Infernia" />
      </div>
    </div>
  );
}
