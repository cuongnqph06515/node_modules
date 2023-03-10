/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, EventEmitter, ContentChildren, Host, HostBinding, Inject, Input, Optional, Output, QueryList } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { SplitterPaneComponent } from './splitter-pane.component';
import { SplitterService } from './splitter.service';
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
        { type: Component, args: [{
                    exportAs: 'kendoSplitter',
                    selector: 'kendo-splitter',
                    providers: [
                        SplitterService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.spliter'
                        }
                    ],
                    template: "\n      <ng-content select=\"kendo-splitter-pane\"></ng-content>\n      <ng-container *ngFor=\"\n        let pane of panes;\n        let index = index;\n        let last = last;\n      \">\n        <kendo-splitter-bar\n          kendoDraggable\n          *ngIf=\"!last\"\n          [index]=\"index\"\n          [orientation]=\"orientation\">\n        </kendo-splitter-bar>\n      </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SplitterService },
        { type: LocalizationService },
        { type: SplitterPaneComponent, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [SplitterPaneComponent,] }] }
    ]; };
    SplitterComponent.propDecorators = {
        orientation: [{ type: Input }],
        layoutChange: [{ type: Output }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-splitter',] }, { type: HostBinding, args: ['class.k-splitter-flex',] }],
        horizontalHostClasses: [{ type: HostBinding, args: ['class.k-splitter-horizontal',] }],
        verticalHostClasses: [{ type: HostBinding, args: ['class.k-splitter-vertical',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
        panes: [{ type: ContentChildren, args: [SplitterPaneComponent,] }]
    };
    return SplitterComponent;
}());
export { SplitterComponent };
