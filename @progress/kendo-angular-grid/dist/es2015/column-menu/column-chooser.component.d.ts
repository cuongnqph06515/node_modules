/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
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
export declare class ColumnChooserComponent implements OnDestroy {
    localization: LocalizationService;
    private columnInfoService;
    private popupService;
    private ngZone;
    private renderer;
    private changeDetector;
    /**
     * Specifies if the changes in the visibility of the column will be immediately applied.
     */
    autoSync: boolean;
    /**
     * Specifies if all columns can be hidden.
     */
    allowHideAll: boolean;
    readonly columns: any[];
    private popupRef;
    private closeClick;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService, popupService: PopupService, ngZone: NgZone, renderer: Renderer2, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(anchor: any, template: any): void;
    /**
     * @hidden
     */
    onApply(changed: any[]): void;
    /**
     * @hidden
     */
    onChange(changed: any[]): void;
    private close;
    private detachClose;
}
