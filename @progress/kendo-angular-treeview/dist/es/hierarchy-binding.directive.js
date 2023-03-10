import { Directive, Input } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { getter } from './accessor';
import { isPresent } from './utils';
import { of } from 'rxjs';
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
        if (isPresent(this.childrenField)) {
            this.treeView.children = function (item) { return of(getter(_this.childrenField, true)(item)); };
            this.treeView.hasChildren = function (item) {
                var children = getter(_this.childrenField, true)(item);
                return Boolean(children && children.length);
            };
        }
    };
    HierarchyBindingDirective.decorators = [
        { type: Directive, args: [{ selector: '[kendoTreeViewHierarchyBinding]' },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: TreeViewComponent }
    ]; };
    HierarchyBindingDirective.propDecorators = {
        childrenField: [{ type: Input }]
    };
    return HierarchyBindingDirective;
}());
export { HierarchyBindingDirective };
