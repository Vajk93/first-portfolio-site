"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASSES = exports.STATUS_CLASSES = exports.CLASS_OVERFLOW = exports.CLASS_FOCUS_IN = exports.CLASS_LOADING = exports.CLASS_VISIBLE = exports.CLASS_NEXT = exports.CLASS_PREV = exports.CLASS_ACTIVE = exports.CLASS_INITIALIZED = exports.CLASS_SR = exports.CLASS_SPINNER = exports.CLASS_TOGGLE_PAUSE = exports.CLASS_TOGGLE_PLAY = exports.CLASS_TOGGLE = exports.CLASS_PROGRESS_BAR = exports.CLASS_PROGRESS = exports.CLASS_PAGINATION_PAGE = exports.CLASS_PAGINATION = exports.CLASS_ARROW_NEXT = exports.CLASS_ARROW_PREV = exports.CLASS_ARROW = exports.CLASS_ARROWS = exports.CLASS_CONTAINER = exports.CLASS_CLONE = exports.CLASS_SLIDE = exports.CLASS_LIST = exports.CLASS_TRACK = exports.CLASS_ROOT = void 0;
const project_1 = require("./project");
/**
 * The prefix for classes.
 *
 * @since 4.1.0
 */
const CLASS_PREFIX = `${project_1.PROJECT_CODE}__`;
/**
 * The prefix for status classes.
 *
 * @since 4.1.0
 */
const STATUS_CLASS_PREFIX = 'is-';
/**
 * All classes as constants.
 */
exports.CLASS_ROOT = project_1.PROJECT_CODE;
exports.CLASS_TRACK = `${CLASS_PREFIX}track`;
exports.CLASS_LIST = `${CLASS_PREFIX}list`;
exports.CLASS_SLIDE = `${CLASS_PREFIX}slide`;
exports.CLASS_CLONE = `${exports.CLASS_SLIDE}--clone`;
exports.CLASS_CONTAINER = `${exports.CLASS_SLIDE}__container`;
exports.CLASS_ARROWS = `${CLASS_PREFIX}arrows`;
exports.CLASS_ARROW = `${CLASS_PREFIX}arrow`;
exports.CLASS_ARROW_PREV = `${exports.CLASS_ARROW}--prev`;
exports.CLASS_ARROW_NEXT = `${exports.CLASS_ARROW}--next`;
exports.CLASS_PAGINATION = `${CLASS_PREFIX}pagination`;
exports.CLASS_PAGINATION_PAGE = `${exports.CLASS_PAGINATION}__page`;
exports.CLASS_PROGRESS = `${CLASS_PREFIX}progress`;
exports.CLASS_PROGRESS_BAR = `${exports.CLASS_PROGRESS}__bar`;
exports.CLASS_TOGGLE = `${CLASS_PREFIX}toggle`;
exports.CLASS_TOGGLE_PLAY = `${exports.CLASS_TOGGLE}__play`;
exports.CLASS_TOGGLE_PAUSE = `${exports.CLASS_TOGGLE}__pause`;
exports.CLASS_SPINNER = `${CLASS_PREFIX}spinner`;
exports.CLASS_SR = `${CLASS_PREFIX}sr`;
exports.CLASS_INITIALIZED = `${STATUS_CLASS_PREFIX}initialized`;
exports.CLASS_ACTIVE = `${STATUS_CLASS_PREFIX}active`;
exports.CLASS_PREV = `${STATUS_CLASS_PREFIX}prev`;
exports.CLASS_NEXT = `${STATUS_CLASS_PREFIX}next`;
exports.CLASS_VISIBLE = `${STATUS_CLASS_PREFIX}visible`;
exports.CLASS_LOADING = `${STATUS_CLASS_PREFIX}loading`;
exports.CLASS_FOCUS_IN = `${STATUS_CLASS_PREFIX}focus-in`;
exports.CLASS_OVERFLOW = `${STATUS_CLASS_PREFIX}overflow`;
/**
 * The array with all status classes except for `is-initialized`.
 *
 * @since 3.0.0
 */
exports.STATUS_CLASSES = [
    exports.CLASS_ACTIVE,
    exports.CLASS_VISIBLE,
    exports.CLASS_PREV,
    exports.CLASS_NEXT,
    exports.CLASS_LOADING,
    exports.CLASS_FOCUS_IN,
    exports.CLASS_OVERFLOW,
];
/**
 * The collection of classes for elements that Splide dynamically creates.
 *
 * @since 3.0.0
 */
exports.CLASSES = {
    slide: exports.CLASS_SLIDE,
    clone: exports.CLASS_CLONE,
    arrows: exports.CLASS_ARROWS,
    arrow: exports.CLASS_ARROW,
    prev: exports.CLASS_ARROW_PREV,
    next: exports.CLASS_ARROW_NEXT,
    pagination: exports.CLASS_PAGINATION,
    page: exports.CLASS_PAGINATION_PAGE,
    spinner: exports.CLASS_SPINNER,
};
