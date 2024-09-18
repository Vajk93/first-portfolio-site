"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../constants/events");
const states_1 = require("../../../constants/states");
const test_1 = require("../../../test");
describe('Move#move()', () => {
    test('can move the slider with the transition component.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 100 });
        const { Move } = splide.Components;
        const { list } = splide.Components.Elements;
        Move.move(1, 1, -1);
        (0, test_1.fire)(list, 'transitionend');
        expect(list.style.transform).toBe('translateX(-200px)');
        Move.move(2, 2, -1);
        (0, test_1.fire)(list, 'transitionend');
        expect(list.style.transform).toBe('translateX(-400px)');
    });
    test('can change the state.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 100 });
        const { Move } = splide.Components;
        const { list } = splide.Components.Elements;
        Move.move(1, 1, -1);
        expect(splide.state.is(states_1.MOVING)).toBe(true);
        (0, test_1.fire)(list, 'transitionend');
        expect(splide.state.is(states_1.IDLE)).toBe(true);
    });
    test('can emit events.', done => {
        const splide = (0, test_1.init)({ width: 200, height: 100 });
        const { Move } = splide.Components;
        const { list } = splide.Components.Elements;
        splide.on(events_1.EVENT_MOVE, (index, prev, dest) => {
            expect(index).toBe(2);
            expect(prev).toBe(1);
            expect(dest).toBe(3);
        });
        splide.on(events_1.EVENT_MOVED, (index, prev, dest) => {
            expect(index).toBe(2);
            expect(prev).toBe(1);
            expect(dest).toBe(3);
            done();
        });
        Move.move(3, 2, 1);
        (0, test_1.fire)(list, 'transitionend');
    });
});
