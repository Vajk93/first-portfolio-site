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
const RequestInterval_1 = require("../RequestInterval");
describe('RequestInterval', () => {
    test('can invoke a function repeatedly by the specified interval.', () => __awaiter(void 0, void 0, void 0, function* () {
        const callback = jest.fn();
        const duration = 1000;
        const durationAndBuffer = 1100;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback);
        interval.start();
        expect(callback).not.toHaveBeenCalled();
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(2);
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(3);
    }));
    test('can cancel the active interval.', () => __awaiter(void 0, void 0, void 0, function* () {
        const callback = jest.fn();
        const duration = 1000;
        const durationAndBuffer = 1100;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback);
        interval.start();
        expect(callback).not.toHaveBeenCalled();
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
        interval.cancel();
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
    }));
    test('can pause/resume the active interval.', () => __awaiter(void 0, void 0, void 0, function* () {
        const callback = jest.fn();
        const duration = 1000;
        const durationAndBuffer = 1100;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback);
        interval.start();
        expect(callback).not.toHaveBeenCalled();
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
        interval.pause();
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(1);
        interval.start(true);
        yield (0, test_1.wait)(durationAndBuffer);
        expect(callback).toHaveBeenCalledTimes(2);
    }));
    test('can rewind the active interval.', () => __awaiter(void 0, void 0, void 0, function* () {
        const callback = jest.fn();
        const duration = 1000;
        const buffer = 100;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback);
        interval.start();
        expect(callback).not.toHaveBeenCalled();
        // Rewind the interval timer around 900ms
        yield (0, test_1.wait)(duration - buffer);
        interval.rewind();
        // Now around 1100ms, but the callback should not be called.
        yield (0, test_1.wait)(buffer * 2);
        expect(callback).not.toHaveBeenCalled();
        // Around 1200ms after calling `rewind()`. The rewound timer should be expired.
        yield (0, test_1.wait)(duration);
        expect(callback).toHaveBeenCalledTimes(1);
    }));
    test('can check if the interval is paused or not.', () => {
        const callback = jest.fn();
        const duration = 1000;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback);
        expect(interval.isPaused()).toBe(true);
        interval.start();
        expect(interval.isPaused()).toBe(false);
        interval.pause();
        expect(interval.isPaused()).toBe(true);
        interval.start();
        expect(interval.isPaused()).toBe(false);
        interval.cancel();
        expect(interval.isPaused()).toBe(true);
    });
    test('should pause the interval after reaching the limit.', () => __awaiter(void 0, void 0, void 0, function* () {
        const callback = jest.fn();
        const duration = 1000;
        const interval = (0, RequestInterval_1.RequestInterval)(duration, callback, null, 1);
        yield (0, test_1.wait)(duration + 100);
        expect(interval.isPaused()).toBe(true);
    }));
});
