"use strict";
// flowSim.ts – Simulates symbolic user input routed by mood
Object.defineProperty(exports, "__esModule", { value: true });
var intentRouter_1 = require("../controller/intentRouter");
// Mock mood weight object
var moodWeights = {
    REFLECTIVE: 0.7,
    INSIGHTFUL: 0.2,
    TRANSFORMATIVE: 0.1,
};
// Example user input
var userInput = "I feel disconnected, like I'm floating";
// Route intent through system
var routedOutput = (0, intentRouter_1.routeIntent)(userInput, moodWeights);
console.log("🔍 Input:", userInput);
console.log("🧠 Mood Weights:", moodWeights);
console.log("🎯 Routed Agent Response:\n", routedOutput);
