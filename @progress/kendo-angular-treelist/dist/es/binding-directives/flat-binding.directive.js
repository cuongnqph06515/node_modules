/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { getter, setter } from '@progress/kendo-common';
import { BaseBindingDirective } from './base-binding.directive';
import { FlatEditService } from '../editing-directives/flat-edit.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { isPresent } from '../utils';
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
        _this.idGetter = getter('id');
        _this.idSetter = setter('id');
        _this.parentIdGetter = getter('parentId');
        _this.parentIdSetter = setter('parentId');
        treelist.localEditService = new FlatEditService(_this, localDataChanges);
        return _this;
    }
    Object.defineProperty(FlatBindingDirective.prototype, "parentIdField", {
        /**
         * The name of the field which contains the identifier of the parent node.
         */
        set: function (value) {
            this.parentIdGetter = getter(value);
            this.parentIdSetter = setter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatBindingDirective.prototype, "idField", {
        /**
         * The name of the field which contains the unique identifier of the node.
         */
        set: function (value) {
            this.idGetter = getter(value);
            this.idSetter = setter(value);
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
            this.originalData.filter(function (o) { return !isPresent(_this.parentIdGetter(o)); }) :
            this.originalData.filter(function (o) { return _this.parentIdGetter(o) === id; });
        return children;
    };
    FlatBindingDirective.prototype.itemKey = function (item) {
        return item ? this.idGetter(item) : ROOT_ID;
    };
    FlatBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListFlatBinding]'
                },] },
    ];
    /** @nocollapse */
    FlatBindingDirective.ctorParameters = function () { return [
        { type: TreeListComponent },
        { type: LocalDataChangesService }
    ]; };
    FlatBindingDirective.propDecorators = {
        parentIdField: [{ type: Input }],
        idField: [{ type: Input }],
        data: [{ type: Input, args: ["kendoTreeListFlatBinding",] }]
    };
    return FlatBindingDirective;
}(BaseBindingDirective));
export { FlatBindingDirective };
