/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { HostListener, HostBinding, ElementRef, Renderer2, NgZone, Directive } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
/**
 * @hidden
 */
export class BaseCommandDirective extends Button {
    constructor(editService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
    }
    /**
     * @hidden
     */
    get visible() {
        if (this.cellContext) {
            return this.isEdited !== this.readVisible ? '' : 'none';
        }
    }
    get isEdited() {
        return Boolean(this.cellContext && this.cellContext.viewItem.editContext && !this.editService.isEditingCell());
    }
    get dataItem() {
        if (this.cellContext) {
            return this.cellContext.viewItem.data;
        }
    }
    /**
     * @hidden
     */
    clickHandler(e) {
        e.preventDefault();
        this.onClick();
    }
}
BaseCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListBaseCommand]'
            },] },
];
/** @nocollapse */
BaseCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
BaseCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    clickHandler: [{ type: HostListener, args: ['click', ['$event'],] }]
};
