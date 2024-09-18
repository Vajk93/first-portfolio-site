"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const closest_1 = require("./closest");
describe.each([['native'], ['polyfill']])('closest (%s)', (env) => {
    if (env === 'polyfill') {
        // Forces to disable the native method.
        Element.prototype.closest = null;
    }
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="container" class="wrapper">
        <div id="outer" class="wrapper">
          <div id="inner">
            <span id="start">start</span>
          </div>
        </div>
      </div>
    `;
    });
    test('can find the closest element.', () => {
        var _a, _b, _c, _d;
        const from = document.getElementById('start');
        if (from) {
            expect((_a = (0, closest_1.closest)(from, '#inner')) === null || _a === void 0 ? void 0 : _a.id).toBe('inner');
            expect((_b = (0, closest_1.closest)(from, '#outer')) === null || _b === void 0 ? void 0 : _b.id).toBe('outer');
            expect((_c = (0, closest_1.closest)(from, 'div')) === null || _c === void 0 ? void 0 : _c.id).toBe('inner');
            expect((_d = (0, closest_1.closest)(from, '.wrapper')) === null || _d === void 0 ? void 0 : _d.id).toBe('outer');
        }
        else {
            fail();
        }
    });
    test('should include the provided element itself.', () => {
        var _a;
        const from = document.getElementById('start');
        if (from) {
            expect((_a = (0, closest_1.closest)(from, 'span')) === null || _a === void 0 ? void 0 : _a.id).toBe('start');
        }
        else {
            fail();
        }
    });
    test('should return null if no element is found.', () => {
        const from = document.getElementById('start');
        if (from) {
            expect((0, closest_1.closest)(from, 'invalid')).toBeNull();
        }
        else {
            fail();
        }
    });
});
