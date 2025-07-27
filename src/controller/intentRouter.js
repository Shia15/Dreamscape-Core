
"use strict";
// intentRouter.js – Compiled from TypeScript: Routes input based on dominant mood
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeIntent = void 0;
var moodLogic_1 = require("./emotion/moodLogic");
var moodTypes_1 = require("./emotion/moodTypes");
var agents_1 = require("./agents");

/**
 * Routes symbolic input to the correct agent using mood logic.
 *
 * @param input - The user's symbolic or natural language input string.
 * @param moodWeights - A partial mood weight profile (e.g. { calm: 0.3, frustrated: 0.7 }).
 *                      Used to determine the dominant emotional context.
 *
 * @returns Output of the matched agent’s execution, or a fallback message if no agent matches.
 */
function routeIntent(input, moodWeights) {
    // 🧠 Evaluate dominant mood from emotional weight profile
    var dominantMood = (0, moodLogic_1.evaluateMood)(moodWeights);
    // 🎯 Match mood to corresponding Egg Agent
    var agent = agents_1.agentRegistry[dominantMood];
    // 🪞 Debug hooks – internal symbolic state logging
    console.log("🧠 Dominant mood:", dominantMood);
    console.log("🎯 Routing to agent:", (agent === null || agent === void 0 ? void 0 : agent.id) || "none");
    // 🚪 Return routed agent response or fallback message
    return agent ? agent.execute(input) : "No agent found for mood: ".concat(dominantMood);
}
exports.routeIntent = routeIntent;
