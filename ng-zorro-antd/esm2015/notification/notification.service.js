/**
 * @fileoverview added by tsickle
 * Generated from: notification.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMNService } from 'ng-zorro-antd/message';
import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationServiceModule } from './notification.service.module';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "./notification.service.module";
/** @type {?} */
let notificationId = 0;
export class NzNotificationService extends NzMNService {
    /**
     * @param {?} nzSingletonService
     * @param {?} overlay
     * @param {?} injector
     */
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'notification-';
    }
    /**
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    success(title, content, options) {
        return this.createInstance({ type: 'success', title, content }, options);
    }
    /**
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    error(title, content, options) {
        return this.createInstance({ type: 'error', title, content }, options);
    }
    /**
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    info(title, content, options) {
        return this.createInstance({ type: 'info', title, content }, options);
    }
    /**
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    warning(title, content, options) {
        return this.createInstance({ type: 'warning', title, content }, options);
    }
    /**
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    blank(title, content, options) {
        return this.createInstance({ type: 'blank', title, content }, options);
    }
    /**
     * @param {?} type
     * @param {?} title
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    create(type, title, content, options) {
        return this.createInstance({ type, title, content }, options);
    }
    /**
     * @param {?} template
     * @param {?=} options
     * @return {?}
     */
    template(template, options) {
        return this.createInstance({ template }, options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateMessageId() {
        return `${this.componentPrefix}-${notificationId++}`;
    }
    /**
     * @private
     * @param {?} message
     * @param {?=} options
     * @return {?}
     */
    createInstance(message, options) {
        this.container = this.withContainer(NzNotificationContainerComponent);
        return this.container.create(Object.assign(Object.assign({}, message), {
            createdAt: new Date(),
            messageId: this.generateMessageId(),
            options
        }));
    }
}
NzNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: NzNotificationServiceModule
            },] }
];
/** @nocollapse */
NzNotificationService.ctorParameters = () => [
    { type: NzSingletonService },
    { type: Overlay },
    { type: Injector }
];
/** @nocollapse */ NzNotificationService.??prov = i0.????defineInjectable({ factory: function NzNotificationService_Factory() { return new NzNotificationService(i0.????inject(i1.NzSingletonService), i0.????inject(i2.Overlay), i0.????inject(i0.INJECTOR)); }, token: NzNotificationService, providedIn: i3.NzNotificationServiceModule });
if (false) {
    /**
     * @type {?}
     * @protected
     */
    NzNotificationService.prototype.container;
    /**
     * @type {?}
     * @protected
     */
    NzNotificationService.prototype.componentPrefix;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7OztJQUd4RSxjQUFjLEdBQUcsQ0FBQztBQUt0QixNQUFNLE9BQU8scUJBQXNCLFNBQVEsV0FBVzs7Ozs7O0lBSXBELFlBQVksa0JBQXNDLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSHJDLG9CQUFlLEdBQUcsZUFBZSxDQUFDO0lBSTVDLENBQUM7Ozs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFtQztRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBbUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7OztJQUVELElBQUksQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQW1DO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFtQztRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBbUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7Ozs7SUFFRCxNQUFNLENBQ0osSUFBaUUsRUFDakUsS0FBYSxFQUNiLE9BQWUsRUFDZixPQUFtQztRQUVuQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxRQUF5QixFQUFFLE9BQW1DO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRVMsaUJBQWlCO1FBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLGNBQWMsRUFBRSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxPQUEyQixFQUFFLE9BQW1DO1FBQ3JGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBRXRFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLGlDQUN2QixPQUFPLEdBQ1A7WUFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxPQUFPO1NBQ1IsRUFDRCxDQUFDO0lBQ0wsQ0FBQzs7O1lBM0RGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsMkJBQTJCO2FBQ3hDOzs7O1lBWFEsa0JBQWtCO1lBRmxCLE9BQU87WUFDSyxRQUFROzs7Ozs7OztJQWMzQiwwQ0FBdUQ7Ozs7O0lBQ3ZELGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2luZ2xldG9uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOek1OU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IE56Tm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmljYXRpb24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvblNlcnZpY2VNb2R1bGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvbkRhdGEsIE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMsIE56Tm90aWZpY2F0aW9uUmVmIH0gZnJvbSAnLi90eXBpbmdzJztcblxubGV0IG5vdGlmaWNhdGlvbklkID0gMDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBOek5vdGlmaWNhdGlvblNlcnZpY2VNb2R1bGVcbn0pXG5leHBvcnQgY2xhc3MgTnpOb3RpZmljYXRpb25TZXJ2aWNlIGV4dGVuZHMgTnpNTlNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgY29udGFpbmVyITogTnpOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQ7XG4gIHByb3RlY3RlZCBjb21wb25lbnRQcmVmaXggPSAnbm90aWZpY2F0aW9uLSc7XG5cbiAgY29uc3RydWN0b3IobnpTaW5nbGV0b25TZXJ2aWNlOiBOelNpbmdsZXRvblNlcnZpY2UsIG92ZXJsYXk6IE92ZXJsYXksIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKG56U2luZ2xldG9uU2VydmljZSwgb3ZlcmxheSwgaW5qZWN0b3IpO1xuICB9XG5cbiAgc3VjY2Vzcyh0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zKTogTnpOb3RpZmljYXRpb25SZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ3N1Y2Nlc3MnLCB0aXRsZSwgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIGVycm9yKHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnZXJyb3InLCB0aXRsZSwgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIGluZm8odGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucyk6IE56Tm90aWZpY2F0aW9uUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdpbmZvJywgdGl0bGUsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICB3YXJuaW5nKHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnd2FybmluZycsIHRpdGxlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgYmxhbmsodGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucyk6IE56Tm90aWZpY2F0aW9uUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdibGFuaycsIHRpdGxlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnYmxhbmsnIHwgc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgY29udGVudDogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zXG4gICk6IE56Tm90aWZpY2F0aW9uUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGUsIHRpdGxlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgdGVtcGxhdGUodGVtcGxhdGU6IFRlbXBsYXRlUmVmPHt9Piwgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0ZW1wbGF0ZSB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZU1lc3NhZ2VJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLmNvbXBvbmVudFByZWZpeH0tJHtub3RpZmljYXRpb25JZCsrfWA7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUluc3RhbmNlKG1lc3NhZ2U6IE56Tm90aWZpY2F0aW9uRGF0YSwgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLndpdGhDb250YWluZXIoTnpOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmNyZWF0ZSh7XG4gICAgICAuLi5tZXNzYWdlLFxuICAgICAgLi4ue1xuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgIG1lc3NhZ2VJZDogdGhpcy5nZW5lcmF0ZU1lc3NhZ2VJZCgpLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==