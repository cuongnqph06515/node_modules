/**
 * @fileoverview added by tsickle
 * Generated from: packages/router/src/directives/router_link.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, HostBinding, HostListener, Input, isDevMode, Renderer2 } from '@angular/core';
import { NavigationEnd } from '../events';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
/**
 * \@description
 *
 * Lets you link to specific routes in your app.
 *
 * Consider the following route configuration:
 * `[{ path: 'user/:name', component: UserCmp }]`.
 * When linking to this `user/:name` route, you use the `RouterLink` directive.
 *
 * If the link is static, you can use the directive as follows:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
 * Multiple static segments can be merged into one
 * (e.g., `['/team/11/user', userName, {details: true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 *   app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 *   instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * (Deprecated in v4.0.0 use `queryParamsHandling` instead) You can also tell the
 * directive to preserve the current query params and fragment:
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
 *   link to user component
 * </a>
 * ```
 *
 * You can tell the directive how to handle queryParams. Available options are:
 *  - `'merge'`: merge the queryParams into the current queryParams
 *  - `'preserve'`: preserve the current queryParams
 *  - default/`''`: use the queryParams only
 *
 * Same options for {\@link NavigationExtras#queryParamsHandling
 * NavigationExtras#queryParamsHandling}.
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * You can provide a `state` value to be persisted to the browser's History.state
 * property (See https://developer.mozilla.org/en-US/docs/Web/API/History#Properties). It's
 * used as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
 *   link to user component
 * </a>
 * ```
 *
 * And later the value can be read from the router through `router.getCurrentNavigation`.
 * For example, to capture the `tracingId` above during the `NavigationStart` event:
 *
 * ```
 * // Get NavigationStart events
 * router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
 *   const navigation = router.getCurrentNavigation();
 *   tracingService.trace({id: navigation.extras.state.tracingId});
 * });
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`.
 *
 * See {\@link Router#createUrlTree createUrlTree} for more information.
 *
 * \@ngModule RouterModule
 *
 * \@publicApi
 */
export class RouterLink {
    /**
     * @param {?} router
     * @param {?} route
     * @param {?} tabIndex
     * @param {?} renderer
     * @param {?} el
     */
    constructor(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.commands = [];
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    /**
     * @param {?} commands
     * @return {?}
     */
    set routerLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    /**
     * @deprecated 4.0.0 use `queryParamsHandling` instead.
     * @param {?} value
     * @return {?}
     */
    set preserveQueryParams(value) {
        if (isDevMode() && (/** @type {?} */ (console)) && (/** @type {?} */ (console.warn))) {
            console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state,
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    }
    /**
     * @return {?}
     */
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}
RouterLink.decorators = [
    { type: Directive, args: [{ selector: ':not(a):not(area)[routerLink]' },] }
];
/** @nocollapse */
RouterLink.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: Renderer2 },
    { type: ElementRef }
];
RouterLink.propDecorators = {
    queryParams: [{ type: Input }],
    fragment: [{ type: Input }],
    queryParamsHandling: [{ type: Input }],
    preserveFragment: [{ type: Input }],
    skipLocationChange: [{ type: Input }],
    replaceUrl: [{ type: Input }],
    state: [{ type: Input }],
    routerLink: [{ type: Input }],
    preserveQueryParams: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    RouterLink.prototype.queryParams;
    /** @type {?} */
    RouterLink.prototype.fragment;
    /** @type {?} */
    RouterLink.prototype.queryParamsHandling;
    /** @type {?} */
    RouterLink.prototype.preserveFragment;
    /** @type {?} */
    RouterLink.prototype.skipLocationChange;
    /** @type {?} */
    RouterLink.prototype.replaceUrl;
    /** @type {?} */
    RouterLink.prototype.state;
    /**
     * @type {?}
     * @private
     */
    RouterLink.prototype.commands;
    /**
     * @type {?}
     * @private
     */
    RouterLink.prototype.preserve;
    /**
     * @type {?}
     * @private
     */
    RouterLink.prototype.router;
    /**
     * @type {?}
     * @private
     */
    RouterLink.prototype.route;
}
/**
 * \@description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * \@ngModule RouterModule
 *
 * \@publicApi
 */
export class RouterLinkWithHref {
    /**
     * @param {?} router
     * @param {?} route
     * @param {?} locationStrategy
     */
    constructor(router, route, locationStrategy) {
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        (s) => {
            if (s instanceof NavigationEnd) {
                this.updateTargetUrlAndHref();
            }
        }));
    }
    /**
     * @param {?} commands
     * @return {?}
     */
    set routerLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preserveQueryParams(value) {
        if (isDevMode() && (/** @type {?} */ (console)) && (/** @type {?} */ (console.warn))) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.updateTargetUrlAndHref();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    onClick(button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        /** @type {?} */
        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    updateTargetUrlAndHref() {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    }
    /**
     * @return {?}
     */
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}
RouterLinkWithHref.decorators = [
    { type: Directive, args: [{ selector: 'a[routerLink],area[routerLink]' },] }
];
/** @nocollapse */
RouterLinkWithHref.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: LocationStrategy }
];
RouterLinkWithHref.propDecorators = {
    target: [{ type: HostBinding, args: ['attr.target',] }, { type: Input }],
    queryParams: [{ type: Input }],
    fragment: [{ type: Input }],
    queryParamsHandling: [{ type: Input }],
    preserveFragment: [{ type: Input }],
    skipLocationChange: [{ type: Input }],
    replaceUrl: [{ type: Input }],
    state: [{ type: Input }],
    href: [{ type: HostBinding }],
    routerLink: [{ type: Input }],
    preserveQueryParams: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] }]
};
if (false) {
    /** @type {?} */
    RouterLinkWithHref.prototype.target;
    /** @type {?} */
    RouterLinkWithHref.prototype.queryParams;
    /** @type {?} */
    RouterLinkWithHref.prototype.fragment;
    /** @type {?} */
    RouterLinkWithHref.prototype.queryParamsHandling;
    /** @type {?} */
    RouterLinkWithHref.prototype.preserveFragment;
    /** @type {?} */
    RouterLinkWithHref.prototype.skipLocationChange;
    /** @type {?} */
    RouterLinkWithHref.prototype.replaceUrl;
    /** @type {?} */
    RouterLinkWithHref.prototype.state;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.commands;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.preserve;
    /** @type {?} */
    RouterLinkWithHref.prototype.href;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.router;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.route;
    /**
     * @type {?}
     * @private
     */
    RouterLinkWithHref.prototype.locationStrategy;
}
/**
 * @param {?} s
 * @return {?}
 */
function attrBoolValue(s) {
    return s === '' || !!s;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBd0IsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSTdJLE9BQU8sRUFBUSxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUcvQyxNQUFNLE9BQU8sVUFBVTs7Ozs7Ozs7SUFrQnJCLFlBQ1ksTUFBYyxFQUFVLEtBQXFCLEVBQzlCLFFBQWdCLEVBQUUsUUFBbUIsRUFBRSxFQUFjO1FBRHBFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUxqRCxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBTzNCLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtZQUNwQixRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUNJLFVBQVUsQ0FBQyxRQUFzQjtRQUNuQyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFB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Q0FBcUQ7O0lBRXJELHlDQUEwQzs7SUFFMUMsc0NBQTJCOztJQUUzQixpREFBbUQ7O0lBRW5ELDhDQUFvQzs7SUFFcEMsZ0RBQXNDOztJQUV0Qyx3Q0FBOEI7O0lBQzlCLG1DQUFvQzs7Ozs7SUFDcEMsc0NBQTZCOzs7OztJQUM3QiwwQ0FBbUM7Ozs7O0lBRW5DLHNDQUEyQjs7SUFJM0Isa0NBQTZCOzs7OztJQUd6QixvQ0FBc0I7Ozs7O0lBQUUsbUNBQTZCOzs7OztJQUNyRCw4Q0FBMEM7Ozs7OztBQW1FaEQsU0FBUyxhQUFhLENBQUMsQ0FBTTtJQUMzQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0F0dHJpYnV0ZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgaXNEZXZNb2RlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtRdWVyeVBhcmFtc0hhbmRsaW5nfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtFdmVudCwgTmF2aWdhdGlvbkVuZH0gZnJvbSAnLi4vZXZlbnRzJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7VXJsVHJlZX0gZnJvbSAnLi4vdXJsX3RyZWUnO1xuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogTGV0cyB5b3UgbGluayB0byBzcGVjaWZpYyByb3V0ZXMgaW4geW91ciBhcHAuXG4gKlxuICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyByb3V0ZSBjb25maWd1cmF0aW9uOlxuICogYFt7IHBhdGg6ICd1c2VyLzpuYW1lJywgY29tcG9uZW50OiBVc2VyQ21wIH1dYC5cbiAqIFdoZW4gbGlua2luZyB0byB0aGlzIGB1c2VyLzpuYW1lYCByb3V0ZSwgeW91IHVzZSB0aGUgYFJvdXRlckxpbmtgIGRpcmVjdGl2ZS5cbiAqXG4gKiBJZiB0aGUgbGluayBpcyBzdGF0aWMsIHlvdSBjYW4gdXNlIHRoZSBkaXJlY3RpdmUgYXMgZm9sbG93czpcbiAqIGA8YSByb3V0ZXJMaW5rPVwiL3VzZXIvYm9iXCI+bGluayB0byB1c2VyIGNvbXBvbmVudDwvYT5gXG4gKlxuICogSWYgeW91IHVzZSBkeW5hbWljIHZhbHVlcyB0byBnZW5lcmF0ZSB0aGUgbGluaywgeW91IGNhbiBwYXNzIGFuIGFycmF5IG9mIHBhdGhcbiAqIHNlZ21lbnRzLCBmb2xsb3dlZCBieSB0aGUgcGFyYW1zIGZvciBlYWNoIHNlZ21lbnQuXG4gKlxuICogRm9yIGluc3RhbmNlIGBbJy90ZWFtJywgdGVhbUlkLCAndXNlcicsIHVzZXJOYW1lLCB7ZGV0YWlsczogdHJ1ZX1dYFxuICogbWVhbnMgdGhhdCB3ZSB3YW50IHRvIGdlbmVyYXRlIGEgbGluayB0byBgL3RlYW0vMTEvdXNlci9ib2I7ZGV0YWlscz10cnVlYC5cbiAqXG4gKiBNdWx0aXBsZSBzdGF0aWMgc2VnbWVudHMgY2FuIGJlIG1lcmdlZCBpbnRvIG9uZVxuICogKGUuZy4sIGBbJy90ZWFtLzExL3VzZXInLCB1c2VyTmFtZSwge2RldGFpbHM6IHRydWV9XWApLlxuICpcbiAqIFRoZSBmaXJzdCBzZWdtZW50IG5hbWUgY2FuIGJlIHByZXBlbmRlZCB3aXRoIGAvYCwgYC4vYCwgb3IgYC4uL2A6XG4gKiAqIElmIHRoZSBmaXJzdCBzZWdtZW50IGJlZ2lucyB3aXRoIGAvYCwgdGhlIHJvdXRlciB3aWxsIGxvb2sgdXAgdGhlIHJvdXRlIGZyb20gdGhlIHJvb3Qgb2YgdGhlXG4gKiAgIGFwcC5cbiAqICogSWYgdGhlIGZpcnN0IHNlZ21lbnQgYmVnaW5zIHdpdGggYC4vYCwgb3IgZG9lc24ndCBiZWdpbiB3aXRoIGEgc2xhc2gsIHRoZSByb3V0ZXIgd2lsbFxuICogICBpbnN0ZWFkIGxvb2sgaW4gdGhlIGNoaWxkcmVuIG9mIHRoZSBjdXJyZW50IGFjdGl2YXRlZCByb3V0ZS5cbiAqICogQW5kIGlmIHRoZSBmaXJzdCBzZWdtZW50IGJlZ2lucyB3aXRoIGAuLi9gLCB0aGUgcm91dGVyIHdpbGwgZ28gdXAgb25lIGxldmVsLlxuICpcbiAqIFlvdSBjYW4gc2V0IHF1ZXJ5IHBhcmFtcyBhbmQgZnJhZ21lbnQgYXMgZm9sbG93czpcbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvYm9iJ11cIiBbcXVlcnlQYXJhbXNdPVwie2RlYnVnOiB0cnVlfVwiIGZyYWdtZW50PVwiZWR1Y2F0aW9uXCI+XG4gKiAgIGxpbmsgdG8gdXNlciBjb21wb25lbnRcbiAqIDwvYT5cbiAqIGBgYFxuICogUm91dGVyTGluayB3aWxsIHVzZSB0aGVzZSB0byBnZW5lcmF0ZSB0aGlzIGxpbms6IGAvdXNlci9ib2IjZWR1Y2F0aW9uP2RlYnVnPXRydWVgLlxuICpcbiAqIChEZXByZWNhdGVkIGluIHY0LjAuMCB1c2UgYHF1ZXJ5UGFyYW1zSGFuZGxpbmdgIGluc3RlYWQpIFlvdSBjYW4gYWxzbyB0ZWxsIHRoZVxuICogZGlyZWN0aXZlIHRvIHByZXNlcnZlIHRoZSBjdXJyZW50IHF1ZXJ5IHBhcmFtcyBhbmQgZnJhZ21lbnQ6XG4gKlxuICogYGBgXG4gKiA8YSBbcm91dGVyTGlua109XCJbJy91c2VyL2JvYiddXCIgcHJlc2VydmVRdWVyeVBhcmFtcyBwcmVzZXJ2ZUZyYWdtZW50PlxuICogICBsaW5rIHRvIHVzZXIgY29tcG9uZW50XG4gKiA8L2E+XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIHRlbGwgdGhlIGRpcmVjdGl2ZSBob3cgdG8gaGFuZGxlIHF1ZXJ5UGFyYW1zLiBBdmFpbGFibGUgb3B0aW9ucyBhcmU6XG4gKiAgLSBgJ21lcmdlJ2A6IG1lcmdlIHRoZSBxdWVyeVBhcmFtcyBpbnRvIHRoZSBjdXJyZW50IHF1ZXJ5UGFyYW1zXG4gKiAgLSBgJ3ByZXNlcnZlJ2A6IHByZXNlcnZlIHRoZSBjdXJyZW50IHF1ZXJ5UGFyYW1zXG4gKiAgLSBkZWZhdWx0L2AnJ2A6IHVzZSB0aGUgcXVlcnlQYXJhbXMgb25seVxuICpcbiAqIFNhbWUgb3B0aW9ucyBmb3Ige0BsaW5rIE5hdmlnYXRpb25FeHRyYXMjcXVlcnlQYXJhbXNIYW5kbGluZ1xuICogTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtc0hhbmRsaW5nfS5cbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvYm9iJ11cIiBbcXVlcnlQYXJhbXNdPVwie2RlYnVnOiB0cnVlfVwiIHF1ZXJ5UGFyYW1zSGFuZGxpbmc9XCJtZXJnZVwiPlxuICogICBsaW5rIHRvIHVzZXIgY29tcG9uZW50XG4gKiA8L2E+XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIHByb3ZpZGUgYSBgc3RhdGVgIHZhbHVlIHRvIGJlIHBlcnNpc3RlZCB0byB0aGUgYnJvd3NlcidzIEhpc3Rvcnkuc3RhdGVcbiAqIHByb3BlcnR5IChTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkjUHJvcGVydGllcykuIEl0J3NcbiAqIHVzZWQgYXMgZm9sbG93czpcbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvYm9iJ11cIiBbc3RhdGVdPVwie3RyYWNpbmdJZDogMTIzfVwiPlxuICogICBsaW5rIHRvIHVzZXIgY29tcG9uZW50XG4gKiA8L2E+XG4gKiBgYGBcbiAqXG4gKiBBbmQgbGF0ZXIgdGhlIHZhbHVlIGNhbiBiZSByZWFkIGZyb20gdGhlIHJvdXRlciB0aHJvdWdoIGByb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb25gLlxuICogRm9yIGV4YW1wbGUsIHRvIGNhcHR1cmUgdGhlIGB0cmFjaW5nSWRgIGFib3ZlIGR1cmluZyB0aGUgYE5hdmlnYXRpb25TdGFydGAgZXZlbnQ6XG4gKlxuICogYGBgXG4gKiAvLyBHZXQgTmF2aWdhdGlvblN0YXJ0IGV2ZW50c1xuICogcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpKS5zdWJzY3JpYmUoZSA9PiB7XG4gKiAgIGNvbnN0IG5hdmlnYXRpb24gPSByb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAqICAgdHJhY2luZ1NlcnZpY2UudHJhY2Uoe2lkOiBuYXZpZ2F0aW9uLmV4dHJhcy5zdGF0ZS50cmFjaW5nSWR9KTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhlIHJvdXRlciBsaW5rIGRpcmVjdGl2ZSBhbHdheXMgdHJlYXRzIHRoZSBwcm92aWRlZCBpbnB1dCBhcyBhIGRlbHRhIHRvIHRoZSBjdXJyZW50IHVybC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIGlmIHRoZSBjdXJyZW50IHVybCBpcyBgL3VzZXIvKGJveC8vYXV4OnRlYW0pYC5cbiAqXG4gKiBUaGVuIHRoZSBmb2xsb3dpbmcgbGluayBgPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9qaW0nXVwiPkppbTwvYT5gIHdpbGwgZ2VuZXJhdGUgdGhlIGxpbmtcbiAqIGAvdXNlci8oamltLy9hdXg6dGVhbSlgLlxuICpcbiAqIFNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgY3JlYXRlVXJsVHJlZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQG5nTW9kdWxlIFJvdXRlck1vZHVsZVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICc6bm90KGEpOm5vdChhcmVhKVtyb3V0ZXJMaW5rXSd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmsge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMhOiB7W2s6IHN0cmluZ106IGFueX07XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBmcmFnbWVudCE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zSGFuZGxpbmchOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0YXRlPzoge1trOiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZSE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZywgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAodGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJvdXRlckxpbmsoY29tbWFuZHM6IGFueVtdfHN0cmluZykge1xuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgNC4wLjAgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCEsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiBib29sZWFuIHtcbiAgICBjb25zdCBleHRyYXMgPSB7XG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHRoaXMuY29tbWFuZHMsIHtcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcbiAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50LFxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcbiAgICAgIHByZXNlcnZlRnJhZ21lbnQ6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZUZyYWdtZW50KSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIExldHMgeW91IGxpbmsgdG8gc3BlY2lmaWMgcm91dGVzIGluIHlvdXIgYXBwLlxuICpcbiAqIFNlZSBgUm91dGVyTGlua2AgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQG5nTW9kdWxlIFJvdXRlck1vZHVsZVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdhW3JvdXRlckxpbmtdLGFyZWFbcm91dGVyTGlua10nfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rV2l0aEhyZWYgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFyZ2V0JykgQElucHV0KCkgdGFyZ2V0ITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMhOiB7W2s6IHN0cmluZ106IGFueX07XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBmcmFnbWVudCE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zSGFuZGxpbmchOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0YXRlPzoge1trOiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZSE6IGJvb2xlYW47XG5cbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQEhvc3RCaW5kaW5nKCkgaHJlZiE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogRXZlbnQpID0+IHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCByb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkge1xuICAgIHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IGFueSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQuYnV0dG9uJywgJyRldmVudC5jdHJsS2V5JywgJyRldmVudC5tZXRhS2V5JywgJyRldmVudC5zaGlmdEtleSddKVxuICBvbkNsaWNrKGJ1dHRvbjogbnVtYmVyLCBjdHJsS2V5OiBib29sZWFuLCBtZXRhS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChidXR0b24gIT09IDAgfHwgY3RybEtleSB8fCBtZXRhS2V5IHx8IHNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0ID09PSAnc3RyaW5nJyAmJiB0aGlzLnRhcmdldCAhPSAnX3NlbGYnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRyYXMgPSB7XG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9O1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy51cmxUcmVlLCBleHRyYXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOiB2b2lkIHtcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLnNlcmlhbGl6ZVVybCh0aGlzLnVybFRyZWUpKTtcbiAgfVxuXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHRoaXMuY29tbWFuZHMsIHtcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcbiAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50LFxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcbiAgICAgIHByZXNlcnZlRnJhZ21lbnQ6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZUZyYWdtZW50KSxcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhdHRyQm9vbFZhbHVlKHM6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gcyA9PT0gJycgfHwgISFzO1xufVxuIl19