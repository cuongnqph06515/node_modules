import { ENTER } from '@angular/cdk/keycodes';
import { HttpRequest, HttpHeaders, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, Optional, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, Inject, NgZone, EventEmitter, Output, NgModule } from '@angular/core';
import { warn } from 'ng-zorro-antd/core/logger';
import { of, Observable, Subscription } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { DOCUMENT, CommonModule } from '@angular/common';
import { __decorate, __metadata } from 'tslib';
import { toBoolean, InputNumber, InputBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

/**
 * @fileoverview added by tsickle
 * Generated from: interface.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function NzUploadFile() { }
if (false) {
    /** @type {?} */
    NzUploadFile.prototype.uid;
    /** @type {?|undefined} */
    NzUploadFile.prototype.size;
    /** @type {?} */
    NzUploadFile.prototype.name;
    /** @type {?|undefined} */
    NzUploadFile.prototype.filename;
    /** @type {?|undefined} */
    NzUploadFile.prototype.lastModified;
    /** @type {?|undefined} */
    NzUploadFile.prototype.lastModifiedDate;
    /** @type {?|undefined} */
    NzUploadFile.prototype.url;
    /** @type {?|undefined} */
    NzUploadFile.prototype.status;
    /** @type {?|undefined} */
    NzUploadFile.prototype.originFileObj;
    /** @type {?|undefined} */
    NzUploadFile.prototype.percent;
    /** @type {?|undefined} */
    NzUploadFile.prototype.thumbUrl;
    /** @type {?|undefined} */
    NzUploadFile.prototype.response;
    /** @type {?|undefined} */
    NzUploadFile.prototype.error;
    /** @type {?|undefined} */
    NzUploadFile.prototype.linkProps;
    /** @type {?|undefined} */
    NzUploadFile.prototype.type;
    /* Skipping unhandled member: [key: string]: NzSafeAny;*/
}
/**
 * @record
 */
function NzUploadChangeParam() { }
if (false) {
    /** @type {?} */
    NzUploadChangeParam.prototype.file;
    /** @type {?} */
    NzUploadChangeParam.prototype.fileList;
    /** @type {?|undefined} */
    NzUploadChangeParam.prototype.event;
    /**
     * Callback type.
     * @type {?|undefined}
     */
    NzUploadChangeParam.prototype.type;
}
/**
 * @record
 */
function NzShowUploadList() { }
if (false) {
    /** @type {?|undefined} */
    NzShowUploadList.prototype.showRemoveIcon;
    /** @type {?|undefined} */
    NzShowUploadList.prototype.showPreviewIcon;
    /** @type {?|undefined} */
    NzShowUploadList.prototype.showDownloadIcon;
}
/**
 * @record
 */
function ZipButtonOptions() { }
if (false) {
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.disabled;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.accept;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.action;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.directory;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.openFileDialogOnClick;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.data;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.headers;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.name;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.multiple;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.withCredentials;
    /** @type {?|undefined} */
    ZipButtonOptions.prototype.filters;
    /**
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    ZipButtonOptions.prototype.beforeUpload = function (file, fileList) { };
    /**
     * @param {?} item
     * @return {?}
     */
    ZipButtonOptions.prototype.customRequest = function (item) { };
    /**
     * @param {?} file
     * @return {?}
     */
    ZipButtonOptions.prototype.transformFile = function (file) { };
    /**
     * @param {?} file
     * @return {?}
     */
    ZipButtonOptions.prototype.onStart = function (file) { };
    /**
     * @param {?} e
     * @param {?} file
     * @return {?}
     */
    ZipButtonOptions.prototype.onProgress = function (e, file) { };
    /**
     * @param {?} ret
     * @param {?} file
     * @param {?} xhr
     * @return {?}
     */
    ZipButtonOptions.prototype.onSuccess = function (ret, file, xhr) { };
    /**
     * @param {?} err
     * @param {?} file
     * @return {?}
     */
    ZipButtonOptions.prototype.onError = function (err, file) { };
}
/**
 * @record
 */
function UploadFilter() { }
if (false) {
    /** @type {?} */
    UploadFilter.prototype.name;
    /**
     * @param {?} fileList
     * @return {?}
     */
    UploadFilter.prototype.fn = function (fileList) { };
}
/**
 * @record
 */
function NzUploadXHRArgs() { }
if (false) {
    /** @type {?|undefined} */
    NzUploadXHRArgs.prototype.action;
    /** @type {?|undefined} */
    NzUploadXHRArgs.prototype.name;
    /** @type {?|undefined} */
    NzUploadXHRArgs.prototype.headers;
    /** @type {?} */
    NzUploadXHRArgs.prototype.file;
    /** @type {?} */
    NzUploadXHRArgs.prototype.postFile;
    /** @type {?|undefined} */
    NzUploadXHRArgs.prototype.data;
    /** @type {?|undefined} */
    NzUploadXHRArgs.prototype.withCredentials;
    /**
     * @param {?} e
     * @param {?} file
     * @return {?}
     */
    NzUploadXHRArgs.prototype.onProgress = function (e, file) { };
    /**
     * @param {?} ret
     * @param {?} file
     * @param {?} xhr
     * @return {?}
     */
    NzUploadXHRArgs.prototype.onSuccess = function (ret, file, xhr) { };
    /**
     * @param {?} err
     * @param {?} file
     * @return {?}
     */
    NzUploadXHRArgs.prototype.onError = function (err, file) { };
}
class NzShowUploadListInterface {
}

/**
 * @fileoverview added by tsickle
 * Generated from: upload-btn.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzUploadBtnComponent {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.reqs = {};
        this.destroy = false;
        if (!http) {
            throw new Error(`Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
        }
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.options.disabled || !this.options.openFileDialogOnClick) {
            return;
        }
        ((/** @type {?} */ (this.file.nativeElement))).click();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (this.options.disabled) {
            return;
        }
        if (e.key === 'Enter' || e.keyCode === ENTER) {
            this.onClick();
        }
    }
    // skip safari bug
    /**
     * @param {?} e
     * @return {?}
     */
    onFileDrop(e) {
        if (this.options.disabled || e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        if (this.options.directory) {
            this.traverseFileTree((/** @type {?} */ (e.dataTransfer)).items);
        }
        else {
            /** @type {?} */
            const files = Array.prototype.slice
                .call((/** @type {?} */ (e.dataTransfer)).files)
                .filter((/**
             * @param {?} file
             * @return {?}
             */
            (file) => this.attrAccept(file, this.options.accept)));
            if (files.length) {
                this.uploadFiles(files);
            }
        }
        e.preventDefault();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onChange(e) {
        if (this.options.disabled) {
            return;
        }
        /** @type {?} */
        const hie = (/** @type {?} */ (e.target));
        this.uploadFiles((/** @type {?} */ (hie.files)));
        hie.value = '';
    }
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    traverseFileTree(files) {
        /** @type {?} */
        const _traverseFileTree = (/**
         * @param {?} item
         * @param {?} path
         * @return {?}
         */
        (item, path) => {
            if (item.isFile) {
                item.file((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    if (this.attrAccept(file, this.options.accept)) {
                        this.uploadFiles([file]);
                    }
                }));
            }
            else if (item.isDirectory) {
                /** @type {?} */
                const dirReader = item.createReader();
                dirReader.readEntries((/**
                 * @param {?} entries
                 * @return {?}
                 */
                (entries) => {
                    for (const entrieItem of entries) {
                        _traverseFileTree(entrieItem, `${path}${item.name}/`);
                    }
                }));
            }
        });
        for (const file of (/** @type {?} */ (files))) {
            _traverseFileTree(file.webkitGetAsEntry(), '');
        }
    }
    /**
     * @private
     * @param {?} file
     * @param {?=} acceptedFiles
     * @return {?}
     */
    attrAccept(file, acceptedFiles) {
        if (file && acceptedFiles) {
            /** @type {?} */
            const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
            /** @type {?} */
            const fileName = '' + file.name;
            /** @type {?} */
            const mimeType = '' + file.type;
            /** @type {?} */
            const baseMimeType = mimeType.replace(/\/.*$/, '');
            return acceptedFilesArray.some((/**
             * @param {?} type
             * @return {?}
             */
            type => {
                /** @type {?} */
                const validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return (fileName.toLowerCase().indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1);
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType === validType.replace(/\/.*$/, '');
                }
                return mimeType === validType;
            }));
        }
        return true;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    attachUid(file) {
        if (!file.uid) {
            file.uid = Math.random().toString(36).substring(2);
        }
        return file;
    }
    /**
     * @param {?} fileList
     * @return {?}
     */
    uploadFiles(fileList) {
        /** @type {?} */
        let filters$ = of(Array.prototype.slice.call(fileList));
        if (this.options.filters) {
            this.options.filters.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                filters$ = filters$.pipe(switchMap((/**
                 * @param {?} list
                 * @return {?}
                 */
                list => {
                    /** @type {?} */
                    const fnRes = f.fn(list);
                    return fnRes instanceof Observable ? fnRes : of(fnRes);
                })));
            }));
        }
        filters$.subscribe((/**
         * @param {?} list
         * @return {?}
         */
        list => {
            list.forEach((/**
             * @param {?} file
             * @return {?}
             */
            (file) => {
                this.attachUid(file);
                this.upload(file, list);
            }));
        }), (/**
         * @param {?} e
         * @return {?}
         */
        e => {
            warn(`Unhandled upload filter error`, e);
        }));
    }
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    upload(file, fileList) {
        if (!this.options.beforeUpload) {
            return this.post(file);
        }
        /** @type {?} */
        const before = this.options.beforeUpload(file, fileList);
        if (before instanceof Observable) {
            before.subscribe((/**
             * @param {?} processedFile
             * @return {?}
             */
            (processedFile) => {
                /** @type {?} */
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    this.attachUid(processedFile);
                    this.post(processedFile);
                }
                else if (typeof processedFile === 'boolean' && processedFile !== false) {
                    this.post(file);
                }
            }), (/**
             * @param {?} e
             * @return {?}
             */
            e => {
                warn(`Unhandled upload beforeUpload error`, e);
            }));
        }
        else if (before !== false) {
            return this.post(file);
        }
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    post(file) {
        if (this.destroy) {
            return;
        }
        /** @type {?} */
        let process$ = of(file);
        /** @type {?} */
        const opt = this.options;
        const { uid } = file;
        const { action, data, headers, transformFile } = opt;
        /** @type {?} */
        const args = {
            action: typeof action === 'string' ? action : '',
            name: opt.name,
            headers,
            file,
            postFile: file,
            data,
            withCredentials: opt.withCredentials,
            onProgress: opt.onProgress
                ? (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    (/** @type {?} */ (opt.onProgress))(e, file);
                })
                : undefined,
            onSuccess: (/**
             * @param {?} ret
             * @param {?} xhr
             * @return {?}
             */
            (ret, xhr) => {
                this.clean(uid);
                (/** @type {?} */ (opt.onSuccess))(ret, file, xhr);
            }),
            onError: (/**
             * @param {?} xhr
             * @return {?}
             */
            xhr => {
                this.clean(uid);
                (/** @type {?} */ (opt.onError))(xhr, file);
            })
        };
        if (typeof action === 'function') {
            /** @type {?} */
            const actionResult = ((/** @type {?} */ (action)))(file);
            if (actionResult instanceof Observable) {
                process$ = process$.pipe(switchMap((/**
                 * @return {?}
                 */
                () => actionResult)), map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    args.action = res;
                    return file;
                })));
            }
            else {
                args.action = actionResult;
            }
        }
        if (typeof transformFile === 'function') {
            /** @type {?} */
            const transformResult = transformFile(file);
            process$ = process$.pipe(switchMap((/**
             * @return {?}
             */
            () => (transformResult instanceof Observable ? transformResult : of(transformResult)))));
        }
        if (typeof data === 'function') {
            /** @type {?} */
            const dataResult = ((/** @type {?} */ (data)))(file);
            if (dataResult instanceof Observable) {
                process$ = process$.pipe(switchMap((/**
                 * @return {?}
                 */
                () => dataResult)), map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    args.data = res;
                    return file;
                })));
            }
            else {
                args.data = dataResult;
            }
        }
        if (typeof headers === 'function') {
            /** @type {?} */
            const headersResult = ((/** @type {?} */ (headers)))(file);
            if (headersResult instanceof Observable) {
                process$ = process$.pipe(switchMap((/**
                 * @return {?}
                 */
                () => headersResult)), map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    args.headers = res;
                    return file;
                })));
            }
            else {
                args.headers = headersResult;
            }
        }
        process$.subscribe((/**
         * @param {?} newFile
         * @return {?}
         */
        newFile => {
            args.postFile = newFile;
            /** @type {?} */
            const req$ = (opt.customRequest || this.xhr).call(this, args);
            if (!(req$ instanceof Subscription)) {
                warn(`Must return Subscription type in '[nzCustomRequest]' property`);
            }
            this.reqs[uid] = req$;
            (/** @type {?} */ (opt.onStart))(file);
        }));
    }
    /**
     * @private
     * @param {?} args
     * @return {?}
     */
    xhr(args) {
        /** @type {?} */
        const formData = new FormData();
        if (args.data) {
            Object.keys(args.data).map((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                formData.append(key, (/** @type {?} */ (args.data))[key]);
            }));
        }
        formData.append((/** @type {?} */ (args.name)), (/** @type {?} */ (args.postFile)));
        if (!args.headers) {
            args.headers = {};
        }
        if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = `XMLHttpRequest`;
        }
        else {
            delete args.headers['X-Requested-With'];
        }
        /** @type {?} */
        const req = new HttpRequest('POST', (/** @type {?} */ (args.action)), formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new HttpHeaders(args.headers)
        });
        return this.http.request(req).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.type === HttpEventType.UploadProgress) {
                if ((/** @type {?} */ (event.total)) > 0) {
                    ((/** @type {?} */ (event))).percent = (event.loaded / (/** @type {?} */ (event.total))) * 100;
                }
                (/** @type {?} */ (args.onProgress))(event, args.file);
            }
            else if (event instanceof HttpResponse) {
                (/** @type {?} */ (args.onSuccess))(event.body, args.file, event);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            this.abort(args.file);
            (/** @type {?} */ (args.onError))(err, args.file);
        }));
    }
    /**
     * @private
     * @param {?} uid
     * @return {?}
     */
    clean(uid) {
        /** @type {?} */
        const req$ = this.reqs[uid];
        if (req$ instanceof Subscription) {
            req$.unsubscribe();
        }
        delete this.reqs[uid];
    }
    /**
     * @param {?=} file
     * @return {?}
     */
    abort(file) {
        if (file) {
            this.clean(file && file.uid);
        }
        else {
            Object.keys(this.reqs).forEach((/**
             * @param {?} uid
             * @return {?}
             */
            uid => this.clean(uid)));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy = true;
        this.abort();
    }
}
NzUploadBtnComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-upload-btn]',
                exportAs: 'nzUploadBtn',
                template: "<input\n  type=\"file\"\n  #file\n  (change)=\"onChange($event)\"\n  [attr.accept]=\"options.accept\"\n  [attr.directory]=\"options.directory ? 'directory' : null\"\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory' : null\"\n  [multiple]=\"options.multiple\"\n  style=\"display: none;\"\n/>\n<ng-content></ng-content>\n",
                host: {
                    '[attr.tabindex]': '"0"',
                    '[attr.role]': '"button"',
                    '[class.ant-upload]': 'true',
                    '[class.ant-upload-disabled]': 'options.disabled',
                    '(click)': 'onClick()',
                    '(keydown)': 'onKeyDown($event)',
                    '(drop)': 'onFileDrop($event)',
                    '(dragover)': 'onFileDrop($event)'
                },
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
NzUploadBtnComponent.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Optional }] }
];
NzUploadBtnComponent.propDecorators = {
    file: [{ type: ViewChild, args: ['file', { static: false },] }],
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzUploadBtnComponent.prototype.reqs;
    /**
     * @type {?}
     * @private
     */
    NzUploadBtnComponent.prototype.destroy;
    /** @type {?} */
    NzUploadBtnComponent.prototype.file;
    /** @type {?} */
    NzUploadBtnComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    NzUploadBtnComponent.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * Generated from: upload-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isImageFileType = (/**
 * @param {?} type
 * @return {?}
 */
(type) => !!type && type.indexOf('image/') === 0);
const ??0 = isImageFileType;
/** @type {?} */
const MEASURE_SIZE = 200;
/**
 * @record
 */
function UploadListFile() { }
if (false) {
    /** @type {?|undefined} */
    UploadListFile.prototype.isImageUrl;
    /** @type {?|undefined} */
    UploadListFile.prototype.isUploading;
    /** @type {?|undefined} */
    UploadListFile.prototype.iconType;
    /** @type {?|undefined} */
    UploadListFile.prototype.listItemNameCls;
    /** @type {?|undefined} */
    UploadListFile.prototype.showDownload;
}
class NzUploadListComponent {
    // #endregion
    /**
     * @param {?} cdr
     * @param {?} doc
     * @param {?} ngZone
     * @param {?} platform
     */
    constructor(cdr, doc, ngZone, platform) {
        this.cdr = cdr;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platform = platform;
        this.list = [];
        this.locale = {};
        this.iconRender = null;
    }
    /**
     * @private
     * @return {?}
     */
    get showPic() {
        return this.listType === 'picture' || this.listType === 'picture-card';
    }
    /**
     * @param {?} list
     * @return {?}
     */
    set items(list) {
        this.list = list;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    genErr(file) {
        if (file.response && typeof file.response === 'string') {
            return file.response;
        }
        return (file.error && file.error.statusText) || this.locale.uploadError;
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    extname(url) {
        /** @type {?} */
        const temp = url.split('/');
        /** @type {?} */
        const filename = temp[temp.length - 1];
        /** @type {?} */
        const filenameWithoutSuffix = filename.split(/#|\?/)[0];
        return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImageUrl(file) {
        if (isImageFileType((/** @type {?} */ (file.type)))) {
            return true;
        }
        /** @type {?} */
        const url = (/** @type {?} */ ((file.thumbUrl || file.url || '')));
        if (!url) {
            return false;
        }
        /** @type {?} */
        const extension = this.extname(url);
        if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
            return true;
        }
        else if (/^data:/.test(url)) {
            // other file types of base64
            return false;
        }
        else if (extension) {
            // other file types which have extension
            return false;
        }
        return true;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getIconType(file) {
        if (!this.showPic) {
            return '';
        }
        if (file.isUploading || (!file.thumbUrl && !file.url)) {
            return 'uploading';
        }
        else {
            return 'thumbnail';
        }
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    previewImage(file) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (!isImageFileType(file.type)) {
                resolve('');
                return;
            }
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const canvas = this.doc.createElement('canvas');
                canvas.width = MEASURE_SIZE;
                canvas.height = MEASURE_SIZE;
                canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
                this.doc.body.appendChild(canvas);
                /** @type {?} */
                const ctx = canvas.getContext('2d');
                /** @type {?} */
                const img = new Image();
                img.onload = (/**
                 * @return {?}
                 */
                () => {
                    const { width, height } = img;
                    /** @type {?} */
                    let drawWidth = MEASURE_SIZE;
                    /** @type {?} */
                    let drawHeight = MEASURE_SIZE;
                    /** @type {?} */
                    let offsetX = 0;
                    /** @type {?} */
                    let offsetY = 0;
                    if (width < height) {
                        drawHeight = height * (MEASURE_SIZE / width);
                        offsetY = -(drawHeight - drawWidth) / 2;
                    }
                    else {
                        drawWidth = width * (MEASURE_SIZE / height);
                        offsetX = -(drawWidth - drawHeight) / 2;
                    }
                    try {
                        (/** @type {?} */ (ctx)).drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                    }
                    catch (_a) { }
                    /** @type {?} */
                    const dataURL = canvas.toDataURL();
                    this.doc.body.removeChild(canvas);
                    resolve(dataURL);
                });
                img.src = window.URL.createObjectURL(file);
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    genThumb() {
        if (!this.platform.isBrowser) {
            return;
        }
        /** @type {?} */
        const win = (/** @type {?} */ (window));
        if (!this.showPic || typeof document === 'undefined' || typeof win === 'undefined' || !win.FileReader || !win.File) {
            return;
        }
        this.list
            .filter((/**
         * @param {?} file
         * @return {?}
         */
        file => file.originFileObj instanceof File && file.thumbUrl === undefined))
            .forEach((/**
         * @param {?} file
         * @return {?}
         */
        file => {
            file.thumbUrl = '';
            (this.previewFile ? this.previewFile(file).toPromise() : this.previewImage((/** @type {?} */ (file.originFileObj)))).then((/**
             * @param {?} dataUrl
             * @return {?}
             */
            dataUrl => {
                file.thumbUrl = dataUrl;
                this.detectChanges();
            }));
        }));
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    listItemNameCls(file) {
        /** @type {?} */
        const count = [this.showDownload(file), this.icons.showRemoveIcon].filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x)).length;
        return {
            [`ant-upload-list-item-name`]: true,
            [`ant-upload-list-item-name-icon-count-${count}`]: true
        };
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    showDownload(file) {
        return !!(this.icons.showDownloadIcon && file.status === 'done');
    }
    /**
     * @private
     * @return {?}
     */
    fixData() {
        this.list.forEach((/**
         * @param {?} file
         * @return {?}
         */
        file => {
            file.isUploading = file.status === 'uploading';
            file.message = this.genErr(file);
            file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
            file.isImageUrl = this.previewIsImage ? this.previewIsImage(file) : this.isImageUrl(file);
            file.iconType = this.getIconType(file);
            file.listItemNameCls = this.listItemNameCls(file);
            file.showDownload = this.showDownload(file);
        }));
    }
    /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    handlePreview(file, e) {
        if (!this.onPreview) {
            return;
        }
        e.preventDefault();
        return this.onPreview(file);
    }
    /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    handleRemove(file, e) {
        e.preventDefault();
        if (this.onRemove) {
            this.onRemove(file);
        }
        return;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    handleDownload(file) {
        if (typeof this.onDownload === 'function') {
            this.onDownload(file);
        }
        else if (file.url) {
            window.open(file.url);
        }
    }
    /**
     * @return {?}
     */
    detectChanges() {
        this.fixData();
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.fixData();
        this.genThumb();
    }
}
NzUploadListComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-upload-list',
                exportAs: 'nzUploadList',
                template: "<div\n  *ngFor=\"let file of list\"\n  class=\"ant-upload-list-item ant-upload-list-item-{{\n    file.status\n  }} ant-upload-list-item-list-type-{{ listType }}\"\n  [attr.data-key]=\"file.key\"\n  @itemState\n  nz-tooltip\n  [nzTooltipTitle]=\"file.status === 'error' ? file.message : null\"\n>\n  <ng-template #icon>\n    <ng-container [ngSwitch]=\"file.iconType\">\n      <div\n        *ngSwitchCase=\"'uploading'\"\n        class=\"ant-upload-list-item-thumbnail\"\n        [class.ant-upload-list-item-file]=\"!file.isUploading\"\n      >\n        <ng-template\n          [ngTemplateOutlet]=\"iconNode\"\n          [ngTemplateOutletContext]=\"{ $implicit: file }\"\n        ></ng-template>\n      </div>\n      <a\n        *ngSwitchCase=\"'thumbnail'\"\n        class=\"ant-upload-list-item-thumbnail\"\n        [class.ant-upload-list-item-file]=\"!file.isImageUrl\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        [href]=\"file.url || file.thumbUrl\"\n        (click)=\"handlePreview(file, $event)\"\n      >\n        <img\n          *ngIf=\"file.isImageUrl; else noImageThumbTpl\"\n          class=\"ant-upload-list-item-image\"\n          [src]=\"file.thumbUrl || file.url\"\n          [attr.alt]=\"file.name\"\n        />\n      </a>\n      <span *ngSwitchDefault class=\"ant-upload-text-icon\">\n        <ng-template\n          [ngTemplateOutlet]=\"iconNode\"\n          [ngTemplateOutletContext]=\"{ $implicit: file }\"\n        ></ng-template>\n      </span>\n    </ng-container>\n    <ng-template #noImageThumbTpl>\n      <ng-template\n        [ngTemplateOutlet]=\"iconNode\"\n        [ngTemplateOutletContext]=\"{ $implicit: file }\"\n      ></ng-template>\n    </ng-template>\n  </ng-template>\n  <ng-template #iconNode let-file>\n    <ng-container *ngIf=\"!iconRender; else iconRender\">\n      <ng-container [ngSwitch]=\"listType\">\n        <ng-container *ngSwitchCase=\"'picture'\">\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">\n            <i nz-icon nzType=\"loading\"></i>\n          </ng-container>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"'picture-card'\">\n          <ng-container *ngIf=\"file.isUploading; else iconNodeFileIcon\">{{\n            locale.uploading\n          }}</ng-container>\n        </ng-container>\n        <i *ngSwitchDefault nz-icon [nzType]=\"file.isUploading ? 'loading' : 'paper-clip'\"></i>\n      </ng-container>\n    </ng-container>\n    <ng-template #iconNodeFileIcon>\n      <i nz-icon [nzType]=\"file.isImageUrl ? 'picture' : 'file'\" nzTheme=\"twotone\"></i>\n    </ng-template>\n  </ng-template>\n  <ng-template #downloadOrDelete>\n    <span\n      *ngIf=\"listType !== 'picture-card'\"\n      class=\"ant-upload-list-item-card-actions {{ listType === 'picture' ? 'picture' : '' }}\"\n    >\n      <a *ngIf=\"file.showDownload\" title=\"{{ locale.downloadFile }}\">\n        <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n      </a>\n      <a *ngIf=\"icons.showRemoveIcon\" title=\"{{ locale.removeFile }}\">\n        <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n      </a>\n    </span>\n  </ng-template>\n  <ng-template #preview>\n    <a\n      *ngIf=\"file.url\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      [ngClass]=\"file.listItemNameCls!\"\n      [attr.title]=\"file.name\"\n      [href]=\"file.url\"\n      [attr.download]=\"file.linkProps && file.linkProps.download\"\n      (click)=\"handlePreview(file, $event)\"\n      >{{ file.name }}</a\n    >\n    <span\n      *ngIf=\"!file.url\"\n      [ngClass]=\"file.listItemNameCls!\"\n      [attr.title]=\"file.name\"\n      (click)=\"handlePreview(file, $event)\"\n      >{{ file.name }}</span\n    >\n    <ng-template [ngTemplateOutlet]=\"downloadOrDelete\"></ng-template>\n  </ng-template>\n  <ng-template #removeIcon>\n    <i\n      *ngIf=\"icons.showRemoveIcon\"\n      (click)=\"handleRemove(file, $event)\"\n      nz-icon\n      nzType=\"delete\"\n      title=\"{{ locale.removeFile }}\"\n    ></i>\n  </ng-template>\n  <ng-template #downloadIcon>\n    <i\n      *ngIf=\"file.showDownload\"\n      (click)=\"handleDownload(file)\"\n      nz-icon\n      nzType=\"download\"\n      title=\"{{ locale.downloadFile }}\"\n    ></i>\n  </ng-template>\n  <div class=\"ant-upload-list-item-info\">\n    <span>\n      <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\n      <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\n    </span>\n  </div>\n  <span\n    *ngIf=\"listType === 'picture-card' && !file.isUploading\"\n    class=\"ant-upload-list-item-actions\"\n  >\n    <a\n      *ngIf=\"icons.showPreviewIcon\"\n      [href]=\"file.url || file.thumbUrl\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      title=\"{{ locale.previewFile }}\"\n      [ngStyle]=\"!(file.url || file.thumbUrl) ? { opacity: 0.5, 'pointer-events': 'none' } : null\"\n      (click)=\"handlePreview(file, $event)\"\n    >\n      <i nz-icon nzType=\"eye\"></i>\n    </a>\n    <ng-template [ngTemplateOutlet]=\"downloadIcon\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"removeIcon\"></ng-template>\n  </span>\n  <div *ngIf=\"file.isUploading\" class=\"ant-upload-list-item-progress\">\n    <nz-progress\n      [nzPercent]=\"file.percent!\"\n      nzType=\"line\"\n      [nzShowInfo]=\"false\"\n      [nzStrokeWidth]=\"2\"\n    ></nz-progress>\n  </div>\n</div>\n",
                animations: [
                    trigger('itemState', [
                        transition(':enter', [style({ height: '0', width: '0', opacity: 0 }), animate(150, style({ height: '*', width: '*', opacity: 1 }))]),
                        transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
                    ])
                ],
                host: {
                    '[class.ant-upload-list]': `true`,
                    '[class.ant-upload-list-text]': `listType === 'text'`,
                    '[class.ant-upload-list-picture]': `listType === 'picture'`,
                    '[class.ant-upload-list-picture-card]': `listType === 'picture-card'`
                },
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NzUploadListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: Platform }
];
NzUploadListComponent.propDecorators = {
    locale: [{ type: Input }],
    listType: [{ type: Input }],
    items: [{ type: Input }],
    icons: [{ type: Input }],
    onPreview: [{ type: Input }],
    onRemove: [{ type: Input }],
    onDownload: [{ type: Input }],
    previewFile: [{ type: Input }],
    previewIsImage: [{ type: Input }],
    iconRender: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzUploadListComponent.prototype.list;
    /** @type {?} */
    NzUploadListComponent.prototype.locale;
    /** @type {?} */
    NzUploadListComponent.prototype.listType;
    /** @type {?} */
    NzUploadListComponent.prototype.icons;
    /** @type {?} */
    NzUploadListComponent.prototype.onPreview;
    /** @type {?} */
    NzUploadListComponent.prototype.onRemove;
    /** @type {?} */
    NzUploadListComponent.prototype.onDownload;
    /** @type {?} */
    NzUploadListComponent.prototype.previewFile;
    /** @type {?} */
    NzUploadListComponent.prototype.previewIsImage;
    /** @type {?} */
    NzUploadListComponent.prototype.iconRender;
    /**
     * @type {?}
     * @private
     */
    NzUploadListComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzUploadListComponent.prototype.doc;
    /**
     * @type {?}
     * @private
     */
    NzUploadListComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    NzUploadListComponent.prototype.platform;
}

/**
 * @fileoverview added by tsickle
 * Generated from: upload.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzUploadComponent {
    // #endregion
    /**
     * @param {?} cdr
     * @param {?} i18n
     */
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        // #region fields
        this.nzType = 'select';
        this.nzLimit = 0;
        this.nzSize = 0;
        this.nzDirectory = false;
        this.nzOpenFileDialogOnClick = true;
        this.nzFilter = [];
        this.nzFileList = [];
        this.nzDisabled = false;
        this.nzListType = 'text';
        this.nzMultiple = false;
        this.nzName = 'file';
        this._showUploadList = true;
        this.nzShowButton = true;
        this.nzWithCredentials = false;
        this.nzIconRender = null;
        this.nzFileListRender = null;
        this.nzChange = new EventEmitter();
        this.nzFileListChange = new EventEmitter();
        this.onStart = (/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            if (!this.nzFileList) {
                this.nzFileList = [];
            }
            /** @type {?} */
            const targetItem = this.fileToObject(file);
            targetItem.status = 'uploading';
            this.nzFileList = this.nzFileList.concat(targetItem);
            this.nzFileListChange.emit(this.nzFileList);
            this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
            this.detectChangesList();
        });
        this.onProgress = (/**
         * @param {?} e
         * @param {?} file
         * @return {?}
         */
        (e, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.percent = e.percent;
            this.nzChange.emit({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: this.nzFileList,
                type: 'progress'
            });
            this.detectChangesList();
        });
        this.onSuccess = (/**
         * @param {?} res
         * @param {?} file
         * @return {?}
         */
        (res, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.status = 'done';
            targetItem.response = res;
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'success'
            });
            this.detectChangesList();
        });
        this.onError = (/**
         * @param {?} err
         * @param {?} file
         * @return {?}
         */
        (err, file) => {
            /** @type {?} */
            const fileList = this.nzFileList;
            /** @type {?} */
            const targetItem = this.getFileItem(file, fileList);
            targetItem.error = err;
            targetItem.status = 'error';
            this.nzChange.emit({
                file: Object.assign({}, targetItem),
                fileList,
                type: 'error'
            });
            this.detectChangesList();
        });
        this.onRemove = (/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            this.uploadComp.abort(file);
            file.status = 'removed';
            /** @type {?} */
            const fnRes = typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
            (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            (res) => res))).subscribe((/**
             * @return {?}
             */
            () => {
                this.nzFileList = this.removeFileItem(file, this.nzFileList);
                this.nzChange.emit({
                    file,
                    fileList: this.nzFileList,
                    type: 'removed'
                });
                this.nzFileListChange.emit(this.nzFileList);
                this.cdr.detectChanges();
            }));
        });
        // #endregion
        // #region styles
        this.prefixCls = 'ant-upload';
        this.classList = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzShowUploadList(value) {
        this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
    }
    /**
     * @return {?}
     */
    get nzShowUploadList() {
        return this._showUploadList;
    }
    /**
     * @private
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    zipOptions() {
        if (typeof (/** @type {?} */ (this)).nzShowUploadList === 'boolean' && (/** @type {?} */ (this)).nzShowUploadList) {
            (/** @type {?} */ (this)).nzShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: true
            };
        }
        // filters
        /** @type {?} */
        const filters = (/** @type {?} */ (this)).nzFilter.slice();
        if ((/** @type {?} */ (this)).nzMultiple && (/** @type {?} */ (this)).nzLimit > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'limit')) === -1) {
            filters.push({
                name: 'limit',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.slice(-(/** @type {?} */ (this)).nzLimit))
            });
        }
        if ((/** @type {?} */ (this)).nzSize > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'size')) === -1) {
            filters.push({
                name: 'size',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => (/** @type {?} */ (w.size)) / 1024 <= (/** @type {?} */ (this)).nzSize)))
            });
        }
        if ((/** @type {?} */ (this)).nzFileType && (/** @type {?} */ (this)).nzFileType.length > 0 && filters.findIndex((/**
         * @param {?} w
         * @return {?}
         */
        w => w.name === 'type')) === -1) {
            /** @type {?} */
            const types = (/** @type {?} */ (this)).nzFileType.split(',');
            filters.push({
                name: 'type',
                fn: (/**
                 * @param {?} fileList
                 * @return {?}
                 */
                (fileList) => fileList.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => ~types.indexOf((/** @type {?} */ (w.type))))))
            });
        }
        (/** @type {?} */ (this))._btnOptions = {
            disabled: (/** @type {?} */ (this)).nzDisabled,
            accept: (/** @type {?} */ (this)).nzAccept,
            action: (/** @type {?} */ (this)).nzAction,
            directory: (/** @type {?} */ (this)).nzDirectory,
            openFileDialogOnClick: (/** @type {?} */ (this)).nzOpenFileDialogOnClick,
            beforeUpload: (/** @type {?} */ (this)).nzBeforeUpload,
            customRequest: (/** @type {?} */ (this)).nzCustomRequest,
            data: (/** @type {?} */ (this)).nzData,
            headers: (/** @type {?} */ (this)).nzHeaders,
            name: (/** @type {?} */ (this)).nzName,
            multiple: (/** @type {?} */ (this)).nzMultiple,
            withCredentials: (/** @type {?} */ (this)).nzWithCredentials,
            filters,
            transformFile: (/** @type {?} */ (this)).nzTransformFile,
            onStart: (/** @type {?} */ (this)).onStart,
            onProgress: (/** @type {?} */ (this)).onProgress,
            onSuccess: (/** @type {?} */ (this)).onSuccess,
            onError: (/** @type {?} */ (this)).onError
        };
        return (/** @type {?} */ (this));
    }
    // #region upload
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    fileToObject(file) {
        return {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.filename || file.name,
            size: file.size,
            type: file.type,
            uid: file.uid,
            response: file.response,
            error: file.error,
            percent: 0,
            originFileObj: (/** @type {?} */ (file))
        };
    }
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    getFileItem(file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.uid === file.uid))[0];
    }
    /**
     * @private
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    removeFileItem(file, fileList) {
        return fileList.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.uid !== file.uid));
    }
    // skip safari bug
    /**
     * @param {?} e
     * @return {?}
     */
    fileDrop(e) {
        if (e.type === this.dragState) {
            return;
        }
        this.dragState = e.type;
        this.setClassMap();
    }
    // #endregion
    // #region list
    /**
     * @private
     * @return {?}
     */
    detectChangesList() {
        var _a;
        this.cdr.detectChanges();
        (_a = this.listComp) === null || _a === void 0 ? void 0 : _a.detectChanges();
    }
    /**
     * @private
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        let subCls = [];
        if (this.nzType === 'drag') {
            if (this.nzFileList.some((/**
             * @param {?} file
             * @return {?}
             */
            file => file.status === 'uploading'))) {
                subCls.push(`${this.prefixCls}-drag-uploading`);
            }
            if (this.dragState === 'dragover') {
                subCls.push(`${this.prefixCls}-drag-hover`);
            }
        }
        else {
            subCls = [`${this.prefixCls}-select-${this.nzListType}`];
        }
        this.classList = [
            this.prefixCls,
            `${this.prefixCls}-${this.nzType}`,
            ...subCls,
            (this.nzDisabled && `${this.prefixCls}-disabled`) || ''
        ].filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item));
        this.cdr.detectChanges();
    }
    // #endregion
    /**
     * @return {?}
     */
    ngOnInit() {
        this.i18n$ = this.i18n.localeChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.locale = this.i18n.getLocaleData('Upload');
            this.detectChangesList();
        }));
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.zipOptions().setClassMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.i18n$.unsubscribe();
    }
}
NzUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-upload',
                exportAs: 'nzUpload',
                template: "<ng-template #list>\n  <nz-upload-list\n    *ngIf=\"locale && !nzFileListRender\"\n    #listComp\n    [style.display]=\"nzShowUploadList ? '' : 'none'\"\n    [locale]=\"locale\"\n    [listType]=\"nzListType\"\n    [items]=\"nzFileList || []\"\n    [icons]=\"$any(nzShowUploadList)\"\n    [iconRender]=\"nzIconRender\"\n    [previewFile]=\"nzPreviewFile\"\n    [previewIsImage]=\"nzPreviewIsImage\"\n    [onPreview]=\"nzPreview\"\n    [onRemove]=\"onRemove\"\n    [onDownload]=\"nzDownload\"\n  ></nz-upload-list>\n  <ng-container *ngIf=\"nzFileListRender\">\n    <ng-container\n      *ngTemplateOutlet=\"nzFileListRender; context: { $implicit: nzFileList }\"\n    ></ng-container>\n  </ng-container>\n</ng-template>\n<ng-template #con><ng-content></ng-content></ng-template>\n<ng-template #btn>\n  <div [ngClass]=\"classList\" [style.display]=\"nzShowButton ? '' : 'none'\">\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\">\n      <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n    </div>\n  </div>\n</ng-template>\n<ng-container *ngIf=\"nzType === 'drag'; else select\">\n  <div\n    [ngClass]=\"classList\"\n    (drop)=\"fileDrop($event)\"\n    (dragover)=\"fileDrop($event)\"\n    (dragleave)=\"fileDrop($event)\"\n  >\n    <div nz-upload-btn #uploadComp [options]=\"_btnOptions!\" class=\"ant-upload-btn\">\n      <div class=\"ant-upload-drag-container\">\n        <ng-template [ngTemplateOutlet]=\"con\"></ng-template>\n      </div>\n    </div>\n  </div>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-container>\n<ng-template #select>\n  <ng-container *ngIf=\"nzListType === 'picture-card'; else pic\">\n    <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n    <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  </ng-container>\n</ng-template>\n<ng-template #pic>\n  <ng-template [ngTemplateOutlet]=\"btn\"></ng-template>\n  <ng-template [ngTemplateOutlet]=\"list\"></ng-template>\n</ng-template>\n",
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
                }
            }] }
];
/** @nocollapse */
NzUploadComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzUploadComponent.propDecorators = {
    uploadComp: [{ type: ViewChild, args: ['uploadComp', { static: false },] }],
    listComp: [{ type: ViewChild, args: ['listComp', { static: false },] }],
    nzType: [{ type: Input }],
    nzLimit: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzFileType: [{ type: Input }],
    nzAccept: [{ type: Input }],
    nzAction: [{ type: Input }],
    nzDirectory: [{ type: Input }],
    nzOpenFileDialogOnClick: [{ type: Input }],
    nzBeforeUpload: [{ type: Input }],
    nzCustomRequest: [{ type: Input }],
    nzData: [{ type: Input }],
    nzFilter: [{ type: Input }],
    nzFileList: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzHeaders: [{ type: Input }],
    nzListType: [{ type: Input }],
    nzMultiple: [{ type: Input }],
    nzName: [{ type: Input }],
    nzShowUploadList: [{ type: Input }],
    nzShowButton: [{ type: Input }],
    nzWithCredentials: [{ type: Input }],
    nzRemove: [{ type: Input }],
    nzPreview: [{ type: Input }],
    nzPreviewFile: [{ type: Input }],
    nzPreviewIsImage: [{ type: Input }],
    nzTransformFile: [{ type: Input }],
    nzDownload: [{ type: Input }],
    nzIconRender: [{ type: Input }],
    nzFileListRender: [{ type: Input }],
    nzChange: [{ type: Output }],
    nzFileListChange: [{ type: Output }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzLimit", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzSize", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDirectory", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzOpenFileDialogOnClick", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzMultiple", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzShowButton", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzUploadComponent.prototype, "nzWithCredentials", void 0);
if (false) {
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzLimit;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzSize;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzDirectory;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzOpenFileDialogOnClick;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzMultiple;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzShowUploadList;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzShowButton;
    /** @type {?} */
    NzUploadComponent.ngAcceptInputType_nzWithCredentials;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.i18n$;
    /** @type {?} */
    NzUploadComponent.prototype.uploadComp;
    /** @type {?} */
    NzUploadComponent.prototype.listComp;
    /** @type {?} */
    NzUploadComponent.prototype.locale;
    /** @type {?} */
    NzUploadComponent.prototype.nzType;
    /** @type {?} */
    NzUploadComponent.prototype.nzLimit;
    /** @type {?} */
    NzUploadComponent.prototype.nzSize;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileType;
    /** @type {?} */
    NzUploadComponent.prototype.nzAccept;
    /** @type {?} */
    NzUploadComponent.prototype.nzAction;
    /** @type {?} */
    NzUploadComponent.prototype.nzDirectory;
    /** @type {?} */
    NzUploadComponent.prototype.nzOpenFileDialogOnClick;
    /** @type {?} */
    NzUploadComponent.prototype.nzBeforeUpload;
    /** @type {?} */
    NzUploadComponent.prototype.nzCustomRequest;
    /** @type {?} */
    NzUploadComponent.prototype.nzData;
    /** @type {?} */
    NzUploadComponent.prototype.nzFilter;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileList;
    /** @type {?} */
    NzUploadComponent.prototype.nzDisabled;
    /** @type {?} */
    NzUploadComponent.prototype.nzHeaders;
    /** @type {?} */
    NzUploadComponent.prototype.nzListType;
    /** @type {?} */
    NzUploadComponent.prototype.nzMultiple;
    /** @type {?} */
    NzUploadComponent.prototype.nzName;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype._showUploadList;
    /** @type {?} */
    NzUploadComponent.prototype.nzShowButton;
    /** @type {?} */
    NzUploadComponent.prototype.nzWithCredentials;
    /** @type {?} */
    NzUploadComponent.prototype.nzRemove;
    /** @type {?} */
    NzUploadComponent.prototype.nzPreview;
    /** @type {?} */
    NzUploadComponent.prototype.nzPreviewFile;
    /** @type {?} */
    NzUploadComponent.prototype.nzPreviewIsImage;
    /** @type {?} */
    NzUploadComponent.prototype.nzTransformFile;
    /** @type {?} */
    NzUploadComponent.prototype.nzDownload;
    /** @type {?} */
    NzUploadComponent.prototype.nzIconRender;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileListRender;
    /** @type {?} */
    NzUploadComponent.prototype.nzChange;
    /** @type {?} */
    NzUploadComponent.prototype.nzFileListChange;
    /** @type {?} */
    NzUploadComponent.prototype._btnOptions;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onStart;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onProgress;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onSuccess;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.onError;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.dragState;
    /** @type {?} */
    NzUploadComponent.prototype.onRemove;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.prefixCls;
    /** @type {?} */
    NzUploadComponent.prototype.classList;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzUploadComponent.prototype.i18n;
}

/**
 * @fileoverview added by tsickle
 * Generated from: upload.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzUploadModule {
}
NzUploadModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, PlatformModule, NzToolTipModule, NzProgressModule, NzI18nModule, NzIconModule],
                declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
                exports: [NzUploadComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-upload.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzShowUploadListInterface, NzUploadBtnComponent, NzUploadComponent, NzUploadListComponent, NzUploadModule };
//# sourceMappingURL=ng-zorro-antd-upload.js.map
