"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.keydown = exports.fire = exports.parseTransform = exports.setSlidesRect = exports.init = void 0;
const classes_1 = require("../../constants/classes");
const Splide_1 = require("../../core/Splide/Splide");
const utils_1 = require("../../utils");
const fixtures_1 = require("../fixtures");
const constants_1 = require("../fixtures/constants");
const DOM_RECT = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => '',
};
/**
 * Creates a new splide instance.
 *
 * @param args    - Arguments for initialization.
 * @param options - Options for Splide.
 *
 * @return A created Splide instance.
 */
function init(options = {}, args = {}) {
    const { width = constants_1.SLIDER_WIDTH, height = 0 } = options;
    const { id, length = 10, arrows, autoplay, progress, mount = true, html, src, dataSrc, dataSrcset, json, insertHtml, dataInterval, } = args;
    const slideWidth = +width / (options.perPage || 1);
    const slideHeight = +height / (options.perPage || 1);
    const innerHtml = html
        || (0, fixtures_1.buildHtml)({ length, arrows, autoplay, progress, src, dataSrc, dataSrcset, json, id, dataInterval });
    if (insertHtml) {
        if (!document.body.innerHTML) {
            throw new Error('Invalid usage.');
        }
        document.body.insertAdjacentHTML('beforeend', innerHtml);
    }
    else {
        document.head.innerHTML = '';
        document.body.innerHTML = innerHtml;
    }
    const root = id ? document.getElementById(id) : document.querySelector(`.${classes_1.CLASS_ROOT}`);
    const track = root.querySelector(`.${classes_1.CLASS_TRACK}`);
    const list = root.querySelector(`.${classes_1.CLASS_LIST}`);
    const slides = root.querySelectorAll(`.${classes_1.CLASS_SLIDE}`);
    root.getBoundingClientRect = () => {
        return (0, utils_1.assign)({}, DOM_RECT, { width: +width });
    };
    track.getBoundingClientRect = () => {
        return (0, utils_1.assign)({}, DOM_RECT, { width: +width, right: +width });
    };
    list.getBoundingClientRect = () => {
        return (0, utils_1.assign)({}, DOM_RECT, Object.assign({ width: +width }, parseTransform(list)));
    };
    setSlidesRect(Array.from(slides), list, slideWidth, slideHeight);
    const splide = new Splide_1.Splide(root, options);
    if (mount) {
        splide.mount();
    }
    return splide;
}
exports.init = init;
/**
 * Forcibly sets dimensions of provided slides.
 *
 * @param slides - An array with slides.
 * @param list   - A List element.
 * @param width  - Width of each slide.
 * @param height - Height of each slide.
 */
function setSlidesRect(slides, list, width, height) {
    slides.forEach((slide, index) => {
        slide.getBoundingClientRect = () => {
            const offsets = parseTransform(list);
            return (0, utils_1.assign)({}, DOM_RECT, {
                width: width,
                height: height,
                left: width * index + offsets.left,
                right: width * index + width + offsets.left,
            });
        };
    });
}
exports.setSlidesRect = setSlidesRect;
/**
 * Converts translate values to position.
 *
 * @param elm - An element to parse.
 *
 * @return An object with left and top offsets.
 */
function parseTransform(elm) {
    const position = { left: 0, top: 0 };
    if (elm && elm.style.transform) {
        const { transform } = elm.style;
        if (transform.includes('translateX')) {
            position.left = parseFloat(transform.replace(/translateX\(|\)/g, '')) || 0;
        }
        if (transform.includes('translateY')) {
            position.top = parseFloat(transform.replace(/translateY\(|\)/g, '')) || 0;
        }
    }
    return position;
}
exports.parseTransform = parseTransform;
/**
 * Fires any native event manually.
 *
 * @param target        - A target.
 * @param type          - An event type.
 * @param data          - Optional. Additional data.
 * @param eventInitDict - Optional. An EventInit object.
 *
 * @return An event object.
 */
function fire(target, type, data = {}, eventInitDict = {}) {
    const e = new Event(type, eventInitDict);
    if (data.timeStamp !== undefined) {
        Object.defineProperty(e, 'timeStamp', { value: data.timeStamp });
        delete data.timeStamp;
    }
    target.dispatchEvent(Object.assign(e, data));
    return e;
}
exports.fire = fire;
/**
 * Emulates keydown.
 *
 * @param key    - A key to press.
 * @param target - A target.
 */
function keydown(key, target = window) {
    fire(target, 'keydown', { key });
}
exports.keydown = keydown;
/**
 * Returns a new Promise resolved after the specified duration.
 *
 * @param duration - Duration to wait.
 *
 * @return A Promise instance.
 */
function wait(duration = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
exports.wait = wait;
