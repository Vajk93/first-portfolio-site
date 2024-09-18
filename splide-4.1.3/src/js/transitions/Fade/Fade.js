"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fade = void 0;
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for the fade transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */
function Fade(Splide, Components, options) {
    const { Slides } = Components;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        (0, constructors_1.EventInterface)(Splide).on([events_1.EVENT_MOUNTED, events_1.EVENT_REFRESH], init);
    }
    /**
     * Initializes the component.
     * Offsets all slides for stacking them onto the head of the list.
     * The `nextTick` disables the initial fade transition of the first slide.
     */
    function init() {
        Slides.forEach(Slide => {
            Slide.style('transform', `translateX(-${100 * Slide.index}%)`);
        });
    }
    /**
     * Starts the transition.
     *
     * @param index - A slide index to be active.
     * @param done  - The callback function that must be called after the transition ends.
     */
    function start(index, done) {
        Slides.style('transition', `opacity ${options.speed}ms ${options.easing}`);
        (0, utils_1.nextTick)(done);
    }
    return {
        mount,
        start,
        cancel: utils_1.noop,
    };
}
exports.Fade = Fade;
