/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding, forwardRef, Renderer2, ViewChild, ElementRef, Output, EventEmitter, HostListener, NgZone, ContentChild, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { KendoInput, guid, Keys, isDocumentAvailable } from '@progress/kendo-angular-common';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UploadService } from './upload.service';
import { NavigationService } from './navigation.service';
import { UPLOAD_CLASSES, hasClasses, isFocusable, IGNORE_TARGET_CLASSES, validateInitialFileSelectFile } from './common/util';
import { FileTemplateDirective } from './templates/file-template.directive';
import { FileState } from './types/file-state';
import { DropZoneService } from './dropzone.service';
/**
 * @hidden
 */
export var FILESELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return FileSelectComponent; }) // tslint:disable-line:no-forward-ref
};
var FileSelectComponent = /** @class */ (function () {
    function FileSelectComponent(uploadService, localization, navigation, dropZoneService, ngZone, renderer, cdr, wrapper) {
        var _this = this;
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.dropZoneService = dropZoneService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * Disables the FileSelect.
         * The default value is `false`.
         */
        this.disabled = false;
        /**
         * Enables the selection of multiple files
         * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-sinlge-or-multiple-files)).
         * If set to `false`, only one file can be selected at a time.
         */
        this.multiple = true;
        /**
         * Toggles the visibility of the file list.
         */
        this.showFileList = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the FileSelect.
         */
        this.tabindex = 0;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Fires when the user navigates outside the component.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires when the component is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires when files are selected. If prevented, the selected files will not be added to the list.
         */
        this.select = new EventEmitter();
        /**
         * Fires when a file is about to be removed. If prevented, the file will remain in the list.
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the value of the component has changed as a result of a successful `select` or `remove` operation.
         */
        this.valueChange = new EventEmitter();
        this.hostDefaultClasses = true;
        /**
         * @hidden
         */
        this._restrictions = {
            allowedExtensions: [],
            maxFileSize: 0,
            minFileSize: 0
        };
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.wrapper = wrapper.nativeElement;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.navigation.computeKeys(_this.direction);
        });
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
        this.setDefaultSettings();
    }
    Object.defineProperty(FileSelectComponent.prototype, "name", {
        get: function () {
            return this.uploadService.async.saveField;
        },
        /**
         * Sets the `name` attribute of the `input` element of the FileSelect.
         */
        set: function (name) {
            this.uploadService.async.saveField = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "restrictions", {
        get: function () {
            return this._restrictions;
        },
        /**
         * Sets the restrictions for selected files.
         */
        set: function (restrictions) {
            var parsedRestrictions = Object.assign({}, this._restrictions, restrictions);
            this._restrictions = parsedRestrictions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "hostDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    FileSelectComponent.prototype.ngOnInit = function () {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    /**
     * Focuses the underlying input element.
     */
    FileSelectComponent.prototype.focus = function () {
        var _this = this;
        setTimeout(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    FileSelectComponent.prototype.ngOnDestroy = function () {
        this.fileList.clear();
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
        }
        if (this.wrapperFocusSubscription) {
            this.wrapperFocusSubscription.unsubscribe();
        }
        if (this.selectButtonFocusSubscription) {
            this.selectButtonFocusSubscription.unsubscribe();
        }
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if ((event.keyCode === Keys.Enter || event.keyCode === Keys.Space) &&
            event.target === this.fileSelectButton.nativeElement) {
            event.preventDefault();
            this.fileSelect.nativeElement.click();
            return;
        }
        if (hasClasses(event.target, UPLOAD_CLASSES) ||
            (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES))) {
            this.navigation.process(event);
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.writeValue = function (newValue) {
        var isValid = true;
        if (newValue instanceof Array) {
            newValue.forEach(function (file) {
                if (!validateInitialFileSelectFile(file)) {
                    isValid = false;
                }
            });
            if (isValid) {
                this.uploadService.addInitialFileSelectFiles(newValue);
            }
        }
        if (newValue === null) {
            this.fileList.clear();
        }
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Removes specific file from the file list.
     */
    FileSelectComponent.prototype.removeFileByUid = function (uid) {
        this.uploadService.removeFiles(uid);
    };
    /**
     * Visually clears all files from the UI.
     */
    FileSelectComponent.prototype.clearFiles = function () {
        this.uploadService.clearFiles();
    };
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    FileSelectComponent.prototype.isEmpty = function () {
        return false;
    };
    /**
     * @hidden
     * Used by the external dropzone to add files to the FileSelect
     */
    FileSelectComponent.prototype.addFiles = function (files) {
        this.uploadService.addFiles(files);
    };
    Object.defineProperty(FileSelectComponent.prototype, "selectButtonTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? undefined : this.tabindex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FileSelectComponent.prototype.onFileSelectButtonFocus = function (_event) {
        this.renderer.addClass(this.fileSelectButton.nativeElement, 'k-state-focused');
        if (!this.navigation.focused) {
            this.navigation.focusedIndex = -1;
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.onFileSelectButtonBlur = function (_event) {
        this.renderer.removeClass(this.fileSelectButton.nativeElement, 'k-state-focused');
    };
    FileSelectComponent.prototype.subscribeBlur = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.documentClick = fromEvent(document, 'click').pipe(filter(function (event) {
                return !(_this.wrapper !== event.target && _this.wrapper.contains(event.target));
            }));
            _this.blurSubscription = merge(_this.documentClick, _this.navigation.onTab).subscribe(function () {
                if (_this.navigation.focused) {
                    _this.ngZone.run(function () {
                        _this.navigation.focused = false;
                        _this.onTouchedCallback();
                        _this.onBlur.emit();
                    });
                }
            });
        });
    };
    FileSelectComponent.prototype.subscribeFocus = function () {
        var _this = this;
        this.wrapperFocusSubscription = this.navigation.onWrapperFocus.subscribe(function () {
            _this.onFocus.emit();
        });
        this.selectButtonFocusSubscription = this.navigation.onSelectButtonFocus.subscribe(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    FileSelectComponent.prototype.attachEventHandlers = function () {
        var _this = this;
        this.subs = this.uploadService.changeEvent.subscribe(function (files) {
            var model = [];
            if (files !== null) {
                files.forEach(function (file) {
                    if (file.state === FileState.Initial) {
                        model.push(file);
                    }
                    if (file.state === FileState.Selected && file.rawFile && !file.validationErrors) {
                        model.push(file.rawFile);
                    }
                });
            }
            if (model.length === 0) {
                model = null;
            }
            _this.onChangeCallback(model);
            _this.valueChange.emit(model);
        });
        this.subs.add(this.uploadService.removeEvent.subscribe(function (args) {
            _this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe(function (args) {
            _this.select.emit(args);
        }));
    };
    FileSelectComponent.prototype.setDefaultSettings = function () {
        this.uploadService.async.autoUpload = false;
        this.uploadService.component = 'FileSelect';
    };
    FileSelectComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoFileSelect',
                    providers: [
                        LocalizationService,
                        NavigationService,
                        UploadService,
                        DropZoneService,
                        FILESELECT_VALUE_ACCESSOR,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.fileselect'
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return FileSelectComponent; })
                        }
                    ],
                    selector: 'kendo-fileselect',
                    template: "\n        <ng-container kendoFileSelectLocalizedMessages\n            i18n-dropFilesHere=\"kendo.fileselect.dropFilesHere|The drop zone hint\"\n            dropFilesHere=\"Drop files here to select\"\n\n            i18n-invalidFileExtension=\"kendo.fileselect.invalidFileExtension|The text for the invalid allowed extensions restriction message\"\n            invalidFileExtension=\"File type not allowed.\"\n\n            i18n-invalidMaxFileSize=\"kendo.fileselect.invalidMaxFileSize|The text for the invalid max file size restriction message\"\n            invalidMaxFileSize=\"File size too large.\"\n\n            i18n-invalidMinFileSize=\"kendo.fileselect.invalidMinFileSize|The text for the invalid min file size restriction message\"\n            invalidMinFileSize=\"File size too small.\"\n\n            i18n-remove=\"kendo.fileselect.remove|The text for the Remove button\"\n            remove=\"Remove\"\n\n            i18n-select=\"kendo.fileselect.select|The text for the Select button\"\n            select=\"Select files...\"\n        >\n        </ng-container>\n        <div kendoFileSelectInternalDropZone\n            [restrictions]=\"restrictions\"\n            [multiple]=\"multiple\"\n            [disabled]=\"disabled\">\n            <div role=\"button\" #fileSelectButton\n                [id]=\"focusableId\"\n                [attr.aria-label]=\"textFor('select')\"\n                [attr.tabindex]=\"selectButtonTabIndex\"\n                (focus)=\"onFileSelectButtonFocus($event)\"\n                (blur)=\"onFileSelectButtonBlur($event)\"\n                class=\"k-button k-upload-button\">\n                <input #fileSelect kendoFileSelect\n                    [attr.accept]=\"accept ? accept : null\"\n                    [dir]=\"direction\"\n                    [restrictions]=\"restrictions\"\n                    [multiple]=\"multiple\"\n                    [disabled]=\"disabled\" />\n                <span>{{textFor('select')}}</span>\n            </div>\n            <div class=\"k-dropzone-hint\">{{textFor('dropFilesHere')}}</div>\n        </div>\n        <ul kendo-upload-file-list\n            class=\"k-upload-files k-reset\"\n            *ngIf=\"showFileList && fileList.count > 0\"\n            [disabled]=\"disabled\"\n            [fileList]=\"fileList.files\"\n            [fileTemplate]=\"fileTemplate\">\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    FileSelectComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService },
        { type: NavigationService },
        { type: DropZoneService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    FileSelectComponent.propDecorators = {
        accept: [{ type: Input }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        name: [{ type: Input }],
        showFileList: [{ type: Input }],
        tabindex: [{ type: Input }],
        restrictions: [{ type: Input }],
        zoneId: [{ type: Input }],
        focusableId: [{ type: Input }],
        fileTemplate: [{ type: ContentChild, args: [FileTemplateDirective,] }],
        fileSelect: [{ type: ViewChild, args: ['fileSelect',] }],
        fileSelectButton: [{ type: ViewChild, args: ['fileSelectButton',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        onFocus: [{ type: Output, args: ['focus',] }],
        select: [{ type: Output }],
        remove: [{ type: Output }],
        valueChange: [{ type: Output }],
        hostDefaultClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-upload',] }],
        hostDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return FileSelectComponent;
}());
export { FileSelectComponent };
