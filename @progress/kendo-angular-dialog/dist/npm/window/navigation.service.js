/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_resize_service_1 = require("./drag-resize.service");
var util_1 = require("../common/util");
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(window) {
        this.window = window;
    }
    NavigationService.prototype.process = function (ev) {
        var key = ev.keyCode;
        switch (key) {
            case util_1.Keys.up:
            case util_1.Keys.down:
            case util_1.Keys.left:
            case util_1.Keys.right: {
                ev.preventDefault();
                this.handleArrow(key, ev);
                break;
            }
            case util_1.Keys.esc:
                this.handleEscape();
                break;
            default:
                break;
        }
    };
    NavigationService.prototype.handleArrow = function (key, ev) {
        var options = this.window.options;
        if (ev.altKey) {
            this.handleStateChange(key, options.state);
            return;
        }
        if ((ev.ctrlKey || ev.metaKey) && options.state === 'default') {
            this.handleResize(key);
        }
        else {
            this.handleDrag(key);
        }
    };
    NavigationService.prototype.handleEscape = function () {
        this.window.closeAction();
    };
    NavigationService.prototype.handleDrag = function (key) {
        var options = this.window.options;
        if (!options.draggable) {
            return;
        }
        var offset = this.window.currentOffsetAndPosition();
        var restoreOptions = this.window.restoreOptions;
        var ev = {};
        var delta = 10;
        if (key === util_1.Keys.left || key === util_1.Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case util_1.Keys.left:
            case util_1.Keys.right: {
                ev.left = offset.x + delta;
                options.left = ev.left;
                break;
            }
            case util_1.Keys.up:
            case util_1.Keys.down: {
                ev.top = offset.y + delta;
                options.top = ev.top;
                break;
            }
            default:
                break;
        }
        if (options.state === 'minimized' && util_1.isPresent(restoreOptions)) {
            restoreOptions.left = options.left;
            restoreOptions.top = options.top;
        }
        this.window.change.emit(ev);
    };
    NavigationService.prototype.handleResize = function (key) {
        var _this = this;
        var options = this.window.options;
        if (!options.resizable) {
            return;
        }
        var offset = this.window.currentOffsetAndPosition();
        var newWidth;
        var newHeight;
        var ev = {};
        var delta = 10;
        if (key === util_1.Keys.left || key === util_1.Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case util_1.Keys.left:
            case util_1.Keys.right: {
                newWidth = offset.width + delta;
                if (newWidth !== options.width && newWidth >= options.minWidth) {
                    ev.width = newWidth;
                }
                break;
            }
            case util_1.Keys.up:
            case util_1.Keys.down: {
                newHeight = offset.height + delta;
                if (newHeight !== options.height && newHeight >= options.minHeight) {
                    ev.height = newHeight;
                }
                break;
            }
            default:
                break;
        }
        if (util_1.isPresent(ev.width) || util_1.isPresent(ev.height)) {
            util_1.OFFSET_STYLES.forEach(function (style) {
                if (util_1.isPresent(ev[style])) {
                    _this.window.options[style] = ev[style];
                }
            });
            this.window.change.emit(ev);
        }
    };
    NavigationService.prototype.handleStateChange = function (key, state) {
        if ((state === 'minimized' && key === util_1.Keys.up) ||
            (state === 'maximized' && key === util_1.Keys.down)) {
            this.window.restoreAction();
            return;
        }
        if (state === 'default') {
            if (key === util_1.Keys.up) {
                this.window.maximizeAction();
            }
            else if (key === util_1.Keys.down) {
                this.window.minimizeAction();
            }
        }
    };
    NavigationService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: drag_resize_service_1.DragResizeService }
    ]; };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
