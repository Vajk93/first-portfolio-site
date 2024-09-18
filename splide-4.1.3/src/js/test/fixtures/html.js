"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_AUTOPLAY = exports.HTML_PROGRESS = exports.HTML_ARROWS = exports.generateSlides = exports.buildHtml = void 0;
const constants_1 = require("../../components/Autoplay/constants");
const constants_2 = require("../../components/LazyLoad/constants");
const constants_3 = require("./constants");
/**
 * Returns an HTML string for building a slider.
 *
 * @param args - Arguments.
 *
 * @return A built HTML.
 */
function buildHtml(args = {}) {
    const { tag = 'div', id, length = 10, arrows, progress, autoplay, src = true, dataSrc, dataSrcset, dataInterval, json, } = args;
    return `
<${tag} class="splide"${id ? ` id=${id}` : ''}${json ? ` data-splide='${json}'` : ''}>
  <div class="splide__track">
    <ul class="splide__list">
      ${generateSlides(length, src, dataSrc, dataSrcset, dataInterval)}
    </ul>
  </div>

  ${arrows ? exports.HTML_ARROWS : ''}
  ${progress ? exports.HTML_PROGRESS : ''}
  ${autoplay ? exports.HTML_AUTOPLAY : ''}
</${tag}>
`;
}
exports.buildHtml = buildHtml;
/**
 * Generates slides.
 *
 * @param length       - A number of slides.
 * @param src          - Whether to add src attribute or not.
 * @param dataSrc      - Whether to add data-splide-lazy attribute or not.
 * @param dataSrcset   - Whether to add data-splide-lazy-srcset attribute or not.
 * @param dataInterval - An array with autoplay interval.
 *
 * @return A built HTML.
 */
function generateSlides(length, src, dataSrc, dataSrcset, dataInterval = []) {
    return Array.from({ length }).reduce((html, item, index) => {
        const attrs = [];
        if (dataInterval) {
            const interval = dataInterval[index];
            if (interval) {
                attrs.push(`${constants_1.INTERVAL_DATA_ATTRIBUTE}="${interval}"`);
            }
        }
        html += `<li class="splide__slide" ${attrs.join(' ')}>`;
        const imgAttrs = [`alt="${index}"`];
        if (src) {
            imgAttrs.push(`src="${constants_3.URL}/${typeof src === 'string' ? src + '-' : ''}${index}.jpg"`);
        }
        if (dataSrc) {
            imgAttrs.push(`${constants_2.SRC_DATA_ATTRIBUTE}="${constants_3.URL}/${typeof dataSrc === 'string' ? dataSrc + '-' : ''}${index}.jpg"`);
        }
        if (dataSrcset) {
            imgAttrs.push(`${constants_2.SRCSET_DATA_ATTRIBUTE}="${constants_3.URL}/${typeof dataSrcset === 'string' ? dataSrcset + '-' : ''}${index}.jpg 320w"`);
        }
        html += `<img ${imgAttrs.join(' ')}>`;
        html += `</li>`;
        return html;
    }, '');
}
exports.generateSlides = generateSlides;
exports.HTML_ARROWS = `
<div class="splide__arrows">
  <button class="splide__arrow splide__arrow--prev">
    Prev
  </button>

  <button class="splide__arrow splide__arrow--next">
    Next
  </button>
</div>
`;
exports.HTML_PROGRESS = `
<div class="splide__progress">
  <div class="splide__progress__bar">
  </div>
</div>
`;
exports.HTML_AUTOPLAY = `
<button class="splide__toggle">
  <span class="splide__toggle__play">Play</span>
  <span class="splide__toggle__pause">Pause</span>
</button>
`;
