import { NgModule } from '@angular/core';
import { FocusableDirective } from './navigation';
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            FocusableDirective
        ];
    };
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
    return SharedModule;
}());
export { SharedModule };
