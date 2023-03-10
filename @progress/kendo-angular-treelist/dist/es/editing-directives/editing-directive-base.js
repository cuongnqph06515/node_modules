/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
var EditingDirectiveBase = /** @class */ (function () {
    function EditingDirectiveBase(treelist) {
        this.treelist = treelist;
    }
    Object.defineProperty(EditingDirectiveBase.prototype, "editService", {
        get: function () {
            return this.userEditService || this.defaultEditService;
        },
        /**
         * The edit service that will handle the operations.
         */
        set: function (value) {
            this.userEditService = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditingDirectiveBase.prototype, "newItemId", {
        get: function () {
            return this.idCallback;
        },
        /**
         * Gets or sets a function that will be called to determine the unique identifier
         * for new items. The function receives the `item` and its `parent` as parameters
         * and must return an ID.
         */
        set: function (callback) {
            this.idCallback = callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnInit = function () {
        this.subscriptions = this.treelist.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.treelist.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.treelist.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.treelist.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(merge(this.treelist.dataStateChange, this.treelist.pageChange).subscribe(this.onStateChange.bind(this)));
    };
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(EditingDirectiveBase.prototype, "defaultEditService", {
        get: function () {
            return this.treelist.localEditService;
        },
        enumerable: true,
        configurable: true
    });
    EditingDirectiveBase.prototype.addHandler = function (_a) {
        var parent = _a.parent;
        this.parent = parent;
        this.isNew = true;
        this.treelist.addRow(this.createModel({ isNew: true }), parent);
    };
    EditingDirectiveBase.prototype.saveHandler = function (args) {
        var item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item, args.parent, this.idCallback ? this.idCallback(item, args.parent) : null);
            }
            else {
                this.editService.update(item);
            }
        }
        this.treelist.closeRow(args.dataItem, args.isNew);
    };
    EditingDirectiveBase.prototype.cancelHandler = function (args) {
        this.closeEditor(args);
    };
    EditingDirectiveBase.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem, parent = _a.parent;
        var removeItem = function (shouldRemove) {
            if (shouldRemove) {
                _this.editService.remove(dataItem, parent);
            }
        };
        if (this.removeConfirmation) {
            var result = this.removeConfirmation(dataItem, parent);
            if (result instanceof Promise) {
                result.then(removeItem);
            }
            else if (result instanceof Observable) {
                result.pipe(take(1)).subscribe(removeItem);
            }
            else {
                removeItem(result);
            }
        }
        else {
            removeItem(true);
        }
    };
    EditingDirectiveBase.prototype.closeEditor = function (args) {
        if (args === void 0) { args = { dataItem: this.dataItem, isNew: this.isNew }; }
        this.treelist.closeRow(args.dataItem, args.isNew);
        this.clean();
    };
    EditingDirectiveBase.prototype.clean = function () {
        this.isNew = false;
        this.dataItem = null;
        this.parent = null;
    };
    EditingDirectiveBase.prototype.onStateChange = function () {
        this.closeEditor();
    };
    EditingDirectiveBase.propDecorators = {
        editService: [{ type: Input }],
        newItemId: [{ type: Input }],
        removeConfirmation: [{ type: Input }]
    };
    return EditingDirectiveBase;
}());
export { EditingDirectiveBase };
