import { TemplateRef } from '@angular/core';
import { AgendaViewItem } from './tasks.collection';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class AgendaListComponent {
    private intlService;
    private localization;
    classes: boolean;
    tasks: any[];
    eventTemplate: TemplateRef<any>;
    slotClass: (args: any) => any;
    eventClass: (args: any) => any;
    eventStyles: (args: any) => any;
    agendaTimeTemplate: TemplateRef<any>;
    agendaDateTemplate: TemplateRef<any>;
    editable: any;
    constructor(intlService: IntlService, localization: LocalizationService);
    extractDataItem(item: any): any;
    formatTime(dataItem: any): string;
    trackByFn(_: number, item: AgendaViewItem): any;
    cellClasses(item: any): any[];
    getEventStyles(item: any): any;
}
