import { MockState } from './mock_state';
import { ActionsSubject, INITIAL_STATE, ReducerManager, StateObservable, Store, } from '@ngrx/store';
import { MockStore } from './mock_store';
import { MockReducerManager } from './mock_reducer_manager';
import { MOCK_SELECTORS } from './tokens';
export function provideMockStore(config) {
    if (config === void 0) { config = {}; }
    return [
        ActionsSubject,
        MockState,
        MockStore,
        { provide: INITIAL_STATE, useValue: config.initialState || {} },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useExisting: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxlQUFlLEVBQ2YsS0FBSyxHQUNOLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQU8xQyxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLE1BQStCO0lBQS9CLHVCQUFBLEVBQUEsV0FBK0I7SUFFL0IsT0FBTztRQUNMLGNBQWM7UUFDZCxTQUFTO1FBQ1QsU0FBUztRQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFLEVBQUU7UUFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3ZELEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO1FBQ2pELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7UUFDekQsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7S0FDM0MsQ0FBQztBQUNKLENBQUM7QUFFRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7XG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RhdGVPYnNlcnZhYmxlLFxuICBTdG9yZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmltcG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tTdG9yZUNvbmZpZzxUPiB7XG4gIGluaXRpYWxTdGF0ZT86IFQ7XG4gIHNlbGVjdG9ycz86IE1vY2tTZWxlY3RvcltdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tTdG9yZTxUID0gYW55PihcbiAgY29uZmlnOiBNb2NrU3RvcmVDb25maWc8VD4gPSB7fVxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAgQWN0aW9uc1N1YmplY3QsXG4gICAgTW9ja1N0YXRlLFxuICAgIE1vY2tTdG9yZSxcbiAgICB7IHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIHx8IHt9IH0sXG4gICAgeyBwcm92aWRlOiBNT0NLX1NFTEVDVE9SUywgdXNlVmFsdWU6IGNvbmZpZy5zZWxlY3RvcnMgfSxcbiAgICB7IHByb3ZpZGU6IFN0YXRlT2JzZXJ2YWJsZSwgdXNlQ2xhc3M6IE1vY2tTdGF0ZSB9LFxuICAgIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXIsIHVzZUNsYXNzOiBNb2NrUmVkdWNlck1hbmFnZXIgfSxcbiAgICB7IHByb3ZpZGU6IFN0b3JlLCB1c2VFeGlzdGluZzogTW9ja1N0b3JlIH0sXG4gIF07XG59XG5cbmV4cG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuZXhwb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmV4cG9ydCB7IE1vY2tTdG9yZSB9IGZyb20gJy4vbW9ja19zdG9yZSc7XG5leHBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuIl19