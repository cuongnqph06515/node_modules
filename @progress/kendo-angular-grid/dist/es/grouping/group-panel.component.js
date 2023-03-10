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
var withoutField = function (_a) {
    var field = _a.field;
    return isNullOrEmptyString(field);
};
var ɵ0 = withoutField;
var alreadyGrouped = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.some(function (group) { return group.field === field; });
};
var ɵ1 = alreadyGrouped;
var overSameTarget = function (_a) {
    var target = _a.target, field = _a.field;
    return target.field === field;
};
var ɵ2 = overSameTarget;
var overLastTarget = function (_a) {
    var target = _a.target;
    return target.lastTarget;
};
var ɵ3 = overLastTarget;
var isLastGroup = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.map(function (group) { return group.field; }).indexOf(field) === groups.length - 1;
};
var ɵ4 = isLastGroup;
var isNotGroupable = function (groupsService) { return function (_a) {
    var field = _a.field;
    return !groupsService.isGroupable(field);
}; };
var ɵ5 = isNotGroupable;
var columnRules = function (groupService) { return or(withoutField, alreadyGrouped, isNotGroupable(groupService)); };
var ɵ6 = columnRules;
var indicatorRules = or(overSameTarget, and(overLastTarget, isLastGroup));
/**
 * @hidden
 */
var GroupPanelComponent = /** @class */ (function () {
    function GroupPanelComponent(hint, cue, groupInfoService, localization, cd) {
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
    Object.defineProperty(GroupPanelComponent.prototype, "groupHeaderClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupPanelComponent.prototype, "text", {
        get: function () {
            return this.emptyText ? this.emptyText : this.localization.get('groupPanelEmpty');
        },
        set: function (value) {
            this.emptyText = value;
        },
        enumerable: true,
        configurable: true
    });
    GroupPanelComponent.prototype.ngAfterViewInit = function () {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    };
    GroupPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    GroupPanelComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var currentTitles = this.groups.map(function (group) { return _this.groupInfoService.groupTitle(group); });
        if (currentTitles.length !== this.groupTitles.length || currentTitles.some(function (current, idx) { return current !== _this.groupTitles[idx]; })) {
            this.groupTitles = currentTitles;
            this.cd.markForCheck();
        }
    };
    GroupPanelComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
    };
    GroupPanelComponent.prototype.directionChange = function (group) {
        var index = this.groups.findIndex(function (x) { return x.field === group.field; });
        var groups = this.groups.slice(0, index).concat([group], this.groups.slice(index + 1));
        this.change.emit(groups);
    };
    GroupPanelComponent.prototype.insert = function (field, index) {
        var groups = this.groups.filter(function (x) { return x.field !== field; });
        if (groups.length || this.groups.length === 0) {
            this.change.emit(groups.slice(0, index).concat([{ field: field }], groups.slice(index)));
        }
    };
    GroupPanelComponent.prototype.remove = function (group) {
        this.change.emit(this.groups.filter(function (x) { return x.field !== group.field; }));
    };
    GroupPanelComponent.prototype.canDrop = function (draggable, target) {
        var isIndicator = draggable.type === 'groupIndicator';
        var rules = isIndicator
            ? indicatorRules
            : columnRules(this.groupInfoService);
        return !rules({
            field: draggable.field,
            groups: this.groups,
            target: target
        });
    };
    GroupPanelComponent.prototype.attachTargets = function () {
        var _this = this;
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        var enterStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.enter); }, from([]));
        var leaveStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.leave); }, from([]));
        var dropStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.drop); }, from([]));
        this.targetSubscription.add(enterStream.pipe(tap(function (_) { return _this.hint.removeLock(); }), filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable.context, target.context);
        }), tap(this.enter.bind(this)), switchMapTo(dropStream.pipe(takeUntil(leaveStream.pipe(tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    };
    GroupPanelComponent.prototype.enter = function (_a) {
        var draggable = _a.draggable, target = _a.target;
        this.hint.enable();
        var before = target.context.lastTarget || isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    };
    GroupPanelComponent.prototype.leave = function () {
        this.hint.disable();
        this.cue.hide();
    };
    GroupPanelComponent.prototype.drop = function (_a) {
        var target = _a.target, draggable = _a.draggable;
        var field = draggable.context.field;
        var index = this.dropTargets.toArray().indexOf(target);
        this.insert(field, index);
    };
    GroupPanelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-grid-group-panel',
                    template: "\n        <ng-template [ngIf]=\"groups.length === 0\">\n            <div\n                class=\"k-indicator-container\"\n                [context]=\"{\n                    lastTarget: true\n                }\"\n                kendoDropTarget>\n                {{ text }}\n            </div>\n        </ng-template>\n        <div *ngFor=\"let group of groups; let index = index;\"\n            class=\"k-indicator-container\"\n            [context]=\"{\n                field: group.field\n            }\"\n            kendoDropTarget>\n            <div\n                kendoDraggableColumn\n                [enableDrag]=\"true\"\n                [context]=\"{\n                    field: group.field,\n                    type: 'groupIndicator',\n                    hint:  groupTitles[index]\n                }\"\n                kendoGroupIndicator\n                kendoDraggable\n                [group]=\"group\"\n                [groupTitle]=\"groupTitles[index]\"\n                (directionChange)=\"directionChange($event)\"\n                (remove)=\"remove($event)\">\n            </div>\n        </div>\n        <div class=\"k-indicator-container\"\n            *ngIf=\"groups.length !== 0\"\n            [context]=\"{\n                lastTarget: true\n            }\"\n            kendoDropTarget>&nbsp;</div>\n    "
                },] },
    ];
    /** @nocollapse */
    GroupPanelComponent.ctorParameters = function () { return [
        { type: DragHintService },
        { type: DropCueService },
        { type: GroupInfoService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    GroupPanelComponent.propDecorators = {
        change: [{ type: Output }],
        groupHeaderClass: [{ type: HostBinding, args: ["class.k-grouping-header",] }, { type: HostBinding, args: ["class.k-grouping-header-flex",] }],
        text: [{ type: Input }],
        groups: [{ type: Input }],
        dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
    };
    return GroupPanelComponent;
}());
export { GroupPanelComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
