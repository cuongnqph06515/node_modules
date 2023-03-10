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
export class ToolbarNavigationComponent {
    constructor(popupService, toolbarService, localization, cd) {
        this.popupService = popupService;
        this.toolbarService = toolbarService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.hostClasses = true;
        this.subs = this.localization.changes.subscribe(({ rtl }) => {
            cd.markForCheck();
        });
    }
    /**
     * @hidden
     */
    get todayText() {
        return this.localization.get('today');
    }
    /**
     * @hidden
     */
    get calendarTodayText() {
        return this.localization.get('calendarToday');
    }
    /**
     * @hidden
     */
    get nextText() {
        return this.localization.get('nextTitle');
    }
    /**
     * @hidden
     */
    get previousText() {
        return this.localization.get('previousTitle');
    }
    /**
     * @hidden
     */
    get ctx() {
        return this.toolbarService.context;
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
        this.closePopup();
    }
    /**
     * @hidden
     */
    toggleSelectedDate(anchor, template) {
        if (this.popupRef) {
            this.closePopup();
        }
        else {
            const popupSettings = {
                anchor: anchor,
                content: template
            };
            if (this.localization.rtl) {
                popupSettings.popupClass = 'k-rtl';
            }
            this.popupRef = this.popupService.open(popupSettings);
        }
        return false;
    }
    /**
     * @hidden
     */
    selectDate(value) {
        this.closePopup();
        this.toolbarService.navigate({
            type: 'select-date',
            date: value
        });
    }
    /**
     * @hidden
     */
    prevClick() {
        this.toolbarService.navigate({
            type: 'prev'
        });
        return false;
    }
    /**
     * @hidden
     */
    nextClick() {
        this.toolbarService.navigate({
            type: 'next'
        });
        return false;
    }
    /**
     * @hidden
     */
    todayClick() {
        this.toolbarService.navigate({
            type: 'today'
        });
        return false;
    }
    closePopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
}
ToolbarNavigationComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerToolbarNavigation]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    PopupService
                ],
                template: `
        <li class="k-state-default k-header k-nav-today">
            <a role="button"
                (click)="todayClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="todayText">{{todayText}}</a>
        </li>
        <li class="k-state-default k-header k-nav-prev">
            <a role="button"
                (click)="prevClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="previousText"
                [attr.aria-label]="previousText">
                <span class="k-icon k-i-arrow-60-left" style="pointer-events: none"></span>
            </a>
        </li>
        <li class="k-state-default k-header k-nav-next">
            <a role="button"
                (click)="nextClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="nextText"
                [attr.aria-label]="nextText">
                <span class="k-icon k-i-arrow-60-right" style="pointer-events: none"></span>
            </a>
        </li>
        <li class="k-state-default k-nav-current">
            <a role="button" #anchor href="#" class="k-link" tabindex="-1" (click)="toggleSelectedDate(anchor, template)">
                <span class="k-icon k-i-calendar"></span>
                <span class="k-sm-date-format">{{ (ctx.dateRange | async)?.shortText }}</span>
                <span class="k-lg-date-format">{{ (ctx.dateRange | async)?.text }}</span>
            </a>
        </li>

        <ng-template #template>
            <kendo-calendar (valueChange)="selectDate($event)" [value]="ctx.selectedDate | async" [min]="min" [max]="max">
                <kendo-calendar-messages [today]="calendarTodayText">
                </kendo-calendar-messages>
            </kendo-calendar>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarNavigationComponent.ctorParameters = () => [
    { type: PopupService },
    { type: ToolbarService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
ToolbarNavigationComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-navigation',] }, { type: HostBinding, args: ['class.k-reset',] }],
    min: [{ type: Input }],
    max: [{ type: Input }]
};
