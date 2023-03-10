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
export class EditingDirectiveBase {
    constructor(treelist) {
        this.treelist = treelist;
    }
    /**
     * The edit service that will handle the operations.
     */
    set editService(value) {
        this.userEditService = value;
    }
    get editService() {
        return this.userEditService || this.defaultEditService;
    }
    /**
     * Gets or sets a function that will be called to determine the unique identifier
     * for new items. The function receives the `item` and its `parent` as parameters
     * and must return an ID.
     */
    set newItemId(callback) {
        this.idCallback = callback;
    }
    get newItemId() {
        return this.idCallback;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.treelist.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.treelist.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.treelist.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.treelist.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(merge(this.treelist.dataStateChange, this.treelist.pageChange).subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get defaultEditService() {
        return this.treelist.localEditService;
    }
    addHandler({ parent }) {
        this.parent = parent;
        this.isNew = true;
        this.treelist.addRow(this.createModel({ isNew: true }), parent);
    }
    saveHandler(args) {
        const item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item, args.parent, this.idCallback ? this.idCallback(item, args.parent) : null);
            }
            else {
                this.editService.update(item);
            }
        }
        this.treelist.closeRow(args.dataItem, args.isNew);
    }
    cancelHandler(args) {
        this.closeEditor(args);
    }
    removeHandler({ dataItem, parent }) {
        const removeItem = (shouldRemove) => {
            if (shouldRemove) {
                this.editService.remove(dataItem, parent);
            }
        };
        if (this.removeConfirmation) {
            const result = this.removeConfirmation(dataItem, parent);
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
    }
    closeEditor(args = { dataItem: this.dataItem, isNew: this.isNew }) {
        this.treelist.closeRow(args.dataItem, args.isNew);
        this.clean();
    }
    clean() {
        this.isNew = false;
        this.dataItem = null;
        this.parent = null;
    }
    onStateChange() {
        this.closeEditor();
    }
}
EditingDirectiveBase.propDecorators = {
    editService: [{ type: Input }],
    newItemId: [{ type: Input }],
    removeConfirmation: [{ type: Input }]
};
