"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var scrollview_component_1 = require("./scrollview.component");
var scrollview_pager_component_1 = require("./scrollview-pager.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var DECLARATIONS = [
    scrollview_component_1.ScrollViewComponent,
    scrollview_pager_component_1.ScrollViewPagerComponent
];
var EXPORTS = [
    scrollview_component_1.ScrollViewComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ScrollView component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ScrollView module
 * import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ScrollViewModule], // import ScrollView module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ScrollViewModule = /** @class */ (function () {
    function ScrollViewModule() {
    }
    ScrollViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [DECLARATIONS],
                    exports: [EXPORTS],
                    imports: [common_1.CommonModule, kendo_angular_common_1.DraggableModule]
                },] },
    ];
    return ScrollViewModule;
}());
exports.ScrollViewModule = ScrollViewModule;
