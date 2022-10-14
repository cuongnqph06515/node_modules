import { ElementRef, Renderer2 } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { FocusService } from '../../navigation';
import { DayTimeSlotService } from '../day-time/day-time-slot.service';
import { BaseViewItem } from '../view-items/base-view-item';
/**
 * @hidden
 */
export declare class DayTimeViewItemComponent extends BaseViewItem {
    private intlService;
    vertical: boolean;
    isAllDay: boolean;
    readonly eventTime: string;
    constructor(intlService: IntlService, slotService: DayTimeSlotService, localization: LocalizationService, focusService: FocusService, element: ElementRef, renderer: Renderer2);
}
