/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class InternalDispatchedActionResults extends Subject {
}
InternalDispatchedActionResults.decorators = [
    { type: Injectable }
];
export class InternalDispatcher {
    /**
     * @param {?} _injector
     * @param {?} _actions
     * @param {?} _actionResults
     * @param {?} _pluginManager
     * @param {?} _stateStream
     * @param {?} _ngxsExecutionStrategy
     */
    constructor(_injector, _actions, _actionResults, _pluginManager, _stateStream, _ngxsExecutionStrategy) {
        this._injector = _injector;
        this._actions = _actions;
        this._actionResults = _actionResults;
        this._pluginManager = _pluginManager;
        this._stateStream = _stateStream;
        this._ngxsExecutionStrategy = _ngxsExecutionStrategy;
    }
    /**
     * Dispatches event(s).
     * @param {?} actionOrActions
     * @return {?}
     */
    dispatch(actionOrActions) {
        /** @type {?} */
        const result = this._ngxsExecutionStrategy.enter((/**
         * @return {?}
         */
        () => this.dispatchByEvents(actionOrActions)));
        result.subscribe({
            error: (/**
             * @param {?} error
             * @return {?}
             */
            error => this._ngxsExecutionStrategy.leave((/**
             * @return {?}
             */
            () => {
                try {
                    // Retrieve lazily to avoid cyclic dependency exception
                    this._errorHandler = this._errorHandler || this._injector.get(ErrorHandler);
                    this._errorHandler.handleError(error);
                }
                catch (_a) { }
            })))
        });
        return result.pipe(leaveNgxs(this._ngxsExecutionStrategy));
    }
    /**
     * @private
     * @param {?} actionOrActions
     * @return {?}
     */
    dispatchByEvents(actionOrActions) {
        if (Array.isArray(actionOrActions)) {
            if (actionOrActions.length === 0)
                return of(this._stateStream.getValue());
            return forkJoin(actionOrActions.map((/**
             * @param {?} action
             * @return {?}
             */
            action => this.dispatchSingle(action))));
        }
        else {
            return this.dispatchSingle(actionOrActions);
        }
    }
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    dispatchSingle(action) {
        /** @type {?} */
        const type = getActionTypeFromInstance(action);
        if (!type) {
            /** @type {?} */
            const error = new Error(`This action doesn't have a type property: ${action.constructor.name}`);
            return throwError(error);
        }
        /** @type {?} */
        const prevState = this._stateStream.getValue();
        /** @type {?} */
        const plugins = this._pluginManager.plugins;
        return ((/** @type {?} */ (compose([
            ...plugins,
            (/**
             * @param {?} nextState
             * @param {?} nextAction
             * @return {?}
             */
            (nextState, nextAction) => {
                if (nextState !== prevState) {
                    this._stateStream.next(nextState);
                }
                /** @type {?} */
                const actionResult$ = this.getActionResultStream(nextAction);
                actionResult$.subscribe((/**
                 * @param {?} ctx
                 * @return {?}
                 */
                ctx => this._actions.next(ctx)));
                this._actions.next({ action: nextAction, status: "DISPATCHED" /* Dispatched */ });
                return this.createDispatchObservable(actionResult$);
            })
        ])(prevState, action)))).pipe(shareReplay());
    }
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    getActionResultStream(action) {
        return this._actionResults.pipe(filter((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => ctx.action === action && ctx.status !== "DISPATCHED" /* Dispatched */)), take(1), shareReplay());
    }
    /**
     * @private
     * @param {?} actionResult$
     * @return {?}
     */
    createDispatchObservable(actionResult$) {
        return actionResult$
            .pipe(exhaustMap((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => {
            switch (ctx.status) {
                case "SUCCESSFUL" /* Successful */:
                    return of(this._stateStream.getValue());
                case "ERRORED" /* Errored */:
                    return throwError(ctx.error);
                default:
                    return EMPTY;
            }
        })))
            .pipe(shareReplay());
    }
}
InternalDispatcher.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InternalDispatcher.ctorParameters = () => [
    { type: Injector },
    { type: InternalActions },
    { type: InternalDispatchedActionResults },
    { type: PluginManager },
    { type: StateStream },
    { type: InternalNgxsExecutionStrategy }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL2ludGVybmFsL2Rpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBK0IsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFTM0QsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLE9BQXNCOzs7WUFEMUUsVUFBVTs7QUFJWCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7SUFHN0IsWUFDVSxTQUFtQixFQUNuQixRQUF5QixFQUN6QixjQUErQyxFQUMvQyxjQUE2QixFQUM3QixZQUF5QixFQUN6QixzQkFBcUQ7UUFMckQsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBaUM7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Y3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFTVBUWSwgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGV4aGF1c3RNYXAsIGZpbHRlciwgc2hhcmVSZXBsYXksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnLi4vdXRpbHMvY29tcG9zZSc7XHJcbmltcG9ydCB7IEFjdGlvbkNvbnRleHQsIEFjdGlvblN0YXR1cywgSW50ZXJuYWxBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy1zdHJlYW0nO1xyXG5pbXBvcnQgeyBTdGF0ZVN0cmVhbSB9IGZyb20gJy4vc3RhdGUtc3RyZWFtJztcclxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJztcclxuaW1wb3J0IHsgSW50ZXJuYWxOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9leGVjdXRpb24vaW50ZXJuYWwtbmd4cy1leGVjdXRpb24tc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBsZWF2ZU5neHMgfSBmcm9tICcuLi9vcGVyYXRvcnMvbGVhdmUtbmd4cyc7XHJcbmltcG9ydCB7IGdldEFjdGlvblR5cGVGcm9tSW5zdGFuY2UgfSBmcm9tICcuLi91dGlscy91dGlscyc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgQWN0aW9uIHJlc3VsdCBzdHJlYW0gdGhhdCBpcyBlbWl0dGVkIHdoZW4gYW4gYWN0aW9uIGlzIGNvbXBsZXRlZC5cclxuICogVGhpcyBpcyB1c2VkIGFzIGEgbWV0aG9kIG9mIHJldHVybmluZyB0aGUgYWN0aW9uIHJlc3VsdCB0byB0aGUgZGlzcGF0Y2hlclxyXG4gKiBmb3IgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlIGRpc3BhdGNoKC4uLikgY2FsbC5cclxuICogVGhlIGRpc3BhdGNoZXIgdGhlbiBhc3luY2hyb25vdXNseSBwdXNoZXMgdGhlIHJlc3VsdCBmcm9tIHRoaXMgc3RyZWFtIG9udG8gdGhlIG1haW4gYWN0aW9uIHN0cmVhbSBhcyBhIHJlc3VsdC5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEludGVybmFsRGlzcGF0Y2hlZEFjdGlvblJlc3VsdHMgZXh0ZW5kcyBTdWJqZWN0PEFjdGlvbkNvbnRleHQ+IHt9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnRlcm5hbERpc3BhdGNoZXIge1xyXG4gIHByaXZhdGUgX2Vycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgX2FjdGlvbnM6IEludGVybmFsQWN0aW9ucyxcclxuICAgIHByaXZhdGUgX2FjdGlvblJlc3VsdHM6IEludGVybmFsRGlzcGF0Y2hlZEFjdGlvblJlc3VsdHMsXHJcbiAgICBwcml2YXRlIF9wbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyLFxyXG4gICAgcHJpdmF0ZSBfc3RhdGVTdHJlYW06IFN0YXRlU3RyZWFtLFxyXG4gICAgcHJpdmF0ZSBfbmd4c0V4ZWN1dGlvblN0cmF0ZWd5OiBJbnRlcm5hbE5neHNFeGVjdXRpb25TdHJhdGVneVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGF0Y2hlcyBldmVudChzKS5cclxuICAgKi9cclxuICBkaXNwYXRjaChhY3Rpb25PckFjdGlvbnM6IGFueSB8IGFueVtdKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX25neHNFeGVjdXRpb25TdHJhdGVneS5lbnRlcigoKSA9PlxyXG4gICAgICB0aGlzLmRpc3BhdGNoQnlFdmVudHMoYWN0aW9uT3JBY3Rpb25zKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXN1bHQuc3Vic2NyaWJlKHtcclxuICAgICAgZXJyb3I6IGVycm9yID0+XHJcbiAgICAgICAgdGhpcy5fbmd4c0V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKCgpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGxhemlseSB0byBhdm9pZCBjeWNsaWMgZGVwZW5kZW5jeSBleGNlcHRpb25cclxuICAgICAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVyID0gdGhpcy5fZXJyb3JIYW5kbGVyIHx8IHRoaXMuX2luamVjdG9yLmdldChFcnJvckhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgfSBjYXRjaCB7fVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobGVhdmVOZ3hzKHRoaXMuX25neHNFeGVjdXRpb25TdHJhdGVneSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaEJ5RXZlbnRzKGFjdGlvbk9yQWN0aW9uczogYW55IHwgYW55W10pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYWN0aW9uT3JBY3Rpb25zKSkge1xyXG4gICAgICBpZiAoYWN0aW9uT3JBY3Rpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKHRoaXMuX3N0YXRlU3RyZWFtLmdldFZhbHVlKCkpO1xyXG4gICAgICByZXR1cm4gZm9ya0pvaW4oYWN0aW9uT3JBY3Rpb25zLm1hcChhY3Rpb24gPT4gdGhpcy5kaXNwYXRjaFNpbmdsZShhY3Rpb24pKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaFNpbmdsZShhY3Rpb25PckFjdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaFNpbmdsZShhY3Rpb246IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnZXRBY3Rpb25UeXBlRnJvbUluc3RhbmNlKGFjdGlvbik7XHJcbiAgICBpZiAoIXR5cGUpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFRoaXMgYWN0aW9uIGRvZXNuJ3QgaGF2ZSBhIHR5cGUgcHJvcGVydHk6ICR7YWN0aW9uLmNvbnN0cnVjdG9yLm5hbWV9YFxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldlN0YXRlID0gdGhpcy5fc3RhdGVTdHJlYW0uZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5NYW5hZ2VyLnBsdWdpbnM7XHJcblxyXG4gICAgcmV0dXJuIChjb21wb3NlKFtcclxuICAgICAgLi4ucGx1Z2lucyxcclxuICAgICAgKG5leHRTdGF0ZTogYW55LCBuZXh0QWN0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAobmV4dFN0YXRlICE9PSBwcmV2U3RhdGUpIHtcclxuICAgICAgICAgIHRoaXMuX3N0YXRlU3RyZWFtLm5leHQobmV4dFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aW9uUmVzdWx0JCA9IHRoaXMuZ2V0QWN0aW9uUmVzdWx0U3RyZWFtKG5leHRBY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvblJlc3VsdCQuc3Vic2NyaWJlKGN0eCA9PiB0aGlzLl9hY3Rpb25zLm5leHQoY3R4KSk7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5uZXh0KHsgYWN0aW9uOiBuZXh0QWN0aW9uLCBzdGF0dXM6IEFjdGlvblN0YXR1cy5EaXNwYXRjaGVkIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpc3BhdGNoT2JzZXJ2YWJsZShhY3Rpb25SZXN1bHQkKTtcclxuICAgICAgfVxyXG4gICAgXSkocHJldlN0YXRlLCBhY3Rpb24pIGFzIE9ic2VydmFibGU8YW55PikucGlwZShzaGFyZVJlcGxheSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWN0aW9uUmVzdWx0U3RyZWFtKGFjdGlvbjogYW55KTogT2JzZXJ2YWJsZTxBY3Rpb25Db250ZXh0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uUmVzdWx0cy5waXBlKFxyXG4gICAgICBmaWx0ZXIoXHJcbiAgICAgICAgKGN0eDogQWN0aW9uQ29udGV4dCkgPT4gY3R4LmFjdGlvbiA9PT0gYWN0aW9uICYmIGN0eC5zdGF0dXMgIT09IEFjdGlvblN0YXR1cy5EaXNwYXRjaGVkXHJcbiAgICAgICksXHJcbiAgICAgIHRha2UoMSksXHJcbiAgICAgIHNoYXJlUmVwbGF5KClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZURpc3BhdGNoT2JzZXJ2YWJsZShhY3Rpb25SZXN1bHQkOiBPYnNlcnZhYmxlPEFjdGlvbkNvbnRleHQ+KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBhY3Rpb25SZXN1bHQkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGV4aGF1c3RNYXAoKGN0eDogQWN0aW9uQ29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgc3dpdGNoIChjdHguc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uU3RhdHVzLlN1Y2Nlc3NmdWw6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuX3N0YXRlU3RyZWFtLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblN0YXR1cy5FcnJvcmVkOlxyXG4gICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGN0eC5lcnJvcik7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==