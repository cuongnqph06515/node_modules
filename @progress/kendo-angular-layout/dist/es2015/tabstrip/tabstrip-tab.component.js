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
export class TabStripTabComponent {
    constructor() {
        this.active = false;
        this._tabContent = new QueryList();
    }
    get tabContent() {
        return this._tabContent.first;
    }
    ngAfterContentInit() {
        this.active = this.selected;
    }
    ngOnChanges(changes) {
        if (changes['selected'] && !changes['selected'].isFirstChange()) { // tslint:disable-line
            this.active = this.selected;
        }
    }
}
TabStripTabComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoTabStripTab',
                selector: 'kendo-tabstrip-tab',
                template: ``
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
