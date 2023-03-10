import { __decorate } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ClipboardService } from './ngx-clipboard.service';
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
export { ClipboardDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL25neC1jbGlwYm9hcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLM0QsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFrQjNCLFlBQW9CLFlBQThCO1FBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUozQyxnQkFBVyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUd2RixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFDVCxDQUFDO0lBRXRELG9DQUFvQztJQUM3QixRQUFRLEtBQUksQ0FBQztJQUViLFdBQVc7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdNLE9BQU8sQ0FBQyxLQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUc7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9HO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVksQ0FBQyxTQUFrQixFQUFFLGFBQWlDLEVBQUUsS0FBWTtRQUNwRixJQUFJLFFBQVEsR0FBdUI7WUFDL0IsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSztTQUNSLENBQUM7UUFFRixJQUFJLFNBQVMsRUFBRTtZQUNYLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWTthQUNwQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDSixDQUFBOztZQTFDcUMsZ0JBQWdCOztBQWZsRDtJQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7cURBQ21DO0FBRXpEO0lBREMsS0FBSyxFQUFFO3FEQUNzQjtBQUc5QjtJQURDLEtBQUssRUFBRTtxREFDaUI7QUFHekI7SUFEQyxLQUFLLEVBQUU7d0RBQ29CO0FBRzVCO0lBREMsTUFBTSxFQUFFO3VEQUNxRjtBQUc5RjtJQURDLE1BQU0sRUFBRTtxREFDcUQ7QUFXOUQ7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7aURBU3hDO0FBcENRLGtCQUFrQjtJQUg5QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzdCLENBQUM7R0FDVyxrQkFBa0IsQ0E0RDlCO1NBNURZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJQ2xpcGJvYXJkUmVzcG9uc2UgfSBmcm9tICcuL2ludGVyZmFjZSc7XHJcbmltcG9ydCB7IENsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25neENsaXBib2FyZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBASW5wdXQoJ25neENsaXBib2FyZCcpXHJcbiAgICBwdWJsaWMgdGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGNiQ29udGVudDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgY2JTdWNjZXNzTXNnOiBzdHJpbmc7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgY2JPblN1Y2Nlc3M6IEV2ZW50RW1pdHRlcjxJQ2xpcGJvYXJkUmVzcG9uc2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxJQ2xpcGJvYXJkUmVzcG9uc2U+KCk7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgY2JPbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGlwYm9hcmRTcnY6IENsaXBib2FyZFNlcnZpY2UpIHt9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmNsaXBib2FyZFNydi5kZXN0cm95KHRoaXMuY29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gICAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsaXBib2FyZFNydi5pc1N1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChmYWxzZSwgdW5kZWZpbmVkLCBldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldEVsbSAmJiB0aGlzLmNsaXBib2FyZFNydi5pc1RhcmdldFZhbGlkKHRoaXMudGFyZ2V0RWxtKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdCh0aGlzLmNsaXBib2FyZFNydi5jb3B5RnJvbUlucHV0RWxlbWVudCh0aGlzLnRhcmdldEVsbSksIHRoaXMudGFyZ2V0RWxtLnZhbHVlLCBldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNiQ29udGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdCh0aGlzLmNsaXBib2FyZFNydi5jb3B5RnJvbUNvbnRlbnQodGhpcy5jYkNvbnRlbnQsIHRoaXMuY29udGFpbmVyKSwgdGhpcy5jYkNvbnRlbnQsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyBhbiBldmVudCBiYXNlZCBvbiB0aGUgY29weSBvcGVyYXRpb24gcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHN1Y2NlZWRlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3VsdChzdWNjZWVkZWQ6IGJvb2xlYW4sIGNvcGllZENvbnRlbnQ6IHN0cmluZyB8IHVuZGVmaW5lZCwgZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBJQ2xpcGJvYXJkUmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGlzU3VjY2Vzczogc3VjY2VlZGVkLFxyXG4gICAgICAgICAgICBldmVudFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChzdWNjZWVkZWQpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBPYmplY3QuYXNzaWduKHJlc3BvbnNlLCB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb3BpZWRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2U6IHRoaXMuY2JTdWNjZXNzTXNnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNiT25TdWNjZXNzLmVtaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JPbkVycm9yLmVtaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGlwYm9hcmRTcnYucHVzaENvcHlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICB9XHJcbn1cclxuIl19