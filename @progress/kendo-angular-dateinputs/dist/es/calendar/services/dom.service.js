/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { CalendarViewEnum } from '../models/view.enum';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { domContainerFactory as containerFactory } from '../../util';
import { isPresent } from '../../common/utils';
var div = containerFactory('div');
var ul = containerFactory('ul');
var li = containerFactory('li');
var td = containerFactory('td');
var th = containerFactory('th');
var tr = containerFactory('tr');
var tbody = containerFactory('tbody');
var thead = containerFactory('thead');
var table = containerFactory('table');
var monthHeader = function () { return (div("\n            <span class=\"k-button k-bare k-title\">March 2017</span>\n            <span class=\"k-today\">TODAY</span>\n        ", 'k-calendar-header')); };
var ɵ0 = monthHeader;
var monthWeekHeader = function () { return (table([
    thead([
        tr([th('MO')])
    ])
], 'k-calendar-weekdays')); };
var ɵ1 = monthWeekHeader;
var repeat = function (count, mapper) { return new Array(count).fill('1').map(mapper); };
var ɵ2 = repeat;
var content = function (rows, cells) {
    if (cells === void 0) { cells = 1; }
    return (table([
        tbody([tr([th('1')])].concat(repeat(rows, function () { return tr(repeat(cells, function (c) { return td("<span class=\"k-link\">" + c + "</span>"); })); })))
    ]));
};
var ɵ3 = content;
var scrollable = function (children) { return div(children, 'k-content k-scrollable'); };
var ɵ4 = scrollable;
var view = function (contentElement, className, renderWeekHeader) { return (div([
    monthHeader(),
    renderWeekHeader ? monthWeekHeader() : null,
    scrollable([contentElement, contentElement])
], className, { left: '-10000px', position: 'absolute' })); };
var ɵ5 = view;
var ɵ6 = function () {
    var navElement;
    return function () {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!navElement) {
            navElement = div([scrollable([ul([li('<span>FEB</span>')])])], 'k-calendar-navigation', { left: '0px', position: 'absolute' });
        }
        return navElement;
    };
};
var navigationList = (ɵ6)();
var viewFactory = function (_a, className, renderWeekHeader) {
    var cells = _a.cells, rows = _a.rows;
    var viewElement;
    return function () {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!viewElement) {
            viewElement = view(content(rows, cells), className, renderWeekHeader);
        }
        return viewElement;
    };
};
var ɵ7 = viewFactory;
var getScrollable = function (element) { return element.querySelector('.k-scrollable'); };
var ɵ8 = getScrollable;
var horizontal = function (element) {
    var scrollableElement = getScrollable(element);
    scrollableElement.classList.add('k-scrollable-horizontal');
    return element;
};
var ɵ9 = horizontal;
var monthView = viewFactory({ cells: 7, rows: 6 }, 'k-calendar-view k-calendar-monthview', true);
var yearView = viewFactory({ cells: 5, rows: 3 }, 'k-calendar-view k-calendar-yearview', false);
var decadeView = viewFactory({ cells: 5, rows: 2 }, 'k-calendar-view k-calendar-decadeview', false);
var horzMonthView = function () { return horizontal(monthView()); };
var ɵ10 = horzMonthView;
var horzYearView = function () { return horizontal(yearView()); };
var ɵ11 = horzYearView;
var horzDecadeView = function () { return horizontal(decadeView()); };
var ɵ12 = horzDecadeView;
var height = function (element) { return (parseFloat(window.getComputedStyle(element).height) || element.offsetHeight); };
var ɵ13 = height;
var width = function (element) {
    var styles = window.getComputedStyle(element);
    var computed = parseFloat(styles.width)
        + parseFloat(styles.paddingLeft)
        + parseFloat(styles.paddingRight);
    return computed || element.offsetWidth;
};
var ɵ14 = width;
var getBody = function (element) { return element.querySelector('tbody'); };
var ɵ15 = getBody;
/**
 * @hidden
 */
var CalendarDOMService = /** @class */ (function () {
    function CalendarDOMService() {
    }
    CalendarDOMService.prototype.ensureHeights = function () {
        if (this.calendarHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    };
    CalendarDOMService.prototype.calculateHeights = function (container) {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.hostContainer = container;
        this.batch(monthView(), function (contentElement) {
            var viewElement = getBody(contentElement);
            _this.calendarHeight = height(contentElement);
            _this.monthViewHeight = height(viewElement);
            _this.headerHeight = height(viewElement.children[0]);
            _this.scrollableContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzMonthView(), function (contentElement) {
            var viewElement = getBody(contentElement);
            _this.calendarWidth = width(contentElement);
            _this.monthViewWidth = width(viewElement);
            _this.scrollableContentWidth = width(getScrollable(contentElement));
        });
        this.batch(yearView(), function (contentElement) {
            _this.yearViewHeight = height(getBody(contentElement));
            _this.scrollableYearContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzYearView(), function (contentElement) {
            _this.yearViewWidth = width(getBody(contentElement));
        });
        this.batch(decadeView(), function (contentElement) {
            _this.decadeViewHeight = height(getBody(contentElement));
            _this.centuryViewHeight = _this.decadeViewHeight;
        });
        this.batch(horzDecadeView(), function (contentElement) {
            _this.decadeViewWidth = width(getBody(contentElement));
            _this.centuryViewWidth = _this.decadeViewWidth;
        });
        this.batch(navigationList(), function (contentElement) {
            _this.navigationItemHeight = height(contentElement.querySelector('li'));
        });
    };
    CalendarDOMService.prototype.viewHeight = function (viewType) {
        return this.viewDimension(viewType, 'height');
    };
    CalendarDOMService.prototype.viewWidth = function (viewType) {
        return this.viewDimension(viewType, 'width');
    };
    CalendarDOMService.prototype.viewDimension = function (viewType, dimension) {
        var viewProp = dimension === 'height' ? 'ViewHeight' : 'ViewWidth';
        switch (viewType) {
            case CalendarViewEnum.month:
                return this["month" + viewProp];
            case CalendarViewEnum.year:
                return this["year" + viewProp];
            case CalendarViewEnum.decade:
                return this["decade" + viewProp];
            case CalendarViewEnum.century:
                return this["century" + viewProp];
            default:
                return 1;
        }
    };
    CalendarDOMService.prototype.batch = function (contentElement, action) {
        if (!isPresent(this.hostContainer)) {
            return;
        }
        var hostClone = this.hostContainer.cloneNode();
        document.body.appendChild(hostClone);
        try {
            var appendedContent = hostClone.appendChild(contentElement);
            action(appendedContent);
        }
        catch (error) {
            throw error;
        }
        finally {
            document.body.removeChild(hostClone);
        }
    };
    CalendarDOMService.decorators = [
        { type: Injectable },
    ];
    return CalendarDOMService;
}());
export { CalendarDOMService };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15 };
