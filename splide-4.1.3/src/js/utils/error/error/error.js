"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const project_1 = require("../../../constants/project");
/**
 * Displays the error message on the console.
 *
 * @param message - A message.
 */
function error(message) {
    console.error(`[${project_1.PROJECT_CODE}] ${message}`);
}
exports.error = error;
