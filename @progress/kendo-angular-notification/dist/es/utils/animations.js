/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { style, animate } from '@angular/animations';
/**
 * @hidden
 */
export function slideAnimation(height, duration) {
    return [
        style({ overflow: 'hidden', height: 0 }),
        animate(duration + "ms ease-in", style({ height: height + "px" }))
    ];
}
/**
 * @hidden
 */
export function slideCloseAnimation(height, duration) {
    return [
        style({ height: height + "px" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', height: 0 }))
    ];
}
/**
 * @hidden
 */
export function fadeAnimation(duration) {
    return [
        style({ opacity: 0 }),
        animate(duration + "ms ease-in", style({ opacity: 1 }))
    ];
}
/**
 * @hidden
 */
export function fadeCloseAnimation(duration) {
    return [
        style({ opacity: 1 }),
        animate(duration + "ms ease-in", style({ opacity: 0 }))
    ];
}
