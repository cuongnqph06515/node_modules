import { NgModule } from '@angular/core';
import { FocusableDirective } from './navigation';
/**
 * @hidden
 */
export class SharedModule {
    static exports() {
        return [
            FocusableDirective
        ];
    }
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FocusableDirective
                ],
                exports: [
                    FocusableDirective
                ]
            },] },
];
