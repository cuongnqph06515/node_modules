/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
/**
 * @hidden
 */
export class PDFService {
    constructor() {
        this.savePDF = new EventEmitter();
        this.drawPDF = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.dataChanged = new EventEmitter();
    }
    save(component) {
        this.emitEvent(this.savePDF, component);
    }
    draw(component, promise) {
        this.emitEvent(this.drawPDF, { component, promise });
    }
    emitEvent(emitter, args) {
        if (emitter.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-treelist-pdf> component.');
            }
        }
        else {
            emitter.emit(args);
        }
    }
}
PDFService.decorators = [
    { type: Injectable },
];
