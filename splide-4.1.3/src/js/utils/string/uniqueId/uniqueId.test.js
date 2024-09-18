"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueId_1 = require("./uniqueId");
describe('uniqueId', () => {
    test('can generate a sequential unique ID.', () => {
        expect((0, uniqueId_1.uniqueId)('container-')).toBe('container-01');
        expect((0, uniqueId_1.uniqueId)('container-')).toBe('container-02');
        expect((0, uniqueId_1.uniqueId)('button-')).toBe('button-01');
        expect((0, uniqueId_1.uniqueId)('button-')).toBe('button-02');
        expect((0, uniqueId_1.uniqueId)('container-')).toBe('container-03');
        expect((0, uniqueId_1.uniqueId)('container-')).toBe('container-04');
        expect((0, uniqueId_1.uniqueId)('button-')).toBe('button-03');
        expect((0, uniqueId_1.uniqueId)('button-')).toBe('button-04');
    });
});
