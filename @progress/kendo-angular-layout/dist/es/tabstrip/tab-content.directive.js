/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef } from '@angular/core';
/**
 * Represents the content template of the Kendo UI TabStrip.
 * To define the template, nest a `<ng-template>` tag with the `kendoTabContent` inside the component tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-tabstrip [ngStyle]="{'width': '400px'}" [animate]="true">
 *           <kendo-tabstrip-tab [title]="'Paris'" [selected]="true">
 *             <ng-template kendoTabContent>
 *               <h3>Content 1</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *
 *           <kendo-tabstrip-tab [title]="'Sofia'">
 *             <ng-template kendoTabContent>
 *               <h3>Content 2</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *         </kendo-tabstrip>
 *     `
 * })
 *
 * class AppComponent {}
 *
 * ```
 */
var TabContentDirective = /** @class */ (function () {
    function TabContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TabContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTabContent]'
                },] },
    ];
    /** @nocollapse */
    TabContentDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return TabContentDirective;
}());
export { TabContentDirective };
