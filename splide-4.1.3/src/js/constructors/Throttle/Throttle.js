"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = void 0;
const RequestInterval_1 = require("../RequestInterval/RequestInterval");
/**
 * Returns the throttled function.
 *
 * @param func     - A function to throttle.
 * @param duration - Optional. Throttle duration in milliseconds.
 *
 * @return A throttled function.
 */
function Throttle(func, duration) {
    const interval = (0, RequestInterval_1.RequestInterval)(duration || 0, func, null, 1);
    return () => {
        interval.isPaused() && interval.start();
    };
}
exports.Throttle = Throttle;
