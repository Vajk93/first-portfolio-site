"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoplay = void 0;
const attributes_1 = require("../../constants/attributes");
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
/**
 * The component for autoplay, handling a progress bar and a toggle button.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Autoplay component object.
 */
function Autoplay(Splide, Components, options) {
    const { on, bind, emit } = (0, constructors_1.EventInterface)(Splide);
    const interval = (0, constructors_1.RequestInterval)(options.interval, Splide.go.bind(Splide, '>'), onAnimationFrame);
    const { isPaused } = interval;
    const { Elements, Elements: { root, toggle } } = Components;
    const { autoplay } = options;
    /**
     * Indicates whether the slider is hovered or not.
     */
    let hovered;
    /**
     * Indicates whether one of slider elements has focus or not.
     */
    let focused;
    /**
     * Indicates whether the autoplay is stopped or not.
     * If stopped, autoplay won't start automatically unless `play()` is explicitly called.
     */
    let stopped = autoplay === 'pause';
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (autoplay) {
            listen();
            toggle && (0, utils_1.setAttribute)(toggle, attributes_1.ARIA_CONTROLS, Elements.track.id);
            stopped || play();
            update();
        }
    }
    /**
     * Listens to some events.
     */
    function listen() {
        if (options.pauseOnHover) {
            bind(root, 'mouseenter mouseleave', e => {
                hovered = e.type === 'mouseenter';
                autoToggle();
            });
        }
        if (options.pauseOnFocus) {
            bind(root, 'focusin focusout', e => {
                focused = e.type === 'focusin';
                autoToggle();
            });
        }
        if (toggle) {
            bind(toggle, 'click', () => {
                stopped ? play() : pause(true);
            });
        }
        on([events_1.EVENT_MOVE, events_1.EVENT_SCROLL, events_1.EVENT_REFRESH], interval.rewind);
        on(events_1.EVENT_MOVE, onMove);
    }
    /**
     * Starts autoplay and clears all flags.
     */
    function play() {
        if (isPaused() && Components.Slides.isEnough()) {
            interval.start(!options.resetProgress);
            focused = hovered = stopped = false;
            update();
            emit(events_1.EVENT_AUTOPLAY_PLAY);
        }
    }
    /**
     * Pauses autoplay.
     *
     * @param stop - If `true`, autoplay keeps paused until `play()` is explicitly called.
     */
    function pause(stop = true) {
        stopped = !!stop;
        update();
        if (!isPaused()) {
            interval.pause();
            emit(events_1.EVENT_AUTOPLAY_PAUSE);
        }
    }
    /**
     * Toggles play/pause according to current flags.
     * If autoplay is manually paused, this will do nothing.
     */
    function autoToggle() {
        if (!stopped) {
            hovered || focused ? pause(false) : play();
        }
    }
    /**
     * Updates the toggle button status.
     */
    function update() {
        if (toggle) {
            (0, utils_1.toggleClass)(toggle, classes_1.CLASS_ACTIVE, !stopped);
            (0, utils_1.setAttribute)(toggle, attributes_1.ARIA_LABEL, options.i18n[stopped ? 'play' : 'pause']);
        }
    }
    /**
     * Called on every animation frame while autoplay is active.
     *
     * @param rate - The progress rate between 0 and 1.
     */
    function onAnimationFrame(rate) {
        const { bar } = Elements;
        bar && (0, utils_1.style)(bar, 'width', `${rate * 100}%`);
        emit(events_1.EVENT_AUTOPLAY_PLAYING, rate);
    }
    /**
     * Updates or restores the interval duration.
     *
     * @param index - An index to move to.
     */
    function onMove(index) {
        const Slide = Components.Slides.getAt(index);
        interval.set(Slide && +(0, utils_1.getAttribute)(Slide.slide, constants_1.INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }
    return {
        mount,
        destroy: interval.cancel,
        play,
        pause,
        isPaused,
    };
}
exports.Autoplay = Autoplay;
