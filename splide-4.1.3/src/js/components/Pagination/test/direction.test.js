"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Pagination direction', () => {
    test('should follow the `direction` option unless the user provides `paginationDirection`.', () => {
        (0, test_1.init)({ direction: 'ttb', height: 1000 });
        const pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--ttb`)).toBe(true);
        expect(pagination.getAttribute('aria-orientation')).toBe('vertical');
    });
    test('should follow the `paginationDirection`.', () => {
        (0, test_1.init)({ direction: 'ttb', paginationDirection: 'rtl', height: 1000 });
        const pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--rtl`)).toBe(true);
        expect(pagination.getAttribute('aria-orientation')).toBeNull();
    });
    test('should follow the `direction` option when it is updated.', () => {
        const splide = (0, test_1.init)();
        let pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--ltr`)).toBe(true);
        splide.options = { direction: 'rtl' };
        pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--rtl`)).toBe(true);
    });
    test('should follow the `paginationDirection` option when it is updated.', () => {
        const splide = (0, test_1.init)({ paginationDirection: 'ttb' });
        let pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--ttb`)).toBe(true);
        splide.options = { paginationDirection: 'ltr' };
        pagination = document.querySelector(`.${classes_1.CLASS_PAGINATION}`);
        expect(pagination.classList.contains(`${classes_1.CLASS_PAGINATION}--ltr`)).toBe(true);
    });
});
