/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { closest } from '../rendering/common/dom-queries';
/**
 * Represents the component for selecting columns in the TreeList. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_treelist_toolbartemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/chooser-toolbar/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ColumnChooserComponent = /** @class */ (function () {
    function ColumnChooserComponent(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.popupService = popupService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        /**
         * Specifies if the changes in the visibility of the column will be immediately applied.
         */
        this.autoSync = false;
        /**
         * Specifies if all columns can be hidden.
         */
        this.allowHideAll = true;
    }
    Object.defineProperty(ColumnChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    ColumnChooserComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.toggle = function (anchor, template) {
        var _this = this;
        if (!this.popupRef) {
            var direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(function () {
                return _this.closeClick = _this.renderer.listen("document", "click", function (_a) {
                    var target = _a.target;
                    if (!closest(target, function (node) { return node === _this.popupRef.popupElement || node === anchor; })) {
                        _this.close();
                    }
                });
            });
        }
        else {
            this.close();
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onChange = function (changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    };
    ColumnChooserComponent.prototype.close = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    };
    ColumnChooserComponent.prototype.detachClose = function () {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    };
    ColumnChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-column-chooser',
                    template: "\n        <button #anchor\n            type=\"button\"\n            (click)=\"toggle(anchor, template)\"\n            class=\"k-button k-bare k-button-icon\"\n            [attr.title]=\"localization.get('columns')\">\n            <span class=\"k-icon k-i-columns\"></span>\n        </button>\n        <ng-template #template>\n            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>\n            <kendo-treelist-columnlist\n                [columns]=\"columns\"\n                [applyText]=\"localization.get('columnsApply')\"\n                [resetText]=\"localization.get('columnsReset')\"\n                [autoSync]=\"autoSync\"\n                [allowHideAll]=\"allowHideAll\"\n                (apply)=\"onApply($event)\"\n                (columnChange)=\"onChange($event)\">\n            </kendo-treelist-columnlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnChooserComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: PopupService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    ColumnChooserComponent.propDecorators = {
        autoSync: [{ type: Input }],
        allowHideAll: [{ type: Input }]
    };
    return ColumnChooserComponent;
}());
export { ColumnChooserComponent };
