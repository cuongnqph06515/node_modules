import { Component, EventEmitter, Input, Output, SkipSelf, } from '@angular/core';
import { HttpClient, HttpEventType, } from '@angular/common/http';
export class AngularFileUploaderComponent {
    constructor(http) {
        this.http = http;
        this.resetUpload = false;
        // Outputs
        this.ApiResponse = new EventEmitter();
        this.everythingDone = new EventEmitter();
        this.allowedFiles = [];
        this.notAllowedFiles = [];
        this.Caption = [];
        this.isAllowedFileSingle = true;
        this.progressBarShow = false;
        this.enableUploadBtn = false;
        this.uploadMsg = false;
        this.afterUpload = false;
        this.uploadStarted = false;
        this.currentUploads = [];
        this.fileNameIndex = true;
        this.idDate = +new Date();
    }
    ngOnChanges(changes) {
        // Track changes in Configuration and see if user has even provided Configuration.
        if (changes.config && this.config) {
            // Assign User Configurations to Library Properties.
            this.theme = this.config.theme || '';
            this.id =
                this.config.id ||
                    parseInt((this.idDate / 10000).toString().split('.')[1], 10) +
                        Math.floor(Math.random() * 20) * 10000;
            this.hideProgressBar = this.config.hideProgressBar || false;
            this.hideResetBtn = this.config.hideResetBtn || false;
            this.hideSelectBtn = this.config.hideSelectBtn || false;
            this.maxSize = (this.config.maxSize || 20) * 1024000; // mb to bytes.
            this.uploadAPI = this.config.uploadAPI.url;
            this.method = this.config.uploadAPI.method || 'POST';
            this.formatsAllowed =
                this.config.formatsAllowed || '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
            this.multiple = this.config.multiple || false;
            this.headers = this.config.uploadAPI.headers || {};
            this.params = this.config.uploadAPI.params || {};
            this.responseType = this.config.uploadAPI.responseType || null;
            this.fileNameIndex = this.config.fileNameIndex === false ? false : true;
            this.replaceTexts = {
                selectFileBtn: this.multiple ? 'Select Files' : 'Select File',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !',
                sizeLimit: 'Size Limit',
            }; // default replaceText.
            if (this.config.replaceTexts) {
                // updated replaceText if user has provided any.
                this.replaceTexts = Object.assign(Object.assign({}, this.replaceTexts), this.config.replaceTexts);
            }
        }
        // Reset when resetUpload value changes from false to true.
        if (changes.resetUpload) {
            if (changes.resetUpload.currentValue === true) {
                this.resetFileUpload();
            }
        }
    }
    // Reset following properties.
    resetFileUpload() {
        this.allowedFiles = [];
        this.Caption = [];
        this.notAllowedFiles = [];
        this.uploadMsg = false;
        this.enableUploadBtn = false;
    }
    // When user selects files.
    onChange(event) {
        this.notAllowedFiles = [];
        const fileExtRegExp = /(?:\.([^.]+))?$/;
        let fileList;
        if (this.afterUpload || !this.multiple) {
            this.allowedFiles = [];
            this.Caption = [];
            this.afterUpload = false;
        }
        if (event.type === 'drop') {
            fileList = event.dataTransfer.files;
        }
        else {
            fileList = event.target.files || event.srcElement.files;
        }
        // 'forEach' does not exist on 'filelist' that's why this good old 'for' is used.
        for (let i = 0; i < fileList.length; i++) {
            const currentFileExt = fileExtRegExp
                .exec(fileList[i].name)[1]
                .toLowerCase(); // Get file extension.
            const isFormatValid = this.formatsAllowed.includes(currentFileExt);
            const isSizeValid = fileList[i].size <= this.maxSize;
            // Check whether current file format and size is correct as specified in the configurations.
            if (isFormatValid && isSizeValid) {
                this.allowedFiles.push(fileList[i]);
            }
            else {
                this.notAllowedFiles.push({
                    fileName: fileList[i].name,
                    fileSize: this.convertSize(fileList[i].size),
                    errorMsg: !isFormatValid ? 'Invalid format' : 'Invalid size',
                });
            }
        }
        // If there's any allowedFiles.
        if (this.allowedFiles.length > 0) {
            this.enableUploadBtn = true;
            // Upload the files directly if theme is attach pin (as upload btn is not there for this theme).
            if (this.theme === 'attachPin') {
                this.uploadFiles();
            }
        }
        else {
            this.enableUploadBtn = false;
        }
        this.uploadMsg = false;
        this.uploadStarted = false;
        this.uploadPercent = 0;
        event.target.value = null;
    }
    uploadFiles() {
        this.progressBarShow = true;
        this.uploadStarted = true;
        this.notAllowedFiles = [];
        let isError = false;
        this.isAllowedFileSingle = this.allowedFiles.length <= 1;
        const formData = new FormData();
        // Add data to be sent in this request
        this.allowedFiles.forEach((file, i) => {
            formData.append(this.Caption[i] || 'file' + (this.fileNameIndex ? i : ''), this.allowedFiles[i]);
        });
        /*
        Not Working, Headers null
        // Contruct Headers
        const headers = new HttpHeaders();
        for (const key of Object.keys(this.headers)) {
          headers.append(key, this.headers[key]);
        }
    
        // Contruct Params
        const params = new HttpParams();
        for (const key of Object.keys(this.params)) {
          params.append(key, this.params[key]);
        } */
        const options = {
            headers: this.headers,
            params: this.params,
        };
        if (this.responseType)
            options.responseType = this.responseType;
        this.http
            .request(this.method.toUpperCase(), this.uploadAPI, Object.assign({ body: formData, reportProgress: true, observe: 'events' }, options))
            .subscribe((event) => {
            // Upload Progress
            if (event.type === HttpEventType.UploadProgress) {
                this.enableUploadBtn = false; // button should be disabled if process uploading
                const currentDone = event.loaded / event.total;
                this.uploadPercent = Math.round((event.loaded / event.total) * 100);
            }
            else if (event.type === HttpEventType.Response) {
                if (event.status === 200 || event.status === 201) {
                    // Success
                    this.progressBarShow = false;
                    this.enableUploadBtn = false;
                    this.uploadMsg = true;
                    this.afterUpload = true;
                    if (!isError) {
                        this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
                        this.uploadMsgClass = 'text-success lead';
                    }
                }
                else {
                    // Failure
                    isError = true;
                    this.handleErrors();
                }
                this.ApiResponse.emit(event);
            }
            else {
                //console.log('Event Other: ', event);
            }
        }, (error) => {
            // Failure
            isError = true;
            this.handleErrors();
            this.ApiResponse.emit(error);
        });
    }
    handleErrors() {
        this.progressBarShow = false;
        this.enableUploadBtn = false;
        this.uploadMsg = true;
        this.afterUpload = true;
        this.uploadMsgText = this.replaceTexts.afterUploadMsg_error;
        this.uploadMsgClass = 'text-danger lead';
    }
    removeFile(i, sf_na) {
        if (sf_na === 'sf') {
            this.allowedFiles.splice(i, 1);
            this.Caption.splice(i, 1);
        }
        else {
            this.notAllowedFiles.splice(i, 1);
        }
        if (this.allowedFiles.length === 0) {
            this.enableUploadBtn = false;
        }
    }
    convertSize(fileSize) {
        return fileSize < 1024000
            ? (fileSize / 1024).toFixed(2) + ' KB'
            : (fileSize / 1024000).toFixed(2) + ' MB';
    }
    attachpinOnclick() {
        const element = document.getElementById('sel' + this.id);
        if (element !== null) {
            element.click();
        }
    }
    drop(event) {
        event.stopPropagation();
        event.preventDefault();
        this.onChange(event);
    }
    allowDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }
}
AngularFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-file-uploader',
                template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\r\n\r\n  <!-- Drag n Drop theme Starts -->\r\n  <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\"\r\n    [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\r\n    <div style=\"position:relative;\">\r\n      <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\r\n        <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\r\n      </div>\r\n      <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{allowedFiles[0]?.name}}</span> -->\r\n    </div>\r\n  </div>\r\n  <!-- Drag n Drop theme Ends -->\r\n  <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\"\r\n    *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\r\n  <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\"\r\n    title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\r\n  <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\"\r\n    *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\r\n  <br *ngIf=\"!hideSelectBtn\">\r\n  <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) {{replaceTexts?.sizeLimit}}: {{(convertSize(maxSize))}}\r\n  </p>\r\n  <!--Allowed file list-->\r\n  <div class=\"row afu-valid-file\" *ngFor=\"let sf of allowedFiles;let i=index\">\r\n    <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\r\n    <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\r\n    <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"!uploadStarted\"/> -->\r\n    <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"isAllowedFileSingle && progressBarShow && !hideProgressBar\">\r\n      <span class=\"progress-bar progress-bar-success\" role=\"progressbar\"\r\n        [ngStyle]=\"{'width':uploadPercent+'%'}\">{{uploadPercent}}%</span>\r\n    </div>\r\n    <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"!uploadStarted\"><i class=\"fa fa-times\"></i></a>\r\n  </div>\r\n  <!--Not Allowed file list-->\r\n  <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedFiles;let j=index\">\r\n    <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\r\n    <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\r\n    <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\r\n    <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"!uploadStarted\">&nbsp;<i\r\n        class=\"fa fa-times\"></i></a>\r\n  </div>\r\n\r\n  <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\r\n      <div *ngIf=\"!isAllowedFileSingle && progressBarShow && !hideProgressBar\">\r\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\r\n          <span class=\"progress-bar progress-bar-success\" role=\"progressbar\"\r\n            [ngStyle]=\"{'width':uploadPercent+'%'}\">{{uploadPercent}}%</span>\r\n        </div>\r\n        <br>\r\n        <br>\r\n      </div>\r\n      <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\"\r\n        [disabled]=!enableUploadBtn>{{replaceTexts?.uploadBtn}}</button>\r\n      <br>\r\n</div>\r\n\r\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\r\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\r\n  <div style=\"position:relative;padding-left:6px\">\r\n    <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\r\n      {{replaceTexts?.attachPinBtn}}\r\n      <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\r\n      <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize))}}</p> -->\r\n      <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\"\r\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\r\n      <br>\r\n    </a>\r\n    &nbsp;\r\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{allowedFiles[0]?.name}}</span>\r\n  </div>\r\n</div>\r\n\r\n",
                styles: [".constraints-info{font-style:italic;margin-top:10px}.padMarg{margin-bottom:0;padding:0}.caption{margin-right:5px}.textOverflow{overflow:hidden;padding-right:0;text-overflow:ellipsis;white-space:nowrap}.up_btn{background-color:transparent;border:2px solid #5c5b5b;border-radius:22px;color:#000}.delFileIcon{color:#ce0909;text-decoration:none}.dragNDrop .div1{border:2px dashed #5c5b5b;display:border-box;height:6rem;width:20rem}.dragNDrop .div1>p{color:#5c5b5b;font-weight:700;margin-top:1.4em;text-align:center}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"]
            },] }
];
AngularFileUploaderComponent.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: SkipSelf }] }
];
AngularFileUploaderComponent.propDecorators = {
    config: [{ type: Input }],
    resetUpload: [{ type: Input }],
    ApiResponse: [{ type: Output }],
    everythingDone: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlsZS11cGxvYWRlci9zcmMvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFPdkIsT0FBTyxFQUNMLFVBQVUsRUFHVixhQUFhLEdBQ2QsTUFBTSxzQkFBc0IsQ0FBQztBQVE5QixNQUFNLE9BQU8sNEJBQTRCO0lBbUR2QyxZQUFnQyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBN0NoRCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixVQUFVO1FBRVYsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pDLG1CQUFjLEdBQStCLElBQUksWUFBWSxFQUFnQixDQUFDO1FBZ0I5RSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixvQkFBZSxHQUlULEVBQUUsQ0FBQztRQUNULFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFLdEIsbUJBQWMsR0FBVSxFQUFFLENBQUM7UUFDM0Isa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFYixXQUFNLEdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRWMsQ0FBQztJQUVwRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsa0ZBQWtGO1FBQ2xGLElB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QyxlQUFlLEdBQUcsS0FBSyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUFnQjtRQUMxQixPQUFPLFFBQVEsR0FBRyxPQUFPO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSztZQUN0QyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQVU7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3pDLENBQUM7OztZQTdTRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsdTZJQUFxRDs7YUFFdEQ7OztZQVhDLFVBQVUsdUJBK0RHLFFBQVE7OztxQkFqRHBCLEtBQUs7MEJBR0wsS0FBSzswQkFJTCxNQUFNOzZCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFJlcGxhY2VUZXh0cyxcbiAgQW5ndWxhckZpbGVVcGxvYWRlckNvbmZpZyxcbiAgVXBsb2FkSW5mbyxcbiAgVXBsb2FkQXBpLFxufSBmcm9tICcuL2FuZ3VsYXItZmlsZS11cGxvYWRlci50eXBlcyc7XG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxuICBIdHRwSGVhZGVycyxcbiAgSHR0cFBhcmFtcyxcbiAgSHR0cEV2ZW50VHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLWZpbGUtdXBsb2FkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8vIElucHV0c1xuICBASW5wdXQoKVxuICBjb25maWc6IEFuZ3VsYXJGaWxlVXBsb2FkZXJDb25maWc7XG5cbiAgQElucHV0KClcbiAgcmVzZXRVcGxvYWQgPSBmYWxzZTtcblxuICAvLyBPdXRwdXRzXG4gIEBPdXRwdXQoKVxuICBBcGlSZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgZXZlcnl0aGluZ0RvbmU6IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+KCk7XG5cbiAgLy8gUHJvcGVydGllc1xuICB0aGVtZTogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBoaWRlUHJvZ3Jlc3NCYXI6IGJvb2xlYW47XG4gIG1heFNpemU6IG51bWJlcjtcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBmb3JtYXRzQWxsb3dlZDogc3RyaW5nO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbiAgaGVhZGVyczogSHR0cEhlYWRlcnMgfCB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG4gIHBhcmFtczogSHR0cFBhcmFtcyB8IHsgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgaGlkZVJlc2V0QnRuOiBib29sZWFuO1xuICBoaWRlU2VsZWN0QnRuOiBib29sZWFuO1xuICBhbGxvd2VkRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBub3RBbGxvd2VkRmlsZXM6IHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIGZpbGVTaXplOiBzdHJpbmc7XG4gICAgZXJyb3JNc2c6IHN0cmluZztcbiAgfVtdID0gW107XG4gIENhcHRpb246IHN0cmluZ1tdID0gW107XG4gIGlzQWxsb3dlZEZpbGVTaW5nbGUgPSB0cnVlO1xuICBwcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgZW5hYmxlVXBsb2FkQnRuID0gZmFsc2U7XG4gIHVwbG9hZE1zZyA9IGZhbHNlO1xuICBhZnRlclVwbG9hZCA9IGZhbHNlO1xuICB1cGxvYWRTdGFydGVkID0gZmFsc2U7XG4gIHVwbG9hZE1zZ1RleHQ6IHN0cmluZztcbiAgdXBsb2FkTXNnQ2xhc3M6IHN0cmluZztcbiAgdXBsb2FkUGVyY2VudDogbnVtYmVyO1xuICByZXBsYWNlVGV4dHM6IFJlcGxhY2VUZXh0cztcbiAgY3VycmVudFVwbG9hZHM6IGFueVtdID0gW107XG4gIGZpbGVOYW1lSW5kZXggPSB0cnVlO1xuXG4gIHByaXZhdGUgaWREYXRlOiBudW1iZXIgPSArbmV3IERhdGUoKTtcblxuICBjb25zdHJ1Y3RvcihAU2tpcFNlbGYoKSBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIFRyYWNrIGNoYW5nZXMgaW4gQ29uZmlndXJhdGlvbiBhbmQgc2VlIGlmIHVzZXIgaGFzIGV2ZW4gcHJvdmlkZWQgQ29uZmlndXJhdGlvbi5cbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgdGhpcy5jb25maWcpIHtcbiAgICAgIC8vIEFzc2lnbiBVc2VyIENvbmZpZ3VyYXRpb25zIHRvIExpYnJhcnkgUHJvcGVydGllcy5cbiAgICAgIHRoaXMudGhlbWUgPSB0aGlzLmNvbmZpZy50aGVtZSB8fCAnJztcbiAgICAgIHRoaXMuaWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5pZCB8fFxuICAgICAgICBwYXJzZUludCgodGhpcy5pZERhdGUgLyAxMDAwMCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdLCAxMCkgK1xuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMDAwO1xuICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbmZpZy5oaWRlUHJvZ3Jlc3NCYXIgfHwgZmFsc2U7XG4gICAgICB0aGlzLmhpZGVSZXNldEJ0biA9IHRoaXMuY29uZmlnLmhpZGVSZXNldEJ0biB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZVNlbGVjdEJ0biA9IHRoaXMuY29uZmlnLmhpZGVTZWxlY3RCdG4gfHwgZmFsc2U7XG4gICAgICB0aGlzLm1heFNpemUgPSAodGhpcy5jb25maWcubWF4U2l6ZSB8fCAyMCkgKiAxMDI0MDAwOyAvLyBtYiB0byBieXRlcy5cbiAgICAgIHRoaXMudXBsb2FkQVBJID0gdGhpcy5jb25maWcudXBsb2FkQVBJLnVybDtcbiAgICAgIHRoaXMubWV0aG9kID0gdGhpcy5jb25maWcudXBsb2FkQVBJLm1ldGhvZCB8fCAnUE9TVCc7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkID1cbiAgICAgICAgdGhpcy5jb25maWcuZm9ybWF0c0FsbG93ZWQgfHwgJy5qcGcsLnBuZywucGRmLC5kb2N4LC50eHQsLmdpZiwuanBlZyc7XG4gICAgICB0aGlzLm11bHRpcGxlID0gdGhpcy5jb25maWcubXVsdGlwbGUgfHwgZmFsc2U7XG4gICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmNvbmZpZy51cGxvYWRBUEkuaGVhZGVycyB8fCB7fTtcbiAgICAgIHRoaXMucGFyYW1zID0gdGhpcy5jb25maWcudXBsb2FkQVBJLnBhcmFtcyB8fCB7fTtcbiAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gdGhpcy5jb25maWcudXBsb2FkQVBJLnJlc3BvbnNlVHlwZSB8fCBudWxsO1xuICAgICAgdGhpcy5maWxlTmFtZUluZGV4ID0gdGhpcy5jb25maWcuZmlsZU5hbWVJbmRleCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHtcbiAgICAgICAgc2VsZWN0RmlsZUJ0bjogdGhpcy5tdWx0aXBsZSA/ICdTZWxlY3QgRmlsZXMnIDogJ1NlbGVjdCBGaWxlJyxcbiAgICAgICAgcmVzZXRCdG46ICdSZXNldCcsXG4gICAgICAgIHVwbG9hZEJ0bjogJ1VwbG9hZCcsXG4gICAgICAgIGRyYWdORHJvcEJveDogJ0RyYWcgTiBEcm9wJyxcbiAgICAgICAgYXR0YWNoUGluQnRuOiB0aGlzLm11bHRpcGxlID8gJ0F0dGFjaCBGaWxlcy4uLicgOiAnQXR0YWNoIEZpbGUuLi4nLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiAnU3VjY2Vzc2Z1bGx5IFVwbG9hZGVkICEnLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19lcnJvcjogJ1VwbG9hZCBGYWlsZWQgIScsXG4gICAgICAgIHNpemVMaW1pdDogJ1NpemUgTGltaXQnLFxuICAgICAgfTsgLy8gZGVmYXVsdCByZXBsYWNlVGV4dC5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yZXBsYWNlVGV4dHMpIHtcbiAgICAgICAgLy8gdXBkYXRlZCByZXBsYWNlVGV4dCBpZiB1c2VyIGhhcyBwcm92aWRlZCBhbnkuXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0ge1xuICAgICAgICAgIC4uLnRoaXMucmVwbGFjZVRleHRzLFxuICAgICAgICAgIC4uLnRoaXMuY29uZmlnLnJlcGxhY2VUZXh0cyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXNldCB3aGVuIHJlc2V0VXBsb2FkIHZhbHVlIGNoYW5nZXMgZnJvbSBmYWxzZSB0byB0cnVlLlxuICAgIGlmIChjaGFuZ2VzLnJlc2V0VXBsb2FkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5yZXNldFVwbG9hZC5jdXJyZW50VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5yZXNldEZpbGVVcGxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8vIFJlc2V0IGZvbGxvd2luZyBwcm9wZXJ0aWVzLlxuICByZXNldEZpbGVVcGxvYWQoKSB7XG4gICAgdGhpcy5hbGxvd2VkRmlsZXMgPSBbXTtcbiAgICB0aGlzLkNhcHRpb24gPSBbXTtcbiAgICB0aGlzLm5vdEFsbG93ZWRGaWxlcyA9IFtdO1xuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XG4gICAgdGhpcy5lbmFibGVVcGxvYWRCdG4gPSBmYWxzZTtcbiAgfVxuXG4gIC8vIFdoZW4gdXNlciBzZWxlY3RzIGZpbGVzLlxuICBvbkNoYW5nZShldmVudDogYW55KSB7XG5cbiAgICB0aGlzLm5vdEFsbG93ZWRGaWxlcyA9IFtdO1xuICAgIGNvbnN0IGZpbGVFeHRSZWdFeHA6IFJlZ0V4cCA9IC8oPzpcXC4oW14uXSspKT8kLztcbiAgICBsZXQgZmlsZUxpc3Q6IEZpbGVMaXN0O1xuXG4gICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWQgfHwgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuYWxsb3dlZEZpbGVzID0gW107XG4gICAgICB0aGlzLkNhcHRpb24gPSBbXTtcbiAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2Ryb3AnKSB7XG4gICAgICBmaWxlTGlzdCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXMgfHwgZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICB9XG5cbiAgICAvLyAnZm9yRWFjaCcgZG9lcyBub3QgZXhpc3Qgb24gJ2ZpbGVsaXN0JyB0aGF0J3Mgd2h5IHRoaXMgZ29vZCBvbGQgJ2ZvcicgaXMgdXNlZC5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUV4dCA9IGZpbGVFeHRSZWdFeHBcbiAgICAgICAgLmV4ZWMoZmlsZUxpc3RbaV0ubmFtZSlbMV1cbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7IC8vIEdldCBmaWxlIGV4dGVuc2lvbi5cbiAgICAgIGNvbnN0IGlzRm9ybWF0VmFsaWQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLmluY2x1ZGVzKGN1cnJlbnRGaWxlRXh0KTtcblxuICAgICAgY29uc3QgaXNTaXplVmFsaWQgPSBmaWxlTGlzdFtpXS5zaXplIDw9IHRoaXMubWF4U2l6ZTtcblxuICAgICAgLy8gQ2hlY2sgd2hldGhlciBjdXJyZW50IGZpbGUgZm9ybWF0IGFuZCBzaXplIGlzIGNvcnJlY3QgYXMgc3BlY2lmaWVkIGluIHRoZSBjb25maWd1cmF0aW9ucy5cbiAgICAgIGlmIChpc0Zvcm1hdFZhbGlkICYmIGlzU2l6ZVZhbGlkKSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZEZpbGVzLnB1c2goZmlsZUxpc3RbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub3RBbGxvd2VkRmlsZXMucHVzaCh7XG4gICAgICAgICAgZmlsZU5hbWU6IGZpbGVMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZUxpc3RbaV0uc2l6ZSksXG4gICAgICAgICAgZXJyb3JNc2c6ICFpc0Zvcm1hdFZhbGlkID8gJ0ludmFsaWQgZm9ybWF0JyA6ICdJbnZhbGlkIHNpemUnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGFueSBhbGxvd2VkRmlsZXMuXG4gICAgaWYgKHRoaXMuYWxsb3dlZEZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZW5hYmxlVXBsb2FkQnRuID0gdHJ1ZTtcbiAgICAgIC8vIFVwbG9hZCB0aGUgZmlsZXMgZGlyZWN0bHkgaWYgdGhlbWUgaXMgYXR0YWNoIHBpbiAoYXMgdXBsb2FkIGJ0biBpcyBub3QgdGhlcmUgZm9yIHRoaXMgdGhlbWUpLlxuICAgICAgaWYgKHRoaXMudGhlbWUgPT09ICdhdHRhY2hQaW4nKSB7XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVVcGxvYWRCdG4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkU3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkUGVyY2VudCA9IDA7XG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbnVsbDtcbiAgfVxuXG4gIHVwbG9hZEZpbGVzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gdHJ1ZTtcbiAgICB0aGlzLnVwbG9hZFN0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMubm90QWxsb3dlZEZpbGVzID0gW107XG4gICAgbGV0IGlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmlzQWxsb3dlZEZpbGVTaW5nbGUgPSB0aGlzLmFsbG93ZWRGaWxlcy5sZW5ndGggPD0gMTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgLy8gQWRkIGRhdGEgdG8gYmUgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICB0aGlzLmFsbG93ZWRGaWxlcy5mb3JFYWNoKChmaWxlLCBpKSA9PiB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgIHRoaXMuQ2FwdGlvbltpXSB8fCAnZmlsZScgKyAodGhpcy5maWxlTmFtZUluZGV4ID8gaSA6ICcnKSxcbiAgICAgICAgdGhpcy5hbGxvd2VkRmlsZXNbaV1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgIE5vdCBXb3JraW5nLCBIZWFkZXJzIG51bGxcbiAgICAvLyBDb250cnVjdCBIZWFkZXJzXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdGhpcy5oZWFkZXJzW2tleV0pO1xuICAgIH1cblxuICAgIC8vIENvbnRydWN0IFBhcmFtc1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5wYXJhbXMpKSB7XG4gICAgICBwYXJhbXMuYXBwZW5kKGtleSwgdGhpcy5wYXJhbXNba2V5XSk7XG4gICAgfSAqL1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIHBhcmFtczogdGhpcy5wYXJhbXMsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSkgKG9wdGlvbnMgYXMgYW55KS5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcblxuICAgIHRoaXMuaHR0cFxuICAgICAgLnJlcXVlc3QodGhpcy5tZXRob2QudG9VcHBlckNhc2UoKSwgdGhpcy51cGxvYWRBUEksIHtcbiAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgICBvYnNlcnZlOiAnZXZlbnRzJyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH0pXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAvLyBVcGxvYWQgUHJvZ3Jlc3NcbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVVcGxvYWRCdG4gPSBmYWxzZTsgLy8gYnV0dG9uIHNob3VsZCBiZSBkaXNhYmxlZCBpZiBwcm9jZXNzIHVwbG9hZGluZ1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERvbmUgPSBldmVudC5sb2FkZWQgLyBldmVudC50b3RhbDtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkUGVyY2VudCA9IE1hdGgucm91bmQoKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc3RhdHVzID09PSAyMDAgfHwgZXZlbnQuc3RhdHVzID09PSAyMDEpIHtcbiAgICAgICAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmVuYWJsZVVwbG9hZEJ0biA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoIWlzRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19zdWNjZXNzO1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1zdWNjZXNzIGxlYWQnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBGYWlsdXJlXG4gICAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9ycygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLkFwaVJlc3BvbnNlLmVtaXQoZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmVudCBPdGhlcjogJywgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgLy8gRmFpbHVyZVxuICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3JzKCk7XG4gICAgICAgICAgdGhpcy5BcGlSZXNwb25zZS5lbWl0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9ycygpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlVXBsb2FkQnRuID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xuICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xuICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX2Vycm9yO1xuICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1kYW5nZXIgbGVhZCc7XG4gIH1cblxuICByZW1vdmVGaWxlKGk6IGFueSwgc2ZfbmE6IGFueSkge1xuICAgIGlmIChzZl9uYSA9PT0gJ3NmJykge1xuICAgICAgdGhpcy5hbGxvd2VkRmlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgdGhpcy5DYXB0aW9uLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkRmlsZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFsbG93ZWRGaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZW5hYmxlVXBsb2FkQnRuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29udmVydFNpemUoZmlsZVNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGVTaXplIDwgMTAyNDAwMFxuICAgICAgPyAoZmlsZVNpemUgLyAxMDI0KS50b0ZpeGVkKDIpICsgJyBLQidcbiAgICAgIDogKGZpbGVTaXplIC8gMTAyNDAwMCkudG9GaXhlZCgyKSArICcgTUInO1xuICB9XG5cbiAgYXR0YWNocGluT25jbGljaygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbCcgKyB0aGlzLmlkKTtcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIGRyb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5vbkNoYW5nZShldmVudCk7XG4gIH1cblxuICBhbGxvd0Ryb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cbn1cbiJdfQ==