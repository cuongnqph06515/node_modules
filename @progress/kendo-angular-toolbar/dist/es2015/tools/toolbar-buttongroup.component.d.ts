/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, QueryList } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ToolBarButtonComponent } from './toolbar-button.component';
import { ButtonLook, Button } from '@progress/kendo-angular-buttons';
import { ButtonGroupSelection } from '../group-selection-settings';
/**
 * Represents the Kendo UI Toolbar ButtonGroup for Angular.
 */
export declare class ToolBarButtonGroupComponent extends ToolBarToolComponent {
    /**
     * By default, the ButtonGroup is enabled. To disable the whole group of buttons, set its `disabled`
     * attribute to `true`. To disable a specific button, set the `disabled` attribute of the button to
     * `true` and leave the `disabled` attribute of the ButtonGroup undefined. If you define the `disabled`
     * attribute of the ButtonGroup, it will take precedence over the `disabled` attributes of the underlying
     * buttons and they will be ignored.
     */
    disabled: boolean;
    /**
     * By default, the selection mode of the ButtonGroup is set to `multiple`.
     */
    selection: ButtonGroupSelection;
    /**
     * Sets the width of the ButtonGroup.
     *
     * If the width of the ButtonGroup is set:
     * - The buttons resize automatically to fill the full width of the group wrapper.
     * - The buttons acquire the same width.
     */
    width: string;
    /**
     * Changes the visual appearance by using alternative styling options.
     * The `look` property of the ButtonGroup takes precedence over the `look` property
     * of the individual buttons that are part of the group.
     *
     * The available values are:
     * * `bare`
     * * `flat`
     * * `outline`
     */
    look: ButtonLook;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    buttons: QueryList<ToolBarButtonComponent>;
    overflowButtons: ToolBarButtonComponent[];
    toolbarButtons: ToolBarButtonComponent[];
    constructor();
    selectedChangeHandler(state: boolean, button: Button): void;
}
