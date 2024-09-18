"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplideRenderer = void 0;
const path_1 = require("../../components/Arrows/path");
const Direction_1 = require("../../components/Direction/Direction");
const classes_1 = require("../../constants/classes");
const defaults_1 = require("../../constants/defaults");
const directions_1 = require("../../constants/directions");
const events_1 = require("../../constants/events");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const classes_2 = require("../constants/classes");
const defaults_2 = require("../constants/defaults");
const Style_1 = require("../Style/Style");
/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
class SplideRenderer {
    /**
     * Removes a style element and clones.
     *
     * @param splide - A Splide instance.
     */
    static clean(splide) {
        const { on } = (0, constructors_1.EventInterface)(splide);
        const { root } = splide;
        const clones = (0, utils_1.queryAll)(root, `.${classes_1.CLASS_CLONE}`);
        on(events_1.EVENT_MOUNTED, () => {
            (0, utils_1.remove)((0, utils_1.child)(root, 'style'));
        });
        (0, utils_1.remove)(clones);
    }
    /**
     * The SplideRenderer constructor.
     *
     * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
     * @param options  - Optional. Slider options.
     * @param config   - Static default options.
     * @param defaults - Default options for the slider. Pass `Splide.defaults` if you are using it.
     */
    constructor(contents, options, config, defaults) {
        /**
         * Stores data of slides.
         */
        this.slides = [];
        /**
         * Holds options.
         */
        this.options = {};
        /**
         * An array with options for each breakpoint.
         */
        this.breakpoints = [];
        (0, utils_1.merge)(defaults_1.DEFAULTS, defaults || {});
        (0, utils_1.merge)((0, utils_1.merge)(this.options, defaults_1.DEFAULTS), options || {});
        this.contents = contents;
        this.config = (0, utils_1.assign)({}, defaults_2.RENDERER_DEFAULT_CONFIG, config || {});
        this.id = this.config.id || (0, utils_1.uniqueId)('splide');
        this.Style = new Style_1.Style(this.id, this.options);
        this.Direction = (0, Direction_1.Direction)(null, null, this.options);
        (0, utils_1.assert)(this.contents.length, 'Provide at least 1 content.');
        this.init();
    }
    /**
     * Initializes the instance.
     */
    init() {
        this.parseBreakpoints();
        this.initSlides();
        this.registerRootStyles();
        this.registerTrackStyles();
        this.registerSlideStyles();
        this.registerListStyles();
    }
    /**
     * Initializes slides.
     */
    initSlides() {
        (0, utils_1.push)(this.slides, this.contents.map((content, index) => {
            content = (0, utils_1.isString)(content) ? { html: content } : content;
            content.styles = content.styles || {};
            content.attrs = content.attrs || {};
            this.cover(content);
            const classes = `${this.options.classes.slide} ${index === 0 ? classes_1.CLASS_ACTIVE : ''}`;
            (0, utils_1.assign)(content.attrs, {
                class: `${classes} ${content.attrs.class || ''}`.trim(),
                style: this.buildStyles(content.styles),
            });
            return content;
        }));
        if (this.isLoop()) {
            this.generateClones(this.slides);
        }
    }
    /**
     * Registers styles for the root element.
     */
    registerRootStyles() {
        this.breakpoints.forEach(([width, options]) => {
            this.Style.rule(' ', 'max-width', (0, utils_1.unit)(options.width), width);
        });
    }
    /**
     * Registers styles for the track element.
     */
    registerTrackStyles() {
        const { Style } = this;
        const selector = `.${classes_1.CLASS_TRACK}`;
        this.breakpoints.forEach(([width, options]) => {
            Style.rule(selector, this.resolve('paddingLeft'), this.cssPadding(options, false), width);
            Style.rule(selector, this.resolve('paddingRight'), this.cssPadding(options, true), width);
            Style.rule(selector, 'height', this.cssTrackHeight(options), width);
        });
    }
    /**
     * Registers styles for the list element.
     */
    registerListStyles() {
        const { Style } = this;
        const selector = `.${classes_1.CLASS_LIST}`;
        this.breakpoints.forEach(([width, options]) => {
            Style.rule(selector, 'transform', this.buildTranslate(options), width);
            if (!this.cssSlideHeight(options)) {
                Style.rule(selector, 'aspect-ratio', this.cssAspectRatio(options), width);
            }
        });
    }
    /**
     * Registers styles for slides and clones.
     */
    registerSlideStyles() {
        const { Style } = this;
        const selector = `.${classes_1.CLASS_SLIDE}`;
        this.breakpoints.forEach(([width, options]) => {
            Style.rule(selector, 'width', this.cssSlideWidth(options), width);
            Style.rule(selector, 'height', this.cssSlideHeight(options) || '100%', width);
            Style.rule(selector, this.resolve('marginRight'), (0, utils_1.unit)(options.gap) || '0px', width);
            Style.rule(`${selector} > img`, 'display', options.cover ? 'none' : 'inline', width);
        });
    }
    /**
     * Builds multiple `translateX` for the list element.
     *
     * @param options - Options for each breakpoint.
     *
     * @return A string with multiple translate functions.
     */
    buildTranslate(options) {
        const { resolve, orient } = this.Direction;
        const values = [];
        values.push(this.cssOffsetClones(options));
        values.push(this.cssOffsetGaps(options));
        if (this.isCenter(options)) {
            values.push(this.buildCssValue(orient(-50), '%'));
            values.push(...this.cssOffsetCenter(options));
        }
        return values
            .filter(Boolean)
            .map(value => `translate${resolve('X')}(${value})`)
            .join(' ');
    }
    /**
     * Returns offset for the list element.
     * This does not include gaps because it can not be converted into percent.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    cssOffsetClones(options) {
        const { resolve, orient } = this.Direction;
        const cloneCount = this.getCloneCount();
        if (this.isFixedWidth(options)) {
            const { value, unit } = this.parseCssValue(options[resolve('fixedWidth')]);
            return this.buildCssValue(orient(value) * cloneCount, unit);
        }
        const percent = 100 * cloneCount / options.perPage;
        return `${orient(percent)}%`;
    }
    /**
     * Returns offset for centering the active slide.
     *
     * Note:
     * ( 100% + gap ) / perPage - gap
     * 100% / perPage + gap / perPage - gap;
     * 50% / perPage + ( gap / perPage - gap ) / 2;
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    cssOffsetCenter(options) {
        const { resolve, orient } = this.Direction;
        if (this.isFixedWidth(options)) {
            const { value, unit } = this.parseCssValue(options[resolve('fixedWidth')]);
            return [this.buildCssValue(orient(value / 2), unit)];
        }
        const values = [];
        const { perPage, gap } = options;
        values.push(`${orient(50 / perPage)}%`);
        if (gap) {
            const { value, unit } = this.parseCssValue(gap);
            const gapOffset = (value / perPage - value) / 2;
            values.push(this.buildCssValue(orient(gapOffset), unit));
        }
        return values;
    }
    /**
     * Returns offset for gaps.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset as `calc()`.
     */
    cssOffsetGaps(options) {
        const cloneCount = this.getCloneCount();
        if (cloneCount && options.gap) {
            const { orient } = this.Direction;
            const { value, unit } = this.parseCssValue(options.gap);
            if (this.isFixedWidth(options)) {
                return this.buildCssValue(orient(value * cloneCount), unit);
            }
            const { perPage } = options;
            const gaps = cloneCount / perPage;
            return this.buildCssValue(orient(gaps * value), unit);
        }
        return '';
    }
    /**
     * Resolves the prop for the current direction and converts it into the Kebab case.
     *
     * @param prop - A property name to resolve.
     *
     * @return A resolved property name in the Kebab case.
     */
    resolve(prop) {
        return (0, utils_1.camelToKebab)(this.Direction.resolve(prop));
    }
    /**
     * Returns padding in the CSS format.
     *
     * @param options - Options.
     * @param right   - Determines whether to get padding right or left.
     *
     * @return Padding in the CSS format.
     */
    cssPadding(options, right) {
        const { padding } = options;
        const prop = this.Direction.resolve(right ? 'right' : 'left', true);
        return padding && (0, utils_1.unit)(padding[prop] || ((0, utils_1.isObject)(padding) ? 0 : padding)) || '0px';
    }
    /**
     * Returns height of the track element in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    cssTrackHeight(options) {
        let height = '';
        if (this.isVertical()) {
            height = this.cssHeight(options);
            (0, utils_1.assert)(height, '"height" is missing.');
            height = `calc(${height} - ${this.cssPadding(options, false)} - ${this.cssPadding(options, true)})`;
        }
        return height;
    }
    /**
     * Returns height provided though options in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    cssHeight(options) {
        return (0, utils_1.unit)(options.height);
    }
    /**
     * Returns width of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Width in the CSS format.
     */
    cssSlideWidth(options) {
        return options.autoWidth
            ? ''
            : (0, utils_1.unit)(options.fixedWidth) || (this.isVertical() ? '' : this.cssSlideSize(options));
    }
    /**
     * Returns height of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    cssSlideHeight(options) {
        return (0, utils_1.unit)(options.fixedHeight)
            || (this.isVertical()
                ? (options.autoHeight ? '' : this.cssSlideSize(options))
                : this.cssHeight(options));
    }
    /**
     * Returns width or height of each slide in the CSS format, considering the current direction.
     *
     * @param options - Options.
     *
     * @return Width or height in the CSS format.
     */
    cssSlideSize(options) {
        const gap = (0, utils_1.unit)(options.gap);
        return `calc((100%${gap && ` + ${gap}`})/${options.perPage || 1}${gap && ` - ${gap}`})`;
    }
    /**
     * Returns the aspectRatio value to simulate the `heightRatio` option.
     *
     * @param options - Options.
     *
     * @return aspectRatio in the CSS format.
     */
    cssAspectRatio(options) {
        const { heightRatio } = options;
        return heightRatio ? `${1 / heightRatio}` : '';
    }
    /**
     * Builds the css value by the provided value and unit.
     *
     * @param value - A value.
     * @param unit  - A CSS unit.
     *
     * @return A built value for a CSS value.
     */
    buildCssValue(value, unit) {
        return `${value}${unit}`;
    }
    /**
     * Parses the CSS value into number and unit.
     *
     * @param value - A value to parse.
     *
     * @return An object with value and unit.
     */
    parseCssValue(value) {
        if ((0, utils_1.isString)(value)) {
            const number = parseFloat(value) || 0;
            const unit = value.replace(/\d*(\.\d*)?/, '') || 'px';
            return { value: number, unit };
        }
        return { value, unit: 'px' };
    }
    /**
     * Parses breakpoints and generate options for each breakpoint.
     */
    parseBreakpoints() {
        const { breakpoints } = this.options;
        this.breakpoints.push(['default', this.options]);
        if (breakpoints) {
            (0, utils_1.forOwn)(breakpoints, (options, width) => {
                this.breakpoints.push([width, (0, utils_1.merge)((0, utils_1.merge)({}, this.options), options)]);
            });
        }
    }
    /**
     * Checks if the slide width is fixed or not.
     *
     * @return `true` if the slide width is fixed, or otherwise `false`.
     */
    isFixedWidth(options) {
        return !!options[this.Direction.resolve('fixedWidth')];
    }
    /**
     * Checks if the slider type is loop or not.
     *
     * @return `true` if the slider type is loop, or otherwise `false`.
     */
    isLoop() {
        return this.options.type === types_1.LOOP;
    }
    /**
     * Checks if the active slide should be centered or not.
     *
     * @return `true` if the slide should be centered, or otherwise `false`.
     */
    isCenter(options) {
        if (options.focus === 'center') {
            if (this.isLoop()) {
                return true;
            }
            if (this.options.type === types_1.SLIDE) {
                return !this.options.trimSpace;
            }
        }
        return false;
    }
    /**
     * Checks if the direction is TTB or not.
     *
     * @return `true` if the direction is TTB, or otherwise `false`.
     */
    isVertical() {
        return this.options.direction === directions_1.TTB;
    }
    /**
     * Builds classes of the root element.
     *
     * @return Classes for the root element as a single string.
     */
    buildClasses() {
        const { options } = this;
        return [
            classes_1.CLASS_ROOT,
            `${classes_1.CLASS_ROOT}--${options.type}`,
            `${classes_1.CLASS_ROOT}--${options.direction}`,
            options.drag && `${classes_1.CLASS_ROOT}--draggable`,
            options.isNavigation && `${classes_1.CLASS_ROOT}--nav`,
            classes_1.CLASS_ACTIVE,
            !this.config.hidden && classes_2.CLASS_RENDERED,
        ].filter(Boolean).join(' ');
    }
    /**
     * Converts provided attributes into a single string.
     *
     * @param attrs - An object with attributes.
     *
     * @return A built string.
     */
    buildAttrs(attrs) {
        let attr = '';
        (0, utils_1.forOwn)(attrs, (value, key) => {
            attr += value ? ` ${(0, utils_1.camelToKebab)(key)}="${value}"` : '';
        });
        return attr.trim();
    }
    /**
     * Converts provided styles into a single string.
     *
     * @param styles - An object with styles.
     *
     * @return A built string.
     */
    buildStyles(styles) {
        let style = '';
        (0, utils_1.forOwn)(styles, (value, key) => {
            style += ` ${(0, utils_1.camelToKebab)(key)}:${value};`;
        });
        return style.trim();
    }
    /**
     * Generates HTML of slides with inserting provided contents.
     *
     * @return The HTML for all slides and clones.
     */
    renderSlides() {
        const { slideTag: tag } = this.config;
        return this.slides.map(content => {
            return `<${tag} ${this.buildAttrs(content.attrs)}>${content.html || ''}</${tag}>`;
        }).join('');
    }
    /**
     * Add the `background` style for the cover mode.
     *
     * @param content - A slide content.
     */
    cover(content) {
        const { styles, html = '' } = content;
        if (this.options.cover && !this.options.lazyLoad) {
            const src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);
            if (src && src[2]) {
                styles.background = `center/cover no-repeat url('${src[2]}')`;
            }
        }
    }
    /**
     * Generates clones.
     *
     * @param contents - An array with SlideContent objects.
     */
    generateClones(contents) {
        const { classes } = this.options;
        const count = this.getCloneCount();
        const slides = contents.slice();
        while (slides.length < count) {
            (0, utils_1.push)(slides, slides);
        }
        (0, utils_1.push)(slides.slice(-count).reverse(), slides.slice(0, count)).forEach((content, index) => {
            const attrs = (0, utils_1.assign)({}, content.attrs, { class: `${content.attrs.class} ${classes.clone}` });
            const clone = (0, utils_1.assign)({}, content, { attrs });
            index < count ? contents.unshift(clone) : contents.push(clone);
        });
    }
    /**
     * Returns the number of clones to generate.
     *
     * @return A number of clones.
     */
    getCloneCount() {
        if (this.isLoop()) {
            const { options } = this;
            if (options.clones) {
                return options.clones;
            }
            const perPage = (0, utils_1.max)(...this.breakpoints.map(([, options]) => options.perPage));
            return perPage * ((options.flickMaxPages || 1) + 1);
        }
        return 0;
    }
    /**
     * Generates arrows and the wrapper element.
     *
     * @return The HTML for arrows.
     */
    renderArrows() {
        let html = '';
        html += `<div class="${this.options.classes.arrows}">`;
        html += this.renderArrow(true);
        html += this.renderArrow(false);
        html += `</div>`;
        return html;
    }
    /**
     * Generates an arrow HTML.
     * Some attributes are temporary, and Splide changes them after mount.
     *
     * @param prev - Options for each breakpoint.
     *
     * @return The HTML for the prev or next arrow.
     */
    renderArrow(prev) {
        const { classes, i18n } = this.options;
        const attrs = {
            class: `${classes.arrow} ${prev ? classes.prev : classes.next}`,
            type: 'button',
            ariaLabel: prev ? i18n.prev : i18n.next,
        };
        return `<button ${this.buildAttrs(attrs)}>`
            + `<svg xmlns="${path_1.XML_NAME_SPACE}" viewBox="0 0 ${path_1.SIZE} ${path_1.SIZE}" width="${path_1.SIZE}" height="${path_1.SIZE}">`
            + `<path d="${this.options.arrowPath || path_1.PATH}" />`
            + `</svg>`
            + `</button>`;
    }
    /**
     * Returns the HTML of the slider.
     *
     * @return The generated HTML.
     */
    html() {
        const { rootClass, listTag, arrows, beforeTrack, afterTrack, slider, beforeSlider, afterSlider } = this.config;
        let html = '';
        html += `<div id="${this.id}" class="${this.buildClasses()} ${rootClass || ''}">`;
        html += `<style>${this.Style.build()}</style>`;
        if (slider) {
            html += beforeSlider || '';
            html += `<div class="splide__slider">`;
        }
        html += beforeTrack || '';
        if (arrows) {
            html += this.renderArrows();
        }
        html += `<div class="splide__track">`;
        html += `<${listTag} class="splide__list">`;
        html += this.renderSlides();
        html += `</${listTag}>`;
        html += `</div>`; // .track
        html += afterTrack || '';
        if (slider) {
            html += `</div>`;
            html += afterSlider || '';
        }
        html += `</div>`; // .splide
        return html;
    }
}
exports.SplideRenderer = SplideRenderer;
