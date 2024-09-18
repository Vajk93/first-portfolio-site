"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unit_1 = require("./unit");
describe('unit', () => {
    test('can append `px` if the value is number.', () => {
        expect((0, unit_1.unit)(1)).toBe('1px');
        expect((0, unit_1.unit)(1.8)).toBe('1.8px');
    });
    test('should return the value itself if it is string.', () => {
        expect((0, unit_1.unit)('10vh')).toBe('10vh');
        expect((0, unit_1.unit)('10em')).toBe('10em');
    });
});
