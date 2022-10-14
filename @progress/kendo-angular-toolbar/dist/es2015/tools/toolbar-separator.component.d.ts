/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
export declare class ToolBarSeparatorComponent extends ToolBarToolComponent implements AfterViewInit {
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    separator: ElementRef;
    constructor();
    ngAfterViewInit(): void;
}
