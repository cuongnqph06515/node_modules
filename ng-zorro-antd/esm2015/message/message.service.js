/**
 * @fileoverview added by tsickle
 * Generated from: message.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class NzMessageService extends NzMNService {
    /**
     * @param {?} nzSingletonService
     * @param {?} overlay
     * @param {?} injector
     */
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'message-';
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    success(content, options) {
        return this.createInstance({ type: 'success', content }, options);
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    error(content, options) {
        return this.createInstance({ type: 'error', content }, options);
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    info(content, options) {
        return this.createInstance({ type: 'info', content }, options);
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    warning(content, options) {
        return this.createInstance({ type: 'warning', content }, options);
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    loading(content, options) {
        return this.createInstance({ type: 'loading', content }, options);
    }
    /**
     * @param {?} type
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    create(type, content, options) {
        return this.createInstance({ type, content }, options);
    }
    /**
     * @private
     * @param {?} message
     * @param {?=} options
     * @return {?}
     */
    createInstance(message, options) {
        this.container = this.withContainer(NzMessageContainerComponent);
        return this.container.create(Object.assign(Object.assign({}, message), {
            createdAt: new Date(),
            messageId: this.getInstanceId(),
            options
        }));
    }
}
NzMessageService.decorators = [
    { type: Injectable, args: [{
                providedIn: NzMessageServiceModule
            },] }
];
/** @nocollapse */
NzMessageService.ctorParameters = () => [
    { type: NzSingletonService },
    { type: Overlay },
    { type: Injector }
];
/** @nocollapse */ NzMessageService.??prov = i0.????defineInjectable({ factory: function NzMessageService_Factory() { return new NzMessageService(i0.????inject(i1.NzSingletonService), i0.????inject(i2.Overlay), i0.????inject(i0.INJECTOR)); }, token: NzMessageService, providedIn: i3.NzMessageServiceModule });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9tZXNzYWdlLyIsInNvdXJjZXMiOlsibWVzc2FnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQU1sRSxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsV0FBVzs7Ozs7O0lBSS9DLFlBQVksa0JBQXNDLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSHJDLG9CQUFlLEdBQUcsVUFBVSxDQUFDO0lBSXZDLENBQUM7Ozs7OztJQUVELE9BQU8sQ0FBQyxPQUFtQyxFQUFFLE9BQThCO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBRUQsS0FBSyxDQUFDLE9BQW1DLEVBQUUsT0FBOEI7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDOzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN0RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQUVELE9BQU8sQ0FBQyxPQUFtQyxFQUFFLE9BQThCO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLE9BQW1DLEVBQUUsT0FBOEI7UUFDekUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUNKLElBQW1FLEVBQ25FLE9BQW1DLEVBQ25DLE9BQThCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7O0lBRU8sY0FBYyxDQUFDLE9BQXNCLEVBQUUsT0FBOEI7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0saUNBQ3ZCLE9BQU8sR0FDUDtZQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMvQixPQUFPO1NBQ1IsRUFDRCxDQUFDO0lBQ0wsQ0FBQzs7O1lBbERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsc0JBQXNCO2FBQ25DOzs7O1lBVFEsa0JBQWtCO1lBRmxCLE9BQU87WUFDSyxRQUFROzs7Ozs7OztJQVkzQixxQ0FBa0Q7Ozs7O0lBQ2xELDJDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2luZ2xldG9uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5cbmltcG9ydCB7IE56TU5TZXJ2aWNlIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IE56TWVzc2FnZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2VNb2R1bGUgfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgTnpNZXNzYWdlRGF0YSwgTnpNZXNzYWdlRGF0YU9wdGlvbnMsIE56TWVzc2FnZVJlZiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogTnpNZXNzYWdlU2VydmljZU1vZHVsZVxufSlcbmV4cG9ydCBjbGFzcyBOek1lc3NhZ2VTZXJ2aWNlIGV4dGVuZHMgTnpNTlNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgY29udGFpbmVyPzogTnpNZXNzYWdlQ29udGFpbmVyQ29tcG9uZW50O1xuICBwcm90ZWN0ZWQgY29tcG9uZW50UHJlZml4ID0gJ21lc3NhZ2UtJztcblxuICBjb25zdHJ1Y3RvcihuelNpbmdsZXRvblNlcnZpY2U6IE56U2luZ2xldG9uU2VydmljZSwgb3ZlcmxheTogT3ZlcmxheSwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgc3VwZXIobnpTaW5nbGV0b25TZXJ2aWNlLCBvdmVybGF5LCBpbmplY3Rvcik7XG4gIH1cblxuICBzdWNjZXNzKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+LCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ3N1Y2Nlc3MnLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgZXJyb3IoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnZXJyb3InLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgaW5mbyhjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiwgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zKTogTnpNZXNzYWdlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdpbmZvJywgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHdhcm5pbmcoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnd2FybmluZycsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBsb2FkaW5nKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+LCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ2xvYWRpbmcnLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnbG9hZGluZycgfCBzdHJpbmcsXG4gICAgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sXG4gICAgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zXG4gICk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnN0YW5jZShtZXNzYWdlOiBOek1lc3NhZ2VEYXRhLCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy53aXRoQ29udGFpbmVyKE56TWVzc2FnZUNvbnRhaW5lckNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY3JlYXRlKHtcbiAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAuLi57XG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgbWVzc2FnZUlkOiB0aGlzLmdldEluc3RhbmNlSWQoKSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=