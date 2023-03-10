/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Subscription, from, merge } from "rxjs";
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { and, isNullOrEmptyString, observe, or } from '../utils';
import { GroupInfoService } from './group-info.service';
import { DropTargetDirective } from '../dragdrop/drop-target.directive';
import { DragHintService } from '../dragdrop/drag-hint.service';
import { DropCueService } from '../dragdrop/drop-cue.service';
import { position, isTargetBefore } from '../dragdrop/common';
import { tap, filter, switchMapTo, takeUntil } from 'rxjs/operators';
const withoutField = ({ field }) => isNullOrEmptyString(field);
const ɵ0 = withoutField;
const alreadyGrouped = ({ groups, field }) => groups.some(group => group.field === field);
const ɵ1 = alreadyGrouped;
const overSameTarget = ({ target, field }) => target.field === field;
const ɵ2 = overSameTarget;
const overLastTarget = ({ target }) => target.lastTarget;
const ɵ3 = overLastTarget;
const isLastGroup = ({ groups, field }) => groups.map(group => group.field).indexOf(field) === groups.length - 1;
const ɵ4 = isLastGroup;
const isNotGroupable = (groupsService) => ({ field }) => !groupsService.isGroupable(field);
const ɵ5 = isNotGroupable;
const columnRules = (groupService) => or(withoutField, alreadyGrouped, isNotGroupable(groupService));
const ɵ6 = columnRules;
const indicatorRules = or(overSameTarget, and(overLastTarget, isLastGroup));
/**
 * @hidden
 */
export class GroupPanelComponent {
    constructor(hint, cue, groupInfoService, localization, cd) {
        this.hint = hint;
        this.cue = cue;
        this.groupInfoService = groupInfoService;
        this.localization = localization;
        this.cd = cd;
        this.change = new EventEmitter();
        this.groups = [];
        this.dropTargets = new QueryList();
        this.groupTitles = [];
        this.subscription = new Subscription();
    }
    get groupHeaderClass() {
        return true;
    }
    set text(value) {
        this.emptyText = value;
    }
    get text() {
        return this.emptyText ? this.emptyText : this.localization.get('groupPanelEmpty');
    }
    ngAfterViewInit() {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    }
    ngOnInit() {
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngDoCheck() {
        const currentTitles = this.groups.map(group => this.groupInfoService.groupTitle(group));
        if (currentTitles.length !== this.groupTitles.length || currentTitles.some((current, idx) => current !== this.groupTitles[idx])) {
            this.groupTitles = currentTitles;
            this.cd.markForCheck();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
    }
    directionChange(group) {
        const index = this.groups.findIndex(x => x.field === group.field);
        const groups = [...this.groups.slice(0, index), group, ...this.groups.slice(index + 1)];
        this.change.emit(groups);
    }
    insert(field, index) {
        const groups = this.groups.filter(x => x.field !== field);
        if (groups.length || this.groups.length === 0) {
            this.change.emit([...groups.slice(0, index), { field: field }, ...groups.slice(index)]);
        }
    }
    remove(group) {
        this.change.emit(this.groups.filter(x => x.field !== group.field));
    }
    canDrop(draggable, target) {
        const isIndicator = draggable.type === 'groupIndicator';
        const rules = isIndicator
            ? indicatorRules
            : columnRules(this.groupInfoService);
        return !rules({
            field: draggable.field,
            groups: this.groups,
            target
        });
    }
    attachTargets() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        const enterStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.enter), from([]));
        const leaveStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.leave), from([]));
        const dropStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.drop), from([]));
        this.targetSubscription.add(enterStream.pipe(tap(_ => this.hint.removeLock()), filter(({ draggable, target }) => this.canDrop(draggable.context, target.context)), tap(this.enter.bind(this)), switchMapTo(dropStream.pipe(takeUntil(leaveStream.pipe(tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    }
    enter({ draggable, target }) {
        this.hint.enable();
        let before = target.context.lastTarget || isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    }
    leave() {
        this.hint.disable();
        this.cue.hide();
    }
    drop({ target, draggable }) {
        const field = draggable.context.field;
        const index = this.dropTargets.toArray().indexOf(target);
        this.insert(field, index);
    }
}
GroupPanelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-grid-group-panel',
                template: `
        <ng-template [ngIf]="groups.length === 0">
            <div
                class="k-indicator-container"
                [context]="{
                    lastTarget: true
                }"
                kendoDropTarget>
                {{ text }}
            </div>
        </ng-template>
        <div *ngFor="let group of groups; let index = index;"
            class="k-indicator-container"
            [context]="{
                field: group.field
            }"
            kendoDropTarget>
            <div
                kendoDraggableColumn
                [enableDrag]="true"
                [context]="{
                    field: group.field,
                    type: 'groupIndicator',
                    hint:  groupTitles[index]
                }"
                kendoGroupIndicator
                kendoDraggable
                [group]="group"
                [groupTitle]="groupTitles[index]"
                (directionChange)="directionChange($event)"
                (remove)="remove($event)">
            </div>
        </div>
        <div class="k-indicator-container"
            *ngIf="groups.length !== 0"
            [context]="{
                lastTarget: true
            }"
            kendoDropTarget>&nbsp;</div>
    `
            },] },
];
/** @nocollapse */
GroupPanelComponent.ctorParameters = () => [
    { type: DragHintService },
    { type: DropCueService },
    { type: GroupInfoService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
GroupPanelComponent.propDecorators = {
    change: [{ type: Output }],
    groupHeaderClass: [{ type: HostBinding, args: ["class.k-grouping-header",] }, { type: HostBinding, args: ["class.k-grouping-header-flex",] }],
    text: [{ type: Input }],
    groups: [{ type: Input }],
    dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
