"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focus = void 0;
/**
 * Focuses the provided element without scrolling the ascendant element.
 *
 * @param elm - An element to focus.
 */
function focus(elm) {
    elm['setActive'] && elm['setActive']() || elm.focus({ preventScroll: true });
}
exports.focus = focus;
