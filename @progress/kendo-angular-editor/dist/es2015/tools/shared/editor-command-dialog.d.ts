/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { DialogCommand } from '../../common/commands';
import { EditorComponent } from '../../editor.component';
import { EditorCommandBase } from './editor-command-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare abstract class EditorCommandDialog extends EditorCommandBase {
    protected dialog: DialogCommand;
    protected button: ToolBarButtonComponent;
    protected editor: EditorComponent;
    protected localization: LocalizationService;
    constructor(dialog: DialogCommand, button: ToolBarButtonComponent, editor: EditorComponent, localization: LocalizationService);
    protected clickHandler(): void;
    protected onStateChange(toolBarState: any): void;
}
