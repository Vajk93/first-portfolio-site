"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATES = exports.DESTROYED = exports.DRAGGING = exports.SCROLLING = exports.MOVING = exports.IDLE = exports.MOUNTED = exports.CREATED = void 0;
/**
 * Splide has been just created.
 */
exports.CREATED = 1;
/**
 * Splide has mounted components.
 */
exports.MOUNTED = 2;
/**
 * Splide is ready.
 */
exports.IDLE = 3;
/**
 * Splide is moving.
 */
exports.MOVING = 4;
/**
 * Splide is moving.
 */
exports.SCROLLING = 5;
/**
 * The user is dragging the slider.
 */
exports.DRAGGING = 6;
/**
 * Splide has been destroyed.
 */
exports.DESTROYED = 7;
/**
 * The collection of all states.
 *
 * @since 3.0.0
 */
exports.STATES = {
    CREATED: exports.CREATED,
    MOUNTED: exports.MOUNTED,
    IDLE: exports.IDLE,
    MOVING: exports.MOVING,
    SCROLLING: exports.SCROLLING,
    DRAGGING: exports.DRAGGING,
    DESTROYED: exports.DESTROYED,
};
