import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { chartBaseTheme } from '@progress/kendo-charts';
import { chartDefaultTheme } from './chart-default-theme';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
var font = function (style) { return style.fontSize + " " + style.fontFamily; };
var ɵ0 = font;
var letterPos = function (letter) { return letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0); };
var ɵ1 = letterPos;
var seriesPos = function (name) { return letterPos(name.match(/series-([a-z])$/)[1]); };
var ɵ2 = seriesPos;
var template = "\n    <div class=\"k-var--accent\"></div>\n    <div class=\"k-var--accent-contrast\"></div>\n    <div class=\"k-var--base\"></div>\n    <div class=\"k-var--background\"></div>\n\n    <div class=\"k-var--normal-background\"></div>\n    <div class=\"k-var--normal-text-color\"></div>\n    <div class=\"k-var--hover-background\"></div>\n    <div class=\"k-var--hover-text-color\"></div>\n    <div class=\"k-var--selected-background\"></div>\n    <div class=\"k-var--selected-text-color\"></div>\n    <div class=\"k-var--chart-error-bars-background\"></div>\n    <div class=\"k-var--chart-notes-background\"></div>\n    <div class=\"k-var--chart-notes-border\"></div>\n    <div class=\"k-var--chart-notes-lines\"></div>\n    <div class=\"k-var--chart-crosshair-background\"></div>\n\n    <div class=\"k-var--chart-inactive\"></div>\n    <div class=\"k-var--chart-major-lines\"></div>\n    <div class=\"k-var--chart-minor-lines\"></div>\n    <div class=\"k-var--chart-area-opacity\"></div>\n\n    <div class=\"k-widget\">\n        <div class=\"k-var--chart-font\"></div>\n        <div class=\"k-var--chart-title-font\"></div>\n        <div class=\"k-var--chart-label-font\"></div>\n    </div>\n\n    <div class=\"k-var--series\">\n      <div class=\"k-var--series-a\"></div>\n      <div class=\"k-var--series-b\"></div>\n      <div class=\"k-var--series-c\"></div>\n      <div class=\"k-var--series-d\"></div>\n      <div class=\"k-var--series-e\"></div>\n      <div class=\"k-var--series-f\"></div>\n    </div>\n";
/**
 * @hidden
 */
var ThemeService = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeService, _super);
    function ThemeService(ngZone) {
        var _this = _super.call(this, ngZone) || this;
        _this.loaded = false;
        return _this;
    }
    ThemeService.prototype.loadTheme = function () {
        if (this.loaded || !isDocumentAvailable()) {
            return;
        }
        if (!this.readTheme()) {
            this.readDefaultTheme();
        }
        this.loaded = true;
        this.next();
    };
    ThemeService.prototype.readTheme = function () {
        this.createElement();
        var available = this.queryColor('accent') !==
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
    };
    ThemeService.prototype.readDefaultTheme = function () {
        this.push(chartDefaultTheme());
    };
    ThemeService.prototype.createElement = function () {
        var container = this.element = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
    };
    ThemeService.prototype.destroyElement = function () {
        if (this.element) {
            document.body.removeChild(this.element);
            this.element = undefined;
        }
    };
    ThemeService.prototype.setStyle = function (key, value) {
        this.set(key, value);
    };
    ThemeService.prototype.setColors = function () {
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
        var opacity = parseFloat(this.queryStyle('chart-area-opacity').opacity);
        if (!isNaN(opacity)) {
            this.setStyle('seriesDefaults.area.opacity', opacity);
            this.setStyle('seriesDefaults.labels.opacity', opacity);
        }
    };
    ThemeService.prototype.setFonts = function () {
        var defaultFont = font(this.queryStyle('chart-font'));
        var titleFont = font(this.queryStyle('chart-title-font'));
        var labelFont = font(this.queryStyle('chart-label-font'));
        this.setStyle('axisDefaults.labels.font', labelFont);
        this.setStyle('axisDefaults.notes.label.font', defaultFont);
        this.setStyle('axisDefaults.title.font', defaultFont);
        this.setStyle('legend.labels.font', defaultFont);
        this.setStyle('seriesDefaults.labels.font', labelFont);
        this.setStyle('seriesDefaults.notes.label.font', defaultFont);
        this.setStyle('title.font', titleFont);
    };
    ThemeService.prototype.setSeriesColors = function () {
        var element = this.element;
        var series = [].slice.call(element.querySelectorAll('.k-var--series div'));
        var seriesColors = series.reduce(function (arr, el) {
            var pos = seriesPos(el.className);
            arr[pos] = window.getComputedStyle(el).backgroundColor;
            return arr;
        }, [] // Will populate the series colors in this array
        );
        this.setStyle('seriesColors', seriesColors);
    };
    ThemeService.prototype.mapColor = function (key, varName) {
        this.setStyle(key, this.queryColor(varName));
    };
    ThemeService.prototype.queryColor = function (varName) {
        return this.queryStyle(varName).backgroundColor;
    };
    ThemeService.prototype.queryStyle = function (varName) {
        var element = this.element;
        return window.getComputedStyle(element.querySelector(".k-var--" + varName));
    };
    ThemeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ThemeService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ThemeService;
}(ConfigurationService));
export { ThemeService };
export { ɵ0, ɵ1, ɵ2 };
