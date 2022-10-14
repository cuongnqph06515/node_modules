/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
var SHARED_DIRECTIVES = [
    LocalizedMessagesDirective,
    CustomMessagesComponent
];
/**
 * @hidden
 */
var SharedDirectivesModule = /** @class */ (function () {
    function SharedDirectivesModule() {
    }
    SharedDirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SHARED_DIRECTIVES],
                    exports: [SHARED_DIRECTIVES]
                },] },
    ];
    return SharedDirectivesModule;
}());
export { SharedDirectivesModule };
