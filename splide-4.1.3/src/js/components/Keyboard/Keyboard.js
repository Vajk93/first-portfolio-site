"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const arrows_1 = require("../../constants/arrows");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const normalizeKey_1 = require("../../utils/dom/normalizeKey/normalizeKey");
/**
 * The keyboard event name.
 *
 * @since 3.6.0
 */
const KEYBOARD_EVENT = 'keydown';
/**
 * The component for controlling the slider by keyboards.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Keyboard component object.
 */
function Keyboard(Splide, Components, options) {
    const { on, bind, unbind } = (0, constructors_1.EventInterface)(Splide);
    const { root } = Splide;
    const { resolve } = Components.Direction;
    /**
     * The target element of the keyboard event.
     */
    let target;
    /**
     * Indicates whether the component is currently disabled or not.
     */
    let disabled;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        on(events_1.EVENT_UPDATED, destroy);
        on(events_1.EVENT_UPDATED, init);
        on(events_1.EVENT_MOVE, onMove);
    }
    /**
     * Initializes the component.
     */
    function init() {
        const { keyboard } = options;
        if (keyboard) {
            target = keyboard === 'global' ? window : root;
            bind(target, KEYBOARD_EVENT, onKeydown);
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        unbind(target, KEYBOARD_EVENT);
    }
    /**
     * Disables the keyboard input.
     *
     * @param value - Toggles disabling/enabling the keyboard input.
     */
    function disable(value) {
        disabled = value;
    }
    /**
     * Called when the slider moves.
     * To avoid the slider from moving twice, wait for a tick.
     */
    function onMove() {
        const _disabled = disabled;
        disabled = true;
        (0, utils_1.nextTick)(() => { disabled = _disabled; });
    }
    /**
     * Called when any key is pressed on the target.
     *
     * @param e - A KeyboardEvent object.
     */
    function onKeydown(e) {
        if (!disabled) {
            const key = (0, normalizeKey_1.normalizeKey)(e);
            if (key === resolve(arrows_1.ARROW_LEFT)) {
                Splide.go('<');
            }
            else if (key === resolve(arrows_1.ARROW_RIGHT)) {
                Splide.go('>');
            }
        }
    }
    return {
        mount,
        destroy,
        disable,
    };
}
exports.Keyboard = Keyboard;
