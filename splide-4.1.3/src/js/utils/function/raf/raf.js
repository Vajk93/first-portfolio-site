"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raf = void 0;
/**
 * The arias of `window.requestAnimationFrame()`.
 */
function raf(func) {
    return requestAnimationFrame(func);
}
exports.raf = raf;
