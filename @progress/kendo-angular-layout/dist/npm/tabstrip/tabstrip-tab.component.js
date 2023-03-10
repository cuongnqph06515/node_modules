/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_content_directive_1 = require("./tab-content.directive");
var tab_title_directive_1 = require("./tab-title.directive");
/**
 * Represents the tab component of the TabStrip.
 */
var TabStripTabComponent = /** @class */ (function () {
    function TabStripTabComponent() {
        this.active = false;
        this._tabContent = new core_1.QueryList();
    }
    Object.defineProperty(TabStripTabComponent.prototype, "tabContent", {
        get: function () {
            return this._tabContent.first;
        },
        enumerable: true,
        configurable: true
    });
    TabStripTabComponent.prototype.ngAfterContentInit = function () {
        this.active = this.selected;
    };
    TabStripTabComponent.prototype.ngOnChanges = function (changes) {
        if (changes['selected'] && !changes['selected'].isFirstChange()) { // tslint:disable-line
            this.active = this.selected;
        }
    };
    TabStripTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoTabStripTab',
                    selector: 'kendo-tabstrip-tab',
                    template: ""
                },] },
    ];
    TabStripTabComponent.propDecorators = {
        title: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.Input }],
        selected: [{ type: core_1.Input }],
        _tabContent: [{ type: core_1.ContentChildren, args: [tab_content_directive_1.TabContentDirective,] }],
        tabTitle: [{ type: core_1.ContentChild, args: [tab_title_directive_1.TabTitleDirective,] }]
    };
    return TabStripTabComponent;
}());
exports.TabStripTabComponent = TabStripTabComponent;
