// src/App.jsx
import React from 'react';
import AetherControlPanel from './components/panels/AetherControl/AetherControlPanel';

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-astral-bg">
      <AetherControlPanel />
    </main>
  );
}