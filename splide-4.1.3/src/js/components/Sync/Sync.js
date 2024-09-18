"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sync = void 0;
const attributes_1 = require("../../constants/attributes");
const directions_1 = require("../../constants/directions");
const events_1 = require("../../constants/events");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const normalizeKey_1 = require("../../utils/dom/normalizeKey/normalizeKey");
/**
 * The keys for triggering the navigation slide.
 *
 * @since 3.0.0
 */
const TRIGGER_KEYS = [' ', 'Enter'];
/**
 * The component for syncing multiple sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Sync component object.
 */
function Sync(Splide, Components, options) {
    const { isNavigation, slideFocus } = options;
    /**
     * Stores event objects.
     */
    const events = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        Splide.splides.forEach(target => {
            if (!target.isParent) {
                sync(Splide, target.splide);
                sync(target.splide, Splide);
            }
        });
        if (isNavigation) {
            navigate();
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        events.forEach(event => { event.destroy(); });
        (0, utils_1.empty)(events);
    }
    /**
     * Remounts the component.
     *
     * @internal
     */
    function remount() {
        destroy();
        mount();
    }
    /**
     * Syncs the current index with a provided child splide instance.
     *
     * @param splide - A splide instance to sync with.
     * @param target - A target splide instance.
     */
    function sync(splide, target) {
        const event = (0, constructors_1.EventInterface)(splide);
        event.on(events_1.EVENT_MOVE, (index, prev, dest) => {
            target.go(target.is(types_1.LOOP) ? dest : index);
        });
        events.push(event);
    }
    /**
     * Makes slides clickable and moves the slider to the index of clicked slide.
     * Note that the direction of `menu` is implicitly `vertical` as default.
     */
    function navigate() {
        const event = (0, constructors_1.EventInterface)(Splide);
        const { on } = event;
        on(events_1.EVENT_CLICK, onClick);
        on(events_1.EVENT_SLIDE_KEYDOWN, onKeydown);
        on([events_1.EVENT_MOUNTED, events_1.EVENT_UPDATED], update);
        events.push(event);
        event.emit(events_1.EVENT_NAVIGATION_MOUNTED, Splide.splides);
    }
    /**
     * Update attributes.
     */
    function update() {
        (0, utils_1.setAttribute)(Components.Elements.list, attributes_1.ARIA_ORIENTATION, options.direction === directions_1.TTB ? 'vertical' : '');
    }
    /**
     * Called when the navigation slide is clicked.
     *
     * @param Slide - A clicked Slide component.
     */
    function onClick(Slide) {
        Splide.go(Slide.index);
    }
    /**
     * Called when any key is pressed on the navigation slide.
     *
     * @param Slide - A Slide component.
     * @param e     - A KeyboardEvent object.
     */
    function onKeydown(Slide, e) {
        if ((0, utils_1.includes)(TRIGGER_KEYS, (0, normalizeKey_1.normalizeKey)(e))) {
            onClick(Slide);
            (0, utils_1.prevent)(e);
        }
    }
    return {
        setup: (0, utils_1.apply)(Components.Media.set, { slideFocus: (0, utils_1.isUndefined)(slideFocus) ? isNavigation : slideFocus }, true),
        mount,
        destroy,
        remount,
    };
}
exports.Sync = Sync;
