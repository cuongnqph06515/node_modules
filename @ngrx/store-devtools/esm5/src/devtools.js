import { __decorate, __metadata, __param, __read } from "tslib";
import { Injectable, Inject, ErrorHandler } from '@angular/core';
import { ActionsSubject, INITIAL_STATE, ReducerObservable, ScannedActionsSubject, } from '@ngrx/store';
import { merge, queueScheduler, ReplaySubject, } from 'rxjs';
import { map, observeOn, scan, skip, withLatestFrom } from 'rxjs/operators';
import * as Actions from './actions';
import { STORE_DEVTOOLS_CONFIG, StoreDevtoolsConfig } from './config';
import { DevtoolsExtension } from './extension';
import { liftInitialState, liftReducerWith } from './reducer';
import { liftAction, unliftState, shouldFilterActions, filterLiftedState, } from './utils';
import { DevtoolsDispatcher } from './devtools-dispatcher';
import { PERFORM_ACTION } from './actions';
var StoreDevtools = /** @class */ (function () {
    function StoreDevtools(dispatcher, actions$, reducers$, extension, scannedActions, errorHandler, initialState, config) {
        var _this = this;
        var liftedInitialState = liftInitialState(initialState, config.monitor);
        var liftReducer = liftReducerWith(initialState, liftedInitialState, errorHandler, config.monitor, config);
        var liftedAction$ = merge(merge(actions$.asObservable().pipe(skip(1)), extension.actions$).pipe(map(liftAction)), dispatcher, extension.liftedActions$).pipe(observeOn(queueScheduler));
        var liftedReducer$ = reducers$.pipe(map(liftReducer));
        var liftedStateSubject = new ReplaySubject(1);
        var liftedStateSubscription = liftedAction$
            .pipe(withLatestFrom(liftedReducer$), scan(function (_a, _b) {
            var liftedState = _a.state;
            var _c = __read(_b, 2), action = _c[0], reducer = _c[1];
            var reducedLiftedState = reducer(liftedState, action);
            // On full state update
            // If we have actions filters, we must filter completely our lifted state to be sync with the extension
            if (action.type !== PERFORM_ACTION && shouldFilterActions(config)) {
                reducedLiftedState = filterLiftedState(reducedLiftedState, config.predicate, config.actionsSafelist, config.actionsBlocklist);
            }
            // Extension should be sent the sanitized lifted state
            extension.notify(action, reducedLiftedState);
            return { state: reducedLiftedState, action: action };
        }, { state: liftedInitialState, action: null }))
            .subscribe(function (_a) {
            var state = _a.state, action = _a.action;
            liftedStateSubject.next(state);
            if (action.type === Actions.PERFORM_ACTION) {
                var unliftedAction = action.action;
                scannedActions.next(unliftedAction);
            }
        });
        var extensionStartSubscription = extension.start$.subscribe(function () {
            _this.refresh();
        });
        var liftedState$ = liftedStateSubject.asObservable();
        var state$ = liftedState$.pipe(map(unliftState));
        this.extensionStartSubscription = extensionStartSubscription;
        this.stateSubscription = liftedStateSubscription;
        this.dispatcher = dispatcher;
        this.liftedState = liftedState$;
        this.state = state$;
    }
    StoreDevtools.prototype.dispatch = function (action) {
        this.dispatcher.next(action);
    };
    StoreDevtools.prototype.next = function (action) {
        this.dispatcher.next(action);
    };
    StoreDevtools.prototype.error = function (error) { };
    StoreDevtools.prototype.complete = function () { };
    StoreDevtools.prototype.performAction = function (action) {
        this.dispatch(new Actions.PerformAction(action, +Date.now()));
    };
    StoreDevtools.prototype.refresh = function () {
        this.dispatch(new Actions.Refresh());
    };
    StoreDevtools.prototype.reset = function () {
        this.dispatch(new Actions.Reset(+Date.now()));
    };
    StoreDevtools.prototype.rollback = function () {
        this.dispatch(new Actions.Rollback(+Date.now()));
    };
    StoreDevtools.prototype.commit = function () {
        this.dispatch(new Actions.Commit(+Date.now()));
    };
    StoreDevtools.prototype.sweep = function () {
        this.dispatch(new Actions.Sweep());
    };
    StoreDevtools.prototype.toggleAction = function (id) {
        this.dispatch(new Actions.ToggleAction(id));
    };
    StoreDevtools.prototype.jumpToAction = function (actionId) {
        this.dispatch(new Actions.JumpToAction(actionId));
    };
    StoreDevtools.prototype.jumpToState = function (index) {
        this.dispatch(new Actions.JumpToState(index));
    };
    StoreDevtools.prototype.importState = function (nextLiftedState) {
        this.dispatch(new Actions.ImportState(nextLiftedState));
    };
    StoreDevtools.prototype.lockChanges = function (status) {
        this.dispatch(new Actions.LockChanges(status));
    };
    StoreDevtools.prototype.pauseRecording = function (status) {
        this.dispatch(new Actions.PauseRecording(status));
    };
    StoreDevtools = __decorate([
        Injectable(),
        __param(6, Inject(INITIAL_STATE)),
        __param(7, Inject(STORE_DEVTOOLS_CONFIG)),
        __metadata("design:paramtypes", [DevtoolsDispatcher,
            ActionsSubject,
            ReducerObservable,
            DevtoolsExtension,
            ScannedActionsSubject,
            ErrorHandler, Object, StoreDevtoolsConfig])
    ], StoreDevtools);
    return StoreDevtools;
}());
export { StoreDevtools };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2dG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlLWRldnRvb2xzL3NyYy9kZXZ0b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFHTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUNMLEtBQUssRUFHTCxjQUFjLEVBQ2QsYUFBYSxHQUVkLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RSxPQUFPLEtBQUssT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBZSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0UsT0FBTyxFQUNMLFVBQVUsRUFDVixXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGlCQUFpQixHQUNsQixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzNDO0lBT0UsdUJBQ0UsVUFBOEIsRUFDOUIsUUFBd0IsRUFDeEIsU0FBNEIsRUFDNUIsU0FBNEIsRUFDNUIsY0FBcUMsRUFDckMsWUFBMEIsRUFDSCxZQUFpQixFQUNULE1BQTJCO1FBUjVELGlCQW9G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QUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgT2JzZXJ2ZXIsXG4gIHF1ZXVlU2NoZWR1bGVyLFxuICBSZXBsYXlTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBvYnNlcnZlT24sIHNjYW4sIHNraXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTVE9SRV9ERVZUT09MU19DT05GSUcsIFN0b3JlRGV2dG9vbHNDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBEZXZ0b29sc0V4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9uJztcbmltcG9ydCB7IExpZnRlZFN0YXRlLCBsaWZ0SW5pdGlhbFN0YXRlLCBsaWZ0UmVkdWNlcldpdGggfSBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHtcbiAgbGlmdEFjdGlvbixcbiAgdW5saWZ0U3RhdGUsXG4gIHNob3VsZEZpbHRlckFjdGlvbnMsXG4gIGZpbHRlckxpZnRlZFN0YXRlLFxufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IERldnRvb2xzRGlzcGF0Y2hlciB9IGZyb20gJy4vZGV2dG9vbHMtZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyBQRVJGT1JNX0FDVElPTiB9IGZyb20gJy4vYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZURldnRvb2xzIGltcGxlbWVudHMgT2JzZXJ2ZXI8YW55PiB7XG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBleHRlbnNpb25TdGFydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgZGlzcGF0Y2hlcjogQWN0aW9uc1N1YmplY3Q7XG4gIHB1YmxpYyBsaWZ0ZWRTdGF0ZTogT2JzZXJ2YWJsZTxMaWZ0ZWRTdGF0ZT47XG4gIHB1YmxpYyBzdGF0ZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRpc3BhdGNoZXI6IERldnRvb2xzRGlzcGF0Y2hlcixcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlcnMkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBleHRlbnNpb246IERldnRvb2xzRXh0ZW5zaW9uLFxuICAgIHNjYW5uZWRBY3Rpb25zOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IGFueSxcbiAgICBASW5qZWN0KFNUT1JFX0RFVlRPT0xTX0NPTkZJRykgY29uZmlnOiBTdG9yZURldnRvb2xzQ29uZmlnXG4gICkge1xuICAgIGNvbnN0IGxpZnRlZEluaXRpYWxTdGF0ZSA9IGxpZnRJbml0aWFsU3RhdGUoaW5pdGlhbFN0YXRlLCBjb25maWcubW9uaXRvcik7XG4gICAgY29uc3QgbGlmdFJlZHVjZXIgPSBsaWZ0UmVkdWNlcldpdGgoXG4gICAgICBpbml0aWFsU3RhdGUsXG4gICAgICBsaWZ0ZWRJbml0aWFsU3RhdGUsXG4gICAgICBlcnJvckhhbmRsZXIsXG4gICAgICBjb25maWcubW9uaXRvcixcbiAgICAgIGNvbmZpZ1xuICAgICk7XG5cbiAgICBjb25zdCBsaWZ0ZWRBY3Rpb24kID0gbWVyZ2UoXG4gICAgICBtZXJnZShhY3Rpb25zJC5hc09ic2VydmFibGUoKS5waXBlKHNraXAoMSkpLCBleHRlbnNpb24uYWN0aW9ucyQpLnBpcGUoXG4gICAgICAgIG1hcChsaWZ0QWN0aW9uKVxuICAgICAgKSxcbiAgICAgIGRpc3BhdGNoZXIsXG4gICAgICBleHRlbnNpb24ubGlmdGVkQWN0aW9ucyRcbiAgICApLnBpcGUob2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKSk7XG5cbiAgICBjb25zdCBsaWZ0ZWRSZWR1Y2VyJCA9IHJlZHVjZXJzJC5waXBlKG1hcChsaWZ0UmVkdWNlcikpO1xuXG4gICAgY29uc3QgbGlmdGVkU3RhdGVTdWJqZWN0ID0gbmV3IFJlcGxheVN1YmplY3Q8TGlmdGVkU3RhdGU+KDEpO1xuXG4gICAgY29uc3QgbGlmdGVkU3RhdGVTdWJzY3JpcHRpb24gPSBsaWZ0ZWRBY3Rpb24kXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20obGlmdGVkUmVkdWNlciQpLFxuICAgICAgICBzY2FuPFxuICAgICAgICAgIFthbnksIEFjdGlvblJlZHVjZXI8TGlmdGVkU3RhdGUsIEFjdGlvbnMuQWxsPl0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGU6IExpZnRlZFN0YXRlO1xuICAgICAgICAgICAgYWN0aW9uOiBhbnk7XG4gICAgICAgICAgfVxuICAgICAgICA+KFxuICAgICAgICAgICh7IHN0YXRlOiBsaWZ0ZWRTdGF0ZSB9LCBbYWN0aW9uLCByZWR1Y2VyXSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlZHVjZWRMaWZ0ZWRTdGF0ZSA9IHJlZHVjZXIobGlmdGVkU3RhdGUsIGFjdGlvbik7XG4gICAgICAgICAgICAvLyBPbiBmdWxsIHN0YXRlIHVwZGF0ZVxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhY3Rpb25zIGZpbHRlcnMsIHdlIG11c3QgZmlsdGVyIGNvbXBsZXRlbHkgb3VyIGxpZnRlZCBzdGF0ZSB0byBiZSBzeW5jIHdpdGggdGhlIGV4dGVuc2lvblxuICAgICAgICAgICAgaWYgKGFjdGlvbi50eXBlICE9PSBQRVJGT1JNX0FDVElPTiAmJiBzaG91bGRGaWx0ZXJBY3Rpb25zKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgcmVkdWNlZExpZnRlZFN0YXRlID0gZmlsdGVyTGlmdGVkU3RhdGUoXG4gICAgICAgICAgICAgICAgcmVkdWNlZExpZnRlZFN0YXRlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5wcmVkaWNhdGUsXG4gICAgICAgICAgICAgICAgY29uZmlnLmFjdGlvbnNTYWZlbGlzdCxcbiAgICAgICAgICAgICAgICBjb25maWcuYWN0aW9uc0Jsb2NrbGlzdFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRXh0ZW5zaW9uIHNob3VsZCBiZSBzZW50IHRoZSBzYW5pdGl6ZWQgbGlmdGVkIHN0YXRlXG4gICAgICAgICAgICBleHRlbnNpb24ubm90aWZ5KGFjdGlvbiwgcmVkdWNlZExpZnRlZFN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXRlOiByZWR1Y2VkTGlmdGVkU3RhdGUsIGFjdGlvbiB9O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBzdGF0ZTogbGlmdGVkSW5pdGlhbFN0YXRlLCBhY3Rpb246IG51bGwgYXMgYW55IH1cbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBzdGF0ZSwgYWN0aW9uIH0pID0+IHtcbiAgICAgICAgbGlmdGVkU3RhdGVTdWJqZWN0Lm5leHQoc3RhdGUpO1xuXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5QRVJGT1JNX0FDVElPTikge1xuICAgICAgICAgIGNvbnN0IHVubGlmdGVkQWN0aW9uID0gKGFjdGlvbiBhcyBBY3Rpb25zLlBlcmZvcm1BY3Rpb24pLmFjdGlvbjtcblxuICAgICAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQodW5saWZ0ZWRBY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGV4dGVuc2lvblN0YXJ0U3Vic2NyaXB0aW9uID0gZXh0ZW5zaW9uLnN0YXJ0JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsaWZ0ZWRTdGF0ZSQgPSBsaWZ0ZWRTdGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCkgYXMgT2JzZXJ2YWJsZTxcbiAgICAgIExpZnRlZFN0YXRlXG4gICAgPjtcbiAgICBjb25zdCBzdGF0ZSQgPSBsaWZ0ZWRTdGF0ZSQucGlwZShtYXAodW5saWZ0U3RhdGUpKTtcblxuICAgIHRoaXMuZXh0ZW5zaW9uU3RhcnRTdWJzY3JpcHRpb24gPSBleHRlbnNpb25TdGFydFN1YnNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID0gbGlmdGVkU3RhdGVTdWJzY3JpcHRpb247XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICB0aGlzLmxpZnRlZFN0YXRlID0gbGlmdGVkU3RhdGUkO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSQ7XG4gIH1cblxuICBkaXNwYXRjaChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBuZXh0KGFjdGlvbjogYW55KSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycm9yOiBhbnkpIHt9XG5cbiAgY29tcGxldGUoKSB7fVxuXG4gIHBlcmZvcm1BY3Rpb24oYWN0aW9uOiBhbnkpIHtcbiAgICB0aGlzLmRpc3BhdGNoKG5ldyBBY3Rpb25zLlBlcmZvcm1BY3Rpb24oYWN0aW9uLCArRGF0ZS5ub3coKSkpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoKG5ldyBBY3Rpb25zLlJlZnJlc2goKSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoKG5ldyBBY3Rpb25zLlJlc2V0KCtEYXRlLm5vdygpKSk7XG4gIH1cblxuICByb2xsYmFjaygpIHtcbiAgICB0aGlzLmRpc3BhdGNoKG5ldyBBY3Rpb25zLlJvbGxiYWNrKCtEYXRlLm5vdygpKSk7XG4gIH1cblxuICBjb21taXQoKSB7XG4gICAgdGhpcy5kaXNwYXRjaChuZXcgQWN0aW9ucy5Db21taXQoK0RhdGUubm93KCkpKTtcbiAgfVxuXG4gIHN3ZWVwKCkge1xuICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFjdGlvbnMuU3dlZXAoKSk7XG4gIH1cblxuICB0b2dnbGVBY3Rpb24oaWQ6IG51bWJlcikge1xuICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFjdGlvbnMuVG9nZ2xlQWN0aW9uKGlkKSk7XG4gIH1cblxuICBqdW1wVG9BY3Rpb24oYWN0aW9uSWQ6IG51bWJlcikge1xuICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFjdGlvbnMuSnVtcFRvQWN0aW9uKGFjdGlvbklkKSk7XG4gIH1cblxuICBqdW1wVG9TdGF0ZShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5kaXNwYXRjaChuZXcgQWN0aW9ucy5KdW1wVG9TdGF0ZShpbmRleCkpO1xuICB9XG5cbiAgaW1wb3J0U3RhdGUobmV4dExpZnRlZFN0YXRlOiBhbnkpIHtcbiAgICB0aGlzLmRpc3BhdGNoKG5ldyBBY3Rpb25zLkltcG9ydFN0YXRlKG5leHRMaWZ0ZWRTdGF0ZSkpO1xuICB9XG5cbiAgbG9ja0NoYW5nZXMoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNwYXRjaChuZXcgQWN0aW9ucy5Mb2NrQ2hhbmdlcyhzdGF0dXMpKTtcbiAgfVxuXG4gIHBhdXNlUmVjb3JkaW5nKHN0YXR1czogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFjdGlvbnMuUGF1c2VSZWNvcmRpbmcoc3RhdHVzKSk7XG4gIH1cbn1cbiJdfQ==