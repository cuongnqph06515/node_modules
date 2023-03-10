import { __decorate } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ClipboardService } from './ngx-clipboard.service';
var ClipboardDirective = /** @class */ (function () {
    function ClipboardDirective(clipboardSrv) {
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new EventEmitter();
        this.cbOnError = new EventEmitter();
    }
    // tslint:disable-next-line:no-empty
    ClipboardDirective.prototype.ngOnInit = function () { };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        this.clipboardSrv.destroy(this.container);
    };
    ClipboardDirective.prototype.onClick = function (event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    };
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    ClipboardDirective.prototype.handleResult = function (succeeded, copiedContent, event) {
        var response = {
            isSuccess: succeeded,
            event: event
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
    };
    ClipboardDirective.ctorParameters = function () { return [
        { type: ClipboardService }
    ]; };
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
    return ClipboardDirective;
}());
export { ClipboardDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL25neC1jbGlwYm9hcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLM0Q7SUFrQkksNEJBQW9CLFlBQThCO1FBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUozQyxnQkFBVyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUd2RixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFDVCxDQUFDO0lBRXRELG9DQUFvQztJQUM3QixxQ0FBUSxHQUFmLGNBQW1CLENBQUM7SUFFYix3Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBR00sb0NBQU8sR0FBZCxVQUFlLEtBQVk7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0c7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0sseUNBQVksR0FBcEIsVUFBcUIsU0FBa0IsRUFBRSxhQUFpQyxFQUFFLEtBQVk7UUFDcEYsSUFBSSxRQUFRLEdBQXVCO1lBQy9CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssT0FBQTtTQUNSLENBQUM7UUFFRixJQUFJLFNBQVMsRUFBRTtZQUNYLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWTthQUNwQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O2dCQXpDaUMsZ0JBQWdCOztJQWZsRDtRQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7eURBQ21DO0lBRXpEO1FBREMsS0FBSyxFQUFFO3lEQUNzQjtJQUc5QjtRQURDLEtBQUssRUFBRTt5REFDaUI7SUFHekI7UUFEQyxLQUFLLEVBQUU7NERBQ29CO0lBRzVCO1FBREMsTUFBTSxFQUFFOzJEQUNxRjtJQUc5RjtRQURDLE1BQU0sRUFBRTt5REFDcUQ7SUFXOUQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7cURBU3hDO0lBcENRLGtCQUFrQjtRQUg5QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzdCLENBQUM7T0FDVyxrQkFBa0IsQ0E0RDlCO0lBQUQseUJBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSUNsaXBib2FyZFJlc3BvbnNlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDbGlwYm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtY2xpcGJvYXJkLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3hDbGlwYm9hcmRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gICAgQElucHV0KCduZ3hDbGlwYm9hcmQnKVxyXG4gICAgcHVibGljIHRhcmdldEVsbTogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjYkNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGNiU3VjY2Vzc01zZzogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIGNiT25TdWNjZXNzOiBFdmVudEVtaXR0ZXI8SUNsaXBib2FyZFJlc3BvbnNlPiA9IG5ldyBFdmVudEVtaXR0ZXI8SUNsaXBib2FyZFJlc3BvbnNlPigpO1xyXG5cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIGNiT25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpcGJvYXJkU3J2OiBDbGlwYm9hcmRTZXJ2aWNlKSB7fVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5jbGlwYm9hcmRTcnYuZGVzdHJveSh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcclxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jbGlwYm9hcmRTcnYuaXNTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQoZmFsc2UsIHVuZGVmaW5lZCwgZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YXJnZXRFbG0gJiYgdGhpcy5jbGlwYm9hcmRTcnYuaXNUYXJnZXRWYWxpZCh0aGlzLnRhcmdldEVsbSkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQodGhpcy5jbGlwYm9hcmRTcnYuY29weUZyb21JbnB1dEVsZW1lbnQodGhpcy50YXJnZXRFbG0pLCB0aGlzLnRhcmdldEVsbS52YWx1ZSwgZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYkNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQodGhpcy5jbGlwYm9hcmRTcnYuY29weUZyb21Db250ZW50KHRoaXMuY2JDb250ZW50LCB0aGlzLmNvbnRhaW5lciksIHRoaXMuY2JDb250ZW50LCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgYW4gZXZlbnQgYmFzZWQgb24gdGhlIGNvcHkgb3BlcmF0aW9uIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSBzdWNjZWVkZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXN1bHQoc3VjY2VlZGVkOiBib29sZWFuLCBjb3BpZWRDb250ZW50OiBzdHJpbmcgfCB1bmRlZmluZWQsIGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGxldCByZXNwb25zZTogSUNsaXBib2FyZFJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBpc1N1Y2Nlc3M6IHN1Y2NlZWRlZCxcclxuICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoc3VjY2VlZGVkKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gT2JqZWN0LmFzc2lnbihyZXNwb25zZSwge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29waWVkQ29udGVudCxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB0aGlzLmNiU3VjY2Vzc01zZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYk9uU3VjY2Vzcy5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNiT25FcnJvci5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xpcGJvYXJkU3J2LnB1c2hDb3B5UmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==