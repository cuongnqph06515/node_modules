import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class LocalDataChangesService {
    constructor() {
        this.changes = new EventEmitter();
    }
}
LocalDataChangesService.decorators = [
    { type: Injectable },
];
