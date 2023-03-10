/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * To modify the labels and text displayed, create a new instance of MatPaginatorIntl and
 * include it in a custom provider
 */
var MatPaginatorIntl = /** @class */ (function () {
    function MatPaginatorIntl() {
        /**
         * Stream to emit from when labels are changed. Use this to notify components when the labels have
         * changed after initialization.
         */
        this.changes = new Subject();
        /** A label for the page size selector. */
        this.itemsPerPageLabel = 'Items per page:';
        /** A label for the button that increments the current page. */
        this.nextPageLabel = 'Next page';
        /** A label for the button that decrements the current page. */
        this.previousPageLabel = 'Previous page';
        /** A label for the button that moves to the first page. */
        this.firstPageLabel = 'First page';
        /** A label for the button that moves to the last page. */
        this.lastPageLabel = 'Last page';
        /** A label for the range of items within the current page and the length of the whole list. */
        this.getRangeLabel = function (page, pageSize, length) {
            if (length == 0 || pageSize == 0) {
                return "0 of " + length;
            }
            length = Math.max(length, 0);
            var startIndex = page * pageSize;
            // If the start index exceeds the list length, do not try and fix the end index to the end.
            var endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;
            return startIndex + 1 + " \u2013 " + endIndex + " of " + length;
        };
    }
    MatPaginatorIntl.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    MatPaginatorIntl.??prov = i0.????defineInjectable({ factory: function MatPaginatorIntl_Factory() { return new MatPaginatorIntl(); }, token: MatPaginatorIntl, providedIn: "root" });
    return MatPaginatorIntl;
}());
export { MatPaginatorIntl };
/** @docs-private */
export function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl) {
    return parentIntl || new MatPaginatorIntl();
}
/** @docs-private */
export var MAT_PAGINATOR_INTL_PROVIDER = {
    // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
    provide: MatPaginatorIntl,
    deps: [[new Optional(), new SkipSelf(), MatPaginatorIntl]],
    useFactory: MAT_PAGINATOR_INTL_PROVIDER_FACTORY
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLWludGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnaW5hdG9yL3BhZ2luYXRvci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUc3Qjs7O0dBR0c7QUFDSDtJQUFBO1FBRUU7OztXQUdHO1FBQ00sWUFBTyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRXRELDBDQUEwQztRQUMxQyxzQkFBaUIsR0FBVyxpQkFBaUIsQ0FBQztRQUU5QywrREFBK0Q7UUFDL0Qsa0JBQWEsR0FBVyxXQUFXLENBQUM7UUFFcEMsK0RBQStEO1FBQy9ELHNCQUFpQixHQUFXLGVBQWUsQ0FBQztRQUU1QywyREFBMkQ7UUFDM0QsbUJBQWMsR0FBVyxZQUFZLENBQUM7UUFFdEMsMERBQTBEO1FBQzFELGtCQUFhLEdBQVcsV0FBVyxDQUFDO1FBRXBDLCtGQUErRjtRQUMvRixrQkFBYSxHQUFHLFVBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsTUFBYztZQUM3RCxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtnQkFBRSxPQUFPLFVBQVEsTUFBUSxDQUFDO2FBQUU7WUFFOUQsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTdCLElBQU0sVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUM7WUFFbkMsMkZBQTJGO1lBQzNGLElBQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFMUIsT0FBVSxVQUFVLEdBQUcsQ0FBQyxnQkFBTSxRQUFRLFlBQU8sTUFBUSxDQUFDO1FBQ3hELENBQUMsQ0FBQTtLQUNGOztnQkF0Q0EsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzJCQWhCaEM7Q0FzREMsQUF0Q0QsSUFzQ0M7U0FyQ1ksZ0JBQWdCO0FBdUM3QixvQkFBb0I7QUFDcEIsTUFBTSxVQUFVLG1DQUFtQyxDQUFDLFVBQTRCO0lBQzlFLE9BQU8sVUFBVSxJQUFJLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUM5QyxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFHO0lBQ3pDLDZGQUE2RjtJQUM3RixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsVUFBVSxFQUFFLG1DQUFtQztDQUNoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBUbyBtb2RpZnkgdGhlIGxhYmVscyBhbmQgdGV4dCBkaXNwbGF5ZWQsIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNYXRQYWdpbmF0b3JJbnRsIGFuZFxuICogaW5jbHVkZSBpdCBpbiBhIGN1c3RvbSBwcm92aWRlclxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBNYXRQYWdpbmF0b3JJbnRsIHtcbiAgLyoqXG4gICAqIFN0cmVhbSB0byBlbWl0IGZyb20gd2hlbiBsYWJlbHMgYXJlIGNoYW5nZWQuIFVzZSB0aGlzIHRvIG5vdGlmeSBjb21wb25lbnRzIHdoZW4gdGhlIGxhYmVscyBoYXZlXG4gICAqIGNoYW5nZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIHBhZ2Ugc2l6ZSBzZWxlY3Rvci4gKi9cbiAgaXRlbXNQZXJQYWdlTGFiZWw6IHN0cmluZyA9ICdJdGVtcyBwZXIgcGFnZTonO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRoYXQgaW5jcmVtZW50cyB0aGUgY3VycmVudCBwYWdlLiAqL1xuICBuZXh0UGFnZUxhYmVsOiBzdHJpbmcgPSAnTmV4dCBwYWdlJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB0aGF0IGRlY3JlbWVudHMgdGhlIGN1cnJlbnQgcGFnZS4gKi9cbiAgcHJldmlvdXNQYWdlTGFiZWw6IHN0cmluZyA9ICdQcmV2aW91cyBwYWdlJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB0aGF0IG1vdmVzIHRvIHRoZSBmaXJzdCBwYWdlLiAqL1xuICBmaXJzdFBhZ2VMYWJlbDogc3RyaW5nID0gJ0ZpcnN0IHBhZ2UnO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRoYXQgbW92ZXMgdG8gdGhlIGxhc3QgcGFnZS4gKi9cbiAgbGFzdFBhZ2VMYWJlbDogc3RyaW5nID0gJ0xhc3QgcGFnZSc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSBvZiBpdGVtcyB3aXRoaW4gdGhlIGN1cnJlbnQgcGFnZSBhbmQgdGhlIGxlbmd0aCBvZiB0aGUgd2hvbGUgbGlzdC4gKi9cbiAgZ2V0UmFuZ2VMYWJlbCA9IChwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PSAwIHx8IHBhZ2VTaXplID09IDApIHsgcmV0dXJuIGAwIG9mICR7bGVuZ3RofWA7IH1cblxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgMCk7XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gcGFnZSAqIHBhZ2VTaXplO1xuXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/XG4gICAgICAgIE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6XG4gICAgICAgIHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcblxuICAgIHJldHVybiBgJHtzdGFydEluZGV4ICsgMX0g4oCTICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XG4gIH1cbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJfRkFDVE9SWShwYXJlbnRJbnRsOiBNYXRQYWdpbmF0b3JJbnRsKSB7XG4gIHJldHVybiBwYXJlbnRJbnRsIHx8IG5ldyBNYXRQYWdpbmF0b3JJbnRsKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUFUX1BBR0lOQVRPUl9JTlRMX1BST1ZJREVSID0ge1xuICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGFuIE1hdFBhZ2luYXRvckludGwgYXZhaWxhYmxlLCB1c2UgdGhhdC4gT3RoZXJ3aXNlLCBwcm92aWRlIGEgbmV3IG9uZS5cbiAgcHJvdmlkZTogTWF0UGFnaW5hdG9ySW50bCxcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIE1hdFBhZ2luYXRvckludGxdXSxcbiAgdXNlRmFjdG9yeTogTUFUX1BBR0lOQVRPUl9JTlRMX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iXX0=