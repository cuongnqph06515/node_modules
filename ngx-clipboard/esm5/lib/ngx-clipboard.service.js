import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ngx-window-token";
/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
var ClipboardService = /** @class */ (function () {
    function ClipboardService(document, window) {
        this.document = document;
        this.window = window;
        this.copySubject = new Subject();
        this.copyResponse$ = this.copySubject.asObservable();
        this.config = {};
    }
    ClipboardService.prototype.configure = function (config) {
        this.config = config;
    };
    ClipboardService.prototype.copy = function (content) {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content: content });
        }
        var copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content: content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content: content });
    };
    Object.defineProperty(ClipboardService.prototype, "isSupported", {
        get: function () {
            return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
        },
        enumerable: true,
        configurable: true
    });
    ClipboardService.prototype.isTargetValid = function (element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    };
    /**
     * Attempts to copy from an input `targetElm`
     */
    ClipboardService.prototype.copyFromInputElement = function (targetElm, isFocus) {
        if (isFocus === void 0) { isFocus = true; }
        try {
            this.selectTarget(targetElm);
            var re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    };
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    ClipboardService.prototype.isCopySuccessInIE11 = function () {
        var clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    };
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    ClipboardService.prototype.copyFromContent = function (content, container) {
        if (container === void 0) { container = this.document.body; }
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
        var toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement);
        }
        return toReturn;
    };
    /**
     * Remove temporary textarea if any exists.
     */
    ClipboardService.prototype.destroy = function (container) {
        if (container === void 0) { container = this.document.body; }
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    };
    /**
     * Select the target html input element.
     */
    ClipboardService.prototype.selectTarget = function (inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    };
    ClipboardService.prototype.copyText = function () {
        return this.document.execCommand('copy');
    };
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    ClipboardService.prototype.clearSelection = function (inputElement, window) {
        inputElement && inputElement.focus();
        window.getSelection().removeAllRanges();
    };
    /**
     * Creates a fake textarea for copy command.
     */
    ClipboardService.prototype.createTempTextArea = function (doc, window) {
        var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        var ta;
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
        var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    };
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    ClipboardService.prototype.pushCopyResponse = function (response) {
        this.copySubject.next(response);
    };
    /**
     * @deprecated use pushCopyResponse instead.
     */
    ClipboardService.prototype.pushCopyReponse = function (response) {
        this.pushCopyResponse(response);
    };
    ClipboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [WINDOW,] }] }
    ]; };
    ClipboardService.??prov = i0.????defineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(i0.????inject(i1.DOCUMENT), i0.????inject(i2.WINDOW, 8)); }, token: ClipboardService, providedIn: "root" });
    ClipboardService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(DOCUMENT)), __param(1, Optional()), __param(1, Inject(WINDOW))
    ], ClipboardService);
    return ClipboardService;
}());
export { ClipboardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNsaXBib2FyZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2xpcGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFJM0M7O0dBRUc7QUFFSDtJQU1JLDBCQUFxQyxRQUFhLEVBQXNDLE1BQVc7UUFBOUQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFzQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBTDNGLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDakQsa0JBQWEsR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUvRSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztJQUVpRSxDQUFDO0lBRWhHLG9DQUFTLEdBQWhCLFVBQWlCLE1BQXVCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSwrQkFBSSxHQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLFVBQVUsRUFBRTtZQUNaLE9BQU8sSUFBSSxD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dEIsVUFBdUIsUUFBNEI7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dEQTFKWSxNQUFNLFNBQUMsUUFBUTtnREFBeUIsUUFBUSxZQUFJLE1BQU0sU0FBQyxNQUFNOzs7SUFOckUsZ0JBQWdCO1FBRDVCLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQU9sQixXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQSxFQUF3QixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7T0FOdEUsZ0JBQWdCLENBaUs1QjsyQkE1S0Q7Q0E0S0MsQUFqS0QsSUFpS0M7U0FqS1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ25neC13aW5kb3ctdG9rZW4nO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBDbGlwYm9hcmRQYXJhbXMsIElDbGlwYm9hcmRSZXNwb25zZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgZm9sbG93aW5nIGNvZGUgaXMgaGVhdmlseSBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vemVub3JvY2hhL2NsaXBib2FyZC5qc1xyXG4gKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIENsaXBib2FyZFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBjb3B5U3ViamVjdCA9IG5ldyBTdWJqZWN0PElDbGlwYm9hcmRSZXNwb25zZT4oKTtcclxuICAgIHB1YmxpYyBjb3B5UmVzcG9uc2UkOiBPYnNlcnZhYmxlPElDbGlwYm9hcmRSZXNwb25zZT4gPSB0aGlzLmNvcHlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgcHJpdmF0ZSB0ZW1wVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ2xpcGJvYXJkUGFyYW1zID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHVibGljIGRvY3VtZW50OiBhbnksIEBPcHRpb25hbCgpIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbmRvdzogYW55KSB7fVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUoY29uZmlnOiBDbGlwYm9hcmRQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29weShjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQgfHwgIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaENvcHlSZXNwb25zZSh7IGlzU3VjY2VzczogZmFsc2UsIGNvbnRlbnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvcHlSZXN1bHQgPSB0aGlzLmNvcHlGcm9tQ29udGVudChjb250ZW50KTtcclxuICAgICAgICBpZiAoY29weVJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoQ29weVJlc3BvbnNlKHsgY29udGVudCwgaXNTdWNjZXNzOiBjb3B5UmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoQ29weVJlc3BvbnNlKHsgaXNTdWNjZXNzOiBmYWxzZSwgY29udGVudCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkICYmICEhdGhpcy5kb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoJ2NvcHknKSAmJiAhIXRoaXMud2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RhcmdldFZhbGlkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBQbGVhc2UgdXNlIFwicmVhZG9ubHlcIiBpbnN0ZWFkIG9mIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgc2hvdWxkIGJlIGlucHV0IG9yIHRleHRhcmVhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRlbXB0cyB0byBjb3B5IGZyb20gYW4gaW5wdXQgYHRhcmdldEVsbWBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvcHlGcm9tSW5wdXRFbGVtZW50KHRhcmdldEVsbTogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQsIGlzRm9jdXMgPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYXJnZXQodGFyZ2V0RWxtKTtcclxuICAgICAgICAgICAgY29uc3QgcmUgPSB0aGlzLmNvcHlUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oaXNGb2N1cyA/IHRhcmdldEVsbSA6IHVuZGVmaW5lZCwgdGhpcy53aW5kb3cpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmUgJiYgdGhpcy5pc0NvcHlTdWNjZXNzSW5JRTExKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgYSBoYWNrIGZvciBJRTExIHRvIHJldHVybiBgdHJ1ZWAgZXZlbiBpZiBjb3B5IGZhaWxzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNDb3B5U3VjY2Vzc0luSUUxMSgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gdGhpcy53aW5kb3dbJ2NsaXBib2FyZERhdGEnXTtcclxuICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YSAmJiBjbGlwYm9hcmREYXRhLmdldERhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFjbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGZha2UgdGV4dGFyZWEgZWxlbWVudCwgc2V0cyBpdHMgdmFsdWUgZnJvbSBgdGV4dGAgcHJvcGVydHksXHJcbiAgICAgKiBhbmQgbWFrZXMgYSBzZWxlY3Rpb24gb24gaXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb3B5RnJvbUNvbnRlbnQoY29udGVudDogc3RyaW5nLCBjb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5ib2R5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRlbXAgdGV4dGFyZWEgc3RpbGwgYmVsb25ncyB0byB0aGUgY3VycmVudCBjb250YWluZXIuXHJcbiAgICAgICAgLy8gSW4gY2FzZSB3ZSBoYXZlIG11bHRpcGxlIHBsYWNlcyB1c2luZyBuZ3gtY2xpcGJvYXJkLCBvbmUgaXMgaW4gYSBtb2RhbCB1c2luZyBjb250YWluZXIgYnV0IHRoZSBvdGhlciBvbmUgaXMgbm90LlxyXG4gICAgICAgIGlmICh0aGlzLnRlbXBUZXh0QXJlYSAmJiAhY29udGFpbmVyLmNvbnRhaW5zKHRoaXMudGVtcFRleHRBcmVhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kodGhpcy50ZW1wVGV4dEFyZWEucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGVtcFRleHRBcmVhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFRleHRBcmVhID0gdGhpcy5jcmVhdGVUZW1wVGV4dEFyZWEodGhpcy5kb2N1bWVudCwgdGhpcy53aW5kb3cpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGVtcFRleHRBcmVhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIHNob3VsZCBiZSBhIERvbSBlbGVtZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEudmFsdWUgPSBjb250ZW50O1xyXG5cclxuICAgICAgICBjb25zdCB0b1JldHVybiA9IHRoaXMuY29weUZyb21JbnB1dEVsZW1lbnQodGhpcy50ZW1wVGV4dEFyZWEsIGZhbHNlKTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuY2xlYW5VcEFmdGVyQ29weSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kodGhpcy50ZW1wVGV4dEFyZWEucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b1JldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB0ZW1wb3JhcnkgdGV4dGFyZWEgaWYgYW55IGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koY29udGFpbmVyOiBIVE1MRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuYm9keSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBUZXh0QXJlYSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmVDaGlsZCBkb2Vzbid0IHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFRleHRBcmVhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgdGFyZ2V0IGh0bWwgaW5wdXQgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RUYXJnZXQoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNlbGVjdCgpO1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBpbnB1dEVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvcHlUZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyBmb2N1cyBhd2F5IGZyb20gYHRhcmdldGAgYW5kIGJhY2sgdG8gdGhlIHRyaWdnZXIsIHJlbW92ZXMgY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCwgd2luZG93OiBXaW5kb3cpOiB2b2lkIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQgJiYgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGZha2UgdGV4dGFyZWEgZm9yIGNvcHkgY29tbWFuZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUZW1wVGV4dEFyZWEoZG9jOiBEb2N1bWVudCwgd2luZG93OiBXaW5kb3cpOiBIVE1MVGV4dEFyZWFFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBpc1JUTCA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXInKSA9PT0gJ3J0bCc7XHJcbiAgICAgICAgbGV0IHRhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gICAgICAgIHRhID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICAgICAgLy8gUHJldmVudCB6b29taW5nIG9uIGlPU1xyXG4gICAgICAgIHRhLnN0eWxlLmZvbnRTaXplID0gJzEycHQnO1xyXG4gICAgICAgIC8vIFJlc2V0IGJveCBtb2RlbFxyXG4gICAgICAgIHRhLnN0eWxlLmJvcmRlciA9ICcwJztcclxuICAgICAgICB0YS5zdHlsZS5wYWRkaW5nID0gJzAnO1xyXG4gICAgICAgIHRhLnN0eWxlLm1hcmdpbiA9ICcwJztcclxuICAgICAgICAvLyBNb3ZlIGVsZW1lbnQgb3V0IG9mIHNjcmVlbiBob3Jpem9udGFsbHlcclxuICAgICAgICB0YS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgdGEuc3R5bGVbaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnXSA9ICctOTk5OXB4JztcclxuICAgICAgICAvLyBNb3ZlIGVsZW1lbnQgdG8gdGhlIHNhbWUgcG9zaXRpb24gdmVydGljYWxseVxyXG4gICAgICAgIGNvbnN0IHlQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICB0YS5zdHlsZS50b3AgPSB5UG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIHRhLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVzaGVzIGNvcHkgb3BlcmF0aW9uIHJlc3BvbnNlIHRvIGNvcHlTdWJqZWN0LCB0byBwcm92aWRlIGdsb2JhbCBhY2Nlc3NcclxuICAgICAqIHRvIHRoZSByZXNwb25zZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHB1c2hDb3B5UmVzcG9uc2UocmVzcG9uc2U6IElDbGlwYm9hcmRSZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVN1YmplY3QubmV4dChyZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2UgcHVzaENvcHlSZXNwb25zZSBpbnN0ZWFkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHVzaENvcHlSZXBvbnNlKHJlc3BvbnNlOiBJQ2xpcGJvYXJkUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnB1c2hDb3B5UmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==