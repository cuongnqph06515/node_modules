/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { DialogAction } from './dialog-settings';
import { ActionsLayout } from '../common/actions-layout';
/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
export declare class DialogActionsComponent {
    el: ElementRef;
    /**
     * Allows the declarative specification of the actions.
     */
    actions?: DialogAction[] | TemplateRef<any>;
    /**
     * Specifies the possible layout of the action buttons.
     */
    layout: ActionsLayout;
    /**
     * Fires when the user clicks an action button.
     */
    action: EventEmitter<DialogAction>;
    buttonGroupClassName: boolean;
    readonly className: boolean;
    constructor(el: ElementRef);
    /**
     * @hidden
     */
    actionTemplate(): boolean;
    /**
     * @hidden
     */
    onButtonClick(action: DialogAction, _e?: any): void;
    /**
     * @hidden
     */
    buttonClass(action: DialogAction): string;
}
