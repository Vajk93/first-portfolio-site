"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = void 0;
const style_1 = require("../style/style");
/**
 * Sets the `display` CSS value to the element.
 *
 * @param elm     - An element to set a new value to.
 * @param display - A new `display` value.
 */
function display(elm, display) {
    (0, style_1.style)(elm, 'display', display);
}
exports.display = display;
