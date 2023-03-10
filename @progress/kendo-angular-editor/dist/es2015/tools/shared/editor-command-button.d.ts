/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorCommand } from '../../common/commands';
import { EditorComponent } from '../../editor.component';
import { EditorCommandBase } from './editor-command-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare abstract class EditorCommandButton extends EditorCommandBase {
    protected command: EditorCommand;
    protected button: ToolBarButtonComponent;
    protected editor: EditorComponent;
    protected localization: LocalizationService;
    constructor(command: EditorCommand, button: ToolBarButtonComponent, editor: EditorComponent, localization: LocalizationService);
    protected clickHandler(): void;
    protected onStateChange(toolBarState: any): void;
}
