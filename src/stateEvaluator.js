// stateEvaluator.js — Determines system state based on mood dominance

/**
 * Interprets a dominant mood and maps it to a system-level state
 * (e.g. low energy → suggest rest, flow → proceed with high-agency intent)
 */

function evaluateSystemState(dominantMood) {
  switch (dominantMood) {
    case "clarity":
      return {
        state: "Focused",
        suggestion: "Route to Aletheia for structured logic."
      }
    case "flow":
      return {
        state: "In Alignment",
        suggestion: "Route to Mnēsis or Orin for memory integration or multi-agent sync."
      }
    case "unrest":
      return {
        state: "Disrupted",
        suggestion: "Activate Verus for diagnostic check or fallback logic."
      }
    case "awe":
      return {
        state: "Inspired",
        suggestion: "Pass to Caelus or Inferaia for visionary mode."
      }
    case "curiosity":
      return {
        state: "Open Inquiry",
        suggestion: "Prompt Caelus or Nyra to welcome new input."
      }
    case "stillness":
      return {
        state: "Low Activity",
        suggestion: "Consider pausing flow or suggesting reflection mode."
      }
    default:
      return {
        state: "Unknown",
        suggestion: "Log emotional ambiguity. Request more data."
      }
  }
}

// Export for runtime use
module.exports = { evaluateSystemState }
