"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aletheia = void 0;
var Aletheia = /** @class */ (function () {
    function Aletheia() {
        this.id = "aletheia";
        this.role = "Truth Unveiler";
    }
    Aletheia.prototype.execute = function (input) {
        return this.reveal(input);
    };
    Aletheia.prototype.reveal = function (data) {
        return "Truth fragment uncovered: \"".concat(data, "\"");
    };
    return Aletheia;
}());
exports.Aletheia = Aletheia;
