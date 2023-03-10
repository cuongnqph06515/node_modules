/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { NavigationService } from './navigation.service';
import { UploadService } from './upload.service';
import { assignGuidToFiles, inputFiles } from './common/util';
import { validateFiles } from './common/validation-util';
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
        var selectedFiles = inputFiles(event.target);
        selectedFiles = assignGuidToFiles(selectedFiles, !this.uploadService.async.batch);
        validateFiles(selectedFiles, this.restrictions);
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
        { type: Directive, args: [{
                    selector: '[kendoFileSelect]'
                },] },
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = function () { return [
        { type: UploadService },
        { type: NavigationService },
        { type: ElementRef }
    ]; };
    FileSelectDirective.propDecorators = {
        dir: [{ type: Input }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        restrictions: [{ type: Input }],
        type: [{ type: HostBinding, args: ["attr.type",] }],
        autocomplete: [{ type: HostBinding, args: ["attr.autocomplete",] }],
        tabIndex: [{ type: HostBinding, args: ["attr.tabindex",] }],
        nameAttribute: [{ type: HostBinding, args: ["attr.name",] }],
        multipleAttribute: [{ type: HostBinding, args: ["attr.multiple",] }],
        dirAttribute: [{ type: HostBinding, args: ["attr.dir",] }],
        disabledAttribute: [{ type: HostBinding, args: ["attr.disabled",] }],
        onInputChange: [{ type: HostListener, args: ["change", ["$event"],] }]
    };
    return FileSelectDirective;
}());
export { FileSelectDirective };
