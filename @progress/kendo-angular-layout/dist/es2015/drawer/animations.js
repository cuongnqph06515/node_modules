/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { animate, style } from '@angular/animations';
/**
 * @hidden
 */
function miniExpandPush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: `${miniWidth}px` }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function miniCollapsePush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${miniWidth}px` }))
    ];
}
/**
 * @hidden
 *
 */
function miniExpandOverlay(duration, width, miniWidth) {
    return [
        style({ width: `${miniWidth}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', width: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function expandPush(duration, width) {
    return [
        style({ overflow: 'hidden', flexBasis: '0px' }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function collapsePush(duration, width) {
    return [
        style({ flexBasis: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', flexBasis: `0px` }))
    ];
}
/**
 * @hidden
 */
function expandRTLOverlay(duration) {
    return [
        style({ transform: `translateX(100%)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(0)` }))
    ];
}
/**
 * @hidden
 */
function expandOverlay(duration, position) {
    const translateDir = position !== 'end' ? `-100%` : `100%`;
    return [
        style({ transform: `translateX(${translateDir})` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(0)` }))
    ];
}
/**
 * @hidden
 */
function miniCollapseOverlay(duration, width, miniWidth) {
    return [
        style({ width: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', width: `${miniWidth}px` }))
    ];
}
/**
 * @hidden
 */
function collapseOverlay(duration, position) {
    const translateDir = position !== 'end' ? '-100%' : '100%';
    return [
        style({ transform: `translateX(0)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(${translateDir})` }))
    ];
}
/**
 * @hidden
 */
function collapseRTLOverlay(duration) {
    return [
        style({ transform: `translateX(0)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(100%)` }))
    ];
}
/**
 * @hidden
 */
export function expandAnimation(settings) {
    const duration = settings.animation.duration;
    const width = settings.width;
    const miniWidth = settings.miniWidth;
    const mode = settings.mode;
    const mini = settings.mini;
    const rtl = settings.rtl;
    const position = settings.position;
    if (mini && mode === 'push') {
        return miniExpandPush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return expandPush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? expandRTLOverlay(duration) : expandOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniExpandOverlay(duration, width, miniWidth);
    }
}
/**
 * @hidden
 */
export function collapseAnimation(settings) {
    const duration = settings.animation.duration;
    const width = settings.width;
    const miniWidth = settings.miniWidth;
    const mode = settings.mode;
    const mini = settings.mini;
    const rtl = settings.rtl;
    const position = settings.position;
    if (mini && mode === 'push') {
        return miniCollapsePush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return collapsePush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? collapseRTLOverlay(duration) : collapseOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniCollapseOverlay(duration, width, miniWidth);
    }
}
