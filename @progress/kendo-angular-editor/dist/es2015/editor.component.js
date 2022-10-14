/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ViewChild, ContentChild, ViewContainerRef, Output, ElementRef, EventEmitter, forwardRef, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Subject, zip } from 'rxjs';
import { map, filter, auditTime } from 'rxjs/operators';
import { ToolBarComponent } from '@progress/kendo-angular-toolbar';
import { DialogService } from '@progress/kendo-angular-dialog';
import { isDocumentAvailable, KendoInput } from '@progress/kendo-angular-common';
import { buildKeymap, buildListKeymap, hasSameMarkup, getHtml, pasteCleanup, sanitize, removeComments, sanitizeClassAttr, sanitizeStyleAttr, removeAttribute, EditorView, EditorState, baseKeymap, keymap, history, parseContent, Plugin, PluginKey, TextSelection } from '@progress/kendo-editor-common';
import { schema } from './config/schema';
import { editorCommands } from './config/commands';
import { getToolbarState, initialToolBarState, disabledToolBarState } from './editor-toolbar-state';
import { detectIE, removeEmptyEntries, conditionallyExecute, pipe } from './util';
import { SourceDialogComponent } from './dialogs/source-dialog.component';
import { ImageDialogComponent } from './dialogs/image-dialog.component';
import { FileLinkDialogComponent } from './dialogs/file-link-dialog.component';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { EditorLocalizationService } from './localization/editor-localization.service';
import { defaultStyle, tablesStyles, rtlStyles } from './common/styles';
const EMPTY_PARAGRAPH = '<p></p>';
const defaultPasteCleanupSettings = {
    convertMsLists: false,
    removeAttributes: [],
    removeHtmlComments: false,
    removeInvalidHTML: false,
    removeMsClasses: false,
    removeMsStyles: false,
    stripTags: ['']
};
const removeCommentsIf = conditionallyExecute(removeComments);
const removeInvalidHTMLIf = conditionallyExecute(sanitize);
const getPasteCleanupAttributes = (config) => {
    if (config.removeAttributes === 'all') {
        return { '*': removeAttribute };
    }
    const initial = removeEmptyEntries({
        style: config.removeMsStyles ? sanitizeStyleAttr : undefined,
        class: config.removeMsClasses ? sanitizeClassAttr : undefined
    });
    return config.removeAttributes.reduce((acc, curr) => (Object.assign({}, acc, { [curr]: removeAttribute })), initial);
};
const ɵ0 = getPasteCleanupAttributes;
/**
 * Represents the [Kendo UI Editor component for Angular]({% slug overview_editor %}).
 */
export class EditorComponent {
    constructor(dialogService, localization, cdr, ngZone, element) {
        this.dialogService = dialogService;
        this.localization = localization;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.element = element;
        /**
         * If set to `false`, the Editor will run in style non-encapsulated mode. This means
         * that the styles of the page will be persisted in the Editor and its content will be affected by them.
         */
        this.iframe = true;
        /**
         * By design, the Editor emits `valueChange`, updates the model and the ToolBar state on each keystroke.
         * When you are interested in ignoring the new values for a given amout of time and take only the most recent one, you can use the `updateInterval` property.
         * A possible use case is to get the new values and to update the ToolBar state at a maximum rate per second in order to speed up your application.
         * The specified interval (in milliseconds) should be a positive number.
         * By default the `updateInterval` is set to 100 miliseconds. If set to zero the delay will be disabled entirely.
         */
        this.updateInterval = 100;
        /**
         * Fires each time the value of the Editor is changed upon user interaction&mdash;
         * for example, when the component is blurred or the value is updated through the `viewSource` dialog.
         * When the value of the Editor is programmatically changed through its API (`ngModel`) or form binding (`formControl`),
         * the `valueChange` event is not triggered because it might cause a mix-up with the
         * built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.stateChange = new BehaviorSubject(initialToolBarState);
        /**
         * @hidden
         */
        this.valueModified = new Subject();
        this._readonly = false;
        this.afterViewInit = new Subject();
        this.contentAreaLoaded = new Subject();
        this.onChangeCallback = (_) => { }; // tslint:disable-line:no-empty
        this.onTouchedCallback = (_) => { }; // tslint:disable-line:no-empty
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        // https://stackoverflow.com/questions/56572483/chrome-is-synchronously-handling-iframe-loading-whereas-firefox-handles-it-asyn
        this.subs = zip(this.afterViewInit.asObservable(), this.contentAreaLoaded.asObservable()).subscribe(() => this.initialize());
    }
    /**
     * Sets the value of the Editor ([see example]({% slug overview_editor %}#toc-basic-usage)).
     */
    set value(value) {
        this._value = value;
        this._previousValue = value;
        if (this.view) {
            this.exec('setHTML', this._value);
        }
    }
    get value() {
        let value = this.view ? this.getSource() : this._value;
        if (value === EMPTY_PARAGRAPH) {
            return this._value ? '' : this._value;
        }
        else {
            return value;
        }
    }
    /**
     * Sets the disabled state of the component.
     */
    set disabled(value) {
        this._disabled = value || false;
        if (this.view) {
            this.view.updateState(this.view.state);
        }
        if (this._disabled) {
            this.readonly = false;
        }
        if (this._disabled || this._readonly) {
            this.stateChange.next(disabledToolBarState);
        }
        else {
            this.stateChange.next(initialToolBarState);
        }
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Sets the read-only state of the component.
     */
    set readonly(value) {
        this._readonly = value || false;
        if (this.view) {
            // remove DOM selection
            let win;
            if (this.iframe) {
                win = this.container.element.nativeElement.contentWindow;
            }
            else {
                win = window;
            }
            const focusedNode = win.getSelection().focusNode;
            if (this.view.dom.contains(focusedNode)) {
                win.getSelection().removeAllRanges();
            }
            // remove ProseMirror selection
            const doc = this.view.state.doc;
            const tr = this.view.state.tr.setSelection(TextSelection.create(doc, 1));
            this.view.dispatch(tr);
        }
        if (this._readonly) {
            if (this.toolbar) {
                this.toolbar.tabindex = -1;
            }
            this.stateChange.next(disabledToolBarState);
        }
        else {
            if (this.toolbar) {
                this.toolbar.tabindex = 0;
            }
            this.stateChange.next(initialToolBarState);
        }
    }
    get readonly() {
        return this._readonly;
    }
    get isDisabled() {
        return this.disabled;
    }
    get isReadonly() {
        return this.readonly;
    }
    get isIE() {
        return this.iframe && detectIE();
    }
    get dir() {
        return this.direction;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get toolbar() {
        return this.defaultToolbarComponent || this.userToolBarComponent;
    }
    ngOnInit() {
        this.subs.add(this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        }));
    }
    ngAfterViewInit() {
        this.afterViewInit.next();
        if (!this.iframe) {
            this.contentAreaLoaded.next();
        }
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     */
    iframeOnLoad() {
        this.contentAreaLoaded.next();
    }
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
    exec(commandName, attr) {
        // Finds a command and applies the attributes.
        const command = editorCommands[commandName](attr);
        // Executes a ProseMirror command.
        command(this.view.state, this.view.dispatch, this.view);
        // See the `dispatchTransaction` comments.
        // this.stateChange.emit(updateToolBar(this.view));
    }
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
    openDialog(dialogName) {
        const editorDialogs = {
            createLink: {
                content: FileLinkDialogComponent
            },
            insertFile: {
                content: FileLinkDialogComponent
            },
            insertImage: {
                content: ImageDialogComponent
            },
            viewSource: {
                content: SourceDialogComponent,
                height: 400,
                width: 500
            }
            // tableWizard: {
            //     content: TableWizardDialogComponent
            // }
        };
        const dialog = Object.assign({ appendTo: this.dialogContainer }, editorDialogs[dialogName]);
        this.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialog).content.instance;
        if (dialogName === 'createLink' || dialogName === 'insertFile') {
            dialogContent.command = dialogName;
        }
        dialogContent.editor = this;
        dialogContent.setData(this.view.state);
    }
    /**
     * Manually focus the Editor.
     */
    focus() {
        this.view.focus();
    }
    /**
     * Manually blur the Editor.
     */
    blur() {
        this.view.dom.blur();
    }
    /**
     * @hidden
     */
    getSource() {
        return getHtml(this.view.state);
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    /**
     * @hidden
     */
    writeValue(value) {
        // To avoid confusion, non-existent values are always undefined.
        this.value = value === null ? undefined : value;
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    initialize() {
        if (!isDocumentAvailable()) {
            return;
        }
        const that = this;
        const containerNativeElement = this.container.element.nativeElement;
        const contentNode = parseContent((this.value || '').trim(), schema);
        if (this.iframe) {
            const iframeDoc = containerNativeElement.contentDocument;
            const meta = iframeDoc.createElement('meta');
            meta.setAttribute('charset', 'utf-8');
            iframeDoc.head.appendChild(meta);
            [defaultStyle, tablesStyles, this.dir === 'rtl' ? rtlStyles : undefined].forEach(styles => {
                if (styles) {
                    const style = iframeDoc.createElement('style');
                    style.appendChild(iframeDoc.createTextNode(styles));
                    iframeDoc.head.appendChild(style);
                }
            });
            const element = iframeDoc.createElement('div');
            iframeDoc.body.appendChild(element);
        }
        else {
            const element = document.createElement('div');
            containerNativeElement.appendChild(element);
        }
        const state = EditorState.create({
            schema: schema,
            doc: contentNode,
            plugins: [
                new Plugin({
                    key: new PluginKey('editor-tabindex'),
                    props: {
                        attributes: () => ({
                            // set tabindex when contenteditable is false, so that the content area can be selected
                            tabIndex: this.readonly ? '0' : ''
                        })
                    }
                }),
                new Plugin({
                    key: new PluginKey('toolbar-tools-update'),
                    view: () => ({
                        update: editorView => {
                            if (!this.disabled) {
                                this.stateChange.next(this.readonly ? disabledToolBarState : getToolbarState(editorView.state));
                            }
                        }
                    })
                }),
                new Plugin({
                    key: new PluginKey('editor-filter-disabled-state'),
                    filterTransaction: () => !this.disabled
                }),
                history(),
                keymap(buildListKeymap(schema)),
                keymap(buildKeymap(schema)),
                keymap(baseKeymap)
            ]
        });
        if (this.iframe) {
            this.viewMountElement = containerNativeElement.contentDocument.querySelector('div');
        }
        else {
            this.viewMountElement = containerNativeElement.querySelector('div');
        }
        this.ngZone.runOutsideAngular(() => {
            this.view = new EditorView({ mount: this.viewMountElement }, {
                state,
                editable: () => !this.readonly,
                dispatchTransaction: function (tr) {
                    // `this` is bound to the view instance.
                    this.updateState(this.state.apply(tr));
                    // that.cdr.detectChanges();
                    // When the user utilizes keyboard shortcuts&mdash;for example, `Ctrl`+`b`&mdash;
                    // `tr.docChanged` is `true` and the toolbar is not updated.
                    // A possible future solution is to move the keymaps to the service.
                    // if (!tr.docChanged) {
                    //     that.stateChange.emit(updateToolBar(that.view));
                    // }
                    const value = that.value;
                    if (!hasSameMarkup(value, that._previousValue, this.state.schema)) {
                        that._previousValue = value;
                        that.ngZone.run(() => that.valueModified.next(value));
                    }
                },
                transformPastedHTML: (html) => {
                    const pasteCleanupSettings = Object.assign({}, defaultPasteCleanupSettings, this.pasteCleanupSettings);
                    const clean = pipe(removeCommentsIf(pasteCleanupSettings.removeHtmlComments), removeInvalidHTMLIf(pasteCleanupSettings.removeInvalidHTML))(html);
                    const attributes = getPasteCleanupAttributes(pasteCleanupSettings);
                    return pasteCleanup(clean, {
                        convertMsLists: pasteCleanupSettings.convertMsLists,
                        stripTags: pasteCleanupSettings.stripTags.join('|'),
                        attributes
                    });
                }
            });
        });
        if (this.view) {
            let containerElement;
            const contentAreaClasslist = this.element.nativeElement.querySelector('.k-editor-content').classList;
            if (this.iframe) {
                containerElement = this.container.element.nativeElement.contentDocument;
            }
            else {
                containerElement = this.container.element.nativeElement;
            }
            this.subs.add(fromEvent(containerElement, 'focusin')
                .pipe(filter(() => this.readonly))
                .subscribe(() => contentAreaClasslist.add('k-state-focused')));
            this.subs.add(fromEvent(containerElement, 'focusout')
                .pipe(filter(() => this.readonly))
                .subscribe(() => contentAreaClasslist.remove('k-state-focused')));
        }
        this.subs.add(this.stateChange.subscribe(() => {
            if (this.userToolBarComponent) {
                this.userToolBarComponent.cdr.detectChanges();
            }
            else {
                this.cdr.detectChanges();
            }
        }));
        this.subs.add(merge(this.valueModified.pipe(filter(() => this.updateInterval > 0), auditTime(this.updateInterval)), this.valueModified.pipe(filter(() => this.updateInterval === 0))).subscribe((value) => {
            this.onChangeCallback(value);
            this.valueChange.emit(value);
            this.cdr.markForCheck();
        }));
        this.subs.add(fromEvent(this.viewMountElement, 'keyup')
            .pipe(map((e) => e.keyCode), filter((code) => code === 121), // F10
        map(() => this.userToolBarElement || this.defaultToolbar))
            .subscribe((toolbar) => toolbar.nativeElement.focus()));
        this.subs.add(fromEvent(this.viewMountElement, 'blur')
            .pipe(filter((event) => !this.viewMountElement.contains(event.relatedTarget)))
            .subscribe(() => this.onTouchedCallback()));
    }
}
EditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-editor',
                providers: [
                    EditorLocalizationService,
                    {
                        provide: LocalizationService,
                        useExisting: EditorLocalizationService
                    },
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.editor'
                    },
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => EditorComponent),
                        multi: true
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => EditorComponent)
                    }
                ],
                /* tslint:disable:max-line-length */
                template: `
        <ng-container
            kendoEditorLocalizedMessages
            i18n-alignCenter="kendo.editor.alignCenter|The title of the tool that aligns text in the center."
            alignCenter="Center text"
            i18n-alignJustify="kendo.editor.alignJustify|The title of the tool that justifies text both left and right."
            alignJustify="Justify"
            i18n-alignLeft="kendo.editor.alignLeft|The title of the tool that aligns text on the left."
            alignLeft="Align text left"
            i18n-alignRight="kendo.editor.alignRight|The title of the tool that aligns text on the right."
            alignRight="Align text right"
            i18n-backColor="kendo.editor.backColor|The title of the tool that changes the text background color."
            backColor="Background color"
            i18n-bold="kendo.editor.bold|The title of the tool that makes text bold."
            bold="Bold"
            i18n-cleanFormatting="kendo.editor.cleanFormatting|The title of the Clean Formatting tool."
            cleanFormatting="Clean formatting"
            i18n-createLink="kendo.editor.createLink|The title of the tool that creates hyperlinks."
            createLink="Insert link"
            i18n-dialogApply="kendo.editor.dialogApply|The label of the **Apply** button in all editor dialogs."
            dialogApply="Apply"
            i18n-dialogCancel="kendo.editor.dialogCancel|The label of the **Cancel** button in all editor dialogs."
            dialogCancel="Cancel"
            i18n-dialogInsert="kendo.editor.dialogInsert|The label of the **Insert** button in all editor dialogs."
            dialogInsert="Insert"
            i18n-dialogUpdate="kendo.editor.dialogUpdate|The label of the **Update** button in all editor dialogs."
            dialogUpdate="Update"
            i18n-fileText="kendo.editor.fileText|The caption for the file text in the insertFile dialog."
            fileText="Text"
            i18n-fileTitle="kendo.editor.fileTitle|The caption for the file Title in the insertFile dialog."
            fileTitle="Title"
            i18n-fileWebAddress="kendo.editor.fileWebAddress|The caption for the file URL in the insertFile dialog."
            fileWebAddress="Web address"
            i18n-fontFamily="kendo.editor.fontFamily|The title of the tool that changes the text font."
            fontFamily="Select font family"
            i18n-fontSize="kendo.editor.fontSize|The title of the tool that changes the text size."
            fontSize="Select font size"
            i18n-foreColor="kendo.editor.foreColor|The title of the tool that changes the text color."
            foreColor="Color"
            i18n-format="kendo.editor.format|The title of the tool that lets users choose block formats."
            format="Format"
            i18n-imageAltText="kendo.editor.imageAltText|The caption for the image alternate text in the insertImage dialog."
            imageAltText="Alternate text"
            i18n-imageHeight="kendo.editor.imageHeight|The caption for the image height in the insertImage dialog."
            imageHeight="Height (px)"
            i18n-imageWebAddress="kendo.editor.imageWebAddress|The caption for the image URL in the insertImage dialog."
            imageWebAddress="Web address"
            i18n-imageWidth="kendo.editor.imageWidth|The caption for the image width in the insertImage dialog."
            imageWidth="Width (px)"
            i18n-indent="kendo.editor.indent|The title of the tool that indents the content."
            indent="Indent"
            i18n-insertFile="kendo.editor.insertFile|The title of the tool that inserts links to files."
            insertFile="Insert file"
            i18n-insertImage="kendo.editor.insertImage|The title of the tool that inserts images."
            insertImage="Insert image"
            i18n-insertOrderedList="kendo.editor.insertOrderedList|The title of the tool that inserts an ordered list."
            insertOrderedList="Insert ordered list"
            i18n-insertUnorderedList="kendo.editor.insertUnorderedList|The title of the tool that inserts an unordered list."
            insertUnorderedList="Insert unordered list"
            i18n-italic="kendo.editor.italic|The title of the tool that makes text italicized."
            italic="Italic"
            i18n-linkOpenInNewWindow="kendo.editor.linkOpenInNewWindow|The caption for the checkbox for opening the link in a new window in the createLink dialog."
            linkOpenInNewWindow="Open link in new window"
            i18n-linkText="kendo.editor.linkText|The caption for the link text in the createLink dialog."
            linkText="Text"
            i18n-linkTitle="kendo.editor.linkTitle|The caption for the link title in the createLink dialog."
            linkTitle="Title"
            i18n-linkWebAddress="kendo.editor.linkWebAddress|The caption for the URL in the createLink dialog."
            linkWebAddress="Web address"
            i18n-outdent="kendo.editor.outdent|The title of the tool that outdents the content."
            outdent="Outdent"
            i18n-redo="kendo.editor.redo|The title of the tool that undos the last action."
            redo="Redo"
            i18n-strikethrough="kendo.editor.strikethrough|The title of the tool that strikes through text."
            strikethrough="Strikethrough"
            i18n-subscript="kendo.editor.subscript|The title of the tool that makes text subscript."
            subscript="Subscript"
            i18n-superscript="kendo.editor.superscript|The title of the tool that makes text superscript."
            superscript="Superscript"
            i18n-underline="kendo.editor.underline|The title of the tool that underlines text."
            underline="Underline"
            i18n-unlink="kendo.editor.unlink|The title of the tool that removes hyperlinks."
            unlink="Remove Link"
            i18n-undo="kendo.editor.undo|The title of the tool that undos the last action."
            undo="Undo"
            i18n-viewSource="kendo.editor.viewSource|The title of the tool that shows the editor value as HTML."
            viewSource="View source"
            i18n-insertTable="kendo.editor.insertTable|The title of the tool that inserts table."
            insertTable="Insert Table"
            i18n-addColumnBefore="kendo.editor.addColumnBefore|The title of the tool that adds new column before currently selected column."
            addColumnBefore="Add column before"
            i18n-addColumnAfter="kendo.editor.addColumnAfter|The title of the tool that adds new column after currently selected column."
            addColumnAfter="Add column after"
            i18n-addRowBefore="kendo.editor.addRowBefore|The title of the tool that adds new row before currently selected row."
            addRowBefore="Add row before"
            i18n-addRowAfter="kendo.editor.addRowAfter|The title of the tool that adds new row after currently selected row."
            addRowAfter="Add row after"
            i18n-deleteColumn="kendo.editor.deleteColumn|The title of the tool that deletes a table column."
            deleteColumn="Delete column"
            i18n-deleteRow="kendo.editor.deleteRow|The title of the tool that deletes a table row."
            deleteRow="Delete row"
            i18n-deleteTable="kendo.editor.deleteTable|The title of the tool that deletes a table."
            deleteTable="Delete table"
        >
        </ng-container>

        <ng-content select="kendo-toolbar"></ng-content>
        <kendo-toolbar [overflow]="true" [tabindex]="readonly ? -1 : 0" *ngIf="!userToolBarElement" #defaultToolbar>
            <kendo-toolbar-buttongroup>
                <kendo-toolbar-button kendoEditorBoldButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorItalicButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorUnderlineButton></kendo-toolbar-button>
            </kendo-toolbar-buttongroup>
            <kendo-toolbar-dropdownlist kendoEditorFormat></kendo-toolbar-dropdownlist>
            <kendo-toolbar-buttongroup>
                <kendo-toolbar-button kendoEditorAlignLeftButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorAlignCenterButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorAlignRightButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorAlignJustifyButton></kendo-toolbar-button>
            </kendo-toolbar-buttongroup>
            <kendo-toolbar-buttongroup>
                <kendo-toolbar-button kendoEditorInsertUnorderedListButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorInsertOrderedListButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorIndentButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorOutdentButton></kendo-toolbar-button>
            </kendo-toolbar-buttongroup>
            <kendo-toolbar-buttongroup>
                <kendo-toolbar-button kendoEditorCreateLinkButton></kendo-toolbar-button>
                <kendo-toolbar-button kendoEditorUnlinkButton></kendo-toolbar-button>
            </kendo-toolbar-buttongroup>
            <kendo-toolbar-button kendoEditorInsertImageButton></kendo-toolbar-button>
        </kendo-toolbar>

        <div *ngIf="!iframe" #content [attr.dir]="direction" class="k-editor-content"></div>

        <div class="k-editor-content" *ngIf="iframe">
            <iframe #content frameborder="0" class="k-iframe" (load)="iframeOnLoad()"></iframe>
        </div>

        <ng-container #dialogsContainer></ng-container>
    `,
                styles: [
                    `
            >>> .k-editor-content > .ProseMirror {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                outline: none;
                overflow: auto;
            }

            .k-iframe {
                width: 100%;
                height: 100%;
                display: block;
            }
        `
                ]
            },] },
];
/** @nocollapse */
EditorComponent.ctorParameters = () => [
    { type: DialogService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: ElementRef }
];
EditorComponent.propDecorators = {
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    iframe: [{ type: Input }],
    updateInterval: [{ type: Input }],
    pasteCleanupSettings: [{ type: Input }],
    valueChange: [{ type: Output }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-editor',] }],
    isDisabled: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    isReadonly: [{ type: HostBinding, args: ['class.k-readonly',] }],
    isIE: [{ type: HostBinding, args: ['class.k-ie',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.ariaDisabled',] }],
    userToolBarComponent: [{ type: ContentChild, args: [ToolBarComponent,] }],
    userToolBarElement: [{ type: ContentChild, args: [ToolBarComponent, { read: ElementRef },] }],
    dialogContainer: [{ type: ViewChild, args: ['dialogsContainer', { read: ViewContainerRef },] }],
    container: [{ type: ViewChild, args: ['content', { read: ViewContainerRef },] }],
    defaultToolbar: [{ type: ViewChild, args: ['defaultToolbar', { read: ElementRef },] }],
    defaultToolbarComponent: [{ type: ViewChild, args: ['defaultToolbar', { read: ToolBarComponent },] }]
};
export { ɵ0 };
