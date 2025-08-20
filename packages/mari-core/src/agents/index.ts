// index.ts – Registry of Egg Agents

import { Mnēsis } from "./Mnēsis.js"
import { Aletheia } from "./Aletheia.js"
import { Inferaia } from "./Inferaia.js"
import { Reverie } from "./Reverie.js"
import { Agent } from "./AgentTypes"

export const agentRegistry: Record<string, Agent> = {
  mnēsis: new Mnēsis(),
  aletheia: new Aletheia(),
  inferaia: new Inferaia(),
  reverie: new Reverie()
}
