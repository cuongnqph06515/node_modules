import { DomEventsBuilder } from './events/dom-events-builder';
import { DomEventsBuilder as ChartDomEventsBuilder, DateCategoryAxis, DateValueAxis } from '@progress/kendo-charts';
var dateCategoryAxisFormats = DateCategoryAxis.prototype.options.labels.dateFormats;
var dateValueAxisFormats = DateValueAxis.prototype.options.labels.dateFormats;
var dateFormats = {
    milliseconds: "HH:mm:ss.SSS",
    seconds: { time: 'medium' },
    minutes: { time: 'short' },
    hours: { time: 'short' },
    days: { skeleton: 'Md' },
    weeks: { skeleton: 'Md' },
    months: { skeleton: 'yyMMM' },
    years: { skeleton: 'y' }
};
Object.assign(dateCategoryAxisFormats, dateFormats);
Object.assign(dateValueAxisFormats, dateFormats);
ChartDomEventsBuilder.register(DomEventsBuilder);
