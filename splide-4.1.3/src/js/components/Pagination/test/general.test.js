"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Pagination', () => {
    test('can create pagination.', () => {
        const splide = (0, test_1.init)();
        const pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        expect(pagination.children.length).toBe(splide.length);
        expect(items.length).toBe(splide.length);
    });
    test('can create pagination according to the perPage option.', () => {
        const splide = (0, test_1.init)({ perPage: 3 });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        expect(items.length).toBe(Math.ceil(splide.length / 3));
    });
    test('should not paginate if the `focus` option is available.', () => {
        const splide = (0, test_1.init)({ perPage: 3, focus: 'center' });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        expect(items.length).toBe(splide.length);
    });
    test('should omit unnecessary items when `focus` and `omitEnd` options are enabled.', () => {
        const splide = (0, test_1.init)({ perPage: 3, focus: 0, omitEnd: true });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        expect(items.length).not.toBe(splide.length);
        expect(items.length).toBe(splide.Components.Controller.getEnd() + 1);
        expect(items.length).toBe(9);
    });
    test('can move the slider when the item is clicked.', () => {
        const splide = (0, test_1.init)({ speed: 0 });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        (0, test_1.fire)(items[1], 'click');
        expect(splide.index).toBe(1);
        (0, test_1.fire)(items[5], 'click');
        expect(splide.index).toBe(5);
    });
    test('can move the slider to the end index when the last item is clicked.', () => {
        const splide = (0, test_1.init)({ perPage: 3 });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        (0, test_1.fire)(items[items.length - 1], 'click');
        expect(splide.index).toBe(splide.Components.Controller.getEnd());
    });
    test('can update status classes by the index.', () => {
        const splide = (0, test_1.init)();
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        expect(items[0].classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        expect(items[0].getAttribute('aria-selected')).toBe('true');
        splide.go(2);
        expect(items[0].classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
        expect(items[0].getAttribute('aria-selected')).toBeNull();
        expect(items[2].classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        expect(items[2].getAttribute('aria-selected')).toBe('true');
    });
    test('can update status classes by the page.', () => {
        const splide = (0, test_1.init)({ perPage: 3, speed: 0 });
        const items = document.getElementsByClassName(classes_1.CLASS_PAGINATION_PAGE);
        splide.go(4); // page: 1
        expect(items[1].classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        expect(items[1].getAttribute('aria-selected')).toBe('true');
        splide.go(7); // end page
        expect(items[3].classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        expect(items[3].getAttribute('aria-selected')).toBe('true');
    });
    test('should remove the pagination on destroy.', () => {
        const splide = (0, test_1.init)();
        splide.destroy();
        const pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination).toBeNull();
    });
});
