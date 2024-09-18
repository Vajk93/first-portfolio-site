"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = void 0;
/**
 * Pads the number with 0.
 *
 * @param number - A number to pad.
 *
 * @return string - Padded number.
 */
function pad(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
exports.pad = pad;
