"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mnēsis = void 0;
var Mnēsis = /** @class */ (function () {
    function Mnēsis() {
        this.id = "mnēsis";
        this.role = "Memory Recollector";
    }
    Mnēsis.prototype.execute = function (input) {
        return this.recall(input);
    };
    Mnēsis.prototype.recall = function (cue) {
        return "Echo from the archive: \"".concat(cue, "\"");
    };
    return Mnēsis;
}());
exports.Mnēsis = Mnēsis;
