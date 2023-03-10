/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { CalendarViewEnum } from '../models/view.enum';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { domContainerFactory as containerFactory } from '../../util';
import { isPresent } from '../../common/utils';
const div = containerFactory('div');
const ul = containerFactory('ul');
const li = containerFactory('li');
const td = containerFactory('td');
const th = containerFactory('th');
const tr = containerFactory('tr');
const tbody = containerFactory('tbody');
const thead = containerFactory('thead');
const table = containerFactory('table');
const monthHeader = () => (div(`
            <span class="k-button k-bare k-title">March 2017</span>
            <span class="k-today">TODAY</span>
        `, 'k-calendar-header'));
const ɵ0 = monthHeader;
const monthWeekHeader = () => (table([
    thead([
        tr([th('MO')])
    ])
], 'k-calendar-weekdays'));
const ɵ1 = monthWeekHeader;
const repeat = (count, mapper) => new Array(count).fill('1').map(mapper);
const ɵ2 = repeat;
const content = (rows, cells = 1) => (table([
    tbody([tr([th('1')])].concat(repeat(rows, () => tr(repeat(cells, c => td(`<span class="k-link">${c}</span>`))))))
]));
const ɵ3 = content;
const scrollable = (children) => div(children, 'k-content k-scrollable');
const ɵ4 = scrollable;
const view = (contentElement, className, renderWeekHeader) => (div([
    monthHeader(),
    renderWeekHeader ? monthWeekHeader() : null,
    scrollable([contentElement, contentElement])
], className, { left: '-10000px', position: 'absolute' }));
const ɵ5 = view;
const ɵ6 = () => {
    let navElement;
    return () => {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!navElement) {
            navElement = div([scrollable([ul([li('<span>FEB</span>')])])], 'k-calendar-navigation', { left: '0px', position: 'absolute' });
        }
        return navElement;
    };
};
const navigationList = (ɵ6)();
const viewFactory = ({ cells, rows }, className, renderWeekHeader) => {
    let viewElement;
    return () => {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!viewElement) {
            viewElement = view(content(rows, cells), className, renderWeekHeader);
        }
        return viewElement;
    };
};
const ɵ7 = viewFactory;
const getScrollable = (element) => element.querySelector('.k-scrollable');
const ɵ8 = getScrollable;
const horizontal = element => {
    const scrollableElement = getScrollable(element);
    scrollableElement.classList.add('k-scrollable-horizontal');
    return element;
};
const ɵ9 = horizontal;
const monthView = viewFactory({ cells: 7, rows: 6 }, 'k-calendar-view k-calendar-monthview', true);
const yearView = viewFactory({ cells: 5, rows: 3 }, 'k-calendar-view k-calendar-yearview', false);
const decadeView = viewFactory({ cells: 5, rows: 2 }, 'k-calendar-view k-calendar-decadeview', false);
const horzMonthView = () => horizontal(monthView());
const ɵ10 = horzMonthView;
const horzYearView = () => horizontal(yearView());
const ɵ11 = horzYearView;
const horzDecadeView = () => horizontal(decadeView());
const ɵ12 = horzDecadeView;
const height = (element) => (parseFloat(window.getComputedStyle(element).height) || element.offsetHeight);
const ɵ13 = height;
const width = (element) => {
    const styles = window.getComputedStyle(element);
    const computed = parseFloat(styles.width)
        + parseFloat(styles.paddingLeft)
        + parseFloat(styles.paddingRight);
    return computed || element.offsetWidth;
};
const ɵ14 = width;
const getBody = (element) => element.querySelector('tbody');
const ɵ15 = getBody;
/**
 * @hidden
 */
export class CalendarDOMService {
    ensureHeights() {
        if (this.calendarHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    }
    calculateHeights(container) {
        if (!isDocumentAvailable()) {
            return;
        }
        this.hostContainer = container;
        this.batch(monthView(), (contentElement) => {
            const viewElement = getBody(contentElement);
            this.calendarHeight = height(contentElement);
            this.monthViewHeight = height(viewElement);
            this.headerHeight = height(viewElement.children[0]);
            this.scrollableContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzMonthView(), (contentElement) => {
            const viewElement = getBody(contentElement);
            this.calendarWidth = width(contentElement);
            this.monthViewWidth = width(viewElement);
            this.scrollableContentWidth = width(getScrollable(contentElement));
        });
        this.batch(yearView(), (contentElement) => {
            this.yearViewHeight = height(getBody(contentElement));
            this.scrollableYearContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzYearView(), (contentElement) => {
            this.yearViewWidth = width(getBody(contentElement));
        });
        this.batch(decadeView(), (contentElement) => {
            this.decadeViewHeight = height(getBody(contentElement));
            this.centuryViewHeight = this.decadeViewHeight;
        });
        this.batch(horzDecadeView(), (contentElement) => {
            this.decadeViewWidth = width(getBody(contentElement));
            this.centuryViewWidth = this.decadeViewWidth;
        });
        this.batch(navigationList(), (contentElement) => {
            this.navigationItemHeight = height(contentElement.querySelector('li'));
        });
    }
    viewHeight(viewType) {
        return this.viewDimension(viewType, 'height');
    }
    viewWidth(viewType) {
        return this.viewDimension(viewType, 'width');
    }
    viewDimension(viewType, dimension) {
        const viewProp = dimension === 'height' ? 'ViewHeight' : 'ViewWidth';
        switch (viewType) {
            case CalendarViewEnum.month:
                return this[`month${viewProp}`];
            case CalendarViewEnum.year:
                return this[`year${viewProp}`];
            case CalendarViewEnum.decade:
                return this[`decade${viewProp}`];
            case CalendarViewEnum.century:
                return this[`century${viewProp}`];
            default:
                return 1;
        }
    }
    batch(contentElement, action) {
        if (!isPresent(this.hostContainer)) {
            return;
        }
        const hostClone = this.hostContainer.cloneNode();
        document.body.appendChild(hostClone);
        try {
            const appendedContent = hostClone.appendChild(contentElement);
            action(appendedContent);
        }
        catch (error) {
            throw error;
        }
        finally {
            document.body.removeChild(hostClone);
        }
    }
}
CalendarDOMService.decorators = [
    { type: Injectable },
];
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15 };
