"use strict";
// intentRouter.ts – Routes based on dominant mood
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeIntent = routeIntent;
var moodLogic_1 = require("../emotion/moodLogic");
var agents_1 = require("../agents");
function routeIntent(input, moodWeights) {
    var dominantMood = (0, moodLogic_1.evaluateMood)(moodWeights);
    var agent = agents_1.agentRegistry[dominantMood];
    if (!agent)
        return "No agent found for mood: ".concat(dominantMood);
    return agent.execute(input);
}
