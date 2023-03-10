/**
 * The point that is passed to the tooltip template.
 */
export class TooltipTemplatePoint {
    /**
     * @hidden
     */
    constructor(point, format, template) {
        this.value = point.value;
        this.category = point.category;
        this.categoryIndex = point.categoryIx;
        this.series = point.series;
        this.dataItem = point.dataItem;
        this.percentage = point.percentage;
        this.runningTotal = point.runningTotal;
        this.total = point.total;
        this.low = point.low;
        this.high = point.high;
        this.xLow = point.xLow;
        this.xHigh = point.xHigh;
        this.yLow = point.yLow;
        this.yHigh = point.yHigh;
        this.template = template;
        this.point = point;
        this.format = format;
    }
    /**
     * @hidden
     */
    get formattedValue() {
        return this.format ? this.point.formatValue(this.format) : String(this.value);
    }
}
