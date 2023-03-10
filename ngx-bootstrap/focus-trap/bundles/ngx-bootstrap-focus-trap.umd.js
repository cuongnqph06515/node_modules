(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/focus-trap', ['exports', '@angular/core', '@angular/common', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap']['focus-trap'] = {}), global.ng.core, global.ng.common, global.rxjs.operators));
}(this, (function (exports, i0, i2, operators) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Injectable that ensures only the most recently enabled FocusTrap is active. */
    var FocusTrapManager = /** @class */ (function () {
        function FocusTrapManager() {
            // A stack of the FocusTraps on the page. Only the FocusTrap at the
            // top of the stack is active.
            this._focusTrapStack = [];
        }
        /**
         * Disables the FocusTrap at the top of the stack, and then pushes
         * the new FocusTrap onto the stack.
         */
        FocusTrapManager.prototype.register = function (focusTrap) {
            // Dedupe focusTraps that register multiple times.
            this._focusTrapStack = this._focusTrapStack.filter(function (ft) { return ft !== focusTrap; });
            var stack = this._focusTrapStack;
            if (stack.length) {
                stack[stack.length - 1]._disable();
            }
            stack.push(focusTrap);
            focusTrap._enable();
        };
        /**
         * Removes the FocusTrap from the stack, and activates the
         * FocusTrap that is the new top of the stack.
         */
        FocusTrapManager.prototype.deregister = function (focusTrap) {
            focusTrap._disable();
            var stack = this._focusTrapStack;
            var i = stack.indexOf(focusTrap);
            if (i !== -1) {
                stack.splice(i, 1);
                if (stack.length) {
                    stack[stack.length - 1]._enable();
                }
            }
        };
        return FocusTrapManager;
    }());
    FocusTrapManager.??prov = i0.????defineInjectable({ factory: function FocusTrapManager_Factory() { return new FocusTrapManager(); }, token: FocusTrapManager, providedIn: "root" });
    FocusTrapManager.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Whether the current platform supports the V8 Break Iterator. The V8 check
    // is necessary to detect all Blink based browsers.
    var hasV8BreakIterator;
    // We need a try/catch around the reference to `Intl`, because accessing it in some cases can
    // cause IE to throw. These cases are tied to particular versions of Windows and can happen if
    // the consumer is providing a polyfilled `Map`. See:
    // https://github.com/Microsoft/ChakraCore/issues/3189
    // https://github.com/angular/components/issues/15687
    try {
        hasV8BreakIterator = (typeof Intl !== 'undefined' && Intl.v8BreakIterator);
    }
    catch (_a) {
        hasV8BreakIterator = false;
    }
    /**
     * Service to detect the current platform by comparing the userAgent strings and
     * checking browser-specific global properties.
     */
    var Platform = /** @class */ (function () {
        function Platform(_platformId) {
            this._platformId = _platformId;
            // We want to use the Angular platform check because if the Document is shimmed
            // without the navigator, the following checks will fail. This is preferred because
            // sometimes the Document may be shimmed without the user's knowledge or intention
            /** Whether the Angular application is being rendered in the browser. */
            this.isBrowser = this._platformId ?
                i2.isPlatformBrowser(this._platformId) : typeof document === 'object' && !!document;
            /** Whether the current browser is Microsoft Edge. */
            this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
            /** Whether the current rendering engine is Microsoft Trident. */
            this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
            // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
            /** Whether the current rendering engine is Blink. */
            this.BLINK = this.isBrowser && (!!(window.chrome || hasV8BreakIterator) &&
                typeof CSS !== 'undefined' && !this.EDGE && !this.TRIDENT);
            // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
            // ensure that Webkit runs standalone and is not used as another engine's base.
            /** Whether the current rendering engine is WebKit. */
            this.WEBKIT = this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
            /** Whether the current platform is Apple iOS. */
            this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !('MSStream' in window);
            // It's difficult to detect the plain Gecko engine, because most of the browsers identify
            // them self as Gecko-like browsers and modify the userAgent's according to that.
            // Since we only cover one explicit Firefox case, we can simply check for Firefox
            // instead of having an unstable check for Gecko.
            /** Whether the current browser is Firefox. */
            this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
            /** Whether the current platform is Android. */
            // Trident on mobile adds the android platform to the userAgent to trick detections.
            this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
            // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
            // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
            // Safari browser should also use Webkit as its layout engine.
            /** Whether the current browser is Safari. */
            this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
        }
        return Platform;
    }());
    Platform.??prov = i0.????defineInjectable({ factory: function Platform_Factory() { return new Platform(i0.????inject(i0.PLATFORM_ID)); }, token: Platform, providedIn: "root" });
    Platform.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Platform.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
    ]; };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Configuration for the isFocusable method.
     */
    var IsFocusableConfig = /** @class */ (function () {
        function IsFocusableConfig() {
            /**
             * Whether to count an element as focusable even if it is not currently visible.
             */
            this.ignoreVisibility = false;
        }
        return IsFocusableConfig;
    }());
    // The InteractivityChecker leans heavily on the ally.js accessibility utilities.
    // Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
    // supported.
    /**
     * Utility for checking the interactivity of an element, such as whether is is focusable or
     * tabbable.
     */
    var InteractivityChecker = /** @class */ (function () {
        function InteractivityChecker(_platform) {
            this._platform = _platform;
        }
        /**
         * Gets whether an element is disabled.
         *
         * @param element Element to be checked.
         * @returns Whether the element is disabled.
         */
        InteractivityChecker.prototype.isDisabled = function (element) {
            // This does not capture some cases, such as a non-form control with a disabled attribute or
            // a form control inside of a disabled form, but should capture the most common cases.
            return element.hasAttribute('disabled');
        };
        /**
         * Gets whether an element is visible for the purposes of interactivity.
         *
         * This will capture states like `display: none` and `visibility: hidden`, but not things like
         * being clipped by an `overflow: hidden` parent or being outside the viewport.
         *
         * @returns Whether the element is visible.
         */
        InteractivityChecker.prototype.isVisible = function (element) {
            return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
        };
        /**
         * Gets whether an element can be reached via Tab key.
         * Assumes that the element has already been checked with isFocusable.
         *
         * @param element Element to be checked.
         * @returns Whether the element is tabbable.
         */
        InteractivityChecker.prototype.isTabbable = function (element) {
            // Nothing is tabbable on the server ????
            if (!this._platform.isBrowser) {
                return false;
            }
            var frameElement = getFrameElement(getWindow(element));
            if (frameElement) {
                // Frame elements inherit their tabindex onto all child elements.
                if (getTabIndexValue(frameElement) === -1) {
                    return false;
                }
                // Browsers disable tabbing to an element inside of an invisible frame.
                if (!this.isVisible(frameElement)) {
                    return false;
                }
            }
            var nodeName = element.nodeName.toLowerCase();
            var tabIndexValue = getTabIndexValue(element);
            if (element.hasAttribute('contenteditable')) {
                return tabIndexValue !== -1;
            }
            if (nodeName === 'iframe' || nodeName === 'object') {
                // The frame or object's content may be tabbable depending on the content, but it's
                // not possibly to reliably detect the content of the frames. We always consider such
                // elements as non-tabbable.
                return false;
            }
            // In iOS, the browser only considers some specific elements as tabbable.
            if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
                return false;
            }
            if (nodeName === 'audio') {
                // Audio elements without controls enabled are never tabbable, regardless
                // of the tabindex attribute explicitly being set.
                if (!element.hasAttribute('controls')) {
                    return false;
                }
                // Audio elements with controls are by default tabbable unless the
                // tabindex attribute is set to `-1` explicitly.
                return tabIndexValue !== -1;
            }
            if (nodeName === 'video') {
                // For all video elements, if the tabindex attribute is set to `-1`, the video
                // is not tabbable. Note: We cannot rely on the default `HTMLElement.tabIndex`
                // property as that one is set to `-1` in Chrome, Edge and Safari v13.1. The
                // tabindex attribute is the source of truth here.
                if (tabIndexValue === -1) {
                    return false;
                }
                // If the tabindex is explicitly set, and not `-1` (as per check before), the
                // video element is always tabbable (regardless of whether it has controls or not).
                if (tabIndexValue !== null) {
                    return true;
                }
                // Otherwise (when no explicit tabindex is set), a video is only tabbable if it
                // has controls enabled. Firefox is special as videos are always tabbable regardless
                // of whether there are controls or not.
                return this._platform.FIREFOX || element.hasAttribute('controls');
            }
            return element.tabIndex >= 0;
        };
        /**
         * Gets whether an element can be focused by the user.
         *
         * @param element Element to be checked.
         * @param config The config object with options to customize this method's behavior
         * @returns Whether the element is focusable.
         */
        InteractivityChecker.prototype.isFocusable = function (element, config) {
            // Perform checks in order of left to most expensive.
            // Again, naive approach that does not capture many edge cases and browser quirks.
            return isPotentiallyFocusable(element) && !this.isDisabled(element) &&
                ((config === null || config === void 0 ? void 0 : config.ignoreVisibility) || this.isVisible(element));
        };
        return InteractivityChecker;
    }());
    InteractivityChecker.??prov = i0.????defineInjectable({ factory: function InteractivityChecker_Factory() { return new InteractivityChecker(i0.????inject(Platform)); }, token: InteractivityChecker, providedIn: "root" });
    InteractivityChecker.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    InteractivityChecker.ctorParameters = function () { return [
        { type: Platform }
    ]; };
    /**
     * Returns the frame element from a window object. Since browsers like MS Edge throw errors if
     * the frameElement property is being accessed from a different host address, this property
     * should be accessed carefully.
     */
    function getFrameElement(window) {
        try {
            return window.frameElement;
        }
        catch (_a) {
            return null;
        }
    }
    /** Checks whether the specified element has any geometry / rectangles. */
    function hasGeometry(element) {
        // Use logic from jQuery to check for an invisible element.
        // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
        return !!(element.offsetWidth || element.offsetHeight ||
            (typeof element.getClientRects === 'function' && element.getClientRects().length));
    }
    /** Gets whether an element's  */
    function isNativeFormElement(element) {
        var nodeName = element.nodeName.toLowerCase();
        return nodeName === 'input' ||
            nodeName === 'select' ||
            nodeName === 'button' ||
            nodeName === 'textarea';
    }
    /** Gets whether an element is an `<input type="hidden">`. */
    function isHiddenInput(element) {
        return isInputElement(element) && element.type == 'hidden';
    }
    /** Gets whether an element is an anchor that has an href attribute. */
    function isAnchorWithHref(element) {
        return isAnchorElement(element) && element.hasAttribute('href');
    }
    /** Gets whether an element is an input element. */
    function isInputElement(element) {
        return element.nodeName.toLowerCase() == 'input';
    }
    /** Gets whether an element is an anchor element. */
    function isAnchorElement(element) {
        return element.nodeName.toLowerCase() == 'a';
    }
    /** Gets whether an element has a valid tabindex. */
    function hasValidTabIndex(element) {
        if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
            return false;
        }
        var tabIndex = element.getAttribute('tabindex');
        // IE11 parses tabindex="" as the value "-32768"
        if (tabIndex == '-32768') {
            return false;
        }
        return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
    }
    /**
     * Returns the parsed tabindex from the element attributes instead of returning the
     * evaluated tabindex from the browsers defaults.
     */
    function getTabIndexValue(element) {
        if (!hasValidTabIndex(element)) {
            return null;
        }
        // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
        var tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
        return isNaN(tabIndex) ? -1 : tabIndex;
    }
    /** Checks whether the specified element is potentially tabbable on iOS */
    function isPotentiallyTabbableIOS(element) {
        var nodeName = element.nodeName.toLowerCase();
        var inputType = nodeName === 'input' && element.type;
        return inputType === 'text'
            || inputType === 'password'
            || nodeName === 'select'
            || nodeName === 'textarea';
    }
    /**
     * Gets whether an element is potentially focusable without taking current visible/disabled state
     * into account.
     */
    function isPotentiallyFocusable(element) {
        // Inputs are potentially focusable *unless* they're type="hidden".
        if (isHiddenInput(element)) {
            return false;
        }
        return isNativeFormElement(element) ||
            isAnchorWithHref(element) ||
            element.hasAttribute('contenteditable') ||
            hasValidTabIndex(element);
    }
    /** Gets the parent window of a DOM node with regards of being inside of an iframe. */
    function getWindow(node) {
        // ownerDocument is null if `node` itself *is* a document.
        return node.ownerDocument && node.ownerDocument.defaultView || window;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Coerces a data-bound value (typically a string) to a boolean. */
    function coerceBooleanProperty(value) {
        return value != null && "" + value !== 'false';
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Class that allows for trapping focus within a DOM element.
     *
     * This class currently uses a relatively simple approach to focus trapping.
     * It assumes that the tab order is the same as DOM order, which is not necessarily true.
     * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause the two to misalign.
     *
     * @deprecated Use `ConfigurableFocusTrap` instead.
     * @breaking-change for 11.0.0 Remove this class.
     */
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(_element, _checker, _ngZone, _document, deferAnchors) {
            var _this = this;
            if (deferAnchors === void 0) { deferAnchors = false; }
            this._element = _element;
            this._checker = _checker;
            this._ngZone = _ngZone;
            this._document = _document;
            this._hasAttached = false;
            // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
            this.startAnchorListener = function () { return _this.focusLastTabbableElement(); };
            this.endAnchorListener = function () { return _this.focusFirstTabbableElement(); };
            this._enabled = true;
            if (!deferAnchors) {
                this.attachAnchors();
            }
        }
        Object.defineProperty(FocusTrap.prototype, "enabled", {
            /** Whether the focus trap is active. */
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
                if (this._startAnchor && this._endAnchor) {
                    this._toggleAnchorTabIndex(value, this._startAnchor);
                    this._toggleAnchorTabIndex(value, this._endAnchor);
                }
            },
            enumerable: false,
            configurable: true
        });
        /** Destroys the focus trap by cleaning up the anchors. */
        FocusTrap.prototype.destroy = function () {
            var startAnchor = this._startAnchor;
            var endAnchor = this._endAnchor;
            if (startAnchor) {
                startAnchor.removeEventListener('focus', this.startAnchorListener);
                if (startAnchor.parentNode) {
                    startAnchor.parentNode.removeChild(startAnchor);
                }
            }
            if (endAnchor) {
                endAnchor.removeEventListener('focus', this.endAnchorListener);
                if (endAnchor.parentNode) {
                    endAnchor.parentNode.removeChild(endAnchor);
                }
            }
            this._startAnchor = this._endAnchor = null;
            this._hasAttached = false;
        };
        /**
         * Inserts the anchors into the DOM. This is usually done automatically
         * in the constructor, but can be deferred for cases like directives with `*ngIf`.
         * @returns Whether the focus trap managed to attach successfuly. This may not be the case
         * if the target element isn't currently in the DOM.
         */
        FocusTrap.prototype.attachAnchors = function () {
            var _this = this;
            // If we're not on the browser, there can be no focus to trap.
            if (this._hasAttached) {
                return true;
            }
            this._ngZone.runOutsideAngular(function () {
                if (!_this._startAnchor) {
                    _this._startAnchor = _this._createAnchor();
                    _this._startAnchor.addEventListener('focus', _this.startAnchorListener);
                }
                if (!_this._endAnchor) {
                    _this._endAnchor = _this._createAnchor();
                    _this._endAnchor.addEventListener('focus', _this.endAnchorListener);
                }
            });
            if (this._element.parentNode) {
                this._element.parentNode.insertBefore(this._startAnchor, this._element);
                this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
                this._hasAttached = true;
            }
            return this._hasAttached;
        };
        /**
         * Waits for the zone to stabilize, then either focuses the first element that the
         * user specified, or the first tabbable element.
         * @returns Returns a promise that resolves with a boolean, depending
         * on whether focus was moved successfully.
         */
        FocusTrap.prototype.focusInitialElementWhenReady = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this._executeOnStable(function () { return resolve(_this.focusInitialElement()); });
            });
        };
        /**
         * Waits for the zone to stabilize, then focuses
         * the first tabbable element within the focus trap region.
         * @returns Returns a promise that resolves with a boolean, depending
         * on whether focus was moved successfully.
         */
        FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this._executeOnStable(function () { return resolve(_this.focusFirstTabbableElement()); });
            });
        };
        /**
         * Waits for the zone to stabilize, then focuses
         * the last tabbable element within the focus trap region.
         * @returns Returns a promise that resolves with a boolean, depending
         * on whether focus was moved successfully.
         */
        FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this._executeOnStable(function () { return resolve(_this.focusLastTabbableElement()); });
            });
        };
        /**
         * Get the specified boundary element of the trapped region.
         * @param bound The boundary to get (start or end of trapped region).
         * @returns The boundary element.
         */
        FocusTrap.prototype._getRegionBoundary = function (bound) {
            // Contains the deprecated version of selector, for temporary backwards comparability.
            var markers = this._element.querySelectorAll("[cdk-focus-region-" + bound + "], " +
                ("[cdkFocusRegion" + bound + "], ") +
                ("[cdk-focus-" + bound + "]"));
            for (var i = 0; i < markers.length; i++) {
                // @breaking-change 8.0.0
                if (markers[i].hasAttribute("cdk-focus-" + bound)) {
                    console.warn("Found use of deprecated attribute 'cdk-focus-" + bound + "', " +
                        ("use 'cdkFocusRegion" + bound + "' instead. The deprecated ") +
                        "attribute will be removed in 8.0.0.", markers[i]);
                }
                else if (markers[i].hasAttribute("cdk-focus-region-" + bound)) {
                    console.warn("Found use of deprecated attribute 'cdk-focus-region-" + bound + "', " +
                        ("use 'cdkFocusRegion" + bound + "' instead. The deprecated attribute ") +
                        "will be removed in 8.0.0.", markers[i]);
                }
            }
            if (bound == 'start') {
                return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
            }
            return markers.length ?
                markers[markers.length - 1] : this._getLastTabbableElement(this._element);
        };
        /**
         * Focuses the element that should be focused when the focus trap is initialized.
         * @returns Whether focus was moved successfully.
         */
        FocusTrap.prototype.focusInitialElement = function () {
            // Contains the deprecated version of selector, for temporary backwards comparability.
            var redirectToElement = this._element.querySelector("[cdk-focus-initial], " +
                "[cdkFocusInitial]");
            if (redirectToElement) {
                // @breaking-change 8.0.0
                if (redirectToElement.hasAttribute("cdk-focus-initial")) {
                    console.warn("Found use of deprecated attribute 'cdk-focus-initial', " +
                        "use 'cdkFocusInitial' instead. The deprecated attribute " +
                        "will be removed in 8.0.0", redirectToElement);
                }
                // Warn the consumer if the element they've pointed to
                // isn't focusable, when not in production mode.
                if (!this._checker.isFocusable(redirectToElement)) {
                    var focusableChild = this._getFirstTabbableElement(redirectToElement);
                    focusableChild === null || focusableChild === void 0 ? void 0 : focusableChild.focus();
                    return !!focusableChild;
                }
                redirectToElement.focus();
                return true;
            }
            return this.focusFirstTabbableElement();
        };
        /**
         * Focuses the first tabbable element within the focus trap region.
         * @returns Whether focus was moved successfully.
         */
        FocusTrap.prototype.focusFirstTabbableElement = function () {
            var redirectToElement = this._getRegionBoundary('start');
            if (redirectToElement) {
                redirectToElement.focus();
            }
            return !!redirectToElement;
        };
        /**
         * Focuses the last tabbable element within the focus trap region.
         * @returns Whether focus was moved successfully.
         */
        FocusTrap.prototype.focusLastTabbableElement = function () {
            var redirectToElement = this._getRegionBoundary('end');
            if (redirectToElement) {
                redirectToElement.focus();
            }
            return !!redirectToElement;
        };
        /**
         * Checks whether the focus trap has successfully been attached.
         */
        FocusTrap.prototype.hasAttached = function () {
            return this._hasAttached;
        };
        /** Get the first tabbable element from a DOM subtree (inclusive). */
        FocusTrap.prototype._getFirstTabbableElement = function (root) {
            if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
                return root;
            }
            // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
            // back to `childNodes` which includes text nodes, comments etc.
            var children = root.children || root.childNodes;
            for (var i = 0; i < children.length; i++) {
                var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                    this._getFirstTabbableElement(children[i]) :
                    null;
                if (tabbableChild) {
                    return tabbableChild;
                }
            }
            return null;
        };
        /** Get the last tabbable element from a DOM subtree (inclusive). */
        FocusTrap.prototype._getLastTabbableElement = function (root) {
            if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
                return root;
            }
            // Iterate in reverse DOM order.
            var children = root.children || root.childNodes;
            for (var i = children.length - 1; i >= 0; i--) {
                var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                    this._getLastTabbableElement(children[i]) :
                    null;
                if (tabbableChild) {
                    return tabbableChild;
                }
            }
            return null;
        };
        /** Creates an anchor element. */
        FocusTrap.prototype._createAnchor = function () {
            var anchor = this._document.createElement('div');
            this._toggleAnchorTabIndex(this._enabled, anchor);
            anchor.classList.add('cdk-visually-hidden');
            anchor.classList.add('cdk-focus-trap-anchor');
            anchor.setAttribute('aria-hidden', 'true');
            return anchor;
        };
        /**
         * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
         * @param isEnabled Whether the focus trap is enabled.
         * @param anchor Anchor on which to toggle the tabindex.
         */
        FocusTrap.prototype._toggleAnchorTabIndex = function (isEnabled, anchor) {
            // Remove the tabindex completely, rather than setting it to -1, because if the
            // element has a tabindex, the user might still hit it when navigating with the arrow keys.
            isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
        };
        /**
         * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
         * @param enabled: Whether the anchors should trap Tab.
         */
        FocusTrap.prototype.toggleAnchors = function (enabled) {
            if (this._startAnchor && this._endAnchor) {
                this._toggleAnchorTabIndex(enabled, this._startAnchor);
                this._toggleAnchorTabIndex(enabled, this._endAnchor);
            }
        };
        /** Executes a function when the zone is stable. */
        FocusTrap.prototype._executeOnStable = function (fn) {
            if (this._ngZone.isStable) {
                fn();
            }
            else {
                this._ngZone.onStable.pipe(operators.take(1)).subscribe(fn);
            }
        };
        return FocusTrap;
    }());
    /**
     * Factory that allows easy instantiation of focus traps.
     * @deprecated Use `ConfigurableFocusTrapFactory` instead.
     * @breaking-change for 11.0.0 Remove this class.
     */
    var FocusTrapFactory = /** @class */ (function () {
        function FocusTrapFactory(_checker, _ngZone, _document) {
            this._checker = _checker;
            this._ngZone = _ngZone;
            this._document = _document;
        }
        /**
         * Creates a focus-trapped region around the given element.
         * @param element The element around which focus will be trapped.
         * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
         *     manually by the user.
         * @returns The created focus trap instance.
         */
        FocusTrapFactory.prototype.create = function (element, deferCaptureElements) {
            if (deferCaptureElements === void 0) { deferCaptureElements = false; }
            return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
        };
        return FocusTrapFactory;
    }());
    FocusTrapFactory.??prov = i0.????defineInjectable({ factory: function FocusTrapFactory_Factory() { return new FocusTrapFactory(i0.????inject(InteractivityChecker), i0.????inject(i0.NgZone), i0.????inject(i2.DOCUMENT)); }, token: FocusTrapFactory, providedIn: "root" });
    FocusTrapFactory.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    FocusTrapFactory.ctorParameters = function () { return [
        { type: InteractivityChecker },
        { type: i0.NgZone },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i2.DOCUMENT,] }] }
    ]; };
    /** Directive for trapping focus within a region. */
    var FocusTrapDirective = /** @class */ (function () {
        function FocusTrapDirective(_elementRef, _focusTrapFactory, _document) {
            this._elementRef = _elementRef;
            this._focusTrapFactory = _focusTrapFactory;
            /** Previously focused element to restore focus to upon destroy when using autoCapture. */
            this._previouslyFocusedElement = null;
            this._autoCapture = false;
            this._document = _document;
            this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
        }
        Object.defineProperty(FocusTrapDirective.prototype, "enabled", {
            /** Whether the focus trap is active. */
            get: function () {
                return this.focusTrap.enabled;
            },
            set: function (value) {
                this.focusTrap.enabled = coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FocusTrapDirective.prototype, "autoCapture", {
            /**
             * Whether the directive should automatically move focus into the trapped region upon
             * initialization and return focus to the previous activeElement upon destruction.
             */
            get: function () {
                return this._autoCapture;
            },
            set: function (value) {
                this._autoCapture = coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        FocusTrapDirective.prototype.ngOnDestroy = function () {
            this.focusTrap.destroy();
            // If we stored a previously focused element when using autoCapture, return focus to that
            // element now that the trapped region is being destroyed.
            if (this._previouslyFocusedElement) {
                this._previouslyFocusedElement.focus();
                this._previouslyFocusedElement = null;
            }
        };
        FocusTrapDirective.prototype.ngAfterContentInit = function () {
            this.focusTrap.attachAnchors();
            if (this.autoCapture) {
                this._captureFocus();
            }
        };
        FocusTrapDirective.prototype.ngDoCheck = function () {
            if (!this.focusTrap.hasAttached()) {
                this.focusTrap.attachAnchors();
            }
        };
        FocusTrapDirective.prototype.ngOnChanges = function (changes) {
            var autoCaptureChange = changes['autoCapture'];
            if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture &&
                this.focusTrap.hasAttached()) {
                this._captureFocus();
            }
        };
        FocusTrapDirective.prototype._captureFocus = function () {
            this._previouslyFocusedElement = this._document.activeElement;
            this.focusTrap.focusInitialElementWhenReady();
        };
        return FocusTrapDirective;
    }());
    FocusTrapDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[focusTrap]',
                    exportAs: 'focusTrap'
                },] }
    ];
    FocusTrapDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: FocusTrapFactory },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i2.DOCUMENT,] }] }
    ]; };
    FocusTrapDirective.propDecorators = {
        enabled: [{ type: i0.Input, args: ['cdkTrapFocus',] }],
        autoCapture: [{ type: i0.Input, args: ['cdkTrapFocusAutoCapture',] }]
    };

    var FocusTrapModule = /** @class */ (function () {
        function FocusTrapModule() {
        }
        FocusTrapModule.forRoot = function () {
            return {
                ngModule: FocusTrapModule,
                providers: [
                    FocusTrapManager,
                    Platform,
                    InteractivityChecker
                ]
            };
        };
        return FocusTrapModule;
    }());
    FocusTrapModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.CommonModule],
                    declarations: [FocusTrapDirective],
                    exports: [FocusTrapDirective]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FocusTrap = FocusTrap;
    exports.FocusTrapDirective = FocusTrapDirective;
    exports.FocusTrapModule = FocusTrapModule;
    exports.??a = FocusTrapFactory;
    exports.??b = InteractivityChecker;
    exports.??c = Platform;
    exports.??d = FocusTrapManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-bootstrap-focus-trap.umd.js.map
