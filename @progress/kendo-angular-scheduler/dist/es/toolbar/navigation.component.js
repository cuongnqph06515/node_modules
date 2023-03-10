import { ChangeDetectionStrategy, Component, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ToolbarService } from './toolbar.service';
/**
 * A toolbar component which contains the controls for date navigation
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the **Previous**, **Today**, **Next**, and **Date picker**
 * buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var ToolbarNavigationComponent = /** @class */ (function () {
    function ToolbarNavigationComponent(popupService, toolbarService, localization, cd) {
        this.popupService = popupService;
        this.toolbarService = toolbarService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.hostClasses = true;
        this.subs = this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            cd.markForCheck();
        });
    }
    Object.defineProperty(ToolbarNavigationComponent.prototype, "todayText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('today');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "calendarTodayText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('calendarToday');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "nextText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('nextTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "previousText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('previousTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "ctx", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarService.context;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarNavigationComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
        this.closePopup();
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.toggleSelectedDate = function (anchor, template) {
        if (this.popupRef) {
            this.closePopup();
        }
        else {
            var popupSettings = {
                anchor: anchor,
                content: template
            };
            if (this.localization.rtl) {
                popupSettings.popupClass = 'k-rtl';
            }
            this.popupRef = this.popupService.open(popupSettings);
        }
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.selectDate = function (value) {
        this.closePopup();
        this.toolbarService.navigate({
            type: 'select-date',
            date: value
        });
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.prevClick = function () {
        this.toolbarService.navigate({
            type: 'prev'
        });
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.nextClick = function () {
        this.toolbarService.navigate({
            type: 'next'
        });
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.todayClick = function () {
        this.toolbarService.navigate({
            type: 'today'
        });
        return false;
    };
    ToolbarNavigationComponent.prototype.closePopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    ToolbarNavigationComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerToolbarNavigation]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        PopupService
                    ],
                    template: "\n        <li class=\"k-state-default k-header k-nav-today\">\n            <a role=\"button\"\n                (click)=\"todayClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"todayText\">{{todayText}}</a>\n        </li>\n        <li class=\"k-state-default k-header k-nav-prev\">\n            <a role=\"button\"\n                (click)=\"prevClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"previousText\"\n                [attr.aria-label]=\"previousText\">\n                <span class=\"k-icon k-i-arrow-60-left\" style=\"pointer-events: none\"></span>\n            </a>\n        </li>\n        <li class=\"k-state-default k-header k-nav-next\">\n            <a role=\"button\"\n                (click)=\"nextClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"nextText\"\n                [attr.aria-label]=\"nextText\">\n                <span class=\"k-icon k-i-arrow-60-right\" style=\"pointer-events: none\"></span>\n            </a>\n        </li>\n        <li class=\"k-state-default k-nav-current\">\n            <a role=\"button\" #anchor href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"toggleSelectedDate(anchor, template)\">\n                <span class=\"k-icon k-i-calendar\"></span>\n                <span class=\"k-sm-date-format\">{{ (ctx.dateRange | async)?.shortText }}</span>\n                <span class=\"k-lg-date-format\">{{ (ctx.dateRange | async)?.text }}</span>\n            </a>\n        </li>\n\n        <ng-template #template>\n            <kendo-calendar (valueChange)=\"selectDate($event)\" [value]=\"ctx.selectedDate | async\" [min]=\"min\" [max]=\"max\">\n                <kendo-calendar-messages [today]=\"calendarTodayText\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarNavigationComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: ToolbarService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    ToolbarNavigationComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-navigation',] }, { type: HostBinding, args: ['class.k-reset',] }],
        min: [{ type: Input }],
        max: [{ type: Input }]
    };
    return ToolbarNavigationComponent;
}());
export { ToolbarNavigationComponent };
