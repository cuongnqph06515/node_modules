"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_events_builder_1 = require("./events/dom-events-builder");
var kendo_charts_1 = require("@progress/kendo-charts");
var dateCategoryAxisFormats = kendo_charts_1.DateCategoryAxis.prototype.options.labels.dateFormats;
var dateValueAxisFormats = kendo_charts_1.DateValueAxis.prototype.options.labels.dateFormats;
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
kendo_charts_1.DomEventsBuilder.register(dom_events_builder_1.DomEventsBuilder);
