import { Directive, ChangeDetectorRef, HostBinding, Input } from '@angular/core';
import { ExpandStateService } from './expand-state.service';
import { LoadingNotificationService } from './loading-notification.service';
import { of } from 'rxjs';
import { delay, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
/**
 * @hidden
 */
var LoadingIndicatorDirective = /** @class */ (function () {
    function LoadingIndicatorDirective(expandService, loadingService, cd) {
        this.expandService = expandService;
        this.loadingService = loadingService;
        this.cd = cd;
        this._loading = false;
    }
    Object.defineProperty(LoadingIndicatorDirective.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            this._loading = value;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    LoadingIndicatorDirective.prototype.ngOnInit = function () {
        var _this = this;
        var loadingNotifications = this.loadingService
            .changes
            .pipe(filter(function (index) { return index === _this.index; }));
        this.subscription = this.expandService
            .changes
            .pipe(filter(function (_a) {
            var index = _a.index;
            return index === _this.index;
        }), tap(function (_a) {
            var expand = _a.expand;
            if (!expand && _this.loading) {
                _this.loading = false;
            }
        }), filter(function (_a) {
            var expand = _a.expand;
            return expand;
        }), switchMap(function (x) { return of(x).pipe(delay(100), takeUntil(loadingNotifications)); }))
            .subscribe(function () { return _this.loading = true; });
        this.subscription.add(loadingNotifications.subscribe(function () { return _this.loading = false; }));
    };
    LoadingIndicatorDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    LoadingIndicatorDirective.decorators = [
        { type: Directive, args: [{ selector: '[kendoTreeViewLoading]' },] },
    ];
    /** @nocollapse */
    LoadingIndicatorDirective.ctorParameters = function () { return [
        { type: ExpandStateService },
        { type: LoadingNotificationService },
        { type: ChangeDetectorRef }
    ]; };
    LoadingIndicatorDirective.propDecorators = {
        loading: [{ type: HostBinding, args: ["class.k-i-loading",] }],
        index: [{ type: Input, args: ["kendoTreeViewLoading",] }]
    };
    return LoadingIndicatorDirective;
}());
export { LoadingIndicatorDirective };
