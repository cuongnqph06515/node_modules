/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, Input, ContentChildren, QueryList } from '@angular/core';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
/**
 * Represents the tab component of the TabStrip.
 */
var TabStripTabComponent = /** @class */ (function () {
    function TabStripTabComponent() {
        this.active = false;
        this._tabContent = new QueryList();
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
        { type: Component, args: [{
                    exportAs: 'kendoTabStripTab',
                    selector: 'kendo-tabstrip-tab',
                    template: ""
                },] },
    ];
    TabStripTabComponent.propDecorators = {
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        cssClass: [{ type: Input }],
        selected: [{ type: Input }],
        _tabContent: [{ type: ContentChildren, args: [TabContentDirective,] }],
        tabTitle: [{ type: ContentChild, args: [TabTitleDirective,] }]
    };
    return TabStripTabComponent;
}());
export { TabStripTabComponent };
