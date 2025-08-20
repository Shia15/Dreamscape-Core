// controller.ts – High-level intent and agent orchestration

import { routeIntent } from "./intentRouter.js"
import { Mood } from "../emotion/moodTypes"

/**
 * Process user input and optional mood hints through the routing layer.
 * Returns agent response based on interpreted mood and intent.
 */
export function processInput(
  input: string,
  moodHints: Partial<Record<Mood, number>> = {}
): string {
  const response = routeIntent(input, moodHints)
  return response
}
