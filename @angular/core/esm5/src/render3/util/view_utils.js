/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDataInRange, assertDefined, assertDomNode, assertGreaterThan, assertLessThan } from '../../util/assert';
import { assertTNodeForLView } from '../assert';
import { ACTIVE_INDEX, TYPE } from '../interfaces/container';
import { MONKEY_PATCH_KEY_NAME } from '../interfaces/context';
import { isProceduralRenderer } from '../interfaces/renderer';
import { isLContainer, isLView } from '../interfaces/type_checks';
import { FLAGS, HEADER_OFFSET, HOST, PARENT, PREORDER_HOOK_FLAGS, RENDERER } from '../interfaces/view';
/**
 * For efficiency reasons we often put several different data types (`RNode`, `LView`, `LContainer`)
 * in same location in `LView`. This is because we don't want to pre-allocate space for it
 * because the storage is sparse. This file contains utilities for dealing with such data types.
 *
 * How do we know what is stored at a given location in `LView`.
 * - `Array.isArray(value) === false` => `RNode` (The normal storage value)
 * - `Array.isArray(value) === true` => then the `value[0]` represents the wrapped value.
 *   - `typeof value[TYPE] === 'object'` => `LView`
 *      - This happens when we have a component at a given location
 *   - `typeof value[TYPE] === true` => `LContainer`
 *      - This happens when we have `LContainer` binding at a given location.
 *
 *
 * NOTE: it is assumed that `Array.isArray` and `typeof` operations are very efficient.
 */
/**
 * Returns `RNode`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapRNode(value) {
    while (Array.isArray(value)) {
        value = value[HOST];
    }
    return value;
}
/**
 * Returns `LView` or `null` if not found.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapLView(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLView()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (typeof value[TYPE] === 'object')
            return value;
        value = value[HOST];
    }
    return null;
}
/**
 * Returns `LContainer` or `null` if not found.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapLContainer(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLContainer()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (value[TYPE] === true)
            return value;
        value = value[HOST];
    }
    return null;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
export function getNativeByIndex(index, lView) {
    return unwrapRNode(lView[index + HEADER_OFFSET]);
}
/**
 * Retrieve an `RNode` for a given `TNode` and `LView`.
 *
 * This function guarantees in dev mode to retrieve a non-null `RNode`.
 *
 * @param tNode
 * @param lView
 */
export function getNativeByTNode(tNode, lView) {
    ngDevMode && assertTNodeForLView(tNode, lView);
    ngDevMode && assertDataInRange(lView, tNode.index);
    var node = unwrapRNode(lView[tNode.index]);
    ngDevMode && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
    return node;
}
/**
 * Retrieve an `RNode` or `null` for a given `TNode` and `LView`.
 *
 * Some `TNode`s don't have associated `RNode`s. For example `Projection`
 *
 * @param tNode
 * @param lView
 */
export function getNativeByTNodeOrNull(tNode, lView) {
    var index = tNode.index;
    if (index !== -1) {
        ngDevMode && assertTNodeForLView(tNode, lView);
        var node = unwrapRNode(lView[index]);
        ngDevMode && node !== null && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
        return node;
    }
    return null;
}
export function getTNode(tView, index) {
    ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
    ngDevMode && assertLessThan(index, tView.data.length, 'wrong index for TNode');
    return tView.data[index + HEADER_OFFSET];
}
/** Retrieves a value from any `LView` or `TData`. */
export function load(view, index) {
    ngDevMode && assertDataInRange(view, index + HEADER_OFFSET);
    return view[index + HEADER_OFFSET];
}
export function getComponentLViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    ngDevMode && assertDataInRange(hostView, nodeIndex);
    var slotValue = hostView[nodeIndex];
    var lView = isLView(slotValue) ? slotValue : slotValue[HOST];
    return lView;
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    return target[MONKEY_PATCH_KEY_NAME] || null;
}
export function readPatchedLView(target) {
    var value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : value.lView;
    }
    return null;
}
/** Checks whether a given view is in creation mode */
export function isCreationMode(view) {
    return (view[FLAGS] & 4 /* CreationMode */) === 4 /* CreationMode */;
}
/**
 * Returns a boolean for whether the view is attached to the change detection tree.
 *
 * Note: This determines whether a view should be checked, not whether it's inserted
 * into a container. For that, you'll want `viewAttachedToContainer` below.
 */
export function viewAttachedToChangeDetector(view) {
    return (view[FLAGS] & 128 /* Attached */) === 128 /* Attached */;
}
/** Returns a boolean for whether the view is attached to a container. */
export function viewAttachedToContainer(view) {
    return isLContainer(view[PARENT]);
}
/** Returns a constant from `TConstants` instance. */
export function getConstant(consts, index) {
    return consts === null || index == null ? null : consts[index];
}
/**
 * Resets the pre-order hook flags of the view.
 * @param lView the LView on which the flags are reset
 */
export function resetPreOrderHookFlags(lView) {
    lView[PREORDER_HOOK_FLAGS] = 0;
}
export function getLContainerActiveIndex(lContainer) {
    return lContainer[ACTIVE_INDEX] >> 1 /* SHIFT */;
}
export function setLContainerActiveIndex(lContainer, index) {
    lContainer[ACTIVE_INDEX] = index << 1 /* SHIFT */;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JILE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUErQixJQUFJLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RixPQUFPLEVBQVcscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RSxPQUFPLEVBQUMsb0JBQW9CLEVBQVEsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBcUIsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBZSxNQUFNLG9CQUFvQixDQUFDO0FBSXRJOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVIOzs7R0FHRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBNkI7SUFDdkQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFRLENBQUM7S0FDNUI7SUFDRCxPQUFPLEtBQWMsQ0FBQztBQUN4QixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUE2QjtJQUN2RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0Isa0ZBQWtGO1FBQ2xGLGlFQUFpRTtRQUNqRSxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQWMsQ0FBQztRQUMzRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBUSxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQTZCO0lBQzVELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQix1RkFBdUY7UUFDdkYsaUVBQWlFO1FBQ2pFLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUk7WUFBRSxPQUFPLEtBQW1CLENBQUM7UUFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQVEsQ0FBQztLQUM1QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsS0FBWTtJQUMxRCxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBWSxFQUFFLEtBQVk7SUFDekQsU0FBUyxJQUFJLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxTQUFTLElBQUksaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxJQUFNLElBQUksR0FBVSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BELFNBQVMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQVksRUFBRSxLQUFZO0lBQy9ELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEIsU0FBUyxJQUFJLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFNLElBQUksR0FBZSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkQsU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUdELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBWSxFQUFFLEtBQWE7SUFDbEQsU0FBUyxJQUFJLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQ25FLFNBQVMsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDL0UsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQVUsQ0FBQztBQUNwRCxDQUFDO0FBRUQscURBQXFEO0FBQ3JELE1BQU0sVUFBVSxJQUFJLENBQUksSUFBaUIsRUFBRSxLQUFhO0lBQ3RELFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFNBQWlCLEVBQUUsUUFBZTtJQUN6RSwyRUFBMkU7SUFDM0UsU0FBUyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFHRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQVc7SUFDekMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMvQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQVc7SUFDMUMsSUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksS0FBSyxFQUFFO1FBQ1QsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFFLEtBQWtCLENBQUMsS0FBSyxDQUFDO0tBQ2pFO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsc0RBQXNEO0FBQ3RELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBVztJQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBMEIsQ0FBQyx5QkFBNEIsQ0FBQztBQUM3RSxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsSUFBVztJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBc0IsQ0FBQyx1QkFBd0IsQ0FBQztBQUNyRSxDQUFDO0FBRUQseUVBQXlFO0FBQ3pFLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxJQUFXO0lBQ2pELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxxREFBcUQ7QUFDckQsTUFBTSxVQUFVLFdBQVcsQ0FBSSxNQUF1QixFQUFFLEtBQTRCO0lBQ2xGLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQWlCLENBQUM7QUFDakYsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxLQUFZO0lBQ2pELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFVBQXNCO0lBQzdELE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxpQkFBeUIsQ0FBQztBQUMzRCxDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFVBQXNCLEVBQUUsS0FBYTtJQUM1RSxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxpQkFBeUIsQ0FBQztBQUM1RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydERhdGFJblJhbmdlLCBhc3NlcnREZWZpbmVkLCBhc3NlcnREb21Ob2RlLCBhc3NlcnRHcmVhdGVyVGhhbiwgYXNzZXJ0TGVzc1RoYW59IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7YXNzZXJ0VE5vZGVGb3JMVmlld30gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7QUNUSVZFX0lOREVYLCBBY3RpdmVJbmRleEZsYWcsIExDb250YWluZXIsIFRZUEV9IGZyb20gJy4uL2ludGVyZmFjZXMvY29udGFpbmVyJztcbmltcG9ydCB7TENvbnRleHQsIE1PTktFWV9QQVRDSF9LRVlfTkFNRX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb250ZXh0JztcbmltcG9ydCB7VENvbnN0YW50cywgVE5vZGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2lzUHJvY2VkdXJhbFJlbmRlcmVyLCBSTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNMVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0ZMQUdTLCBIRUFERVJfT0ZGU0VULCBIT1NULCBMVmlldywgTFZpZXdGbGFncywgUEFSRU5ULCBQUkVPUkRFUl9IT09LX0ZMQUdTLCBSRU5ERVJFUiwgVERhdGEsIFRWaWV3fSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cblxuLyoqXG4gKiBGb3IgZWZmaWNpZW5jeSByZWFzb25zIHdlIG9mdGVuIHB1dCBzZXZlcmFsIGRpZmZlcmVudCBkYXRhIHR5cGVzIChgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmApXG4gKiBpbiBzYW1lIGxvY2F0aW9uIGluIGBMVmlld2AuIFRoaXMgaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIHByZS1hbGxvY2F0ZSBzcGFjZSBmb3IgaXRcbiAqIGJlY2F1c2UgdGhlIHN0b3JhZ2UgaXMgc3BhcnNlLiBUaGlzIGZpbGUgY29udGFpbnMgdXRpbGl0aWVzIGZvciBkZWFsaW5nIHdpdGggc3VjaCBkYXRhIHR5cGVzLlxuICpcbiAqIEhvdyBkbyB3ZSBrbm93IHdoYXQgaXMgc3RvcmVkIGF0IGEgZ2l2ZW4gbG9jYXRpb24gaW4gYExWaWV3YC5cbiAqIC0gYEFycmF5LmlzQXJyYXkodmFsdWUpID09PSBmYWxzZWAgPT4gYFJOb2RlYCAoVGhlIG5vcm1hbCBzdG9yYWdlIHZhbHVlKVxuICogLSBgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPT09IHRydWVgID0+IHRoZW4gdGhlIGB2YWx1ZVswXWAgcmVwcmVzZW50cyB0aGUgd3JhcHBlZCB2YWx1ZS5cbiAqICAgLSBgdHlwZW9mIHZhbHVlW1RZUEVdID09PSAnb2JqZWN0J2AgPT4gYExWaWV3YFxuICogICAgICAtIFRoaXMgaGFwcGVucyB3aGVuIHdlIGhhdmUgYSBjb21wb25lbnQgYXQgYSBnaXZlbiBsb2NhdGlvblxuICogICAtIGB0eXBlb2YgdmFsdWVbVFlQRV0gPT09IHRydWVgID0+IGBMQ29udGFpbmVyYFxuICogICAgICAtIFRoaXMgaGFwcGVucyB3aGVuIHdlIGhhdmUgYExDb250YWluZXJgIGJpbmRpbmcgYXQgYSBnaXZlbiBsb2NhdGlvbi5cbiAqXG4gKlxuICogTk9URTogaXQgaXMgYXNzdW1lZCB0aGF0IGBBcnJheS5pc0FycmF5YCBhbmQgYHR5cGVvZmAgb3BlcmF0aW9ucyBhcmUgdmVyeSBlZmZpY2llbnQuXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGBSTm9kZWAuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcFJOb2RlKHZhbHVlOiBSTm9kZXxMVmlld3xMQ29udGFpbmVyKTogUk5vZGUge1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IHZhbHVlW0hPU1RdIGFzIGFueTtcbiAgfVxuICByZXR1cm4gdmFsdWUgYXMgUk5vZGU7XG59XG5cbi8qKlxuICogUmV0dXJucyBgTFZpZXdgIG9yIGBudWxsYCBpZiBub3QgZm91bmQuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcExWaWV3KHZhbHVlOiBSTm9kZXxMVmlld3xMQ29udGFpbmVyKTogTFZpZXd8bnVsbCB7XG4gIHdoaWxlIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgc2FtZSBhcyBgaXNMVmlldygpYCBidXQgd2UgZG9uJ3QgY2FsbCBhdCBhcyB3ZSBkb24ndCB3YW50IHRvIGNhbGxcbiAgICAvLyBgQXJyYXkuaXNBcnJheSgpYCB0d2ljZSBhbmQgZ2l2ZSBKSVRlciBtb3JlIHdvcmsgZm9yIGlubGluaW5nLlxuICAgIGlmICh0eXBlb2YgdmFsdWVbVFlQRV0gPT09ICdvYmplY3QnKSByZXR1cm4gdmFsdWUgYXMgTFZpZXc7XG4gICAgdmFsdWUgPSB2YWx1ZVtIT1NUXSBhcyBhbnk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmV0dXJucyBgTENvbnRhaW5lcmAgb3IgYG51bGxgIGlmIG5vdCBmb3VuZC5cbiAqIEBwYXJhbSB2YWx1ZSB3cmFwcGVkIHZhbHVlIG9mIGBSTm9kZWAsIGBMVmlld2AsIGBMQ29udGFpbmVyYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwTENvbnRhaW5lcih2YWx1ZTogUk5vZGV8TFZpZXd8TENvbnRhaW5lcik6IExDb250YWluZXJ8bnVsbCB7XG4gIHdoaWxlIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgc2FtZSBhcyBgaXNMQ29udGFpbmVyKClgIGJ1dCB3ZSBkb24ndCBjYWxsIGF0IGFzIHdlIGRvbid0IHdhbnQgdG8gY2FsbFxuICAgIC8vIGBBcnJheS5pc0FycmF5KClgIHR3aWNlIGFuZCBnaXZlIEpJVGVyIG1vcmUgd29yayBmb3IgaW5saW5pbmcuXG4gICAgaWYgKHZhbHVlW1RZUEVdID09PSB0cnVlKSByZXR1cm4gdmFsdWUgYXMgTENvbnRhaW5lcjtcbiAgICB2YWx1ZSA9IHZhbHVlW0hPU1RdIGFzIGFueTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgYW4gZWxlbWVudCB2YWx1ZSBmcm9tIHRoZSBwcm92aWRlZCBgdmlld0RhdGFgLCBieSB1bndyYXBwaW5nXG4gKiBmcm9tIGFueSBjb250YWluZXJzLCBjb21wb25lbnQgdmlld3MsIG9yIHN0eWxlIGNvbnRleHRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmF0aXZlQnlJbmRleChpbmRleDogbnVtYmVyLCBsVmlldzogTFZpZXcpOiBSTm9kZSB7XG4gIHJldHVybiB1bndyYXBSTm9kZShsVmlld1tpbmRleCArIEhFQURFUl9PRkZTRVRdKTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhbiBgUk5vZGVgIGZvciBhIGdpdmVuIGBUTm9kZWAgYW5kIGBMVmlld2AuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBndWFyYW50ZWVzIGluIGRldiBtb2RlIHRvIHJldHJpZXZlIGEgbm9uLW51bGwgYFJOb2RlYC5cbiAqXG4gKiBAcGFyYW0gdE5vZGVcbiAqIEBwYXJhbSBsVmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmF0aXZlQnlUTm9kZSh0Tm9kZTogVE5vZGUsIGxWaWV3OiBMVmlldyk6IFJOb2RlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGUsIGxWaWV3KTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERhdGFJblJhbmdlKGxWaWV3LCB0Tm9kZS5pbmRleCk7XG4gIGNvbnN0IG5vZGU6IFJOb2RlID0gdW53cmFwUk5vZGUobFZpZXdbdE5vZGUuaW5kZXhdKTtcbiAgbmdEZXZNb2RlICYmICFpc1Byb2NlZHVyYWxSZW5kZXJlcihsVmlld1tSRU5ERVJFUl0pICYmIGFzc2VydERvbU5vZGUobm9kZSk7XG4gIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIGFuIGBSTm9kZWAgb3IgYG51bGxgIGZvciBhIGdpdmVuIGBUTm9kZWAgYW5kIGBMVmlld2AuXG4gKlxuICogU29tZSBgVE5vZGVgcyBkb24ndCBoYXZlIGFzc29jaWF0ZWQgYFJOb2RlYHMuIEZvciBleGFtcGxlIGBQcm9qZWN0aW9uYFxuICpcbiAqIEBwYXJhbSB0Tm9kZVxuICogQHBhcmFtIGxWaWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeVROb2RlT3JOdWxsKHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3KTogUk5vZGV8bnVsbCB7XG4gIGNvbnN0IGluZGV4ID0gdE5vZGUuaW5kZXg7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VE5vZGVGb3JMVmlldyh0Tm9kZSwgbFZpZXcpO1xuICAgIGNvbnN0IG5vZGU6IFJOb2RlfG51bGwgPSB1bndyYXBSTm9kZShsVmlld1tpbmRleF0pO1xuICAgIG5nRGV2TW9kZSAmJiBub2RlICE9PSBudWxsICYmICFpc1Byb2NlZHVyYWxSZW5kZXJlcihsVmlld1tSRU5ERVJFUl0pICYmIGFzc2VydERvbU5vZGUobm9kZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFROb2RlKHRWaWV3OiBUVmlldywgaW5kZXg6IG51bWJlcik6IFROb2RlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydEdyZWF0ZXJUaGFuKGluZGV4LCAtMSwgJ3dyb25nIGluZGV4IGZvciBUTm9kZScpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TGVzc1RoYW4oaW5kZXgsIHRWaWV3LmRhdGEubGVuZ3RoLCAnd3JvbmcgaW5kZXggZm9yIFROb2RlJyk7XG4gIHJldHVybiB0Vmlldy5kYXRhW2luZGV4ICsgSEVBREVSX09GRlNFVF0gYXMgVE5vZGU7XG59XG5cbi8qKiBSZXRyaWV2ZXMgYSB2YWx1ZSBmcm9tIGFueSBgTFZpZXdgIG9yIGBURGF0YWAuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZDxUPih2aWV3OiBMVmlld3xURGF0YSwgaW5kZXg6IG51bWJlcik6IFQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGF0YUluUmFuZ2UodmlldywgaW5kZXggKyBIRUFERVJfT0ZGU0VUKTtcbiAgcmV0dXJuIHZpZXdbaW5kZXggKyBIRUFERVJfT0ZGU0VUXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudExWaWV3QnlJbmRleChub2RlSW5kZXg6IG51bWJlciwgaG9zdFZpZXc6IExWaWV3KTogTFZpZXcge1xuICAvLyBDb3VsZCBiZSBhbiBMVmlldyBvciBhbiBMQ29udGFpbmVyLiBJZiBMQ29udGFpbmVyLCB1bndyYXAgdG8gZmluZCBMVmlldy5cbiAgbmdEZXZNb2RlICYmIGFzc2VydERhdGFJblJhbmdlKGhvc3RWaWV3LCBub2RlSW5kZXgpO1xuICBjb25zdCBzbG90VmFsdWUgPSBob3N0Vmlld1tub2RlSW5kZXhdO1xuICBjb25zdCBsVmlldyA9IGlzTFZpZXcoc2xvdFZhbHVlKSA/IHNsb3RWYWx1ZSA6IHNsb3RWYWx1ZVtIT1NUXTtcbiAgcmV0dXJuIGxWaWV3O1xufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbW9ua2V5LXBhdGNoIHZhbHVlIGRhdGEgcHJlc2VudCBvbiB0aGUgdGFyZ2V0ICh3aGljaCBjb3VsZCBiZVxuICogYSBjb21wb25lbnQsIGRpcmVjdGl2ZSBvciBhIERPTSBub2RlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQ6IGFueSk6IExWaWV3fExDb250ZXh0fG51bGwge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0YXJnZXQsICdUYXJnZXQgZXhwZWN0ZWQnKTtcbiAgcmV0dXJuIHRhcmdldFtNT05LRVlfUEFUQ0hfS0VZX05BTUVdIHx8IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGF0Y2hlZExWaWV3KHRhcmdldDogYW55KTogTFZpZXd8bnVsbCB7XG4gIGNvbnN0IHZhbHVlID0gcmVhZFBhdGNoZWREYXRhKHRhcmdldCk7XG4gIGlmICh2YWx1ZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogKHZhbHVlIGFzIExDb250ZXh0KS5sVmlldztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIGEgZ2l2ZW4gdmlldyBpcyBpbiBjcmVhdGlvbiBtb2RlICovXG5leHBvcnQgZnVuY3Rpb24gaXNDcmVhdGlvbk1vZGUodmlldzogTFZpZXcpOiBib29sZWFuIHtcbiAgcmV0dXJuICh2aWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuQ3JlYXRpb25Nb2RlKSA9PT0gTFZpZXdGbGFncy5DcmVhdGlvbk1vZGU7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgdGhlIHZpZXcgaXMgYXR0YWNoZWQgdG8gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS5cbiAqXG4gKiBOb3RlOiBUaGlzIGRldGVybWluZXMgd2hldGhlciBhIHZpZXcgc2hvdWxkIGJlIGNoZWNrZWQsIG5vdCB3aGV0aGVyIGl0J3MgaW5zZXJ0ZWRcbiAqIGludG8gYSBjb250YWluZXIuIEZvciB0aGF0LCB5b3UnbGwgd2FudCBgdmlld0F0dGFjaGVkVG9Db250YWluZXJgIGJlbG93LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlld0F0dGFjaGVkVG9DaGFuZ2VEZXRlY3Rvcih2aWV3OiBMVmlldyk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHZpZXdbRkxBR1NdICYgTFZpZXdGbGFncy5BdHRhY2hlZCkgPT09IExWaWV3RmxhZ3MuQXR0YWNoZWQ7XG59XG5cbi8qKiBSZXR1cm5zIGEgYm9vbGVhbiBmb3Igd2hldGhlciB0aGUgdmlldyBpcyBhdHRhY2hlZCB0byBhIGNvbnRhaW5lci4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2aWV3QXR0YWNoZWRUb0NvbnRhaW5lcih2aWV3OiBMVmlldyk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNMQ29udGFpbmVyKHZpZXdbUEFSRU5UXSk7XG59XG5cbi8qKiBSZXR1cm5zIGEgY29uc3RhbnQgZnJvbSBgVENvbnN0YW50c2AgaW5zdGFuY2UuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uc3RhbnQ8VD4oY29uc3RzOiBUQ29uc3RhbnRzfG51bGwsIGluZGV4OiBudW1iZXJ8bnVsbHx1bmRlZmluZWQpOiBUfG51bGwge1xuICByZXR1cm4gY29uc3RzID09PSBudWxsIHx8IGluZGV4ID09IG51bGwgPyBudWxsIDogY29uc3RzW2luZGV4XSBhcyB1bmtub3duIGFzIFQ7XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwcmUtb3JkZXIgaG9vayBmbGFncyBvZiB0aGUgdmlldy5cbiAqIEBwYXJhbSBsVmlldyB0aGUgTFZpZXcgb24gd2hpY2ggdGhlIGZsYWdzIGFyZSByZXNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRQcmVPcmRlckhvb2tGbGFncyhsVmlldzogTFZpZXcpIHtcbiAgbFZpZXdbUFJFT1JERVJfSE9PS19GTEFHU10gPSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TENvbnRhaW5lckFjdGl2ZUluZGV4KGxDb250YWluZXI6IExDb250YWluZXIpIHtcbiAgcmV0dXJuIGxDb250YWluZXJbQUNUSVZFX0lOREVYXSA+PiBBY3RpdmVJbmRleEZsYWcuU0hJRlQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMQ29udGFpbmVyQWN0aXZlSW5kZXgobENvbnRhaW5lcjogTENvbnRhaW5lciwgaW5kZXg6IG51bWJlcikge1xuICBsQ29udGFpbmVyW0FDVElWRV9JTkRFWF0gPSBpbmRleCA8PCBBY3RpdmVJbmRleEZsYWcuU0hJRlQ7XG59Il19