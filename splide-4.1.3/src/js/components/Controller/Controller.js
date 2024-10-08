"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const events_1 = require("../../constants/events");
const states_1 = require("../../constants/states");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for controlling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Controller component object.
 */
function Controller(Splide, Components, options) {
    const { on, emit } = (0, constructors_1.EventInterface)(Splide);
    const { Move } = Components;
    const { getPosition, getLimit, toPosition } = Move;
    const { isEnough, getLength } = Components.Slides;
    const { omitEnd } = options;
    const isLoop = Splide.is(types_1.LOOP);
    const isSlide = Splide.is(types_1.SLIDE);
    const getNext = (0, utils_1.apply)(getAdjacent, false);
    const getPrev = (0, utils_1.apply)(getAdjacent, true);
    /**
     * The current index.
     */
    let currIndex = options.start || 0;
    /**
     * The latest end index.
     */
    let endIndex;
    /**
     * The previous index.
     */
    let prevIndex = currIndex;
    /**
     * The latest number of slides.
     */
    let slideCount;
    /**
     * The latest `perMove` value.
     */
    let perMove;
    /**
     * The latest `perMove` value.
     */
    let perPage;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        on([events_1.EVENT_UPDATED, events_1.EVENT_REFRESH, events_1.EVENT_END_INDEX_CHANGED], init);
        on(events_1.EVENT_RESIZED, onResized);
    }
    /**
     * Initializes some parameters.
     * Needs to check the number of slides since the current index may be out of the range after refresh.
     * The process order must be Elements -> Controller -> Move.
     */
    function init() {
        slideCount = getLength(true);
        perMove = options.perMove;
        perPage = options.perPage;
        endIndex = getEnd();
        const index = (0, utils_1.clamp)(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
        if (index !== currIndex) {
            currIndex = index;
            Move.reposition();
        }
    }
    /**
     * Called when the viewport width is changed.
     * The end index can change if `autoWidth` or `fixedWidth` is enabled.
     */
    function onResized() {
        if (endIndex !== getEnd()) {
            emit(events_1.EVENT_END_INDEX_CHANGED);
        }
    }
    /**
     * Moves the slider by the control pattern.
     *
     * @see `Splide#go()`
     *
     * @param control        - A control pattern.
     * @param allowSameIndex - Optional. Determines whether to allow to go to the current index or not.
     * @param callback       - Optional. A callback function invoked after transition ends.
     */
    function go(control, allowSameIndex, callback) {
        if (!isBusy()) {
            const dest = parse(control);
            const index = loop(dest);
            if (index > -1 && (allowSameIndex || index !== currIndex)) {
                setIndex(index);
                Move.move(dest, index, prevIndex, callback);
            }
        }
    }
    /**
     * Scrolls the slider to the specified destination with updating indices.
     *
     * @param destination - The position to scroll the slider to.
     * @param duration    - Optional. Specifies the scroll duration.
     * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
     * @param callback    - Optional. A callback function invoked after scroll ends.
     */
    function scroll(destination, duration, snap, callback) {
        Components.Scroll.scroll(destination, duration, snap, () => {
            const index = loop(Move.toIndex(getPosition()));
            setIndex(omitEnd ? (0, utils_1.min)(index, endIndex) : index);
            callback && callback();
        });
    }
    /**
     * Parses the control and returns a slide index.
     *
     * @param control - A control pattern to parse.
     *
     * @return A `dest` index.
     */
    function parse(control) {
        let index = currIndex;
        if ((0, utils_1.isString)(control)) {
            const [, indicator, number] = control.match(/([+\-<>])(\d+)?/) || [];
            if (indicator === '+' || indicator === '-') {
                index = computeDestIndex(currIndex + +`${indicator}${+number || 1}`, currIndex);
            }
            else if (indicator === '>') {
                index = number ? toIndex(+number) : getNext(true);
            }
            else if (indicator === '<') {
                index = getPrev(true);
            }
        }
        else {
            index = isLoop ? control : (0, utils_1.clamp)(control, 0, endIndex);
        }
        return index;
    }
    /**
     * Returns an adjacent destination index.
     *
     * @internal
     *
     * @param prev        - Determines whether to return a previous or next index.
     * @param destination - Optional. Determines whether to get a destination index or a slide one.
     *
     * @return An adjacent index if available, or otherwise `-1`.
     */
    function getAdjacent(prev, destination) {
        const number = perMove || (hasFocus() ? 1 : perPage);
        const dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
        if (dest === -1 && isSlide) {
            if (!(0, utils_1.approximatelyEqual)(getPosition(), getLimit(!prev), 1)) {
                return prev ? 0 : endIndex;
            }
        }
        return destination ? dest : loop(dest);
    }
    /**
     * Converts the desired destination index to the valid one.
     * - If the `move` option is `true`, finds the dest index whose position is different with the current one.
     * - This may return clone indices if the editor is the loop mode,
     *   or `-1` if there is no slide to go.
     * - There are still slides where the carousel can go if borders are between `from` and `dest`.
     * - If `focus` is available, needs to calculate the dest index even if there are enough number of slides.
     *
     * @param dest     - The desired destination index.
     * @param from     - A base index.
     * @param snapPage - Optional. Whether to snap a page or not.
     *
     * @return A converted destination index, including clones.
     */
    function computeDestIndex(dest, from, snapPage) {
        if (isEnough() || hasFocus()) {
            const index = computeMovableDestIndex(dest);
            if (index !== dest) {
                from = dest;
                dest = index;
                snapPage = false;
            }
            if (dest < 0 || dest > endIndex) {
                if (!perMove && ((0, utils_1.between)(0, dest, from, true) || (0, utils_1.between)(endIndex, from, dest, true))) {
                    dest = toIndex(toPage(dest));
                }
                else {
                    if (isLoop) {
                        dest = snapPage
                            ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount
                            : dest;
                    }
                    else if (options.rewind) {
                        dest = dest < 0 ? endIndex : 0;
                    }
                    else {
                        dest = -1;
                    }
                }
            }
            else {
                if (snapPage && dest !== from) {
                    dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
                }
            }
        }
        else {
            dest = -1;
        }
        return dest;
    }
    /**
     * Finds the dest index whose position is different with the current one for `trimSpace: 'move'`.
     * This can be negative or greater than `length - 1`.
     *
     * @param dest - A dest index.
     *
     * @return A dest index.
     */
    function computeMovableDestIndex(dest) {
        if (isSlide && options.trimSpace === 'move' && dest !== currIndex) {
            const position = getPosition();
            while (position === toPosition(dest, true) && (0, utils_1.between)(dest, 0, Splide.length - 1, !options.rewind)) {
                dest < currIndex ? --dest : ++dest;
            }
        }
        return dest;
    }
    /**
     * Loops the provided index only in the loop mode.
     *
     * @param index - An index to loop.
     *
     * @return A looped index.
     */
    function loop(index) {
        return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }
    /**
     * Returns the end index where the slider can go.
     * For example, if the slider has 10 slides and the `perPage` option is 3,
     * the slider can go to the slide 8 (the index is 7).
     * If the `omitEnd` option is available, computes the index from the slide position.
     *
     * @return An end index.
     */
    function getEnd() {
        let end = slideCount - (hasFocus() || (isLoop && perMove) ? 1 : perPage);
        while (omitEnd && end-- > 0) {
            if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
                end++;
                break;
            }
        }
        return (0, utils_1.clamp)(end, 0, slideCount - 1);
    }
    /**
     * Converts the page index to the slide index.
     *
     * @param page - A page index to convert.
     *
     * @return A slide index.
     */
    function toIndex(page) {
        return (0, utils_1.clamp)(hasFocus() ? page : perPage * page, 0, endIndex);
    }
    /**
     * Converts the slide index to the page index.
     *
     * @param index - An index to convert.
     *
     * @return A page index.
     */
    function toPage(index) {
        return hasFocus()
            ? (0, utils_1.min)(index, endIndex)
            : (0, utils_1.floor)((index >= endIndex ? slideCount - 1 : index) / perPage);
    }
    /**
     * Converts the destination position to the dest index.
     *
     * @param destination - A position to convert.
     *
     * @return A dest index.
     */
    function toDest(destination) {
        const closest = Move.toIndex(destination);
        return isSlide ? (0, utils_1.clamp)(closest, 0, endIndex) : closest;
    }
    /**
     * Sets a new index and retains old one.
     *
     * @param index - A new index to set.
     */
    function setIndex(index) {
        if (index !== currIndex) {
            prevIndex = currIndex;
            currIndex = index;
        }
    }
    /**
     * Returns the current/previous index.
     *
     * @param prev - Optional. Whether to return previous index or not.
     */
    function getIndex(prev) {
        return prev ? prevIndex : currIndex;
    }
    /**
     * Verifies if the focus option is available or not.
     *
     * @return `true` if the slider has the focus option.
     */
    function hasFocus() {
        return !(0, utils_1.isUndefined)(options.focus) || options.isNavigation;
    }
    /**
     * Checks if the slider is moving/scrolling or not.
     *
     * @return `true` if the slider can move, or otherwise `false`.
     */
    function isBusy() {
        return Splide.state.is([states_1.MOVING, states_1.SCROLLING]) && !!options.waitForTransition;
    }
    return {
        mount,
        go,
        scroll,
        getNext,
        getPrev,
        getAdjacent,
        getEnd,
        setIndex,
        getIndex,
        toIndex,
        toPage,
        toDest,
        hasFocus,
        isBusy,
    };
}
exports.Controller = Controller;
