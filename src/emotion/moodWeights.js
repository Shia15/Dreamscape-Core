// moodWeights.ts — Symbolic mood signature weights for runtime reflection

export interface MoodWeights {
  [mood: string]: number
}

export const moodWeights: MoodWeights = {
  clarity: 0.9,     // High presence of mental sharpness
  unrest: 0.3,      // Subtle dissonance or inner disquiet
  awe: 0.8,         // Elevated reverence, reverie state
  flow: 1.0         // Peak alignment and system harmony
}
