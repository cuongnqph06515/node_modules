/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the toolbar template of the Grid.
 *
 * The template context has the following field:
 * - `position`&mdash;The position at which the toolbar template is rendered. The possible values are "top" and "bottom".
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <div class="example-config">
 *         <input type="radio" id="top" name="position" class="k-radio" value="top" checked (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="top">Top</label><br/>
 *         <input type="radio" id="bottom" name="position" class="k-radio" value="bottom" (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="bottom">Bottom</label><br/>
 *         <input type="radio" id="both" name="position" value="both" class="k-radio" (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="both">Both</label><br/>
 *       </div>
 *       <kendo-grid [data]="gridData" style="height: 200px">
 *            <ng-template kendoGridToolbarTemplate [position]="position" let-position="position">
 *                <button (click)="onClick()" class="k-button">Custom action</button>
 *            </ng-template>
 *            <kendo-grid-column field="ProductName">
 *            </kendo-grid-column>
 *            <kendo-grid-column field="UnitPrice">
 *            </kendo-grid-column>
 *        </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public position: 'top' | 'bottom' | 'both' = 'top';
 *
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 *
 *     public onClick(): void {
 *         console.log("button was clicked");
 *     }
 *
 *     public positionChange({ target }): void {
 *        this.position = target.value;
 *     }
 * }
 *
 * ```
 */
var ToolbarTemplateDirective = /** @class */ (function () {
    function ToolbarTemplateDirective(templateRef) {
        this.templateRef = templateRef;
        this._position = "top";
    }
    Object.defineProperty(ToolbarTemplateDirective.prototype, "position", {
        get: function () {
            return this._position;
        },
        /**
         * The position of the toolbar ([see example]({% slug toolbartemplate_grid %})).
         *
         * The possible values are:
         * - `top`&mdash;Positions the toolbar above the group panel or header.
         * - `bottom`&mdash;Positions the toolbar below the pager.
         * - `both`&mdash;Displays two toolbar instances. Positions the first one above
         * the group panel or header and the second one below the pager.
         */
        set: function (position) {
            this._position = position;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridToolbarTemplate]'
                },] },
    ];
    /** @nocollapse */
    ToolbarTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    ToolbarTemplateDirective.propDecorators = {
        position: [{ type: core_1.Input, args: ["position",] }]
    };
    return ToolbarTemplateDirective;
}());
exports.ToolbarTemplateDirective = ToolbarTemplateDirective;
