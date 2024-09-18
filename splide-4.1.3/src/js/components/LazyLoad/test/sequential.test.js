"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const constants_1 = require("../../../test/fixtures/constants");
describe('LazyLoad in the `sequential` mode', () => {
    test('can sequentially load images.', () => {
        (0, test_1.init)({ lazyLoad: 'sequential' }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].src).toBe(`${constants_1.URL}/0.jpg`);
        expect(images[1].src).toBe('');
        expect(images[2].src).toBe('');
        (0, test_1.fire)(images[0], 'load');
        expect(images[1].src).toBe(`${constants_1.URL}/1.jpg`);
        expect(images[2].src).toBe('');
        (0, test_1.fire)(images[1], 'load');
        expect(images[2].src).toBe(`${constants_1.URL}/2.jpg`);
    });
    test('should load the next image if the current image throws error to load.', () => {
        (0, test_1.init)({ lazyLoad: 'sequential' }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].src).toBe(`${constants_1.URL}/0.jpg`);
        expect(images[1].src).toBe('');
        expect(images[2].src).toBe('');
        (0, test_1.fire)(images[0], 'error');
        expect(images[1].src).toBe(`${constants_1.URL}/1.jpg`);
        (0, test_1.fire)(images[1], 'error');
        expect(images[2].src).toBe(`${constants_1.URL}/2.jpg`);
    });
});
