/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Inject, Optional, Component, Input, ViewChild, ElementRef, EventEmitter, forwardRef, ChangeDetectorRef, NgZone, Output, HostBinding, ContentChild, ViewContainerRef, Host, Directive, NgModule } from '@angular/core';
import { FormControl, Validators, FormGroup, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, zip, fromEvent, merge, interval } from 'rxjs';
import { filter, auditTime, map, concatMap, take, takeUntil } from 'rxjs/operators';
import { ToolBarComponent, ToolBarToolComponent, ToolBarButtonComponent, ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DialogContentBase, DialogRef, DialogService, DialogModule } from '@progress/kendo-angular-dialog';
import { isDocumentAvailable, guid, KendoInput, Keys } from '@progress/kendo-angular-common';
import { nodes, Schema, marks, toggleInlineFormat, bold, removeAllMarks, applyLink, applyInlineStyle, insertText, italic, strikethrough, subscript, superscript, underline, removeLink, link, isAligned, alignCenterRules, alignBlocks, alignRemoveRules, alignJustifyRules, alignLeftRules, alignRightRules, formatBlockElements, getHtml, indent, insertImage, toggleOrderedList, toggleUnorderedList, outdent, redo, setHtml, undo, createTable, insertNode, addColumnBefore, addColumnAfter, addRowBefore, addRowAfter, deleteRow, deleteColumn, mergeCells, splitCell, deleteTable, hasMark, activeNode, canIndentAsListItem, canBeIndented, indentRules, hasNode, canOutdentAsListItem, outdentRules, getActiveMarks, getNodeFromSelection, getMark, getSelectionText, TextSelection, parseContent, EditorState, Plugin, PluginKey, history, keymap, buildListKeymap, buildKeymap, baseKeymap, EditorView, hasSameMarkup, pasteCleanup, removeComments, sanitize, removeAttribute, sanitizeStyleAttr, sanitizeClassAttr } from '@progress/kendo-editor-common';
import { LocalizationService, L10N_PREFIX, MessageService, RTL, ComponentMessages } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';
import { DropDownListComponent, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ColorPickerComponent, ColorPickerModule, NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { PopupService } from '@progress/kendo-angular-popup';

/**
 * @hidden
 */
function outerWidth(element) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0;
    return width;
}
/**
 * @hidden
 */
const serializeDOMAttrs = (el) => Array.from(el.attributes)
    .reduce((acc, curr) => Object.assign({}, acc, { [curr.name]: curr.value }), {});
/**
 * @hidden
 */
const removeEntries = (obj, predicate) => Object.keys(obj)
    .filter(key => predicate(key))
    .reduce((acc, curr) => Object.assign(acc, { [curr]: obj[curr] }), {});
/**
 * @hidden
 */
const removeEmptyEntries = (obj) => {
    const predicate = key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '';
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
const isNullOrUndefined = (value) => value === undefined || value === null;
/**
 * @hidden
 */
const isPresent = (value) => !isNullOrUndefined(value);
/**
 * @hidden
 */
const detectIE = () => {
    if (!isDocumentAvailable()) {
        return false;
    }
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};
/**
 * @hidden
 */
const safeString = (value) => (isNullOrUndefined(value) ? '' : value.toString());
/**
 * @hidden
 */
const first = (arr) => arr[0];
/**
 * @hidden
 */
const last = (arr) => arr[arr.length - 1];
/**
 * @hidden
 */
const split = (splitter) => (value) => value.split(splitter);
/**
 * @hidden
 */
const trim = (value) => value.trim();
/**
 * @hidden
 */
const filter$1 = (predicate) => (arr) => arr.filter(predicate);
/**
 * @hidden
 */
const getUniqueStyleValues = (style, cssStyle) => {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    const uniqueMarkValues = style.marks
        .filter(m => m.type.name === 'style')
        .map(m => m.attrs.style)
        .map(safeString)
        .map(split(';'))
        .map(filter$1((m) => m.includes(cssStyle)))
        // guards against empty array
        .map((cssStyleValues) => (cssStyleValues.length !== 0 ? cssStyleValues : [`${cssStyle}: INVALID`]))
        .map(first)
        .map(split(':'))
        .map(last)
        .map(trim)
        .reduce((acc, curr) => (acc.indexOf(curr) > -1 ? acc : [...acc, curr]), []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
const conditionallyExecute = (fn) => (condition) => (param) => (condition ? fn(param) : param);
/**
 * @hidden
 */
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const commonAttributes = () => {
    return {
        class: { default: null },
        id: { default: null },
        style: { default: null }
    };
};
/**
 * @hidden
 */
const marks$1 = marks;
const ɵ1 = () => Object.assign(nodes, {
    table: {
        attrs: Object.assign({}, commonAttributes(), { class: { default: 'k-table' }, cellspacing: { default: null }, cellpadding: { default: null } }),
        content: "table_row+",
        tableRole: "table",
        isolating: true,
        group: 'block',
        parseDOM: [
            {
                getAttrs: serializeDOMAttrs,
                tag: "table"
            }
        ],
        toDOM: (node) => ["table", removeEmptyEntries(node.attrs), ["tbody", 0]]
    },
    htmlBlock: {
        group: "block",
        attrs: {
            html: {}
        },
        parseDOM: [
            {
                tag: "*:not(p):not(blockquote):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(pre):not(img):not(ol):not(ul):not(li):not(table):not(tbody):not(td):not(th):not(tr):not(thead):not(tfoot):not(colgroup):not(col):not(object)",
                getAttrs: (elt) => {
                    return { html: elt.outerHTML };
                }
            }
        ],
        toDOM: (node) => {
            const scratch = document.createElement("div");
            scratch.innerHTML = node.attrs.html;
            return scratch.firstChild;
        }
    }
});
const nodes$1 = (ɵ1)();
/**
 * @hidden
 */
const schema = new Schema({
    marks: marks$1,
    nodes: nodes$1
});

const alignRemove = (state, dispatch) => alignBlocks(alignRemoveRules)(state, dispatch);
const ɵ1$1 = () => toggleInlineFormat(bold), ɵ2 = () => removeAllMarks({ except: schema.marks.link }), ɵ3 = attrs => applyLink({ mark: 'link', attrs: attrs }), ɵ4 = font => applyInlineStyle({ style: 'font-family', value: font }), ɵ5 = size => applyInlineStyle({ style: 'font-size', value: size + "px" }), ɵ6 = attrs => applyLink({ mark: 'link', attrs: attrs }), ɵ7 = text => insertText(text), ɵ8 = () => toggleInlineFormat(italic), ɵ9 = () => toggleInlineFormat(strikethrough), ɵ10 = () => toggleInlineFormat(subscript), ɵ11 = () => toggleInlineFormat(superscript), ɵ12 = () => toggleInlineFormat(underline), ɵ13 = () => removeLink(link), ɵ14 = (color) => applyInlineStyle({ style: 'color', value: color }), ɵ15 = (color) => applyInlineStyle({ style: 'background-color', value: color });
const inlineCommand = {
    bold: ɵ1$1,
    cleanFormatting: ɵ2,
    createLink: ɵ3,
    fontFamily: ɵ4,
    fontSize: ɵ5,
    insertFile: ɵ6,
    insertText: ɵ7,
    italic: ɵ8,
    strikethrough: ɵ9,
    subscript: ɵ10,
    superscript: ɵ11,
    underline: ɵ12,
    unlink: ɵ13,
    foreColor: ɵ14,
    backColor: ɵ15
};
const ɵ16 = () => (state, dispatch) => isAligned(state, alignCenterRules) ? alignRemove(state, dispatch) : alignBlocks(alignCenterRules)(state, dispatch), ɵ17 = () => (state, dispatch) => isAligned(state, alignJustifyRules) ? alignRemove(state, dispatch) : alignBlocks(alignJustifyRules)(state, dispatch), ɵ18 = () => (state, dispatch) => isAligned(state, alignLeftRules) ? alignRemove(state, dispatch) : alignBlocks(alignLeftRules)(state, dispatch), ɵ19 = () => (state, dispatch) => isAligned(state, alignRightRules) ? alignRemove(state, dispatch) : alignBlocks(alignRightRules)(state, dispatch), ɵ20 = formatAttr => formatBlockElements(formatAttr.tag), ɵ21 = () => getHtml, ɵ22 = () => indent, ɵ23 = attrs => insertImage(attrs), ɵ24 = () => toggleOrderedList, ɵ25 = () => toggleUnorderedList, ɵ26 = () => outdent, ɵ27 = () => redo, ɵ28 = content => setHtml(content), ɵ29 = () => undo;
const blockCommand = {
    alignCenter: ɵ16,
    alignJustify: ɵ17,
    alignLeft: ɵ18,
    alignRight: ɵ19,
    format: ɵ20,
    getHTML: ɵ21,
    indent: ɵ22,
    insertImage: ɵ23,
    // think about changing the command name.
    insertOrderedList: ɵ24,
    // think about changing the command name.
    insertUnorderedList: ɵ25,
    outdent: ɵ26,
    redo: ɵ27,
    setHTML: ɵ28,
    undo: ɵ29
};
/**
 * @hidden
 * exported for tests
 */
const insertTable = (attrs) => (state, dispatch) => {
    const newTable = createTable(state.schema.nodes, attrs.rows, attrs.cols);
    if (newTable) {
        insertNode(newTable, true)(state, dispatch);
    }
};
const ɵ30 = attr => insertTable(attr), ɵ31 = () => addColumnBefore, ɵ32 = () => addColumnAfter, ɵ33 = () => addRowBefore, ɵ34 = () => addRowAfter, ɵ35 = () => deleteRow, ɵ36 = () => deleteColumn, ɵ37 = () => mergeCells, ɵ38 = () => splitCell, ɵ39 = () => deleteTable;
const tableCommand = {
    insertTable: ɵ30,
    addColumnBefore: ɵ31,
    addColumnAfter: ɵ32,
    addRowBefore: ɵ33,
    addRowAfter: ɵ34,
    deleteRow: ɵ35,
    deleteColumn: ɵ36,
    mergeCells: ɵ37,
    splitCell: ɵ38,
    deleteTable: ɵ39
};
/**
 * @hidden
 */
const editorCommands = Object.assign({}, inlineCommand, blockCommand, tableCommand);

/**
 * @hidden
 */
const getToolbarState = (state) => ({
    alignCenter: {
        selected: isAligned(state, alignCenterRules),
        disabled: false
    },
    alignJustify: {
        selected: isAligned(state, alignJustifyRules),
        disabled: false
    },
    alignLeft: {
        selected: isAligned(state, alignLeftRules),
        disabled: false
    },
    alignRight: {
        selected: isAligned(state, alignRightRules),
        disabled: false
    },
    bold: {
        selected: hasMark(state, bold),
        disabled: false
    },
    cleanFormatting: {
        selected: false,
        disabled: state.selection.empty
    },
    format: {
        selected: activeNode(state),
        disabled: false
    },
    indent: {
        selected: false,
        disabled: !(canIndentAsListItem(state, schema.nodes.list_item) || canBeIndented(state, indentRules))
    },
    insertOrderedList: {
        selected: hasNode(state, schema.nodes.ordered_list),
        disabled: false
    },
    insertUnorderedList: {
        selected: hasNode(state, schema.nodes.bullet_list),
        disabled: false
    },
    italic: {
        selected: hasMark(state, italic),
        disabled: false
    },
    unlink: {
        selected: false,
        disabled: !hasMark(state, link)
    },
    outdent: {
        selected: false,
        disabled: !(canOutdentAsListItem(state, outdentRules) || canBeIndented(state, outdentRules))
    },
    redo: {
        selected: false,
        disabled: !redo(state)
    },
    strikethrough: {
        selected: hasMark(state, strikethrough),
        disabled: false
    },
    style: {
        selected: getActiveMarks(state, schema.marks.style),
        disabled: false
    },
    subscript: {
        selected: hasMark(state, subscript),
        disabled: false
    },
    superscript: {
        selected: hasMark(state, superscript),
        disabled: false
    },
    underline: {
        selected: hasMark(state, underline),
        disabled: false
    },
    undo: {
        selected: false,
        disabled: !undo(state)
    },
    //dialogs
    createLink: {
        selected: false,
        disabled: state.selection.empty
    },
    insertFile: {
        selected: false,
        disabled: state.selection.empty
    },
    insertImage: {
        selected: false,
        disabled: false
    },
    viewSource: {
        selected: false,
        disabled: false
    },
    insertTable: {
        selected: false,
        disabled: false
    },
    addColumnBefore: {
        selected: false,
        disabled: !addColumnBefore(state)
    },
    addColumnAfter: {
        selected: false,
        disabled: !addColumnAfter(state)
    },
    addRowBefore: {
        selected: false,
        disabled: !addRowBefore(state)
    },
    addRowAfter: {
        selected: false,
        disabled: !addRowAfter(state)
    },
    deleteRow: {
        selected: false,
        disabled: !deleteRow(state)
    },
    deleteColumn: {
        selected: false,
        disabled: !deleteColumn(state)
    },
    mergeCells: {
        selected: false,
        disabled: !mergeCells(state)
    },
    splitCell: {
        selected: false,
        disabled: !splitCell(state)
    },
    deleteTable: {
        selected: false,
        disabled: !deleteTable(state)
    }
});
/**
 * @hidden
 */
const initialToolBarState = {
    //alignment
    alignCenter: { selected: false, disabled: false },
    alignJustify: { selected: false, disabled: false },
    alignLeft: { selected: false, disabled: false },
    alignRight: { selected: false, disabled: false },
    //marks
    bold: { selected: false, disabled: false },
    italic: { selected: false, disabled: false },
    underline: { selected: false, disabled: false },
    strikethrough: { selected: false, disabled: false },
    subscript: { selected: false, disabled: false },
    superscript: { selected: false, disabled: false },
    //tools
    format: { selected: { text: 'Format', tag: null }, disabled: false },
    style: { selected: { marks: [], hasNodesWithoutMarks: false }, disabled: false },
    cleanFormatting: { selected: false, disabled: true },
    //indent
    indent: { selected: false, disabled: false },
    outdent: { selected: false, disabled: false },
    //lists
    insertOrderedList: { selected: false, disabled: false },
    insertUnorderedList: { selected: false, disabled: false },
    //links
    unlink: { selected: false, disabled: true },
    //history
    redo: { selected: false, disabled: true },
    undo: { selected: false, disabled: true },
    //dialogs
    createLink: { selected: false, disabled: true },
    insertFile: { selected: false, disabled: true },
    insertImage: { selected: false, disabled: false },
    viewSource: { selected: false, disabled: false },
    //table
    insertTable: { selected: false, disabled: false },
    addColumnBefore: { selected: false, disabled: true },
    addColumnAfter: { selected: false, disabled: true },
    addRowBefore: { selected: false, disabled: true },
    addRowAfter: { selected: false, disabled: true },
    deleteRow: { selected: false, disabled: true },
    deleteColumn: { selected: false, disabled: true },
    mergeCells: { selected: false, disabled: true },
    splitCell: { selected: false, disabled: true },
    deleteTable: { selected: false, disabled: true }
};
/**
 * @hidden
 */
const disabledToolBarState = {
    //alignment
    alignCenter: { selected: false, disabled: true },
    alignJustify: { selected: false, disabled: true },
    alignLeft: { selected: false, disabled: true },
    alignRight: { selected: false, disabled: true },
    //marks
    bold: { selected: false, disabled: true },
    italic: { selected: false, disabled: true },
    underline: { selected: false, disabled: true },
    strikethrough: { selected: false, disabled: true },
    subscript: { selected: false, disabled: true },
    superscript: { selected: false, disabled: true },
    //tools
    format: { selected: { text: 'Format', tag: null }, disabled: true },
    style: { selected: { marks: [], hasNodesWithoutMarks: false }, disabled: true },
    cleanFormatting: { selected: false, disabled: true },
    //indent
    indent: { selected: false, disabled: true },
    outdent: { selected: false, disabled: true },
    //lists
    insertOrderedList: { selected: false, disabled: true },
    insertUnorderedList: { selected: false, disabled: true },
    //links
    unlink: { selected: false, disabled: true },
    //history
    redo: { selected: false, disabled: true },
    undo: { selected: false, disabled: true },
    //dialogs
    createLink: { selected: false, disabled: true },
    insertFile: { selected: false, disabled: true },
    insertImage: { selected: false, disabled: true },
    viewSource: { selected: false, disabled: true },
    //table
    insertTable: { selected: false, disabled: true },
    addColumnBefore: { selected: false, disabled: true },
    addColumnAfter: { selected: false, disabled: true },
    addRowBefore: { selected: false, disabled: true },
    addRowAfter: { selected: false, disabled: true },
    deleteRow: { selected: false, disabled: true },
    deleteColumn: { selected: false, disabled: true },
    mergeCells: { selected: false, disabled: true },
    splitCell: { selected: false, disabled: true },
    deleteTable: { selected: false, disabled: true }
};

/**
 * @hidden
 */
class EditorLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl) {
        super(prefix, messageService, _rtl);
    }
}
/** @nocollapse */
EditorLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];

/**
 * @hidden
 */
class SourceDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = '';
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.textarea.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        this.editor.exec('setHTML', this.getData());
        this.dialog.close();
        this.editor.focus();
    }
    getData() {
        return this.textarea.nativeElement.value;
    }
    setData() {
        this.data = this.indent(this.editor.getSource());
    }
    textFor(key) {
        return this.localization.get(key);
    }
    indent(content) {
        return content
            .replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/gi, '</$1>\n')
            .replace(/<(ul|ol)([^>]*)><li/gi, '<$1$2>\n<li')
            .replace(/<br \/>/gi, '<br />\n')
            .replace(/\n$/, '');
    }
}
SourceDialogComponent.decorators = [
    { type: Component, args: [{
                styles: [
                    `
            >>> .k-editor-textarea {
                height: 100%;
            }
        `
                ],
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('viewSource') }}
        </kendo-dialog-titlebar>
        <textarea [value]="data" #textarea class="k-textarea k-editor-textarea"></textarea>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogUpdate') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
SourceDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
SourceDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    textarea: [{ type: ViewChild, args: ['textarea',] }]
};

/**
 * @hidden
 */
class ImageDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.src = new FormControl('', Validators.required);
        this.alt = new FormControl('');
        this.width = new FormControl('', Validators.min(1));
        this.height = new FormControl('', Validators.min(1));
        this.data = {
            alt: '',
            height: '',
            src: '',
            width: ''
        };
        this.imageData = new FormGroup({
            alt: this.alt,
            height: this.height,
            src: this.src,
            width: this.width
        });
    }
    ngOnInit() {
        this.srcInputId = `k-${guid()}`;
        this.altTextInputId = `k-${guid()}`;
        this.widthInputId = `k-${guid()}`;
        this.heightInputId = `k-${guid()}`;
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.srcInput.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.src.value) {
            this.editor.exec('insertImage', this.getData());
            this.dialog.close();
            this.editor.focus();
        }
    }
    setData(state) {
        const node = getNodeFromSelection(state);
        if (node) {
            this.src.patchValue(node.attrs.src);
            this.alt.patchValue(node.attrs.alt);
            this.width.patchValue(node.attrs.width);
            this.height.patchValue(node.attrs.height);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    getData() {
        return {
            alt: this.alt.value,
            height: this.normalizeDimension(this.height.value),
            src: this.src.value,
            width: this.normalizeDimension(this.width.value)
        };
    }
    normalizeDimension(value) {
        return Number.isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0 ? '' : safeString(parseInt(value, 10));
    }
}
ImageDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('insertImage') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content">
                    <div class="k-edit-label">
                        <label [for]="srcInputId">{{ textFor('imageWebAddress') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="srcInputId" #srcInput [formControl]="src" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="altTextInputId">{{ textFor('imageAltText') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="altTextInputId" [formControl]="alt" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="widthInputId">{{ textFor('imageWidth') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="widthInputId" [formControl]="width" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="heightInputId">{{ textFor('imageHeight') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="heightInputId" [formControl]="height" type="text" class="k-textbox" />
                    </div>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton [disabled]="imageData.invalid"
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogInsert') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
ImageDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
ImageDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    srcInput: [{ type: ViewChild, args: ['srcInput', { read: ElementRef },] }]
};

/**
 * @hidden
 */
class FileLinkDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.linkForm = new FormGroup({
            'href': new FormControl('', Validators.required),
            'text': new FormControl({ value: '', disabled: true }, Validators.required),
            'title': new FormControl('')
        });
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.hrefInput.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        const linkData = this.getData();
        this.editor.exec(this.command, linkData);
        this.dialog.close();
        this.editor.focus();
    }
    get titleText() {
        return this.localization.get(this.command);
    }
    setData(state) {
        if (this.command === 'createLink') {
            this.linkForm.addControl('target', new FormControl());
        }
        const linkMark = getMark(state, schema.marks.link);
        if (linkMark) {
            // const linkMarkRange = getMarkRange(state.selection.$cursor, schema.marks.link);
            // const mark = parentNode.child(cursorNodeIndex).marks.find(m => m.type === markType);
            this.linkForm.reset({
                href: linkMark.attrs.href,
                title: linkMark.attrs.title,
                target: isPresent(linkMark.attrs.target),
                text: this.setLinkText(state)
            });
            return;
        }
        if (!state.selection.empty) {
            this.linkForm.patchValue({
                'text': getSelectionText(state)
            });
        }
    }
    textForWithPrefix(key) {
        const prefix = this.command === 'createLink' ? 'link' : 'file';
        return this.textFor(prefix + key);
    }
    textFor(key) {
        return this.localization.get(key);
    }
    setLinkText(state) {
        const selection = state.selection;
        if (selection.empty && selection.$cursor) {
            const cursor = selection.$cursor;
            const cursorNodeIndex = cursor.index();
            const parentNode = cursor.parent;
            return parentNode.child(cursorNodeIndex).text;
        }
        else {
            return getSelectionText(state);
        }
    }
    getData() {
        let linkData = this.linkForm.value;
        if (isPresent(this.linkForm.controls.target)) {
            linkData.target = linkData.target ? '_blank' : null;
        }
        return linkData;
    }
}
FileLinkDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ titleText }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content">
                    <form novalidate [formGroup]="linkForm">
                        <div class="k-edit-label">
                            <label (click)="hrefInput.focus()">{{ textForWithPrefix('WebAddress') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #hrefInput formControlName="href" type="text" class="k-textbox" />
                        </div>

                        <div class="k-edit-label">
                            <label (click)="textInput.focus()">{{ textForWithPrefix('Text') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #textInput formControlName="text" type="text" class="k-textbox" />
                        </div>

                        <div class="k-edit-label">
                            <label (click)="titleInput.focus()">{{ textForWithPrefix('Title') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #titleInput formControlName="title" type="text" class="k-textbox" />
                        </div>
                        <ng-container *ngIf="command === 'createLink'">
                            <div class="k-edit-label"></div>
                            <div class="k-edit-field">
                                <input type="checkbox" id="k-target-blank" class="k-checkbox" formControlName="target" />
                                <label class="k-checkbox-label" for="k-target-blank">{{ textForWithPrefix('OpenInNewWindow') }}</label>
                            </div>
                        </ng-container>
                    </form>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton [disabled]="linkForm.invalid" (click)="onConfirmAction()" [primary]="true">
                {{ textFor('dialogInsert') }}
            </button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FileLinkDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FileLinkDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    command: [{ type: Input }],
    hrefInput: [{ type: ViewChild, args: ['hrefInput', { read: ElementRef },] }]
};

/**
 * @hidden
 */
const defaultStyle = `
html, body {
    margin: 0;
    height: 100%;
    padding: 0;
}

html {
  min-height: 100%;
}

body {
  box-sizing: border-box;
  position: relative;
  padding: 8px;
}

.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

div.ProseMirror {
  position: relative;
  min-height: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

div.ProseMirror:focus {
  outline: none;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

.ProseMirror-hideselection *::selection { background: transparent; }
.ProseMirror-hideselection *::-moz-selection { background: transparent; }
.ProseMirror-hideselection { caret-color: transparent; }

.ProseMirror li {
  position: relative;
}

li.ProseMirror-selectednode {
  outline: none;
}

li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px;
  top: -2px;
  bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
`;
/**
 * @hidden
 */
const tablesStyles = `
  .ProseMirror .tableWrapper {
    overflow-x: auto;
    margin: 1em 0;
  }

  .ProseMirror table {
    margin: 0;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }

  .ProseMirror td, .ProseMirror th {
    min-width: 1em;
    border: 1px solid #ddd;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  .ProseMirror th {
    font-weight: bold;
    text-align: left;
  }

  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }

  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  /* Give selected cells a blue overlay */
  .ProseMirror .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
`;
/**
 * @hidden
 */
const rtlStyles = 'body { direction: rtl }';

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
/**
 * Represents the [Kendo UI Editor component for Angular]({% slug overview_editor %}).
 */
class EditorComponent {
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

/**
 * @hidden
 */
class FormatDropDownListComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    onValueChange(tag) {
        this.valueChange.emit(tag);
    }
    focus() {
        this.dropDownList.focus();
    }
}
FormatDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-format-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'tag'"
            [data]="data"
            [(value)]="value"
            [valuePrimitive]="true"
            [itemDisabled]="itemDisabled"
            [attr.title]="title"
            [disabled]="disabled"
            [tabindex]="tabindex"
            (valueChange)="onValueChange($event)"
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <ng-container [ngSwitch]="dataItem.tag">
                    <span *ngSwitchCase="'h1'" style="display: block; font-size: 2em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h2'" style="display: block; font-size: 1.5em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h3'" style="display: block; font-size: 1.17em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h4'" style="display: block; font-size: 1em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h5'" style="display: block; font-size: .83em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h6'" style="display: block; font-size: .67em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'p'" style="display: block; margin-left: 0;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'blockquote'" style="display: block; margin-left: 0;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchDefault>{{ dataItem.text }}</span>
                </ng-container>
            </ng-template>
        </kendo-dropdownlist>
    `
            },] },
];
FormatDropDownListComponent.propDecorators = {
    data: [{ type: Input }],
    value: [{ type: Input }],
    defaultItem: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    valueChange: [{ type: Output }],
    element: [{ type: ViewChild, args: ['element',] }],
    dropDownList: [{ type: ViewChild, args: ['element', { read: DropDownListComponent },] }]
};

/**
 * @hidden
 */
class FormatDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = [];
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.formatDropDownList.dropDownList.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec('format', { tag: this.value });
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
FormatDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('format') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-editor-format-dropdownlist
                        #formatDropDownList
                        [defaultItem]="defaultItem"
                        [data]="data"
                        [(value)]="value"
                        [itemDisabled]="itemDisabled"
                    >
                    </kendo-editor-format-dropdownlist>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogApply') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FormatDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FormatDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList', { read: FormatDropDownListComponent },] }]
};

/**
 * @hidden
 */
class ColorPickerDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.colorPicker.focus();
        });
    }
    handleActiveColorClick(event) {
        event.preventOpen();
        this.value = event.color;
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec(this.editorCommand, this.value);
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.value = args.value;
        this.editorCommand = args.editorCommand;
        this.paletteSettings = args.paletteSettings;
        this.icon = args.icon;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
ColorPickerDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor(editorCommand) }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-colorpicker
                        #colorpicker
                        [view]="'palette'"
                        [format]="'hex'"
                        [attr.title]="title"
                        [icon]="icon"
                        [(value)]="value"
                        [paletteSettings]="paletteSettings"
                        (activeColorClick)="handleActiveColorClick($event)"
                    >
                    </kendo-colorpicker>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogApply') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
ColorPickerDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
ColorPickerDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }]
};

/**
 * @hidden
 */
class FontFamilyDropDownListComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    onValueChange(tag) {
        this.valueChange.emit(tag);
    }
    focus() {
        this.dropDownList.focus();
    }
}
FontFamilyDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-fontfamily-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'fontName'"
            [data]="data"
            [(value)]="value"
            [valuePrimitive]="true"
            [itemDisabled]="itemDisabled"
            [attr.title]="title"
            [disabled]="disabled"
            [tabindex]="tabindex"
            (valueChange)="onValueChange($event)"
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <span [ngStyle]="{ 'font-family': dataItem.fontName }">
                    {{ dataItem.text }}
                </span>
            </ng-template>
        </kendo-dropdownlist>
    `
            },] },
];
FontFamilyDropDownListComponent.propDecorators = {
    data: [{ type: Input }],
    value: [{ type: Input }],
    defaultItem: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    valueChange: [{ type: Output }],
    element: [{ type: ViewChild, args: ['element',] }],
    dropDownList: [{ type: ViewChild, args: ['element', { read: DropDownListComponent },] }]
};

/**
 * @hidden
 */
class FontFamilyDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = [];
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.fontFamilyDropDownList.dropDownList.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec('fontFamily', this.value);
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
FontFamilyDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('fontFamily') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-editor-fontfamily-dropdownlist
                        #fontFamilyDropDownList
                        [defaultItem]="defaultItem"
                        [data]="data"
                        [(value)]="value"
                        [itemDisabled]="itemDisabled"
                    >
                    </kendo-editor-fontfamily-dropdownlist>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogApply') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FontFamilyDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FontFamilyDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    fontFamilyDropDownList: [{ type: ViewChild, args: ['fontFamilyDropDownList', { read: FontFamilyDropDownListComponent },] }]
};

/**
 * @hidden
 */
class InsertTableDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
    }
    onCancelAction() {
        this.dialog.close();
        this.editor.focus();
    }
    onCellClick(args) {
        this.dialog.close();
        this.editor.exec("insertTable", args);
        this.editor.focus();
    }
    setData(args) {
        this.editor = args.editor;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
InsertTableDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('insertTable') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-ct-popup k-window-content" style="text-align: center;">
                    <kendo-popup-table-grid (cellClick)="onCellClick($event)"></kendo-popup-table-grid>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
InsertTableDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
InsertTableDialogComponent.propDecorators = {
    editor: [{ type: Input }]
};

/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the format of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFormat></kendo-toolbar-dropdownlist>
 * ```
 */
class EditorFormatComponent extends ToolBarToolComponent {
    constructor(editor, dialogService, localization) {
        super();
        this.editor = editor;
        this.dialogService = dialogService;
        this.localization = localization;
        this.disabled = false;
        this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        this.valueChange = new EventEmitter();
        this._data = [
            { text: 'Paragraph', tag: 'p' },
            { text: 'Quotation', tag: 'blockquote' },
            { text: 'Heading 1', tag: 'h1' },
            { text: 'Heading 2', tag: 'h2' },
            { text: 'Heading 3', tag: 'h3' },
            { text: 'Heading 4', tag: 'h4' },
            { text: 'Heading 5', tag: 'h5' },
            { text: 'Heading 6', tag: 'h6' }
        ];
    }
    /**
     * Overrides the default format items list.
     */
    set data(formatItems) {
        this._data = formatItems || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = (itemArgs) => {
            if (!this.overflows && this.formatDropDownList && !this.formatDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.tag === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, tag: null }));
        this.subs = this.editor.stateChange.subscribe(({ format }) => {
            const index = this.data.findIndex(item => item.tag === format.selected.tag);
            this.value = index !== -1 ? format.selected.tag : null;
            this.disabled = format.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('format', { tag: ev });
            this.editor.focus();
            this.valueChange.emit(this.data.find(d => d.tag === ev));
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    get outerWidth() {
        const element = this.formatDropDownList.element;
        if (element) {
            return outerWidth(element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('format');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FormatDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.tabindex = 0;
        if (this.overflows) {
            this.formatButton.nativeElement.focus();
        }
        else {
            this.formatDropDownList.focus();
        }
    }
    /**
     * @hidden
     */
    handleKey() {
        this.tabindex = -1;
        return false;
    }
}
EditorFormatComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFormatComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFormat]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-format-dropdownlist
                #formatDropDownList
                [defaultItem]="defaultItem"
                [data]="data"
                [(value)]="value"
                [itemDisabled]="itemDisabled"
                [title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="onValueChange($event)"
            >
            </kendo-editor-format-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                #formatButton
                [tabindex]="tabindex"
                type="button"
                kendoButton
                class="k-overflow-button"
                [icon]="'apply-format'"
                [attr.title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (click)="openDialog()"
            >
                {{ title }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorFormatComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFormatComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList',] }],
    formatButton: [{ type: ViewChild, args: ['formatButton',] }]
};

/**
 * @hidden
 */
class FontSizeDropDownListComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    onValueChange(size) {
        this.valueChange.emit(size);
    }
    focus() {
        this.dropDownList.focus();
    }
}
FontSizeDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-fontsize-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'size'"
            [data]="data"
            [(value)]="value"
            [valuePrimitive]="true"
            [itemDisabled]="itemDisabled"
            [attr.title]="title"
            [disabled]="disabled"
            [tabindex]="tabindex"
            (valueChange)="onValueChange($event)"
        >
        </kendo-dropdownlist>
    `
            },] },
];
FontSizeDropDownListComponent.propDecorators = {
    data: [{ type: Input }],
    value: [{ type: Input }],
    defaultItem: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    valueChange: [{ type: Output }],
    element: [{ type: ViewChild, args: ['element',] }],
    dropDownList: [{ type: ViewChild, args: ['element', { read: DropDownListComponent },] }]
};

/**
 * @hidden
 */
class FontSizeDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = [];
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.fontSizeDropDownList.dropDownList.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec('fontSize', this.value);
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
FontSizeDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('fontSize') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-editor-fontsize-dropdownlist
                        #fontSizeDropDownList
                        [defaultItem]="defaultItem"
                        [data]="data"
                        [(value)]="value"
                        [itemDisabled]="itemDisabled"
                    >
                    </kendo-editor-fontsize-dropdownlist>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogApply') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FontSizeDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FontSizeDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    fontSizeDropDownList: [{ type: ViewChild, args: ['fontSizeDropDownList', { read: FontSizeDropDownListComponent },] }]
};

/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the font size of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontSize></kendo-toolbar-dropdownlist>
 * ```
 */
class EditorFontSizeComponent extends ToolBarToolComponent {
    constructor(editor, dialogService, localization) {
        super();
        this.editor = editor;
        this.dialogService = dialogService;
        this.localization = localization;
        this.disabled = false;
        this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        this.valueChange = new EventEmitter();
        this._data = [
            { text: '8px', size: 8 },
            { text: '10px', size: 10 },
            { text: '12px', size: 12 },
            { text: '14px', size: 14 },
            { text: '18px', size: 18 },
            { text: '24px', size: 24 },
            { text: '36px', size: 36 }
        ];
    }
    /**
     * Overrides the default font size list.
     */
    set data(sizes) {
        this._data = sizes || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = itemArgs => {
            if (!this.overflows && this.fontSizeDropDownList && !this.fontSizeDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.size === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, size: null }));
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            // remove units(px, em, rem...)
            // string#match returns array
            this.value = (getUniqueStyleValues(style.selected, 'font-size').match(/\d+/g) || [null])[0];
            this.disabled = style.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontSize', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(d => d.size === parseInt(ev, 10)));
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('fontSize');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontSizeDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontSizeButton.nativeElement.focus();
        }
        else {
            this.fontSizeDropDownList.focus();
        }
    }
    /**
     * @hidden
     */
    handleKey() {
        this.tabindex = -1;
        return false;
    }
}
EditorFontSizeComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFontSizeComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFontSize]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-fontsize-dropdownlist
                #element
                [defaultItem]="defaultItem"
                [data]="data"
                [(value)]="value"
                [itemDisabled]="itemDisabled"
                [title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="onValueChange($event)"
            >
            </kendo-editor-fontsize-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #fontSizeButton
                class="k-overflow-button"
                [icon]="'font-size'"
                [attr.title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (click)="openDialog()"
            >
                {{ title }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorFontSizeComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFontSizeComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    fontSizeDropDownList: [{ type: ViewChild, args: ['element', { read: FontSizeDropDownListComponent },] }],
    fontSizeButton: [{ type: ViewChild, args: ['fontSizeButton',] }]
};

/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-toolbar-dropdownlist` with an Editor command that changes the font family of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontFamily></kendo-toolbar-dropdownlist>
 * ```
 */
class EditorFontFamilyComponent extends ToolBarToolComponent {
    constructor(editor, dialogService, localization) {
        super();
        this.editor = editor;
        this.dialogService = dialogService;
        this.localization = localization;
        this.disabled = false;
        this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        this.valueChange = new EventEmitter();
        this._data = [
            { text: 'Arial', fontName: 'Arial,"Helvetica Neue",Helvetica,sans-serif' },
            { text: 'Courier New', fontName: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace' },
            { text: 'Georgia', fontName: 'Georgia,Times,"Times New Roman",serif' },
            {
                fontName: 
                // tslint:disable-next-line:max-line-length
                'Impact,Haettenschweiler,"Franklin Gothic Bold",Charcoal,"Helvetica Inserat","Bitstream Vera Sans Bold","Arial Black","sans serif"',
                text: 'Impact'
            },
            { text: 'Lucida Console', fontName: '"Lucida Console","Lucida Sans Typewriter",monaco,"Bitstream Vera Sans Mono",monospace' },
            { text: 'Tahoma', fontName: 'Tahoma,Verdana,Segoe,sans-serif' },
            { text: 'Times New Roman', fontName: 'TimesNewRoman,"Times New Roman",Times,Baskerville,Georgia,serif' },
            { text: 'Trebuchet MS', fontName: '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif' },
            { text: 'Verdana', fontName: 'Verdana,Geneva,sans-serif' }
        ];
    }
    /**
     * Overrides the default font list.
     */
    set data(fonts) {
        this._data = fonts || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = (itemArgs) => {
            if (!this.overflows && this.fontFamilyDropDownList && !this.fontFamilyDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.fontName === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, fontName: null }));
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            this.value = getUniqueStyleValues(style.selected, 'font-family') || null;
            this.disabled = style.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontFamily', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(f => f.fontName === ev));
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('fontFamily');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontFamilyDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontFamilyButton.nativeElement.focus();
        }
        else {
            this.fontFamilyDropDownList.focus();
        }
    }
    /**
     * @hidden
     */
    handleKey() {
        this.tabindex = -1;
        return false;
    }
}
EditorFontFamilyComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFontFamilyComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFontFamily]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-fontfamily-dropdownlist
                #element
                [defaultItem]="defaultItem"
                [data]="data"
                [(value)]="value"
                [itemDisabled]="itemDisabled"
                [title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="onValueChange($event)"
            >
            </kendo-editor-fontfamily-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #fontFamilyButton
                class="k-overflow-button"
                [icon]="'font-family'"
                [attr.title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (click)="openDialog()"
            >
                {{ title }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorFontFamilyComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFontFamilyComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    fontFamilyDropDownList: [{ type: ViewChild, args: ['element', { read: FontFamilyDropDownListComponent },] }],
    fontFamilyButton: [{ type: ViewChild, args: ['fontFamilyButton',] }]
};

// tslint:disable:no-forward-ref
/**
 * A component which configures an existing ColorPickerComponent as a ToolBar tool.
 * To associate a `kendo-toolbar-colorpicker` with an Editor command that changes the
 * foreground or the background color of the text, use the `kendoEditorForeColor` or `kendoEditorBackColor` directive.
 */
class EditorColorPickerComponent extends ToolBarToolComponent {
    constructor(editor, localization, dialogService) {
        super();
        this.editor = editor;
        this.localization = localization;
        this.dialogService = dialogService;
        this.tabindex = -1;
        /**
         * Specifies if the component should be disabled.
         */
        this.disabled = false;
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get(this.editorCommand);
    }
    ngOnInit() {
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            this.disabled = style.disabled;
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    /**
     * @hidden
     */
    handleValueChange(color) {
        this.editor.exec(this.editorCommand, color);
        this.editor.focus();
    }
    /**
     * @hidden
     */
    handleActiveColorClick(event) {
        event.preventOpen();
        this.handleValueChange(event.color);
    }
    /**
     * @hidden
     */
    onOpen(picker) {
        this.valueCache = picker.value;
        picker.reset();
    }
    /**
     * @hidden
     */
    onClose(picker) {
        if (!picker.value) {
            picker.value = this.valueCache;
        }
    }
    /**
     * @hidden
     */
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: ColorPickerDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            value: this.value,
            title: this.title,
            editorCommand: this.editorCommand,
            paletteSettings: this.paletteSettings,
            icon: this.icon
        });
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.tabindex = 0;
        if (this.overflows) {
            this.colorPickerButton.nativeElement.focus();
        }
        else {
            this.colorPicker.focus();
        }
    }
    /**
     * @hidden
     */
    handleKey() {
        this.tabindex = -1;
        return false;
    }
}
EditorColorPickerComponent.decorators = [
    { type: Component, args: [{
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorColorPickerComponent) }],
                selector: 'kendo-toolbar-colorpicker',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-colorpicker
                #colorpicker
                [view]="'palette'"
                [format]="'hex'"
                [attr.title]="title"
                [icon]="icon"
                [value]="value"
                [paletteSettings]="paletteSettings"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="handleValueChange($event)"
                (activeColorClick)="handleActiveColorClick($event)"
                (open)="onOpen(colorpicker)"
                (close)="onClose(colorpicker)"
            >
            </kendo-colorpicker>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #colorPickerButton
                class="k-overflow-button"
                [icon]="icon"
                [attr.title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (click)="openDialog()"
            >
                {{ title }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorColorPickerComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService },
    { type: DialogService }
];
EditorColorPickerComponent.propDecorators = {
    value: [{ type: Input }],
    icon: [{ type: Input }],
    paletteSettings: [{ type: Input }],
    editorCommand: [{ type: Input }],
    disabled: [{ type: Input }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['colorpicker', { read: ElementRef },] }],
    colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }],
    colorPickerButton: [{ type: ViewChild, args: ['colorPickerButton', { read: ElementRef },] }]
};

const popupWrapperWidth = '190px';
const popupWrapperHeight = '164px'; // Set to '192px' when TableWizard button is added;
/**
 * A toolbar component which allows the user to create and insert a table in the Editor's content.
 *
 * @example
 * ```ts-no-run
 * <kendo-editor-insert-table-button></kendo-editor-insert-table-button>
 * ```
 */
class EditorInsertTableButtonComponent extends ToolBarToolComponent {
    constructor(editor, localization, popupService, dialogService) {
        super();
        this.editor = editor;
        this.localization = localization;
        this.popupService = popupService;
        this.dialogService = dialogService;
        this.open = false;
        this.buttonBlurred = new EventEmitter();
        this.cellClicked = new EventEmitter();
        this.subs = this.editor.stateChange.subscribe(({ insertTable }) => {
            this.disabled = insertTable.disabled;
        });
        this.subs = this.buttonBlurred.pipe(concatMap(() => interval(200).pipe(take(1), takeUntil(this.cellClicked)))).subscribe(() => {
            this.toggle(false);
        });
    }
    ngAfterViewInit() {
        this.getButton().tabIndex = -1;
    }
    ngOnDestroy() {
        this.destroyPopup();
        this.subs.unsubscribe();
    }
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('insertTable');
    }
    /**
     * @hidden
     */
    toggle(open) {
        this.open = open === undefined ? !this.open : open;
        this.destroyPopup();
        if (this.open) {
            this.createPopup();
        }
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: InsertTableDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor
        });
    }
    /**
     * @hidden
     */
    onBlur() {
        this.getButton().tabIndex = -1;
        this.buttonBlurred.emit();
    }
    /**
     * @hidden
     */
    onCellClick(args) {
        this.cellClicked.emit();
        this.toggle(false);
        this.editor.exec('insertTable', args);
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.getButton().focus();
        this.getButton().tabIndex = 0;
    }
    /**
     * @hidden
     */
    handleKey(ev) {
        if (ev.keyCode === Keys.Space || ev.keyCode === Keys.Enter) {
            return true;
        }
        this.getButton().tabIndex = -1;
        return false;
    }
    /**
     * @hidden
     */
    onTableWizardClick() {
        // this.toggle(false);
        // this.editor.openDialog("tableWizard");
    }
    createPopup() {
        const horizontalAlign = this.editor.direction === 'rtl' ? 'right' : 'left';
        const anchorPosition = { horizontal: horizontalAlign, vertical: 'bottom' };
        const popupPosition = { horizontal: horizontalAlign, vertical: 'top' };
        this.popupRef = this.popupService.open({
            anchor: this.element,
            anchorAlign: anchorPosition,
            animate: true,
            content: this.popupGridTemplate,
            popupAlign: popupPosition,
            popupClass: 'k-ct-popup k-group k-reset k-state-border-up',
            positionMode: 'absolute'
        });
        const popupWrapper = this.popupRef.popupElement;
        popupWrapper.style.width = popupWrapperWidth;
        popupWrapper.style.height = popupWrapperHeight;
        popupWrapper.setAttribute('dir', this.editor.direction);
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    getButton() {
        return (this.overflows ? this.overflowElement : this.element).nativeElement;
    }
}
EditorInsertTableButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorInsertTableButtonComponent) }],
                selector: 'kendo-editor-insert-table-button',
                template: `
        <ng-template #toolbarTemplate>
            <button
                type="button"
                kendoButton
                #element
                [attr.title]="title"
                [icon]="'table-insert'"
                [disabled]="disabled"
                (click)="toggle()"
                (blur)="onBlur()"
            ></button>
        </ng-template>
        <ng-template #popupTemplate>
            <button kendoButton #overflowElement [attr.title]="title" [icon]="'table-insert'" [disabled]="disabled" (click)="openDialog()">
                {{ title }}
            </button>
        </ng-template>
        <ng-template #popupGridTemplate>
            <kendo-popup-table-grid (cellClick)="onCellClick($event)" (tableWizardClick)="onTableWizardClick()"></kendo-popup-table-grid>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorInsertTableButtonComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService },
    { type: PopupService },
    { type: DialogService }
];
EditorInsertTableButtonComponent.propDecorators = {
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    overflowElement: [{ type: ViewChild, args: ['overflowElement',] }],
    popupGridTemplate: [{ type: ViewChild, args: ['popupGridTemplate', { static: true },] }]
};

/**
 * @hidden
 */
class PopupTableGridComponent {
    constructor() {
        this.cellClick = new EventEmitter();
        this.tableWizardClick = new EventEmitter();
        this.state = { rows: -1, cols: -1 };
        this.rows = 6;
        this.cols = 8;
    }
    get message() {
        const { rows, cols } = this.state;
        return `Create a ${rows > -1 ? rows + 1 : ''} ${cols > -1 ? 'x' : ''} ${cols > -1 ? cols + 1 : ''} table`;
    }
    get cells() {
        return Array.from(Array(this.rows * this.cols).keys());
    }
    selected(index) {
        const { rows, cols } = this.state;
        const cellRow = Math.floor(index / this.cols);
        const cellCol = index % this.cols;
        return cellRow <= rows && cellCol <= cols;
    }
    setState(index) {
        const rows = Math.floor(index / this.cols);
        const cols = index % this.cols;
        this.state = { rows: rows, cols: cols };
    }
    resetState() {
        this.state = { rows: -1, cols: -1 };
    }
    insertTable() {
        this.cellClick.emit(this.state);
    }
    openTableWizard() {
        this.tableWizardClick.emit();
    }
}
PopupTableGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-popup-table-grid',
                template: `
        <div style="border-color: inherit;" (mouseleave)="resetState()" (click)="insertTable()">
            <span *ngFor="let i of cells"
                class="k-ct-cell"
                [class.k-state-selected]="selected(i)"
                [class.k-state-disabled]="!selected(i)"
                (mouseenter)="setState(i)">
            </span>
        </div>
        <div class="k-status" unselectable="on">{{ message }}</div>
        <!-- uncomment when TableWizard is completed
        <div class="k-editor-toolbar" unselectable="on">
            <button type="button" kendoButton class="k-tool" [icon]="'table-wizard'" (click)="openTableWizard()" title="Table Wizard">Table Wizard</button>
        </div>
        -->
    `
            },] },
];
PopupTableGridComponent.propDecorators = {
    cellClick: [{ type: Output }],
    tableWizardClick: [{ type: Output }]
};

/**
 * @hidden
 */
const commandIcons = {
    alignCenter: 'align-center',
    alignJustify: 'align-justify',
    alignLeft: 'align-left',
    alignRight: 'align-right',
    bold: 'bold',
    cleanFormatting: 'clear-css',
    createLink: 'link-horizontal',
    indent: 'indent-increase',
    insertFile: 'file-add',
    insertImage: 'image',
    insertOrderedList: 'list-ordered',
    insertUnorderedList: 'list-unordered',
    italic: 'italic',
    outdent: 'indent-decrease',
    redo: 'redo',
    strikethrough: 'strikethrough',
    subscript: 'sub-script',
    superscript: 'sup-script',
    underline: 'underline',
    undo: 'undo',
    unlink: 'unlink-horizontal',
    viewSource: 'html',
    foreColor: 'foreground-color',
    backColor: 'background',
    //table
    insertTable: 'table-insert',
    addColumnBefore: 'table-column-insert-left',
    addColumnAfter: 'table-column-insert-right',
    addRowBefore: 'table-row-insert-above',
    addRowAfter: 'table-row-insert-below',
    deleteRow: 'table-row-delete',
    deleteColumn: 'table-column-delete',
    mergeCells: 'cells-merge',
    splitCell: 'cell-split-horizontally',
    deleteTable: 'table-delete'
    // tableWizard: 'table-wizard'
};

/**
 * @hidden
 */
class EditorCommandBase {
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

/**
 * @hidden
 */
class EditorCommandButton extends EditorCommandBase {
    constructor(command, button, editor, localization) {
        super(command, button, editor, localization);
        this.command = command;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    clickHandler() {
        this.editor.exec(this.command);
        this.editor.focus();
    }
    onStateChange(toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    }
}

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AlignLeft tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignLeftButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignLeftButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorAlignLeftButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('alignLeft', button, editor, localization);
    }
}
EditorAlignLeftButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAlignLeftButton]'
            },] },
];
/** @nocollapse */
EditorAlignLeftButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AlignCenter tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignCenterButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignCenterButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorAlignCenterButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('alignCenter', button, editor, localization);
    }
}
EditorAlignCenterButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAlignCenterButton]'
            },] },
];
/** @nocollapse */
EditorAlignCenterButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AlignRight tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignRightButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignRightButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorAlignRightButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('alignRight', button, editor, localization);
    }
}
EditorAlignRightButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAlignRightButton]'
            },] },
];
/** @nocollapse */
EditorAlignRightButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AlignJustify tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignJustifyButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAlignJustifyButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorAlignJustifyButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('alignJustify', button, editor, localization);
    }
}
EditorAlignJustifyButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAlignJustifyButton]'
            },] },
];
/** @nocollapse */
EditorAlignJustifyButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Redo tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorRedoButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorRedoButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorRedoButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('redo', button, editor, localization);
    }
}
EditorRedoButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorRedoButton]'
            },] },
];
/** @nocollapse */
EditorRedoButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Undo tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUndoButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUndoButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorUndoButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('undo', button, editor, localization);
    }
}
EditorUndoButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorUndoButton]'
            },] },
];
/** @nocollapse */
EditorUndoButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * @hidden
 */
class EditorCommandDialog extends EditorCommandBase {
    constructor(dialog, button, editor, localization) {
        super(dialog, button, editor, localization);
        this.dialog = dialog;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    clickHandler() {
        this.editor.openDialog(this.dialog);
    }
    onStateChange(toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    }
}

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor InsertImage tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertImageButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertImageButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorInsertImageButtonDirective extends EditorCommandDialog {
    constructor(button, editor, localization) {
        super('insertImage', button, editor, localization);
    }
}
EditorInsertImageButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorInsertImageButton]'
            },] },
];
/** @nocollapse */
EditorInsertImageButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Indent tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorIndentButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorIndentButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorIndentButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('indent', button, editor, localization);
    }
}
EditorIndentButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorIndentButton]'
            },] },
];
/** @nocollapse */
EditorIndentButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Outdent tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorOutdentButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorOutdentButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorOutdentButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('outdent', button, editor, localization);
    }
}
EditorOutdentButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorOutdentButton]'
            },] },
];
/** @nocollapse */
EditorOutdentButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor CreateLink tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCreateLinkButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCreateLinkButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorCreateLinkButtonDirective extends EditorCommandDialog {
    constructor(button, editor, localization) {
        super('createLink', button, editor, localization);
    }
}
EditorCreateLinkButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorCreateLinkButton]'
            },] },
];
/** @nocollapse */
EditorCreateLinkButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Unlink tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUnlinkButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUnlinkButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorUnlinkButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('unlink', button, editor, localization);
    }
}
EditorUnlinkButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorUnlinkButton]'
            },] },
];
/** @nocollapse */
EditorUnlinkButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor InsertOrderedList tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertOrderedListButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertOrderedListButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorInsertOrderedListButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('insertOrderedList', button, editor, localization);
    }
}
EditorInsertOrderedListButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorInsertOrderedListButton]'
            },] },
];
/** @nocollapse */
EditorInsertOrderedListButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor InsertUnorderedList tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertUnorderedListButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertUnorderedListButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorInsertUnorderedListButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('insertUnorderedList', button, editor, localization);
    }
}
EditorInsertUnorderedListButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorInsertUnorderedListButton]'
            },] },
];
/** @nocollapse */
EditorInsertUnorderedListButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor ViewSource tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorViewSourceButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorViewSourceButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorViewSourceButtonDirective extends EditorCommandDialog {
    constructor(button, editor, localization) {
        super('viewSource', button, editor, localization);
    }
}
EditorViewSourceButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorViewSourceButton]'
            },] },
];
/** @nocollapse */
EditorViewSourceButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Bold tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorBoldButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorBoldButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorBoldButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('bold', button, editor, localization);
    }
}
EditorBoldButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorBoldButton]'
            },] },
];
/** @nocollapse */
EditorBoldButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Italic tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorItalicButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorItalicButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorItalicButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('italic', button, editor, localization);
    }
}
EditorItalicButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorItalicButton]'
            },] },
];
/** @nocollapse */
EditorItalicButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Underline tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUnderlineButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorUnderlineButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorUnderlineButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('underline', button, editor, localization);
    }
}
EditorUnderlineButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorUnderlineButton]'
            },] },
];
/** @nocollapse */
EditorUnderlineButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Strikethrough tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorStrikethroughButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorStrikethroughButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorStrikethroughButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('strikethrough', button, editor, localization);
    }
}
EditorStrikethroughButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorStrikethroughButton]'
            },] },
];
/** @nocollapse */
EditorStrikethroughButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Subscript tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorSubscriptButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorSubscriptButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorSubscriptButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('subscript', button, editor, localization);
    }
}
EditorSubscriptButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorSubscriptButton]'
            },] },
];
/** @nocollapse */
EditorSubscriptButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Superscript tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorSuperscriptButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorSuperscriptButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorSuperscriptButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('superscript', button, editor, localization);
    }
}
EditorSuperscriptButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorSuperscriptButton]'
            },] },
];
/** @nocollapse */
EditorSuperscriptButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor 'Insert File' tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertFileButton></kendo-toolbar-button>
 * ```
 */
class EditorInsertFileButtonDirective extends EditorCommandDialog {
    constructor(button, editor, localization) {
        super('insertFile', button, editor, localization);
    }
}
EditorInsertFileButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorInsertFileButton]'
            },] },
];
/** @nocollapse */
EditorInsertFileButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the foreground color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
class EditorForeColorDirective {
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.foreColor;
        this.colorPicker.editorCommand = 'foreColor';
    }
}
EditorForeColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEditorForeColor]'
            },] },
];
/** @nocollapse */
EditorForeColorDirective.ctorParameters = () => [
    { type: EditorColorPickerComponent }
];

/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the background color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
class EditorBackColorDirective {
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.backColor;
        this.colorPicker.editorCommand = 'backColor';
    }
}
EditorBackColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEditorBackColor]'
            },] },
];
/** @nocollapse */
EditorBackColorDirective.ctorParameters = () => [
    { type: EditorColorPickerComponent }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Clean Formatting tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCleanFormattingButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCleanFormattingButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
class EditorCleanFormattingButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('cleanFormatting', button, editor, localization);
    }
}
EditorCleanFormattingButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorCleanFormattingButton]'
            },] },
];
/** @nocollapse */
EditorCleanFormattingButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddColumnBefore tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddColumnBeforeButton></kendo-toolbar-button>
 * ```
 */
class EditorAddColumnBeforeButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('addColumnBefore', button, editor, localization);
    }
}
EditorAddColumnBeforeButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAddColumnBeforeButton]'
            },] },
];
/** @nocollapse */
EditorAddColumnBeforeButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddColumnAfter tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddColumnAfterButton></kendo-toolbar-button>
 * ```
 */
class EditorAddColumnAfterButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('addColumnAfter', button, editor, localization);
    }
}
EditorAddColumnAfterButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAddColumnAfterButton]'
            },] },
];
/** @nocollapse */
EditorAddColumnAfterButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddRowBefore tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddRowBeforeButton></kendo-toolbar-button>
 * ```
 */
class EditorAddRowBeforeButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('addRowBefore', button, editor, localization);
    }
}
EditorAddRowBeforeButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAddRowBeforeButton]'
            },] },
];
/** @nocollapse */
EditorAddRowBeforeButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddRowAfter tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddRowAfterButton></kendo-toolbar-button>
 * ```
 */
class EditorAddRowAfterButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('addRowAfter', button, editor, localization);
    }
}
EditorAddRowAfterButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAddRowAfterButton]'
            },] },
];
/** @nocollapse */
EditorAddRowAfterButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor DeleteColumn tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorDeleteColumnButton></kendo-toolbar-button>
 * ```
 */
class EditorDeleteColumnButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('deleteColumn', button, editor, localization);
    }
}
EditorDeleteColumnButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorDeleteColumnButton]'
            },] },
];
/** @nocollapse */
EditorDeleteColumnButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor DeleteRow tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorDeleteRowButton></kendo-toolbar-button>
 * ```
 */
class EditorDeleteRowButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('deleteRow', button, editor, localization);
    }
}
EditorDeleteRowButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorDeleteRowButton]'
            },] },
];
/** @nocollapse */
EditorDeleteRowButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor DeleteTable tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorDeleteTableButton></kendo-toolbar-button>
 * ```
 */
class EditorDeleteTableButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('deleteTable', button, editor, localization);
    }
}
EditorDeleteTableButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorDeleteTableButton]'
            },] },
];
/** @nocollapse */
EditorDeleteTableButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * @hidden
 *
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor MergeCells tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorMergeCellsButton></kendo-toolbar-button>
 * ```
 */
class EditorMergeCellsButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('mergeCells', button, editor, localization);
    }
}
EditorMergeCellsButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorMergeCellsButton]'
            },] },
];
/** @nocollapse */
EditorMergeCellsButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * @hidden
 *
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor SplitCell tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorSplitCellButton></kendo-toolbar-button>
 * ```
 */
class EditorSplitCellButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('splitCell', button, editor, localization);
    }
}
EditorSplitCellButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorSplitCellButton]'
            },] },
];
/** @nocollapse */
EditorSplitCellButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    alignCenter: [{ type: Input }],
    alignJustify: [{ type: Input }],
    alignLeft: [{ type: Input }],
    alignRight: [{ type: Input }],
    backColor: [{ type: Input }],
    bold: [{ type: Input }],
    cleanFormatting: [{ type: Input }],
    createLink: [{ type: Input }],
    fontFamily: [{ type: Input }],
    fontSize: [{ type: Input }],
    foreColor: [{ type: Input }],
    format: [{ type: Input }],
    indent: [{ type: Input }],
    insertFile: [{ type: Input }],
    insertImage: [{ type: Input }],
    insertOrderedList: [{ type: Input }],
    insertUnorderedList: [{ type: Input }],
    italic: [{ type: Input }],
    outdent: [{ type: Input }],
    redo: [{ type: Input }],
    strikethrough: [{ type: Input }],
    subscript: [{ type: Input }],
    superscript: [{ type: Input }],
    underline: [{ type: Input }],
    undo: [{ type: Input }],
    unlink: [{ type: Input }],
    viewSource: [{ type: Input }],
    insertTable: [{ type: Input }],
    addColumnBefore: [{ type: Input }],
    addColumnAfter: [{ type: Input }],
    addRowBefore: [{ type: Input }],
    addRowAfter: [{ type: Input }],
    deleteColumn: [{ type: Input }],
    deleteRow: [{ type: Input }],
    deleteTable: [{ type: Input }],
    dialogApply: [{ type: Input }],
    dialogCancel: [{ type: Input }],
    dialogInsert: [{ type: Input }],
    dialogUpdate: [{ type: Input }],
    fileText: [{ type: Input }],
    fileTitle: [{ type: Input }],
    fileWebAddress: [{ type: Input }],
    imageAltText: [{ type: Input }],
    imageHeight: [{ type: Input }],
    imageWebAddress: [{ type: Input }],
    imageWidth: [{ type: Input }],
    linkOpenInNewWindow: [{ type: Input }],
    linkText: [{ type: Input }],
    linkTitle: [{ type: Input }],
    linkWebAddress: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoEditorLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_editor %}#toc-localization)).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-editor-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const COMPONENT_DIRECTIVES = [
    //alignment
    EditorAlignLeftButtonDirective,
    EditorAlignCenterButtonDirective,
    EditorAlignRightButtonDirective,
    EditorAlignJustifyButtonDirective,
    //file
    EditorInsertFileButtonDirective,
    //history
    EditorRedoButtonDirective,
    EditorUndoButtonDirective,
    //image
    EditorInsertImageButtonDirective,
    //indent
    EditorIndentButtonDirective,
    EditorOutdentButtonDirective,
    //link
    EditorCreateLinkButtonDirective,
    EditorUnlinkButtonDirective,
    //list
    EditorInsertOrderedListButtonDirective,
    EditorInsertUnorderedListButtonDirective,
    //source
    EditorViewSourceButtonDirective,
    //typographical emphasis
    EditorBoldButtonDirective,
    EditorItalicButtonDirective,
    EditorUnderlineButtonDirective,
    EditorStrikethroughButtonDirective,
    EditorSubscriptButtonDirective,
    EditorSuperscriptButtonDirective,
    //color
    EditorForeColorDirective,
    EditorBackColorDirective,
    //clear format
    EditorCleanFormattingButtonDirective,
    //table
    EditorAddColumnBeforeButtonDirective,
    EditorAddColumnAfterButtonDirective,
    EditorAddRowBeforeButtonDirective,
    EditorAddRowAfterButtonDirective,
    EditorDeleteColumnButtonDirective,
    EditorDeleteRowButtonDirective,
    EditorDeleteTableButtonDirective,
    EditorMergeCellsButtonDirective,
    EditorSplitCellButtonDirective,
    // EditorTableWizardButtonDirective,
    //localization
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
const TOOLBAR_TOOLS = [
    EditorFontSizeComponent,
    EditorFontFamilyComponent,
    EditorFormatComponent,
    EditorColorPickerComponent,
    EditorInsertTableButtonComponent
];
const TOOLBAR_DIALOGS = [
    FileLinkDialogComponent,
    ImageDialogComponent,
    SourceDialogComponent,
    FormatDialogComponent,
    ColorPickerDialogComponent,
    FontFamilyDialogComponent,
    FontSizeDialogComponent,
    InsertTableDialogComponent
    // TableWizardDialogComponent
    // Table Wizard Building Blocks
    // TableSettingsComponent,
    // CellSettingsComponent,
    // AccessibilitySettingsComponent
];
const INTERNAL_COMPONENTS = [
    PopupTableGridComponent,
    FormatDropDownListComponent,
    FontFamilyDropDownListComponent,
    FontSizeDropDownListComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the Editor component.
 *
 * The package exports:
 * - `EditorComponent`&mdash;The `EditorComponent` class.
 * - `EditorButtonDirective`&mdash;The `EditorButton` directive class.
 * - `EditorDropDownDirective`&mdash;The `EditorDropDown` directive class.
 * - `EditorDialogDirective`&mdash;The `EditorDialog` directive class.
 * - `ToolBarDropDownListComponent`&mdash;The `ToolBarDropDownListComponent` directive class.
 * - `ButtonModule`&mdash;The `KendoButton` module.
 * - `ToolBarModule`&mdash;The `KendoToolBar` module.
 *
 *  * @example
 *
 * ```ts-no-run
 * // Import the Editor module
 * import { EditorModule } from '@progress/kendo-angular-editor';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, EditorModule], // import the Editor module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class EditorModule {
}
EditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    EditorComponent,
                    COMPONENT_DIRECTIVES,
                    TOOLBAR_TOOLS,
                    TOOLBAR_DIALOGS,
                    INTERNAL_COMPONENTS
                ],
                entryComponents: [
                    TOOLBAR_DIALOGS
                ],
                exports: [
                    EditorComponent,
                    COMPONENT_DIRECTIVES,
                    TOOLBAR_TOOLS,
                    ToolBarModule,
                    ButtonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    //needed for unit tests
                    INTERNAL_COMPONENTS
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    //Kendo UI Angular Modules
                    ButtonModule,
                    ColorPickerModule,
                    DialogModule,
                    DropDownsModule,
                    NumericTextBoxModule,
                    ToolBarModule,
                    TextBoxModule
                ]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ColorPickerDialogComponent, FileLinkDialogComponent, FontFamilyDialogComponent, FontSizeDialogComponent, FormatDialogComponent, ImageDialogComponent, InsertTableDialogComponent, SourceDialogComponent, CustomMessagesComponent, EditorLocalizationService, LocalizedMessagesDirective, Messages, EditorAlignCenterButtonDirective, EditorAlignJustifyButtonDirective, EditorAlignLeftButtonDirective, EditorAlignRightButtonDirective, EditorBackColorDirective, EditorColorPickerComponent, EditorForeColorDirective, EditorCleanFormattingButtonDirective, FontFamilyDropDownListComponent, EditorFontFamilyComponent, FontSizeDropDownListComponent, EditorFontSizeComponent, FormatDropDownListComponent, EditorFormatComponent, EditorRedoButtonDirective, EditorUndoButtonDirective, EditorInsertImageButtonDirective, EditorIndentButtonDirective, EditorOutdentButtonDirective, EditorCreateLinkButtonDirective, EditorInsertFileButtonDirective, EditorUnlinkButtonDirective, EditorInsertOrderedListButtonDirective, EditorInsertUnorderedListButtonDirective, EditorCommandBase, EditorCommandButton, EditorCommandDialog, EditorViewSourceButtonDirective, EditorAddColumnAfterButtonDirective, EditorAddColumnBeforeButtonDirective, EditorAddRowAfterButtonDirective, EditorAddRowBeforeButtonDirective, EditorDeleteColumnButtonDirective, EditorDeleteRowButtonDirective, EditorDeleteTableButtonDirective, EditorInsertTableButtonComponent, EditorMergeCellsButtonDirective, EditorSplitCellButtonDirective, PopupTableGridComponent, EditorBoldButtonDirective, EditorItalicButtonDirective, EditorStrikethroughButtonDirective, EditorSubscriptButtonDirective, EditorSuperscriptButtonDirective, EditorUnderlineButtonDirective, EditorComponent, EditorModule };
