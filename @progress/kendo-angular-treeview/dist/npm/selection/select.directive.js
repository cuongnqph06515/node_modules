"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var treeview_component_1 = require("../treeview.component");
var utils_1 = require("../utils");
var rxjs_1 = require("rxjs");
/**
 * A directive which manages the in-memory selection state of the TreeView node
 * ([see example]({% slug selection_treeview %})).
 */
var SelectDirective = /** @class */ (function () {
    function SelectDirective(treeView) {
        var _this = this;
        this.treeView = treeView;
        /**
         * Fires when the `selectedKeys` collection was updated.
         */
        this.selectedKeysChange = new core_1.EventEmitter();
        this.subscriptions = new rxjs_1.Subscription(function () { });
        this.selectActions = {
            'multiple': function (e) { return _this.selectMultiple(e); },
            'single': function (e) { return _this.selectSingle(e); }
        };
        this._selectedKeys = [];
        this.subscriptions.add(this.treeView.selectionChange.subscribe(this.select.bind(this)));
        this.treeView.isSelected = function (dataItem, index) { return (_this.selectedKeys.indexOf(_this.itemKey({ dataItem: dataItem, index: index })) > -1); };
    }
    Object.defineProperty(SelectDirective.prototype, "isSelected", {
        /**
         * @hidden
         */
        set: function (value) {
            this.treeView.isSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDirective.prototype, "selectedKeys", {
        /**
         * Defines the collection that will store the selected keys
         * ([see example]({% slug selection_treeview %}#toc-selection-modes)).
         */
        get: function () {
            return this._selectedKeys;
        },
        set: function (keys) {
            this._selectedKeys = keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDirective.prototype, "getAriaMultiselectable", {
        get: function () {
            return this.options.mode === 'multiple';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDirective.prototype, "options", {
        get: function () {
            var defaultOptions = {
                enabled: true,
                mode: 'single'
            };
            if (!utils_1.isPresent(this.selection)) {
                return defaultOptions;
            }
            var isBoolean = typeof this.selection === 'boolean';
            var selectionSettings = isBoolean ? { enabled: this.selection } : this.selection;
            return Object.assign(defaultOptions, selectionSettings);
        },
        enumerable: true,
        configurable: true
    });
    SelectDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    SelectDirective.prototype.itemKey = function (e) {
        if (!this.selectKey) {
            return e.index;
        }
        if (typeof this.selectKey === 'string') {
            return e.dataItem[this.selectKey];
        }
        if (typeof this.selectKey === 'function') {
            return this.selectKey(e);
        }
    };
    SelectDirective.prototype.select = function (e) {
        var _a = this.options, enabled = _a.enabled, mode = _a.mode;
        var performSelection = this.selectActions[mode] || utils_1.noop;
        if (!enabled) {
            return;
        }
        performSelection(e);
    };
    SelectDirective.prototype.selectSingle = function (node) {
        var key = this.itemKey(node);
        if (this.selectedKeys[0] === key) {
            return;
        }
        this.selectedKeys = [key];
        this.notify();
    };
    SelectDirective.prototype.selectMultiple = function (node) {
        var key = this.itemKey(node);
        var idx = this.selectedKeys.indexOf(key);
        var isSelected = idx > -1;
        if (!utils_1.isPresent(key)) {
            return;
        }
        if (isSelected) {
            this.selectedKeys.splice(idx, 1);
        }
        else {
            this.selectedKeys.push(key);
        }
        this.notify();
    };
    SelectDirective.prototype.notify = function () {
        this.selectedKeysChange.emit(this.selectedKeys.slice());
    };
    SelectDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewSelectable]' },] },
    ];
    /** @nocollapse */
    SelectDirective.ctorParameters = function () { return [
        { type: treeview_component_1.TreeViewComponent }
    ]; };
    SelectDirective.propDecorators = {
        isSelected: [{ type: core_1.Input }],
        selectKey: [{ type: core_1.Input, args: ['selectBy',] }],
        selection: [{ type: core_1.Input, args: ['kendoTreeViewSelectable',] }],
        selectedKeys: [{ type: core_1.Input }],
        selectedKeysChange: [{ type: core_1.Output }],
        getAriaMultiselectable: [{ type: core_1.HostBinding, args: ['attr.aria-multiselectable',] }]
    };
    return SelectDirective;
}());
exports.SelectDirective = SelectDirective;
