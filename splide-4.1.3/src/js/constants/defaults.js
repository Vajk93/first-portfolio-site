"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS = void 0;
const classes_1 = require("./classes");
const i18n_1 = require("./i18n");
/**
 * The collection of default options.
 * Note that this collection does not contain all options.
 *
 * @since 3.0.0
 */
exports.DEFAULTS = {
    type: 'slide',
    role: 'region',
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    drag: true,
    direction: 'ltr',
    trimSpace: true,
    focusableNodes: 'a, button, textarea, input, select, iframe',
    live: true,
    classes: classes_1.CLASSES,
    i18n: i18n_1.I18N,
    reducedMotion: {
        speed: 0,
        rewindSpeed: 0,
        autoplay: 'pause',
    },
};
