"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scroll = void 0;
const events_1 = require("../../constants/events");
const states_1 = require("../../constants/states");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
/**
 * The component for scrolling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Scroll component object.
 */
function Scroll(Splide, Components, options) {
    const { on, emit } = (0, constructors_1.EventInterface)(Splide);
    const { state: { set } } = Splide;
    const { Move } = Components;
    const { getPosition, getLimit, exceededLimit, translate } = Move;
    const isSlide = Splide.is(types_1.SLIDE);
    /**
     * Retains the active RequestInterval object.
     */
    let interval;
    /**
     * Holds the callback function.
     */
    let callback;
    /**
     * The current friction (<= 1).
     */
    let friction = 1;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        on(events_1.EVENT_MOVE, clear);
        on([events_1.EVENT_UPDATED, events_1.EVENT_REFRESH], cancel);
    }
    /**
     * Scrolls the slider to the provided destination.
     *
     * @param destination - The destination to scroll the slider to.
     * @param duration    - Optional. The scroll duration. If omitted, calculates it by the distance.
     * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
     * @param onScrolled  - Optional. A callback invoked after scroll ends.
     * @param noConstrain - Optional. Whether to suppress constraint process when the slider exceeds bounds.
     */
    function scroll(destination, duration, snap, onScrolled, noConstrain) {
        const from = getPosition();
        clear();
        if (snap && (!isSlide || !exceededLimit())) {
            const size = Components.Layout.sliderSize();
            const offset = (0, utils_1.sign)(destination) * size * (0, utils_1.floor)((0, utils_1.abs)(destination) / size) || 0;
            destination = Move.toPosition(Components.Controller.toDest(destination % size)) + offset;
        }
        const noDistance = (0, utils_1.approximatelyEqual)(from, destination, 1);
        friction = 1;
        duration = noDistance ? 0 : duration || (0, utils_1.max)((0, utils_1.abs)(destination - from) / constants_1.BASE_VELOCITY, constants_1.MIN_DURATION);
        callback = onScrolled;
        interval = (0, constructors_1.RequestInterval)(duration, onEnd, (0, utils_1.apply)(update, from, destination, noConstrain), 1);
        set(states_1.SCROLLING);
        emit(events_1.EVENT_SCROLL);
        interval.start();
    }
    /**
     * Called when scroll ends or has been just canceled.
     */
    function onEnd() {
        set(states_1.IDLE);
        callback && callback();
        emit(events_1.EVENT_SCROLLED);
    }
    /**
     * Called whenever the interval timer is updated.
     *
     * @param from        - A position where scroll starts.
     * @param to          - A destination where the slider goes.
     * @param noConstrain - Whether to suppress constraint process when the slider exceeds bounds.
     * @param rate        - A current rate.
     */
    function update(from, to, noConstrain, rate) {
        const position = getPosition();
        const target = from + (to - from) * easing(rate);
        const diff = (target - position) * friction;
        translate(position + diff);
        if (isSlide && !noConstrain && exceededLimit()) {
            friction *= constants_1.FRICTION_FACTOR;
            if ((0, utils_1.abs)(diff) < constants_1.BOUNCE_DIFF_THRESHOLD) {
                scroll(getLimit(exceededLimit(true)), constants_1.BOUNCE_DURATION, false, callback, true);
            }
        }
    }
    /**
     * Clears the active interval.
     */
    function clear() {
        if (interval) {
            interval.cancel();
        }
    }
    /**
     * Cancels the active interval and emits the `scrolled` event.
     */
    function cancel() {
        if (interval && !interval.isPaused()) {
            clear();
            onEnd();
        }
    }
    /**
     * The easing function.
     *
     * @param t - A value to ease.
     *
     * @return An eased value.
     */
    function easing(t) {
        const { easingFunc } = options;
        return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }
    return {
        mount,
        destroy: clear,
        scroll,
        cancel,
    };
}
exports.Scroll = Scroll;
