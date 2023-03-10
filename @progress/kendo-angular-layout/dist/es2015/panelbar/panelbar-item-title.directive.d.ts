/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
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
export declare class PanelBarItemTitleDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
