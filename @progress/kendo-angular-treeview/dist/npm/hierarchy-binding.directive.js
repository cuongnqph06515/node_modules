"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var treeview_component_1 = require("./treeview.component");
var accessor_1 = require("./accessor");
var utils_1 = require("./utils");
var rxjs_1 = require("rxjs");
/**
 * A directive which encapsulates the retrieval of child nodes.
 */
var HierarchyBindingDirective = /** @class */ (function () {
    function HierarchyBindingDirective(treeView) {
        this.treeView = treeView;
    }
    Object.defineProperty(HierarchyBindingDirective.prototype, "childrenField", {
        /**
         * The field name which holds the data items of the child component.
         */
        get: function () {
            return this._childrenField;
        },
        /**
         * The field name which holds the data items of the child component.
         */
        set: function (value) {
            if (!value) {
                throw new Error("'childrenField' cannot be empty");
            }
            this._childrenField = value;
        },
        enumerable: true,
        configurable: true
    });
    HierarchyBindingDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (utils_1.isPresent(this.childrenField)) {
            this.treeView.children = function (item) { return rxjs_1.of(accessor_1.getter(_this.childrenField, true)(item)); };
            this.treeView.hasChildren = function (item) {
                var children = accessor_1.getter(_this.childrenField, true)(item);
                return Boolean(children && children.length);
            };
        }
    };
    HierarchyBindingDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewHierarchyBinding]' },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: treeview_component_1.TreeViewComponent }
    ]; };
    HierarchyBindingDirective.propDecorators = {
        childrenField: [{ type: core_1.Input }]
    };
    return HierarchyBindingDirective;
}());
exports.HierarchyBindingDirective = HierarchyBindingDirective;
