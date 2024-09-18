"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Controller#getEnd()', () => {
    test('can return the end index.', () => {
        const splide1 = (0, test_1.init)({ perPage: 3 }, { length: 4 });
        expect(splide1.Components.Controller.getEnd()).toBe(1);
        const splide2 = (0, test_1.init)({ perPage: 3 }, { length: 5 });
        expect(splide2.Components.Controller.getEnd()).toBe(2);
        const splide3 = (0, test_1.init)({ perPage: 3 }, { length: 6 });
        expect(splide3.Components.Controller.getEnd()).toBe(3);
    });
    test('should return length - 1 if the focus option is available.', () => {
        const splide = (0, test_1.init)({ focus: 'center', perPage: 3 }, { length: 4 });
        expect(splide.Components.Controller.getEnd()).toBe(splide.length - 1);
    });
    test('should return length - 1 if the perMove option is available in the loop mode.', () => {
        const splide = (0, test_1.init)({ type: 'loop', perMove: 3 }, { length: 4 });
        expect(splide.Components.Controller.getEnd()).toBe(splide.length - 1);
    });
    test('should return length - 1 if the perPage option is 1.', () => {
        const splide = (0, test_1.init)();
        expect(splide.Components.Controller.getEnd()).toBe(splide.length - 1);
    });
});
