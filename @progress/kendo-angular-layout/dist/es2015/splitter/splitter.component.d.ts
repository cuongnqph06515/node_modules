/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, AfterContentInit, QueryList } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Orientation } from '../common/orientation';
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
export declare class SplitterComponent implements AfterContentInit {
    protected element: ElementRef;
    protected splitterService: SplitterService;
    private localization;
    /**
     * Specifies the orientation of the panes within the Splitter.
     * Panes in a horizontal Splitter are placed horizontally.
     * Panes in a vertical Splitter are placed vertically.
     */
    orientation: Orientation;
    /**
     * Fires after a Splitter pane is resized or collapsed.
     * Useful for triggering layout calculations on components
     * which are positioned inside the panes.
     */
    layoutChange: EventEmitter<string>;
    readonly hostClasses: boolean;
    readonly horizontalHostClasses: boolean;
    readonly verticalHostClasses: boolean;
    readonly dir: string;
    ariaRole: string;
    /**
     * @hidden
     */
    panes: QueryList<SplitterPaneComponent>;
    private paneChangesSubscription;
    constructor(element: ElementRef, splitterService: SplitterService, localization: LocalizationService, enclosingPane?: SplitterPaneComponent);
    ngAfterContentInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private reconfigure;
    private unsubscribeChanges;
    private configure;
    private readonly direction;
}
