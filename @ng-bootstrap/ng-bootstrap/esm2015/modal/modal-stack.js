import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, NgZone, RendererFactory2, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { ScrollBar } from '../util/scrollbar';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../util/scrollbar";
let NgbModalStack = class NgbModalStack {
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        });
    }
    open(moduleCFR, contentInjector, content, options) {
        const containerEl = options.container instanceof HTMLElement ? options.container : isDefined(options.container) ?
            this._document.querySelector(options.container) :
            this._document.body;
        const renderer = this._rendererFactory.createRenderer(null, null);
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        const removeBodyClass = () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._revertAriaHidden();
            }
        };
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        const activeModal = new NgbActiveModal();
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (result) => { ngbModalRef.close(result); };
        activeModal.dismiss = (reason) => { ngbModalRef.dismiss(reason); };
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    dismissAll(reason) { this._modalRefs.forEach(ngbModalRef => ngbModalRef.dismiss(reason)); }
    hasOpenModals() { return this._modalRefs.length > 0; }
    _attachBackdrop(moduleCFR, containerEl) {
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    }
    _getContentRef(moduleCFR, contentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    }
    _createFromTemplateRef(content, activeModal) {
        const context = {
            $implicit: activeModal,
            close(result) { activeModal.close(result); },
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    _createFromString(content) {
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    _createFromComponent(moduleCFR, contentInjector, content, context, options) {
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        const componentRef = contentCmptFactory.create(modalContentInjector);
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            componentNativeEl.classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _setAriaHidden(element) {
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach(sibling => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            });
            this._setAriaHidden(parent);
        }
    }
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        });
        this._ariaHiddenValues.clear();
    }
    _registerModalRef(ngbModalRef) {
        const unregisterModalRef = () => {
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
};
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 },
    { type: NgZone }
];
NgbModalStack.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.ScrollBar), i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i0.NgZone)); }, token: NgbModalStack, providedIn: "root" });
NgbModalStack = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(2, Inject(DOCUMENT))
], NgbModalStack);
export { NgbModalStack };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWxELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc5QyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBU3hCLFlBQ1ksZUFBK0IsRUFBVSxTQUFtQixFQUE0QixTQUFjLEVBQ3RHLFVBQXFCLEVBQVUsZ0JBQWtDLEVBQVUsT0FBZTtRQUQxRixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQTRCLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFDdEcsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUFVLHFCQUFnQixHQUFo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QUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUE5TDhCLGNBQWM7WUFBcUIsUUFBUTs0Q0FBRyxNQUFNLFNBQUMsUUFBUTtZQUNsRSxTQUFTO1lBQTRCLGdCQUFnQjtZQUFtQixNQUFNOzs7QUFYM0YsYUFBYTtJQUR6QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFXNEMsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7R0FWaEYsYUFBYSxDQXdNekI7U0F4TVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge25nYkZvY3VzVHJhcH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQge1Njcm9sbEJhcn0gZnJvbSAnLi4vdXRpbC9zY3JvbGxiYXInO1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7TmdiTW9kYWxPcHRpb25zfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQge05nYkFjdGl2ZU1vZGFsLCBOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFN0YWNrIHtcbiAgcHJpdmF0ZSBfYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIF9hcmlhSGlkZGVuVmFsdWVzOiBNYXA8RWxlbWVudCwgc3RyaW5nIHwgbnVsbD4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgX2JhY2tkcm9wQXR0cmlidXRlcyA9IFsnYmFja2Ryb3BDbGFzcyddO1xuICBwcml2YXRlIF9tb2RhbFJlZnM6IE5nYk1vZGFsUmVmW10gPSBbXTtcbiAgcHJpdmF0ZSBfd2luZG93QXR0cmlidXRlcyA9XG4gICAgICBbJ2FyaWFMYWJlbGxlZEJ5JywgJ2FyaWFEZXNjcmliZWRCeScsICdiYWNrZHJvcCcsICdjZW50ZXJlZCcsICdrZXlib2FyZCcsICdzY3JvbGxhYmxlJywgJ3NpemUnLCAnd2luZG93Q2xhc3MnXTtcbiAgcHJpdmF0ZSBfd2luZG93Q21wdHM6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9zY3JvbGxCYXI6IFNjcm9sbEJhciwgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIC8vIFRyYXAgZm9jdXMgb24gYWN0aXZlIFdpbmRvd0NtcHRcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhY3RpdmVXaW5kb3dDbXB0ID0gdGhpcy5fd2luZG93Q21wdHNbdGhpcy5fd2luZG93Q21wdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIG5nYkZvY3VzVHJhcCh0aGlzLl9uZ1pvbmUsIGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQpO1xuICAgICAgICB0aGlzLl9yZXZlcnRBcmlhSGlkZGVuKCk7XG4gICAgICAgIHRoaXMuX3NldEFyaWFIaWRkZW4oYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4obW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgb3B0aW9ucyk6IE5nYk1vZGFsUmVmIHtcbiAgICBjb25zdCBjb250YWluZXJFbCA9IG9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBvcHRpb25zLmNvbnRhaW5lciA6IGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuXG4gICAgY29uc3QgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciA9IHRoaXMuX3Njcm9sbEJhci5jb21wZW5zYXRlKCk7XG4gICAgY29uc3QgcmVtb3ZlQm9keUNsYXNzID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tb2RhbFJlZnMubGVuZ3RoKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgICAgIHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFjb250YWluZXJFbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPVxuICAgICAgICB0aGlzLl9nZXRDb250ZW50UmVmKG1vZHVsZUNGUiwgb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsLCBvcHRpb25zKTtcblxuICAgIGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPnwgdW5kZWZpbmVkID1cbiAgICAgICAgb3B0aW9ucy5iYWNrZHJvcCAhPT0gZmFsc2UgPyB0aGlzLl9hdHRhY2hCYWNrZHJvcChtb2R1bGVDRlIsIGNvbnRhaW5lckVsKSA6IHVuZGVmaW5lZDtcbiAgICBsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRhaW5lckVsLCBjb250ZW50UmVmKTtcbiAgICBsZXQgbmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmID0gbmV3IE5nYk1vZGFsUmVmKHdpbmRvd0NtcHRSZWYsIGNvbnRlbnRSZWYsIGJhY2tkcm9wQ21wdFJlZiwgb3B0aW9ucy5iZWZvcmVEaXNtaXNzKTtcblxuICAgIHRoaXMuX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWYpO1xuICAgIHRoaXMuX3JlZ2lzdGVyV2luZG93Q21wdCh3aW5kb3dDbXB0UmVmKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyLCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZW1vdmVCb2R5Q2xhc3MsIHJlbW92ZUJvZHlDbGFzcyk7XG4gICAgYWN0aXZlTW9kYWwuY2xvc2UgPSAocmVzdWx0OiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuY2xvc2UocmVzdWx0KTsgfTtcbiAgICBhY3RpdmVNb2RhbC5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKTsgfTtcblxuICAgIHRoaXMuX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoYmFja2Ryb3BDbXB0UmVmICYmIGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5fYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIG5nYk1vZGFsUmVmO1xuICB9XG5cbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxSZWZzLmZvckVhY2gobmdiTW9kYWxSZWYgPT4gbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pKTsgfVxuXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID4gMDsgfVxuXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55KTogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHtcbiAgICBsZXQgYmFja2Ryb3BGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsQmFja2Ryb3ApO1xuICAgIGxldCBiYWNrZHJvcENtcHRSZWYgPSBiYWNrZHJvcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGJhY2tkcm9wQ21wdFJlZi5ob3N0Vmlldyk7XG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiBiYWNrZHJvcENtcHRSZWY7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnksIGNvbnRlbnRSZWY6IGFueSk6XG4gICAgICBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcbiAgICBsZXQgd2luZG93RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbFdpbmRvdyk7XG4gICAgbGV0IHdpbmRvd0NtcHRSZWYgPSB3aW5kb3dGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3RvciwgY29udGVudFJlZi5ub2Rlcyk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB3aW5kb3dDbXB0UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0luc3RhbmNlOiBOZ2JNb2RhbFdpbmRvdywgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fd2luZG93QXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcbiAgICAgICAgd2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3BBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICBiYWNrZHJvcEluc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwsXG4gICAgICBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMpOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlTW9kYWwpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbUNvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgJGltcGxpY2l0OiBhY3RpdmVNb2RhbCxcbiAgICAgIGNsb3NlKHJlc3VsdCkgeyBhY3RpdmVNb2RhbC5jbG9zZShyZXN1bHQpOyB9LFxuICAgICAgZGlzbWlzcyhyZWFzb24pIHsgYWN0aXZlTW9kYWwuZGlzbWlzcyhyZWFzb24pOyB9XG4gICAgfTtcbiAgICBjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIGNvbnRleHQ6IE5nYkFjdGl2ZU1vZGFsLFxuICAgICAgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29udGVudENtcHRGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbnRlbnQpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudEluamVjdG9yID1cbiAgICAgICAgSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiQWN0aXZlTW9kYWwsIHVzZVZhbHVlOiBjb250ZXh0fV0sIHBhcmVudDogY29udGVudEluamVjdG9yfSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGVudENtcHRGYWN0b3J5LmNyZWF0ZShtb2RhbENvbnRlbnRJbmplY3Rvcik7XG4gICAgY29uc3QgY29tcG9uZW50TmF0aXZlRWwgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAob3B0aW9ucy5zY3JvbGxhYmxlKSB7XG4gICAgICAoY29tcG9uZW50TmF0aXZlRWwgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2NvbXBvbmVudC1ob3N0LXNjcm9sbGFibGUnKTtcbiAgICB9XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIC8vIEZJWE1FOiB3ZSBzaG91bGQgaGVyZSBnZXQgcmlkIG9mIHRoZSBjb21wb25lbnQgbmF0aXZlRWxlbWVudFxuICAgIC8vIGFuZCB1c2UgYFtBcnJheS5mcm9tKGNvbXBvbmVudE5hdGl2ZUVsLmNoaWxkTm9kZXMpXWAgaW5zdGVhZCBhbmQgcmVtb3ZlIHRoZSBhYm92ZSBDU1MgY2xhc3MuXG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50TmF0aXZlRWxdXSwgY29tcG9uZW50UmVmLmhvc3RWaWV3LCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QXJpYUhpZGRlbihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQgJiYgZWxlbWVudCAhPT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuICAgICAgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgIGlmIChzaWJsaW5nICE9PSBlbGVtZW50ICYmIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTQ1JJUFQnKSB7XG4gICAgICAgICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5zZXQoc2libGluZywgc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpO1xuICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zZXRBcmlhSGlkZGVuKHBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmV2ZXJ0QXJpYUhpZGRlbigpIHtcbiAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmZvckVhY2goKHZhbHVlLCBlbGVtZW50KSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYpIHtcbiAgICBjb25zdCB1bnJlZ2lzdGVyTW9kYWxSZWYgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21vZGFsUmVmcy5pbmRleE9mKG5nYk1vZGFsUmVmKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX21vZGFsUmVmcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fbW9kYWxSZWZzLnB1c2gobmdiTW9kYWxSZWYpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJNb2RhbFJlZiwgdW5yZWdpc3Rlck1vZGFsUmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyV2luZG93Q21wdChuZ2JXaW5kb3dDbXB0OiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+KSB7XG4gICAgdGhpcy5fd2luZG93Q21wdHMucHVzaChuZ2JXaW5kb3dDbXB0KTtcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG5cbiAgICBuZ2JXaW5kb3dDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3dpbmRvd0NtcHRzLmluZGV4T2YobmdiV2luZG93Q21wdCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl93aW5kb3dDbXB0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==