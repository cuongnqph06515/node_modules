"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var rxjs_1 = require("rxjs");
var accessor_1 = require("./accessor");
var funcs_1 = require("./funcs");
var treeview_component_1 = require("./treeview.component");
var utils_1 = require("./utils");
var findChildren = function (prop, nodes, value) { return nodes.filter(function (x) { return prop(x) === value; }); };
var ɵ0 = findChildren;
exports.ɵ0 = ɵ0;
/**
 * A directive which encapsulates the retrieval of the child nodes.
 */
var FlatDataBindingDirective = /** @class */ (function () {
    function FlatDataBindingDirective(treeView) {
        this.treeView = treeView;
        this.originalData = [];
    }
    Object.defineProperty(FlatDataBindingDirective.prototype, "nodes", {
        /**
         * The nodes which will be displayed by the TreeView.
         */
        set: function (values) {
            this.originalData = values || [];
            if (!utils_1.isNullOrEmptyString(this.parentIdField)) {
                var prop = accessor_1.getter(this.parentIdField, true);
                this.treeView.nodes = (this.originalData).filter(funcs_1.compose(utils_1.isBlank, prop));
            }
            else {
                this.treeView.nodes = this.originalData.slice(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FlatDataBindingDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (utils_1.isPresent(this.parentIdField) && utils_1.isPresent(this.idField)) {
            var fetchChildren_1 = function (node) {
                return findChildren(accessor_1.getter(_this.parentIdField, true), _this.originalData || [], accessor_1.getter(_this.idField, true)(node));
            };
            this.treeView.hasChildren = function (node) { return fetchChildren_1(node).length > 0; };
            this.treeView.children = function (node) { return rxjs_1.of(fetchChildren_1(node)); };
        }
    };
    /**
     * @hidden
     */
    FlatDataBindingDirective.prototype.ngOnChanges = function (changes) {
        if (kendo_angular_common_1.isChanged("parentIdField", changes, false)) {
            this.nodes = this.originalData;
        }
    };
    FlatDataBindingDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewFlatDataBinding]' },] },
    ];
    /** @nocollapse */
    FlatDataBindingDirective.ctorParameters = function () { return [
        { type: treeview_component_1.TreeViewComponent }
    ]; };
    FlatDataBindingDirective.propDecorators = {
        nodes: [{ type: core_1.Input }],
        parentIdField: [{ type: core_1.Input }],
        idField: [{ type: core_1.Input }]
    };
    return FlatDataBindingDirective;
}());
exports.FlatDataBindingDirective = FlatDataBindingDirective;
