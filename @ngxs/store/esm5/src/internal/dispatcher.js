/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { EMPTY, forkJoin, of, Subject, throwError } from 'rxjs';
import { exhaustMap, filter, shareReplay, take } from 'rxjs/operators';
import { compose } from '../utils/compose';
import { InternalActions } from '../actions-stream';
import { StateStream } from './state-stream';
import { PluginManager } from '../plugin-manager';
import { InternalNgxsExecutionStrategy } from '../execution/internal-ngxs-execution-strategy';
import { leaveNgxs } from '../operators/leave-ngxs';
import { getActionTypeFromInstance } from '../utils/utils';
/**
 * Internal Action result stream that is emitted when an action is completed.
 * This is used as a method of returning the action result to the dispatcher
 * for the observable returned by the dispatch(...) call.
 * The dispatcher then asynchronously pushes the result from this stream onto the main action stream as a result.
 */
var InternalDispatchedActionResults = /** @class */ (function (_super) {
    tslib_1.__extends(InternalDispatchedActionResults, _super);
    function InternalDispatchedActionResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalDispatchedActionResults.decorators = [
        { type: Injectable }
    ];
    return InternalDispatchedActionResults;
}(Subject));
export { InternalDispatchedActionResults };
var InternalDispatcher = /** @class */ (function () {
    function InternalDispatcher(_injector, _actions, _actionResults, _pluginManager, _stateStream, _ngxsExecutionStrategy) {
        this._injector = _injector;
        this._actions = _actions;
        this._actionResults = _actionResults;
        this._pluginManager = _pluginManager;
        this._stateStream = _stateStream;
        this._ngxsExecutionStrategy = _ngxsExecutionStrategy;
    }
    /**
     * Dispatches event(s).
     */
    /**
     * Dispatches event(s).
     * @param {?} actionOrActions
     * @return {?}
     */
    InternalDispatcher.prototype.dispatch = /**
     * Dispatches event(s).
     * @param {?} actionOrActions
     * @return {?}
     */
    function (actionOrActions) {
        var _this = this;
        /** @type {?} */
        var result = this._ngxsExecutionStrategy.enter((/**
         * @return {?}
         */
        function () {
            return _this.dispatchByEvents(actionOrActions);
        }));
        result.subscribe({
            error: (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                return _this._ngxsExecutionStrategy.leave((/**
                 * @return {?}
                 */
                function () {
                    try {
                        // Retrieve lazily to avoid cyclic dependency exception
                        _this._errorHandler = _this._errorHandler || _this._injector.get(ErrorHandler);
                        _this._errorHandler.handleError(error);
                    }
                    catch (_a) { }
                }));
            })
        });
        return result.pipe(leaveNgxs(this._ngxsExecutionStrategy));
    };
    /**
     * @private
     * @param {?} actionOrActions
     * @return {?}
     */
    InternalDispatcher.prototype.dispatchByEvents = /**
     * @private
     * @param {?} actionOrActions
     * @return {?}
     */
    function (actionOrActions) {
        var _this = this;
        if (Array.isArray(actionOrActions)) {
            if (actionOrActions.length === 0)
                return of(this._stateStream.getValue());
            return forkJoin(actionOrActions.map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return _this.dispatchSingle(action); })));
        }
        else {
            return this.dispatchSingle(actionOrActions);
        }
    };
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    InternalDispatcher.prototype.dispatchSingle = /**
     * @private
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var _this = this;
        /** @type {?} */
        var type = getActionTypeFromInstance(action);
        if (!type) {
            /** @type {?} */
            var error = new Error("This action doesn't have a type property: " + action.constructor.name);
            return throwError(error);
        }
        /** @type {?} */
        var prevState = this._stateStream.getValue();
        /** @type {?} */
        var plugins = this._pluginManager.plugins;
        return ((/** @type {?} */ (compose(tslib_1.__spread(plugins, [
            (/**
             * @param {?} nextState
             * @param {?} nextAction
             * @return {?}
             */
            function (nextState, nextAction) {
                if (nextState !== prevState) {
                    _this._stateStream.next(nextState);
                }
                /** @type {?} */
                var actionResult$ = _this.getActionResultStream(nextAction);
                actionResult$.subscribe((/**
                 * @param {?} ctx
                 * @return {?}
                 */
                function (ctx) { return _this._actions.next(ctx); }));
                _this._actions.next({ action: nextAction, status: "DISPATCHED" /* Dispatched */ });
                return _this.createDispatchObservable(actionResult$);
            })
        ]))(prevState, action)))).pipe(shareReplay());
    };
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    InternalDispatcher.prototype.getActionResultStream = /**
     * @private
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return this._actionResults.pipe(filter((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) { return ctx.action === action && ctx.status !== "DISPATCHED" /* Dispatched */; })), take(1), shareReplay());
    };
    /**
     * @private
     * @param {?} actionResult$
     * @return {?}
     */
    InternalDispatcher.prototype.createDispatchObservable = /**
     * @private
     * @param {?} actionResult$
     * @return {?}
     */
    function (actionResult$) {
        var _this = this;
        return actionResult$
            .pipe(exhaustMap((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            switch (ctx.status) {
                case "SUCCESSFUL" /* Successful */:
                    return of(_this._stateStream.getValue());
                case "ERRORED" /* Errored */:
                    return throwError(ctx.error);
                default:
                    return EMPTY;
            }
        })))
            .pipe(shareReplay());
    };
    InternalDispatcher.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InternalDispatcher.ctorParameters = function () { return [
        { type: Injector },
        { type: InternalActions },
        { type: InternalDispatchedActionResults },
        { type: PluginManager },
        { type: StateStream },
        { type: InternalNgxsExecutionStrategy }
    ]; };
    return InternalDispatcher;
}());
export { InternalDispatcher };
if (false) {
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._errorHandler;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._actionResults;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._pluginManager;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._stateStream;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._ngxsExecutionStrategy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL2ludGVybmFsL2Rpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQStCLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBUTNEO0lBQ3FELDJEQUFzQjtJQUQzRTs7SUFDNkUsQ0FBQzs7Z0JBRDdFLFVBQVU7O0lBQ2tFLHNDQUFDO0NBQUEsQUFEOUUsQ0FDcUQsT0FBTyxHQUFrQjtTQUFqRSwrQkFBK0I7QUFFNUM7SUFJRSw0QkFDVSxTQUFtQixFQUNuQixRQUF5QixFQUN6QixjQUErQyxFQUMvQyxjQUE2QixFQUM3QixZQUF5QixFQUN6QixzQkFBcUQ7UUFMckQsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixhQUFRLEdBQVIsUUFBUSxD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SUFnR0M7U0EvRlksa0JBQWtCOzs7Ozs7SUFDN0IsMkNBQW9DOzs7OztJQUdsQyx1Q0FBMkI7Ozs7O0lBQzNCLHNDQUFpQzs7Ozs7SUFDakMsNENBQXVEOzs7OztJQUN2RCw0Q0FBcUM7Ozs7O0lBQ3JDLDBDQUFpQzs7Ozs7SUFDakMsb0RBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFTVBUWSwgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGV4aGF1c3RNYXAsIGZpbHRlciwgc2hhcmVSZXBsYXksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnLi4vdXRpbHMvY29tcG9zZSc7XHJcbmltcG9ydCB7IEFjdGlvbkNvbnRleHQsIEFjdGlvblN0YXR1cywgSW50ZXJuYWxBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy1zdHJlYW0nO1xyXG5pbXBvcnQgeyBTdGF0ZVN0cmVhbSB9IGZyb20gJy4vc3RhdGUtc3RyZWFtJztcclxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJztcclxuaW1wb3J0IHsgSW50ZXJuYWxOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9leGVjdXRpb24vaW50ZXJuYWwtbmd4cy1leGVjdXRpb24tc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBsZWF2ZU5neHMgfSBmcm9tICcuLi9vcGVyYXRvcnMvbGVhdmUtbmd4cyc7XHJcbmltcG9ydCB7IGdldEFjdGlvblR5cGVGcm9tSW5zdGFuY2UgfSBmcm9tICcuLi91dGlscy91dGlscyc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgQWN0aW9uIHJlc3VsdCBzdHJlYW0gdGhhdCBpcyBlbWl0dGVkIHdoZW4gYW4gYWN0aW9uIGlzIGNvbXBsZXRlZC5cclxuICogVGhpcyBpcyB1c2VkIGFzIGEgbWV0aG9kIG9mIHJldHVybmluZyB0aGUgYWN0aW9uIHJlc3VsdCB0byB0aGUgZGlzcGF0Y2hlclxyXG4gKiBmb3IgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlIGRpc3BhdGNoKC4uLikgY2FsbC5cclxuICogVGhlIGRpc3BhdGNoZXIgdGhlbiBhc3luY2hyb25vdXNseSBwdXNoZXMgdGhlIHJlc3VsdCBmcm9tIHRoaXMgc3RyZWFtIG9udG8gdGhlIG1haW4gYWN0aW9uIHN0cmVhbSBhcyBhIHJlc3VsdC5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEludGVybmFsRGlzcGF0Y2hlZEFjdGlvblJlc3VsdHMgZXh0ZW5kcyBTdWJqZWN0PEFjdGlvbkNvbnRleHQ+IHt9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnRlcm5hbERpc3BhdGNoZXIge1xyXG4gIHByaXZhdGUgX2Vycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgX2FjdGlvbnM6IEludGVybmFsQWN0aW9ucyxcclxuICAgIHByaXZhdGUgX2FjdGlvblJlc3VsdHM6IEludGVybmFsRGlzcGF0Y2hlZEFjdGlvblJlc3VsdHMsXHJcbiAgICBwcml2YXRlIF9wbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyLFxyXG4gICAgcHJpdmF0ZSBfc3RhdGVTdHJlYW06IFN0YXRlU3RyZWFtLFxyXG4gICAgcHJpdmF0ZSBfbmd4c0V4ZWN1dGlvblN0cmF0ZWd5OiBJbnRlcm5hbE5neHNFeGVjdXRpb25TdHJhdGVneVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGF0Y2hlcyBldmVudChzKS5cclxuICAgKi9cclxuICBkaXNwYXRjaChhY3Rpb25PckFjdGlvbnM6IGFueSB8IGFueVtdKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX25neHNFeGVjdXRpb25TdHJhdGVneS5lbnRlcigoKSA9PlxyXG4gICAgICB0aGlzLmRpc3BhdGNoQnlFdmVudHMoYWN0aW9uT3JBY3Rpb25zKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXN1bHQuc3Vic2NyaWJlKHtcclxuICAgICAgZXJyb3I6IGVycm9yID0+XHJcbiAgICAgICAgdGhpcy5fbmd4c0V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKCgpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGxhemlseSB0byBhdm9pZCBjeWNsaWMgZGVwZW5kZW5jeSBleGNlcHRpb25cclxuICAgICAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVyID0gdGhpcy5fZXJyb3JIYW5kbGVyIHx8IHRoaXMuX2luamVjdG9yLmdldChFcnJvckhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgfSBjYXRjaCB7fVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobGVhdmVOZ3hzKHRoaXMuX25neHNFeGVjdXRpb25TdHJhdGVneSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaEJ5RXZlbnRzKGFjdGlvbk9yQWN0aW9uczogYW55IHwgYW55W10pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYWN0aW9uT3JBY3Rpb25zKSkge1xyXG4gICAgICBpZiAoYWN0aW9uT3JBY3Rpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKHRoaXMuX3N0YXRlU3RyZWFtLmdldFZhbHVlKCkpO1xyXG4gICAgICByZXR1cm4gZm9ya0pvaW4oYWN0aW9uT3JBY3Rpb25zLm1hcChhY3Rpb24gPT4gdGhpcy5kaXNwYXRjaFNpbmdsZShhY3Rpb24pKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaFNpbmdsZShhY3Rpb25PckFjdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaFNpbmdsZShhY3Rpb246IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnZXRBY3Rpb25UeXBlRnJvbUluc3RhbmNlKGFjdGlvbik7XHJcbiAgICBpZiAoIXR5cGUpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFRoaXMgYWN0aW9uIGRvZXNuJ3QgaGF2ZSBhIHR5cGUgcHJvcGVydHk6ICR7YWN0aW9uLmNvbnN0cnVjdG9yLm5hbWV9YFxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldlN0YXRlID0gdGhpcy5fc3RhdGVTdHJlYW0uZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5NYW5hZ2VyLnBsdWdpbnM7XHJcblxyXG4gICAgcmV0dXJuIChjb21wb3NlKFtcclxuICAgICAgLi4ucGx1Z2lucyxcclxuICAgICAgKG5leHRTdGF0ZTogYW55LCBuZXh0QWN0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAobmV4dFN0YXRlICE9PSBwcmV2U3RhdGUpIHtcclxuICAgICAgICAgIHRoaXMuX3N0YXRlU3RyZWFtLm5leHQobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aW9uUmVzdWx0JCA9IHRoaXMuZ2V0QWN0aW9uUmVzdWx0U3RyZWFtKG5leHRBY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvblJlc3VsdCQuc3Vic2NyaWJlKGN0eCA9PiB0aGlzLl9hY3Rpb25zLm5leHQoY3R4KSk7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5uZXh0KHsgYWN0aW9uOiBuZXh0QWN0aW9uLCBzdGF0dXM6IEFjdGlvblN0YXR1cy5EaXNwYXRjaGVkIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpc3BhdGNoT2JzZXJ2YWJsZShhY3Rpb25SZXN1bHQkKTtcclxuICAgICAgfVxyXG4gICAgXSkocHJldlN0YXRlLCBhY3Rpb24pIGFzIE9ic2VydmFibGU8YW55PikucGlwZShzaGFyZVJlcGxheSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWN0aW9uUmVzdWx0U3RyZWFtKGFjdGlvbjogYW55KTogT2JzZXJ2YWJsZTxBY3Rpb25Db250ZXh0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uUmVzdWx0cy5waXBlKFxyXG4gICAgICBmaWx0ZXIoXHJcbiAgICAgICAgKGN0eDogQWN0aW9uQ29udGV4dCkgPT4gY3R4LmFjdGlvbiA9PT0gYWN0aW9uICYmIGN0eC5zdGF0dXMgIT09IEFjdGlvblN0YXR1cy5EaXNwYXRjaGVkXHJcbiAgICAgICksXHJcbiAgICAgIHRha2UoMSksXHJcbiAgICAgIHNoYXJlUmVwbGF5KClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZURpc3BhdGNoT2JzZXJ2YWJsZShhY3Rpb25SZXN1bHQkOiBPYnNlcnZhYmxlPEFjdGlvbkNvbnRleHQ+KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBhY3Rpb25SZXN1bHQkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGV4aGF1c3RNYXAoKGN0eDogQWN0aW9uQ29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgc3dpdGNoIChjdHguc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uU3RhdHVzLlN1Y2Nlc3NmdWw6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuX3N0YXRlU3RyZWFtLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblN0YXR1cy5FcnJvcmVkOlxyXG4gICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGN0eC5lcnJvcik7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==