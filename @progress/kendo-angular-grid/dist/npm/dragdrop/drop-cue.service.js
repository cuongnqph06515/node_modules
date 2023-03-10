/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("./common");
/**
 * @hidden
 */
var DropCueService = /** @class */ (function () {
    function DropCueService() {
    }
    DropCueService.prototype.create = function () {
        this.dom = document.createElement("div");
        this.dom.className = 'k-grouping-dropclue';
        this.hide();
    };
    DropCueService.prototype.attach = function () {
        return common_1.append(this.dom);
    };
    DropCueService.prototype.remove = function () {
        if (this.dom && this.dom.parentElement) {
            document.body.removeChild(this.dom);
            this.dom = null;
        }
    };
    DropCueService.prototype.hide = function () {
        this.dom.style.display = "none";
    };
    DropCueService.prototype.position = function (_a) {
        var left = _a.left, top = _a.top, height = _a.height;
        this.dom.style.display = 'block';
        this.dom.style.height = height + 'px';
        this.dom.style.top = top + 'px';
        var width = this.dom.offsetWidth / 2;
        this.dom.style.left = left - width + 'px';
    };
    DropCueService.decorators = [
        { type: core_1.Injectable },
    ];
    return DropCueService;
}());
exports.DropCueService = DropCueService;
