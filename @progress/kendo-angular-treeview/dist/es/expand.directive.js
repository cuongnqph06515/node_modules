import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';
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
        this.expandedKeysChange = new EventEmitter();
        this.subscriptions = new Subscription(function () { });
        this._expandedKeys = [];
        this.subscriptions.add(merge(this.treeView.expand.pipe(map(function (e) { return (tslib_1.__assign({ expand: true }, e)); })), this.treeView.collapse.pipe(map(function (e) { return (tslib_1.__assign({ expand: false }, e)); }))).subscribe(this.toggleExpand.bind(this)));
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
        { type: Directive, args: [{ selector: '[kendoTreeViewExpandable]' },] },
    ];
    /** @nocollapse */
    ExpandDirective.ctorParameters = function () { return [
        { type: TreeViewComponent }
    ]; };
    ExpandDirective.propDecorators = {
        isExpanded: [{ type: Input }],
        expandKey: [{ type: Input, args: ["expandBy",] }],
        expandedKeysChange: [{ type: Output }],
        expandedKeys: [{ type: Input }]
    };
    return ExpandDirective;
}());
export { ExpandDirective };
