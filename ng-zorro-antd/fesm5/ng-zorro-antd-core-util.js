import { TemplateRef, Type } from '@angular/core';
import { __spread } from 'tslib';
import { coerceBooleanProperty, _isNumberValue, coerceCssPixelValue } from '@angular/cdk/coercion';
import { warn } from 'ng-zorro-antd/core/logger';
import { Subject, isObservable, from, of } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: array.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function toArray(value) {
    /** @type {?} */
    var ret;
    if (value == null) {
        ret = [];
    }
    else if (!Array.isArray(value)) {
        ret = [value];
    }
    else {
        ret = value;
    }
    return ret;
}
/**
 * @template T
 * @param {?} array1
 * @param {?} array2
 * @return {?}
 */
function arraysEqual(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }
    /** @type {?} */
    var len = array1.length;
    for (var i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * @template T
 * @param {?} source
 * @return {?}
 */
function shallowCopyArray(source) {
    return source.slice();
}

/**
 * @fileoverview added by tsickle
 * Generated from: check.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function isNotNil(value) {
    return typeof value !== 'undefined' && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isNil(value) {
    return typeof value === 'undefined' || value === null;
}
/**
 * Examine if two objects are shallowly equaled.
 * @param {?=} objA
 * @param {?=} objB
 * @return {?}
 */
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
        return false;
    }
    /** @type {?} */
    var keysA = Object.keys(objA);
    /** @type {?} */
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    /** @type {?} */
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    // tslint:disable-next-line:prefer-for-of
    for (var idx = 0; idx < keysA.length; idx++) {
        /** @type {?} */
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
}
/**
 * @param {?} value
 * @return {?}
 */
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} element
 * @return {?}
 */
function isEmpty(element) {
    /** @type {?} */
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (filterNotEmptyNode(nodes.item(i))) {
            return false;
        }
    }
    return true;
}
/**
 * @param {?} node
 * @return {?}
 */
function filterNotEmptyNode(node) {
    if (node) {
        if (node.nodeType === 1 && ((/** @type {?} */ (node))).outerHTML.toString().trim().length !== 0) {
            // ELEMENT_NODE
            return node;
        }
        else if (node.nodeType === 3 && (/** @type {?} */ (node.textContent)).toString().trim().length !== 0) {
            // TEXT_NODE
            return node;
        }
        return null;
    }
    return null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isNonEmptyString(value) {
    return typeof value === 'string' && value !== '';
}
/**
 * @param {?} value
 * @return {?}
 */
function isTemplateRef(value) {
    return value instanceof TemplateRef;
}
/**
 * @param {?} value
 * @return {?}
 */
function isComponent(value) {
    return value instanceof Type;
}

/**
 * @fileoverview added by tsickle
 * Generated from: convert.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function toBoolean(value) {
    return coerceBooleanProperty(value);
}
/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function toNumber(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}
/**
 * @param {?} value
 * @return {?}
 */
function toCssPixel(value) {
    return coerceCssPixelValue(value);
}
// tslint:disable no-invalid-this
/**
 * Get the function-property type's value
 * @template T
 * @param {?} prop
 * @param {...?} args
 * @return {?}
 */
function valueFunctionProp(prop) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return typeof prop === 'function' ? ((/** @type {?} */ (prop))).apply(void 0, __spread(args)) : prop;
}
/**
 * @template T, D
 * @param {?} name
 * @param {?} fallback
 * @return {?}
 */
function propDecoratorFactory(name, fallback) {
    /**
     * @param {?} target
     * @param {?} propName
     * @param {?=} originalDescriptor
     * @return {?}
     */
    function propDecorator(target, propName, originalDescriptor) {
        /** @type {?} */
        var privatePropName = "$$__" + propName;
        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            warn("The prop \"" + privatePropName + "\" is already exist, it will be overrided by " + name + " decorator.");
        }
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });
        return {
            get: /**
             * @return {?}
             */
            function () {
                return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(fallback(value));
                }
                this[privatePropName] = fallback(value);
            }
        };
    }
    return propDecorator;
}
/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using \@InputBoolean alone without \@Input? AOT needs \@Input to be visible
 *
 * \@howToUse
 * ```
 * \@Input() \@InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // \@Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 * @return {?}
 */
function InputBoolean() {
    return propDecoratorFactory('InputBoolean', toBoolean);
}
/**
 * @return {?}
 */
function InputCssPixel() {
    return propDecoratorFactory('InputCssPixel', toCssPixel);
}
/**
 * @param {?=} fallbackValue
 * @return {?}
 */
function InputNumber(fallbackValue) {
    return propDecoratorFactory('InputNumber', (/**
     * @param {?} value
     * @return {?}
     */
    function (value) { return toNumber(value, fallbackValue); }));
}

/**
 * @fileoverview added by tsickle
 * Generated from: dom.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * This module provides utility functions to query DOM information or
 * set properties.
 */
/**
 * Silent an event by stopping and preventing it.
 * @param {?} e
 * @return {?}
 */
function silentEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
/**
 * @param {?} elem
 * @return {?}
 */
function getElementOffset(elem) {
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    /** @type {?} */
    var rect = elem.getBoundingClientRect();
    /** @type {?} */
    var win = (/** @type {?} */ (elem.ownerDocument)).defaultView;
    return {
        top: rect.top + (/** @type {?} */ (win)).pageYOffset,
        left: rect.left + (/** @type {?} */ (win)).pageXOffset
    };
}
/**
 * Investigate if an event is a `TouchEvent`.
 * @param {?} event
 * @return {?}
 */
function isTouchEvent(event) {
    return event.type.startsWith('touch');
}
/**
 * @param {?} event
 * @return {?}
 */
function getEventPosition(event) {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
/**
 * @record
 */
function MouseTouchObserverConfig() { }
if (false) {
    /** @type {?} */
    MouseTouchObserverConfig.prototype.end;
    /** @type {?} */
    MouseTouchObserverConfig.prototype.move;
    /** @type {?} */
    MouseTouchObserverConfig.prototype.pluckKey;
    /** @type {?} */
    MouseTouchObserverConfig.prototype.start;
    /** @type {?|undefined} */
    MouseTouchObserverConfig.prototype.end$;
    /** @type {?|undefined} */
    MouseTouchObserverConfig.prototype.moveResolved$;
    /** @type {?|undefined} */
    MouseTouchObserverConfig.prototype.startPlucked$;
    /**
     * @param {?} e
     * @return {?}
     */
    MouseTouchObserverConfig.prototype.filter = function (e) { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: getMentions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @param {?} prefix
 * @return {?}
 */
function getRegExp(prefix) {
    /** @type {?} */
    var prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    /** @type {?} */
    var prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');
    if (prefixArray.length > 1) {
        prefixToken = "[" + prefixToken + "]";
    }
    return new RegExp("(\\s|^)(" + prefixToken + ")[^\\s]*", 'g');
}
/**
 * @param {?} value
 * @param {?=} prefix
 * @return {?}
 */
function getMentions(value, prefix) {
    if (prefix === void 0) { prefix = '@'; }
    if (typeof value !== 'string') {
        return [];
    }
    /** @type {?} */
    var regex = getRegExp(prefix);
    /** @type {?} */
    var mentions = value.match(regex);
    return mentions !== null ? mentions.map((/**
     * @param {?} e
     * @return {?}
     */
    function (e) { return e.trim(); })) : [];
}

/**
 * @fileoverview added by tsickle
 * Generated from: string.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Much like lodash.
 * @param {?} toPad
 * @param {?} length
 * @param {?} element
 * @return {?}
 */
function padStart(toPad, length, element) {
    if (toPad.length > length) {
        return toPad;
    }
    /** @type {?} */
    var joined = "" + getRepeatedElement(length, element) + toPad;
    return joined.slice(joined.length - length, joined.length);
}
/**
 * @param {?} toPad
 * @param {?} length
 * @param {?} element
 * @return {?}
 */
function padEnd(toPad, length, element) {
    /** @type {?} */
    var joined = "" + toPad + getRepeatedElement(length, element);
    return joined.slice(0, length);
}
/**
 * @param {?} length
 * @param {?} element
 * @return {?}
 */
function getRepeatedElement(length, element) {
    return Array(length).fill(element).join('');
}

/**
 * @fileoverview added by tsickle
 * Generated from: is-promise.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

/**
 * @fileoverview added by tsickle
 * Generated from: number.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @param {?} min
 * @param {?} max
 * @param {?} value
 * @return {?}
 */
function getPercent(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}
/**
 * @param {?} num
 * @return {?}
 */
function getPrecision(num) {
    /** @type {?} */
    var numStr = num.toString();
    /** @type {?} */
    var dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}
/**
 * @param {?} num
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function ensureNumberInRange(num, min, max) {
    if (isNaN(num) || num < min) {
        return min;
    }
    else if (num > max) {
        return max;
    }
    else {
        return num;
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: scroll-into-view-if-needed.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function scrollIntoView(node) {
    /** @type {?} */
    var nodeAsAny = (/** @type {?} */ (node));
    if (nodeAsAny.scrollIntoViewIfNeeded) {
        /* tslint:disable-next-line:no-string-literal */
        nodeAsAny.scrollIntoViewIfNeeded(false);
        return;
    }
    if (node.scrollIntoView) {
        node.scrollIntoView(false);
        return;
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: textarea-caret-position.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// from https://github.com/component/textarea-caret-position
// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
/** @type {?} */
var properties = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
];
/** @type {?} */
var isBrowser = typeof window !== 'undefined';
/** @type {?} */
var isFirefox = isBrowser && ((/** @type {?} */ (window))).mozInnerScreenX != null;
/** @type {?} */
var _parseInt = (/**
 * @param {?} str
 * @return {?}
 */
function (str) { return parseInt(str, 10); });
var ??0 = _parseInt;
/**
 * @record
 */
function Coordinates() { }
if (false) {
    /** @type {?} */
    Coordinates.prototype.top;
    /** @type {?} */
    Coordinates.prototype.left;
    /** @type {?} */
    Coordinates.prototype.height;
}
/**
 * @param {?} element
 * @param {?} position
 * @param {?=} options
 * @return {?}
 */
function getCaretCoordinates(element, position, options) {
    if (!isBrowser) {
        throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }
    /** @type {?} */
    var debug = (options && options.debug) || false;
    if (debug) {
        /** @type {?} */
        var el = document.querySelector('#input-textarea-caret-position-mirror-div');
        if (el) {
            (/** @type {?} */ (el.parentNode)).removeChild(el);
        }
    }
    // The mirror div will replicate the textarea's style
    /** @type {?} */
    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    /** @type {?} */
    var style = div.style;
    /** @type {?} */
    var computed = window.getComputedStyle ? window.getComputedStyle(element) : ((/** @type {?} */ (element))).currentStyle;
    // currentStyle for IE < 9
    /** @type {?} */
    var isInput = element.nodeName === 'INPUT';
    // Default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (!isInput) {
        style.wordWrap = 'break-word'; // only for textarea-s
    }
    // Position off-screen
    style.position = 'absolute'; // required to return coordinates properly
    if (!debug) {
        style.visibility = 'hidden';
    } // not 'display: none' because we want rendering
    // Transfer the element's properties to the div
    properties.forEach((/**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        if (isInput && prop === 'lineHeight') {
            // Special case for <input>s because text is rendered centered and line height may be != height
            style.lineHeight = computed.height;
        }
        else {
            // @ts-ignore
            style[prop] = computed[prop];
        }
    }));
    if (isFirefox) {
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > _parseInt(computed.height)) {
            style.overflowY = 'scroll';
        }
    }
    else {
        style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, position);
    // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (isInput) {
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');
    }
    /** @type {?} */
    var span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    /** @type {?} */
    var coordinates = {
        top: span.offsetTop + _parseInt(computed.borderTopWidth),
        left: span.offsetLeft + _parseInt(computed.borderLeftWidth),
        height: _parseInt(computed.lineHeight)
    };
    if (debug) {
        span.style.backgroundColor = '#eee';
        createDebugEle(element, coordinates);
    }
    else {
        document.body.removeChild(div);
    }
    return coordinates;
}
/**
 * @param {?} element
 * @param {?} coordinates
 * @return {?}
 */
function createDebugEle(element, coordinates) {
    /** @type {?} */
    var fontSize = getComputedStyle(element).getPropertyValue('font-size');
    /** @type {?} */
    var rect = ((/** @type {?} */ (document.querySelector('#DEBUG')))) || document.createElement('div');
    document.body.appendChild(rect);
    rect.id = 'DEBUG';
    rect.style.position = 'absolute';
    rect.style.backgroundColor = 'red';
    rect.style.height = fontSize;
    rect.style.width = '1px';
    rect.style.top = element.getBoundingClientRect().top - element.scrollTop + window.pageYOffset + coordinates.top + "px";
    rect.style.left = element.getBoundingClientRect().left - element.scrollLeft + window.pageXOffset + coordinates.left + "px";
}

/**
 * @fileoverview added by tsickle
 * Generated from: style.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @param {?} styleName
 * @return {?}
 */
function isStyleSupport(styleName) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        /** @type {?} */
        var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        var documentElement_1 = window.document.documentElement;
        return styleNameList.some((/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return name in documentElement_1.style; }));
    }
    return false;
}
/**
 * @param {?=} styles
 * @return {?}
 */
function getStyleAsText(styles) {
    if (!styles) {
        return '';
    }
    return Object.keys(styles)
        .map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var val = styles[key];
        return key + ":" + (typeof val === 'string' ? val : val + 'px');
    }))
        .join(';');
}

/**
 * @fileoverview added by tsickle
 * Generated from: text-measure.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MeasureResult() { }
if (false) {
    /** @type {?} */
    MeasureResult.prototype.finished;
    /** @type {?} */
    MeasureResult.prototype.node;
}
// We only handle element & text node.
/** @type {?} */
var ELEMENT_NODE = 1;
/** @type {?} */
var TEXT_NODE = 3;
/** @type {?} */
var COMMENT_NODE = 8;
/** @type {?} */
var ellipsisContainer;
/** @type {?} */
var wrapperStyle = {
    padding: '0',
    margin: '0',
    display: 'inline',
    lineHeight: 'inherit'
};
/**
 * @param {?} value
 * @return {?}
 */
function pxToNumber(value) {
    if (!value) {
        return 0;
    }
    /** @type {?} */
    var match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}
/**
 * @param {?} style
 * @return {?}
 */
function styleToString(style) {
    // There are some different behavior between Firefox & Chrome.
    // We have to handle this ourself.
    /** @type {?} */
    var styleNames = Array.prototype.slice.apply(style);
    return styleNames.map((/**
     * @param {?} name
     * @return {?}
     */
    function (name) { return name + ": " + style.getPropertyValue(name) + ";"; })).join('');
}
/**
 * @param {?} children
 * @return {?}
 */
function mergeChildren(children) {
    /** @type {?} */
    var childList = [];
    children.forEach((/**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        /** @type {?} */
        var prevChild = childList[childList.length - 1];
        if (prevChild && child.nodeType === TEXT_NODE && prevChild.nodeType === TEXT_NODE) {
            ((/** @type {?} */ (prevChild))).data += ((/** @type {?} */ (child))).data;
        }
        else {
            childList.push(child);
        }
    }));
    return childList;
}
/**
 * @param {?} originEle
 * @param {?} rows
 * @param {?} contentNodes
 * @param {?} fixedContent
 * @param {?} ellipsisStr
 * @param {?=} suffixStr
 * @return {?}
 */
function measure(originEle, rows, contentNodes, fixedContent, ellipsisStr, suffixStr) {
    if (suffixStr === void 0) { suffixStr = ''; }
    if (!ellipsisContainer) {
        ellipsisContainer = document.createElement('div');
        ellipsisContainer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ellipsisContainer);
    }
    // Get origin style
    /** @type {?} */
    var originStyle = window.getComputedStyle(originEle);
    /** @type {?} */
    var originCSS = styleToString(originStyle);
    /** @type {?} */
    var lineHeight = pxToNumber(originStyle.lineHeight);
    /** @type {?} */
    var maxHeight = Math.round(lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
    // Set shadow
    ellipsisContainer.setAttribute('style', originCSS);
    ellipsisContainer.style.position = 'fixed';
    ellipsisContainer.style.left = '0';
    ellipsisContainer.style.height = 'auto';
    ellipsisContainer.style.minHeight = 'auto';
    ellipsisContainer.style.maxHeight = 'auto';
    ellipsisContainer.style.top = '-999999px';
    ellipsisContainer.style.zIndex = '-1000';
    // clean up css overflow
    ellipsisContainer.style.textOverflow = 'clip';
    ellipsisContainer.style.whiteSpace = 'normal';
    ((/** @type {?} */ (ellipsisContainer.style))).webkitLineClamp = 'none';
    /** @type {?} */
    var contentList = mergeChildren(contentNodes);
    /** @type {?} */
    var container = document.createElement('div');
    /** @type {?} */
    var contentContainer = document.createElement('span');
    /** @type {?} */
    var suffixContainer = document.createTextNode(suffixStr);
    /** @type {?} */
    var fixedContainer = document.createElement('span');
    // Add styles in container
    Object.assign(container.style, wrapperStyle);
    Object.assign(contentContainer.style, wrapperStyle);
    Object.assign(fixedContainer.style, wrapperStyle);
    contentList.forEach((/**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        contentContainer.appendChild(n);
    }));
    contentContainer.appendChild(suffixContainer);
    fixedContent.forEach((/**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        fixedContainer.appendChild(node.cloneNode(true));
    }));
    container.appendChild(contentContainer);
    container.appendChild(fixedContainer);
    // Render in the fake container
    ellipsisContainer.appendChild(container);
    // Check if ellipsis in measure div is height enough for content
    /**
     * @return {?}
     */
    function inRange() {
        return ellipsisContainer.offsetHeight < maxHeight;
    }
    if (inRange()) {
        /** @type {?} */
        var text = ellipsisContainer.innerHTML;
        ellipsisContainer.removeChild(container);
        return { contentNodes: contentNodes, text: text, ellipsis: false };
    }
    // We should clone the childNode since they're controlled by React and we can't reuse it without warning
    /** @type {?} */
    var childNodes = Array.prototype.slice
        .apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
        .filter((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var nodeType = _a.nodeType;
        return nodeType !== COMMENT_NODE;
    }));
    /** @type {?} */
    var fixedNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes);
    ellipsisContainer.removeChild(container);
    // ========================= Find match ellipsis content =========================
    ellipsisContainer.innerHTML = '';
    // Create origin content holder
    /** @type {?} */
    var ellipsisContentHolder = document.createElement('span');
    ellipsisContainer.appendChild(ellipsisContentHolder);
    /** @type {?} */
    var ellipsisTextNode = document.createTextNode(ellipsisStr + suffixStr);
    ellipsisContentHolder.appendChild(ellipsisTextNode);
    fixedNodes.forEach((/**
     * @param {?} childNode
     * @return {?}
     */
    function (childNode) {
        ellipsisContainer.appendChild(childNode);
    }));
    // Append before fixed nodes
    /**
     * @param {?} node
     * @return {?}
     */
    function appendChildNode(node) {
        ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
    }
    // Get maximum text
    /**
     * @param {?} textNode
     * @param {?} fullText
     * @param {?=} startLoc
     * @param {?=} endLoc
     * @param {?=} lastSuccessLoc
     * @return {?}
     */
    function measureText(textNode, fullText, startLoc, endLoc, lastSuccessLoc) {
        if (startLoc === void 0) { startLoc = 0; }
        if (endLoc === void 0) { endLoc = fullText.length; }
        if (lastSuccessLoc === void 0) { lastSuccessLoc = 0; }
        /** @type {?} */
        var midLoc = Math.floor((startLoc + endLoc) / 2);
        textNode.textContent = fullText.slice(0, midLoc);
        if (startLoc >= endLoc - 1) {
            // Loop when step is small
            for (var step = endLoc; step >= startLoc; step -= 1) {
                /** @type {?} */
                var currentStepText = fullText.slice(0, step);
                textNode.textContent = currentStepText;
                if (inRange() || !currentStepText) {
                    return step === fullText.length
                        ? {
                            finished: false,
                            node: document.createTextNode(fullText)
                        }
                        : {
                            finished: true,
                            node: document.createTextNode(currentStepText)
                        };
                }
            }
        }
        if (inRange()) {
            return measureText(textNode, fullText, midLoc, endLoc, midLoc);
        }
        else {
            return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
        }
    }
    /**
     * @param {?} childNode
     * @param {?} index
     * @return {?}
     */
    function measureNode(childNode, index) {
        /** @type {?} */
        var type = childNode.nodeType;
        if (type === ELEMENT_NODE) {
            // We don't split element, it will keep if whole element can be displayed.
            // appendChildNode(childNode);
            if (inRange()) {
                return {
                    finished: false,
                    node: contentList[index]
                };
            }
            // Clean up if can not pull in
            ellipsisContentHolder.removeChild(childNode);
            return {
                finished: true,
                node: null
            };
        }
        else if (type === TEXT_NODE) {
            /** @type {?} */
            var fullText = childNode.textContent || '';
            /** @type {?} */
            var textNode = document.createTextNode(fullText);
            appendChildNode(textNode);
            return measureText(textNode, fullText);
        }
        // Not handle other type of content
        // PS: This code should not be attached after react 16
        return {
            finished: false,
            node: null
        };
    }
    /** @type {?} */
    var ellipsisNodes = [];
    childNodes.some((/**
     * @param {?} childNode
     * @param {?} index
     * @return {?}
     */
    function (childNode, index) {
        var _a = measureNode(childNode, index), finished = _a.finished, node = _a.node;
        if (node) {
            ellipsisNodes.push(node);
        }
        return finished;
    }));
    /** @type {?} */
    var result = {
        contentNodes: ellipsisNodes,
        text: ellipsisContainer.innerHTML,
        ellipsis: true
    };
    while (ellipsisContainer.firstChild) {
        ellipsisContainer.removeChild(ellipsisContainer.firstChild);
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * Generated from: measure-scrollbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 * @type {?}
 */
var scrollbarVerticalSize;
/** @type {?} */
var scrollbarHorizontalSize;
// Measure scrollbar width for padding body during modal show/hide
/** @type {?} */
var scrollbarMeasure = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px'
};
/**
 * @param {?=} direction
 * @param {?=} prefix
 * @return {?}
 */
function measureScrollbar(direction, prefix) {
    if (direction === void 0) { direction = 'vertical'; }
    if (prefix === void 0) { prefix = 'ant'; }
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    /** @type {?} */
    var isVertical = direction === 'vertical';
    if (isVertical && scrollbarVerticalSize) {
        return scrollbarVerticalSize;
    }
    else if (!isVertical && scrollbarHorizontalSize) {
        return scrollbarHorizontalSize;
    }
    /** @type {?} */
    var scrollDiv = document.createElement('div');
    Object.keys(scrollbarMeasure).forEach((/**
     * @param {?} scrollProp
     * @return {?}
     */
    function (scrollProp) {
        // @ts-ignore
        scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    }));
    // apply hide scrollbar className ahead
    scrollDiv.className = prefix + "-hide-scrollbar scroll-div-append-to-body";
    // Append related overflow style
    if (isVertical) {
        scrollDiv.style.overflowY = 'scroll';
    }
    else {
        scrollDiv.style.overflowX = 'scroll';
    }
    document.body.appendChild(scrollDiv);
    /** @type {?} */
    var size = 0;
    if (isVertical) {
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        scrollbarVerticalSize = size;
    }
    else {
        size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        scrollbarHorizontalSize = size;
    }
    document.body.removeChild(scrollDiv);
    return size;
}

/**
 * @fileoverview added by tsickle
 * Generated from: ensure-in-bounds.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @param {?} value
 * @param {?} boundValue
 * @return {?}
 */
function ensureInBounds(value, boundValue) {
    return value ? (value < boundValue ? value : boundValue) : boundValue;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tick.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function inNextTick() {
    /** @type {?} */
    var timer = new Subject();
    Promise.resolve().then((/**
     * @return {?}
     */
    function () { return timer.next(); }));
    return timer.pipe(take(1));
}

/**
 * @fileoverview added by tsickle
 * Generated from: observable.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        return from(Promise.resolve(value));
    }
    return of(value);
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { InputBoolean, InputCssPixel, InputNumber, arraysEqual, createDebugEle, ensureInBounds, ensureNumberInRange, filterNotEmptyNode, getCaretCoordinates, getElementOffset, getEventPosition, getMentions, getPercent, getPrecision, getRegExp, getRepeatedElement, getStyleAsText, inNextTick, isComponent, isEmpty, isInteger, isNil, isNonEmptyString, isNotNil, isPromise, isStyleSupport, isTemplateRef, isTouchEvent, measure, measureScrollbar, padEnd, padStart, properties, pxToNumber, scrollIntoView, shallowCopyArray, shallowEqual, silentEvent, toArray, toBoolean, toCssPixel, toNumber, valueFunctionProp, wrapIntoObservable };
//# sourceMappingURL=ng-zorro-antd-core-util.js.map
