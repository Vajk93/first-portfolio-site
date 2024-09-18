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
const constants_1 = require("../../Scroll/constants");
describe('Controller#scroll()', () => {
    test('can scroll the carousel.', done => {
        const splide = (0, test_1.init)();
        const { scroll } = splide.Components.Controller;
        scroll(-100, 100, false, () => {
            expect(splide.Components.Move.getPosition()).toBe(-100);
            done();
        });
    });
    test('can update the index after scroll.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ width: 100 });
        const { scroll } = splide.Components.Controller;
        scroll(-100, 100);
        yield (0, test_1.wait)(200);
        expect(splide.index).toBe(1);
        scroll(-200, 100);
        yield (0, test_1.wait)(200);
        expect(splide.index).toBe(2);
    }));
    test('can update the index after the carousel exceeds bounds.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ width: 100 });
        const { scroll } = splide.Components.Controller;
        scroll(-100, 100);
        yield (0, test_1.wait)(200);
        expect(splide.index).toBe(1);
        // Make the carousel exceed the left limit.
        scroll(100, 100);
        yield (0, test_1.wait)(100 + constants_1.BOUNCE_DURATION + 100);
        expect(splide.index).toBe(0);
    }));
});
