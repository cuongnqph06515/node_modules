/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/**
 * @hidden
 */
function slideAnimation(height, duration) {
    return [
        animations_1.style({ overflow: 'hidden', height: 0 }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ height: height + "px" }))
    ];
}
exports.slideAnimation = slideAnimation;
/**
 * @hidden
 */
function slideCloseAnimation(height, duration) {
    return [
        animations_1.style({ height: height + "px" }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ overflow: 'hidden', height: 0 }))
    ];
}
exports.slideCloseAnimation = slideCloseAnimation;
/**
 * @hidden
 */
function fadeAnimation(duration) {
    return [
        animations_1.style({ opacity: 0 }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ opacity: 1 }))
    ];
}
exports.fadeAnimation = fadeAnimation;
/**
 * @hidden
 */
function fadeCloseAnimation(duration) {
    return [
        animations_1.style({ opacity: 1 }),
        animations_1.animate(duration + "ms ease-in", animations_1.style({ opacity: 0 }))
    ];
}
exports.fadeCloseAnimation = fadeCloseAnimation;
