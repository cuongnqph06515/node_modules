/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy, QueryList, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { GroupInfoService } from './group-info.service';
import { DropTargetDirective } from '../dragdrop/drop-target.directive';
import { DragHintService } from '../dragdrop/drag-hint.service';
import { DropCueService } from '../dragdrop/drop-cue.service';
import { DragAndDropContext } from '../dragdrop/context-types';
/**
 * @hidden
 */
export declare class GroupPanelComponent implements OnDestroy, OnInit, DoCheck {
    private hint;
    private cue;
    groupInfoService: GroupInfoService;
    private localization;
    private cd;
    change: EventEmitter<GroupDescriptor[]>;
    readonly groupHeaderClass: boolean;
    text: string;
    groups: GroupDescriptor[];
    dropTargets: QueryList<DropTargetDirective>;
    groupTitles: string[];
    private emptyText;
    private subscription;
    private targetSubscription;
    constructor(hint: DragHintService, cue: DropCueService, groupInfoService: GroupInfoService, localization: LocalizationService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    directionChange(group: GroupDescriptor): void;
    insert(field: string, index: number): void;
    remove(group: GroupDescriptor): void;
    canDrop(draggable: DragAndDropContext, target: DragAndDropContext): boolean;
    private attachTargets;
    private enter;
    private leave;
    private drop;
}
