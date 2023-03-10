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
export class SplitterComponent {
    constructor(element, splitterService, localization, enclosingPane) {
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
    get hostClasses() {
        return true;
    }
    get horizontalHostClasses() {
        return this.orientation === 'horizontal';
    }
    get verticalHostClasses() {
        return this.orientation === 'vertical';
    }
    get dir() {
        return this.direction;
    }
    ngAfterContentInit() {
        this.reconfigure();
    }
    ngOnChanges(changes) {
        if (changes.orientation && !changes.orientation.isFirstChange()) {
            this.reconfigure();
        }
    }
    ngOnDestroy() {
        this.unsubscribeChanges();
    }
    reconfigure() {
        this.unsubscribeChanges();
        this.configure();
        this.paneChangesSubscription = this.panes.changes.subscribe(this.configure);
    }
    unsubscribeChanges() {
        if (this.paneChangesSubscription) {
            this.paneChangesSubscription.unsubscribe();
            this.paneChangesSubscription = null;
        }
    }
    configure() {
        this.splitterService.configure({
            panes: this.panes.toArray(),
            orientation: this.orientation,
            containerSize: () => {
                if (this.orientation === 'vertical') {
                    return this.element.nativeElement.clientHeight;
                }
                else {
                    return this.element.nativeElement.clientWidth;
                }
            }
        });
    }
    get direction() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
}
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
                template: `
      <ng-content select="kendo-splitter-pane"></ng-content>
      <ng-container *ngFor="
        let pane of panes;
        let index = index;
        let last = last;
      ">
        <kendo-splitter-bar
          kendoDraggable
          *ngIf="!last"
          [index]="index"
          [orientation]="orientation">
        </kendo-splitter-bar>
      </ng-container>
    `
            },] },
];
/** @nocollapse */
SplitterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: SplitterService },
    { type: LocalizationService },
    { type: SplitterPaneComponent, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [SplitterPaneComponent,] }] }
];
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
