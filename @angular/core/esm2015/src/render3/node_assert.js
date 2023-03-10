/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/node_assert.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertEqual } from '../util/assert';
/**
 * @param {?} tNode
 * @param {?} type
 * @return {?}
 */
export function assertNodeType(tNode, type) {
    assertDefined(tNode, 'should be called with a TNode');
    assertEqual(tNode.type, type, `should be a ${typeName(type)}`);
}
/**
 * @param {?} tNode
 * @param {...?} types
 * @return {?}
 */
export function assertNodeOfPossibleTypes(tNode, ...types) {
    assertDefined(tNode, 'should be called with a TNode');
    /** @type {?} */
    const found = types.some((/**
     * @param {?} type
     * @return {?}
     */
    type => tNode.type === type));
    assertEqual(found, true, `Should be one of ${types.map(typeName).join(', ')} but got ${typeName(tNode.type)}`);
}
/**
 * @param {?} type
 * @return {?}
 */
function typeName(type) {
    if (type == 1 /* Projection */)
        return 'Projection';
    if (type == 0 /* Container */)
        return 'Container';
    if (type == 5 /* IcuContainer */)
        return 'IcuContainer';
    if (type == 2 /* View */)
        return 'View';
    if (type == 3 /* Element */)
        return 'Element';
    if (type == 4 /* ElementContainer */)
        return 'ElementContainer';
    return '<unknown>';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9hc3NlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25vZGVfYXNzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxhQUFhLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQWUxRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQVksRUFBRSxJQUFlO0lBQzFELGFBQWEsQ0FBQyxLQUFLLEVBQUUsK0JBQStCLENBQUMsQ0FBQztJQUN0RCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxLQUFZLEVBQUUsR0FBRyxLQUFrQjtJQUMzRSxhQUFhLENBQUMsS0FBSyxFQUFFLCtCQUErQixDQUFDLENBQUM7O1VBQ2hELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSTs7OztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUM7SUFDckQsV0FBVyxDQUNQLEtBQUssRUFBRSxJQUFJLEVBQ1gsb0JBQW9CLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVGLENBQUM7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBZTtJQUMvQixJQUFJLElBQUksc0JBQXdCO1FBQUUsT0FBTyxZQUFZLENBQUM7SUFDdEQsSUFBSSxJQUFJLHFCQUF1QjtRQUFFLE9BQU8sV0FBVyxDQUFDO0lBQ3BELElBQUksSUFBSSx3QkFBMEI7UUFBRSxPQUFPLGNBQWMsQ0FBQztJQUMxRCxJQUFJLElBQUksZ0JBQWtCO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDMUMsSUFBSSxJQUFJLG1CQUFxQjtRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ2hELElBQUksSUFBSSw0QkFBOEI7UUFBRSxPQUFPLGtCQUFrQixDQUFDO0lBQ2xFLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWx9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtUQ29udGFpbmVyTm9kZSwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFRJY3VDb250YWluZXJOb2RlLCBUTm9kZSwgVE5vZGVUeXBlLCBUUHJvamVjdGlvbk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vZGVUeXBlKFxuICAgIHROb2RlOiBUTm9kZSwgdHlwZTogVE5vZGVUeXBlLkNvbnRhaW5lcik6IGFzc2VydHMgdE5vZGUgaXMgVENvbnRhaW5lck5vZGU7XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm9kZVR5cGUoXG4gICAgdE5vZGU6IFROb2RlLCB0eXBlOiBUTm9kZVR5cGUuRWxlbWVudCk6IGFzc2VydHMgdE5vZGUgaXMgVEVsZW1lbnROb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vZGVUeXBlKFxuICAgIHROb2RlOiBUTm9kZSwgdHlwZTogVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXIpOiBhc3NlcnRzIHROb2RlIGlzIFRFbGVtZW50Q29udGFpbmVyTm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlVHlwZShcbiAgICB0Tm9kZTogVE5vZGUsIHR5cGU6IFROb2RlVHlwZS5JY3VDb250YWluZXIpOiBhc3NlcnRzIHROb2RlIGlzIFRJY3VDb250YWluZXJOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vZGVUeXBlKFxuICAgIHROb2RlOiBUTm9kZSwgdHlwZTogVE5vZGVUeXBlLlByb2plY3Rpb24pOiBhc3NlcnRzIHROb2RlIGlzIFRQcm9qZWN0aW9uTm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlVHlwZSh0Tm9kZTogVE5vZGUsIHR5cGU6IFROb2RlVHlwZS5WaWV3KTogYXNzZXJ0cyB0Tm9kZSBpcyBUQ29udGFpbmVyTm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlVHlwZSh0Tm9kZTogVE5vZGUsIHR5cGU6IFROb2RlVHlwZSk6IGFzc2VydHMgdE5vZGUgaXMgVE5vZGUge1xuICBhc3NlcnREZWZpbmVkKHROb2RlLCAnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIGEgVE5vZGUnKTtcbiAgYXNzZXJ0RXF1YWwodE5vZGUudHlwZSwgdHlwZSwgYHNob3VsZCBiZSBhICR7dHlwZU5hbWUodHlwZSl9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzKHROb2RlOiBUTm9kZSwgLi4udHlwZXM6IFROb2RlVHlwZVtdKTogdm9pZCB7XG4gIGFzc2VydERlZmluZWQodE5vZGUsICdzaG91bGQgYmUgY2FsbGVkIHdpdGggYSBUTm9kZScpO1xuICBjb25zdCBmb3VuZCA9IHR5cGVzLnNvbWUodHlwZSA9PiB0Tm9kZS50eXBlID09PSB0eXBlKTtcbiAgYXNzZXJ0RXF1YWwoXG4gICAgICBmb3VuZCwgdHJ1ZSxcbiAgICAgIGBTaG91bGQgYmUgb25lIG9mICR7dHlwZXMubWFwKHR5cGVOYW1lKS5qb2luKCcsICcpfSBidXQgZ290ICR7dHlwZU5hbWUodE5vZGUudHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIHR5cGVOYW1lKHR5cGU6IFROb2RlVHlwZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlID09IFROb2RlVHlwZS5Qcm9qZWN0aW9uKSByZXR1cm4gJ1Byb2plY3Rpb24nO1xuICBpZiAodHlwZSA9PSBUTm9kZVR5cGUuQ29udGFpbmVyKSByZXR1cm4gJ0NvbnRhaW5lcic7XG4gIGlmICh0eXBlID09IFROb2RlVHlwZS5JY3VDb250YWluZXIpIHJldHVybiAnSWN1Q29udGFpbmVyJztcbiAgaWYgKHR5cGUgPT0gVE5vZGVUeXBlLlZpZXcpIHJldHVybiAnVmlldyc7XG4gIGlmICh0eXBlID09IFROb2RlVHlwZS5FbGVtZW50KSByZXR1cm4gJ0VsZW1lbnQnO1xuICBpZiAodHlwZSA9PSBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikgcmV0dXJuICdFbGVtZW50Q29udGFpbmVyJztcbiAgcmV0dXJuICc8dW5rbm93bj4nO1xufVxuIl19