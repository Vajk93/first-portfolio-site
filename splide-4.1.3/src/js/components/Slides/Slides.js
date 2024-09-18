"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slides = void 0;
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const Slide_1 = require("./Slide");
/**
 * The component for managing all slides include clones.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Slides component object.
 */
function Slides(Splide, Components, options) {
    const { on, emit, bind } = (0, constructors_1.EventInterface)(Splide);
    const { slides, list } = Components.Elements;
    /**
     * Stores all SlideComponent objects.
     */
    const Slides = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        on(events_1.EVENT_REFRESH, destroy);
        on(events_1.EVENT_REFRESH, init);
    }
    /**
     * Initializes the component.
     */
    function init() {
        slides.forEach((slide, index) => { register(slide, index, -1); });
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        forEach(Slide => { Slide.destroy(); });
        (0, utils_1.empty)(Slides);
    }
    /**
     * Manually updates the status of all slides.
     */
    function update() {
        forEach(Slide => { Slide.update(); });
    }
    /**
     * Registers a slide element and creates a Slide object.
     * Needs to sort every time when a new slide is registered especially for clones.
     *
     * @param slide      - A slide element to register.
     * @param index      - A slide index.
     * @param slideIndex - A slide index for clones. This must be `-1` for regular slides.
     */
    function register(slide, index, slideIndex) {
        const object = (0, Slide_1.Slide)(Splide, index, slideIndex, slide);
        object.mount();
        Slides.push(object);
        Slides.sort((Slide1, Slide2) => Slide1.index - Slide2.index);
    }
    /**
     * Returns all Slide objects.
     *
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     *
     * @return An array with Slide objects.
     */
    function get(excludeClones) {
        return excludeClones ? filter(Slide => !Slide.isClone) : Slides;
    }
    /**
     * Returns slides in the specified page.
     *
     * @param page - A page index.
     *
     * @return An array with slides that belong to the page.
     */
    function getIn(page) {
        const { Controller } = Components;
        const index = Controller.toIndex(page);
        const max = Controller.hasFocus() ? 1 : options.perPage;
        return filter(Slide => (0, utils_1.between)(Slide.index, index, index + max - 1));
    }
    /**
     * Returns a Slide object at the specified index.
     *
     * @param index - A slide index.
     *
     * @return A Slide object if available, or otherwise `undefined`.
     */
    function getAt(index) {
        return filter(index)[0];
    }
    /**
     * Inserts a slide or slides at a specified index.
     *
     * @param items - A slide element, an HTML string or an array with them.
     * @param index - Optional. An index to insert the slide at. If omitted, appends it to the list.
     */
    function add(items, index) {
        (0, utils_1.forEach)(items, slide => {
            if ((0, utils_1.isString)(slide)) {
                slide = (0, utils_1.parseHtml)(slide);
            }
            if ((0, utils_1.isHTMLElement)(slide)) {
                const ref = slides[index];
                ref ? (0, utils_1.before)(slide, ref) : (0, utils_1.append)(list, slide);
                (0, utils_1.addClass)(slide, options.classes.slide);
                observeImages(slide, (0, utils_1.apply)(emit, events_1.EVENT_RESIZE));
            }
        });
        emit(events_1.EVENT_REFRESH);
    }
    /**
     * Removes slides that match the matcher
     * that can be an index, an array with indices, a selector, or an iteratee function.
     *
     * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
     */
    function remove(matcher) {
        (0, utils_1.remove)(filter(matcher).map(Slide => Slide.slide));
        emit(events_1.EVENT_REFRESH);
    }
    /**
     * Iterates over Slide objects by the iteratee function.
     *
     * @param iteratee      - An iteratee function that takes a Slide object, an index and an array with Slides.
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     */
    function forEach(iteratee, excludeClones) {
        get(excludeClones).forEach(iteratee);
    }
    /**
     * Filters Slides by the matcher
     * that can be an index, an array with indices, a selector, or a predicate function.
     *
     * @param matcher - An index, an array with indices, a selector string, or a predicate function.
     *
     * @return An array with SlideComponent objects.
     */
    function filter(matcher) {
        return Slides.filter((0, utils_1.isFunction)(matcher)
            ? matcher
            : Slide => (0, utils_1.isString)(matcher)
                ? (0, utils_1.matches)(Slide.slide, matcher)
                : (0, utils_1.includes)((0, utils_1.toArray)(matcher), Slide.index));
    }
    /**
     * Adds a CSS rule to all slides or containers.
     *
     * @param prop         - A property name.
     * @param value        - A CSS value to add.
     * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
     */
    function style(prop, value, useContainer) {
        forEach(Slide => { Slide.style(prop, value, useContainer); });
    }
    /**
     * Invokes the callback after all images in the element are loaded.
     *
     * @param elm      - An element that may contain images.
     * @param callback - A callback function.
     */
    function observeImages(elm, callback) {
        const images = (0, utils_1.queryAll)(elm, 'img');
        let { length } = images;
        if (length) {
            images.forEach(img => {
                bind(img, 'load error', () => {
                    if (!--length) {
                        callback();
                    }
                });
            });
        }
        else {
            callback();
        }
    }
    /**
     * Returns the length of slides.
     *
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     *
     * @return The length of slides.
     */
    function getLength(excludeClones) {
        return excludeClones ? slides.length : Slides.length;
    }
    /**
     * Checks if the number of slides is over than the `perPage` option, including clones.
     *
     * @return `true` if there are enough slides, or otherwise `false`.
     */
    function isEnough() {
        return Slides.length > options.perPage;
    }
    return {
        mount,
        destroy,
        update,
        register,
        get,
        getIn,
        getAt,
        add,
        remove,
        forEach,
        filter,
        style,
        getLength,
        isEnough,
    };
}
exports.Slides = Slides;
