/**
 * @fileoverview added by tsickle
 * Generated from: packages/animations/src/animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation package.
 */
export { AnimationBuilder, AnimationFactory } from './animation_builder';
export { animate, animateChild, animation, AUTO_STYLE, group, keyframes, query, sequence, stagger, state, style, transition, trigger, useAnimation } from './animation_metadata';
export { NoopAnimationPlayer } from './players/animation_player';
export { ɵAnimationGroupPlayer, ɵPRE_STYLE } from './private_export';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RSxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBdUMsU0FBUyxFQUF1YixVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFDcnBCLE9BQU8sRUFBa0IsbUJBQW1CLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRixrREFBYyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIEVudHJ5IHBvaW50IGZvciBhbGwgYW5pbWF0aW9uIEFQSXMgb2YgdGhlIGFuaW1hdGlvbiBwYWNrYWdlLlxuICovXG5leHBvcnQge0FuaW1hdGlvbkJ1aWxkZXIsIEFuaW1hdGlvbkZhY3Rvcnl9IGZyb20gJy4vYW5pbWF0aW9uX2J1aWxkZXInO1xuZXhwb3J0IHtBbmltYXRpb25FdmVudH0gZnJvbSAnLi9hbmltYXRpb25fZXZlbnQnO1xuZXhwb3J0IHthbmltYXRlLCBhbmltYXRlQ2hpbGQsIEFuaW1hdGVDaGlsZE9wdGlvbnMsIEFuaW1hdGVUaW1pbmdzLCBhbmltYXRpb24sIEFuaW1hdGlvbkFuaW1hdGVDaGlsZE1ldGFkYXRhLCBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEsIEFuaW1hdGlvbkFuaW1hdGVSZWZNZXRhZGF0YSwgQW5pbWF0aW9uR3JvdXBNZXRhZGF0YSwgQW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk1ldGFkYXRhVHlwZSwgQW5pbWF0aW9uT3B0aW9ucywgQW5pbWF0aW9uUXVlcnlNZXRhZGF0YSwgQW5pbWF0aW9uUXVlcnlPcHRpb25zLCBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uU2VxdWVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uU3RhZ2dlck1ldGFkYXRhLCBBbmltYXRpb25TdGF0ZU1ldGFkYXRhLCBBbmltYXRpb25TdHlsZU1ldGFkYXRhLCBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGEsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSwgQVVUT19TVFlMRSwgZ3JvdXAsIGtleWZyYW1lcywgcXVlcnksIHNlcXVlbmNlLCBzdGFnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIsIHVzZUFuaW1hdGlvbiwgybVTdHlsZURhdGF9IGZyb20gJy4vYW5pbWF0aW9uX21ldGFkYXRhJztcbmV4cG9ydCB7QW5pbWF0aW9uUGxheWVyLCBOb29wQW5pbWF0aW9uUGxheWVyfSBmcm9tICcuL3BsYXllcnMvYW5pbWF0aW9uX3BsYXllcic7XG5cbmV4cG9ydCAqIGZyb20gJy4vcHJpdmF0ZV9leHBvcnQnO1xuIl19