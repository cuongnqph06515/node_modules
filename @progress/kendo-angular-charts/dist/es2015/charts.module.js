import { NgModule } from '@angular/core';
import { ChartModule } from './chart.module';
import { StockChartModule } from './stock-chart.module';
import { SparklineModule } from './sparkline.module';
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
export class ChartsModule {
}
ChartsModule.decorators = [
    { type: NgModule, args: [{
                exports: [ChartModule, SparklineModule, StockChartModule]
            },] },
];
