/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { Highlight } from './highlight';
import { HighlightChildren } from './highlight-children';
import { HIGHLIGHT_OPTIONS } from './highlight.model';
export class HighlightModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static forRoot(options) {
        return {
            ngModule: HighlightModule,
            providers: [
                { provide: HIGHLIGHT_OPTIONS, useValue: options }
            ]
        };
    }
}
HighlightModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Highlight, HighlightChildren],
                exports: [Highlight, HighlightChildren]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1oaWdobGlnaHRqcy8iLCJzb3VyY2VzIjpbImxpYi9oaWdobGlnaHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBb0IsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU14RSxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7YUFDaEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDO2FBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGlnaGxpZ2h0IH0gZnJvbSAnLi9oaWdobGlnaHQnO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRDaGlsZHJlbiB9IGZyb20gJy4vaGlnaGxpZ2h0LWNoaWxkcmVuJztcclxuaW1wb3J0IHsgSGlnaGxpZ2h0T3B0aW9ucywgSElHSExJR0hUX09QVElPTlMgfSBmcm9tICcuL2hpZ2hsaWdodC5tb2RlbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW0hpZ2hsaWdodCwgSGlnaGxpZ2h0Q2hpbGRyZW5dLFxyXG4gIGV4cG9ydHM6IFtIaWdobGlnaHQsIEhpZ2hsaWdodENoaWxkcmVuXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBIaWdobGlnaHRPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSGlnaGxpZ2h0TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogSElHSExJR0hUX09QVElPTlMsIHVzZVZhbHVlOiBvcHRpb25zfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=