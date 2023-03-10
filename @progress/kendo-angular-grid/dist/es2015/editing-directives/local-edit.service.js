/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDevMode } from '@angular/core';
/**
 * @hidden
 */
export class LocalEditService {
    constructor(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    create(item) {
        if (this.hasLocalData && this.grid.skip) {
            this.localDataChangesService.data.splice(this.grid.skip, 0, item);
        }
        else {
            this.data.unshift(item);
        }
        this.dataChanged();
    }
    update(_item) { } // tslint:disable-line:no-empty
    remove(item) {
        const data = this.data;
        for (let idx = 0; idx < data.length; idx++) {
            if (item === data[idx]) {
                data.splice(idx, 1);
                this.dataChanged({ action: 'remove', item: item });
                break;
            }
        }
    }
    assignValues(target, source) {
        Object.assign(target, source);
    }
    dataChanged(args = {}) {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit(args);
        }
    }
    get hasLocalData() {
        return Array.isArray(this.localDataChangesService.data);
    }
    get data() {
        if (this.hasLocalData) {
            return this.localDataChangesService.data;
        }
        const data = this.grid.data;
        if (Array.isArray(data)) {
            return data;
        }
        if (isDevMode()) {
            throw new Error('The default edit service of the editing directives works only when binding to plain array.' +
                'Please provide an editService.');
        }
        return [];
    }
}
