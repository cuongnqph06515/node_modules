import { Injectable, NgZone } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { chartBaseTheme } from '@progress/kendo-charts';
import { chartDefaultTheme } from './chart-default-theme';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
const font = (style) => `${style.fontSize} ${style.fontFamily}`;
const ɵ0 = font;
const letterPos = (letter) => letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
const ɵ1 = letterPos;
const seriesPos = (name) => letterPos(name.match(/series-([a-z])$/)[1]);
const ɵ2 = seriesPos;
const template = `
    <div class="k-var--accent"></div>
    <div class="k-var--accent-contrast"></div>
    <div class="k-var--base"></div>
    <div class="k-var--background"></div>

    <div class="k-var--normal-background"></div>
    <div class="k-var--normal-text-color"></div>
    <div class="k-var--hover-background"></div>
    <div class="k-var--hover-text-color"></div>
    <div class="k-var--selected-background"></div>
    <div class="k-var--selected-text-color"></div>
    <div class="k-var--chart-error-bars-background"></div>
    <div class="k-var--chart-notes-background"></div>
    <div class="k-var--chart-notes-border"></div>
    <div class="k-var--chart-notes-lines"></div>
    <div class="k-var--chart-crosshair-background"></div>

    <div class="k-var--chart-inactive"></div>
    <div class="k-var--chart-major-lines"></div>
    <div class="k-var--chart-minor-lines"></div>
    <div class="k-var--chart-area-opacity"></div>

    <div class="k-widget">
        <div class="k-var--chart-font"></div>
        <div class="k-var--chart-title-font"></div>
        <div class="k-var--chart-label-font"></div>
    </div>

    <div class="k-var--series">
      <div class="k-var--series-a"></div>
      <div class="k-var--series-b"></div>
      <div class="k-var--series-c"></div>
      <div class="k-var--series-d"></div>
      <div class="k-var--series-e"></div>
      <div class="k-var--series-f"></div>
    </div>
`;
/**
 * @hidden
 */
export class ThemeService extends ConfigurationService {
    constructor(ngZone) {
        super(ngZone);
        this.loaded = false;
    }
    loadTheme() {
        if (this.loaded || !isDocumentAvailable()) {
            return;
        }
        if (!this.readTheme()) {
            this.readDefaultTheme();
        }
        this.loaded = true;
        this.next();
    }
    readTheme() {
        this.createElement();
        const available = this.queryColor('accent') !==
            this.queryColor('accent-contrast');
        try {
            if (available) {
                this.push(chartBaseTheme());
                this.setColors();
                this.setFonts();
                this.setSeriesColors();
            }
        }
        finally {
            this.destroyElement();
        }
        return available;
    }
    readDefaultTheme() {
        this.push(chartDefaultTheme());
    }
    createElement() {
        const container = this.element = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
    }
    destroyElement() {
        if (this.element) {
            document.body.removeChild(this.element);
            this.element = undefined;
        }
    }
    setStyle(key, value) {
        this.set(key, value);
    }
    setColors() {
        this.mapColor('axisDefaults.crosshair.color', 'chart-crosshair-background');
        this.mapColor('axisDefaults.labels.color', 'normal-text-color');
        this.mapColor('axisDefaults.line.color', 'chart-major-lines');
        this.mapColor('axisDefaults.majorGridLines.color', 'chart-major-lines');
        this.mapColor('axisDefaults.minorGridLines.color', 'chart-minor-lines');
        this.mapColor('axisDefaults.notes.icon.background', 'chart-notes-background');
        this.mapColor('axisDefaults.notes.icon.border.color', 'chart-notes-border');
        this.mapColor('axisDefaults.notes.line.color', 'chart-notes-lines');
        this.mapColor('axisDefaults.title.color', 'normal-text-color');
        this.mapColor('chartArea.background', 'background');
        this.mapColor('legend.inactiveItems.labels.color', 'chart-inactive');
        this.mapColor('legend.inactiveItems.markers.color', 'chart-inactive');
        this.mapColor('legend.labels.color', 'normal-text-color');
        this.mapColor('seriesDefaults.boxPlot.downColor', 'chart-major-lines');
        this.mapColor('seriesDefaults.boxPlot.mean.color', 'base');
        this.mapColor('seriesDefaults.boxPlot.median.color', 'base');
        this.mapColor('seriesDefaults.boxPlot.whiskers.color', 'accent');
        this.mapColor('seriesDefaults.bullet.target.color', 'normal-text-color');
        this.mapColor('seriesDefaults.candlestick.downColor', 'normal-text-color');
        this.mapColor('seriesDefaults.candlestick.line.color', 'normal-text-color');
        this.mapColor('seriesDefaults.errorBars.color', 'chart-error-bars-background');
        this.mapColor('seriesDefaults.horizontalWaterfall.line.color', 'chart-major-lines');
        this.mapColor('seriesDefaults.icon.border.color', 'chart-major-lines');
        this.mapColor('seriesDefaults.labels.background', 'background');
        this.mapColor('seriesDefaults.labels.color', 'normal-text-color');
        this.mapColor('seriesDefaults.notes.icon.background', 'chart-notes-background');
        this.mapColor('seriesDefaults.notes.icon.border.color', 'chart-notes-border');
        this.mapColor('seriesDefaults.notes.line.color', 'chart-notes-lines');
        this.mapColor('seriesDefaults.verticalBoxPlot.downColor', 'chart-major-lines');
        this.mapColor('seriesDefaults.verticalBoxPlot.mean.color', 'base');
        this.mapColor('seriesDefaults.verticalBoxPlot.median.color', 'base');
        this.mapColor('seriesDefaults.verticalBoxPlot.whiskers.color', 'accent');
        this.mapColor('seriesDefaults.verticalBullet.target.color', 'normal-text-color');
        this.mapColor('seriesDefaults.waterfall.line.color', 'chart-major-lines');
        this.mapColor('title.color', 'normal-text-color');
        const opacity = parseFloat(this.queryStyle('chart-area-opacity').opacity);
        if (!isNaN(opacity)) {
            this.setStyle('seriesDefaults.area.opacity', opacity);
            this.setStyle('seriesDefaults.labels.opacity', opacity);
        }
    }
    setFonts() {
        const defaultFont = font(this.queryStyle('chart-font'));
        const titleFont = font(this.queryStyle('chart-title-font'));
        const labelFont = font(this.queryStyle('chart-label-font'));
        this.setStyle('axisDefaults.labels.font', labelFont);
        this.setStyle('axisDefaults.notes.label.font', defaultFont);
        this.setStyle('axisDefaults.title.font', defaultFont);
        this.setStyle('legend.labels.font', defaultFont);
        this.setStyle('seriesDefaults.labels.font', labelFont);
        this.setStyle('seriesDefaults.notes.label.font', defaultFont);
        this.setStyle('title.font', titleFont);
    }
    setSeriesColors() {
        const element = this.element;
        const series = [].slice.call(element.querySelectorAll('.k-var--series div'));
        const seriesColors = series.reduce((arr, el) => {
            const pos = seriesPos(el.className);
            arr[pos] = window.getComputedStyle(el).backgroundColor;
            return arr;
        }, [] // Will populate the series colors in this array
        );
        this.setStyle('seriesColors', seriesColors);
    }
    mapColor(key, varName) {
        this.setStyle(key, this.queryColor(varName));
    }
    queryColor(varName) {
        return this.queryStyle(varName).backgroundColor;
    }
    queryStyle(varName) {
        const element = this.element;
        return window.getComputedStyle(element.querySelector(`.k-var--${varName}`));
    }
}
ThemeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ThemeService.ctorParameters = () => [
    { type: NgZone }
];
export { ɵ0, ɵ1, ɵ2 };
