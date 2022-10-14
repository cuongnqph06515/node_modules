import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class RecurrenceIntervalEditorComponent {
    private recurrence;
    private localization;
    intervalValue: number;
    constructor(recurrence: RecurrenceService, localization: LocalizationService);
    readonly currentFreq: string;
    onIntervalChange(newInterval: number): void;
    onIntervalBlur(): void;
    textForRepeatEvery(): string;
    textForFrequency(): string;
    textFor(key: string): string;
}
