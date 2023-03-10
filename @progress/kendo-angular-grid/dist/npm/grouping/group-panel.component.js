/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var utils_1 = require("../utils");
var group_info_service_1 = require("./group-info.service");
var drop_target_directive_1 = require("../dragdrop/drop-target.directive");
var drag_hint_service_1 = require("../dragdrop/drag-hint.service");
var drop_cue_service_1 = require("../dragdrop/drop-cue.service");
var common_1 = require("../dragdrop/common");
var operators_1 = require("rxjs/operators");
var withoutField = function (_a) {
    var field = _a.field;
    return utils_1.isNullOrEmptyString(field);
};
var ɵ0 = withoutField;
exports.ɵ0 = ɵ0;
var alreadyGrouped = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.some(function (group) { return group.field === field; });
};
var ɵ1 = alreadyGrouped;
exports.ɵ1 = ɵ1;
var overSameTarget = function (_a) {
    var target = _a.target, field = _a.field;
    return target.field === field;
};
var ɵ2 = overSameTarget;
exports.ɵ2 = ɵ2;
var overLastTarget = function (_a) {
    var target = _a.target;
    return target.lastTarget;
};
var ɵ3 = overLastTarget;
exports.ɵ3 = ɵ3;
var isLastGroup = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.map(function (group) { return group.field; }).indexOf(field) === groups.length - 1;
};
var ɵ4 = isLastGroup;
exports.ɵ4 = ɵ4;
var isNotGroupable = function (groupsService) { return function (_a) {
    var field = _a.field;
    return !groupsService.isGroupable(field);
}; };
var ɵ5 = isNotGroupable;
exports.ɵ5 = ɵ5;
var columnRules = function (groupService) { return utils_1.or(withoutField, alreadyGrouped, isNotGroupable(groupService)); };
var ɵ6 = columnRules;
exports.ɵ6 = ɵ6;
var indicatorRules = utils_1.or(overSameTarget, utils_1.and(overLastTarget, isLastGroup));
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
        this.change = new core_1.EventEmitter();
        this.groups = [];
        this.dropTargets = new core_1.QueryList();
        this.groupTitles = [];
        this.subscription = new rxjs_1.Subscription();
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
        this.subscription.add(utils_1.observe(this.dropTargets)
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
        this.targetSubscription = new rxjs_1.Subscription();
        var enterStream = this.dropTargets
            .reduce(function (acc, target) { return rxjs_1.merge(acc, target.enter); }, rxjs_1.from([]));
        var leaveStream = this.dropTargets
            .reduce(function (acc, target) { return rxjs_1.merge(acc, target.leave); }, rxjs_1.from([]));
        var dropStream = this.dropTargets
            .reduce(function (acc, target) { return rxjs_1.merge(acc, target.drop); }, rxjs_1.from([]));
        this.targetSubscription.add(enterStream.pipe(operators_1.tap(function (_) { return _this.hint.removeLock(); }), operators_1.filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable.context, target.context);
        }), operators_1.tap(this.enter.bind(this)), operators_1.switchMapTo(dropStream.pipe(operators_1.takeUntil(leaveStream.pipe(operators_1.tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    };
    GroupPanelComponent.prototype.enter = function (_a) {
        var draggable = _a.draggable, target = _a.target;
        this.hint.enable();
        var before = target.context.lastTarget || common_1.isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(common_1.position(target.element.nativeElement, before));
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-grid-group-panel',
                    template: "\n        <ng-template [ngIf]=\"groups.length === 0\">\n            <div\n                class=\"k-indicator-container\"\n                [context]=\"{\n                    lastTarget: true\n                }\"\n                kendoDropTarget>\n                {{ text }}\n            </div>\n        </ng-template>\n        <div *ngFor=\"let group of groups; let index = index;\"\n            class=\"k-indicator-container\"\n            [context]=\"{\n                field: group.field\n            }\"\n            kendoDropTarget>\n            <div\n                kendoDraggableColumn\n                [enableDrag]=\"true\"\n                [context]=\"{\n                    field: group.field,\n                    type: 'groupIndicator',\n                    hint:  groupTitles[index]\n                }\"\n                kendoGroupIndicator\n                kendoDraggable\n                [group]=\"group\"\n                [groupTitle]=\"groupTitles[index]\"\n                (directionChange)=\"directionChange($event)\"\n                (remove)=\"remove($event)\">\n            </div>\n        </div>\n        <div class=\"k-indicator-container\"\n            *ngIf=\"groups.length !== 0\"\n            [context]=\"{\n                lastTarget: true\n            }\"\n            kendoDropTarget>&nbsp;</div>\n    "
                },] },
    ];
    /** @nocollapse */
    GroupPanelComponent.ctorParameters = function () { return [
        { type: drag_hint_service_1.DragHintService },
        { type: drop_cue_service_1.DropCueService },
        { type: group_info_service_1.GroupInfoService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    GroupPanelComponent.propDecorators = {
        change: [{ type: core_1.Output }],
        groupHeaderClass: [{ type: core_1.HostBinding, args: ["class.k-grouping-header",] }, { type: core_1.HostBinding, args: ["class.k-grouping-header-flex",] }],
        text: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        dropTargets: [{ type: core_1.ViewChildren, args: [drop_target_directive_1.DropTargetDirective,] }]
    };
    return GroupPanelComponent;
}());
exports.GroupPanelComponent = GroupPanelComponent;
