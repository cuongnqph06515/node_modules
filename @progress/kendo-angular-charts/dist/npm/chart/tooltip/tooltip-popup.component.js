"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var series_tooltip_template_directive_1 = require("./series-tooltip-template.directive");
var shared_tooltip_template_directive_1 = require("./shared-tooltip-template.directive");
var tooltip_template_point_1 = require("./tooltip-template-point");
var base_tooltip_1 = require("./base-tooltip");
var has_parent_1 = require("../../common/has-parent");
var tooltip_template_service_1 = require("../../common/tooltip-template.service");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var body_factory_1 = require("./body-factory");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var SHARED_TOOLTIP_CLASS = 'k-chart-shared-tooltip';
var TOOLTIP_CLASS = "k-chart-tooltip";
var ɵ0 = body_factory_1.bodyFactory;
exports.ɵ0 = ɵ0;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
var TooltipPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipPopupComponent, _super);
    function TooltipPopupComponent(popupService, templateService, localizationService, ngZone) {
        var _this = _super.call(this, popupService, localizationService) || this;
        _this.popupService = popupService;
        _this.templateService = templateService;
        _this.localizationService = localizationService;
        _this.ngZone = ngZone;
        _this.seriesTooltipContext = {};
        _this.seriesSharedTooltipContext = {};
        _this.animate = true;
        _this.wrapperClass = 'k-chart-tooltip-wrapper';
        _this.leave = new core_1.EventEmitter();
        _this.popupClasses = {};
        return _this;
    }
    TooltipPopupComponent.prototype.show = function (e) {
        var _a;
        this.shared = e.shared;
        this.popupClasses = Object.assign((_a = {},
            _a[SHARED_TOOLTIP_CLASS] = e.shared,
            _a[TOOLTIP_CLASS] = true,
            _a[e.className] = !!e.className,
            _a), this.classNames);
        if (!e.shared) {
            this.seriesTooltipContext = new tooltip_template_point_1.TooltipTemplatePoint(e.point, e.format);
            this.seriesTooltipTemplateRef = this.pointTemplateRef(e.point);
        }
        else {
            this.seriesSharedTooltipTemplateRef = this.templateService.getSharedTemplate()
                || this.defaultSharedTooltipTemplate.templateRef;
            this.seriesSharedTooltipContext = this.sharedTemplateContext(e);
        }
        _super.prototype.show.call(this, e);
    };
    TooltipPopupComponent.prototype.containsElement = function (element) {
        if (this.popupRef) {
            return has_parent_1.hasParent(element, this.popupRef.popupElement);
        }
    };
    TooltipPopupComponent.prototype.sharedTemplateContext = function (e) {
        var points = e.points;
        var nameColumn = points.filter(function (point) { return typeof point.series.name !== 'undefined'; }).length > 0;
        var colorMarker = e.series.length > 1;
        var colspan = 1;
        if (nameColumn) {
            colspan++;
        }
        if (colorMarker) {
            colspan++;
        }
        return {
            category: e.category,
            categoryText: e.categoryText,
            colorMarker: colorMarker,
            colspan: colspan,
            nameColumn: nameColumn,
            points: this.wrapPoints(e.points, e.format)
        };
    };
    TooltipPopupComponent.prototype.pointTemplateRef = function (point) {
        return this.templateService.getTemplate(point.series.index) || this.defaultSeriesTooltipTemplate.templateRef;
    };
    TooltipPopupComponent.prototype.wrapPoints = function (points, format) {
        var result = [];
        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            var template = this.pointTemplateRef(point);
            var pointFormat = ((point.options || {}).tooltip || {}).format || format;
            result.push(new tooltip_template_point_1.TooltipTemplatePoint(point, pointFormat, template));
        }
        return result;
    };
    TooltipPopupComponent.prototype.onInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.mouseleaveSubscription = _this.popupRef.popupElement.addEventListener('mouseleave', function (args) {
                _this.leave.emit(args);
            });
        });
        this.popupRef.popupElement.className += " " + this.wrapperClass;
    };
    TooltipPopupComponent.prototype.hide = function () {
        if (this.mouseleaveSubscription) {
            this.mouseleaveSubscription();
            this.mouseleaveSubscription = null;
        }
        _super.prototype.hide.call(this);
    };
    TooltipPopupComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [kendo_angular_popup_1.PopupService, {
                            provide: kendo_angular_popup_1.POPUP_CONTAINER,
                            useFactory: ɵ0
                        }],
                    selector: 'kendo-chart-tooltip-popup',
                    template: "\n    <ng-template #content>\n        <div [ngClass]=\"popupClasses\" [ngStyle]=\"style\">\n          <ng-template [ngTemplateOutlet]=\"seriesTooltipTemplateRef\" *ngIf=\"!shared\"\n                    [ngTemplateOutletContext]=\"seriesTooltipContext\">\n          </ng-template>\n          <ng-template [ngTemplateOutlet]=\"seriesSharedTooltipTemplateRef\" *ngIf=\"shared\"\n                    [ngTemplateOutletContext]=\"seriesSharedTooltipContext\">\n          </ng-template>\n        </div>\n    </ng-template>\n\n    <ng-template kendoChartSeriesTooltipTemplate let-formattedValue=\"formattedValue\">\n        <span [innerHTML]=\"formattedValue\"></span>\n    </ng-template>\n    <ng-template kendoChartSharedTooltipTemplate let-points=\"points\" let-categoryText=\"categoryText\" let-colspan=\"colspan\" let-colorMarker=\"colorMarker\" let-nameColumn=\"nameColumn\" >\n        <table>\n            <tr><th [attr.colspan]='colspan'> {{ categoryText }} </th></tr>\n            <tr *ngFor=\"let point of points\">\n                <td *ngIf=\"colorMarker\"><span class='k-chart-shared-tooltip-marker' [style.background-color]='point.series.color'></span></td>\n                <td *ngIf=\"nameColumn\">\n                    <ng-container *ngIf=\"point.series.name !== undefined\">{{ point.series.name }}</ng-container>\n                    <ng-container *ngIf=\"point.series.name === undefined\">&nbsp;</ng-container>\n                </td>\n                <td>\n                  <ng-template [ngTemplateOutlet]=\"point.template\"\n                            [ngTemplateOutletContext]=\"point\">\n                  </ng-template>\n                </td>\n            </tr>\n        </table>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TooltipPopupComponent.ctorParameters = function () { return [
        { type: kendo_angular_popup_1.PopupService },
        { type: tooltip_template_service_1.TooltipTemplateService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    TooltipPopupComponent.propDecorators = {
        defaultSeriesTooltipTemplate: [{ type: core_1.ViewChild, args: [series_tooltip_template_directive_1.SeriesTooltipTemplateDirective,] }],
        defaultSharedTooltipTemplate: [{ type: core_1.ViewChild, args: [shared_tooltip_template_directive_1.SharedTooltipTemplateDirective,] }],
        templateRef: [{ type: core_1.ViewChild, args: ['content',] }],
        animate: [{ type: core_1.Input }],
        classNames: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        wrapperClass: [{ type: core_1.Input }],
        leave: [{ type: core_1.Output }]
    };
    return TooltipPopupComponent;
}(base_tooltip_1.BaseTooltip));
exports.TooltipPopupComponent = TooltipPopupComponent;
