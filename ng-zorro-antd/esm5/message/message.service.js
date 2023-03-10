/**
 * @fileoverview added by tsickle
 * Generated from: message.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageServiceModule } from './message.service.module';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "./message.service.module";
var NzMessageService = /** @class */ (function (_super) {
    __extends(NzMessageService, _super);
    function NzMessageService(nzSingletonService, overlay, injector) {
        var _this = _super.call(this, nzSingletonService, overlay, injector) || this;
        _this.componentPrefix = 'message-';
        return _this;
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.success = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        return this.createInstance({ type: 'success', content: content }, options);
    };
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.error = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        return this.createInstance({ type: 'error', content: content }, options);
    };
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.info = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        return this.createInstance({ type: 'info', content: content }, options);
    };
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.warning = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        return this.createInstance({ type: 'warning', content: content }, options);
    };
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.loading = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        return this.createInstance({ type: 'loading', content: content }, options);
    };
    /**
     * @param {?} type
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.create = /**
     * @param {?} type
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (type, content, options) {
        return this.createInstance({ type: type, content: content }, options);
    };
    /**
     * @private
     * @param {?} message
     * @param {?=} options
     * @return {?}
     */
    NzMessageService.prototype.createInstance = /**
     * @private
     * @param {?} message
     * @param {?=} options
     * @return {?}
     */
    function (message, options) {
        this.container = this.withContainer(NzMessageContainerComponent);
        return this.container.create(__assign(__assign({}, message), {
            createdAt: new Date(),
            messageId: this.getInstanceId(),
            options: options
        }));
    };
    NzMessageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: NzMessageServiceModule
                },] }
    ];
    /** @nocollapse */
    NzMessageService.ctorParameters = function () { return [
        { type: NzSingletonService },
        { type: Overlay },
        { type: Injector }
    ]; };
    /** @nocollapse */ NzMessageService.??prov = i0.????defineInjectable({ factory: function NzMessageService_Factory() { return new NzMessageService(i0.????inject(i1.NzSingletonService), i0.????inject(i2.Overlay), i0.????inject(i0.INJECTOR)); }, token: NzMessageService, providedIn: i3.NzMessageServiceModule });
    return NzMessageService;
}(NzMNService));
export { NzMessageService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    NzMessageService.prototype.container;
    /**
     * @type {?}
     * @protected
     */
    NzMessageService.prototype.componentPrefix;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9tZXNzYWdlLyIsInNvdXJjZXMiOlsibWVzc2FnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7QUFHbEU7SUFHc0Msb0NBQVc7SUFJL0MsMEJBQVksa0JBQXNDLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQjtRQUF4RixZQUNFLGtCQUFNLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsU0FDN0M7UUFKUyxxQkFBZSxHQUFHLFVBQVUsQ0FBQzs7SUFJdkMsQ0FBQzs7Ozs7O0lBRUQsa0NBQU87Ozs7O0lBQVAsVUFBUSxPQUFtQyxFQUFFLE9BQThCO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxTQUFBLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7SUFFRCxnQ0FBSzs7Ozs7SUFBTCxVQUFNLE9BQW1DLEVBQUUsT0FBOEI7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLFNBQUEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7OztJQUVELCtCQUFJOzs7OztJQUFKLFVBQUssT0FBbUMsRUFBRSxPQUE4QjtRQUN0RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sU0FBQSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRUQsa0NBQU87Ozs7O0lBQVAsVUFBUSxPQUFtQyxFQUFFLE9BQThCO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxTQUFBLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7SUFFRCxrQ0FBTzs7Ozs7SUFBUCxVQUFRLE9BQW1DLEVBQUUsT0FBOEI7UUFDekUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLFNBQUEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7Ozs7SUFFRCxpQ0FBTTs7Ozs7O0lBQU4sVUFDRSxJQUFtRSxFQUNuRSxPQUFtQyxFQUNuQyxPQUE4QjtRQUU5QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7Ozs7SUFFTyx5Q0FBYzs7Ozs7O0lBQXRCLFVBQXVCLE9BQXNCLEVBQUUsT0FBOEI7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sdUJBQ3ZCLE9BQU8sR0FDUDtZQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMvQixPQUFPLFNBQUE7U0FDUixFQUNELENBQUM7SUFDTCxDQUFDOztnQkFsREYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxzQkFBc0I7aUJBQ25DOzs7O2dCQVRRLGtCQUFrQjtnQkFGbEIsT0FBTztnQkFDSyxRQUFROzs7MkJBTjdCO0NBaUVDLEFBbkRELENBR3NDLFdBQVcsR0FnRGhEO1NBaERZLGdCQUFnQjs7Ozs7O0lBQzNCLHFDQUFrRDs7Ozs7SUFDbEQsMkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTaW5nbGV0b25TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcblxuaW1wb3J0IHsgTnpNTlNlcnZpY2UgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgTnpNZXNzYWdlQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZU1vZHVsZSB9IGZyb20gJy4vbWVzc2FnZS5zZXJ2aWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOek1lc3NhZ2VEYXRhLCBOek1lc3NhZ2VEYXRhT3B0aW9ucywgTnpNZXNzYWdlUmVmIH0gZnJvbSAnLi90eXBpbmdzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBOek1lc3NhZ2VTZXJ2aWNlTW9kdWxlXG59KVxuZXhwb3J0IGNsYXNzIE56TWVzc2FnZVNlcnZpY2UgZXh0ZW5kcyBOek1OU2VydmljZSB7XG4gIHByb3RlY3RlZCBjb250YWluZXI/OiBOek1lc3NhZ2VDb250YWluZXJDb21wb25lbnQ7XG4gIHByb3RlY3RlZCBjb21wb25lbnRQcmVmaXggPSAnbWVzc2FnZS0nO1xuXG4gIGNvbnN0cnVjdG9yKG56U2luZ2xldG9uU2VydmljZTogTnpTaW5nbGV0b25TZXJ2aWNlLCBvdmVybGF5OiBPdmVybGF5LCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcihuelNpbmdsZXRvblNlcnZpY2UsIG92ZXJsYXksIGluamVjdG9yKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnc3VjY2VzcycsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBlcnJvcihjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiwgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zKTogTnpNZXNzYWdlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdlcnJvcicsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBpbmZvKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+LCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ2luZm8nLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgd2FybmluZyhjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiwgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zKTogTnpNZXNzYWdlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICd3YXJuaW5nJywgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIGxvYWRpbmcoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnbG9hZGluZycsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgdHlwZTogJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdsb2FkaW5nJyB8IHN0cmluZyxcbiAgICBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPixcbiAgICBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnNcbiAgKTogTnpNZXNzYWdlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGUsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUluc3RhbmNlKG1lc3NhZ2U6IE56TWVzc2FnZURhdGEsIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLndpdGhDb250YWluZXIoTnpNZXNzYWdlQ29udGFpbmVyQ29tcG9uZW50KTtcblxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5jcmVhdGUoe1xuICAgICAgLi4ubWVzc2FnZSxcbiAgICAgIC4uLntcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICBtZXNzYWdlSWQ6IHRoaXMuZ2V0SW5zdGFuY2VJZCgpLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==