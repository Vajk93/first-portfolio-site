"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slide = void 0;
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const states_1 = require("../../constants/states");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The subcomponent for managing each slide.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param index      - A slide index.
 * @param slideIndex - A slide index for clones. This must be `-1` if the slide is not a clone.
 * @param slide      - A slide element.
 *
 * @return A Slide subcomponent.
 */
function Slide(Splide, index, slideIndex, slide) {
    const event = (0, constructors_1.EventInterface)(Splide);
    const { on, emit, bind } = event;
    const { Components, root, options } = Splide;
    const { isNavigation, updateOnMove, i18n, pagination, slideFocus } = options;
    const { resolve } = Components.Direction;
    const styles = (0, utils_1.getAttribute)(slide, 'style');
    const label = (0, utils_1.getAttribute)(slide, attributes_1.ARIA_LABEL);
    const isClone = slideIndex > -1;
    const container = (0, utils_1.child)(slide, `.${classes_1.CLASS_CONTAINER}`);
    /**
     * Turns into `true` when the component is destroyed.
     */
    let destroyed;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (!isClone) {
            slide.id = `${root.id}-slide${(0, utils_1.pad)(index + 1)}`;
            (0, utils_1.setAttribute)(slide, attributes_1.ROLE, pagination ? 'tabpanel' : 'group');
            (0, utils_1.setAttribute)(slide, attributes_1.ARIA_ROLEDESCRIPTION, i18n.slide);
            (0, utils_1.setAttribute)(slide, attributes_1.ARIA_LABEL, label || (0, utils_1.format)(i18n.slideLabel, [index + 1, Splide.length]));
        }
        listen();
    }
    /**
     * Listens to some events.
     */
    function listen() {
        bind(slide, 'click', (0, utils_1.apply)(emit, events_1.EVENT_CLICK, self));
        bind(slide, 'keydown', (0, utils_1.apply)(emit, events_1.EVENT_SLIDE_KEYDOWN, self));
        on([events_1.EVENT_MOVED, events_1.EVENT_SHIFTED, events_1.EVENT_SCROLLED], update);
        on(events_1.EVENT_NAVIGATION_MOUNTED, initNavigation);
        if (updateOnMove) {
            on(events_1.EVENT_MOVE, onMove);
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        destroyed = true;
        event.destroy();
        (0, utils_1.removeClass)(slide, classes_1.STATUS_CLASSES);
        (0, utils_1.removeAttribute)(slide, attributes_1.ALL_ATTRIBUTES);
        (0, utils_1.setAttribute)(slide, 'style', styles);
        (0, utils_1.setAttribute)(slide, attributes_1.ARIA_LABEL, label || '');
    }
    /**
     * Initializes slides as navigation.
     */
    function initNavigation() {
        const controls = Splide.splides.map(target => {
            const Slide = target.splide.Components.Slides.getAt(index);
            return Slide ? Slide.slide.id : '';
        }).join(' ');
        (0, utils_1.setAttribute)(slide, attributes_1.ARIA_LABEL, (0, utils_1.format)(i18n.slideX, (isClone ? slideIndex : index) + 1));
        (0, utils_1.setAttribute)(slide, attributes_1.ARIA_CONTROLS, controls);
        (0, utils_1.setAttribute)(slide, attributes_1.ROLE, slideFocus ? 'button' : '');
        slideFocus && (0, utils_1.removeAttribute)(slide, attributes_1.ARIA_ROLEDESCRIPTION);
    }
    /**
     * If the `updateOnMove` option is `true`, called when the slider starts moving.
     */
    function onMove() {
        if (!destroyed) {
            update();
        }
    }
    /**
     * Updates attribute and classes of the slide.
     */
    function update() {
        if (!destroyed) {
            const { index: curr } = Splide;
            updateActivity();
            updateVisibility();
            (0, utils_1.toggleClass)(slide, classes_1.CLASS_PREV, index === curr - 1);
            (0, utils_1.toggleClass)(slide, classes_1.CLASS_NEXT, index === curr + 1);
        }
    }
    /**
     * Updates the status related with activity.
     */
    function updateActivity() {
        const active = isActive();
        if (active !== (0, utils_1.hasClass)(slide, classes_1.CLASS_ACTIVE)) {
            (0, utils_1.toggleClass)(slide, classes_1.CLASS_ACTIVE, active);
            (0, utils_1.setAttribute)(slide, attributes_1.ARIA_CURRENT, isNavigation && active || '');
            emit(active ? events_1.EVENT_ACTIVE : events_1.EVENT_INACTIVE, self);
        }
    }
    /**
     * Updates classes and attributes related with visibility.
     * - Do not update aria-hidden on shifting to avoid Window Narrator from start reading contents.
     * - If the slide has focus and gets hidden, moves focus to the active slide.
     */
    function updateVisibility() {
        const visible = isVisible();
        const hidden = !visible && (!isActive() || isClone);
        if (!Splide.state.is([states_1.MOVING, states_1.SCROLLING])) {
            (0, utils_1.setAttribute)(slide, attributes_1.ARIA_HIDDEN, hidden || '');
        }
        (0, utils_1.setAttribute)((0, utils_1.queryAll)(slide, options.focusableNodes || ''), attributes_1.TAB_INDEX, hidden ? -1 : '');
        if (slideFocus) {
            (0, utils_1.setAttribute)(slide, attributes_1.TAB_INDEX, hidden ? -1 : 0);
        }
        if (visible !== (0, utils_1.hasClass)(slide, classes_1.CLASS_VISIBLE)) {
            (0, utils_1.toggleClass)(slide, classes_1.CLASS_VISIBLE, visible);
            emit(visible ? events_1.EVENT_VISIBLE : events_1.EVENT_HIDDEN, self);
        }
        if (!visible && document.activeElement === slide) {
            const Slide = Components.Slides.getAt(Splide.index);
            Slide && (0, utils_1.focus)(Slide.slide);
        }
    }
    /**
     * Adds a CSS rule to the slider or the container.
     *
     * @param prop         - A property name.
     * @param value        - A CSS value to add.
     * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
     */
    function style(prop, value, useContainer) {
        (0, utils_1.style)((useContainer && container) || slide, prop, value);
    }
    /**
     * Checks if the slide is active or not.
     *
     * @return `true` if the slide is active.
     */
    function isActive() {
        const { index: curr } = Splide;
        return curr === index || (options.cloneStatus && curr === slideIndex);
    }
    /**
     * Checks if the slide is visible or not.
     */
    function isVisible() {
        if (Splide.is(types_1.FADE)) {
            return isActive();
        }
        const trackRect = (0, utils_1.rect)(Components.Elements.track);
        const slideRect = (0, utils_1.rect)(slide);
        const left = resolve('left', true);
        const right = resolve('right', true);
        return (0, utils_1.floor)(trackRect[left]) <= (0, utils_1.ceil)(slideRect[left])
            && (0, utils_1.floor)(slideRect[right]) <= (0, utils_1.ceil)(trackRect[right]);
    }
    /**
     * Calculates how far this slide is from another slide and
     * returns `true` if the distance is within the given number.
     *
     * @param from     - An index of a base slide.
     * @param distance - `true` if the slide is within this number.
     *
     * @return `true` if the slide is within the `distance` from the base slide, or otherwise `false`.
     */
    function isWithin(from, distance) {
        let diff = (0, utils_1.abs)(from - index);
        if (!isClone && (options.rewind || Splide.is(types_1.LOOP))) {
            diff = (0, utils_1.min)(diff, Splide.length - diff);
        }
        return diff <= distance;
    }
    const self = {
        index,
        slideIndex,
        slide,
        container,
        isClone,
        mount,
        destroy,
        update,
        style,
        isWithin,
    };
    return self;
}
exports.Slide = Slide;
