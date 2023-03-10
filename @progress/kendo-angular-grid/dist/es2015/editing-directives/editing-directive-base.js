/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { LocalEditService } from './local-edit.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
export class EditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
        this.defaultEditService = this.createDefaultService();
    }
    // Consider adding support for the dependency injection of the service to allow for specifying a generic service without code.
    // The Input should still be kept.
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
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.grid.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.grid.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.grid.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.grid.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(this.grid.dataStateChange.subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    createDefaultService() {
        return new LocalEditService(this.grid, this.localDataChangesService);
    }
    addHandler() {
        this.grid.addRow(this.createModel({ isNew: true }));
    }
    saveHandler(args) {
        const item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item);
            }
            else {
                this.editService.update(item);
            }
        }
        this.grid.closeRow(args.rowIndex);
    }
    cancelHandler({ rowIndex }) {
        this.closeEditor(rowIndex);
    }
    removeHandler({ dataItem }) {
        const removeItem = (shouldRemove) => {
            if (shouldRemove) {
                this.editService.remove(dataItem);
            }
        };
        if (this.removeConfirmation) {
            const result = this.removeConfirmation(dataItem);
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
    onStateChange() {
        this.closeEditor();
    }
    closeEditor(rowIndex) {
        this.grid.closeRow(rowIndex);
    }
}
EditingDirectiveBase.propDecorators = {
    editService: [{ type: Input }],
    removeConfirmation: [{ type: Input }]
};
