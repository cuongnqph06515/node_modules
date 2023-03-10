import { __decorate, __param } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Inject, Optional, ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Input, Output, HostListener, Directive, ViewContainerRef, TemplateRef, NgModule } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Subject } from 'rxjs';

/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
let ClipboardService = class ClipboardService {
    constructor(document, window) {
        this.document = document;
        this.window = window;
        this.copySubject = new Subject();
        this.copyResponse$ = this.copySubject.asObservable();
        this.config = {};
    }
    configure(config) {
        this.config = config;
    }
    copy(content) {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content });
        }
        const copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content });
    }
    get isSupported() {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
    }
    isTargetValid(element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    }
    /**
     * Attempts to copy from an input `targetElm`
     */
    copyFromInputElement(targetElm, isFocus = true) {
        try {
            this.selectTarget(targetElm);
            const re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    }
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    isCopySuccessInIE11() {
        const clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    }
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    copyFromContent(content, container = this.document.body) {
        // check if the temp textarea still belongs to the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        const toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement);
        }
        return toReturn;
    }
    /**
     * Remove temporary textarea if any exists.
     */
    destroy(container = this.document.body) {
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    }
    /**
     * Select the target html input element.
     */
    selectTarget(inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    }
    copyText() {
        return this.document.execCommand('copy');
    }
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    clearSelection(inputElement, window) {
        inputElement && inputElement.focus();
        window.getSelection().removeAllRanges();
    }
    /**
     * Creates a fake textarea for copy command.
     */
    createTempTextArea(doc, window) {
        const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        let ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    pushCopyResponse(response) {
        this.copySubject.next(response);
    }
    /**
     * @deprecated use pushCopyResponse instead.
     */
    pushCopyReponse(response) {
        this.pushCopyResponse(response);
    }
};
ClipboardService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [WINDOW,] }] }
];
ClipboardService.ɵprov = ɵɵdefineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(ɵɵinject(DOCUMENT), ɵɵinject(WINDOW, 8)); }, token: ClipboardService, providedIn: "root" });
ClipboardService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(DOCUMENT)), __param(1, Optional()), __param(1, Inject(WINDOW))
], ClipboardService);

let ClipboardDirective = class ClipboardDirective {
    constructor(clipboardSrv) {
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new EventEmitter();
        this.cbOnError = new EventEmitter();
    }
    // tslint:disable-next-line:no-empty
    ngOnInit() { }
    ngOnDestroy() {
        this.clipboardSrv.destroy(this.container);
    }
    onClick(event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    }
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    handleResult(succeeded, copiedContent, event) {
        let response = {
            isSuccess: succeeded,
            event
        };
        if (succeeded) {
            response = Object.assign(response, {
                content: copiedContent,
                successMessage: this.cbSuccessMsg
            });
            this.cbOnSuccess.emit(response);
        }
        else {
            this.cbOnError.emit(response);
        }
        this.clipboardSrv.pushCopyResponse(response);
    }
};
ClipboardDirective.ctorParameters = () => [
    { type: ClipboardService }
];
__decorate([
    Input('ngxClipboard')
], ClipboardDirective.prototype, "targetElm", void 0);
__decorate([
    Input()
], ClipboardDirective.prototype, "container", void 0);
__decorate([
    Input()
], ClipboardDirective.prototype, "cbContent", void 0);
__decorate([
    Input()
], ClipboardDirective.prototype, "cbSuccessMsg", void 0);
__decorate([
    Output()
], ClipboardDirective.prototype, "cbOnSuccess", void 0);
__decorate([
    Output()
], ClipboardDirective.prototype, "cbOnError", void 0);
__decorate([
    HostListener('click', ['$event.target'])
], ClipboardDirective.prototype, "onClick", null);
ClipboardDirective = __decorate([
    Directive({
        selector: '[ngxClipboard]'
    })
], ClipboardDirective);

let ClipboardIfSupportedDirective = class ClipboardIfSupportedDirective {
    constructor(_clipboardService, _viewContainerRef, _templateRef) {
        this._clipboardService = _clipboardService;
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    ngOnInit() {
        if (this._clipboardService.isSupported) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    }
};
ClipboardIfSupportedDirective.ctorParameters = () => [
    { type: ClipboardService },
    { type: ViewContainerRef },
    { type: TemplateRef }
];
ClipboardIfSupportedDirective = __decorate([
    Directive({
        selector: '[ngxClipboardIfSupported]'
    })
], ClipboardIfSupportedDirective);

let ClipboardModule = class ClipboardModule {
};
ClipboardModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
        exports: [ClipboardDirective, ClipboardIfSupportedDirective]
    })
], ClipboardModule);

/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ClipboardDirective, ClipboardIfSupportedDirective, ClipboardModule, ClipboardService };
//# sourceMappingURL=ngx-clipboard.js.map
