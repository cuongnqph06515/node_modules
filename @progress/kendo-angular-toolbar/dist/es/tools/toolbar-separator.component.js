/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ToolNavigationService } from '../navigation/tool-navigation.service';
/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
var ToolBarSeparatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarSeparatorComponent, _super);
    function ToolBarSeparatorComponent() {
        var _this = _super.call(this) || this;
        _this.navigationService = new ToolNavigationService();
        return _this;
    }
    ToolBarSeparatorComponent.prototype.ngAfterViewInit = function () {
        if (!this.popupTemplate) {
            this.popupTemplate = this.toolbarTemplate;
        }
    };
    ToolBarSeparatorComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarSeparator',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarSeparatorComponent; }) }],
                    selector: 'kendo-toolbar-separator',
                    template: "\n        <ng-template #toolbarTemplate>\n            <div class=\"k-separator\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSeparatorComponent.ctorParameters = function () { return []; };
    ToolBarSeparatorComponent.propDecorators = {
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        separator: [{ type: ViewChild, args: ['separator',] }]
    };
    return ToolBarSeparatorComponent;
}(ToolBarToolComponent));
export { ToolBarSeparatorComponent };
