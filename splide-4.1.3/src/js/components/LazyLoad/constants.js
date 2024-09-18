"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_SELECTOR = exports.SRCSET_DATA_ATTRIBUTE = exports.SRC_DATA_ATTRIBUTE = void 0;
const project_1 = require("../../constants/project");
/**
 * The data attribute for the src value.
 *
 * @since 3.0.0
 */
exports.SRC_DATA_ATTRIBUTE = `${project_1.DATA_ATTRIBUTE}-lazy`;
/**
 * The data attribute for the srcset value.
 *
 * @since 3.0.0
 */
exports.SRCSET_DATA_ATTRIBUTE = `${exports.SRC_DATA_ATTRIBUTE}-srcset`;
/**
 * The selector string for images to load.
 *
 * @since 3.0.0
 */
exports.IMAGE_SELECTOR = `[${exports.SRC_DATA_ATTRIBUTE}], [${exports.SRCSET_DATA_ATTRIBUTE}]`;
