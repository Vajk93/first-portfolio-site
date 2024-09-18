"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const directions_1 = require("../../constants/directions");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const types_1 = require("../../constants/types");
const classes_1 = require("../../constants/classes");
/**
 * The component that adjusts slider styles and provides methods for dimensions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Layout component object.
 */
function Layout(Splide, Components, options) {
    const { on, bind, emit } = (0, constructors_1.EventInterface)(Splide);
    const { Slides } = Components;
    const { resolve } = Components.Direction;
    const { root, track, list } = Components.Elements;
    const { getAt, style: styleSlides } = Slides;
    /**
     * Indicates whether the slider direction is vertical or not.
     */
    let vertical;
    /**
     * Keeps the DOMRect object of the root element.
     */
    let rootRect;
    /**
     * Turns into `true` when the carousel is wider than the list.
     */
    let overflow;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        bind(window, 'resize load', (0, constructors_1.Throttle)((0, utils_1.apply)(emit, events_1.EVENT_RESIZE)));
        on([events_1.EVENT_UPDATED, events_1.EVENT_REFRESH], init);
        on(events_1.EVENT_RESIZE, resize);
    }
    /**
     * Initializes the component on `mount` or `updated`.
     * Uses `max-width` for the root to prevent the slider from exceeding the parent element.
     */
    function init() {
        vertical = options.direction === directions_1.TTB;
        (0, utils_1.style)(root, 'maxWidth', (0, utils_1.unit)(options.width));
        (0, utils_1.style)(track, resolve('paddingLeft'), cssPadding(false));
        (0, utils_1.style)(track, resolve('paddingRight'), cssPadding(true));
        resize(true);
    }
    /**
     * Updates dimensions of some elements when the carousel is resized.
     * Also checks the carousel size and emits `overflow` events when it exceeds the list width.
     *
     * @param force - Skips checking the root dimension change and always performs the resizing process.
     */
    function resize(force) {
        const newRect = (0, utils_1.rect)(root);
        if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
            (0, utils_1.style)(track, 'height', cssTrackHeight());
            styleSlides(resolve('marginRight'), (0, utils_1.unit)(options.gap));
            styleSlides('width', cssSlideWidth());
            styleSlides('height', cssSlideHeight(), true);
            rootRect = newRect;
            emit(events_1.EVENT_RESIZED);
            if (overflow !== (overflow = isOverflow())) {
                (0, utils_1.toggleClass)(root, classes_1.CLASS_OVERFLOW, overflow);
                emit(events_1.EVENT_OVERFLOW, overflow);
            }
        }
    }
    /**
     * Parses the padding option and returns the value for each side.
     * This method returns `paddingTop` or `paddingBottom` for the vertical slider.
     *
     * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
     *
     * @return The padding value as a CSS string.
     */
    function cssPadding(right) {
        const { padding } = options;
        const prop = resolve(right ? 'right' : 'left');
        return padding
            && (0, utils_1.unit)(padding[prop] || ((0, utils_1.isObject)(padding) ? 0 : padding))
            || '0px';
    }
    /**
     * Returns the height of the track element as a CSS string.
     *
     * @return The height of the track.
     */
    function cssTrackHeight() {
        let height = '';
        if (vertical) {
            height = cssHeight();
            (0, utils_1.assert)(height, 'height or heightRatio is missing.');
            height = `calc(${height} - ${cssPadding(false)} - ${cssPadding(true)})`;
        }
        return height;
    }
    /**
     * Converts options related with height to a CSS string.
     *
     * @return The height as a CSS string if available, or otherwise an empty string.
     */
    function cssHeight() {
        return (0, utils_1.unit)(options.height || (0, utils_1.rect)(list).width * options.heightRatio);
    }
    /**
     * Returns the width of the slide as a CSS string.
     *
     * @return The width of the slide.
     */
    function cssSlideWidth() {
        return options.autoWidth
            ? null
            : (0, utils_1.unit)(options.fixedWidth) || (vertical ? '' : cssSlideSize());
    }
    /**
     * Returns the height of the slide as a CSS string.
     *
     * @return The height of the slide.
     */
    function cssSlideHeight() {
        return (0, utils_1.unit)(options.fixedHeight)
            || (vertical ? (options.autoHeight ? null : cssSlideSize()) : cssHeight());
    }
    /**
     * Returns the CSS string for slide width or height without gap.
     *
     * @return The CSS string for slide width or height.
     */
    function cssSlideSize() {
        const gap = (0, utils_1.unit)(options.gap);
        return `calc((100%${gap && ` + ${gap}`})/${options.perPage || 1}${gap && ` - ${gap}`})`;
    }
    /**
     * Returns the list width for the horizontal slider, or the height for the vertical slider.
     *
     * @return The size of the list element in pixel.
     */
    function listSize() {
        return (0, utils_1.rect)(list)[resolve('width')];
    }
    /**
     * Returns the slide width for the horizontal slider, or the height for the vertical slider.
     *
     * @param index      - Optional. A slide index.
     * @param withoutGap - Optional. Determines whether to exclude the gap amount or not.
     *
     * @return The size of the specified slide element in pixel.
     */
    function slideSize(index, withoutGap) {
        const Slide = getAt(index || 0);
        return Slide
            ? (0, utils_1.rect)(Slide.slide)[resolve('width')] + (withoutGap ? 0 : getGap())
            : 0;
    }
    /**
     * Returns the total width or height of slides from the head of the slider to the specified index.
     * This includes sizes of clones before the first slide.
     *
     * @param index      - A slide index. If omitted, uses the last index.
     * @param withoutGap - Optional. Determines whether to exclude the last gap or not.
     *
     * @return The total width of slides in the horizontal slider, or the height in the vertical one.
     */
    function totalSize(index, withoutGap) {
        const Slide = getAt(index);
        if (Slide) {
            const right = (0, utils_1.rect)(Slide.slide)[resolve('right')];
            const left = (0, utils_1.rect)(list)[resolve('left')];
            return (0, utils_1.abs)(right - left) + (withoutGap ? 0 : getGap());
        }
        return 0;
    }
    /**
     * Returns the slider size without clones before the first slide.
     * Do not use the clone's size because it's unstable while initializing and refreshing process.
     *
     * @param withoutGap - Optional. Determines whether to exclude the last gap or not.
     *
     * @return The width or height of the slider without clones.
     */
    function sliderSize(withoutGap) {
        return totalSize(Splide.length - 1) - totalSize(0) + slideSize(0, withoutGap);
    }
    /**
     * Returns the gap value in pixel by using the computed style of the first slide.
     *
     * @return The gap value in pixel.
     */
    function getGap() {
        const Slide = getAt(0);
        return Slide && parseFloat((0, utils_1.style)(Slide.slide, resolve('marginRight'))) || 0;
    }
    /**
     * Returns the padding value.
     * This method resolves the difference of the direction.
     *
     * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
     *
     * @return The padding value in pixel.
     */
    function getPadding(right) {
        return parseFloat((0, utils_1.style)(track, resolve(`padding${right ? 'Right' : 'Left'}`))) || 0;
    }
    /**
     * Checks if the carousel is wider than the list.
     * This method always returns `true` for a fade carousel.
     *
     * @return `true` if the carousel is wider than the list, or otherwise `false`.
     */
    function isOverflow() {
        return Splide.is(types_1.FADE) || sliderSize(true) > listSize();
    }
    return {
        mount,
        resize,
        listSize,
        slideSize,
        sliderSize,
        totalSize,
        getPadding,
        isOverflow,
    };
}
exports.Layout = Layout;
