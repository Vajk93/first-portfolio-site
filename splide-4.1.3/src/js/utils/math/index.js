"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.clamp = exports.between = exports.approximatelyEqual = void 0;
var approximatelyEqual_1 = require("./approximatelyEqual/approximatelyEqual");
Object.defineProperty(exports, "approximatelyEqual", { enumerable: true, get: function () { return approximatelyEqual_1.approximatelyEqual; } });
var between_1 = require("./between/between");
Object.defineProperty(exports, "between", { enumerable: true, get: function () { return between_1.between; } });
var clamp_1 = require("./clamp/clamp");
Object.defineProperty(exports, "clamp", { enumerable: true, get: function () { return clamp_1.clamp; } });
var sign_1 = require("./sign/sign");
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return sign_1.sign; } });
__exportStar(require("./math/math"), exports);
