/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Renders the content of the custom list item in the MultiSelect
 * ([see example]({% slug templates_multiselect %}#toc-customizing-the-item-content)).
 * The template context is set to the current component.
 * To get a reference to the current text that is typed by the
 * user, use the `let-customItem` directive.
 *
 * > The `CustomItemTemplate` directive can only be used with the MultiSelect component.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect [data]="listItems" [allowCustom]="true">
 *    <ng-template kendoMultiSelectCustomItemTemplate let-customItem>
 *      <span>New Item: {{customItem}}</span>
 *    </ng-template>
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 *
 */
var CustomItemTemplateDirective = /** @class */ (function () {
    function CustomItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CustomItemTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoMultiSelectCustomItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    CustomItemTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return CustomItemTemplateDirective;
}());
exports.CustomItemTemplateDirective = CustomItemTemplateDirective;
