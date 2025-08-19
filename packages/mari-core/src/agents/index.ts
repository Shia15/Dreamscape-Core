// index.ts – Registry of Egg Agents

import { Mnēsis } from "./Mnēsis"
import { Aletheia } from "./Aletheia"
import { Inferaia } from "./Inferaia"
import { Reverie } from "./Reverie"
import { Agent } from "./AgentTypes"

export const agentRegistry: Record<string, Agent> = {
  mnēsis: new Mnēsis(),
  aletheia: new Aletheia(),
  inferaia: new Inferaia(),
  reverie: new Reverie()
}
