"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTMLElement = exports.isNull = exports.isUndefined = exports.isString = exports.isFunction = exports.isArray = exports.isObject = void 0;
const function_1 = require("../function");
/**
 * The alias of the type check function.
 *
 * @param type    - A type.
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is the specified type.
 */
function typeOf(type, subject) {
    return typeof subject === type;
}
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
function isObject(subject) {
    return !isNull(subject) && typeOf('object', subject);
}
exports.isObject = isObject;
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
exports.isArray = Array.isArray;
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
exports.isFunction = (0, function_1.apply)(typeOf, 'function');
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
exports.isString = (0, function_1.apply)(typeOf, 'string');
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
exports.isUndefined = (0, function_1.apply)(typeOf, 'undefined');
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */
function isNull(subject) {
    return subject === null;
}
exports.isNull = isNull;
/**
 * Checks if the given subject is an HTMLElement instance or not.
 * This method takes into account which `window` the node belongs to.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
function isHTMLElement(subject) {
    try {
        return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    }
    catch (e) {
        return false;
    }
}
exports.isHTMLElement = isHTMLElement;
