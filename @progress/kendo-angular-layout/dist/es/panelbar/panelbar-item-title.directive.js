/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template directive of the PanelBar which helps to customize the item title
 * ([more information and example]({% slug templates_panelbar %}#toc-customizing-the-appearance-of-the-title)).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *        <kendo-panelbar>
 *            <kendo-panelbar-item [title]="'Paris'" [expanded]="true">
 *                <ng-template kendoPanelBarItemTitle>
 *                    Additional Content
 *                </ng-template>
 *            </kendo-panelbar-item>
 *        </kendo-panelbar>
 *     `
 * })
 *
 * class AppComponent {}
 *
 * ```
 */
var PanelBarItemTitleDirective = /** @class */ (function () {
    function PanelBarItemTitleDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarItemTitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPanelBarItemTitle]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTitleDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PanelBarItemTitleDirective;
}());
export { PanelBarItemTitleDirective };
