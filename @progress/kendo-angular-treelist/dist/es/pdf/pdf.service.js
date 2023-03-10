/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
/**
 * @hidden
 */
var PDFService = /** @class */ (function () {
    function PDFService() {
        this.savePDF = new EventEmitter();
        this.drawPDF = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.dataChanged = new EventEmitter();
    }
    PDFService.prototype.save = function (component) {
        this.emitEvent(this.savePDF, component);
    };
    PDFService.prototype.draw = function (component, promise) {
        this.emitEvent(this.drawPDF, { component: component, promise: promise });
    };
    PDFService.prototype.emitEvent = function (emitter, args) {
        if (emitter.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-treelist-pdf> component.');
            }
        }
        else {
            emitter.emit(args);
        }
    };
    PDFService.decorators = [
        { type: Injectable },
    ];
    return PDFService;
}());
export { PDFService };
