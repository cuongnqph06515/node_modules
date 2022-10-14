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
export const FILESELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileSelectComponent) // tslint:disable-line:no-forward-ref
};
export class FileSelectComponent {
    constructor(uploadService, localization, navigation, dropZoneService, ngZone, renderer, cdr, wrapper) {
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
        this.focusableId = `k-${guid()}`;
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
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.wrapper = wrapper.nativeElement;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.navigation.computeKeys(this.direction);
        });
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
        this.setDefaultSettings();
    }
    /**
     * Sets the `name` attribute of the `input` element of the FileSelect.
     */
    set name(name) {
        this.uploadService.async.saveField = name;
    }
    get name() {
        return this.uploadService.async.saveField;
    }
    /**
     * Sets the restrictions for selected files.
     */
    set restrictions(restrictions) {
        let parsedRestrictions = Object.assign({}, this._restrictions, restrictions);
        this._restrictions = parsedRestrictions;
    }
    get restrictions() {
        return this._restrictions;
    }
    get hostDisabledClass() {
        return this.disabled;
    }
    get dir() {
        return this.direction;
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * Focuses the underlying input element.
     */
    focus() {
        setTimeout(() => {
            this.fileSelectButton.nativeElement.focus();
        });
    }
    ngOnDestroy() {
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
    }
    /**
     * @hidden
     */
    handleKeydown(event) {
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
    }
    /**
     * @hidden
     */
    writeValue(newValue) {
        let isValid = true;
        if (newValue instanceof Array) {
            newValue.forEach((file) => {
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
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Removes specific file from the file list.
     */
    removeFileByUid(uid) {
        this.uploadService.removeFiles(uid);
    }
    /**
     * Visually clears all files from the UI.
     */
    clearFiles() {
        this.uploadService.clearFiles();
    }
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    /**
     * @hidden
     * Used by the external dropzone to add files to the FileSelect
     */
    addFiles(files) {
        this.uploadService.addFiles(files);
    }
    /**
     * @hidden
     */
    get selectButtonTabIndex() {
        return this.disabled ? undefined : this.tabindex;
    }
    /**
     * @hidden
     */
    onFileSelectButtonFocus(_event) {
        this.renderer.addClass(this.fileSelectButton.nativeElement, 'k-state-focused');
        if (!this.navigation.focused) {
            this.navigation.focusedIndex = -1;
        }
    }
    /**
     * @hidden
     */
    onFileSelectButtonBlur(_event) {
        this.renderer.removeClass(this.fileSelectButton.nativeElement, 'k-state-focused');
    }
    subscribeBlur() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.documentClick = fromEvent(document, 'click').pipe(filter((event) => {
                return !(this.wrapper !== event.target && this.wrapper.contains(event.target));
            }));
            this.blurSubscription = merge(this.documentClick, this.navigation.onTab).subscribe(() => {
                if (this.navigation.focused) {
                    this.ngZone.run(() => {
                        this.navigation.focused = false;
                        this.onTouchedCallback();
                        this.onBlur.emit();
                    });
                }
            });
        });
    }
    subscribeFocus() {
        this.wrapperFocusSubscription = this.navigation.onWrapperFocus.subscribe(() => {
            this.onFocus.emit();
        });
        this.selectButtonFocusSubscription = this.navigation.onSelectButtonFocus.subscribe(() => {
            this.fileSelectButton.nativeElement.focus();
        });
    }
    attachEventHandlers() {
        this.subs = this.uploadService.changeEvent.subscribe((files) => {
            let model = [];
            if (files !== null) {
                files.forEach((file) => {
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
            this.onChangeCallback(model);
            this.valueChange.emit(model);
        });
        this.subs.add(this.uploadService.removeEvent.subscribe((args) => {
            this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe((args) => {
            this.select.emit(args);
        }));
    }
    setDefaultSettings() {
        this.uploadService.async.autoUpload = false;
        this.uploadService.component = 'FileSelect';
    }
}
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
                        useExisting: forwardRef(() => FileSelectComponent)
                    }
                ],
                selector: 'kendo-fileselect',
                template: `
        <ng-container kendoFileSelectLocalizedMessages
            i18n-dropFilesHere="kendo.fileselect.dropFilesHere|The drop zone hint"
            dropFilesHere="Drop files here to select"

            i18n-invalidFileExtension="kendo.fileselect.invalidFileExtension|The text for the invalid allowed extensions restriction message"
            invalidFileExtension="File type not allowed."

            i18n-invalidMaxFileSize="kendo.fileselect.invalidMaxFileSize|The text for the invalid max file size restriction message"
            invalidMaxFileSize="File size too large."

            i18n-invalidMinFileSize="kendo.fileselect.invalidMinFileSize|The text for the invalid min file size restriction message"
            invalidMinFileSize="File size too small."

            i18n-remove="kendo.fileselect.remove|The text for the Remove button"
            remove="Remove"

            i18n-select="kendo.fileselect.select|The text for the Select button"
            select="Select files..."
        >
        </ng-container>
        <div kendoFileSelectInternalDropZone
            [restrictions]="restrictions"
            [multiple]="multiple"
            [disabled]="disabled">
            <div role="button" #fileSelectButton
                [id]="focusableId"
                [attr.aria-label]="textFor('select')"
                [attr.tabindex]="selectButtonTabIndex"
                (focus)="onFileSelectButtonFocus($event)"
                (blur)="onFileSelectButtonBlur($event)"
                class="k-button k-upload-button">
                <input #fileSelect kendoFileSelect
                    [attr.accept]="accept ? accept : null"
                    [dir]="direction"
                    [restrictions]="restrictions"
                    [multiple]="multiple"
                    [disabled]="disabled" />
                <span>{{textFor('select')}}</span>
            </div>
            <div class="k-dropzone-hint">{{textFor('dropFilesHere')}}</div>
        </div>
        <ul kendo-upload-file-list
            class="k-upload-files k-reset"
            *ngIf="showFileList && fileList.count > 0"
            [disabled]="disabled"
            [fileList]="fileList.files"
            [fileTemplate]="fileTemplate">
        </ul>
    `
            },] },
];
/** @nocollapse */
FileSelectComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService },
    { type: NavigationService },
    { type: DropZoneService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
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
