/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ToolNavigationService } from '../navigation/tool-navigation.service';
/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
export class ToolBarSeparatorComponent extends ToolBarToolComponent {
    constructor() {
        super();
        this.navigationService = new ToolNavigationService();
    }
    ngAfterViewInit() {
        if (!this.popupTemplate) {
            this.popupTemplate = this.toolbarTemplate;
        }
    }
}
ToolBarSeparatorComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarSeparator',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarSeparatorComponent) }],
                selector: 'kendo-toolbar-separator',
                template: `
        <ng-template #toolbarTemplate>
            <div class="k-separator"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarSeparatorComponent.ctorParameters = () => [];
ToolBarSeparatorComponent.propDecorators = {
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    separator: [{ type: ViewChild, args: ['separator',] }]
};
