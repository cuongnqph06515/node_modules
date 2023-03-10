import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { ThemeService } from './common/theme.service';
import { CHART_DIRECTIVES } from './chart.directives';
/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the Chart component and directives.
 *
 * Imports the ChartModule into your application
 * [root module]({{ site.data.url.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Chart component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
export class ChartModule {
}
ChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CHART_DIRECTIVES],
                exports: [CHART_DIRECTIVES],
                imports: [CommonModule, PopupModule, ResizeSensorModule],
                providers: [
                    ThemeService
                ]
            },] },
];
