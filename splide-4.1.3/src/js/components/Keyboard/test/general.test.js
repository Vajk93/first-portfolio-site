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
const directions_1 = require("../../../constants/directions");
const test_1 = require("../../../test");
describe('Keyboard', () => {
    test('can control the slider by keyboards.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ speed: 0, keyboard: 'global' });
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(2);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(0);
    }));
    test('can control the slider by keyboards in TTB mode.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ direction: directions_1.TTB, height: 1, speed: 0, keyboard: 'global' });
        (0, test_1.keydown)('ArrowDown');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowDown');
        expect(splide.index).toBe(2);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowUp');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowUp');
        expect(splide.index).toBe(0);
    }));
    test('can control the slider by keyboards in RTL mode.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ direction: directions_1.RTL, speed: 0, keyboard: 'global' });
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(2);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(0);
    }));
    test('can control the slider by keyboards only when the slider has focus in the `focused` mode.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ keyboard: 'focused', speed: 0 });
        const { root } = splide;
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(0);
        yield (0, test_1.wait)();
        splide.Components.Arrows.arrows.prev.focus();
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowRight', root);
        expect(splide.index).toBe(1);
    }));
    test('can disable the keyboard input.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ speed: 0, keyboard: 'global' });
        const { disable } = splide.Components.Keyboard;
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        disable(true);
        (0, test_1.keydown)('ArrowRight');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)();
        disable(false);
        (0, test_1.keydown)('ArrowLeft');
        expect(splide.index).toBe(0);
    }));
});
