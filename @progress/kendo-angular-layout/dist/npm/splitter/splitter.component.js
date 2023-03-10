/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var splitter_pane_component_1 = require("./splitter-pane.component");
var splitter_service_1 = require("./splitter.service");
/**
 * Represents the [Kendo UI Splitter component for Angular]({% slug overview_splitter %}).
 *
 * ```ts-preview
 *
 *  @Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-splitter style="height: 280px;">
 *
 *          <kendo-splitter-pane [collapsible]="true" size="30%">
 *            <h3>Inner splitter / left pane</h3>
 *            <p>Resizable and collapsible.</p>
 *          </kendo-splitter-pane>
 *
 *          <kendo-splitter-pane>
 *            <h3>Inner splitter / center pane</h3>
 *            <p>Resizable only.</p>
 *          </kendo-splitter-pane>
 *
 *          <kendo-splitter-pane [collapsible]="true" size="30%">
 *            <h3>Inner splitter / right pane</h3>
 *            <p>Resizable and collapsible.</p>
 *          </kendo-splitter-pane>
 *
 *        </kendo-splitter>
 *      `,
 *    styles: [ `
 *        h3 { font-size: 1.2em; }
 *        h3, p { margin: 10px; padding: 0; }
 *    ` ]
 *  })
 *  class AppComponent {}
 * ```
 */
var SplitterComponent = /** @class */ (function () {
    function SplitterComponent(element, splitterService, localization, enclosingPane) {
        this.element = element;
        this.splitterService = splitterService;
        this.localization = localization;
        /**
         * Specifies the orientation of the panes within the Splitter.
         * Panes in a horizontal Splitter are placed horizontally.
         * Panes in a vertical Splitter are placed vertically.
         */
        this.orientation = 'horizontal';
        this.ariaRole = 'splitter';
        if (enclosingPane) {
            enclosingPane.containsSplitter = true;
        }
        // the handler only runs in NgZone if there are bound handlers
        // this line merges both streams
        this.layoutChange = this.splitterService.layoutChange;
        this.configure = this.configure.bind(this);
    }
    Object.defineProperty(SplitterComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "horizontalHostClasses", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "verticalHostClasses", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    SplitterComponent.prototype.ngAfterContentInit = function () {
        this.reconfigure();
    };
    SplitterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.orientation && !changes.orientation.isFirstChange()) {
            this.reconfigure();
        }
    };
    SplitterComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeChanges();
    };
    SplitterComponent.prototype.reconfigure = function () {
        this.unsubscribeChanges();
        this.configure();
        this.paneChangesSubscription = this.panes.changes.subscribe(this.configure);
    };
    SplitterComponent.prototype.unsubscribeChanges = function () {
        if (this.paneChangesSubscription) {
            this.paneChangesSubscription.unsubscribe();
            this.paneChangesSubscription = null;
        }
    };
    SplitterComponent.prototype.configure = function () {
        var _this = this;
        this.splitterService.configure({
            panes: this.panes.toArray(),
            orientation: this.orientation,
            containerSize: function () {
                if (_this.orientation === 'vertical') {
                    return _this.element.nativeElement.clientHeight;
                }
                else {
                    return _this.element.nativeElement.clientWidth;
                }
            }
        });
    };
    Object.defineProperty(SplitterComponent.prototype, "direction", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    SplitterComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoSplitter',
                    selector: 'kendo-splitter',
                    providers: [
                        splitter_service_1.SplitterService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.spliter'
                        }
                    ],
                    template: "\n      <ng-content select=\"kendo-splitter-pane\"></ng-content>\n      <ng-container *ngFor=\"\n        let pane of panes;\n        let index = index;\n        let last = last;\n      \">\n        <kendo-splitter-bar\n          kendoDraggable\n          *ngIf=\"!last\"\n          [index]=\"index\"\n          [orientation]=\"orientation\">\n        </kendo-splitter-bar>\n      </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: splitter_service_1.SplitterService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: splitter_pane_component_1.SplitterPaneComponent, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.Inject, args: [splitter_pane_component_1.SplitterPaneComponent,] }] }
    ]; };
    SplitterComponent.propDecorators = {
        orientation: [{ type: core_1.Input }],
        layoutChange: [{ type: core_1.Output }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-splitter',] }, { type: core_1.HostBinding, args: ['class.k-splitter-flex',] }],
        horizontalHostClasses: [{ type: core_1.HostBinding, args: ['class.k-splitter-horizontal',] }],
        verticalHostClasses: [{ type: core_1.HostBinding, args: ['class.k-splitter-vertical',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        ariaRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        panes: [{ type: core_1.ContentChildren, args: [splitter_pane_component_1.SplitterPaneComponent,] }]
    };
    return SplitterComponent;
}());
exports.SplitterComponent = SplitterComponent;
