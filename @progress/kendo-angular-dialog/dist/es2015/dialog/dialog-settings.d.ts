/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { ActionsLayout } from '../common/actions-layout';
/**
 * The settings for the Dialog actions when the Dialog is opened through `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
export declare class DialogAction {
    /**
     * The text of the action button.
     */
    text: string;
    /**
     * Determines if the action button is styled as a primary button.
     */
    primary?: boolean;
}
/**
 * Indicates that the **Close** button is clicked. Used when the results from
 * the Dialogs that are opened through `DialogService` are filtered
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
export declare class DialogCloseResult {
}
/**
 * Specifies the possible result types of the Dialog. Instances of
 * [`DialogCloseResult`]({% slug api_dialog_dialogcloseresult %})
 * indicate that the **Close** button of the Dialog was clicked
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open).
 * Otherwise, the value is the configuration of the action button that was clicked.
 */
export declare type DialogResult = DialogCloseResult | DialogAction;
/**
 * The settings that can be used when the Dialog is opened through `DialogService`.
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
export declare class DialogSettings {
    /**
     * Defines a predicate that verifies if the pressed dialog action should be prevented. Returning true from the predicate prevents the dialog from closing.
     * If the **Close** button of the title bar is clicked, `DialogResult` is a `DialogCloseResult` instance.
     * If the Dialog is closed through the action buttons, `DialogResult` contains the object that was passed when the Dialog was opened. ([see example]({% slug service_dialog %}#toc-closing-the-dialog))
     * @param {DialogResult} ev
     * @param {DialogRef} [dialogRef] - provided only when the dialog is created using a component.
     * @returns
     */
    preventAction?: (ev: DialogResult, dialogRef?: DialogRef) => boolean;
    /**
     * Sets the title of the Dialog. If `title` is omitted,
     * the Dialog will not render a **Close** button.
     */
    title?: string;
    /**
     * Defines the content of the Dialog.
     * ([see example]({% slug service_dialog %}#toc-using-components)).
     */
    content?: string | TemplateRef<any> | Function;
    /**
     * Specifies the width of the Dialog.
     * A numeric value sets the width in pixels.
     * A string value sets the width in arbitrary units&mdash;for example, `50%`.
     */
    width?: number | string;
    /**
     * Specifies the minimum width of the Dialog.
     * A numeric value sets the minimum width in pixels.
     * A string value sets the minimum width in arbitrary units&mdash;for example, `50%`.
     */
    minWidth?: number | string;
    /**
     * Specifies the maximum width of the Dialog.
     * A numeric value sets the maximum width in pixels.
     * A string value sets the maximum width in arbitrary units&mdash;for example, `50%`.
     */
    maxWidth?: number | string;
    /**
     * Specifies the height of the Dialog.
     * A numeric value sets the height in pixels.
     * A string value sets the height in arbitrary units&mdash;for example, `50%`.
     */
    height?: number | string;
    /**
     * Specifies the minimum height of the Dialog.
     * A numeric value sets the minimum height in pixels.
     * A string value sets the minimum height in arbitrary units&mdash;for example, `50%`.
     */
    minHeight?: number | string;
    /**
     * Specifies the maximum height of the Dialog.
     * A numeric value sets the maximum height in pixels.
     * A string value sets the maximum height in arbitrary units&mdash;for example, `50%`.
     */
    maxHeight?: number | string;
    /**
     * Defines the container in which the Dialog will be inserted.
     * Specifying this option changes the place in the page hierarchy where the Dialog will be inserted.
     * The styling of the component will remain the same.
     */
    appendTo?: ViewContainerRef;
    /**
     * Specifies the title of the close button.
     */
    closeTitle?: string;
    /**
     * Sets the action buttons of the Dialog.
     */
    actions?: DialogAction[] | any[] | TemplateRef<any>;
    /**
     * Specifies the layout of the action buttons in the Dialog.
     */
    actionsLayout?: ActionsLayout;
    /**
     * Sets the focused element query selector.
     */
    autoFocusedElement?: string;
}
/**
 * Holds references to the object instance and published events of the Dialog.
 * Controls the Dialogs that were opened through the `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
export declare class DialogRef {
    /**
     * Emits events when the Dialog is closed either through the **Close** button of the title bar or through the action buttons.
     * If the **Close** button of the title bar is clicked, `DialogResult` is a `DialogCloseResult` instance.
     * If the Dialog is closed through the action buttons, `DialogResult` contains the object that was passed when the Dialog was opened.
     * When `close` is called with an argument, the result is the passed argument.
     */
    result: Observable<DialogResult>;
    /**
     * A reference to the Dialog instance.
     */
    dialog: ComponentRef<DialogComponent>;
    /**
     * A reference to the child component of the Dialog.
     * Available when the Dialog is opened with [component content]({% slug service_dialog %}#toc-using-components).
     */
    content: ComponentRef<any>;
    /**
     * Allows you to close the Dialog through code.
     * When called with no arguments,
     * the `result` Observable will be of type DialogCloseResult.
     * When called with an argument, the `result` Observable will hold the provided value.
     */
    close: Function;
}
