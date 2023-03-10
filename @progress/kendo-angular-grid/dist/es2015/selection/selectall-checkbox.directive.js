/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { detectIE } from './../utils';
import { Directive, HostBinding, Renderer2, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { SelectionService } from './selection.service';
import { isPresent } from "../utils";
/**
 * Represents the select-all checkbox feature of the Grid ([see example]({% slug selection_grid %}#toc-select-all-feature)).
 */
export class SelectAllCheckboxDirective {
    constructor(selectionService, el, renderer, ngZone) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        /**
         * Fires when the user clicks the `kendoGridSelectAllCheckbox` select-all checkbox
         * ([see example]({% slug selection_grid %}#toc-select-all-feature)).
         */
        this.selectAllChange = new EventEmitter();
        this.type = "checkbox";
        this.stateSet = false;
        this.ngZone.runOutsideAngular(() => {
            this.destroyClick = this.renderer.listen(this.el.nativeElement, "click", this.onClick.bind(this));
        });
    }
    ngAfterContentChecked() {
        this.setState();
    }
    ngOnChanges() {
        this.stateSet = true;
    }
    ngOnDestroy() {
        if (this.destroyClick) {
            this.destroyClick();
        }
    }
    /**
     * @hidden
     */
    onClick() {
        // yields consistent cross-browser behavior when clicking an "indeterminate" checkbox
        const undefinedCheckedStateInIE = detectIE() && this.selectionService.selectAllState === undefined;
        const isChecked = undefinedCheckedStateInIE ? true : this.el.nativeElement.checked;
        const options = this.selectionService.options;
        this.selectAllChange.emit(isChecked ? "checked" : "unchecked");
        if (options.enabled && options.mode === "multiple") {
            this.ngZone.run(() => {
                this.selectionService.updateAll(isChecked);
            });
        }
    }
    /**
     * @hidden
     */
    setState() {
        const state = this.stateSet ? this.stateToBool() : this.selectionService.selectAllState;
        const elem = this.el.nativeElement;
        this.renderer.setProperty(elem, "indeterminate", !isPresent(state));
        this.renderer.setProperty(elem, "checked", isPresent(state) ? state : false);
    }
    /**
     * @hidden
     */
    stateToBool() {
        switch (this.state) {
            case "checked":
                return true;
            case "unchecked":
                return false;
            default:
                return undefined;
        }
    }
}
SelectAllCheckboxDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectAllCheckbox]'
            },] },
];
/** @nocollapse */
SelectAllCheckboxDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
SelectAllCheckboxDirective.propDecorators = {
    state: [{ type: Input }],
    selectAllChange: [{ type: Output }],
    type: [{ type: HostBinding, args: ['attr.type',] }]
};
