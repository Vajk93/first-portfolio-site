"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clones = exports.MULTIPLIER = void 0;
const events_1 = require("../../constants/events");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The multiplier to determine the number of clones.
 *
 * @since 4.0.0
 */
exports.MULTIPLIER = 2;
/**
 * The component that generates clones for the loop slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Clones component object.
 */
function Clones(Splide, Components, options) {
    const event = (0, constructors_1.EventInterface)(Splide);
    const { on } = event;
    const { Elements, Slides } = Components;
    const { resolve } = Components.Direction;
    /**
     * Stores all cloned elements.
     */
    const clones = [];
    /**
     * Keeps the current number of clones.
     */
    let cloneCount;
    /**
     * Called when the component is mounted.
     * Needs to remount the component on refresh, otherwise `refresh` event will be triggered again while refreshing.
     */
    function mount() {
        on(events_1.EVENT_REFRESH, remount);
        on([events_1.EVENT_UPDATED, events_1.EVENT_RESIZE], observe);
        if ((cloneCount = computeCloneCount())) {
            generate(cloneCount);
            Components.Layout.resize(true);
        }
    }
    /**
     * Remounts the component.
     */
    function remount() {
        destroy();
        mount();
    }
    /**
     * Destroys clones.
     */
    function destroy() {
        (0, utils_1.remove)(clones);
        (0, utils_1.empty)(clones);
        event.destroy();
    }
    /**
     * Observes the required clone count and refreshes the slider if necessary.
     */
    function observe() {
        const count = computeCloneCount();
        if (cloneCount !== count) {
            if (cloneCount < count || !count) {
                event.emit(events_1.EVENT_REFRESH);
            }
        }
    }
    /**
     * Generates the specified number of clones.
     *
     * @param count - The number of clones to generate for each side.
     */
    function generate(count) {
        const slides = Slides.get().slice();
        const { length } = slides;
        if (length) {
            while (slides.length < count) {
                (0, utils_1.push)(slides, slides);
            }
            (0, utils_1.push)(slides.slice(-count), slides.slice(0, count)).forEach((Slide, index) => {
                const isHead = index < count;
                const clone = cloneDeep(Slide.slide, index);
                isHead ? (0, utils_1.before)(clone, slides[0].slide) : (0, utils_1.append)(Elements.list, clone);
                (0, utils_1.push)(clones, clone);
                Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
            });
        }
    }
    /**
     * Deeply clones the provided element with removing the ID attribute.
     *
     * @param elm   - An element to clone.
     * @param index - An index of the clone.
     *
     * @return A cloned element.
     */
    function cloneDeep(elm, index) {
        const clone = elm.cloneNode(true);
        (0, utils_1.addClass)(clone, options.classes.clone);
        clone.id = `${Splide.root.id}-clone${(0, utils_1.pad)(index + 1)}`;
        return clone;
    }
    /**
     * Returns the number of elements to generate.
     * This always returns 0 if the slider type is not `'loop'`.
     *
     * @return The number of clones.
     */
    function computeCloneCount() {
        let { clones } = options;
        if (!Splide.is(types_1.LOOP)) {
            clones = 0;
        }
        else if ((0, utils_1.isUndefined)(clones)) {
            const fixedSize = options[resolve('fixedWidth')] && Components.Layout.slideSize(0);
            const fixedCount = fixedSize && (0, utils_1.ceil)((0, utils_1.rect)(Elements.track)[resolve('width')] / fixedSize);
            clones = fixedCount || (options[resolve('autoWidth')] && Splide.length) || options.perPage * exports.MULTIPLIER;
        }
        return clones;
    }
    return {
        mount,
        destroy,
    };
}
exports.Clones = Clones;
