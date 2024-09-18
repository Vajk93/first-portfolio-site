"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elements = void 0;
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const project_1 = require("../../constants/project");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const closest_1 = require("../../utils/dom/closest/closest");
const constants_1 = require("../Drag/constants");
/**
 * The component that collects and handles elements which the slider consists of.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Elements component object.
 */
function Elements(Splide, Components, options) {
    const { on, bind } = (0, constructors_1.EventInterface)(Splide);
    const { root } = Splide;
    const { i18n } = options;
    const elements = {};
    /**
     * Stores all slide elements.
     */
    const slides = [];
    /**
     * Stores all root classes.
     */
    let rootClasses = [];
    /**
     * Stores all list classes.
     */
    let trackClasses = [];
    /**
     * The track element.
     */
    let track;
    /**
     * The list element.
     */
    let list;
    /**
     * Turns into `true` when detecting keydown, and `false` when detecting pointerdown.
     */
    let isUsingKey;
    /**
     * Called when the component is constructed.
     */
    function setup() {
        collect();
        init();
        update();
    }
    /**
     * Called when the component is mounted.
     */
    function mount() {
        on(events_1.EVENT_REFRESH, destroy);
        on(events_1.EVENT_REFRESH, setup);
        on(events_1.EVENT_UPDATED, update);
        bind(document, `${constants_1.POINTER_DOWN_EVENTS} keydown`, e => {
            isUsingKey = e.type === 'keydown';
        }, { capture: true });
        bind(root, 'focusin', () => {
            (0, utils_1.toggleClass)(root, classes_1.CLASS_FOCUS_IN, !!isUsingKey);
        });
    }
    /**
     * Destroys the component.
     *
     * @param completely - Whether to destroy the component completely or not.
     */
    function destroy(completely) {
        const attrs = attributes_1.ALL_ATTRIBUTES.concat('style');
        (0, utils_1.empty)(slides);
        (0, utils_1.removeClass)(root, rootClasses);
        (0, utils_1.removeClass)(track, trackClasses);
        (0, utils_1.removeAttribute)([track, list], attrs);
        (0, utils_1.removeAttribute)(root, completely ? attrs : ['style', attributes_1.ARIA_ROLEDESCRIPTION]);
    }
    /**
     * Updates the status of elements.
     */
    function update() {
        (0, utils_1.removeClass)(root, rootClasses);
        (0, utils_1.removeClass)(track, trackClasses);
        rootClasses = getClasses(classes_1.CLASS_ROOT);
        trackClasses = getClasses(classes_1.CLASS_TRACK);
        (0, utils_1.addClass)(root, rootClasses);
        (0, utils_1.addClass)(track, trackClasses);
        (0, utils_1.setAttribute)(root, attributes_1.ARIA_LABEL, options.label);
        (0, utils_1.setAttribute)(root, attributes_1.ARIA_LABELLEDBY, options.labelledby);
    }
    /**
     * Collects elements which the slider consists of.
     */
    function collect() {
        track = find(`.${classes_1.CLASS_TRACK}`);
        list = (0, utils_1.child)(track, `.${classes_1.CLASS_LIST}`);
        (0, utils_1.assert)(track && list, 'A track/list element is missing.');
        (0, utils_1.push)(slides, (0, utils_1.children)(list, `.${classes_1.CLASS_SLIDE}:not(.${classes_1.CLASS_CLONE})`));
        (0, utils_1.forOwn)({
            arrows: classes_1.CLASS_ARROWS,
            pagination: classes_1.CLASS_PAGINATION,
            prev: classes_1.CLASS_ARROW_PREV,
            next: classes_1.CLASS_ARROW_NEXT,
            bar: classes_1.CLASS_PROGRESS_BAR,
            toggle: classes_1.CLASS_TOGGLE,
        }, (className, key) => {
            elements[key] = find(`.${className}`);
        });
        (0, utils_1.assign)(elements, { root, track, list, slides });
    }
    /**
     * Initializes essential elements.
     * Note that do not change the role of the root element,
     * which removes the region from the accessibility tree.
     */
    function init() {
        const id = root.id || (0, utils_1.uniqueId)(project_1.PROJECT_CODE);
        const role = options.role;
        root.id = id;
        track.id = track.id || `${id}-track`;
        list.id = list.id || `${id}-list`;
        if (!(0, utils_1.getAttribute)(root, attributes_1.ROLE) && root.tagName !== 'SECTION' && role) {
            (0, utils_1.setAttribute)(root, attributes_1.ROLE, role);
        }
        (0, utils_1.setAttribute)(root, attributes_1.ARIA_ROLEDESCRIPTION, i18n.carousel);
        (0, utils_1.setAttribute)(list, attributes_1.ROLE, 'presentation');
    }
    /**
     * Finds an element only in this slider, ignoring elements in a nested slider.
     *
     * @return A found element or null.
     */
    function find(selector) {
        const elm = (0, utils_1.query)(root, selector);
        return elm && (0, closest_1.closest)(elm, `.${classes_1.CLASS_ROOT}`) === root ? elm : undefined;
    }
    /**
     * Return an array with modifier classes.
     *
     * @param base - A base class name.
     *
     * @return An array with classes.
     */
    function getClasses(base) {
        return [
            `${base}--${options.type}`,
            `${base}--${options.direction}`,
            options.drag && `${base}--draggable`,
            options.isNavigation && `${base}--nav`,
            base === classes_1.CLASS_ROOT && classes_1.CLASS_ACTIVE,
        ];
    }
    return (0, utils_1.assign)(elements, {
        setup,
        mount,
        destroy,
    });
}
exports.Elements = Elements;
