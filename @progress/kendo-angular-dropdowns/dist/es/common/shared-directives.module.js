/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { GroupTemplateDirective } from './templates/group-template.directive';
import { FixedGroupTemplateDirective } from './templates/fixed-group-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { FilterDirective } from './filtering/filter.directive';
var SHARED_DIRECTIVES = [
    HeaderTemplateDirective,
    FooterTemplateDirective,
    ItemTemplateDirective,
    GroupTemplateDirective,
    FixedGroupTemplateDirective,
    NoDataTemplateDirective,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    FilterDirective
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 * - `NoDataTemplateDirective`&mdash;The noData template directive.
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
