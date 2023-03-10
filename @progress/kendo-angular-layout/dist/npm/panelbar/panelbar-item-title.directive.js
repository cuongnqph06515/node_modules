/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoPanelBarItemTitle]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTitleDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return PanelBarItemTitleDirective;
}());
exports.PanelBarItemTitleDirective = PanelBarItemTitleDirective;
