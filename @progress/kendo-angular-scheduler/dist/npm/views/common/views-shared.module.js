"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var view_footer_component_1 = require("./view-footer.component");
var work_hours_footer_directive_1 = require("./work-hours-footer.directive");
var repeat_pipe_1 = require("./repeat.pipe");
var resource_iterator_pipe_1 = require("./resource-iterator.pipe");
var hint_container_component_1 = require("./hint-container.component");
var resize_hint_component_1 = require("./resize-hint.component");
var shared_module_1 = require("../../shared.module");
var DECLARATIONS = [
    view_footer_component_1.ViewFooterComponent,
    work_hours_footer_directive_1.WorkHoursFooterDirective,
    repeat_pipe_1.RepeatPipe,
    resource_iterator_pipe_1.ResourceIteratorPipe,
    hint_container_component_1.HintContainerComponent,
    resize_hint_component_1.ResizeHintComponent
];
/**
 * @hidden
 */
var ViewsSharedModule = /** @class */ (function () {
    function ViewsSharedModule() {
    }
    ViewsSharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, kendo_angular_intl_1.IntlModule, shared_module_1.SharedModule],
                    exports: [
                        DECLARATIONS,
                        kendo_angular_intl_1.IntlModule,
                        common_1.CommonModule,
                        shared_module_1.SharedModule
                    ],
                    declarations: [
                        DECLARATIONS
                    ]
                },] },
    ];
    return ViewsSharedModule;
}());
exports.ViewsSharedModule = ViewsSharedModule;
