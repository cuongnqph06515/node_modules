import { Directive, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { isPresent, noop } from './utils';
import { Subscription } from 'rxjs';
import { filter, take, switchMap, map } from 'rxjs/operators';
var indexChecked = function (keys, index) { return keys.filter(function (k) { return k === index; }).length > 0; };
var ɵ0 = indexChecked;
var matchKey = function (index) { return function (k) {
    if (index === k) {
        return true;
    }
    if (!k.split) {
        return false;
    }
    return k.split('_').reduce(function (_a, part) {
        var key = _a.key, result = _a.result;
        key += part;
        if (index === key || result) {
            return { result: true };
        }
        key += "_";
        return { key: key, result: false };
    }, { key: "", result: false }).result;
}; };
var ɵ1 = matchKey;
/**
 * A directive which manages the in-memory checked state of the TreeView node
 * ([see example]({% slug checkboxes_treeview %})).
 */
var CheckDirective = /** @class */ (function () {
    function CheckDirective(treeView, zone) {
        var _this = this;
        this.treeView = treeView;
        this.zone = zone;
        /**
         * Fires when the `checkedKeys` collection was updated.
         */
        this.checkedKeysChange = new EventEmitter();
        this.subscriptions = new Subscription(function () { });
        this.checkActions = {
            'multiple': function (e) { return _this.checkMultiple(e); },
            'single': function (e) { return _this.checkSingle(e); }
        };
        this._checkedKeys = [];
        this.subscriptions.add(this.treeView.checkedChange
            .subscribe(function (e) { return _this.check(e); }));
        this.subscriptions.add(this.treeView.childrenLoaded
            .pipe(filter(function () { return _this.options.checkChildren; }), switchMap(function (e) { return _this.zone.onStable.pipe(take(1), map(function () { return e; })); }))
            .subscribe(function (e) { return _this.addChildrenKeys(e); }));
        this.treeView.isChecked = this.isItemChecked.bind(this);
    }
    Object.defineProperty(CheckDirective.prototype, "isChecked", {
        /**
         * @hidden
         */
        set: function (value) {
            this.treeView.isChecked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckDirective.prototype, "checkedKeys", {
        /**
         * Defines the collection that will store the checked keys
         * ([see example]({% slug checkboxes_treeview %})).
         */
        get: function () {
            return this._checkedKeys;
        },
        set: function (keys) {
            this._checkedKeys = keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckDirective.prototype, "options", {
        get: function () {
            var defaultOptions = {
                checkChildren: true,
                checkParents: true,
                enabled: true,
                mode: "multiple"
            };
            if (!isPresent(this.checkable)) {
                return defaultOptions;
            }
            var isBoolean = typeof this.checkable === 'boolean';
            var checkSettings = isBoolean
                ? { enabled: this.checkable }
                : this.checkable;
            return Object.assign(defaultOptions, checkSettings);
        },
        enumerable: true,
        configurable: true
    });
    CheckDirective.prototype.ngOnChanges = function (changes) {
        if (changes.checkable) {
            this.treeView.checkboxes = this.options.enabled;
            this.toggleCheckOnClick();
        }
    };
    CheckDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        this.unsubscribeClick();
    };
    CheckDirective.prototype.isItemChecked = function (dataItem, index) {
        if (!this.checkKey) {
            return this.isIndexChecked(index);
        }
        var keyIndex = this.checkedKeys.indexOf(this.itemKey({ dataItem: dataItem, index: index }));
        return keyIndex > -1 ? 'checked' : 'none';
    };
    CheckDirective.prototype.isIndexChecked = function (index) {
        var checkedKeys = this.checkedKeys.filter(matchKey(index));
        if (indexChecked(checkedKeys, index)) {
            return 'checked';
        }
        var _a = this.options, mode = _a.mode, checkParents = _a.checkParents;
        if (mode === 'multiple' && checkParents && checkedKeys.length) {
            return 'indeterminate';
        }
        return 'none';
    };
    CheckDirective.prototype.itemKey = function (e) {
        if (!this.checkKey) {
            return e.index;
        }
        if (typeof this.checkKey === "string") {
            return e.dataItem[this.checkKey];
        }
        if (typeof this.checkKey === "function") {
            return this.checkKey(e);
        }
    };
    CheckDirective.prototype.check = function (e) {
        var _a = this.options, enabled = _a.enabled, mode = _a.mode;
        var performSelection = this.checkActions[mode] || noop;
        if (!enabled) {
            return;
        }
        performSelection(e);
    };
    CheckDirective.prototype.checkSingle = function (node) {
        var key = this.itemKey(node.item);
        this.checkedKeys = this.checkedKeys[0] !== key ? [key] : [];
        this.notify();
    };
    CheckDirective.prototype.checkMultiple = function (node) {
        this.checkNode(node);
        if (this.options.checkParents) {
            this.checkParents(node.parent);
        }
        this.notify();
    };
    CheckDirective.prototype.toggleCheckOnClick = function () {
        var _this = this;
        this.unsubscribeClick();
        if (this.options.checkOnClick) {
            this.clickSubscription = this.treeView.nodeClick.subscribe(function (args) {
                if (args.type === 'click') {
                    var lookup = _this.treeView.itemLookup(args.item.index);
                    _this.check(lookup);
                }
            });
        }
    };
    CheckDirective.prototype.unsubscribeClick = function () {
        if (this.clickSubscription) {
            this.clickSubscription.unsubscribe();
            this.clickSubscription = null;
        }
    };
    CheckDirective.prototype.checkNode = function (node, check) {
        var _this = this;
        var key = this.itemKey(node.item);
        var idx = this.checkedKeys.indexOf(key);
        var isChecked = idx > -1;
        var shouldCheck = check === undefined ? !isChecked : check;
        if (!isPresent(key) || (isChecked && check) || this.treeView.isDisabledNode(node)) {
            return;
        }
        if (isChecked) {
            this.checkedKeys.splice(idx, 1);
        }
        else {
            this.checkedKeys.push(key);
        }
        if (this.options.checkChildren) {
            node.children.map(function (n) { return _this.checkNode(n, shouldCheck); });
        }
    };
    CheckDirective.prototype.checkParents = function (parent) {
        var currentParent = parent;
        while (currentParent) {
            var parentKey = this.itemKey(currentParent.item);
            var parentIndex = this.checkedKeys.indexOf(parentKey);
            if (this.allChildrenSelected(currentParent.children)) {
                if (parentIndex === -1) {
                    this.checkedKeys.push(parentKey);
                }
            }
            else if (parentIndex > -1) {
                this.checkedKeys.splice(parentIndex, 1);
            }
            currentParent = currentParent.parent;
        }
    };
    CheckDirective.prototype.allChildrenSelected = function (children) {
        var _this = this;
        var isCheckedReducer = function (acc, item) { return (acc && _this.isItemChecked(item.dataItem, item.index) === 'checked'); };
        return children.reduce(isCheckedReducer, true);
    };
    CheckDirective.prototype.notify = function () {
        this.checkedKeysChange.emit(this.checkedKeys.slice());
    };
    CheckDirective.prototype.addChildrenKeys = function (args) {
        var _this = this;
        if (this.checkedKeys.indexOf(this.itemKey(args.item)) === -1) {
            return;
        }
        var keys = args.children.reduce(function (acc, item) {
            var itemKey = _this.itemKey(item);
            var existingKey = _this.checkedKeys.find(function (key) { return itemKey === key; });
            if (!existingKey) {
                acc.push(itemKey);
            }
            return acc;
        }, []);
        if (keys.length) {
            this.checkedKeys = this.checkedKeys.concat(keys);
            this.zone.run(function () {
                _this.notify();
            });
        }
    };
    CheckDirective.decorators = [
        { type: Directive, args: [{ selector: '[kendoTreeViewCheckable]' },] },
    ];
    /** @nocollapse */
    CheckDirective.ctorParameters = function () { return [
        { type: TreeViewComponent },
        { type: NgZone }
    ]; };
    CheckDirective.propDecorators = {
        isChecked: [{ type: Input }],
        checkKey: [{ type: Input, args: ["checkBy",] }],
        checkedKeys: [{ type: Input }],
        checkable: [{ type: Input, args: ['kendoTreeViewCheckable',] }],
        checkedKeysChange: [{ type: Output }]
    };
    return CheckDirective;
}());
export { CheckDirective };
export { ɵ0, ɵ1 };
