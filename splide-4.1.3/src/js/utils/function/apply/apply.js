"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = void 0;
const arrayLike_1 = require("../../arrayLike");
/**
 * Create a function where provided arguments are bound.
 * `this` parameter will be always null.
 *
 * @param func - A function.
 */
function apply(func) {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    return func.bind(null, ...(0, arrayLike_1.slice)(arguments, 1));
}
exports.apply = apply;
