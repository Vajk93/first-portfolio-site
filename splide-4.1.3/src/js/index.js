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
exports.SplideRenderer = exports.default = exports.Splide = void 0;
var Splide_1 = require("./core/Splide/Splide");
Object.defineProperty(exports, "Splide", { enumerable: true, get: function () { return Splide_1.Splide; } });
var Splide_2 = require("./core/Splide/Splide");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return Splide_2.Splide; } });
var SplideRenderer_1 = require("./renderer/SplideRenderer/SplideRenderer");
Object.defineProperty(exports, "SplideRenderer", { enumerable: true, get: function () { return SplideRenderer_1.SplideRenderer; } });
__exportStar(require("./components/types"), exports);
__exportStar(require("./constructors"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./constants/events"), exports);
__exportStar(require("./constants/classes"), exports);
__exportStar(require("./constants/defaults"), exports);
__exportStar(require("./constants/directions"), exports);
__exportStar(require("./constants/types"), exports);
