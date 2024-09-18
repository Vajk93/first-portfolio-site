"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ATTRIBUTES = exports.ARIA_ATOMIC = exports.ARIA_BUSY = exports.ARIA_LIVE = exports.ARIA_ROLEDESCRIPTION = exports.ARIA_ORIENTATION = exports.ARIA_HIDDEN = exports.ARIA_LABELLEDBY = exports.ARIA_LABEL = exports.ARIA_SELECTED = exports.ARIA_CURRENT = exports.ARIA_CONTROLS = exports.ARIA_PREFIX = exports.DISABLED = exports.TAB_INDEX = exports.ROLE = void 0;
exports.ROLE = 'role';
exports.TAB_INDEX = 'tabindex';
exports.DISABLED = 'disabled';
exports.ARIA_PREFIX = 'aria-';
exports.ARIA_CONTROLS = `${exports.ARIA_PREFIX}controls`;
exports.ARIA_CURRENT = `${exports.ARIA_PREFIX}current`;
exports.ARIA_SELECTED = `${exports.ARIA_PREFIX}selected`;
exports.ARIA_LABEL = `${exports.ARIA_PREFIX}label`;
exports.ARIA_LABELLEDBY = `${exports.ARIA_PREFIX}labelledby`;
exports.ARIA_HIDDEN = `${exports.ARIA_PREFIX}hidden`;
exports.ARIA_ORIENTATION = `${exports.ARIA_PREFIX}orientation`;
exports.ARIA_ROLEDESCRIPTION = `${exports.ARIA_PREFIX}roledescription`;
exports.ARIA_LIVE = `${exports.ARIA_PREFIX}live`;
exports.ARIA_BUSY = `${exports.ARIA_PREFIX}busy`;
exports.ARIA_ATOMIC = `${exports.ARIA_PREFIX}atomic`;
/**
 * The array with all attributes to remove later.
 * Need to manually remove attributes that are not in this.
 * Note that removing `aria-live` disables the live region until the page reload.
 *
 * @since 3.0.0
 */
exports.ALL_ATTRIBUTES = [
    exports.ROLE,
    exports.TAB_INDEX,
    exports.DISABLED,
    exports.ARIA_CONTROLS,
    exports.ARIA_CURRENT,
    exports.ARIA_LABEL,
    exports.ARIA_LABELLEDBY,
    exports.ARIA_HIDDEN,
    exports.ARIA_ORIENTATION,
    exports.ARIA_ROLEDESCRIPTION,
];
