/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ColumnMenuItemContentTemplateDirective } from './column-menu-item-content-template.directive';
/**
 * Represents an item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true" [resizable]="true" #grid>
 *          <ng-template kendoGridColumnMenuTemplate let-service="service" let-column="column">
 *              <kendo-grid-columnmenu-item icon="arrows-resizing" text="Fit column"
 *                  (itemClick)="grid.autoFitColumn(column); service.close()">
 *              </kendo-grid-columnmenu-item>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
var ColumnMenuItemComponent = /** @class */ (function () {
    function ColumnMenuItemComponent() {
        /**
         * Fires when the item is clicked.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        this.contentState = 'collapsed';
    }
    Object.defineProperty(ColumnMenuItemComponent.prototype, "iconClass", {
        get: function () {
            return "k-i-" + this.icon;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuItemComponent.prototype.ngOnChanges = function (changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    };
    /**
     * @hidden
     */
    ColumnMenuItemComponent.prototype.onClick = function (e) {
        this.itemClick.emit(e);
        if (this.contentTemplate) {
            this.expanded = !this.expanded;
            this.updateContentState();
            if (this.expanded) {
                this.expand.emit();
            }
            else {
                this.collapse.emit();
            }
        }
    };
    ColumnMenuItemComponent.prototype.updateContentState = function () {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    };
    ColumnMenuItemComponent.decorators = [
        { type: Component, args: [{
                    animations: [
                        trigger('state', [
                            state('collapsed', style({ display: 'none' })),
                            state('expanded', style({ display: 'block' })),
                            transition('collapsed => expanded', [
                                style({
                                    height: '0px',
                                    display: 'block'
                                }),
                                animate('100ms ease-in', style({
                                    height: '*'
                                }))
                            ]),
                            transition('expanded => collapsed', [
                                style({
                                    height: '*'
                                }),
                                animate('100ms ease-in', style({
                                    height: '0px'
                                }))
                            ])
                        ])
                    ],
                    selector: 'kendo-grid-columnmenu-item',
                    template: "\n        <div class=\"k-columnmenu-item\" (click)=\"onClick($event)\" [class.k-state-selected]=\"selected\" [class.k-state-disabled]=\"disabled\">\n           <span *ngIf=\"icon\" class=\"k-icon\" [ngClass]=\"iconClass\">\n           </span>\n           {{ text }}\n        </div>\n        <div *ngIf=\"contentTemplate\" [@state]=\"contentState\" style=\"overflow:hidden;\" class=\"k-columnmenu-item-content\">\n            <ng-container [ngTemplateOutlet]=\"contentTemplate.templateRef\">\n            </ng-container>\n        <div>\n    "
                },] },
    ];
    ColumnMenuItemComponent.propDecorators = {
        itemClick: [{ type: Output }],
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        icon: [{ type: Input }],
        text: [{ type: Input }],
        selected: [{ type: Input }],
        disabled: [{ type: Input }],
        expanded: [{ type: Input }],
        contentTemplate: [{ type: ContentChild, args: [ColumnMenuItemContentTemplateDirective,] }]
    };
    return ColumnMenuItemComponent;
}());
export { ColumnMenuItemComponent };
