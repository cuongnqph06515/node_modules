/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { commandIcons } from '../../config/command-icons';
/**
 * @hidden
 */
export class EditorCommandBase {
    constructor(command, button, editor, localization) {
        this.command = command;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    ngOnInit() {
        this.subs = this.editor.stateChange.subscribe(this.onStateChange.bind(this));
        this.subs.add(this.button.click.subscribe((this.clickHandler.bind(this))));
        Promise.resolve(null).then(() => {
            const text = this.localization.get(this.command);
            if (text) {
                this.button.showText = "overflow";
                this.button.showIcon = "both";
                this.button.text = text;
            }
            if (!this.button.icon) {
                this.button.icon = commandIcons[this.command];
            }
            this.button.title = text;
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    // tslint:disable-next-line
    clickHandler() { }
    // tslint:disable-next-line
    onStateChange(_toolBarState) { }
}
