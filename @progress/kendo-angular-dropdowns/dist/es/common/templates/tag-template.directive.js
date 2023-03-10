/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the selected tag value of the MultiSelect
 * ([see example]({% slug templates_multiselect %}#toc-tag-template)).
 * The template context is set to the current component.
 * To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * > The `TagTemplate` directive can only be used with the MultiSelect component.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect [data]="items">
 *    <ng-template kendoMultiSelectTagTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public items: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var TagTemplateDirective = /** @class */ (function () {
    function TagTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TagTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMultiSelectTagTemplate]'
                },] },
    ];
    /** @nocollapse */
    TagTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return TagTemplateDirective;
}());
export { TagTemplateDirective };
