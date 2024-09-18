"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrows = void 0;
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const path_1 = require("./path");
/**
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Arrows component object.
 */
function Arrows(Splide, Components, options) {
    const event = (0, constructors_1.EventInterface)(Splide);
    const { on, bind, emit } = event;
    const { classes, i18n } = options;
    const { Elements, Controller } = Components;
    const { arrows: placeholder, track } = Elements;
    /**
     * The wrapper element.
     */
    let wrapper = placeholder;
    /**
     * The previous arrow element.
     */
    let prev = Elements.prev;
    /**
     * The next arrow element.
     */
    let next = Elements.next;
    /**
     * Indicates whether the component creates arrows or retrieved from the DOM.
     */
    let created;
    /**
     * Holds modifier classes.
     */
    let wrapperClasses;
    /**
     * An object with previous and next arrows.
     */
    const arrows = {};
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        on(events_1.EVENT_UPDATED, remount);
    }
    /**
     * Remounts the component.
     */
    function remount() {
        destroy();
        mount();
    }
    /**
     * Initializes the component.
     */
    function init() {
        const enabled = options.arrows;
        if (enabled && !(prev && next)) {
            createArrows();
        }
        if (prev && next) {
            (0, utils_1.assign)(arrows, { prev, next });
            (0, utils_1.display)(wrapper, enabled ? '' : 'none');
            (0, utils_1.addClass)(wrapper, (wrapperClasses = `${classes_1.CLASS_ARROWS}--${options.direction}`));
            if (enabled) {
                listen();
                update();
                (0, utils_1.setAttribute)([prev, next], attributes_1.ARIA_CONTROLS, track.id);
                emit(events_1.EVENT_ARROWS_MOUNTED, prev, next);
            }
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        event.destroy();
        (0, utils_1.removeClass)(wrapper, wrapperClasses);
        if (created) {
            (0, utils_1.remove)(placeholder ? [prev, next] : wrapper);
            prev = next = null;
        }
        else {
            (0, utils_1.removeAttribute)([prev, next], attributes_1.ALL_ATTRIBUTES);
        }
    }
    /**
     * Listens to some events.
     */
    function listen() {
        on([events_1.EVENT_MOUNTED, events_1.EVENT_MOVED, events_1.EVENT_REFRESH, events_1.EVENT_SCROLLED, events_1.EVENT_END_INDEX_CHANGED], update);
        bind(next, 'click', (0, utils_1.apply)(go, '>'));
        bind(prev, 'click', (0, utils_1.apply)(go, '<'));
    }
    /**
     * The wrapper function of Controller#go().
     *
     * @param control - The control pattern.
     */
    function go(control) {
        Controller.go(control, true);
    }
    /**
     * Create arrows and append them to the slider.
     */
    function createArrows() {
        wrapper = placeholder || (0, utils_1.create)('div', classes.arrows);
        prev = createArrow(true);
        next = createArrow(false);
        created = true;
        (0, utils_1.append)(wrapper, [prev, next]);
        !placeholder && (0, utils_1.before)(wrapper, track);
    }
    /**
     * Creates an arrow button.
     * In IE, A SVG element is focusable.
     *
     * @param prev - Determines whether to create a previous or next arrow.
     *
     * @return A created button element.
     */
    function createArrow(prev) {
        const arrow = `<button class="${classes.arrow} ${prev ? classes.prev : classes.next}" type="button">`
            + `<svg xmlns="${path_1.XML_NAME_SPACE}" viewBox="0 0 ${path_1.SIZE} ${path_1.SIZE}" width="${path_1.SIZE}" height="${path_1.SIZE}" focusable="false">`
            + `<path d="${options.arrowPath || path_1.PATH}" />`;
        return (0, utils_1.parseHtml)(arrow);
    }
    /**
     * Updates status of arrows, such as `disabled` and `aria-label`.
     */
    function update() {
        if (prev && next) {
            const index = Splide.index;
            const prevIndex = Controller.getPrev();
            const nextIndex = Controller.getNext();
            const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
            const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
            prev.disabled = prevIndex < 0;
            next.disabled = nextIndex < 0;
            (0, utils_1.setAttribute)(prev, attributes_1.ARIA_LABEL, prevLabel);
            (0, utils_1.setAttribute)(next, attributes_1.ARIA_LABEL, nextLabel);
            emit(events_1.EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
        }
    }
    return {
        arrows,
        mount,
        destroy,
        update,
    };
}
exports.Arrows = Arrows;
