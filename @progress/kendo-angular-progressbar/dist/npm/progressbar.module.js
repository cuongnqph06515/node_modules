"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_progressbar_component_1 = require("./chunk/chunk-progressbar.component");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var progressbar_component_1 = require("./progressbar.component");
var COMPONENT_DIRECTIVES = [progressbar_component_1.ProgressBarComponent, chunk_progressbar_component_1.ChunkProgressBarComponent];
var MODULES = [common_1.CommonModule];
/**
 * @hidden
 */
var ProgressBarModule = /** @class */ (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES,
                    exports: COMPONENT_DIRECTIVES,
                    imports: MODULES
                },] },
    ];
    return ProgressBarModule;
}());
exports.ProgressBarModule = ProgressBarModule;
