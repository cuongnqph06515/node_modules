/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var EMPTY_PARAGRAPH = '<p></p>';
var defaultPasteCleanupSettings = {
    convertMsLists: false,
    removeAttributes: [],
    removeHtmlComments: false,
    removeInvalidHTML: false,
    removeMsClasses: false,
    removeMsStyles: false,
    stripTags: ['']
};
var removeCommentsIf = conditionallyExecute(removeComments);
var removeInvalidHTMLIf = conditionallyExecute(sanitize);
var getPasteCleanupAttributes = function (config) {
    if (config.removeAttributes === 'all') {
        return { '*': removeAttribute };
    }
    var initial = removeEmptyEntries({
        style: config.removeMsStyles ? sanitizeStyleAttr : undefined,
        class: config.removeMsClasses ? sanitizeClassAttr : undefined
    });
    return config.removeAttributes.reduce(function (acc, curr) {
        var _a;
        return (tslib_1.__assign({}, acc, (_a = {}, _a[curr] = removeAttribute, _a)));
    }, initial);
};
var ɵ0 = getPasteCleanupAttributes;
/**
 * Represents the [Kendo UI Editor component for Angular]({% slug overview_editor %}).
 */
var EditorComponent = /** @class */ (function () {
    function EditorComponent(dialogService, localization, cdr, ngZone, element) {
        var _this = this;
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
        this.onChangeCallback = function (_) { }; // tslint:disable-line:no-empty
        this.onTouchedCallback = function (_) { }; // tslint:disable-line:no-empty
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        // https://stackoverflow.com/questions/56572483/chrome-is-synchronously-handling-iframe-loading-whereas-firefox-handles-it-asyn
        this.subs = zip(this.afterViewInit.asObservable(), this.contentAreaLoaded.asObservable()).subscribe(function () { return _this.initialize(); });
    }
    Object.defineProperty(EditorComponent.prototype, "value", {
        get: function () {
            var value = this.view ? this.getSource() : this._value;
            if (value === EMPTY_PARAGRAPH) {
                return this._value ? '' : this._value;
            }
            else {
                return value;
            }
        },
        /**
         * Sets the value of the Editor ([see example]({% slug overview_editor %}#toc-basic-usage)).
         */
        set: function (value) {
            this._value = value;
            this._previousValue = value;
            if (this.view) {
                this.exec('setHTML', this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * Sets the disabled state of the component.
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        /**
         * Sets the read-only state of the component.
         */
        set: function (value) {
            this._readonly = value || false;
            if (this.view) {
                // remove DOM selection
                var win = void 0;
                if (this.iframe) {
                    win = this.container.element.nativeElement.contentWindow;
                }
                else {
                    win = window;
                }
                var focusedNode = win.getSelection().focusNode;
                if (this.view.dom.contains(focusedNode)) {
                    win.getSelection().removeAllRanges();
                }
                // remove ProseMirror selection
                var doc = this.view.state.doc;
                var tr = this.view.state.tr.setSelection(TextSelection.create(doc, 1));
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "isReadonly", {
        get: function () {
            return this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "isIE", {
        get: function () {
            return this.iframe && detectIE();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorComponent.prototype, "toolbar", {
        get: function () {
            return this.defaultToolbarComponent || this.userToolBarComponent;
        },
        enumerable: true,
        configurable: true
    });
    EditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        }));
    };
    EditorComponent.prototype.ngAfterViewInit = function () {
        this.afterViewInit.next();
        if (!this.iframe) {
            this.contentAreaLoaded.next();
        }
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.iframeOnLoad = function () {
        this.contentAreaLoaded.next();
    };
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
    EditorComponent.prototype.exec = function (commandName, attr) {
        // Finds a command and applies the attributes.
        var command = editorCommands[commandName](attr);
        // Executes a ProseMirror command.
        command(this.view.state, this.view.dispatch, this.view);
        // See the `dispatchTransaction` comments.
        // this.stateChange.emit(updateToolBar(this.view));
    };
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
    EditorComponent.prototype.openDialog = function (dialogName) {
        var editorDialogs = {
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
        var dialog = Object.assign({ appendTo: this.dialogContainer }, editorDialogs[dialogName]);
        this.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialog).content.instance;
        if (dialogName === 'createLink' || dialogName === 'insertFile') {
            dialogContent.command = dialogName;
        }
        dialogContent.editor = this;
        dialogContent.setData(this.view.state);
    };
    /**
     * Manually focus the Editor.
     */
    EditorComponent.prototype.focus = function () {
        this.view.focus();
    };
    /**
     * Manually blur the Editor.
     */
    EditorComponent.prototype.blur = function () {
        this.view.dom.blur();
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.getSource = function () {
        return getHtml(this.view.state);
    };
    EditorComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.writeValue = function (value) {
        // To avoid confusion, non-existent values are always undefined.
        this.value = value === null ? undefined : value;
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    EditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    EditorComponent.prototype.isEmpty = function () {
        return false;
    };
    EditorComponent.prototype.initialize = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var that = this;
        var containerNativeElement = this.container.element.nativeElement;
        var contentNode = parseContent((this.value || '').trim(), schema);
        if (this.iframe) {
            var iframeDoc_1 = containerNativeElement.contentDocument;
            var meta = iframeDoc_1.createElement('meta');
            meta.setAttribute('charset', 'utf-8');
            iframeDoc_1.head.appendChild(meta);
            [defaultStyle, tablesStyles, this.dir === 'rtl' ? rtlStyles : undefined].forEach(function (styles) {
                if (styles) {
                    var style = iframeDoc_1.createElement('style');
                    style.appendChild(iframeDoc_1.createTextNode(styles));
                    iframeDoc_1.head.appendChild(style);
                }
            });
            var element = iframeDoc_1.createElement('div');
            iframeDoc_1.body.appendChild(element);
        }
        else {
            var element = document.createElement('div');
            containerNativeElement.appendChild(element);
        }
        var state = EditorState.create({
            schema: schema,
            doc: contentNode,
            plugins: [
                new Plugin({
                    key: new PluginKey('editor-tabindex'),
                    props: {
                        attributes: function () { return ({
                            // set tabindex when contenteditable is false, so that the content area can be selected
                            tabIndex: _this.readonly ? '0' : ''
                        }); }
                    }
                }),
                new Plugin({
                    key: new PluginKey('toolbar-tools-update'),
                    view: function () { return ({
                        update: function (editorView) {
                            if (!_this.disabled) {
                                _this.stateChange.next(_this.readonly ? disabledToolBarState : getToolbarState(editorView.state));
                            }
                        }
                    }); }
                }),
                new Plugin({
                    key: new PluginKey('editor-filter-disabled-state'),
                    filterTransaction: function () { return !_this.disabled; }
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
        this.ngZone.runOutsideAngular(function () {
            _this.view = new EditorView({ mount: _this.viewMountElement }, {
                state: state,
                editable: function () { return !_this.readonly; },
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
                    var value = that.value;
                    if (!hasSameMarkup(value, that._previousValue, this.state.schema)) {
                        that._previousValue = value;
                        that.ngZone.run(function () { return that.valueModified.next(value); });
                    }
                },
                transformPastedHTML: function (html) {
                    var pasteCleanupSettings = tslib_1.__assign({}, defaultPasteCleanupSettings, _this.pasteCleanupSettings);
                    var clean = pipe(removeCommentsIf(pasteCleanupSettings.removeHtmlComments), removeInvalidHTMLIf(pasteCleanupSettings.removeInvalidHTML))(html);
                    var attributes = getPasteCleanupAttributes(pasteCleanupSettings);
                    return pasteCleanup(clean, {
                        convertMsLists: pasteCleanupSettings.convertMsLists,
                        stripTags: pasteCleanupSettings.stripTags.join('|'),
                        attributes: attributes
                    });
                }
            });
        });
        if (this.view) {
            var containerElement = void 0;
            var contentAreaClasslist_1 = this.element.nativeElement.querySelector('.k-editor-content').classList;
            if (this.iframe) {
                containerElement = this.container.element.nativeElement.contentDocument;
            }
            else {
                containerElement = this.container.element.nativeElement;
            }
            this.subs.add(fromEvent(containerElement, 'focusin')
                .pipe(filter(function () { return _this.readonly; }))
                .subscribe(function () { return contentAreaClasslist_1.add('k-state-focused'); }));
            this.subs.add(fromEvent(containerElement, 'focusout')
                .pipe(filter(function () { return _this.readonly; }))
                .subscribe(function () { return contentAreaClasslist_1.remove('k-state-focused'); }));
        }
        this.subs.add(this.stateChange.subscribe(function () {
            if (_this.userToolBarComponent) {
                _this.userToolBarComponent.cdr.detectChanges();
            }
            else {
                _this.cdr.detectChanges();
            }
        }));
        this.subs.add(merge(this.valueModified.pipe(filter(function () { return _this.updateInterval > 0; }), auditTime(this.updateInterval)), this.valueModified.pipe(filter(function () { return _this.updateInterval === 0; }))).subscribe(function (value) {
            _this.onChangeCallback(value);
            _this.valueChange.emit(value);
            _this.cdr.markForCheck();
        }));
        this.subs.add(fromEvent(this.viewMountElement, 'keyup')
            .pipe(map(function (e) { return e.keyCode; }), filter(function (code) { return code === 121; }), // F10
        map(function () { return _this.userToolBarElement || _this.defaultToolbar; }))
            .subscribe(function (toolbar) { return toolbar.nativeElement.focus(); }));
        this.subs.add(fromEvent(this.viewMountElement, 'blur')
            .pipe(filter(function (event) { return !_this.viewMountElement.contains(event.relatedTarget); }))
            .subscribe(function () { return _this.onTouchedCallback(); }));
    };
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
                            useExisting: forwardRef(function () { return EditorComponent; }),
                            multi: true
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return EditorComponent; })
                        }
                    ],
                    /* tslint:disable:max-line-length */
                    template: "\n        <ng-container\n            kendoEditorLocalizedMessages\n            i18n-alignCenter=\"kendo.editor.alignCenter|The title of the tool that aligns text in the center.\"\n            alignCenter=\"Center text\"\n            i18n-alignJustify=\"kendo.editor.alignJustify|The title of the tool that justifies text both left and right.\"\n            alignJustify=\"Justify\"\n            i18n-alignLeft=\"kendo.editor.alignLeft|The title of the tool that aligns text on the left.\"\n            alignLeft=\"Align text left\"\n            i18n-alignRight=\"kendo.editor.alignRight|The title of the tool that aligns text on the right.\"\n            alignRight=\"Align text right\"\n            i18n-backColor=\"kendo.editor.backColor|The title of the tool that changes the text background color.\"\n            backColor=\"Background color\"\n            i18n-bold=\"kendo.editor.bold|The title of the tool that makes text bold.\"\n            bold=\"Bold\"\n            i18n-cleanFormatting=\"kendo.editor.cleanFormatting|The title of the Clean Formatting tool.\"\n            cleanFormatting=\"Clean formatting\"\n            i18n-createLink=\"kendo.editor.createLink|The title of the tool that creates hyperlinks.\"\n            createLink=\"Insert link\"\n            i18n-dialogApply=\"kendo.editor.dialogApply|The label of the **Apply** button in all editor dialogs.\"\n            dialogApply=\"Apply\"\n            i18n-dialogCancel=\"kendo.editor.dialogCancel|The label of the **Cancel** button in all editor dialogs.\"\n            dialogCancel=\"Cancel\"\n            i18n-dialogInsert=\"kendo.editor.dialogInsert|The label of the **Insert** button in all editor dialogs.\"\n            dialogInsert=\"Insert\"\n            i18n-dialogUpdate=\"kendo.editor.dialogUpdate|The label of the **Update** button in all editor dialogs.\"\n            dialogUpdate=\"Update\"\n            i18n-fileText=\"kendo.editor.fileText|The caption for the file text in the insertFile dialog.\"\n            fileText=\"Text\"\n            i18n-fileTitle=\"kendo.editor.fileTitle|The caption for the file Title in the insertFile dialog.\"\n            fileTitle=\"Title\"\n            i18n-fileWebAddress=\"kendo.editor.fileWebAddress|The caption for the file URL in the insertFile dialog.\"\n            fileWebAddress=\"Web address\"\n            i18n-fontFamily=\"kendo.editor.fontFamily|The title of the tool that changes the text font.\"\n            fontFamily=\"Select font family\"\n            i18n-fontSize=\"kendo.editor.fontSize|The title of the tool that changes the text size.\"\n            fontSize=\"Select font size\"\n            i18n-foreColor=\"kendo.editor.foreColor|The title of the tool that changes the text color.\"\n            foreColor=\"Color\"\n            i18n-format=\"kendo.editor.format|The title of the tool that lets users choose block formats.\"\n            format=\"Format\"\n            i18n-imageAltText=\"kendo.editor.imageAltText|The caption for the image alternate text in the insertImage dialog.\"\n            imageAltText=\"Alternate text\"\n            i18n-imageHeight=\"kendo.editor.imageHeight|The caption for the image height in the insertImage dialog.\"\n            imageHeight=\"Height (px)\"\n            i18n-imageWebAddress=\"kendo.editor.imageWebAddress|The caption for the image URL in the insertImage dialog.\"\n            imageWebAddress=\"Web address\"\n            i18n-imageWidth=\"kendo.editor.imageWidth|The caption for the image width in the insertImage dialog.\"\n            imageWidth=\"Width (px)\"\n            i18n-indent=\"kendo.editor.indent|The title of the tool that indents the content.\"\n            indent=\"Indent\"\n            i18n-insertFile=\"kendo.editor.insertFile|The title of the tool that inserts links to files.\"\n            insertFile=\"Insert file\"\n            i18n-insertImage=\"kendo.editor.insertImage|The title of the tool that inserts images.\"\n            insertImage=\"Insert image\"\n            i18n-insertOrderedList=\"kendo.editor.insertOrderedList|The title of the tool that inserts an ordered list.\"\n            insertOrderedList=\"Insert ordered list\"\n            i18n-insertUnorderedList=\"kendo.editor.insertUnorderedList|The title of the tool that inserts an unordered list.\"\n            insertUnorderedList=\"Insert unordered list\"\n            i18n-italic=\"kendo.editor.italic|The title of the tool that makes text italicized.\"\n            italic=\"Italic\"\n            i18n-linkOpenInNewWindow=\"kendo.editor.linkOpenInNewWindow|The caption for the checkbox for opening the link in a new window in the createLink dialog.\"\n            linkOpenInNewWindow=\"Open link in new window\"\n            i18n-linkText=\"kendo.editor.linkText|The caption for the link text in the createLink dialog.\"\n            linkText=\"Text\"\n            i18n-linkTitle=\"kendo.editor.linkTitle|The caption for the link title in the createLink dialog.\"\n            linkTitle=\"Title\"\n            i18n-linkWebAddress=\"kendo.editor.linkWebAddress|The caption for the URL in the createLink dialog.\"\n            linkWebAddress=\"Web address\"\n            i18n-outdent=\"kendo.editor.outdent|The title of the tool that outdents the content.\"\n            outdent=\"Outdent\"\n            i18n-redo=\"kendo.editor.redo|The title of the tool that undos the last action.\"\n            redo=\"Redo\"\n            i18n-strikethrough=\"kendo.editor.strikethrough|The title of the tool that strikes through text.\"\n            strikethrough=\"Strikethrough\"\n            i18n-subscript=\"kendo.editor.subscript|The title of the tool that makes text subscript.\"\n            subscript=\"Subscript\"\n            i18n-superscript=\"kendo.editor.superscript|The title of the tool that makes text superscript.\"\n            superscript=\"Superscript\"\n            i18n-underline=\"kendo.editor.underline|The title of the tool that underlines text.\"\n            underline=\"Underline\"\n            i18n-unlink=\"kendo.editor.unlink|The title of the tool that removes hyperlinks.\"\n            unlink=\"Remove Link\"\n            i18n-undo=\"kendo.editor.undo|The title of the tool that undos the last action.\"\n            undo=\"Undo\"\n            i18n-viewSource=\"kendo.editor.viewSource|The title of the tool that shows the editor value as HTML.\"\n            viewSource=\"View source\"\n            i18n-insertTable=\"kendo.editor.insertTable|The title of the tool that inserts table.\"\n            insertTable=\"Insert Table\"\n            i18n-addColumnBefore=\"kendo.editor.addColumnBefore|The title of the tool that adds new column before currently selected column.\"\n            addColumnBefore=\"Add column before\"\n            i18n-addColumnAfter=\"kendo.editor.addColumnAfter|The title of the tool that adds new column after currently selected column.\"\n            addColumnAfter=\"Add column after\"\n            i18n-addRowBefore=\"kendo.editor.addRowBefore|The title of the tool that adds new row before currently selected row.\"\n            addRowBefore=\"Add row before\"\n            i18n-addRowAfter=\"kendo.editor.addRowAfter|The title of the tool that adds new row after currently selected row.\"\n            addRowAfter=\"Add row after\"\n            i18n-deleteColumn=\"kendo.editor.deleteColumn|The title of the tool that deletes a table column.\"\n            deleteColumn=\"Delete column\"\n            i18n-deleteRow=\"kendo.editor.deleteRow|The title of the tool that deletes a table row.\"\n            deleteRow=\"Delete row\"\n            i18n-deleteTable=\"kendo.editor.deleteTable|The title of the tool that deletes a table.\"\n            deleteTable=\"Delete table\"\n        >\n        </ng-container>\n\n        <ng-content select=\"kendo-toolbar\"></ng-content>\n        <kendo-toolbar [overflow]=\"true\" [tabindex]=\"readonly ? -1 : 0\" *ngIf=\"!userToolBarElement\" #defaultToolbar>\n            <kendo-toolbar-buttongroup>\n                <kendo-toolbar-button kendoEditorBoldButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorItalicButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorUnderlineButton></kendo-toolbar-button>\n            </kendo-toolbar-buttongroup>\n            <kendo-toolbar-dropdownlist kendoEditorFormat></kendo-toolbar-dropdownlist>\n            <kendo-toolbar-buttongroup>\n                <kendo-toolbar-button kendoEditorAlignLeftButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorAlignCenterButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorAlignRightButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorAlignJustifyButton></kendo-toolbar-button>\n            </kendo-toolbar-buttongroup>\n            <kendo-toolbar-buttongroup>\n                <kendo-toolbar-button kendoEditorInsertUnorderedListButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorInsertOrderedListButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorIndentButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorOutdentButton></kendo-toolbar-button>\n            </kendo-toolbar-buttongroup>\n            <kendo-toolbar-buttongroup>\n                <kendo-toolbar-button kendoEditorCreateLinkButton></kendo-toolbar-button>\n                <kendo-toolbar-button kendoEditorUnlinkButton></kendo-toolbar-button>\n            </kendo-toolbar-buttongroup>\n            <kendo-toolbar-button kendoEditorInsertImageButton></kendo-toolbar-button>\n        </kendo-toolbar>\n\n        <div *ngIf=\"!iframe\" #content [attr.dir]=\"direction\" class=\"k-editor-content\"></div>\n\n        <div class=\"k-editor-content\" *ngIf=\"iframe\">\n            <iframe #content frameborder=\"0\" class=\"k-iframe\" (load)=\"iframeOnLoad()\"></iframe>\n        </div>\n\n        <ng-container #dialogsContainer></ng-container>\n    ",
                    styles: [
                        "\n            >>> .k-editor-content > .ProseMirror {\n                height: 100%;\n                width: 100%;\n                box-sizing: border-box;\n                outline: none;\n                overflow: auto;\n            }\n\n            .k-iframe {\n                width: 100%;\n                height: 100%;\n                display: block;\n            }\n        "
                    ]
                },] },
    ];
    /** @nocollapse */
    EditorComponent.ctorParameters = function () { return [
        { type: DialogService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: ElementRef }
    ]; };
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
    return EditorComponent;
}());
export { EditorComponent };
export { ɵ0 };
