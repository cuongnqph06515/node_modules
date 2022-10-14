import { ElementRef, Renderer2 } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MonthSlotService } from './month-slot.service';
import { BaseViewItem } from '../view-items/base-view-item';
import { FocusService } from '../../navigation';
/**
 * @hidden
 */
export declare class MonthViewItemComponent extends BaseViewItem {
    constructor(slotService: MonthSlotService, localization: LocalizationService, focusService: FocusService, element: ElementRef, renderer: Renderer2);
    reflow(): void;
}
