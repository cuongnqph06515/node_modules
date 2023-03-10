/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { closest } from '../rendering/common/dom-queries';
/**
 * Represents the component for selecting columns in the Grid. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_grid_toolbartemplatedirective %}) directive.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data">
 *          <ng-template kendoGridToolbarTemplate>
 *             <kendo-grid-column-chooser></kendo-grid-column-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
export class ColumnChooserComponent {
    constructor(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.popupService = popupService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        /**
         * Specifies if the changes in the visibility of the column will be immediately applied.
         */
        this.autoSync = false;
        /**
         * Specifies if all columns can be hidden.
         */
        this.allowHideAll = true;
    }
    get columns() {
        return this.columnInfoService.leafNamedColumns;
    }
    ngOnDestroy() {
        this.close();
    }
    /**
     * @hidden
     */
    toggle(anchor, template) {
        if (!this.popupRef) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(() => this.closeClick = this.renderer.listen("document", "click", ({ target }) => {
                if (!closest(target, node => node === this.popupRef.popupElement || node === anchor)) {
                    this.close();
                }
            }));
        }
        else {
            this.close();
        }
    }
    /**
     * @hidden
     */
    onApply(changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    }
    /**
     * @hidden
     */
    onChange(changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    }
    close() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    }
    detachClose() {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    }
}
ColumnChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-column-chooser',
                template: `
        <button #anchor
            type="button"
            (click)="toggle(anchor, template)"
            class="k-button k-bare k-button-icon"
            [attr.title]="localization.get('columns')">
            <span class="k-icon k-i-columns"></span>
        </button>
        <ng-template #template>
            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>
            <kendo-grid-columnlist
                [columns]="columns"
                [applyText]="localization.get('columnsApply')"
                [resetText]="localization.get('columnsReset')"
                [autoSync]="autoSync"
                [allowHideAll]="allowHideAll"
                (apply)="onApply($event)"
                (columnChange)="onChange($event)">
            </kendo-grid-columnlist>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ColumnChooserComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: PopupService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
ColumnChooserComponent.propDecorators = {
    autoSync: [{ type: Input }],
    allowHideAll: [{ type: Input }]
};
