"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const events_1 = require("../../constants/events");
const states_1 = require("../../constants/states");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Move component object.
 */
function Move(Splide, Components, options) {
    const { on, emit } = (0, constructors_1.EventInterface)(Splide);
    const { set } = Splide.state;
    const { slideSize, getPadding, totalSize, listSize, sliderSize } = Components.Layout;
    const { resolve, orient } = Components.Direction;
    const { list, track } = Components.Elements;
    /**
     * Holds the Transition component.
     */
    let Transition;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        Transition = Components.Transition;
        on([events_1.EVENT_MOUNTED, events_1.EVENT_RESIZED, events_1.EVENT_UPDATED, events_1.EVENT_REFRESH], reposition);
    }
    /**
     * Repositions the slider.
     * - Do not call `cancel()` here because LazyLoad may emit resize while transitioning.
     * - iOS Safari emits window resize event while the user swipes the slider because of the bottom bar.
     */
    function reposition() {
        if (!Components.Controller.isBusy()) {
            Components.Scroll.cancel();
            jump(Splide.index);
            Components.Slides.update();
        }
    }
    /**
     * Moves the slider to the dest index with the Transition component.
     *
     * @param dest     - A destination index to go to, including clones'.
     * @param index    - A slide index.
     * @param prev     - A previous index.
     * @param callback - Optional. A callback function invoked after transition ends.
     */
    function move(dest, index, prev, callback) {
        if (dest !== index && canShift(dest > prev)) {
            cancel();
            translate(shift(getPosition(), dest > prev), true);
        }
        set(states_1.MOVING);
        emit(events_1.EVENT_MOVE, index, prev, dest);
        Transition.start(index, () => {
            set(states_1.IDLE);
            emit(events_1.EVENT_MOVED, index, prev, dest);
            callback && callback();
        });
    }
    /**
     * Jumps to the slide at the specified index.
     *
     * @param index - An index to jump to.
     */
    function jump(index) {
        translate(toPosition(index, true));
    }
    /**
     * Moves the slider to the provided position.
     *
     * @param position    - The position to move to.
     * @param preventLoop - Optional. If `true`, sets the provided position as is.
     */
    function translate(position, preventLoop) {
        if (!Splide.is(types_1.FADE)) {
            const destination = preventLoop ? position : loop(position);
            (0, utils_1.style)(list, 'transform', `translate${resolve('X')}(${destination}px)`);
            position !== destination && emit(events_1.EVENT_SHIFTED);
        }
    }
    /**
     * Loops the provided position if it exceeds bounds (limit indices).
     *
     * @param position - A position to loop.
     */
    function loop(position) {
        if (Splide.is(types_1.LOOP)) {
            const index = toIndex(position);
            const exceededMax = index > Components.Controller.getEnd();
            const exceededMin = index < 0;
            if (exceededMin || exceededMax) {
                position = shift(position, exceededMax);
            }
        }
        return position;
    }
    /**
     * Adds or subtracts the slider width to the provided position.
     *
     * @param position  - A position to shift.
     * @param backwards - Determines whether to shift the slider backwards or forwards.
     *
     * @return The shifted position.
     */
    function shift(position, backwards) {
        const excess = position - getLimit(backwards);
        const size = sliderSize();
        position -= orient(size * ((0, utils_1.ceil)((0, utils_1.abs)(excess) / size) || 1)) * (backwards ? 1 : -1);
        return position;
    }
    /**
     * Cancels transition.
     */
    function cancel() {
        translate(getPosition(), true);
        Transition.cancel();
    }
    /**
     * Returns the closest index to the position.
     *
     * @param position - A position to convert.
     *
     * @return The closest index to the position.
     */
    function toIndex(position) {
        const Slides = Components.Slides.get();
        let index = 0;
        let minDistance = Infinity;
        for (let i = 0; i < Slides.length; i++) {
            const slideIndex = Slides[i].index;
            const distance = (0, utils_1.abs)(toPosition(slideIndex, true) - position);
            if (distance <= minDistance) {
                minDistance = distance;
                index = slideIndex;
            }
            else {
                break;
            }
        }
        return index;
    }
    /**
     * Converts the slide index to the position.
     *
     * @param index    - An index to convert.
     * @param trimming - Optional. Whether to trim edge spaces or not.
     *
     * @return The position corresponding with the index.
     */
    function toPosition(index, trimming) {
        const position = orient(totalSize(index - 1) - offset(index));
        return trimming ? trim(position) : position;
    }
    /**
     * Returns the current position.
     *
     * @return The position of the list element.
     */
    function getPosition() {
        const left = resolve('left');
        return (0, utils_1.rect)(list)[left] - (0, utils_1.rect)(track)[left] + orient(getPadding(false));
    }
    /**
     * Trims spaces on the edge of the slider.
     *
     * @param position - A position to trim.
     *
     * @return A trimmed position.
     */
    function trim(position) {
        if (options.trimSpace && Splide.is(types_1.SLIDE)) {
            position = (0, utils_1.clamp)(position, 0, orient(sliderSize(true) - listSize()));
        }
        return position;
    }
    /**
     * Returns the offset amount.
     *
     * @param index - An index.
     */
    function offset(index) {
        const { focus } = options;
        return focus === 'center' ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
    }
    /**
     * Returns the limit number that the slider can move to.
     *
     * @param max - Determines whether to return the maximum or minimum limit.
     *
     * @return The border number.
     */
    function getLimit(max) {
        return toPosition(max ? Components.Controller.getEnd() : 0, !!options.trimSpace);
    }
    /**
     * Checks if there is enough width to shift the slider.
     *
     * @param backwards - `true` for checking backwards, or `false` for doing forwards.
     *
     * @return `true` if the slider can be shifted for the specified direction, or otherwise `false`.
     */
    function canShift(backwards) {
        const shifted = orient(shift(getPosition(), backwards));
        return backwards
            ? shifted >= 0
            : shifted <= list[resolve('scrollWidth')] - (0, utils_1.rect)(track)[resolve('width')];
    }
    /**
     * Checks if the provided position exceeds the minimum or maximum limit or not.
     *
     * @param max      - Optional. `true` for testing max, `false` for min, and `undefined` for both.
     * @param position - Optional. A position to test. If omitted, tests the current position.
     *
     * @return `true` if the position exceeds the limit, or otherwise `false`.
     */
    function exceededLimit(max, position) {
        position = (0, utils_1.isUndefined)(position) ? getPosition() : position;
        const exceededMin = max !== true && orient(position) < orient(getLimit(false));
        const exceededMax = max !== false && orient(position) > orient(getLimit(true));
        return exceededMin || exceededMax;
    }
    return {
        mount,
        move,
        jump,
        translate,
        shift,
        cancel,
        toIndex,
        toPosition,
        getPosition,
        getLimit,
        exceededLimit,
        reposition,
    };
}
exports.Move = Move;
