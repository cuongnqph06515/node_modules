/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var local_edit_service_1 = require("./local-edit.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * @hidden
 */
var EditingDirectiveBase = /** @class */ (function () {
    function EditingDirectiveBase(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
        this.defaultEditService = this.createDefaultService();
    }
    Object.defineProperty(EditingDirectiveBase.prototype, "editService", {
        get: function () {
            return this.userEditService || this.defaultEditService;
        },
        // Consider adding support for the dependency injection of the service to allow for specifying a generic service without code.
        // The Input should still be kept.
        /**
         * The edit service that will handle the operations.
         */
        set: function (value) {
            this.userEditService = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnInit = function () {
        this.subscriptions = this.grid.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.grid.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.grid.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.grid.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(this.grid.dataStateChange.subscribe(this.onStateChange.bind(this)));
    };
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    EditingDirectiveBase.prototype.createDefaultService = function () {
        return new local_edit_service_1.LocalEditService(this.grid, this.localDataChangesService);
    };
    EditingDirectiveBase.prototype.addHandler = function () {
        this.grid.addRow(this.createModel({ isNew: true }));
    };
    EditingDirectiveBase.prototype.saveHandler = function (args) {
        var item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item);
            }
            else {
                this.editService.update(item);
            }
        }
        this.grid.closeRow(args.rowIndex);
    };
    EditingDirectiveBase.prototype.cancelHandler = function (_a) {
        var rowIndex = _a.rowIndex;
        this.closeEditor(rowIndex);
    };
    EditingDirectiveBase.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        var removeItem = function (shouldRemove) {
            if (shouldRemove) {
                _this.editService.remove(dataItem);
            }
        };
        if (this.removeConfirmation) {
            var result = this.removeConfirmation(dataItem);
            if (result instanceof Promise) {
                result.then(removeItem);
            }
            else if (result instanceof rxjs_1.Observable) {
                result.pipe(operators_1.take(1)).subscribe(removeItem);
            }
            else {
                removeItem(result);
            }
        }
        else {
            removeItem(true);
        }
    };
    EditingDirectiveBase.prototype.onStateChange = function () {
        this.closeEditor();
    };
    EditingDirectiveBase.prototype.closeEditor = function (rowIndex) {
        this.grid.closeRow(rowIndex);
    };
    EditingDirectiveBase.propDecorators = {
        editService: [{ type: core_1.Input }],
        removeConfirmation: [{ type: core_1.Input }]
    };
    return EditingDirectiveBase;
}());
exports.EditingDirectiveBase = EditingDirectiveBase;
