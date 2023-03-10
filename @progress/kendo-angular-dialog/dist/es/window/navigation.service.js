/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from "@angular/core";
import { DragResizeService } from './drag-resize.service';
import { isPresent, OFFSET_STYLES, Keys } from '../common/util';
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
            case Keys.up:
            case Keys.down:
            case Keys.left:
            case Keys.right: {
                ev.preventDefault();
                this.handleArrow(key, ev);
                break;
            }
            case Keys.esc:
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
        if (key === Keys.left || key === Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case Keys.left:
            case Keys.right: {
                ev.left = offset.x + delta;
                options.left = ev.left;
                break;
            }
            case Keys.up:
            case Keys.down: {
                ev.top = offset.y + delta;
                options.top = ev.top;
                break;
            }
            default:
                break;
        }
        if (options.state === 'minimized' && isPresent(restoreOptions)) {
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
        if (key === Keys.left || key === Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case Keys.left:
            case Keys.right: {
                newWidth = offset.width + delta;
                if (newWidth !== options.width && newWidth >= options.minWidth) {
                    ev.width = newWidth;
                }
                break;
            }
            case Keys.up:
            case Keys.down: {
                newHeight = offset.height + delta;
                if (newHeight !== options.height && newHeight >= options.minHeight) {
                    ev.height = newHeight;
                }
                break;
            }
            default:
                break;
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach(function (style) {
                if (isPresent(ev[style])) {
                    _this.window.options[style] = ev[style];
                }
            });
            this.window.change.emit(ev);
        }
    };
    NavigationService.prototype.handleStateChange = function (key, state) {
        if ((state === 'minimized' && key === Keys.up) ||
            (state === 'maximized' && key === Keys.down)) {
            this.window.restoreAction();
            return;
        }
        if (state === 'default') {
            if (key === Keys.up) {
                this.window.maximizeAction();
            }
            else if (key === Keys.down) {
                this.window.minimizeAction();
            }
        }
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: DragResizeService }
    ]; };
    return NavigationService;
}());
export { NavigationService };
