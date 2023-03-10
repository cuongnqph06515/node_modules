/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TagTemplateDirective } from '../common/templates/tag-template.directive';
import { GroupTagTemplateDirective } from '../common/templates/group-tag-template.directive';
import { isObject } from '../common/util';
/**
 * @hidden
 */
export class TagListComponent {
    constructor() {
        this.removeTag = new EventEmitter();
    }
    tagProp(tag, prop) {
        return prop && isObject(tag) ? tag[prop] : tag;
    }
    deleteTag(event, tag) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!this.disabled && event.which === 1) {
            this.removeTag.emit(tag);
        }
    }
    itemId(tag) {
        if (tag) { //because of custom values
            return this.tagPrefix + "-" + this.tagProp(tag, this.valueField);
        }
    }
    isGroupTag(tag) {
        return tag instanceof Array;
    }
}
TagListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-taglist',
                template: `
        <ul [attr.id]="id" class="k-reset">
            <li role="option" *ngFor="let tag of tags; let i = index;" aria-selected="true" [attr.aria-setsize]="tags?.length"
                class="k-button" [ngClass]="{ 'k-state-focused': i === focused }" [attr.id]="itemId(tag)"
            >
                <ng-template *ngIf="isGroupTag(tag); then groupTag else singleTag"></ng-template>
                    <ng-template #groupTag>
                        <span>
                            <ng-template *ngIf="groupTemplate"
                                [templateContext]="{
                                templateRef: groupTemplate.templateRef,
                                $implicit: tag
                            }">
                            </ng-template>
                            <ng-template [ngIf]="!groupTemplate">{{ tag.length }} {{ tag.length === 1 ? 'item' : 'items' }} selected</ng-template>
                        </span>
                    </ng-template>
                    <ng-template #singleTag>
                        <span>
                        <ng-template *ngIf="template"
                                [templateContext]="{
                                templateRef: template.templateRef,
                                $implicit: tag
                            }">
                            </ng-template>
                            <ng-template [ngIf]="!template">{{ tagProp(tag, textField) }}</ng-template>
                        </span>
                    </ng-template>

                <span aria-label="delete" [attr.aria-hidden]="i !== focused" class="k-select">
                    <span class="k-icon k-i-close" (mousedown)="deleteTag($event, tag)">
                    </span>
                </span>
            </li>
        </ul>
  `
            },] },
];
TagListComponent.propDecorators = {
    tags: [{ type: Input }],
    textField: [{ type: Input }],
    valueField: [{ type: Input }],
    focused: [{ type: Input }],
    template: [{ type: Input }],
    groupTemplate: [{ type: Input }],
    disabled: [{ type: Input }],
    tagPrefix: [{ type: Input }],
    id: [{ type: Input }],
    removeTag: [{ type: Output }]
};
