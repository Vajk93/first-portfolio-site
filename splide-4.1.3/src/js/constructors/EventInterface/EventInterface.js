"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventInterface = void 0;
const events_1 = require("../../constants/events");
const utils_1 = require("../../utils");
const EventBinder_1 = require("../EventBinder/EventBinder");
/**
 * The constructor function that provides interface for internal and native events.
 *
 * @since 3.0.0
 * @constructor
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */
function EventInterface(Splide) {
    /**
     * The document fragment for internal events.
     * Provide the Splide instance to share the bus.
     */
    const bus = Splide ? Splide.event.bus : document.createDocumentFragment();
    /**
     * An event binder object.
     */
    const binder = (0, EventBinder_1.EventBinder)();
    /**
     * Listens to an internal event or events.
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param callback - A callback function to register.
     */
    function on(events, callback) {
        binder.bind(bus, (0, utils_1.toArray)(events).join(' '), e => {
            callback.apply(callback, (0, utils_1.isArray)(e.detail) ? e.detail : []);
        });
    }
    /**
     * Triggers callback functions.
     * This accepts additional arguments and passes them to callbacks.
     *
     * @param event - An event name.
     */
    function emit(event) {
        // eslint-disable-next-line prefer-rest-params, prefer-spread
        binder.dispatch(bus, event, (0, utils_1.slice)(arguments, 1));
    }
    if (Splide) {
        Splide.event.on(events_1.EVENT_DESTROY, binder.destroy);
    }
    return (0, utils_1.assign)(binder, {
        bus,
        on,
        off: (0, utils_1.apply)(binder.unbind, bus),
        emit,
    });
}
exports.EventInterface = EventInterface;
