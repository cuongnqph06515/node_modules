"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var DomEventsService = /** @class */ (function () {
    function DomEventsService() {
        this.focus = new core_1.EventEmitter();
        this.focusIn = new core_1.EventEmitter();
        this.focusOut = new core_1.EventEmitter();
        this.click = new core_1.EventEmitter();
        this.keydown = new core_1.EventEmitter();
        this.windowBlur = new core_1.EventEmitter();
    }
    DomEventsService.decorators = [
        { type: core_1.Injectable },
    ];
    return DomEventsService;
}());
exports.DomEventsService = DomEventsService;
