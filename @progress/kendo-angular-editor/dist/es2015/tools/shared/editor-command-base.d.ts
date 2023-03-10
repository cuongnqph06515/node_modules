/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subscription } from 'rxjs';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { EditorCommand, DialogCommand } from '../../common/commands';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare abstract class EditorCommandBase {
    protected command: DialogCommand | EditorCommand;
    protected button: ToolBarButtonComponent;
    protected editor: EditorComponent;
    protected localization: LocalizationService;
    protected subs: Subscription;
    constructor(command: DialogCommand | EditorCommand, button: ToolBarButtonComponent, editor: EditorComponent, localization: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected clickHandler(): void;
    protected onStateChange(_toolBarState: any): void;
}
