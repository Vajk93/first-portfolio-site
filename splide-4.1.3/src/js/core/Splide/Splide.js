"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splide = void 0;
const ComponentConstructors = __importStar(require("../../components"));
const classes_1 = require("../../constants/classes");
const defaults_1 = require("../../constants/defaults");
const events_1 = require("../../constants/events");
const project_1 = require("../../constants/project");
const states_1 = require("../../constants/states");
const types_1 = require("../../constants/types");
const constructors_1 = require("../../constructors");
const transitions_1 = require("../../transitions");
const utils_1 = require("../../utils");
const attributes_1 = require("../../constants/attributes");
/**
 * The frontend class for the Splide slider.
 *
 * @since 3.0.0
 */
class Splide {
    /**
     * The Splide constructor.
     *
     * @param target  - The selector for the target element, or the element itself.
     * @param options - Optional. An object with options.
     */
    constructor(target, options) {
        /**
         * The EventBusObject object.
         */
        this.event = (0, constructors_1.EventInterface)();
        /**
         * The collection of all component objects.
         */
        this.Components = {};
        /**
         * The StateObject object.
         */
        this.state = (0, constructors_1.State)(states_1.CREATED);
        /**
         * An array with SyncTarget objects for splide instances to sync with.
         */
        this.splides = [];
        /**
         * The current options.
         */
        this._o = {};
        /**
         * The collection of extensions.
         */
        this._E = {};
        const root = (0, utils_1.isString)(target) ? (0, utils_1.query)(document, target) : target;
        (0, utils_1.assert)(root, `${root} is invalid.`);
        this.root = root;
        options = (0, utils_1.merge)({
            label: (0, utils_1.getAttribute)(root, attributes_1.ARIA_LABEL) || '',
            labelledby: (0, utils_1.getAttribute)(root, attributes_1.ARIA_LABELLEDBY) || '',
        }, defaults_1.DEFAULTS, Splide.defaults, options || {});
        try {
            (0, utils_1.merge)(options, JSON.parse((0, utils_1.getAttribute)(root, project_1.DATA_ATTRIBUTE)));
        }
        catch (e) {
            (0, utils_1.assert)(false, 'Invalid JSON');
        }
        this._o = Object.create((0, utils_1.merge)({}, options));
    }
    /**
     * Initializes the instance.
     *
     * @param Extensions - Optional. An object with extensions.
     * @param Transition - Optional. A Transition component.
     *
     * @return `this`
     */
    mount(Extensions, Transition) {
        const { state, Components } = this;
        (0, utils_1.assert)(state.is([states_1.CREATED, states_1.DESTROYED]), 'Already mounted!');
        state.set(states_1.CREATED);
        this._C = Components;
        this._T = Transition || this._T || (this.is(types_1.FADE) ? transitions_1.Fade : transitions_1.Slide);
        this._E = Extensions || this._E;
        const Constructors = (0, utils_1.assign)({}, ComponentConstructors, this._E, { Transition: this._T });
        (0, utils_1.forOwn)(Constructors, (Component, key) => {
            const component = Component(this, Components, this._o);
            Components[key] = component;
            component.setup && component.setup();
        });
        (0, utils_1.forOwn)(Components, component => {
            component.mount && component.mount();
        });
        this.emit(events_1.EVENT_MOUNTED);
        (0, utils_1.addClass)(this.root, classes_1.CLASS_INITIALIZED);
        state.set(states_1.IDLE);
        this.emit(events_1.EVENT_READY);
        return this;
    }
    /**
     * Syncs the slider with the provided one.
     * This method must be called before the `mount()`.
     *
     * @example
     * ```ts
     * var primary   = new Splide();
     * var secondary = new Splide();
     *
     * primary.sync( secondary );
     * primary.mount();
     * secondary.mount();
     * ```
     *
     * @param splide - A Splide instance to sync with.
     *
     * @return `this`
     */
    sync(splide) {
        this.splides.push({ splide });
        splide.splides.push({ splide: this, isParent: true });
        if (this.state.is(states_1.IDLE)) {
            this._C.Sync.remount();
            splide.Components.Sync.remount();
        }
        return this;
    }
    /**
     * Moves the slider with the following control pattern.
     *
     * | Pattern | Description |
     * |---|---|
     * | `i` | Goes to the slide `i` |
     * | `'+${i}'` | Increments the slide index by `i` |
     * | `'-${i}'` | Decrements the slide index by `i` |
     * | `'>'` | Goes to the next page |
     * | `'<'` | Goes to the previous page |
     * | `>${i}` | Goes to the page `i` |
     *
     * In most cases, `'>'` and `'<'` notations are enough to control the slider
     * because they respect `perPage` and `perMove` options.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     *
     * // Goes to the slide 1:
     * splide.go( 1 );
     *
     * // Increments the index:
     * splide.go( '+2' );
     *
     * // Goes to the next page:
     * splide.go( '>' );
     *
     * // Goes to the page 2:
     * splide.go( '>2' );
     * ```
     *
     * @param control - A control pattern.
     *
     * @return `this`
     */
    go(control) {
        this._C.Controller.go(control);
        return this;
    }
    on(events, callback) {
        this.event.on(events, callback);
        return this;
    }
    /**
     * Removes the registered all handlers for the specified event or events.
     * If you want to only remove a particular handler, use namespace to identify it.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     *
     * // Removes all handlers assigned to "move":
     * splide.off( 'move' );
     *
     * // Only removes handlers that belong to the specified namespace:
     * splide.off( 'move.myNamespace' );
     * ```
     *
     * @param events - An event name or names separated by spaces. Use a dot(.) to append a namespace.
     *
     * @return `this`
     */
    off(events) {
        this.event.off(events);
        return this;
    }
    emit(event) {
        // eslint-disable-next-line prefer-rest-params, prefer-spread
        this.event.emit(event, ...(0, utils_1.slice)(arguments, 1));
        return this;
    }
    /**
     * Inserts a slide at the specified position.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     * splide.mount();
     *
     * // Adds the slide by the HTML:
     * splide.add( '<li></li> );
     *
     * // or adds the element:
     * splide.add( document.createElement( 'li' ) );
     * ```
     *
     * @param slides - A slide element, an HTML string that represents a slide, or an array with them.
     * @param index  - Optional. An index to insert a slide at.
     *
     * @return `this`
     */
    add(slides, index) {
        this._C.Slides.add(slides, index);
        return this;
    }
    /**
     * Removes slides that match the matcher
     * that can be an index, an array with indices, a selector, or an iteratee function.
     *
     * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
     */
    remove(matcher) {
        this._C.Slides.remove(matcher);
        return this;
    }
    /**
     * Checks the slider type.
     *
     * @param type - A type to test.
     *
     * @return `true` if the type matches the current one, or otherwise `false`.
     */
    is(type) {
        return this._o.type === type;
    }
    /**
     * Refreshes the slider.
     *
     * @return `this`
     */
    refresh() {
        this.emit(events_1.EVENT_REFRESH);
        return this;
    }
    /**
     * Destroys the slider.
     *
     * @param completely - Optional. If `true`, Splide will not remount the slider by breakpoints.
     *
     * @return `this`
     */
    destroy(completely = true) {
        const { event, state } = this;
        if (state.is(states_1.CREATED)) {
            // Postpones destruction requested before the slider becomes ready.
            (0, constructors_1.EventInterface)(this).on(events_1.EVENT_READY, this.destroy.bind(this, completely));
        }
        else {
            (0, utils_1.forOwn)(this._C, component => {
                component.destroy && component.destroy(completely);
            }, true);
            event.emit(events_1.EVENT_DESTROY);
            event.destroy();
            completely && (0, utils_1.empty)(this.splides);
            state.set(states_1.DESTROYED);
        }
        return this;
    }
    /**
     * Returns options.
     *
     * @return An object with the latest options.
     */
    get options() {
        return this._o;
    }
    /**
     * Merges options to the current options and emits `updated` event.
     *
     * @param options - An object with new options.
     */
    set options(options) {
        this._C.Media.set(options, true, true);
    }
    /**
     * Returns the number of slides without clones.
     *
     * @return The number of slides.
     */
    get length() {
        return this._C.Slides.getLength(true);
    }
    /**
     * Returns the active slide index.
     *
     * @return The active slide index.
     */
    get index() {
        return this._C.Controller.getIndex();
    }
}
exports.Splide = Splide;
/**
 * Changes the default options for all Splide instances.
 */
Splide.defaults = {};
/**
 * The collection of state numbers.
 */
Splide.STATES = states_1.STATES;
