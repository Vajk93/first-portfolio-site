"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyLoad = void 0;
const classes_1 = require("../../constants/classes");
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
/**
 * The component for lazily loading images.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An LazyLoad component object.
 */
function LazyLoad(Splide, Components, options) {
    const { on, off, bind, emit } = (0, constructors_1.EventInterface)(Splide);
    const isSequential = options.lazyLoad === 'sequential';
    const events = [events_1.EVENT_MOVED, events_1.EVENT_SCROLLED];
    /**
     * Stores data of images.
     */
    let entries = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (options.lazyLoad) {
            init();
            on(events_1.EVENT_REFRESH, init);
        }
    }
    /**
     * Initializes the component and start loading images.
     * Be aware that `refresh` also calls this method.
     */
    function init() {
        (0, utils_1.empty)(entries);
        register();
        if (isSequential) {
            loadNext();
        }
        else {
            off(events);
            on(events, check);
            check();
        }
    }
    /**
     * Finds images and register them as entries with creating spinner elements.
     * Note that spinner can be already available because of `refresh()`.
     */
    function register() {
        Components.Slides.forEach(Slide => {
            (0, utils_1.queryAll)(Slide.slide, constants_1.IMAGE_SELECTOR).forEach(img => {
                const src = (0, utils_1.getAttribute)(img, constants_1.SRC_DATA_ATTRIBUTE);
                const srcset = (0, utils_1.getAttribute)(img, constants_1.SRCSET_DATA_ATTRIBUTE);
                if (src !== img.src || srcset !== img.srcset) {
                    const className = options.classes.spinner;
                    const parent = img.parentElement;
                    const spinner = (0, utils_1.child)(parent, `.${className}`) || (0, utils_1.create)('span', className, parent);
                    entries.push([img, Slide, spinner]);
                    img.src || (0, utils_1.display)(img, 'none');
                }
            });
        });
    }
    /**
     * Checks how close each image is from the active slide, and determines whether to start loading or not.
     * The last `+1` is for the current page.
     */
    function check() {
        entries = entries.filter(data => {
            const distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
            return data[1].isWithin(Splide.index, distance) ? load(data) : true;
        });
        entries.length || off(events);
    }
    /**
     * Starts loading the image in the provided data.
     *
     * @param data - A LazyLoadEntry object.
     */
    function load(data) {
        const [img] = data;
        (0, utils_1.addClass)(data[1].slide, classes_1.CLASS_LOADING);
        bind(img, 'load error', (0, utils_1.apply)(onLoad, data));
        (0, utils_1.setAttribute)(img, 'src', (0, utils_1.getAttribute)(img, constants_1.SRC_DATA_ATTRIBUTE));
        (0, utils_1.setAttribute)(img, 'srcset', (0, utils_1.getAttribute)(img, constants_1.SRCSET_DATA_ATTRIBUTE));
        (0, utils_1.removeAttribute)(img, constants_1.SRC_DATA_ATTRIBUTE);
        (0, utils_1.removeAttribute)(img, constants_1.SRCSET_DATA_ATTRIBUTE);
    }
    /**
     * Called when the image is loaded or any error occurs.
     *
     * @param data - A LazyLoadEntry object.
     * @param e    - An Event object.
     */
    function onLoad(data, e) {
        const [img, Slide] = data;
        (0, utils_1.removeClass)(Slide.slide, classes_1.CLASS_LOADING);
        if (e.type !== 'error') {
            (0, utils_1.remove)(data[2]);
            (0, utils_1.display)(img, '');
            emit(events_1.EVENT_LAZYLOAD_LOADED, img, Slide);
            emit(events_1.EVENT_RESIZE);
        }
        isSequential && loadNext();
    }
    /**
     * Starts loading a next image.
     */
    function loadNext() {
        entries.length && load(entries.shift());
    }
    return {
        mount,
        destroy: (0, utils_1.apply)(utils_1.empty, entries),
        check,
    };
}
exports.LazyLoad = LazyLoad;
