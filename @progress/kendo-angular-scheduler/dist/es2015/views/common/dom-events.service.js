import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class DomEventsService {
    constructor() {
        this.focus = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.click = new EventEmitter();
        this.keydown = new EventEmitter();
        this.windowBlur = new EventEmitter();
    }
}
DomEventsService.decorators = [
    { type: Injectable },
];
