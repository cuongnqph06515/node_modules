/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, forwardRef, ViewChild, ContentChildren, QueryList, Input } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ToolBarButtonComponent } from './toolbar-button.component';
import { ButtonGroupNavigationService } from '../navigation/buttongroup-navigation.service';
/**
 * Represents the Kendo UI Toolbar ButtonGroup for Angular.
 */
var ToolBarButtonGroupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarButtonGroupComponent, _super);
    function ToolBarButtonGroupComponent() {
        var _this = _super.call(this) || this;
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        _this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options.
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        _this.navigationService = new ButtonGroupNavigationService();
        return _this;
    }
    ToolBarButtonGroupComponent.prototype.selectedChangeHandler = function (state, button) {
        button.selected = state;
        button.selectedChange.emit(state);
    };
    ToolBarButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarButtonGroup',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarButtonGroupComponent; }) }],
                    selector: 'kendo-toolbar-buttongroup',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-buttongroup [tabIndex]=\"tabIndex\" [selection]=\"selection\" [disabled]=\"disabled\" [look]=\"look\" [width]=\"width\">\n                <button\n                    type=\"button\"\n                    kendoButton\n                    *ngFor=\"let button of buttons\"\n                    [ngStyle]=\"button.style\"\n                    [ngClass]=\"button.className\"\n                    [attr.title]=\"button.title\"\n                    [disabled]=\"button.disabled\"\n                    [togglable]=\"button.togglable\"\n                    [primary]=\"button.primary\"\n                    [selected]=\"button.selected\"\n                    [icon]=\"button.toolbarOptions.icon\"\n                    [iconClass]=\"button.toolbarOptions.iconClass\"\n                    [imageUrl]=\"button.toolbarOptions.imageUrl\"\n                    (click)=\"button.click.emit($event)\"\n                    (selectedChange)=\"selectedChangeHandler($event, button)\"\n                >\n                    {{ button.toolbarOptions.text }}\n                </button>\n            </kendo-buttongroup>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <kendo-buttongroup\n                class=\"k-overflow-button\"\n                [tabIndex]=\"tabIndex\"\n                [selection]=\"selection\"\n                [disabled]=\"disabled\"\n                [look]=\"look\"\n                [width]=\"width\"\n            >\n                <button\n                    type=\"button\"\n                    kendoButton\n                    class=\"k-overflow-button\"\n                    *ngFor=\"let button of buttons\"\n                    [ngStyle]=\"button.style\"\n                    [ngClass]=\"button.className\"\n                    [attr.title]=\"button.title\"\n                    [disabled]=\"button.disabled\"\n                    [togglable]=\"button.togglable\"\n                    [primary]=\"button.primary\"\n                    [selected]=\"button.selected\"\n                    [icon]=\"button.overflowOptions.icon\"\n                    [iconClass]=\"button.overflowOptions.iconClass\"\n                    [imageUrl]=\"button.overflowOptions.imageUrl\"\n                    (click)=\"button.click.emit($event)\"\n                    (selectedChange)=\"selectedChangeHandler($event, button)\"\n                >\n                    {{ button.overflowOptions.text }}\n                </button>\n            </kendo-buttongroup>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarButtonGroupComponent.ctorParameters = function () { return []; };
    ToolBarButtonGroupComponent.propDecorators = {
        disabled: [{ type: Input }],
        selection: [{ type: Input }],
        width: [{ type: Input }],
        look: [{ type: Input }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        buttons: [{ type: ContentChildren, args: [forwardRef(function () { return ToolBarButtonComponent; }),] }]
    };
    return ToolBarButtonGroupComponent;
}(ToolBarToolComponent));
export { ToolBarButtonGroupComponent };
