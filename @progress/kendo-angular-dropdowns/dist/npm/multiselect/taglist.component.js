/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tag_template_directive_1 = require("../common/templates/tag-template.directive");
var group_tag_template_directive_1 = require("../common/templates/group-tag-template.directive");
var util_1 = require("../common/util");
/**
 * @hidden
 */
var TagListComponent = /** @class */ (function () {
    function TagListComponent() {
        this.removeTag = new core_1.EventEmitter();
    }
    TagListComponent.prototype.tagProp = function (tag, prop) {
        return prop && util_1.isObject(tag) ? tag[prop] : tag;
    };
    TagListComponent.prototype.deleteTag = function (event, tag) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!this.disabled && event.which === 1) {
            this.removeTag.emit(tag);
        }
    };
    TagListComponent.prototype.itemId = function (tag) {
        if (tag) { //because of custom values
            return this.tagPrefix + "-" + this.tagProp(tag, this.valueField);
        }
    };
    TagListComponent.prototype.isGroupTag = function (tag) {
        return tag instanceof Array;
    };
    TagListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-taglist',
                    template: "\n        <ul [attr.id]=\"id\" class=\"k-reset\">\n            <li role=\"option\" *ngFor=\"let tag of tags; let i = index;\" aria-selected=\"true\" [attr.aria-setsize]=\"tags?.length\"\n                class=\"k-button\" [ngClass]=\"{ 'k-state-focused': i === focused }\" [attr.id]=\"itemId(tag)\"\n            >\n                <ng-template *ngIf=\"isGroupTag(tag); then groupTag else singleTag\"></ng-template>\n                    <ng-template #groupTag>\n                        <span>\n                            <ng-template *ngIf=\"groupTemplate\"\n                                [templateContext]=\"{\n                                templateRef: groupTemplate.templateRef,\n                                $implicit: tag\n                            }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!groupTemplate\">{{ tag.length }} {{ tag.length === 1 ? 'item' : 'items' }} selected</ng-template>\n                        </span>\n                    </ng-template>\n                    <ng-template #singleTag>\n                        <span>\n                        <ng-template *ngIf=\"template\"\n                                [templateContext]=\"{\n                                templateRef: template.templateRef,\n                                $implicit: tag\n                            }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!template\">{{ tagProp(tag, textField) }}</ng-template>\n                        </span>\n                    </ng-template>\n\n                <span aria-label=\"delete\" [attr.aria-hidden]=\"i !== focused\" class=\"k-select\">\n                    <span class=\"k-icon k-i-close\" (mousedown)=\"deleteTag($event, tag)\">\n                    </span>\n                </span>\n            </li>\n        </ul>\n  "
                },] },
    ];
    TagListComponent.propDecorators = {
        tags: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        valueField: [{ type: core_1.Input }],
        focused: [{ type: core_1.Input }],
        template: [{ type: core_1.Input }],
        groupTemplate: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        tagPrefix: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        removeTag: [{ type: core_1.Output }]
    };
    return TagListComponent;
}());
exports.TagListComponent = TagListComponent;
