/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { ToolNavigation } from '../navigation/tool-navigation.interface';
/**
 * Represents the Base ToolBar Tool component for Angular.
 * Extend this class to create custom tools.
 */
export declare class ToolBarToolComponent {
    tabIndex: number;
    overflows: boolean;
    visibility: string;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    navigationService: ToolNavigation;
    /**
     * @hidden
     */
    responsive: boolean;
    constructor();
    readonly toolbarDisplay: string;
    readonly overflowDisplay: string;
}
