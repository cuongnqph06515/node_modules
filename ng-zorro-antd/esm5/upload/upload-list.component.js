/**
 * @fileoverview added by tsickle
 * Generated from: upload-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, NgZone, ViewEncapsulation } from '@angular/core';
/** @type {?} */
var isImageFileType = (/**
 * @param {?} type
 * @return {?}
 */
function (type) { return !!type && type.indexOf('image/') === 0; });
var ɵ0 = isImageFileType;
/** @type {?} */
var MEASURE_SIZE = 200;
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
var NzUploadListComponent = /** @class */ (function () {
    // #endregion
    function NzUploadListComponent(cdr, doc, ngZone, platform) {
        this.cdr = cdr;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platform = platform;
        this.list = [];
        this.locale = {};
        this.iconRender = null;
    }
    Object.defineProperty(NzUploadListComponent.prototype, "showPic", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.listType === 'picture' || this.listType === 'picture-card';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzUploadListComponent.prototype, "items", {
        set: /**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            this.list = list;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.genErr = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (file.response && typeof file.response === 'string') {
            return file.response;
        }
        return (file.error && file.error.statusText) || this.locale.uploadError;
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    NzUploadListComponent.prototype.extname = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var temp = url.split('/');
        /** @type {?} */
        var filename = temp[temp.length - 1];
        /** @type {?} */
        var filenameWithoutSuffix = filename.split(/#|\?/)[0];
        return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.isImageUrl = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (isImageFileType((/** @type {?} */ (file.type)))) {
            return true;
        }
        /** @type {?} */
        var url = (/** @type {?} */ ((file.thumbUrl || file.url || '')));
        if (!url) {
            return false;
        }
        /** @type {?} */
        var extension = this.extname(url);
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
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.getIconType = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (!this.showPic) {
            return '';
        }
        if (file.isUploading || (!file.thumbUrl && !file.url)) {
            return 'uploading';
        }
        else {
            return 'thumbnail';
        }
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.previewImage = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (!isImageFileType(file.type)) {
                resolve('');
                return;
            }
            _this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var canvas = _this.doc.createElement('canvas');
                canvas.width = MEASURE_SIZE;
                canvas.height = MEASURE_SIZE;
                canvas.style.cssText = "position: fixed; left: 0; top: 0; width: " + MEASURE_SIZE + "px; height: " + MEASURE_SIZE + "px; z-index: 9999; display: none;";
                _this.doc.body.appendChild(canvas);
                /** @type {?} */
                var ctx = canvas.getContext('2d');
                /** @type {?} */
                var img = new Image();
                img.onload = (/**
                 * @return {?}
                 */
                function () {
                    var width = img.width, height = img.height;
                    /** @type {?} */
                    var drawWidth = MEASURE_SIZE;
                    /** @type {?} */
                    var drawHeight = MEASURE_SIZE;
                    /** @type {?} */
                    var offsetX = 0;
                    /** @type {?} */
                    var offsetY = 0;
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
                    var dataURL = canvas.toDataURL();
                    _this.doc.body.removeChild(canvas);
                    resolve(dataURL);
                });
                img.src = window.URL.createObjectURL(file);
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NzUploadListComponent.prototype.genThumb = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.platform.isBrowser) {
            return;
        }
        /** @type {?} */
        var win = (/** @type {?} */ (window));
        if (!this.showPic || typeof document === 'undefined' || typeof win === 'undefined' || !win.FileReader || !win.File) {
            return;
        }
        this.list
            .filter((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.originFileObj instanceof File && file.thumbUrl === undefined; }))
            .forEach((/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.thumbUrl = '';
            (_this.previewFile ? _this.previewFile(file).toPromise() : _this.previewImage((/** @type {?} */ (file.originFileObj)))).then((/**
             * @param {?} dataUrl
             * @return {?}
             */
            function (dataUrl) {
                file.thumbUrl = dataUrl;
                _this.detectChanges();
            }));
        }));
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.listItemNameCls = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _a;
        /** @type {?} */
        var count = [this.showDownload(file), this.icons.showRemoveIcon].filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x; })).length;
        return _a = {},
            _a["ant-upload-list-item-name"] = true,
            _a["ant-upload-list-item-name-icon-count-" + count] = true,
            _a;
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.showDownload = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return !!(this.icons.showDownloadIcon && file.status === 'done');
    };
    /**
     * @private
     * @return {?}
     */
    NzUploadListComponent.prototype.fixData = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.list.forEach((/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.isUploading = file.status === 'uploading';
            file.message = _this.genErr(file);
            file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
            file.isImageUrl = _this.previewIsImage ? _this.previewIsImage(file) : _this.isImageUrl(file);
            file.iconType = _this.getIconType(file);
            file.listItemNameCls = _this.listItemNameCls(file);
            file.showDownload = _this.showDownload(file);
        }));
    };
    /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    NzUploadListComponent.prototype.handlePreview = /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    function (file, e) {
        if (!this.onPreview) {
            return;
        }
        e.preventDefault();
        return this.onPreview(file);
    };
    /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    NzUploadListComponent.prototype.handleRemove = /**
     * @param {?} file
     * @param {?} e
     * @return {?}
     */
    function (file, e) {
        e.preventDefault();
        if (this.onRemove) {
            this.onRemove(file);
        }
        return;
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NzUploadListComponent.prototype.handleDownload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (typeof this.onDownload === 'function') {
            this.onDownload(file);
        }
        else if (file.url) {
            window.open(file.url);
        }
    };
    /**
     * @return {?}
     */
    NzUploadListComponent.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        this.fixData();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    NzUploadListComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.fixData();
        this.genThumb();
    };
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
                        '[class.ant-upload-list]': "true",
                        '[class.ant-upload-list-text]': "listType === 'text'",
                        '[class.ant-upload-list-picture]': "listType === 'picture'",
                        '[class.ant-upload-list-picture-card]': "listType === 'picture-card'"
                    },
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NzUploadListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: Platform }
    ]; };
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
    return NzUploadListComponent;
}());
export { NzUploadListComponent };
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC91cGxvYWQvIiwic291cmNlcyI6WyJ1cGxvYWQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7SUFNakIsZUFBZTs7OztBQUFHLFVBQUMsSUFBWSxJQUFjLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQTs7O0lBRW5GLFlBQVksR0FBRyxHQUFHOzs7O0FBSXhCLDZCQU1DOzs7SUFMQyxvQ0FBcUI7O0lBQ3JCLHFDQUFzQjs7SUFDdEIsa0NBQThCOztJQUM5Qix5Q0FBOEI7O0lBQzlCLHNDQUF1Qjs7QUFHekI7SUF1TUUsYUFBYTtJQUViLCtCQUNVLEdBQXNCLEVBQ0osR0FBYyxFQUNoQyxNQUFjLEVBQ2QsUUFBa0I7UUFIbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDSixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBeEw1QixTQUFJLEdBQXFCLEVBQUUsQ0FBQztRQU1uQixXQUFNLEdBQWMsRUFBRSxDQUFDO1FBWXZCLGVBQVUsR0FBa0MsSUFBSSxD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QUFFLHdCQUF3Qjt3QkFDM0Qsc0NBQXNDLEVBQUUsNkJBQTZCO3FCQUN0RTtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQS9DQyxpQkFBaUI7Z0RBdU9kLE1BQU0sU0FBQyxRQUFRO2dCQW5PbEIsTUFBTTtnQkFSQyxRQUFROzs7eUJBMkRkLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUlMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7O0lBa0xSLDRCQUFDO0NBQUEsQUF6TkQsSUF5TkM7U0FyTVkscUJBQXFCOzs7SUFDaEMscUNBQTRCOztJQU01Qix1Q0FBZ0M7O0lBQ2hDLHlDQUFxQzs7SUFLckMsc0NBQWtDOztJQUNsQywwQ0FBa0Q7O0lBQ2xELHlDQUFpRDs7SUFDakQsMkNBQW1EOztJQUNuRCw0Q0FBa0U7O0lBQ2xFLCtDQUEwRDs7SUFDMUQsMkNBQTBEOzs7OztJQW1LeEQsb0NBQThCOzs7OztJQUM5QixvQ0FBd0M7Ozs7O0lBQ3hDLHVDQUFzQjs7Ozs7SUFDdEIseUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDbGFzc1R5cGUsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56U2hvd1VwbG9hZExpc3QsIE56VXBsb2FkRmlsZSwgTnpVcGxvYWRMaXN0VHlwZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuY29uc3QgaXNJbWFnZUZpbGVUeXBlID0gKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4gPT4gISF0eXBlICYmIHR5cGUuaW5kZXhPZignaW1hZ2UvJykgPT09IDA7XG5cbmNvbnN0IE1FQVNVUkVfU0laRSA9IDIwMDtcblxudHlwZSBVcGxvYWRMaXN0SWNvblR5cGUgPSAnJyB8ICd1cGxvYWRpbmcnIHwgJ3RodW1ibmFpbCc7XG5cbmludGVyZmFjZSBVcGxvYWRMaXN0RmlsZSBleHRlbmRzIE56VXBsb2FkRmlsZSB7XG4gIGlzSW1hZ2VVcmw/OiBib29sZWFuO1xuICBpc1VwbG9hZGluZz86IGJvb2xlYW47XG4gIGljb25UeXBlPzogVXBsb2FkTGlzdEljb25UeXBlO1xuICBsaXN0SXRlbU5hbWVDbHM/OiBOZ0NsYXNzVHlwZTtcbiAgc2hvd0Rvd25sb2FkPzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdXBsb2FkLWxpc3QnLFxuICBleHBvcnRBczogJ256VXBsb2FkTGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdpdGVtU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbc3R5bGUoeyBoZWlnaHQ6ICcwJywgd2lkdGg6ICcwJywgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgxNTAsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIHdpZHRoOiAnKicsIG9wYWNpdHk6IDEgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbYW5pbWF0ZSgxNTAsIHN0eWxlKHsgaGVpZ2h0OiAnMCcsIHdpZHRoOiAnMCcsIG9wYWNpdHk6IDAgfSkpXSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdXBsb2FkLWxpc3RdJzogYHRydWVgLFxuICAgICdbY2xhc3MuYW50LXVwbG9hZC1saXN0LXRleHRdJzogYGxpc3RUeXBlID09PSAndGV4dCdgLFxuICAgICdbY2xhc3MuYW50LXVwbG9hZC1saXN0LXBpY3R1cmVdJzogYGxpc3RUeXBlID09PSAncGljdHVyZSdgLFxuICAgICdbY2xhc3MuYW50LXVwbG9hZC1saXN0LXBpY3R1cmUtY2FyZF0nOiBgbGlzdFR5cGUgPT09ICdwaWN0dXJlLWNhcmQnYFxuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpVcGxvYWRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgbGlzdDogVXBsb2FkTGlzdEZpbGVbXSA9IFtdO1xuXG4gIHByaXZhdGUgZ2V0IHNob3dQaWMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGlzdFR5cGUgPT09ICdwaWN0dXJlJyB8fCB0aGlzLmxpc3RUeXBlID09PSAncGljdHVyZS1jYXJkJztcbiAgfVxuXG4gIEBJbnB1dCgpIGxvY2FsZTogTnpTYWZlQW55ID0ge307XG4gIEBJbnB1dCgpIGxpc3RUeXBlITogTnpVcGxvYWRMaXN0VHlwZTtcbiAgQElucHV0KClcbiAgc2V0IGl0ZW1zKGxpc3Q6IE56VXBsb2FkRmlsZVtdKSB7XG4gICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgfVxuICBASW5wdXQoKSBpY29ucyE6IE56U2hvd1VwbG9hZExpc3Q7XG4gIEBJbnB1dCgpIG9uUHJldmlldz86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG9uUmVtb3ZlITogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcbiAgQElucHV0KCkgb25Eb3dubG9hZD86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHByZXZpZXdGaWxlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBASW5wdXQoKSBwcmV2aWV3SXNJbWFnZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGljb25SZW5kZXI6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGdlbkVycihmaWxlOiBOelVwbG9hZEZpbGUpOiBzdHJpbmcge1xuICAgIGlmIChmaWxlLnJlc3BvbnNlICYmIHR5cGVvZiBmaWxlLnJlc3BvbnNlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZpbGUucmVzcG9uc2U7XG4gICAgfVxuICAgIHJldHVybiAoZmlsZS5lcnJvciAmJiBmaWxlLmVycm9yLnN0YXR1c1RleHQpIHx8IHRoaXMubG9jYWxlLnVwbG9hZEVycm9yO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRuYW1lKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSB0ZW1wW3RlbXAubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgZmlsZW5hbWVXaXRob3V0U3VmZml4ID0gZmlsZW5hbWUuc3BsaXQoLyN8XFw/LylbMF07XG4gICAgcmV0dXJuICgvXFwuW14uL1xcXFxdKiQvLmV4ZWMoZmlsZW5hbWVXaXRob3V0U3VmZml4KSB8fCBbJyddKVswXTtcbiAgfVxuXG4gIGlzSW1hZ2VVcmwoZmlsZTogTnpVcGxvYWRGaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzSW1hZ2VGaWxlVHlwZShmaWxlLnR5cGUhKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gKGZpbGUudGh1bWJVcmwgfHwgZmlsZS51cmwgfHwgJycpIGFzIHN0cmluZztcbiAgICBpZiAoIXVybCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmV4dG5hbWUodXJsKTtcbiAgICBpZiAoL15kYXRhOmltYWdlXFwvLy50ZXN0KHVybCkgfHwgLyh3ZWJwfHN2Z3xwbmd8Z2lmfGpwZ3xqcGVnfGpmaWZ8Ym1wfGRwZykkL2kudGVzdChleHRlbnNpb24pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKC9eZGF0YTovLnRlc3QodXJsKSkge1xuICAgICAgLy8gb3RoZXIgZmlsZSB0eXBlcyBvZiBiYXNlNjRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGV4dGVuc2lvbikge1xuICAgICAgLy8gb3RoZXIgZmlsZSB0eXBlcyB3aGljaCBoYXZlIGV4dGVuc2lvblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SWNvblR5cGUoZmlsZTogVXBsb2FkTGlzdEZpbGUpOiBVcGxvYWRMaXN0SWNvblR5cGUge1xuICAgIGlmICghdGhpcy5zaG93UGljKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChmaWxlLmlzVXBsb2FkaW5nIHx8ICghZmlsZS50aHVtYlVybCAmJiAhZmlsZS51cmwpKSB7XG4gICAgICByZXR1cm4gJ3VwbG9hZGluZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndGh1bWJuYWlsJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXZpZXdJbWFnZShmaWxlOiBGaWxlIHwgQmxvYik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKCFpc0ltYWdlRmlsZVR5cGUoZmlsZS50eXBlKSkge1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gTUVBU1VSRV9TSVpFO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gTUVBU1VSRV9TSVpFO1xuICAgICAgICBjYW52YXMuc3R5bGUuY3NzVGV4dCA9IGBwb3NpdGlvbjogZml4ZWQ7IGxlZnQ6IDA7IHRvcDogMDsgd2lkdGg6ICR7TUVBU1VSRV9TSVpFfXB4OyBoZWlnaHQ6ICR7TUVBU1VSRV9TSVpFfXB4OyB6LWluZGV4OiA5OTk5OyBkaXNwbGF5OiBub25lO2A7XG4gICAgICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gaW1nO1xuXG4gICAgICAgICAgbGV0IGRyYXdXaWR0aCA9IE1FQVNVUkVfU0laRTtcbiAgICAgICAgICBsZXQgZHJhd0hlaWdodCA9IE1FQVNVUkVfU0laRTtcbiAgICAgICAgICBsZXQgb2Zmc2V0WCA9IDA7XG4gICAgICAgICAgbGV0IG9mZnNldFkgPSAwO1xuXG4gICAgICAgICAgaWYgKHdpZHRoIDwgaGVpZ2h0KSB7XG4gICAgICAgICAgICBkcmF3SGVpZ2h0ID0gaGVpZ2h0ICogKE1FQVNVUkVfU0laRSAvIHdpZHRoKTtcbiAgICAgICAgICAgIG9mZnNldFkgPSAtKGRyYXdIZWlnaHQgLSBkcmF3V2lkdGgpIC8gMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhd1dpZHRoID0gd2lkdGggKiAoTUVBU1VSRV9TSVpFIC8gaGVpZ2h0KTtcbiAgICAgICAgICAgIG9mZnNldFggPSAtKGRyYXdXaWR0aCAtIGRyYXdIZWlnaHQpIC8gMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY3R4IS5kcmF3SW1hZ2UoaW1nLCBvZmZzZXRYLCBvZmZzZXRZLCBkcmF3V2lkdGgsIGRyYXdIZWlnaHQpO1xuICAgICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgICBjb25zdCBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgIHRoaXMuZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY2FudmFzKTtcblxuICAgICAgICAgIHJlc29sdmUoZGF0YVVSTCk7XG4gICAgICAgIH07XG4gICAgICAgIGltZy5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5UaHVtYigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2luID0gd2luZG93IGFzIE56U2FmZUFueTtcbiAgICBpZiAoIXRoaXMuc2hvd1BpYyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW4gPT09ICd1bmRlZmluZWQnIHx8ICF3aW4uRmlsZVJlYWRlciB8fCAhd2luLkZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5saXN0XG4gICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5vcmlnaW5GaWxlT2JqIGluc3RhbmNlb2YgRmlsZSAmJiBmaWxlLnRodW1iVXJsID09PSB1bmRlZmluZWQpXG4gICAgICAuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgZmlsZS50aHVtYlVybCA9ICcnO1xuICAgICAgICAodGhpcy5wcmV2aWV3RmlsZSA/IHRoaXMucHJldmlld0ZpbGUoZmlsZSkudG9Qcm9taXNlKCkgOiB0aGlzLnByZXZpZXdJbWFnZShmaWxlLm9yaWdpbkZpbGVPYmohKSkudGhlbihkYXRhVXJsID0+IHtcbiAgICAgICAgICBmaWxlLnRodW1iVXJsID0gZGF0YVVybDtcbiAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdEl0ZW1OYW1lQ2xzKGZpbGU6IE56VXBsb2FkRmlsZSk6IE5nQ2xhc3NUeXBlIHtcbiAgICBjb25zdCBjb3VudCA9IFt0aGlzLnNob3dEb3dubG9hZChmaWxlKSwgdGhpcy5pY29ucy5zaG93UmVtb3ZlSWNvbl0uZmlsdGVyKHggPT4geCkubGVuZ3RoO1xuICAgIHJldHVybiB7XG4gICAgICBbYGFudC11cGxvYWQtbGlzdC1pdGVtLW5hbWVgXTogdHJ1ZSxcbiAgICAgIFtgYW50LXVwbG9hZC1saXN0LWl0ZW0tbmFtZS1pY29uLWNvdW50LSR7Y291bnR9YF06IHRydWVcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93RG93bmxvYWQoZmlsZTogTnpVcGxvYWRGaWxlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuaWNvbnMuc2hvd0Rvd25sb2FkSWNvbiAmJiBmaWxlLnN0YXR1cyA9PT0gJ2RvbmUnKTtcbiAgfVxuXG4gIHByaXZhdGUgZml4RGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3QuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGZpbGUuaXNVcGxvYWRpbmcgPSBmaWxlLnN0YXR1cyA9PT0gJ3VwbG9hZGluZyc7XG4gICAgICBmaWxlLm1lc3NhZ2UgPSB0aGlzLmdlbkVycihmaWxlKTtcbiAgICAgIGZpbGUubGlua1Byb3BzID0gdHlwZW9mIGZpbGUubGlua1Byb3BzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZmlsZS5saW5rUHJvcHMpIDogZmlsZS5saW5rUHJvcHM7XG4gICAgICBmaWxlLmlzSW1hZ2VVcmwgPSB0aGlzLnByZXZpZXdJc0ltYWdlID8gdGhpcy5wcmV2aWV3SXNJbWFnZShmaWxlKSA6IHRoaXMuaXNJbWFnZVVybChmaWxlKTtcbiAgICAgIGZpbGUuaWNvblR5cGUgPSB0aGlzLmdldEljb25UeXBlKGZpbGUpO1xuICAgICAgZmlsZS5saXN0SXRlbU5hbWVDbHMgPSB0aGlzLmxpc3RJdGVtTmFtZUNscyhmaWxlKTtcbiAgICAgIGZpbGUuc2hvd0Rvd25sb2FkID0gdGhpcy5zaG93RG93bmxvYWQoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQcmV2aWV3KGZpbGU6IE56VXBsb2FkRmlsZSwgZTogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub25QcmV2aWV3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiB0aGlzLm9uUHJldmlldyhmaWxlKTtcbiAgfVxuXG4gIGhhbmRsZVJlbW92ZShmaWxlOiBOelVwbG9hZEZpbGUsIGU6IEV2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLm9uUmVtb3ZlKSB7XG4gICAgICB0aGlzLm9uUmVtb3ZlKGZpbGUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBoYW5kbGVEb3dubG9hZChmaWxlOiBOelVwbG9hZEZpbGUpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25Eb3dubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vbkRvd25sb2FkKGZpbGUpO1xuICAgIH0gZWxzZSBpZiAoZmlsZS51cmwpIHtcbiAgICAgIHdpbmRvdy5vcGVuKGZpbGUudXJsKTtcbiAgICB9XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHt9XG5cbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmZpeERhdGEoKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmZpeERhdGEoKTtcbiAgICB0aGlzLmdlblRodW1iKCk7XG4gIH1cbn1cbiJdfQ==