"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const arrows_1 = require("../../constants/arrows");
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const directions_1 = require("../../constants/directions");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const normalizeKey_1 = require("../../utils/dom/normalizeKey/normalizeKey");
/**
 * The component for the pagination UI (a slide picker).
 *
 * @link https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#grouped-carousel-elements
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Pagination component object.
 */
function Pagination(Splide, Components, options) {
    const event = (0, constructors_1.EventInterface)(Splide);
    const { on, emit, bind } = event;
    const { Slides, Elements, Controller } = Components;
    const { hasFocus, getIndex, go } = Controller;
    const { resolve } = Components.Direction;
    const { pagination: placeholder } = Elements;
    /**
     * Stores all pagination items.
     */
    const items = [];
    /**
     * The pagination element.
     */
    let list;
    /**
     * Holds modifier classes.
     */
    let paginationClasses;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        destroy();
        on([events_1.EVENT_UPDATED, events_1.EVENT_REFRESH, events_1.EVENT_END_INDEX_CHANGED], mount);
        const enabled = options.pagination;
        placeholder && (0, utils_1.display)(placeholder, enabled ? '' : 'none');
        if (enabled) {
            on([events_1.EVENT_MOVE, events_1.EVENT_SCROLL, events_1.EVENT_SCROLLED], update);
            createPagination();
            update();
            emit(events_1.EVENT_PAGINATION_MOUNTED, { list, items }, getAt(Splide.index));
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        if (list) {
            (0, utils_1.remove)(placeholder ? (0, utils_1.slice)(list.children) : list);
            (0, utils_1.removeClass)(list, paginationClasses);
            (0, utils_1.empty)(items);
            list = null;
        }
        event.destroy();
    }
    /**
     * Creates the pagination element and appends it to the slider.
     */
    function createPagination() {
        const { length } = Splide;
        const { classes, i18n, perPage } = options;
        const max = hasFocus() ? Controller.getEnd() + 1 : (0, utils_1.ceil)(length / perPage);
        list = placeholder || (0, utils_1.create)('ul', classes.pagination, Elements.track.parentElement);
        (0, utils_1.addClass)(list, (paginationClasses = `${classes_1.CLASS_PAGINATION}--${getDirection()}`));
        (0, utils_1.setAttribute)(list, attributes_1.ROLE, 'tablist');
        (0, utils_1.setAttribute)(list, attributes_1.ARIA_LABEL, i18n.select);
        (0, utils_1.setAttribute)(list, attributes_1.ARIA_ORIENTATION, getDirection() === directions_1.TTB ? 'vertical' : '');
        for (let i = 0; i < max; i++) {
            const li = (0, utils_1.create)('li', null, list);
            const button = (0, utils_1.create)('button', { class: classes.page, type: 'button' }, li);
            const controls = Slides.getIn(i).map(Slide => Slide.slide.id);
            const text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
            bind(button, 'click', (0, utils_1.apply)(onClick, i));
            if (options.paginationKeyboard) {
                bind(button, 'keydown', (0, utils_1.apply)(onKeydown, i));
            }
            (0, utils_1.setAttribute)(li, attributes_1.ROLE, 'presentation');
            (0, utils_1.setAttribute)(button, attributes_1.ROLE, 'tab');
            (0, utils_1.setAttribute)(button, attributes_1.ARIA_CONTROLS, controls.join(' '));
            (0, utils_1.setAttribute)(button, attributes_1.ARIA_LABEL, (0, utils_1.format)(text, i + 1));
            (0, utils_1.setAttribute)(button, attributes_1.TAB_INDEX, -1);
            items.push({ li, button, page: i });
        }
    }
    /**
     * Called when the user clicks each pagination dot.
     * Moves the focus to the active slide for accessibility.
     *
     * @link https://www.w3.org/WAI/tutorials/carousels/functionality/
     *
     * @param page - A clicked page index.
     */
    function onClick(page) {
        go(`>${page}`, true);
    }
    /**
     * Called when any key is pressed on the pagination.
     *
     * @link https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#keyboard-interaction-21
     *
     * @param page - A page index.
     * @param e    - A KeyboardEvent object.
     */
    function onKeydown(page, e) {
        const { length } = items;
        const key = (0, normalizeKey_1.normalizeKey)(e);
        const dir = getDirection();
        let nextPage = -1;
        if (key === resolve(arrows_1.ARROW_RIGHT, false, dir)) {
            nextPage = ++page % length;
        }
        else if (key === resolve(arrows_1.ARROW_LEFT, false, dir)) {
            nextPage = (--page + length) % length;
        }
        else if (key === 'Home') {
            nextPage = 0;
        }
        else if (key === 'End') {
            nextPage = length - 1;
        }
        const item = items[nextPage];
        if (item) {
            (0, utils_1.focus)(item.button);
            go(`>${nextPage}`);
            (0, utils_1.prevent)(e, true);
        }
    }
    /**
     * Returns the latest direction for pagination.
     */
    function getDirection() {
        return options.paginationDirection || options.direction;
    }
    /**
     * Returns the pagination item at the specified index.
     *
     * @param index - An index.
     *
     * @return A pagination item object if available, or otherwise `undefined`.
     */
    function getAt(index) {
        return items[Controller.toPage(index)];
    }
    /**
     * Updates the pagination status.
     */
    function update() {
        const prev = getAt(getIndex(true));
        const curr = getAt(getIndex());
        if (prev) {
            const { button } = prev;
            (0, utils_1.removeClass)(button, classes_1.CLASS_ACTIVE);
            (0, utils_1.removeAttribute)(button, attributes_1.ARIA_SELECTED);
            (0, utils_1.setAttribute)(button, attributes_1.TAB_INDEX, -1);
        }
        if (curr) {
            const { button } = curr;
            (0, utils_1.addClass)(button, classes_1.CLASS_ACTIVE);
            (0, utils_1.setAttribute)(button, attributes_1.ARIA_SELECTED, true);
            (0, utils_1.setAttribute)(button, attributes_1.TAB_INDEX, '');
        }
        emit(events_1.EVENT_PAGINATION_UPDATED, { list, items }, prev, curr);
    }
    return {
        items,
        mount,
        destroy,
        getAt,
        update,
    };
}
exports.Pagination = Pagination;
