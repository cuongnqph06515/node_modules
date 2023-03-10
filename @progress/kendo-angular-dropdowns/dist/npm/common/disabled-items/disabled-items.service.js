/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("../util");
var data_service_1 = require("../data.service");
/**
 * @hidden
 */
var DisabledItemsService = /** @class */ (function () {
    function DisabledItemsService(dataService) {
        this.dataService = dataService;
        this.itemDisabled = null;
    }
    DisabledItemsService.prototype.isIndexDisabled = function (index) {
        if (this.itemDisabled) {
            var item = this.dataService.itemAt(index);
            if (util_1.isPresent(item)) {
                return this.itemDisabled({ dataItem: item, index: index });
            }
            else if (util_1.isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    };
    DisabledItemsService.prototype.isItemDisabled = function (item) {
        if (this.itemDisabled) {
            var index = this.dataService.indexOf(item);
            if (index !== -1) {
                return this.itemDisabled({ dataItem: item, index: index });
            }
            else if (util_1.isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    };
    DisabledItemsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DisabledItemsService.ctorParameters = function () { return [
        { type: data_service_1.DataService }
    ]; };
    return DisabledItemsService;
}());
exports.DisabledItemsService = DisabledItemsService;
