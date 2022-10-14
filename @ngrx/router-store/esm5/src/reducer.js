import { ROUTER_CANCEL, ROUTER_ERROR, ROUTER_NAVIGATION, } from './actions';
export function routerReducer(state, action) {
    // Allow compilation with strictFunctionTypes - ref: #1344
    var routerAction = action;
    switch (routerAction.type) {
        case ROUTER_NAVIGATION:
        case ROUTER_ERROR:
        case ROUTER_CANCEL:
            return {
                state: routerAction.payload.routerState,
                navigationId: routerAction.payload.event.id,
            };
        default:
            return state;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcm91dGVyLXN0b3JlL3NyYy9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGlCQUFpQixHQUVsQixNQUFNLFdBQVcsQ0FBQztBQVduQixNQUFNLFVBQVUsYUFBYSxDQUczQixLQUF3QyxFQUN4QyxNQUFjO0lBRWQsMERBQTBEO0lBQzFELElBQU0sWUFBWSxHQUFHLE1BQThCLENBQUM7SUFDcEQsUUFBUSxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssaUJBQWlCLENBQUM7UUFDdkIsS0FBSyxZQUFZLENBQUM7UUFDbEIsS0FBSyxhQUFhO1lBQ2hCLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFDdkMsWUFBWSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDNUMsQ0FBQztRQUNKO1lBQ0UsT0FBTyxLQUE4QixDQUFDO0tBQ3pDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIFJPVVRFUl9DQU5DRUwsXG4gIFJPVVRFUl9FUlJPUixcbiAgUk9VVEVSX05BVklHQVRJT04sXG4gIFJvdXRlckFjdGlvbixcbn0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IEJhc2VSb3V0ZXJTdG9yZVN0YXRlIH0gZnJvbSAnLi9zZXJpYWxpemVycy9iYXNlJztcbmltcG9ydCB7IFNlcmlhbGl6ZWRSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnLi9zZXJpYWxpemVycy9kZWZhdWx0X3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgdHlwZSBSb3V0ZXJSZWR1Y2VyU3RhdGU8XG4gIFQgZXh0ZW5kcyBCYXNlUm91dGVyU3RvcmVTdGF0ZSA9IFNlcmlhbGl6ZWRSb3V0ZXJTdGF0ZVNuYXBzaG90XG4+ID0ge1xuICBzdGF0ZTogVDtcbiAgbmF2aWdhdGlvbklkOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcm91dGVyUmVkdWNlcjxcbiAgVCBleHRlbmRzIEJhc2VSb3V0ZXJTdG9yZVN0YXRlID0gU2VyaWFsaXplZFJvdXRlclN0YXRlU25hcHNob3Rcbj4oXG4gIHN0YXRlOiBSb3V0ZXJSZWR1Y2VyU3RhdGU8VD4gfCB1bmRlZmluZWQsXG4gIGFjdGlvbjogQWN0aW9uXG4pOiBSb3V0ZXJSZWR1Y2VyU3RhdGU8VD4ge1xuICAvLyBBbGxvdyBjb21waWxhdGlvbiB3aXRoIHN0cmljdEZ1bmN0aW9uVHlwZXMgLSByZWY6ICMxMzQ0XG4gIGNvbnN0IHJvdXRlckFjdGlvbiA9IGFjdGlvbiBhcyBSb3V0ZXJBY3Rpb248YW55LCBUPjtcbiAgc3dpdGNoIChyb3V0ZXJBY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUk9VVEVSX05BVklHQVRJT046XG4gICAgY2FzZSBST1VURVJfRVJST1I6XG4gICAgY2FzZSBST1VURVJfQ0FOQ0VMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdGU6IHJvdXRlckFjdGlvbi5wYXlsb2FkLnJvdXRlclN0YXRlLFxuICAgICAgICBuYXZpZ2F0aW9uSWQ6IHJvdXRlckFjdGlvbi5wYXlsb2FkLmV2ZW50LmlkLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlIGFzIFJvdXRlclJlZHVjZXJTdGF0ZTxUPjtcbiAgfVxufVxuIl19