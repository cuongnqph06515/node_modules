/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */
export { NgxsModule, Action, Store, State, Select, SelectorOptions, Actions, getSelectorMetadata, getStoreMetadata, ensureStoreMetadata, ensureSelectorMetadata, ofAction, ofActionDispatched, ofActionSuccessful, ofActionCanceled, ofActionErrored, ofActionCompleted, NgxsSimpleChange, Selector, getActionTypeFromInstance, actionMatcher, createSelector, NoopNgxsExecutionStrategy, StateToken, NGXS_PLUGINS, StateStream, setValue, getValue, InitState, UpdateState } from './index';
export { InternalActions as ɵb, OrderedSubject as ɵa } from './src/actions-stream';
export { SelectFactory as ɵba } from './src/decorators/select/select-factory';
export { DispatchOutsideZoneNgxsExecutionStrategy as ɵbd } from './src/execution/dispatch-outside-zone-ngxs-execution-strategy';
export { InternalNgxsExecutionStrategy as ɵr } from './src/execution/internal-ngxs-execution-strategy';
export { NGXS_EXECUTION_STRATEGY as ɵj } from './src/execution/symbols';
export { HostEnvironment as ɵt } from './src/host-environment/host-environment';
export { ConfigValidator as ɵs } from './src/internal/config-validator';
export { InternalDispatchedActionResults as ɵm, InternalDispatcher as ɵn } from './src/internal/dispatcher';
export { ensureSelectorMetadata as ɵy, ensureStoreMetadata as ɵw, getSelectorMetadata as ɵz, getStoreMetadata as ɵx } from './src/internal/internals';
export { LifecycleStateManager as ɵbb } from './src/internal/lifecycle-state-manager';
export { StateContextFactory as ɵo } from './src/internal/state-context-factory';
export { StateFactory as ɵl } from './src/internal/state-factory';
export { InternalStateOperations as ɵp } from './src/internal/state-operations';
export { NgxsFeatureModule as ɵbc } from './src/modules/ngxs-feature.module';
export { NgxsRootModule as ɵk } from './src/modules/ngxs-root.module';
export { PluginManager as ɵq } from './src/plugin-manager';
export { FEATURE_STATE_TOKEN as ɵd, NG_DEV_MODE as ɵf, NG_TEST_MODE as ɵe, NgxsConfig as ɵh, ROOT_STATE_TOKEN as ɵc, SELECTOR_META_KEY as ɵg } from './src/symbols';
export { mergeDeep as ɵi } from './src/utils/utils';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsibmd4cy1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsbWRBQWMsU0FBUyxDQUFDO0FBRXhCLE9BQU8sRUFBQyxlQUFlLElBQUksRUFBRSxFQUFDLGNBQWMsSUFBSSxFQUFFLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRixPQUFPLEVBQUMsYUFBYSxJQUFJLEdBQUcsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyx3Q0FBd0MsSUFBSSxHQUFHLEVBQUMsTUFBTSwrREFBK0QsQ0FBQztBQUM5SCxPQUFPLEVBQUMsNkJBQTZCLElBQUksRUFBRSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDckcsT0FBTyxFQUFDLHVCQUF1QixJQUFJLEVBQUUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLElBQUksRUFBRSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGVBQWUsSUFBSSxFQUFFLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsK0JBQStCLElBQUksRUFBRSxFQUFDLGtCQUFrQixJQUFJLEVBQUUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pHLE9BQU8sRUFBeUMsc0JBQXNCLElBQUksRUFBRSxFQUFDLG1CQUFtQixJQUFJLEVBQUUsRUFBQyxtQkFBbUIsSUFBSSxFQUFFLEVBQUMsZ0JBQWdCLElBQUksRUFBRSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekwsT0FBTyxFQUFDLHFCQUFxQixJQUFJLEdBQUcsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxtQkFBbUIsSUFBSSxFQUFFLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsWUFBWSxJQUFJLEVBQUUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyx1QkFBdUIsSUFBSSxFQUFFLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsaUJBQWlCLElBQUksR0FBRyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFDLGNBQWMsSUFBSSxFQUFFLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsYUFBYSxJQUFJLEVBQUUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBQyxtQkFBbUIsSUFBSSxFQUFFLEVBQUMsV0FBVyxJQUFJLEVBQUUsRUFBQyxZQUFZLElBQUksRUFBRSxFQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUMsZ0JBQWdCLElBQUksRUFBRSxFQUFDLGlCQUFpQixJQUFJLEVBQUUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3SixPQUFPLEVBQUMsU0FBUyxJQUFJLEVBQUUsRUFBQyxNQUFNLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IHtJbnRlcm5hbEFjdGlvbnMgYXMgybViLE9yZGVyZWRTdWJqZWN0IGFzIMm1YX0gZnJvbSAnLi9zcmMvYWN0aW9ucy1zdHJlYW0nO1xuZXhwb3J0IHtTZWxlY3RGYWN0b3J5IGFzIMm1YmF9IGZyb20gJy4vc3JjL2RlY29yYXRvcnMvc2VsZWN0L3NlbGVjdC1mYWN0b3J5JztcbmV4cG9ydCB7RGlzcGF0Y2hPdXRzaWRlWm9uZU5neHNFeGVjdXRpb25TdHJhdGVneSBhcyDJtWJkfSBmcm9tICcuL3NyYy9leGVjdXRpb24vZGlzcGF0Y2gtb3V0c2lkZS16b25lLW5neHMtZXhlY3V0aW9uLXN0cmF0ZWd5JztcbmV4cG9ydCB7SW50ZXJuYWxOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kgYXMgybVyfSBmcm9tICcuL3NyYy9leGVjdXRpb24vaW50ZXJuYWwtbmd4cy1leGVjdXRpb24tc3RyYXRlZ3knO1xuZXhwb3J0IHtOR1hTX0VYRUNVVElPTl9TVFJBVEVHWSBhcyDJtWp9IGZyb20gJy4vc3JjL2V4ZWN1dGlvbi9zeW1ib2xzJztcbmV4cG9ydCB7SG9zdEVudmlyb25tZW50IGFzIMm1dH0gZnJvbSAnLi9zcmMvaG9zdC1lbnZpcm9ubWVudC9ob3N0LWVudmlyb25tZW50JztcbmV4cG9ydCB7Q29uZmlnVmFsaWRhdG9yIGFzIMm1c30gZnJvbSAnLi9zcmMvaW50ZXJuYWwvY29uZmlnLXZhbGlkYXRvcic7XG5leHBvcnQge0ludGVybmFsRGlzcGF0Y2hlZEFjdGlvblJlc3VsdHMgYXMgybVtLEludGVybmFsRGlzcGF0Y2hlciBhcyDJtW59IGZyb20gJy4vc3JjL2ludGVybmFsL2Rpc3BhdGNoZXInO1xuZXhwb3J0IHtDYWxsYmFjayBhcyDJtXYsU3RhdGVDbGFzc0ludGVybmFsIGFzIMm1dSxlbnN1cmVTZWxlY3Rvck1ldGFkYXRhIGFzIMm1eSxlbnN1cmVTdG9yZU1ldGFkYXRhIGFzIMm1dyxnZXRTZWxlY3Rvck1ldGFkYXRhIGFzIMm1eixnZXRTdG9yZU1ldGFkYXRhIGFzIMm1eH0gZnJvbSAnLi9zcmMvaW50ZXJuYWwvaW50ZXJuYWxzJztcbmV4cG9ydCB7TGlmZWN5Y2xlU3RhdGVNYW5hZ2VyIGFzIMm1YmJ9IGZyb20gJy4vc3JjL2ludGVybmFsL2xpZmVjeWNsZS1zdGF0ZS1tYW5hZ2VyJztcbmV4cG9ydCB7U3RhdGVDb250ZXh0RmFjdG9yeSBhcyDJtW99IGZyb20gJy4vc3JjL2ludGVybmFsL3N0YXRlLWNvbnRleHQtZmFjdG9yeSc7XG5leHBvcnQge1N0YXRlRmFjdG9yeSBhcyDJtWx9IGZyb20gJy4vc3JjL2ludGVybmFsL3N0YXRlLWZhY3RvcnknO1xuZXhwb3J0IHtJbnRlcm5hbFN0YXRlT3BlcmF0aW9ucyBhcyDJtXB9IGZyb20gJy4vc3JjL2ludGVybmFsL3N0YXRlLW9wZXJhdGlvbnMnO1xuZXhwb3J0IHtOZ3hzRmVhdHVyZU1vZHVsZSBhcyDJtWJjfSBmcm9tICcuL3NyYy9tb2R1bGVzL25neHMtZmVhdHVyZS5tb2R1bGUnO1xuZXhwb3J0IHtOZ3hzUm9vdE1vZHVsZSBhcyDJtWt9IGZyb20gJy4vc3JjL21vZHVsZXMvbmd4cy1yb290Lm1vZHVsZSc7XG5leHBvcnQge1BsdWdpbk1hbmFnZXIgYXMgybVxfSBmcm9tICcuL3NyYy9wbHVnaW4tbWFuYWdlcic7XG5leHBvcnQge1Rva2VuTmFtZSBhcyDJtWJlfSBmcm9tICcuL3NyYy9zdGF0ZS10b2tlbi9zeW1ib2xzJztcbmV4cG9ydCB7RkVBVFVSRV9TVEFURV9UT0tFTiBhcyDJtWQsTkdfREVWX01PREUgYXMgybVmLE5HX1RFU1RfTU9ERSBhcyDJtWUsTmd4c0NvbmZpZyBhcyDJtWgsUk9PVF9TVEFURV9UT0tFTiBhcyDJtWMsU0VMRUNUT1JfTUVUQV9LRVkgYXMgybVnfSBmcm9tICcuL3NyYy9zeW1ib2xzJztcbmV4cG9ydCB7bWVyZ2VEZWVwIGFzIMm1aX0gZnJvbSAnLi9zcmMvdXRpbHMvdXRpbHMnOyJdfQ==