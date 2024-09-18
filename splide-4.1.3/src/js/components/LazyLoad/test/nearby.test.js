"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const events_1 = require("../../../constants/events");
const test_1 = require("../../../test");
const constants_1 = require("../../../test/fixtures/constants");
const constants_2 = require("../constants");
describe('LazyLoad in the `nearby` mode', () => {
    test('does nothing if the lazyLoad option is falsy.', () => {
        (0, test_1.init)({}, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].src).toBe('');
        expect(images[0].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).not.toBeFalsy();
    });
    test('can find the src data attribute and set the value to the src.', () => {
        (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].src).toBe(`${constants_1.URL}/0.jpg`);
        expect(images[0].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
        expect(images[1].src).toBe(`${constants_1.URL}/1.jpg`);
        expect(images[1].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
    });
    test('can find the srcset data attribute and set the value to the src.', () => {
        (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrcset: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].srcset).toBe(`${constants_1.URL}/0.jpg 320w`);
        expect(images[0].getAttribute(constants_2.SRCSET_DATA_ATTRIBUTE)).toBeNull();
        expect(images[1].srcset).toBe(`${constants_1.URL}/1.jpg 320w`);
        expect(images[1].getAttribute(constants_2.SRCSET_DATA_ATTRIBUTE)).toBeNull();
    });
    test('should set the src if the value is not same with the one provided by the data attribute.', () => {
        (0, test_1.init)({ lazyLoad: true }, { src: 'placeholder', dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[0].src).toBe(`${constants_1.URL}/0.jpg`);
        expect(images[0].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
        expect(images[1].src).toBe(`${constants_1.URL}/1.jpg`);
        expect(images[1].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
    });
    test('can append a loading spinner and add a loading class to slides.', () => {
        const splide = (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const slide1 = splide.Components.Slides.getAt(0).slide;
        const slide2 = splide.Components.Slides.getAt(1).slide;
        const spinner1 = slide1.querySelector(`.${classes_1.CLASS_SPINNER}`);
        const spinner2 = slide2.querySelector(`.${classes_1.CLASS_SPINNER}`);
        expect(spinner1 instanceof HTMLSpanElement).toBe(true);
        expect(spinner2 instanceof HTMLSpanElement).toBe(true);
        expect(slide1.classList.contains(classes_1.CLASS_LOADING)).toBe(true);
        expect(slide2.classList.contains(classes_1.CLASS_LOADING)).toBe(true);
    });
    test('can remove a loading spinner and a loading class on load.', () => {
        const splide = (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        const slide1 = splide.Components.Slides.getAt(0).slide;
        const slide2 = splide.Components.Slides.getAt(1).slide;
        (0, test_1.fire)(images[0], 'load');
        expect(slide1.querySelector(`.${classes_1.CLASS_SPINNER}`)).toBeNull();
        expect(slide1.classList.contains(classes_1.CLASS_LOADING)).toBe(false);
        // The slide2 is still loading.
        expect(slide2.querySelector(`.${classes_1.CLASS_SPINNER}`)).not.toBeNull();
        expect(slide2.classList.contains(classes_1.CLASS_LOADING)).toBe(true);
        (0, test_1.fire)(images[1], 'load');
        expect(slide2.querySelector(`.${classes_1.CLASS_SPINNER}`)).toBeNull();
        expect(slide2.classList.contains(classes_1.CLASS_LOADING)).toBe(false);
    });
    test('can remove a loading class on error.', () => {
        const splide = (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        const slide1 = splide.Components.Slides.getAt(0).slide;
        const slide2 = splide.Components.Slides.getAt(1).slide;
        (0, test_1.fire)(images[0], 'error');
        // The spinner will not be removed on error.
        expect(slide1.querySelector(`.${classes_1.CLASS_SPINNER}`)).not.toBeNull();
        expect(slide1.classList.contains(classes_1.CLASS_LOADING)).toBe(false);
        (0, test_1.fire)(images[1], 'error');
        expect(slide2.querySelector(`.${classes_1.CLASS_SPINNER}`)).not.toBeNull();
        expect(slide2.classList.contains(classes_1.CLASS_LOADING)).toBe(false);
    });
    test('can start loading an image if the slide is close to the current location.', () => {
        const splide = (0, test_1.init)({ lazyLoad: true, speed: 0 }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[3].src).toBe('');
        expect(images[3].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).not.toBeNull();
        splide.go(2);
        expect(images[3].src).toBe(`${constants_1.URL}/3.jpg`);
        expect(images[3].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
        expect(images[4].src).toBe('');
        expect(images[4].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).not.toBeNull();
        splide.go(3);
        expect(images[4].src).toBe(`${constants_1.URL}/4.jpg`);
        expect(images[4].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).toBeNull();
    });
    test('can start loading images of previous slides in the loop mode.', () => {
        const splide = (0, test_1.init)({ type: 'loop', lazyLoad: true, perPage: 3 }, { src: false, dataSrc: true });
        const prev1 = splide.Components.Slides.getAt(-1);
        const prev2 = splide.Components.Slides.getAt(-2);
        const last1 = splide.Components.Slides.getAt(splide.length - 1);
        const last2 = splide.Components.Slides.getAt(splide.length - 2);
        expect(prev1.slide.querySelector('img').src).toBe(`${constants_1.URL}/${splide.length - 1}.jpg`);
        expect(prev2.slide.querySelector('img').src).toBe(`${constants_1.URL}/${splide.length - 2}.jpg`);
        expect(last1.slide.querySelector('img').src).toBe(`${constants_1.URL}/${splide.length - 1}.jpg`);
        expect(last2.slide.querySelector('img').src).toBe(`${constants_1.URL}/${splide.length - 2}.jpg`);
    });
    test('should not start loading an image if the slide is not close to the current location.', () => {
        (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const images = document.getElementsByTagName('img');
        expect(images[3].src).toBe('');
        expect(images[3].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).not.toBeNull();
        expect(images[4].src).toBe('');
        expect(images[4].getAttribute(constants_2.SRC_DATA_ATTRIBUTE)).not.toBeNull();
    });
    test('should emit an event after load.', done => {
        const splide = (0, test_1.init)({ lazyLoad: true }, { src: false, dataSrc: true });
        const Slide1 = splide.Components.Slides.getAt(0);
        const Slide2 = splide.Components.Slides.getAt(1);
        let count = 0;
        splide.on(events_1.EVENT_LAZYLOAD_LOADED, (img, Slide) => {
            if (count === 0) {
                expect(Slide).toBe(Slide1);
            }
            if (count === 1) {
                expect(Slide).toBe(Slide2);
                done();
            }
            count++;
        });
        (0, test_1.fire)(Slide1.slide.querySelector('img'), 'load');
        (0, test_1.fire)(Slide2.slide.querySelector('img'), 'load');
    });
});
