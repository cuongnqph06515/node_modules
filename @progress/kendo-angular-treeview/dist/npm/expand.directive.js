"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var treeview_component_1 = require("./treeview.component");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * A directive which manages the expanded state of the TreeView
 * ([see example]({% slug expandedstate_treeview %})).
 */
var ExpandDirective = /** @class */ (function () {
    function ExpandDirective(treeView) {
        var _this = this;
        this.treeView = treeView;
        /**
         * Fires when the `expandedKeys` collection was updated.
         */
        this.expandedKeysChange = new core_1.EventEmitter();
        this.subscriptions = new rxjs_1.Subscription(function () { });
        this._expandedKeys = [];
        this.subscriptions.add(rxjs_1.merge(this.treeView.expand.pipe(operators_1.map(function (e) { return (tslib_1.__assign({ expand: true }, e)); })), this.treeView.collapse.pipe(operators_1.map(function (e) { return (tslib_1.__assign({ expand: false }, e)); }))).subscribe(this.toggleExpand.bind(this)));
        this.treeView.isExpanded = function (dataItem, index) {
            return _this.expandedKeys.indexOf(_this.itemKey({ dataItem: dataItem, index: index })) > -1;
        };
    }
    Object.defineProperty(ExpandDirective.prototype, "isExpanded", {
        /**
         * @hidden
         */
        set: function (value) {
            this.treeView.isExpanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandDirective.prototype, "expandedKeys", {
        /**
         * Defines the collection that will store the expanded keys.
         */
        get: function () {
            return this._expandedKeys;
        },
        set: function (keys) {
            this._expandedKeys = keys;
        },
        enumerable: true,
        configurable: true
    });
    ExpandDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    ExpandDirective.prototype.itemKey = function (e) {
        if (this.expandKey) {
            if (typeof this.expandKey === "string") {
                return e.dataItem[this.expandKey];
            }
            if (typeof this.expandKey === "function") {
                return this.expandKey(e);
            }
        }
        return e.index;
    };
    ExpandDirective.prototype.toggleExpand = function (_a) {
        var index = _a.index, dataItem = _a.dataItem, expand = _a.expand;
        var item = this.itemKey({ index: index, dataItem: dataItem });
        var idx = this.expandedKeys.indexOf(item);
        var notify = false;
        if (idx > -1 && !expand) {
            this.expandedKeys.splice(idx, 1);
            notify = true;
        }
        else if (idx === -1 && expand) {
            this.expandedKeys.push(item);
            notify = true;
        }
        if (notify) {
            this.expandedKeysChange.emit(this.expandedKeys);
        }
    };
    ExpandDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewExpandable]' },] },
    ];
    /** @nocollapse */
    ExpandDirective.ctorParameters = function () { return [
        { type: treeview_component_1.TreeViewComponent }
    ]; };
    ExpandDirective.propDecorators = {
        isExpanded: [{ type: core_1.Input }],
        expandKey: [{ type: core_1.Input, args: ["expandBy",] }],
        expandedKeysChange: [{ type: core_1.Output }],
        expandedKeys: [{ type: core_1.Input }]
    };
    return ExpandDirective;
}());
exports.ExpandDirective = ExpandDirective;
