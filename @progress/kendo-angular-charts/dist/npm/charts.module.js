"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chart_module_1 = require("./chart.module");
var stock_chart_module_1 = require("./stock-chart.module");
var sparkline_module_1 = require("./sparkline.module");
/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes all Chart components and directives.
 *
 * Imports the ChartsModule into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Charts components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartsModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartsModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var ChartsModule = /** @class */ (function () {
    function ChartsModule() {
    }
    ChartsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [chart_module_1.ChartModule, sparkline_module_1.SparklineModule, stock_chart_module_1.StockChartModule]
                },] },
    ];
    return ChartsModule;
}());
exports.ChartsModule = ChartsModule;
