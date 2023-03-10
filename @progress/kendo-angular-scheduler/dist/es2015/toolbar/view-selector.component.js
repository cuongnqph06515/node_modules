import { Component, HostBinding } from '@angular/core';
import { ToolbarService } from './toolbar.service';
/**
 * A toolbar component which contains the controls for switching the views
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the view-selection buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export class ToolbarViewSelectorComponent {
    constructor(service) {
        this.service = service;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.expanded = false;
    }
    /**
     * @hidden
     */
    get ctx() {
        return this.service.context;
    }
    /**
     * @hidden
     */
    get itemDisplay() {
        if (this.ctx.views && this.ctx.views.length === 1) {
            return 'list-item';
        }
    }
    /**
     * @hidden
     */
    onClick(view) {
        if (this.ctx.selectedView !== view) {
            this.service.navigate({
                type: 'view-change',
                view: view
            });
        }
        this.expanded = false;
        return false;
    }
    /**
     * @hidden
     */
    onCurrentViewClick(e) {
        this.expanded = !this.expanded;
        return false;
    }
    /**
     * @hidden
     */
    isSelected(view) {
        return this.ctx.selectedView === view;
    }
}
ToolbarViewSelectorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerToolbarViewSelector]',
                template: `
        <li class="k-current-view" *ngIf="ctx.views?.length > 1">
            <a role="button" href="#" class="k-link" tabindex="-1" (click)="onCurrentViewClick($event)">
                {{ ctx.selectedView?.title }}
            </a>
        </li>
        <li *ngFor="let view of ctx.views"
            [class.k-state-selected]="isSelected(view)" [ngStyle]="{ display: itemDisplay }"
         >
            <a role="button" href="#" class="k-link" tabindex="-1" (click)="onClick(view)">
                {{ view.title }}
            </a>
        </li>
    `
            },] },
];
/** @nocollapse */
ToolbarViewSelectorComponent.ctorParameters = () => [
    { type: ToolbarService }
];
ToolbarViewSelectorComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-views',] }, { type: HostBinding, args: ['class.k-reset',] }],
    expanded: [{ type: HostBinding, args: ['class.k-state-expanded',] }]
};
