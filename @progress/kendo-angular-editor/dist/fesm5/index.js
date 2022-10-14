/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { __assign, __extends } from 'tslib';
import { Inject, Optional, Component, Input, ViewChild, ElementRef, forwardRef, ChangeDetectorRef, NgZone, Output, HostBinding, ContentChild, ViewContainerRef, EventEmitter, Host, Directive, NgModule } from '@angular/core';
import { FormControl, Validators, FormGroup, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fromEvent, merge, BehaviorSubject, Subject, zip, interval } from 'rxjs';
import { filter, auditTime, map, concatMap, take, takeUntil } from 'rxjs/operators';
import { ToolBarComponent, ToolBarToolComponent, ToolBarButtonComponent, ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DialogRef, DialogContentBase, DialogService, DialogModule } from '@progress/kendo-angular-dialog';
import { isDocumentAvailable, guid, KendoInput, Keys } from '@progress/kendo-angular-common';
import { nodes, Schema, marks, toggleInlineFormat, bold, removeAllMarks, applyLink, applyInlineStyle, insertText, italic, strikethrough, subscript, superscript, underline, removeLink, link, isAligned, alignCenterRules, alignBlocks, alignRemoveRules, alignJustifyRules, alignLeftRules, alignRightRules, formatBlockElements, getHtml, indent, insertImage, toggleOrderedList, toggleUnorderedList, outdent, redo, setHtml, undo, createTable, insertNode, addColumnBefore, addColumnAfter, addRowBefore, addRowAfter, deleteRow, deleteColumn, mergeCells, splitCell, deleteTable, hasMark, activeNode, canIndentAsListItem, canBeIndented, indentRules, hasNode, canOutdentAsListItem, outdentRules, getActiveMarks, getNodeFromSelection, getMark, getSelectionText, TextSelection, parseContent, EditorState, Plugin, PluginKey, history, keymap, buildListKeymap, buildKeymap, baseKeymap, EditorView, hasSameMarkup, pasteCleanup, removeComments, sanitize, removeAttribute, sanitizeStyleAttr, sanitizeClassAttr } from '@progress/kendo-editor-common';
import { L10N_PREFIX, MessageService, RTL, LocalizationService, ComponentMessages } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';
import { DropDownListComponent, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ColorPickerComponent, ColorPickerModule, NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { PopupService } from '@progress/kendo-angular-popup';

/**
 * @hidden
 */
function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0;
    return width;
}
/**
 * @hidden
 */
var serializeDOMAttrs = function (el) {
    return Array.from(el.attributes)
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign({}, acc, (_a = {}, _a[curr.name] = curr.value, _a));
    }, {});
};
/**
 * @hidden
 */
var removeEntries = function (obj, predicate) {
    return Object.keys(obj)
        .filter(function (key) { return predicate(key); })
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign(acc, (_a = {}, _a[curr] = obj[curr], _a));
    }, {});
};
/**
 * @hidden
 */
var removeEmptyEntries = function (obj) {
    var predicate = function (key) { return obj[key] !== null && obj[key] !== undefined && obj[key] !== ''; };
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
var isNullOrUndefined = function (value) { return value === undefined || value === null; };
/**
 * @hidden
 */
var isPresent = function (value) { return !isNullOrUndefined(value); };
/**
 * @hidden
 */
var detectIE = function () {
    if (!isDocumentAvailable()) {
        return false;
    }
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};
/**
 * @hidden
 */
var safeString = function (value) { return (isNullOrUndefined(value) ? '' : value.toString()); };
/**
 * @hidden
 */
var first = function (arr) { return arr[0]; };
/**
 * @hidden
 */
var last = function (arr) { return arr[arr.length - 1]; };
/**
 * @hidden
 */
var split = function (splitter) { return function (value) { return value.split(splitter); }; };
/**
 * @hidden
 */
var trim = function (value) { return value.trim(); };
/**
 * @hidden
 */
var filter$1 = function (predicate) { return function (arr) { return arr.filter(predicate); }; };
/**
 * @hidden
 */
var getUniqueStyleValues = function (style, cssStyle) {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    var uniqueMarkValues = style.marks
        .filter(function (m) { return m.type.name === 'style'; })
        .map(function (m) { return m.attrs.style; })
        .map(safeString)
        .map(split(';'))
        .map(filter$1(function (m) { return m.includes(cssStyle); }))
        // guards against empty array
        .map(function (cssStyleValues) { return (cssStyleValues.length !== 0 ? cssStyleValues : [cssStyle + ": INVALID"]); })
        .map(first)
        .map(split(':'))
        .map(last)
        .map(trim)
        .reduce(function (acc, curr) { return (acc.indexOf(curr) > -1 ? acc : acc.concat([curr])); }, []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
var conditionallyExecute = function (fn) { return function (condition) { return function (param) { return (condition ? fn(param) : param); }; }; };
/**
 * @hidden
 */
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) { return fns.reduce(function (y, f) { return f(y); }, x); };
};

var commonAttributes = function () {
    return {
        class: { default: null },
        id: { default: null },
        style: { default: null }
    };
};
/**
 * @hidden
 */
var marks$1 = marks;
var ɵ1 = function () {
    return Object.assign(nodes, {
        table: {
            attrs: __assign({}, commonAttributes(), { class: { default: 'k-table' }, cellspacing: { default: null }, cellpadding: { default: null } }),
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
            toDOM: function (node) { return ["table", removeEmptyEntries(node.attrs), ["tbody", 0]]; }
        },
        htmlBlock: {
            group: "block",
            attrs: {
                html: {}
            },
            parseDOM: [
                {
                    tag: "*:not(p):not(blockquote):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(pre):not(img):not(ol):not(ul):not(li):not(table):not(tbody):not(td):not(th):not(tr):not(thead):not(tfoot):not(colgroup):not(col):not(object)",
                    getAttrs: function (elt) {
                        return { html: elt.outerHTML };
                    }
                }
            ],
            toDOM: function (node) {
                var scratch = document.createElement("div");
                scratch.innerHTML = node.attrs.html;
                return scratch.firstChild;
            }
        }
    });
};
var nodes$1 = (ɵ1)();
/**
 * @hidden
 */
var schema = new Schema({
    marks: marks$1,
    nodes: nodes$1
});

var alignRemove = function (state, dispatch) { return alignBlocks(alignRemoveRules)(state, dispatch); };
var ɵ1$1 = function () { return toggleInlineFormat(bold); }, ɵ2 = function () { return removeAllMarks({ except: schema.marks.link }); }, ɵ3 = function (attrs) { return applyLink({ mark: 'link', attrs: attrs }); }, ɵ4 = function (font) { return applyInlineStyle({ style: 'font-family', value: font }); }, ɵ5 = function (size) { return applyInlineStyle({ style: 'font-size', value: size + "px" }); }, ɵ6 = function (attrs) { return applyLink({ mark: 'link', attrs: attrs }); }, ɵ7 = function (text) { return insertText(text); }, ɵ8 = function () { return toggleInlineFormat(italic); }, ɵ9 = function () { return toggleInlineFormat(strikethrough); }, ɵ10 = function () { return toggleInlineFormat(subscript); }, ɵ11 = function () { return toggleInlineFormat(superscript); }, ɵ12 = function () { return toggleInlineFormat(underline); }, ɵ13 = function () { return removeLink(link); }, ɵ14 = function (color) { return applyInlineStyle({ style: 'color', value: color }); }, ɵ15 = function (color) { return applyInlineStyle({ style: 'background-color', value: color }); };
var inlineCommand = {
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
var ɵ16 = function () { return function (state, dispatch) { return isAligned(state, alignCenterRules) ? alignRemove(state, dispatch) : alignBlocks(alignCenterRules)(state, dispatch); }; }, ɵ17 = function () { return function (state, dispatch) { return isAligned(state, alignJustifyRules) ? alignRemove(state, dispatch) : alignBlocks(alignJustifyRules)(state, dispatch); }; }, ɵ18 = function () { return function (state, dispatch) { return isAligned(state, alignLeftRules) ? alignRemove(state, dispatch) : alignBlocks(alignLeftRules)(state, dispatch); }; }, ɵ19 = function () { return function (state, dispatch) { return isAligned(state, alignRightRules) ? alignRemove(state, dispatch) : alignBlocks(alignRightRules)(state, dispatch); }; }, ɵ20 = function (formatAttr) { return formatBlockElements(formatAttr.tag); }, ɵ21 = function () { return getHtml; }, ɵ22 = function () { return indent; }, ɵ23 = function (attrs) { return insertImage(attrs); }, ɵ24 = function () { return toggleOrderedList; }, ɵ25 = function () { return toggleUnorderedList; }, ɵ26 = function () { return outdent; }, ɵ27 = function () { return redo; }, ɵ28 = function (content) { return setHtml(content); }, ɵ29 = function () { return undo; };
var blockCommand = {
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
var insertTable = function (attrs) { return function (state, dispatch) {
    var newTable = createTable(state.schema.nodes, attrs.rows, attrs.cols);
    if (newTable) {
        insertNode(newTable, true)(state, dispatch);
    }
}; };
var ɵ30 = function (attr) { return insertTable(attr); }, ɵ31 = function () { return addColumnBefore; }, ɵ32 = function () { return addColumnAfter; }, ɵ33 = function () { return addRowBefore; }, ɵ34 = function () { return addRowAfter; }, ɵ35 = function () { return deleteRow; }, ɵ36 = function () { return deleteColumn; }, ɵ37 = function () { return mergeCells; }, ɵ38 = function () { return splitCell; }, ɵ39 = function () { return deleteTable; };
var tableCommand = {
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
var editorCommands = Object.assign({}, inlineCommand, blockCommand, tableCommand);

/**
 * @hidden
 */
var getToolbarState = function (state) { return ({
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
}); };
/**
 * @hidden
 */
var initialToolBarState = {
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
var disabledToolBarState = {
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
var EditorLocalizationService = /** @class */ (function (_super) {
    __extends(EditorLocalizationService, _super);
    function EditorLocalizationService(prefix, messageService, _rtl) {
        return _super.call(this, prefix, messageService, _rtl) || this;
    }
    /** @nocollapse */
    EditorLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    return EditorLocalizationService;
}(LocalizationService));

/**
 * @hidden
 */
var SourceDialogComponent = /** @class */ (function (_super) {
    __extends(SourceDialogComponent, _super);
    function SourceDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = '';
        return _this;
    }
    SourceDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.textarea.nativeElement.focus();
        });
    };
    SourceDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    SourceDialogComponent.prototype.onConfirmAction = function () {
        this.editor.exec('setHTML', this.getData());
        this.dialog.close();
        this.editor.focus();
    };
    SourceDialogComponent.prototype.getData = function () {
        return this.textarea.nativeElement.value;
    };
    SourceDialogComponent.prototype.setData = function () {
        this.data = this.indent(this.editor.getSource());
    };
    SourceDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    SourceDialogComponent.prototype.indent = function (content) {
        return content
            .replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/gi, '</$1>\n')
            .replace(/<(ul|ol)([^>]*)><li/gi, '<$1$2>\n<li')
            .replace(/<br \/>/gi, '<br />\n')
            .replace(/\n$/, '');
    };
    SourceDialogComponent.decorators = [
        { type: Component, args: [{
                    styles: [
                        "\n            >>> .k-editor-textarea {\n                height: 100%;\n            }\n        "
                    ],
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('viewSource') }}\n        </kendo-dialog-titlebar>\n        <textarea [value]=\"data\" #textarea class=\"k-textarea k-editor-textarea\"></textarea>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogUpdate') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    SourceDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    SourceDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        textarea: [{ type: ViewChild, args: ['textarea',] }]
    };
    return SourceDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var ImageDialogComponent = /** @class */ (function (_super) {
    __extends(ImageDialogComponent, _super);
    function ImageDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.src = new FormControl('', Validators.required);
        _this.alt = new FormControl('');
        _this.width = new FormControl('', Validators.min(1));
        _this.height = new FormControl('', Validators.min(1));
        _this.data = {
            alt: '',
            height: '',
            src: '',
            width: ''
        };
        _this.imageData = new FormGroup({
            alt: _this.alt,
            height: _this.height,
            src: _this.src,
            width: _this.width
        });
        return _this;
    }
    ImageDialogComponent.prototype.ngOnInit = function () {
        this.srcInputId = "k-" + guid();
        this.altTextInputId = "k-" + guid();
        this.widthInputId = "k-" + guid();
        this.heightInputId = "k-" + guid();
    };
    ImageDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.srcInput.nativeElement.focus();
        });
    };
    ImageDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    ImageDialogComponent.prototype.onConfirmAction = function () {
        if (this.src.value) {
            this.editor.exec('insertImage', this.getData());
            this.dialog.close();
            this.editor.focus();
        }
    };
    ImageDialogComponent.prototype.setData = function (state) {
        var node = getNodeFromSelection(state);
        if (node) {
            this.src.patchValue(node.attrs.src);
            this.alt.patchValue(node.attrs.alt);
            this.width.patchValue(node.attrs.width);
            this.height.patchValue(node.attrs.height);
        }
    };
    ImageDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    ImageDialogComponent.prototype.getData = function () {
        return {
            alt: this.alt.value,
            height: this.normalizeDimension(this.height.value),
            src: this.src.value,
            width: this.normalizeDimension(this.width.value)
        };
    };
    ImageDialogComponent.prototype.normalizeDimension = function (value) {
        return Number.isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0 ? '' : safeString(parseInt(value, 10));
    };
    ImageDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('insertImage') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\">\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"srcInputId\">{{ textFor('imageWebAddress') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"srcInputId\" #srcInput [formControl]=\"src\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"altTextInputId\">{{ textFor('imageAltText') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"altTextInputId\" [formControl]=\"alt\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"widthInputId\">{{ textFor('imageWidth') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"widthInputId\" [formControl]=\"width\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"heightInputId\">{{ textFor('imageHeight') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"heightInputId\" [formControl]=\"height\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton [disabled]=\"imageData.invalid\"\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogInsert') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    ImageDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    ImageDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        srcInput: [{ type: ViewChild, args: ['srcInput', { read: ElementRef },] }]
    };
    return ImageDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var FileLinkDialogComponent = /** @class */ (function (_super) {
    __extends(FileLinkDialogComponent, _super);
    function FileLinkDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.linkForm = new FormGroup({
            'href': new FormControl('', Validators.required),
            'text': new FormControl({ value: '', disabled: true }, Validators.required),
            'title': new FormControl('')
        });
        return _this;
    }
    FileLinkDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.hrefInput.nativeElement.focus();
        });
    };
    FileLinkDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FileLinkDialogComponent.prototype.onConfirmAction = function () {
        var linkData = this.getData();
        this.editor.exec(this.command, linkData);
        this.dialog.close();
        this.editor.focus();
    };
    Object.defineProperty(FileLinkDialogComponent.prototype, "titleText", {
        get: function () {
            return this.localization.get(this.command);
        },
        enumerable: true,
        configurable: true
    });
    FileLinkDialogComponent.prototype.setData = function (state) {
        if (this.command === 'createLink') {
            this.linkForm.addControl('target', new FormControl());
        }
        var linkMark = getMark(state, schema.marks.link);
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
    };
    FileLinkDialogComponent.prototype.textForWithPrefix = function (key) {
        var prefix = this.command === 'createLink' ? 'link' : 'file';
        return this.textFor(prefix + key);
    };
    FileLinkDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FileLinkDialogComponent.prototype.setLinkText = function (state) {
        var selection = state.selection;
        if (selection.empty && selection.$cursor) {
            var cursor = selection.$cursor;
            var cursorNodeIndex = cursor.index();
            var parentNode = cursor.parent;
            return parentNode.child(cursorNodeIndex).text;
        }
        else {
            return getSelectionText(state);
        }
    };
    FileLinkDialogComponent.prototype.getData = function () {
        var linkData = this.linkForm.value;
        if (isPresent(this.linkForm.controls.target)) {
            linkData.target = linkData.target ? '_blank' : null;
        }
        return linkData;
    };
    FileLinkDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ titleText }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\">\n                    <form novalidate [formGroup]=\"linkForm\">\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"hrefInput.focus()\">{{ textForWithPrefix('WebAddress') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #hrefInput formControlName=\"href\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"textInput.focus()\">{{ textForWithPrefix('Text') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #textInput formControlName=\"text\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"titleInput.focus()\">{{ textForWithPrefix('Title') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #titleInput formControlName=\"title\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n                        <ng-container *ngIf=\"command === 'createLink'\">\n                            <div class=\"k-edit-label\"></div>\n                            <div class=\"k-edit-field\">\n                                <input type=\"checkbox\" id=\"k-target-blank\" class=\"k-checkbox\" formControlName=\"target\" />\n                                <label class=\"k-checkbox-label\" for=\"k-target-blank\">{{ textForWithPrefix('OpenInNewWindow') }}</label>\n                            </div>\n                        </ng-container>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton [disabled]=\"linkForm.invalid\" (click)=\"onConfirmAction()\" [primary]=\"true\">\n                {{ textFor('dialogInsert') }}\n            </button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FileLinkDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    FileLinkDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        command: [{ type: Input }],
        hrefInput: [{ type: ViewChild, args: ['hrefInput', { read: ElementRef },] }]
    };
    return FileLinkDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var defaultStyle = "\nhtml, body {\n    margin: 0;\n    height: 100%;\n    padding: 0;\n}\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  box-sizing: border-box;\n  position: relative;\n  padding: 8px;\n}\n\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\ndiv.ProseMirror {\n  position: relative;\n  min-height: 100%;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\ndiv.ProseMirror:focus {\n  outline: none;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\n.ProseMirror-hideselection *::selection { background: transparent; }\n.ProseMirror-hideselection *::-moz-selection { background: transparent; }\n.ProseMirror-hideselection { caret-color: transparent; }\n\n.ProseMirror li {\n  position: relative;\n}\n\nli.ProseMirror-selectednode {\n  outline: none;\n}\n\nli.ProseMirror-selectednode:after {\n  content: \"\";\n  position: absolute;\n  left: -32px;\n  right: -2px;\n  top: -2px;\n  bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n";
/**
 * @hidden
 */
var tablesStyles = "\n  .ProseMirror .tableWrapper {\n    overflow-x: auto;\n    margin: 1em 0;\n  }\n\n  .ProseMirror table {\n    margin: 0;\n    border-collapse: collapse;\n    table-layout: fixed;\n    width: 100%;\n    overflow: hidden;\n  }\n\n  .ProseMirror td, .ProseMirror th {\n    min-width: 1em;\n    border: 1px solid #ddd;\n    padding: 3px 5px;\n    vertical-align: top;\n    box-sizing: border-box;\n    position: relative;\n  }\n\n  .ProseMirror th {\n    font-weight: bold;\n    text-align: left;\n  }\n\n  .ProseMirror .column-resize-handle {\n    position: absolute;\n    right: -2px;\n    top: 0;\n    bottom: 0;\n    width: 4px;\n    z-index: 20;\n    background-color: #adf;\n    pointer-events: none;\n  }\n\n  .ProseMirror.resize-cursor {\n    cursor: ew-resize;\n    cursor: col-resize;\n  }\n\n  /* Give selected cells a blue overlay */\n  .ProseMirror .selectedCell:after {\n    z-index: 2;\n    position: absolute;\n    content: \"\";\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background: rgba(200, 200, 255, 0.4);\n    pointer-events: none;\n  }\n";
/**
 * @hidden
 */
var rtlStyles = 'body { direction: rtl }';

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
        return (__assign({}, acc, (_a = {}, _a[curr] = removeAttribute, _a)));
    }, initial);
};
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
                    var pasteCleanupSettings = __assign({}, defaultPasteCleanupSettings, _this.pasteCleanupSettings);
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

/**
 * @hidden
 */
var FormatDropDownListComponent = /** @class */ (function () {
    function FormatDropDownListComponent() {
        this.valueChange = new EventEmitter();
    }
    FormatDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FormatDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FormatDropDownListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-format-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'tag'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <ng-container [ngSwitch]=\"dataItem.tag\">\n                    <span *ngSwitchCase=\"'h1'\" style=\"display: block; font-size: 2em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h2'\" style=\"display: block; font-size: 1.5em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h3'\" style=\"display: block; font-size: 1.17em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h4'\" style=\"display: block; font-size: 1em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h5'\" style=\"display: block; font-size: .83em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h6'\" style=\"display: block; font-size: .67em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'p'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'blockquote'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchDefault>{{ dataItem.text }}</span>\n                </ng-container>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
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
    return FormatDropDownListComponent;
}());

/**
 * @hidden
 */
var FormatDialogComponent = /** @class */ (function (_super) {
    __extends(FormatDialogComponent, _super);
    function FormatDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = [];
        return _this;
    }
    FormatDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.formatDropDownList.dropDownList.focus();
        });
    };
    FormatDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FormatDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec('format', { tag: this.value });
        }
        this.dialog.close();
    };
    FormatDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    };
    FormatDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FormatDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('format') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-editor-format-dropdownlist\n                        #formatDropDownList\n                        [defaultItem]=\"defaultItem\"\n                        [data]=\"data\"\n                        [(value)]=\"value\"\n                        [itemDisabled]=\"itemDisabled\"\n                    >\n                    </kendo-editor-format-dropdownlist>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FormatDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    FormatDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList', { read: FormatDropDownListComponent },] }]
    };
    return FormatDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var ColorPickerDialogComponent = /** @class */ (function (_super) {
    __extends(ColorPickerDialogComponent, _super);
    function ColorPickerDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        return _this;
    }
    ColorPickerDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.colorPicker.focus();
        });
    };
    ColorPickerDialogComponent.prototype.handleActiveColorClick = function (event) {
        event.preventOpen();
        this.value = event.color;
    };
    ColorPickerDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    ColorPickerDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec(this.editorCommand, this.value);
        }
        this.dialog.close();
    };
    ColorPickerDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.value = args.value;
        this.editorCommand = args.editorCommand;
        this.paletteSettings = args.paletteSettings;
        this.icon = args.icon;
    };
    ColorPickerDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    ColorPickerDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor(editorCommand) }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-colorpicker\n                        #colorpicker\n                        [view]=\"'palette'\"\n                        [format]=\"'hex'\"\n                        [attr.title]=\"title\"\n                        [icon]=\"icon\"\n                        [(value)]=\"value\"\n                        [paletteSettings]=\"paletteSettings\"\n                        (activeColorClick)=\"handleActiveColorClick($event)\"\n                    >\n                    </kendo-colorpicker>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPickerDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    ColorPickerDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }]
    };
    return ColorPickerDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var FontFamilyDropDownListComponent = /** @class */ (function () {
    function FontFamilyDropDownListComponent() {
        this.valueChange = new EventEmitter();
    }
    FontFamilyDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FontFamilyDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FontFamilyDropDownListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-fontfamily-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'fontName'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span [ngStyle]=\"{ 'font-family': dataItem.fontName }\">\n                    {{ dataItem.text }}\n                </span>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
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
    return FontFamilyDropDownListComponent;
}());

/**
 * @hidden
 */
var FontFamilyDialogComponent = /** @class */ (function (_super) {
    __extends(FontFamilyDialogComponent, _super);
    function FontFamilyDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = [];
        return _this;
    }
    FontFamilyDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.fontFamilyDropDownList.dropDownList.focus();
        });
    };
    FontFamilyDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FontFamilyDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec('fontFamily', this.value);
        }
        this.dialog.close();
    };
    FontFamilyDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    };
    FontFamilyDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FontFamilyDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('fontFamily') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-editor-fontfamily-dropdownlist\n                        #fontFamilyDropDownList\n                        [defaultItem]=\"defaultItem\"\n                        [data]=\"data\"\n                        [(value)]=\"value\"\n                        [itemDisabled]=\"itemDisabled\"\n                    >\n                    </kendo-editor-fontfamily-dropdownlist>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FontFamilyDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    FontFamilyDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        fontFamilyDropDownList: [{ type: ViewChild, args: ['fontFamilyDropDownList', { read: FontFamilyDropDownListComponent },] }]
    };
    return FontFamilyDialogComponent;
}(DialogContentBase));

/**
 * @hidden
 */
var InsertTableDialogComponent = /** @class */ (function (_super) {
    __extends(InsertTableDialogComponent, _super);
    function InsertTableDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        return _this;
    }
    InsertTableDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
        this.editor.focus();
    };
    InsertTableDialogComponent.prototype.onCellClick = function (args) {
        this.dialog.close();
        this.editor.exec("insertTable", args);
        this.editor.focus();
    };
    InsertTableDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
    };
    InsertTableDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    InsertTableDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('insertTable') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-ct-popup k-window-content\" style=\"text-align: center;\">\n                    <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\"></kendo-popup-table-grid>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    InsertTableDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    InsertTableDialogComponent.propDecorators = {
        editor: [{ type: Input }]
    };
    return InsertTableDialogComponent;
}(DialogContentBase));

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
var EditorFormatComponent = /** @class */ (function (_super) {
    __extends(EditorFormatComponent, _super);
    function EditorFormatComponent(editor, dialogService, localization) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.dialogService = dialogService;
        _this.localization = localization;
        _this.disabled = false;
        _this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        _this.valueChange = new EventEmitter();
        _this._data = [
            { text: 'Paragraph', tag: 'p' },
            { text: 'Quotation', tag: 'blockquote' },
            { text: 'Heading 1', tag: 'h1' },
            { text: 'Heading 2', tag: 'h2' },
            { text: 'Heading 3', tag: 'h3' },
            { text: 'Heading 4', tag: 'h4' },
            { text: 'Heading 5', tag: 'h5' },
            { text: 'Heading 6', tag: 'h6' }
        ];
        return _this;
    }
    Object.defineProperty(EditorFormatComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default format items list.
         */
        set: function (formatItems) {
            this._data = formatItems || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFormatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.formatDropDownList && !_this.formatDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.tag === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, tag: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var format = _a.format;
            var index = _this.data.findIndex(function (item) { return item.tag === format.selected.tag; });
            _this.value = index !== -1 ? format.selected.tag : null;
            _this.disabled = format.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('format', { tag: ev });
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (d) { return d.tag === ev; }));
        }
    };
    EditorFormatComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFormatComponent.prototype, "outerWidth", {
        get: function () {
            var element = this.formatDropDownList.element;
            if (element) {
                return outerWidth(element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFormatComponent.prototype, "title", {
        get: function () {
            return this.localization.get('format');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FormatDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.formatButton.nativeElement.focus();
        }
        else {
            this.formatDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFormatComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFormatComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFormat]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-format-dropdownlist\n                #formatDropDownList\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-format-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                #formatButton\n                [tabindex]=\"tabindex\"\n                type=\"button\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [icon]=\"'apply-format'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFormatComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFormatComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList',] }],
        formatButton: [{ type: ViewChild, args: ['formatButton',] }]
    };
    return EditorFormatComponent;
}(ToolBarToolComponent));

/**
 * @hidden
 */
var FontSizeDropDownListComponent = /** @class */ (function () {
    function FontSizeDropDownListComponent() {
        this.valueChange = new EventEmitter();
    }
    FontSizeDropDownListComponent.prototype.onValueChange = function (size) {
        this.valueChange.emit(size);
    };
    FontSizeDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FontSizeDropDownListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-fontsize-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'size'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n        </kendo-dropdownlist>\n    "
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
    return FontSizeDropDownListComponent;
}());

/**
 * @hidden
 */
var FontSizeDialogComponent = /** @class */ (function (_super) {
    __extends(FontSizeDialogComponent, _super);
    function FontSizeDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = [];
        return _this;
    }
    FontSizeDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.fontSizeDropDownList.dropDownList.focus();
        });
    };
    FontSizeDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FontSizeDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec('fontSize', this.value);
        }
        this.dialog.close();
    };
    FontSizeDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    };
    FontSizeDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FontSizeDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('fontSize') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-editor-fontsize-dropdownlist\n                        #fontSizeDropDownList\n                        [defaultItem]=\"defaultItem\"\n                        [data]=\"data\"\n                        [(value)]=\"value\"\n                        [itemDisabled]=\"itemDisabled\"\n                    >\n                    </kendo-editor-fontsize-dropdownlist>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FontSizeDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    FontSizeDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        fontSizeDropDownList: [{ type: ViewChild, args: ['fontSizeDropDownList', { read: FontSizeDropDownListComponent },] }]
    };
    return FontSizeDialogComponent;
}(DialogContentBase));

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
var EditorFontSizeComponent = /** @class */ (function (_super) {
    __extends(EditorFontSizeComponent, _super);
    function EditorFontSizeComponent(editor, dialogService, localization) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.dialogService = dialogService;
        _this.localization = localization;
        _this.disabled = false;
        _this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        _this.valueChange = new EventEmitter();
        _this._data = [
            { text: '8px', size: 8 },
            { text: '10px', size: 10 },
            { text: '12px', size: 12 },
            { text: '14px', size: 14 },
            { text: '18px', size: 18 },
            { text: '24px', size: 24 },
            { text: '36px', size: 36 }
        ];
        return _this;
    }
    Object.defineProperty(EditorFontSizeComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default font size list.
         */
        set: function (sizes) {
            this._data = sizes || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFontSizeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.fontSizeDropDownList && !_this.fontSizeDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.size === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, size: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            // remove units(px, em, rem...)
            // string#match returns array
            var style = _a.style;
            _this.value = (getUniqueStyleValues(style.selected, 'font-size').match(/\d+/g) || [null])[0];
            _this.disabled = style.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontSize', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (d) { return d.size === parseInt(ev, 10); }));
        }
    };
    EditorFontSizeComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFontSizeComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFontSizeComponent.prototype, "title", {
        get: function () {
            return this.localization.get('fontSize');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontSizeDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontSizeButton.nativeElement.focus();
        }
        else {
            this.fontSizeDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFontSizeComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFontSizeComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFontSize]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-fontsize-dropdownlist\n                #element\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-fontsize-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #fontSizeButton\n                class=\"k-overflow-button\"\n                [icon]=\"'font-size'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFontSizeComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFontSizeComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        fontSizeDropDownList: [{ type: ViewChild, args: ['element', { read: FontSizeDropDownListComponent },] }],
        fontSizeButton: [{ type: ViewChild, args: ['fontSizeButton',] }]
    };
    return EditorFontSizeComponent;
}(ToolBarToolComponent));

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
var EditorFontFamilyComponent = /** @class */ (function (_super) {
    __extends(EditorFontFamilyComponent, _super);
    function EditorFontFamilyComponent(editor, dialogService, localization) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.dialogService = dialogService;
        _this.localization = localization;
        _this.disabled = false;
        _this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        _this.valueChange = new EventEmitter();
        _this._data = [
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
        return _this;
    }
    Object.defineProperty(EditorFontFamilyComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default font list.
         */
        set: function (fonts) {
            this._data = fonts || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFontFamilyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.fontFamilyDropDownList && !_this.fontFamilyDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.fontName === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, fontName: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var style = _a.style;
            _this.value = getUniqueStyleValues(style.selected, 'font-family') || null;
            _this.disabled = style.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontFamily', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (f) { return f.fontName === ev; }));
        }
    };
    EditorFontFamilyComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFontFamilyComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFontFamilyComponent.prototype, "title", {
        get: function () {
            return this.localization.get('fontFamily');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontFamilyDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontFamilyButton.nativeElement.focus();
        }
        else {
            this.fontFamilyDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFontFamilyComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFontFamilyComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFontFamily]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-fontfamily-dropdownlist\n                #element\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-fontfamily-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #fontFamilyButton\n                class=\"k-overflow-button\"\n                [icon]=\"'font-family'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFontFamilyComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFontFamilyComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        fontFamilyDropDownList: [{ type: ViewChild, args: ['element', { read: FontFamilyDropDownListComponent },] }],
        fontFamilyButton: [{ type: ViewChild, args: ['fontFamilyButton',] }]
    };
    return EditorFontFamilyComponent;
}(ToolBarToolComponent));

// tslint:disable:no-forward-ref
/**
 * A component which configures an existing ColorPickerComponent as a ToolBar tool.
 * To associate a `kendo-toolbar-colorpicker` with an Editor command that changes the
 * foreground or the background color of the text, use the `kendoEditorForeColor` or `kendoEditorBackColor` directive.
 */
var EditorColorPickerComponent = /** @class */ (function (_super) {
    __extends(EditorColorPickerComponent, _super);
    function EditorColorPickerComponent(editor, localization, dialogService) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.localization = localization;
        _this.dialogService = dialogService;
        _this.tabindex = -1;
        /**
         * Specifies if the component should be disabled.
         */
        _this.disabled = false;
        return _this;
    }
    Object.defineProperty(EditorColorPickerComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get(this.editorCommand);
        },
        enumerable: true,
        configurable: true
    });
    EditorColorPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var style = _a.style;
            _this.disabled = style.disabled;
        });
    };
    EditorColorPickerComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleValueChange = function (color) {
        this.editor.exec(this.editorCommand, color);
        this.editor.focus();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleActiveColorClick = function (event) {
        event.preventOpen();
        this.handleValueChange(event.color);
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.onOpen = function (picker) {
        this.valueCache = picker.value;
        picker.reset();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.onClose = function (picker) {
        if (!picker.value) {
            picker.value = this.valueCache;
        }
    };
    Object.defineProperty(EditorColorPickerComponent.prototype, "outerWidth", {
        /**
         * @hidden
         */
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: ColorPickerDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            value: this.value,
            title: this.title,
            editorCommand: this.editorCommand,
            paletteSettings: this.paletteSettings,
            icon: this.icon
        });
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.colorPickerButton.nativeElement.focus();
        }
        else {
            this.colorPicker.focus();
        }
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorColorPickerComponent.decorators = [
        { type: Component, args: [{
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorColorPickerComponent; }) }],
                    selector: 'kendo-toolbar-colorpicker',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-colorpicker\n                #colorpicker\n                [view]=\"'palette'\"\n                [format]=\"'hex'\"\n                [attr.title]=\"title\"\n                [icon]=\"icon\"\n                [value]=\"value\"\n                [paletteSettings]=\"paletteSettings\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"handleValueChange($event)\"\n                (activeColorClick)=\"handleActiveColorClick($event)\"\n                (open)=\"onOpen(colorpicker)\"\n                (close)=\"onClose(colorpicker)\"\n            >\n            </kendo-colorpicker>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #colorPickerButton\n                class=\"k-overflow-button\"\n                [icon]=\"icon\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorColorPickerComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService },
        { type: DialogService }
    ]; };
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
    return EditorColorPickerComponent;
}(ToolBarToolComponent));

var popupWrapperWidth = '190px';
var popupWrapperHeight = '164px'; // Set to '192px' when TableWizard button is added;
/**
 * A toolbar component which allows the user to create and insert a table in the Editor's content.
 *
 * @example
 * ```ts-no-run
 * <kendo-editor-insert-table-button></kendo-editor-insert-table-button>
 * ```
 */
var EditorInsertTableButtonComponent = /** @class */ (function (_super) {
    __extends(EditorInsertTableButtonComponent, _super);
    function EditorInsertTableButtonComponent(editor, localization, popupService, dialogService) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.localization = localization;
        _this.popupService = popupService;
        _this.dialogService = dialogService;
        _this.open = false;
        _this.buttonBlurred = new EventEmitter();
        _this.cellClicked = new EventEmitter();
        _this.subs = _this.editor.stateChange.subscribe(function (_a) {
            var insertTable = _a.insertTable;
            _this.disabled = insertTable.disabled;
        });
        _this.subs = _this.buttonBlurred.pipe(concatMap(function () { return interval(200).pipe(take(1), takeUntil(_this.cellClicked)); })).subscribe(function () {
            _this.toggle(false);
        });
        return _this;
    }
    EditorInsertTableButtonComponent.prototype.ngAfterViewInit = function () {
        this.getButton().tabIndex = -1;
    };
    EditorInsertTableButtonComponent.prototype.ngOnDestroy = function () {
        this.destroyPopup();
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorInsertTableButtonComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorInsertTableButtonComponent.prototype, "title", {
        get: function () {
            return this.localization.get('insertTable');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.toggle = function (open) {
        this.open = open === undefined ? !this.open : open;
        this.destroyPopup();
        if (this.open) {
            this.createPopup();
        }
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: InsertTableDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor
        });
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onBlur = function () {
        this.getButton().tabIndex = -1;
        this.buttonBlurred.emit();
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onCellClick = function (args) {
        this.cellClicked.emit();
        this.toggle(false);
        this.editor.exec('insertTable', args);
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.focus = function () {
        this.getButton().focus();
        this.getButton().tabIndex = 0;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.handleKey = function (ev) {
        if (ev.keyCode === Keys.Space || ev.keyCode === Keys.Enter) {
            return true;
        }
        this.getButton().tabIndex = -1;
        return false;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onTableWizardClick = function () {
        // this.toggle(false);
        // this.editor.openDialog("tableWizard");
    };
    EditorInsertTableButtonComponent.prototype.createPopup = function () {
        var horizontalAlign = this.editor.direction === 'rtl' ? 'right' : 'left';
        var anchorPosition = { horizontal: horizontalAlign, vertical: 'bottom' };
        var popupPosition = { horizontal: horizontalAlign, vertical: 'top' };
        this.popupRef = this.popupService.open({
            anchor: this.element,
            anchorAlign: anchorPosition,
            animate: true,
            content: this.popupGridTemplate,
            popupAlign: popupPosition,
            popupClass: 'k-ct-popup k-group k-reset k-state-border-up',
            positionMode: 'absolute'
        });
        var popupWrapper = this.popupRef.popupElement;
        popupWrapper.style.width = popupWrapperWidth;
        popupWrapper.style.height = popupWrapperHeight;
        popupWrapper.setAttribute('dir', this.editor.direction);
    };
    EditorInsertTableButtonComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    EditorInsertTableButtonComponent.prototype.getButton = function () {
        return (this.overflows ? this.overflowElement : this.element).nativeElement;
    };
    EditorInsertTableButtonComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorInsertTableButtonComponent; }) }],
                    selector: 'kendo-editor-insert-table-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                type=\"button\"\n                kendoButton\n                #element\n                [attr.title]=\"title\"\n                [icon]=\"'table-insert'\"\n                [disabled]=\"disabled\"\n                (click)=\"toggle()\"\n                (blur)=\"onBlur()\"\n            ></button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button kendoButton #overflowElement [attr.title]=\"title\" [icon]=\"'table-insert'\" [disabled]=\"disabled\" (click)=\"openDialog()\">\n                {{ title }}\n            </button>\n        </ng-template>\n        <ng-template #popupGridTemplate>\n            <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\" (tableWizardClick)=\"onTableWizardClick()\"></kendo-popup-table-grid>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorInsertTableButtonComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService },
        { type: PopupService },
        { type: DialogService }
    ]; };
    EditorInsertTableButtonComponent.propDecorators = {
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        overflowElement: [{ type: ViewChild, args: ['overflowElement',] }],
        popupGridTemplate: [{ type: ViewChild, args: ['popupGridTemplate', { static: true },] }]
    };
    return EditorInsertTableButtonComponent;
}(ToolBarToolComponent));

/**
 * @hidden
 */
var PopupTableGridComponent = /** @class */ (function () {
    function PopupTableGridComponent() {
        this.cellClick = new EventEmitter();
        this.tableWizardClick = new EventEmitter();
        this.state = { rows: -1, cols: -1 };
        this.rows = 6;
        this.cols = 8;
    }
    Object.defineProperty(PopupTableGridComponent.prototype, "message", {
        get: function () {
            var _a = this.state, rows = _a.rows, cols = _a.cols;
            return "Create a " + (rows > -1 ? rows + 1 : '') + " " + (cols > -1 ? 'x' : '') + " " + (cols > -1 ? cols + 1 : '') + " table";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupTableGridComponent.prototype, "cells", {
        get: function () {
            return Array.from(Array(this.rows * this.cols).keys());
        },
        enumerable: true,
        configurable: true
    });
    PopupTableGridComponent.prototype.selected = function (index) {
        var _a = this.state, rows = _a.rows, cols = _a.cols;
        var cellRow = Math.floor(index / this.cols);
        var cellCol = index % this.cols;
        return cellRow <= rows && cellCol <= cols;
    };
    PopupTableGridComponent.prototype.setState = function (index) {
        var rows = Math.floor(index / this.cols);
        var cols = index % this.cols;
        this.state = { rows: rows, cols: cols };
    };
    PopupTableGridComponent.prototype.resetState = function () {
        this.state = { rows: -1, cols: -1 };
    };
    PopupTableGridComponent.prototype.insertTable = function () {
        this.cellClick.emit(this.state);
    };
    PopupTableGridComponent.prototype.openTableWizard = function () {
        this.tableWizardClick.emit();
    };
    PopupTableGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-popup-table-grid',
                    template: "\n        <div style=\"border-color: inherit;\" (mouseleave)=\"resetState()\" (click)=\"insertTable()\">\n            <span *ngFor=\"let i of cells\"\n                class=\"k-ct-cell\"\n                [class.k-state-selected]=\"selected(i)\"\n                [class.k-state-disabled]=\"!selected(i)\"\n                (mouseenter)=\"setState(i)\">\n            </span>\n        </div>\n        <div class=\"k-status\" unselectable=\"on\">{{ message }}</div>\n        <!-- uncomment when TableWizard is completed\n        <div class=\"k-editor-toolbar\" unselectable=\"on\">\n            <button type=\"button\" kendoButton class=\"k-tool\" [icon]=\"'table-wizard'\" (click)=\"openTableWizard()\" title=\"Table Wizard\">Table Wizard</button>\n        </div>\n        -->\n    "
                },] },
    ];
    PopupTableGridComponent.propDecorators = {
        cellClick: [{ type: Output }],
        tableWizardClick: [{ type: Output }]
    };
    return PopupTableGridComponent;
}());

/**
 * @hidden
 */
var commandIcons = {
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
var EditorCommandBase = /** @class */ (function () {
    function EditorCommandBase(command, button, editor, localization) {
        this.command = command;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    EditorCommandBase.prototype.ngOnInit = function () {
        var _this = this;
        this.subs = this.editor.stateChange.subscribe(this.onStateChange.bind(this));
        this.subs.add(this.button.click.subscribe((this.clickHandler.bind(this))));
        Promise.resolve(null).then(function () {
            var text = _this.localization.get(_this.command);
            if (text) {
                _this.button.showText = "overflow";
                _this.button.showIcon = "both";
                _this.button.text = text;
            }
            if (!_this.button.icon) {
                _this.button.icon = commandIcons[_this.command];
            }
            _this.button.title = text;
        });
    };
    EditorCommandBase.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    // tslint:disable-next-line
    EditorCommandBase.prototype.clickHandler = function () { };
    // tslint:disable-next-line
    EditorCommandBase.prototype.onStateChange = function (_toolBarState) { };
    return EditorCommandBase;
}());

/**
 * @hidden
 */
var EditorCommandButton = /** @class */ (function (_super) {
    __extends(EditorCommandButton, _super);
    function EditorCommandButton(command, button, editor, localization) {
        var _this = _super.call(this, command, button, editor, localization) || this;
        _this.command = command;
        _this.button = button;
        _this.editor = editor;
        _this.localization = localization;
        return _this;
    }
    EditorCommandButton.prototype.clickHandler = function () {
        this.editor.exec(this.command);
        this.editor.focus();
    };
    EditorCommandButton.prototype.onStateChange = function (toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    };
    return EditorCommandButton;
}(EditorCommandBase));

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
var EditorAlignLeftButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAlignLeftButtonDirective, _super);
    function EditorAlignLeftButtonDirective(button, editor, localization) {
        return _super.call(this, 'alignLeft', button, editor, localization) || this;
    }
    EditorAlignLeftButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAlignLeftButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAlignLeftButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAlignLeftButtonDirective;
}(EditorCommandButton));

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
var EditorAlignCenterButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAlignCenterButtonDirective, _super);
    function EditorAlignCenterButtonDirective(button, editor, localization) {
        return _super.call(this, 'alignCenter', button, editor, localization) || this;
    }
    EditorAlignCenterButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAlignCenterButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAlignCenterButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAlignCenterButtonDirective;
}(EditorCommandButton));

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
var EditorAlignRightButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAlignRightButtonDirective, _super);
    function EditorAlignRightButtonDirective(button, editor, localization) {
        return _super.call(this, 'alignRight', button, editor, localization) || this;
    }
    EditorAlignRightButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAlignRightButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAlignRightButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAlignRightButtonDirective;
}(EditorCommandButton));

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
var EditorAlignJustifyButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAlignJustifyButtonDirective, _super);
    function EditorAlignJustifyButtonDirective(button, editor, localization) {
        return _super.call(this, 'alignJustify', button, editor, localization) || this;
    }
    EditorAlignJustifyButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAlignJustifyButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAlignJustifyButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAlignJustifyButtonDirective;
}(EditorCommandButton));

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
var EditorRedoButtonDirective = /** @class */ (function (_super) {
    __extends(EditorRedoButtonDirective, _super);
    function EditorRedoButtonDirective(button, editor, localization) {
        return _super.call(this, 'redo', button, editor, localization) || this;
    }
    EditorRedoButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorRedoButton]'
                },] },
    ];
    /** @nocollapse */
    EditorRedoButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorRedoButtonDirective;
}(EditorCommandButton));

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
var EditorUndoButtonDirective = /** @class */ (function (_super) {
    __extends(EditorUndoButtonDirective, _super);
    function EditorUndoButtonDirective(button, editor, localization) {
        return _super.call(this, 'undo', button, editor, localization) || this;
    }
    EditorUndoButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorUndoButton]'
                },] },
    ];
    /** @nocollapse */
    EditorUndoButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorUndoButtonDirective;
}(EditorCommandButton));

/**
 * @hidden
 */
var EditorCommandDialog = /** @class */ (function (_super) {
    __extends(EditorCommandDialog, _super);
    function EditorCommandDialog(dialog, button, editor, localization) {
        var _this = _super.call(this, dialog, button, editor, localization) || this;
        _this.dialog = dialog;
        _this.button = button;
        _this.editor = editor;
        _this.localization = localization;
        return _this;
    }
    EditorCommandDialog.prototype.clickHandler = function () {
        this.editor.openDialog(this.dialog);
    };
    EditorCommandDialog.prototype.onStateChange = function (toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    };
    return EditorCommandDialog;
}(EditorCommandBase));

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
var EditorInsertImageButtonDirective = /** @class */ (function (_super) {
    __extends(EditorInsertImageButtonDirective, _super);
    function EditorInsertImageButtonDirective(button, editor, localization) {
        return _super.call(this, 'insertImage', button, editor, localization) || this;
    }
    EditorInsertImageButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorInsertImageButton]'
                },] },
    ];
    /** @nocollapse */
    EditorInsertImageButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorInsertImageButtonDirective;
}(EditorCommandDialog));

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
var EditorIndentButtonDirective = /** @class */ (function (_super) {
    __extends(EditorIndentButtonDirective, _super);
    function EditorIndentButtonDirective(button, editor, localization) {
        return _super.call(this, 'indent', button, editor, localization) || this;
    }
    EditorIndentButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorIndentButton]'
                },] },
    ];
    /** @nocollapse */
    EditorIndentButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorIndentButtonDirective;
}(EditorCommandButton));

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
var EditorOutdentButtonDirective = /** @class */ (function (_super) {
    __extends(EditorOutdentButtonDirective, _super);
    function EditorOutdentButtonDirective(button, editor, localization) {
        return _super.call(this, 'outdent', button, editor, localization) || this;
    }
    EditorOutdentButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorOutdentButton]'
                },] },
    ];
    /** @nocollapse */
    EditorOutdentButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorOutdentButtonDirective;
}(EditorCommandButton));

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
var EditorCreateLinkButtonDirective = /** @class */ (function (_super) {
    __extends(EditorCreateLinkButtonDirective, _super);
    function EditorCreateLinkButtonDirective(button, editor, localization) {
        return _super.call(this, 'createLink', button, editor, localization) || this;
    }
    EditorCreateLinkButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorCreateLinkButton]'
                },] },
    ];
    /** @nocollapse */
    EditorCreateLinkButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorCreateLinkButtonDirective;
}(EditorCommandDialog));

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
var EditorUnlinkButtonDirective = /** @class */ (function (_super) {
    __extends(EditorUnlinkButtonDirective, _super);
    function EditorUnlinkButtonDirective(button, editor, localization) {
        return _super.call(this, 'unlink', button, editor, localization) || this;
    }
    EditorUnlinkButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorUnlinkButton]'
                },] },
    ];
    /** @nocollapse */
    EditorUnlinkButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorUnlinkButtonDirective;
}(EditorCommandButton));

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
var EditorInsertOrderedListButtonDirective = /** @class */ (function (_super) {
    __extends(EditorInsertOrderedListButtonDirective, _super);
    function EditorInsertOrderedListButtonDirective(button, editor, localization) {
        return _super.call(this, 'insertOrderedList', button, editor, localization) || this;
    }
    EditorInsertOrderedListButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorInsertOrderedListButton]'
                },] },
    ];
    /** @nocollapse */
    EditorInsertOrderedListButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorInsertOrderedListButtonDirective;
}(EditorCommandButton));

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
var EditorInsertUnorderedListButtonDirective = /** @class */ (function (_super) {
    __extends(EditorInsertUnorderedListButtonDirective, _super);
    function EditorInsertUnorderedListButtonDirective(button, editor, localization) {
        return _super.call(this, 'insertUnorderedList', button, editor, localization) || this;
    }
    EditorInsertUnorderedListButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorInsertUnorderedListButton]'
                },] },
    ];
    /** @nocollapse */
    EditorInsertUnorderedListButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorInsertUnorderedListButtonDirective;
}(EditorCommandButton));

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
var EditorViewSourceButtonDirective = /** @class */ (function (_super) {
    __extends(EditorViewSourceButtonDirective, _super);
    function EditorViewSourceButtonDirective(button, editor, localization) {
        return _super.call(this, 'viewSource', button, editor, localization) || this;
    }
    EditorViewSourceButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorViewSourceButton]'
                },] },
    ];
    /** @nocollapse */
    EditorViewSourceButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorViewSourceButtonDirective;
}(EditorCommandDialog));

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
var EditorBoldButtonDirective = /** @class */ (function (_super) {
    __extends(EditorBoldButtonDirective, _super);
    function EditorBoldButtonDirective(button, editor, localization) {
        return _super.call(this, 'bold', button, editor, localization) || this;
    }
    EditorBoldButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorBoldButton]'
                },] },
    ];
    /** @nocollapse */
    EditorBoldButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorBoldButtonDirective;
}(EditorCommandButton));

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
var EditorItalicButtonDirective = /** @class */ (function (_super) {
    __extends(EditorItalicButtonDirective, _super);
    function EditorItalicButtonDirective(button, editor, localization) {
        return _super.call(this, 'italic', button, editor, localization) || this;
    }
    EditorItalicButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorItalicButton]'
                },] },
    ];
    /** @nocollapse */
    EditorItalicButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorItalicButtonDirective;
}(EditorCommandButton));

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
var EditorUnderlineButtonDirective = /** @class */ (function (_super) {
    __extends(EditorUnderlineButtonDirective, _super);
    function EditorUnderlineButtonDirective(button, editor, localization) {
        return _super.call(this, 'underline', button, editor, localization) || this;
    }
    EditorUnderlineButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorUnderlineButton]'
                },] },
    ];
    /** @nocollapse */
    EditorUnderlineButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorUnderlineButtonDirective;
}(EditorCommandButton));

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
var EditorStrikethroughButtonDirective = /** @class */ (function (_super) {
    __extends(EditorStrikethroughButtonDirective, _super);
    function EditorStrikethroughButtonDirective(button, editor, localization) {
        return _super.call(this, 'strikethrough', button, editor, localization) || this;
    }
    EditorStrikethroughButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorStrikethroughButton]'
                },] },
    ];
    /** @nocollapse */
    EditorStrikethroughButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorStrikethroughButtonDirective;
}(EditorCommandButton));

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
var EditorSubscriptButtonDirective = /** @class */ (function (_super) {
    __extends(EditorSubscriptButtonDirective, _super);
    function EditorSubscriptButtonDirective(button, editor, localization) {
        return _super.call(this, 'subscript', button, editor, localization) || this;
    }
    EditorSubscriptButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorSubscriptButton]'
                },] },
    ];
    /** @nocollapse */
    EditorSubscriptButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorSubscriptButtonDirective;
}(EditorCommandButton));

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
var EditorSuperscriptButtonDirective = /** @class */ (function (_super) {
    __extends(EditorSuperscriptButtonDirective, _super);
    function EditorSuperscriptButtonDirective(button, editor, localization) {
        return _super.call(this, 'superscript', button, editor, localization) || this;
    }
    EditorSuperscriptButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorSuperscriptButton]'
                },] },
    ];
    /** @nocollapse */
    EditorSuperscriptButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorSuperscriptButtonDirective;
}(EditorCommandButton));

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
var EditorInsertFileButtonDirective = /** @class */ (function (_super) {
    __extends(EditorInsertFileButtonDirective, _super);
    function EditorInsertFileButtonDirective(button, editor, localization) {
        return _super.call(this, 'insertFile', button, editor, localization) || this;
    }
    EditorInsertFileButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorInsertFileButton]'
                },] },
    ];
    /** @nocollapse */
    EditorInsertFileButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorInsertFileButtonDirective;
}(EditorCommandDialog));

/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the foreground color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
var EditorForeColorDirective = /** @class */ (function () {
    function EditorForeColorDirective(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.foreColor;
        this.colorPicker.editorCommand = 'foreColor';
    }
    EditorForeColorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoEditorForeColor]'
                },] },
    ];
    /** @nocollapse */
    EditorForeColorDirective.ctorParameters = function () { return [
        { type: EditorColorPickerComponent }
    ]; };
    return EditorForeColorDirective;
}());

/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the background color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
var EditorBackColorDirective = /** @class */ (function () {
    function EditorBackColorDirective(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.backColor;
        this.colorPicker.editorCommand = 'backColor';
    }
    EditorBackColorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoEditorBackColor]'
                },] },
    ];
    /** @nocollapse */
    EditorBackColorDirective.ctorParameters = function () { return [
        { type: EditorColorPickerComponent }
    ]; };
    return EditorBackColorDirective;
}());

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
var EditorCleanFormattingButtonDirective = /** @class */ (function (_super) {
    __extends(EditorCleanFormattingButtonDirective, _super);
    function EditorCleanFormattingButtonDirective(button, editor, localization) {
        return _super.call(this, 'cleanFormatting', button, editor, localization) || this;
    }
    EditorCleanFormattingButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorCleanFormattingButton]'
                },] },
    ];
    /** @nocollapse */
    EditorCleanFormattingButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorCleanFormattingButtonDirective;
}(EditorCommandButton));

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
var EditorAddColumnBeforeButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAddColumnBeforeButtonDirective, _super);
    function EditorAddColumnBeforeButtonDirective(button, editor, localization) {
        return _super.call(this, 'addColumnBefore', button, editor, localization) || this;
    }
    EditorAddColumnBeforeButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAddColumnBeforeButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAddColumnBeforeButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAddColumnBeforeButtonDirective;
}(EditorCommandButton));

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
var EditorAddColumnAfterButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAddColumnAfterButtonDirective, _super);
    function EditorAddColumnAfterButtonDirective(button, editor, localization) {
        return _super.call(this, 'addColumnAfter', button, editor, localization) || this;
    }
    EditorAddColumnAfterButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAddColumnAfterButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAddColumnAfterButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAddColumnAfterButtonDirective;
}(EditorCommandButton));

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
var EditorAddRowBeforeButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAddRowBeforeButtonDirective, _super);
    function EditorAddRowBeforeButtonDirective(button, editor, localization) {
        return _super.call(this, 'addRowBefore', button, editor, localization) || this;
    }
    EditorAddRowBeforeButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAddRowBeforeButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAddRowBeforeButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAddRowBeforeButtonDirective;
}(EditorCommandButton));

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
var EditorAddRowAfterButtonDirective = /** @class */ (function (_super) {
    __extends(EditorAddRowAfterButtonDirective, _super);
    function EditorAddRowAfterButtonDirective(button, editor, localization) {
        return _super.call(this, 'addRowAfter', button, editor, localization) || this;
    }
    EditorAddRowAfterButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAddRowAfterButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAddRowAfterButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAddRowAfterButtonDirective;
}(EditorCommandButton));

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
var EditorDeleteColumnButtonDirective = /** @class */ (function (_super) {
    __extends(EditorDeleteColumnButtonDirective, _super);
    function EditorDeleteColumnButtonDirective(button, editor, localization) {
        return _super.call(this, 'deleteColumn', button, editor, localization) || this;
    }
    EditorDeleteColumnButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorDeleteColumnButton]'
                },] },
    ];
    /** @nocollapse */
    EditorDeleteColumnButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorDeleteColumnButtonDirective;
}(EditorCommandButton));

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
var EditorDeleteRowButtonDirective = /** @class */ (function (_super) {
    __extends(EditorDeleteRowButtonDirective, _super);
    function EditorDeleteRowButtonDirective(button, editor, localization) {
        return _super.call(this, 'deleteRow', button, editor, localization) || this;
    }
    EditorDeleteRowButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorDeleteRowButton]'
                },] },
    ];
    /** @nocollapse */
    EditorDeleteRowButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorDeleteRowButtonDirective;
}(EditorCommandButton));

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
var EditorDeleteTableButtonDirective = /** @class */ (function (_super) {
    __extends(EditorDeleteTableButtonDirective, _super);
    function EditorDeleteTableButtonDirective(button, editor, localization) {
        return _super.call(this, 'deleteTable', button, editor, localization) || this;
    }
    EditorDeleteTableButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorDeleteTableButton]'
                },] },
    ];
    /** @nocollapse */
    EditorDeleteTableButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorDeleteTableButtonDirective;
}(EditorCommandButton));

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
var EditorMergeCellsButtonDirective = /** @class */ (function (_super) {
    __extends(EditorMergeCellsButtonDirective, _super);
    function EditorMergeCellsButtonDirective(button, editor, localization) {
        return _super.call(this, 'mergeCells', button, editor, localization) || this;
    }
    EditorMergeCellsButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorMergeCellsButton]'
                },] },
    ];
    /** @nocollapse */
    EditorMergeCellsButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorMergeCellsButtonDirective;
}(EditorCommandButton));

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
var EditorSplitCellButtonDirective = /** @class */ (function (_super) {
    __extends(EditorSplitCellButtonDirective, _super);
    function EditorSplitCellButtonDirective(button, editor, localization) {
        return _super.call(this, 'splitCell', button, editor, localization) || this;
    }
    EditorSplitCellButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorSplitCellButton]'
                },] },
    ];
    /** @nocollapse */
    EditorSplitCellButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorSplitCellButtonDirective;
}(EditorCommandButton));

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: '[kendoEditorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_editor %}#toc-localization)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-editor-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

var COMPONENT_DIRECTIVES = [
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
var TOOLBAR_TOOLS = [
    EditorFontSizeComponent,
    EditorFontFamilyComponent,
    EditorFormatComponent,
    EditorColorPickerComponent,
    EditorInsertTableButtonComponent
];
var TOOLBAR_DIALOGS = [
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
var INTERNAL_COMPONENTS = [
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
var EditorModule = /** @class */ (function () {
    function EditorModule() {
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
    return EditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ColorPickerDialogComponent, FileLinkDialogComponent, FontFamilyDialogComponent, FontSizeDialogComponent, FormatDialogComponent, ImageDialogComponent, InsertTableDialogComponent, SourceDialogComponent, CustomMessagesComponent, EditorLocalizationService, LocalizedMessagesDirective, Messages, EditorAlignCenterButtonDirective, EditorAlignJustifyButtonDirective, EditorAlignLeftButtonDirective, EditorAlignRightButtonDirective, EditorBackColorDirective, EditorColorPickerComponent, EditorForeColorDirective, EditorCleanFormattingButtonDirective, FontFamilyDropDownListComponent, EditorFontFamilyComponent, FontSizeDropDownListComponent, EditorFontSizeComponent, FormatDropDownListComponent, EditorFormatComponent, EditorRedoButtonDirective, EditorUndoButtonDirective, EditorInsertImageButtonDirective, EditorIndentButtonDirective, EditorOutdentButtonDirective, EditorCreateLinkButtonDirective, EditorInsertFileButtonDirective, EditorUnlinkButtonDirective, EditorInsertOrderedListButtonDirective, EditorInsertUnorderedListButtonDirective, EditorCommandBase, EditorCommandButton, EditorCommandDialog, EditorViewSourceButtonDirective, EditorAddColumnAfterButtonDirective, EditorAddColumnBeforeButtonDirective, EditorAddRowAfterButtonDirective, EditorAddRowBeforeButtonDirective, EditorDeleteColumnButtonDirective, EditorDeleteRowButtonDirective, EditorDeleteTableButtonDirective, EditorInsertTableButtonComponent, EditorMergeCellsButtonDirective, EditorSplitCellButtonDirective, PopupTableGridComponent, EditorBoldButtonDirective, EditorItalicButtonDirective, EditorStrikethroughButtonDirective, EditorSubscriptButtonDirective, EditorSuperscriptButtonDirective, EditorUnderlineButtonDirective, EditorComponent, EditorModule };
