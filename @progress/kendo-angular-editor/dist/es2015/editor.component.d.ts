/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewInit, ViewContainerRef, ElementRef, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToolBarComponent } from '@progress/kendo-angular-toolbar';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Direction } from './common/direction';
import { EditorCommand, DialogCommand } from './common/commands';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PasteCleanupSettings } from './common/paste-cleanup-settings';
/**
 * Represents the [Kendo UI Editor component for Angular]({% slug overview_editor %}).
 */
export declare class EditorComponent implements AfterViewInit, ControlValueAccessor {
    private dialogService;
    private localization;
    private cdr;
    private ngZone;
    private element;
    /**
     * Sets the value of the Editor ([see example]({% slug overview_editor %}#toc-basic-usage)).
     */
    value: string;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Sets the read-only state of the component.
     */
    readonly: boolean;
    /**
     * If set to `false`, the Editor will run in style non-encapsulated mode. This means
     * that the styles of the page will be persisted in the Editor and its content will be affected by them.
     */
    iframe: boolean;
    /**
     * By design, the Editor emits `valueChange`, updates the model and the ToolBar state on each keystroke.
     * When you are interested in ignoring the new values for a given amout of time and take only the most recent one, you can use the `updateInterval` property.
     * A possible use case is to get the new values and to update the ToolBar state at a maximum rate per second in order to speed up your application.
     * The specified interval (in milliseconds) should be a positive number.
     * By default the `updateInterval` is set to 100 miliseconds. If set to zero the delay will be disabled entirely.
     */
    updateInterval: number;
    /**
     * Configures how pasted content is modified before it is added to the Editor. ([see example]({% slug paste_cleanup %}))
     */
    pasteCleanupSettings: PasteCleanupSettings;
    /**
     * Fires each time the value of the Editor is changed upon user interaction&mdash;
     * for example, when the component is blurred or the value is updated through the `viewSource` dialog.
     * When the value of the Editor is programmatically changed through its API (`ngModel`) or form binding (`formControl`),
     * the `valueChange` event is not triggered because it might cause a mix-up with the
     * built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
     */
    valueChange: EventEmitter<string>;
    hostClasses: boolean;
    readonly isDisabled: boolean;
    readonly isReadonly: boolean;
    readonly isIE: boolean;
    readonly dir: Direction;
    readonly ariaDisabled: boolean;
    /**
     * @hidden
     */
    stateChange: BehaviorSubject<any>;
    readonly toolbar: ToolBarComponent;
    /**
     * @hidden
     */
    valueModified: Subject<any>;
    userToolBarComponent: ToolBarComponent;
    userToolBarElement: ElementRef;
    dialogContainer: ViewContainerRef;
    container: ViewContainerRef;
    direction: Direction;
    viewMountElement: HTMLElement;
    private defaultToolbar;
    private defaultToolbarComponent;
    private subs;
    private view;
    private _value;
    private _previousValue;
    private _disabled;
    private _readonly;
    private afterViewInit;
    private contentAreaLoaded;
    constructor(dialogService: DialogService, localization: LocalizationService, cdr: ChangeDetectorRef, ngZone: NgZone, element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    iframeOnLoad(): void;
    /**
     * Executes a command on the currently selected text
     * ([more information and example]({% slug toolbartools_editor %}#toc-custom-tools)).
     *
     * @param {EditorCommand} commandName - The command that will be executed.
     * @param {any} attr - Optional parameters for the command. Apart from the following list,
     * the parameters do not expect specific attributes when you call them:
     * - `format` - Accepts an object with the `tag` property.
     * The supported tags are `p`, `blockquote`, and any of the `h1` to `h6` heading tags.
     * - `createLink` - Accepts an object with the `href`, `title`, and `target` properties. The `href` property is mandatory.
     * - `setHTML` - Accepts a `string` parameter.
     * - `insertTable` - Accepts an object with the `rows` and `cols` properties. The number values are zero based.
     *
     * @example
     * ```ts-no-run
     * // Toggles the bold styling.
     * editor.exec('bold');
     *
     * // Creates a bullet list.
     * editor.exec('insertUnorderedList');
     *
     * // Creates a link.
     * editor.exec('createLink', { href: 'www.progress.com', title: 'Progress', target: 'window' });
     *
     * // Inserts a file.
     * editor.exec('insertFile', { href: 'www.progress.com/resources/myfile.doc', title: 'My file', target: 'window' });
     *
     * // Inserts a image.
     * editor.exec('insertImage', { src: 'www.progress.com/resources/logo.jpg', title: 'Progress', target: 'window' });
     *
     * // Inserts a text at a given position. If no position is specified, the text will be inserted after the cursor.
     * editor.exec('insertText', { text: 'Hello World!', from: 0, to: 0 });
     *
     * // Changes the format of a text block.
     * editor.exec('format', { tag: 'h2' });
     *
     * // Changes the font size of the selected text.
     * editor.exec('fontSize', 24);
     *
     * // Changes the content of the Editor.
     * editor.exec('setHTML', '<p>HTML content</p>');
     *
     * // Creates and inserts a table with the specified number of rows and columns. Numbers are zero based.
     * this.editor.exec("insertTable", { rows: 3, cols: 5 });
     * ```
     */
    exec(commandName: EditorCommand, attr?: any): void;
    /**
     * Opens a dialog.
     * @param {DialogCommand} dialogName - The name of the dialog that will open.
     *
     * The supported values are:
     * * `createLink`
     * * `viewSource`
     * * `insertFile`
     * * `insertImage`
     * * `tableWizard`
     *
     * @example
     * ```ts-no-run
     * // Opens a `createLink` dialog.
     * editor.openDialog('createLink');
     *
     * // Opens a `viewSource` dialog.
     * editor.openDialog('viewSource');
     * ```
     */
    openDialog(dialogName: DialogCommand): void;
    /**
     * Manually focus the Editor.
     */
    focus(): void;
    /**
     * Manually blur the Editor.
     */
    blur(): void;
    /**
     * @hidden
     */
    getSource(): string;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    writeValue(value: any): void;
    /**
     * @hidden
     */
    registerOnChange(fn: Function): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: Function): void;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    private initialize;
    private onChangeCallback;
    private onTouchedCallback;
}
