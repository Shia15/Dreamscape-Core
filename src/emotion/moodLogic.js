"use strict";
// moodLogic.ts – Determines mood based on weighted cues
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateMood = evaluateMood;
var moodWeights_1 = require("./moodWeights");
var emotionUtils_1 = require("./emotionUtils");
function evaluateMood(inputWeights) {
    var filled = __assign(__assign({}, moodWeights_1.moodWeights), inputWeights);
    var normalized = (0, emotionUtils_1.normalizeWeights)(filled);
    return (0, emotionUtils_1.getDominantMood)(normalized);
}
