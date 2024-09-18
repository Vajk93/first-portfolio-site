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
const test_1 = require("../../../test");
describe('Autoplay', () => {
    test('can start autoplay.', () => __awaiter(void 0, void 0, void 0, function* () {
        const interval = 1000;
        const intervalAndBuffer = 1100;
        const splide = (0, test_1.init)({ autoplay: true, interval, waitForTransition: false });
        expect(splide.index).toBe(0);
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(2);
    }));
    test('can use the specified interval duration.', () => __awaiter(void 0, void 0, void 0, function* () {
        const interval = 2000;
        const intervalAndBuffer = 2100;
        const splide = (0, test_1.init)({ autoplay: true, interval, waitForTransition: false });
        expect(splide.index).toBe(0);
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(2);
    }));
    test('can use the interval duration provided by the data attribute.', () => __awaiter(void 0, void 0, void 0, function* () {
        const interval = 1000;
        const splide = (0, test_1.init)({ autoplay: true, interval, waitForTransition: false }, { dataInterval: [0, 2000] });
        expect(splide.index).toBe(0);
        yield (0, test_1.wait)(1100);
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)(1100); // Should be still 1 because using 2000
        expect(splide.index).toBe(1);
        yield (0, test_1.wait)(1000); // 2100
        expect(splide.index).toBe(2);
        yield (0, test_1.wait)(1100); // Should restore the interval to 1000
        expect(splide.index).toBe(3);
    }));
    test('can play/pause autoplay manually.', () => __awaiter(void 0, void 0, void 0, function* () {
        const interval = 1000;
        const intervalAndBuffer = 1100;
        const splide = (0, test_1.init)({ autoplay: true, interval, waitForTransition: false });
        const { Autoplay } = splide.Components;
        expect(splide.index).toBe(0);
        Autoplay.pause();
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(0);
        Autoplay.play();
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(1);
        Autoplay.pause();
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(1);
        Autoplay.play();
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(2);
    }));
    test('can check if autoplay is paused or not.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ autoplay: true, interval: 1000, waitForTransition: false });
        const { Autoplay } = splide.Components;
        expect(Autoplay.isPaused()).toBe(false);
        Autoplay.pause();
        expect(Autoplay.isPaused()).toBe(true);
        Autoplay.play();
        expect(Autoplay.isPaused()).toBe(false);
    }));
    test('should not start autoplay if the option is `pause`.', () => __awaiter(void 0, void 0, void 0, function* () {
        const interval = 1000;
        const intervalAndBuffer = 1100;
        const splide = (0, test_1.init)({ autoplay: 'pause', interval, waitForTransition: false });
        expect(splide.index).toBe(0);
        yield (0, test_1.wait)(intervalAndBuffer);
        expect(splide.index).toBe(0);
    }));
});
