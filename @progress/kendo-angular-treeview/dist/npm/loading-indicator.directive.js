"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var expand_state_service_1 = require("./expand-state.service");
var loading_notification_service_1 = require("./loading-notification.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
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
            .pipe(operators_1.filter(function (index) { return index === _this.index; }));
        this.subscription = this.expandService
            .changes
            .pipe(operators_1.filter(function (_a) {
            var index = _a.index;
            return index === _this.index;
        }), operators_1.tap(function (_a) {
            var expand = _a.expand;
            if (!expand && _this.loading) {
                _this.loading = false;
            }
        }), operators_1.filter(function (_a) {
            var expand = _a.expand;
            return expand;
        }), operators_1.switchMap(function (x) { return rxjs_1.of(x).pipe(operators_1.delay(100), operators_1.takeUntil(loadingNotifications)); }))
            .subscribe(function () { return _this.loading = true; });
        this.subscription.add(loadingNotifications.subscribe(function () { return _this.loading = false; }));
    };
    LoadingIndicatorDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    LoadingIndicatorDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewLoading]' },] },
    ];
    /** @nocollapse */
    LoadingIndicatorDirective.ctorParameters = function () { return [
        { type: expand_state_service_1.ExpandStateService },
        { type: loading_notification_service_1.LoadingNotificationService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    LoadingIndicatorDirective.propDecorators = {
        loading: [{ type: core_1.HostBinding, args: ["class.k-i-loading",] }],
        index: [{ type: core_1.Input, args: ["kendoTreeViewLoading",] }]
    };
    return LoadingIndicatorDirective;
}());
exports.LoadingIndicatorDirective = LoadingIndicatorDirective;
