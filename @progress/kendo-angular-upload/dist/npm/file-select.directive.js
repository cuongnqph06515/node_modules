/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var navigation_service_1 = require("./navigation.service");
var upload_service_1 = require("./upload.service");
var util_1 = require("./common/util");
var validation_util_1 = require("./common/validation-util");
/**
 * @hidden
 */
var FileSelectDirective = /** @class */ (function () {
    function FileSelectDirective(uploadService, navigation, el) {
        this.uploadService = uploadService;
        this.navigation = navigation;
        this.type = "file";
        this.autocomplete = "off";
        this.tabIndex = -1;
        this.element = el;
    }
    Object.defineProperty(FileSelectDirective.prototype, "nameAttribute", {
        get: function () {
            return this.uploadService.async.saveField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "multipleAttribute", {
        get: function () {
            return this.multiple ? "multiple" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "dirAttribute", {
        get: function () {
            return this.dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "disabledAttribute", {
        get: function () {
            return this.disabled ? "true" : null;
        },
        enumerable: true,
        configurable: true
    });
    FileSelectDirective.prototype.onInputChange = function (event) {
        var _this = this;
        var ua = navigator.userAgent;
        var chrome = /(chrome)[ \/]([\w.]+)/i;
        var safari = /(webkit)[ \/]([\w.]+)/i;
        var selectedFiles = util_1.inputFiles(event.target);
        selectedFiles = util_1.assignGuidToFiles(selectedFiles, !this.uploadService.async.batch);
        validation_util_1.validateFiles(selectedFiles, this.restrictions);
        if (!this.multiple) {
            this.uploadService.clearFiles();
        }
        this.uploadService.addFiles(selectedFiles);
        /*
        Chrome and Internet Explorer do not trigger a `change` event
        when a file with the same name is selected a number of consecutive times.
        As a workaround, clear the input value after handling the file.
        */
        var native = this.element.nativeElement;
        if (!(!ua.match(chrome) && ua.match(safari))) {
            native.type = "";
            native.type = "file";
        }
        setTimeout(function () {
            _this.navigation.focusedIndex = -1;
        });
    };
    FileSelectDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoFileSelect]'
                },] },
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = function () { return [
        { type: upload_service_1.UploadService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.ElementRef }
    ]; };
    FileSelectDirective.propDecorators = {
        dir: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        multiple: [{ type: core_1.Input }],
        restrictions: [{ type: core_1.Input }],
        type: [{ type: core_1.HostBinding, args: ["attr.type",] }],
        autocomplete: [{ type: core_1.HostBinding, args: ["attr.autocomplete",] }],
        tabIndex: [{ type: core_1.HostBinding, args: ["attr.tabindex",] }],
        nameAttribute: [{ type: core_1.HostBinding, args: ["attr.name",] }],
        multipleAttribute: [{ type: core_1.HostBinding, args: ["attr.multiple",] }],
        dirAttribute: [{ type: core_1.HostBinding, args: ["attr.dir",] }],
        disabledAttribute: [{ type: core_1.HostBinding, args: ["attr.disabled",] }],
        onInputChange: [{ type: core_1.HostListener, args: ["change", ["$event"],] }]
    };
    return FileSelectDirective;
}());
exports.FileSelectDirective = FileSelectDirective;
