"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cover = void 0;
const events_1 = require("../../constants/events");
const constructors_1 = require("../../constructors");
const utils_1 = require("../../utils");
/**
 * The component for setting the image as the slide background.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Cover component object.
 */
function Cover(Splide, Components, options) {
    const { on } = (0, constructors_1.EventInterface)(Splide);
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (options.cover) {
            on(events_1.EVENT_LAZYLOAD_LOADED, (0, utils_1.apply)(toggle, true));
            on([events_1.EVENT_MOUNTED, events_1.EVENT_UPDATED, events_1.EVENT_REFRESH], (0, utils_1.apply)(cover, true));
        }
    }
    /**
     * Sets/removes the background image to/from all slides.
     *
     * @param cover - If `false`, removes the background image.
     */
    function cover(cover) {
        Components.Slides.forEach(Slide => {
            const img = (0, utils_1.child)(Slide.container || Slide.slide, 'img');
            if (img && img.src) {
                toggle(cover, img, Slide);
            }
        });
    }
    /**
     * Sets/removes the background image to/from the parent element.
     *
     * @param cover - If `false`, removes the background image.
     * @param img   - A target image element.
     * @param Slide - A SlideComponent object where the image belongs.
     */
    function toggle(cover, img, Slide) {
        Slide.style('background', cover ? `center/cover no-repeat url("${img.src}")` : '', true);
        (0, utils_1.display)(img, cover ? 'none' : '');
    }
    return {
        mount,
        destroy: (0, utils_1.apply)(cover, false),
    };
}
exports.Cover = Cover;
