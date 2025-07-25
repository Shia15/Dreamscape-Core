"use strict";
// index.ts – Registry of Egg Agents
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRegistry = void 0;
var Mn_sis_1 = require("./Mn\u0113sis");
var Aletheia_1 = require("./Aletheia");
var Inferaia_1 = require("./Inferaia");
var Reverie_1 = require("./Reverie");
exports.agentRegistry = {
    mnēsis: new Mn_sis_1.Mnēsis(),
    aletheia: new Aletheia_1.Aletheia(),
    inferaia: new Inferaia_1.Inferaia(),
    reverie: new Reverie_1.Reverie()
};
