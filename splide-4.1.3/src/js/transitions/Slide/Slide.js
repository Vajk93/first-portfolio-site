"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slide = void 0;
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for the slide transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */
function Slide(Splide, Components, options) {
    const { Move, Controller, Scroll } = Components;
    const { list } = Components.Elements;
    const transition = (0, utils_1.apply)(utils_1.style, list, 'transition');
    /**
     * Holds the `done` callback function.
     */
    let endCallback;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        (0, constructors_1.EventInterface)(Splide).bind(list, 'transitionend', e => {
            if (e.target === list && endCallback) {
                cancel();
                endCallback();
            }
        });
    }
    /**
     * Starts the transition.
     * The Move component calls this method just before the slider moves.
     *
     * @param index - A destination index.
     * @param done  - The callback function that must be called after the transition ends.
     */
    function start(index, done) {
        const destination = Move.toPosition(index, true);
        const position = Move.getPosition();
        const speed = getSpeed(index);
        if ((0, utils_1.abs)(destination - position) >= 1 && speed >= 1) {
            if (options.useScroll) {
                Scroll.scroll(destination, speed, false, done);
            }
            else {
                transition(`transform ${speed}ms ${options.easing}`);
                Move.translate(destination, true);
                endCallback = done;
            }
        }
        else {
            Move.jump(index);
            done();
        }
    }
    /**
     * Cancels the transition.
     */
    function cancel() {
        transition('');
        Scroll.cancel();
    }
    /**
     * Returns the transition speed.
     *
     * @param index - A destination index.
     */
    function getSpeed(index) {
        const { rewindSpeed } = options;
        if (Splide.is(types_1.SLIDE) && rewindSpeed) {
            const prev = Controller.getIndex(true);
            const end = Controller.getEnd();
            if ((prev === 0 && index >= end) || (prev >= end && index === 0)) {
                return rewindSpeed;
            }
        }
        return options.speed;
    }
    return {
        mount,
        start,
        cancel,
    };
}
exports.Slide = Slide;
