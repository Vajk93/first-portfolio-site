"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const media_1 = require("../../constants/media");
const states_1 = require("../../constants/states");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const events_1 = require("../../constants/events");
/**
 * The component for observing media queries and updating options if necessary.
 * This used to be the Options component.
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Media component object.
 */
function Media(Splide, Components, options) {
    const { state } = Splide;
    const breakpoints = options.breakpoints || {};
    const reducedMotion = options.reducedMotion || {};
    const binder = (0, constructors_1.EventBinder)();
    /**
     * Stores options and MediaQueryList object.
     */
    const queries = [];
    /**
     * Called when the component is constructed.
     */
    function setup() {
        const isMin = options.mediaQuery === 'min';
        (0, utils_1.ownKeys)(breakpoints)
            .sort((n, m) => isMin ? +n - +m : +m - +n)
            .forEach(key => {
            register(breakpoints[key], `(${isMin ? 'min' : 'max'}-width:${key}px)`);
        });
        register(reducedMotion, media_1.MEDIA_PREFERS_REDUCED_MOTION);
        update();
    }
    /**
     * Destroys the component.
     *
     * @param completely - Will be `true` for complete destruction.
     */
    function destroy(completely) {
        if (completely) {
            binder.destroy();
        }
    }
    /**
     * Registers entries as [ Options, media query string ].
     *
     * @param options - Options merged to current options when the document matches the query.
     * @param query   - A query string.
     */
    function register(options, query) {
        const queryList = matchMedia(query);
        binder.bind(queryList, 'change', update);
        queries.push([options, queryList]);
    }
    /**
     * Checks all media queries in entries and updates options.
     */
    function update() {
        const destroyed = state.is(states_1.DESTROYED);
        const direction = options.direction;
        const merged = queries.reduce((merged, entry) => {
            return (0, utils_1.merge)(merged, entry[1].matches ? entry[0] : {});
        }, {});
        (0, utils_1.omit)(options);
        set(merged);
        if (options.destroy) {
            Splide.destroy(options.destroy === 'completely');
        }
        else if (destroyed) {
            destroy(true);
            Splide.mount();
        }
        else {
            direction !== options.direction && Splide.refresh();
        }
    }
    /**
     * Disables or enables `reducedMotion` options.
     * This method does nothing when the document does not match the query.
     *
     * @internal
     *
     * @param enable - Determines whether to apply `reducedMotion` options or not.
     */
    function reduce(enable) {
        if (matchMedia(media_1.MEDIA_PREFERS_REDUCED_MOTION).matches) {
            enable ? (0, utils_1.merge)(options, reducedMotion) : (0, utils_1.omit)(options, (0, utils_1.ownKeys)(reducedMotion));
        }
    }
    /**
     * Sets current options or base options (prototype).
     * If changing base options, always emits the `updated` event.
     *
     * @internal
     *
     * @param opts   - New options.
     * @param base   - Optional. Determines whether to also update base options or not.
     * @param notify - Optional. If `true`, always emits the `update` event.
     */
    function set(opts, base, notify) {
        (0, utils_1.merge)(options, opts);
        base && (0, utils_1.merge)(Object.getPrototypeOf(options), opts);
        if (notify || !state.is(states_1.CREATED)) {
            Splide.emit(events_1.EVENT_UPDATED, options);
        }
    }
    return {
        setup,
        destroy,
        reduce,
        set,
    };
}
exports.Media = Media;
