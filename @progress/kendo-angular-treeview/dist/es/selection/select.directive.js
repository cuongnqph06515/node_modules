import { Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TreeViewComponent } from '../treeview.component';
import { isPresent, noop } from '../utils';
import { Subscription } from 'rxjs';
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
        this.selectedKeysChange = new EventEmitter();
        this.subscriptions = new Subscription(function () { });
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
            if (!isPresent(this.selection)) {
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
        var performSelection = this.selectActions[mode] || noop;
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
        if (!isPresent(key)) {
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
        { type: Directive, args: [{ selector: '[kendoTreeViewSelectable]' },] },
    ];
    /** @nocollapse */
    SelectDirective.ctorParameters = function () { return [
        { type: TreeViewComponent }
    ]; };
    SelectDirective.propDecorators = {
        isSelected: [{ type: Input }],
        selectKey: [{ type: Input, args: ['selectBy',] }],
        selection: [{ type: Input, args: ['kendoTreeViewSelectable',] }],
        selectedKeys: [{ type: Input }],
        selectedKeysChange: [{ type: Output }],
        getAriaMultiselectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }]
    };
    return SelectDirective;
}());
export { SelectDirective };
