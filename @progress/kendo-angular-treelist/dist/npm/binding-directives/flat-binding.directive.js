/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var treelist_component_1 = require("../treelist.component");
var kendo_common_1 = require("@progress/kendo-common");
var base_binding_directive_1 = require("./base-binding.directive");
var flat_edit_service_1 = require("../editing-directives/flat-edit.service");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
var utils_1 = require("../utils");
var ROOT_ID = null;
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
var FlatBindingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FlatBindingDirective, _super);
    function FlatBindingDirective(treelist, localDataChanges) {
        var _this = _super.call(this, treelist) || this;
        _this.treelist = treelist;
        _this.idGetter = kendo_common_1.getter('id');
        _this.idSetter = kendo_common_1.setter('id');
        _this.parentIdGetter = kendo_common_1.getter('parentId');
        _this.parentIdSetter = kendo_common_1.setter('parentId');
        treelist.localEditService = new flat_edit_service_1.FlatEditService(_this, localDataChanges);
        return _this;
    }
    Object.defineProperty(FlatBindingDirective.prototype, "parentIdField", {
        /**
         * The name of the field which contains the identifier of the parent node.
         */
        set: function (value) {
            this.parentIdGetter = kendo_common_1.getter(value);
            this.parentIdSetter = kendo_common_1.setter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatBindingDirective.prototype, "idField", {
        /**
         * The name of the field which contains the unique identifier of the node.
         */
        set: function (value) {
            this.idGetter = kendo_common_1.getter(value);
            this.idSetter = kendo_common_1.setter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatBindingDirective.prototype, "data", {
        /**
         * The array of data which will be used to populate the TreeList.
         */
        set: function (value) {
            this.originalData = value || [];
            this.dataChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    FlatBindingDirective.prototype.getChildren = function (item) {
        var _this = this;
        var id = this.itemKey(item);
        var children = id === ROOT_ID ?
            this.originalData.filter(function (o) { return !utils_1.isPresent(_this.parentIdGetter(o)); }) :
            this.originalData.filter(function (o) { return _this.parentIdGetter(o) === id; });
        return children;
    };
    FlatBindingDirective.prototype.itemKey = function (item) {
        return item ? this.idGetter(item) : ROOT_ID;
    };
    FlatBindingDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListFlatBinding]'
                },] },
    ];
    /** @nocollapse */
    FlatBindingDirective.ctorParameters = function () { return [
        { type: treelist_component_1.TreeListComponent },
        { type: local_data_changes_service_1.LocalDataChangesService }
    ]; };
    FlatBindingDirective.propDecorators = {
        parentIdField: [{ type: core_1.Input }],
        idField: [{ type: core_1.Input }],
        data: [{ type: core_1.Input, args: ["kendoTreeListFlatBinding",] }]
    };
    return FlatBindingDirective;
}(base_binding_directive_1.BaseBindingDirective));
exports.FlatBindingDirective = FlatBindingDirective;
