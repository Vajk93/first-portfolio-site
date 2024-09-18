"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const project_1 = require("../../../constants/project");
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message to display.
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(`[${project_1.PROJECT_CODE}] ${message || ''}`);
    }
}
exports.assert = assert;
