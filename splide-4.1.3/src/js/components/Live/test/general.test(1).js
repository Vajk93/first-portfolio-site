"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("../../../constants/attributes");
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Live', () => {
    test('can append a SR text and add aria-busy="true" to the track element after move.', () => {
        const splide = (0, test_1.init)({ live: true, speed: 0 });
        const { track } = splide.Components.Elements;
        splide.go(1);
        expect(track.getElementsByClassName(classes_1.CLASS_SR).length).toBe(1);
        expect(track.getAttribute(attributes_1.ARIA_BUSY)).toBe('true');
    });
    test('can remove a SR text and aria-busy from the track element.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ live: true, speed: 0 });
        const { track } = splide.Components.Elements;
        splide.go(1);
        yield (0, test_1.wait)(200);
        expect(track.getElementsByClassName(classes_1.CLASS_SR).length).toBe(0);
        expect(track.getAttribute(attributes_1.ARIA_BUSY)).toBe('false');
    }));
    test('can assign aria-live="polite" and aria-atomic="true" to the list element.', () => {
        const splide = (0, test_1.init)({ live: true });
        const { track } = splide.Components.Elements;
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
        expect(track.getAttribute(attributes_1.ARIA_ATOMIC)).toBe('true');
    });
    test('can remove aria attributes on destroy.', () => {
        const splide = (0, test_1.init)({ live: true });
        const { track } = splide.Components.Elements;
        splide.destroy();
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBeNull();
        expect(track.getAttribute(attributes_1.ARIA_ATOMIC)).toBeNull();
        expect(track.getAttribute(attributes_1.ARIA_BUSY)).toBeNull();
    });
    test('should assign aria attribute again on refresh.', () => {
        const splide = (0, test_1.init)({ live: true });
        const { track } = splide.Components.Elements;
        splide.refresh();
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
        expect(track.getAttribute(attributes_1.ARIA_ATOMIC)).toBe('true');
    });
    test('can assign aria-live="off" to the list element when the autoplay is `true`.', () => {
        const splide = (0, test_1.init)({ live: true, autoplay: true });
        expect(splide.Components.Elements.track.getAttribute(attributes_1.ARIA_LIVE)).toBe('off');
    });
    test('can assign aria-live="polite" to the list element when the autoplay is `"pause".`', () => {
        const splide = (0, test_1.init)({ live: true, autoplay: 'pause' });
        expect(splide.Components.Elements.track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
    });
    test('can change aria-live to "off" when autoplay starts, or to "polite" when autoplay stops.', () => {
        const splide = (0, test_1.init)({ live: true, autoplay: 'pause' });
        const { track } = splide.Components.Elements;
        const { play, pause } = splide.Components.Autoplay;
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
        play();
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('off');
        pause();
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
        play();
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('off');
    });
    test('can toggle aria-live by `disable()`', () => {
        const splide = (0, test_1.init)({ live: true });
        const { track } = splide.Components.Elements;
        const { disable } = splide.Components.Live;
        disable(true);
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('off');
        disable(false);
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('polite');
        disable(true);
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBe('off');
    });
    test('should do nothing when the `live` option is false.', () => {
        const splide = (0, test_1.init)({ live: false });
        const { track } = splide.Components.Elements;
        const { disable } = splide.Components.Live;
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBeNull();
        disable(true);
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBeNull();
        disable(false);
        expect(track.getAttribute(attributes_1.ARIA_LIVE)).toBeNull();
    });
});
