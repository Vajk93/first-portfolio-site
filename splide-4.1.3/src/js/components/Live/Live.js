"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Live = void 0;
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * Delay in milliseconds before removing the SR field for Windows Narrator.
 */
const SR_REMOVAL_DELAY = 90;
/**
 * The component for implementing Live Region to the slider.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Live component object.
 */
function Live(Splide, Components, options) {
    const { on } = (0, constructors_1.EventInterface)(Splide);
    const { track } = Components.Elements;
    /**
     * Indicates whether the live region is enabled or not.
     */
    const enabled = options.live && !options.isNavigation;
    /**
     * The span element for the SR only text.
     */
    const sr = (0, utils_1.create)('span', classes_1.CLASS_SR);
    /**
     * Holds the RequestInterval instance.
     */
    const interval = (0, constructors_1.RequestInterval)(SR_REMOVAL_DELAY, (0, utils_1.apply)(toggle, false));
    /**
     * Called when the component is mounted.
     * - JAWS needs `aria-atomic` to make the `aria-busy` work.
     * - Immediately removing the SR makes Windows Narrator silent, hence requires the delay around 50ms.
     */
    function mount() {
        if (enabled) {
            disable(!Components.Autoplay.isPaused());
            (0, utils_1.setAttribute)(track, attributes_1.ARIA_ATOMIC, true);
            sr.textContent = '…';
            on(events_1.EVENT_AUTOPLAY_PLAY, (0, utils_1.apply)(disable, true));
            on(events_1.EVENT_AUTOPLAY_PAUSE, (0, utils_1.apply)(disable, false));
            on([events_1.EVENT_MOVED, events_1.EVENT_SCROLLED], (0, utils_1.apply)(toggle, true));
        }
    }
    /**
     * Toggles the SR field and `aria-busy`.
     *
     * @param active - Determines whether to activate the field or not.
     */
    function toggle(active) {
        (0, utils_1.setAttribute)(track, attributes_1.ARIA_BUSY, active);
        if (active) {
            (0, utils_1.append)(track, sr);
            interval.start();
        }
        else {
            (0, utils_1.remove)(sr);
            interval.cancel();
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        (0, utils_1.removeAttribute)(track, [attributes_1.ARIA_LIVE, attributes_1.ARIA_ATOMIC, attributes_1.ARIA_BUSY]);
        (0, utils_1.remove)(sr);
    }
    /**
     * Disables/enables the live region.
     * Does nothing when the `live` option is not enabled.
     *
     * @param disabled - `true` to disable the live region or `false` to enable it again.
     */
    function disable(disabled) {
        if (enabled) {
            (0, utils_1.setAttribute)(track, attributes_1.ARIA_LIVE, disabled ? 'off' : 'polite');
        }
    }
    return {
        mount,
        disable,
        destroy,
    };
}
exports.Live = Live;
