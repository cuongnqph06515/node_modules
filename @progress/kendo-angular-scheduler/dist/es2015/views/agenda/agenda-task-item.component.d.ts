import { TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class AgendaTaskItemComponent {
    private localization;
    item: any;
    color: string;
    eventTemplate: TemplateRef<any>;
    editable: any;
    readonly eventTitle: string;
    readonly eventColor: string;
    readonly deleteMessage: string;
    readonly isRecurrence: boolean;
    readonly isRecurrenceException: boolean;
    readonly removable: boolean;
    constructor(localization: LocalizationService);
}
