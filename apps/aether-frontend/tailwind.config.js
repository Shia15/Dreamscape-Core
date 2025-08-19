/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',   // adjust if you add more paths
  ],
  theme: {
    extend: {
      colors: {
        astral: {
          /** ✨ Astral Bloom palette */
          bg:     '#0e0b1d',   // deep-space backdrop
          panel:  '#1a1531',   // card surfaces
          gold:   '#ffdca8',   // typography / CTAs
          aura:   '#bc6ff1',   // violet → magenta gradient start
          egg:    '#a87ffb',   // violet-blue highlight
          energy: '#633bfa',   // meter gradient start
        },
      },
      fontFamily: {
        astral: ['"Cinzel Decorative"', 'serif'],
      },
      boxShadow: {
        bloom: '0 0 60px 15px rgba(172, 115, 255, 0.4)', // soft nebula glow
      },
    },
  },
  plugins: [],
};
