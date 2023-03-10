/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterContentInit, OnChanges, SimpleChange, QueryList } from '@angular/core';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
/**
 * Represents the tab component of the TabStrip.
 */
export declare class TabStripTabComponent implements AfterContentInit, OnChanges {
    active: boolean;
    /**
     * Sets the title of a tab ([see example]({% slug tabs_tabstrip %}#toc-titles)).
     * Used on a tab as an attribute.
     */
    title: string;
    /**
     * Disables a tab ([see example]({% slug tabs_tabstrip %}#toc-disabled-tabs)).
     * Used on a tab as an attribute.
     */
    disabled: boolean;
    /**
     * The CSS classes that will be rendered on the `tab` element.
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    cssClass: any;
    /**
     * Determines which tab will be selected upon the initial loading of the TabStrip
     * ([see example]({% slug tabs_tabstrip %}#toc-displaying-tabs-on-initial-load)).
     */
    selected: boolean;
    readonly tabContent: TabContentDirective;
    _tabContent: QueryList<TabContentDirective>;
    tabTitle: TabTitleDirective;
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
}
