import { ChunkProgressBarComponent } from './chunk/chunk-progressbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progressbar.component';
const COMPONENT_DIRECTIVES = [ProgressBarComponent, ChunkProgressBarComponent];
const MODULES = [CommonModule];
/**
 * @hidden
 */
export class ProgressBarModule {
}
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: COMPONENT_DIRECTIVES,
                exports: COMPONENT_DIRECTIVES,
                imports: MODULES
            },] },
];
