import { ChunkProgressBarComponent } from './chunk/chunk-progressbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progressbar.component';
var COMPONENT_DIRECTIVES = [ProgressBarComponent, ChunkProgressBarComponent];
var MODULES = [CommonModule];
/**
 * @hidden
 */
var ProgressBarModule = /** @class */ (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES,
                    exports: COMPONENT_DIRECTIVES,
                    imports: MODULES
                },] },
    ];
    return ProgressBarModule;
}());
export { ProgressBarModule };
