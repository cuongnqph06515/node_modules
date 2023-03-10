/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents the component for selecting columns in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-chooser` component.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-chooser [service]="service">
 *              </kendo-grid-columnmenu-chooser>
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
export class ColumnMenuChooserComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        this.expanded = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
    }
    get columns() {
        return this.columnInfoService.leafNamedColumns;
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
}
ColumnMenuChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-chooser',
                template: `
        <kendo-grid-columnmenu-item [text]="localization.get('columns')"
            icon="columns" [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnlist
                    [applyText]="localization.get('columnsApply')"
                    [resetText]="localization.get('columnsReset')"
                    [columns]="columns"
                    [autoSync]="false"
                    [allowHideAll]="false"
                    [actionsClass]="actionsClass"
                    (apply)="onApply($event)">
                </kendo-grid-columnlist>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuChooserComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: ChangeDetectorRef }
];
ColumnMenuChooserComponent.propDecorators = {
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    expanded: [{ type: Input }]
};
