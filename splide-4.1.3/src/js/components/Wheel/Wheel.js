"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wheel = void 0;
const listener_options_1 = require("../../constants/listener-options");
const states_1 = require("../../constants/states");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for observing the mouse wheel and moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Wheel component object.
 */
function Wheel(Splide, Components, options) {
    const { bind } = (0, constructors_1.EventInterface)(Splide);
    /**
     * Holds the last time when the wheel moves the slider.
     */
    let lastTime = 0;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (options.wheel) {
            bind(Components.Elements.track, 'wheel', onWheel, listener_options_1.SCROLL_LISTENER_OPTIONS);
        }
    }
    /**
     * Called when the user rotates the mouse wheel on the slider.
     *
     * @param e - A WheelEvent object.
     */
    function onWheel(e) {
        if (e.cancelable) {
            const { deltaY } = e;
            const backwards = deltaY < 0;
            const timeStamp = (0, utils_1.timeOf)(e);
            const min = options.wheelMinThreshold || 0;
            const sleep = options.wheelSleep || 0;
            if ((0, utils_1.abs)(deltaY) > min && timeStamp - lastTime > sleep) {
                Splide.go(backwards ? '<' : '>');
                lastTime = timeStamp;
            }
            shouldPrevent(backwards) && (0, utils_1.prevent)(e);
        }
    }
    /**
     * Checks whether the component should prevent the default action of the wheel event or not.
     *
     * @param backwards - Set this to `true` for backwards direction.
     *
     * @return `true` if the action should be prevented.
     */
    function shouldPrevent(backwards) {
        return !options.releaseWheel
            || Splide.state.is(states_1.MOVING)
            || Components.Controller.getAdjacent(backwards) !== -1;
    }
    return {
        mount,
    };
}
exports.Wheel = Wheel;
