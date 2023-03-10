/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:directive-class-suffix directive-selector */
import { Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class KForOfContext {
    constructor($implicit, kForOf, index, count) {
        this.$implicit = $implicit;
        this.kForOf = kForOf;
        this.index = index;
        this.count = count;
    }
    get first() { return this.index === 0; }
    get last() { return this.index === this.count - 1; }
    get even() { return this.index % 2 === 0; }
    get odd() { return !this.even; }
}
/**
 * @hidden
 */
export class KForOf {
    constructor(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    set kForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    ngOnChanges(changes) {
        if ('kForOf' in changes) {
            const value = changes.kForOf.currentValue;
            if (this._differ || !value) {
                return;
            }
            try {
                this._differ = this._differs.find(value).create(this.kForTrackBy);
            }
            catch (e) {
                throw new Error(`Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'.`);
            }
        }
    }
    ngDoCheck() {
        if (this._differ) {
            const changes = this._differ.diff(this.kForOf);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    }
    _applyChanges(changes) {
        if (!isDocumentAvailable()) {
            return;
        }
        const viewContainerLength = this._viewContainer.length;
        const dataLength = this.kForOf.length;
        const tuples = {};
        changes.forEachOperation((record, _, currentIndex) => {
            if (currentIndex !== null) {
                tuples[currentIndex] = record.item;
            }
        });
        for (let i = viewContainerLength; i < dataLength; i++) {
            this._viewContainer.createEmbeddedView(this._template, new KForOfContext(null, this.kForOf, -1, -1), i);
        }
        for (let i = this._viewContainer.length; i > dataLength; i--) {
            this._viewContainer.remove(i - 1);
        }
        for (let i = 0; i < this._viewContainer.length; i++) {
            const view = this._viewContainer.get(i);
            view.context.index = i;
            view.context.count = length;
            view.context.$implicit = tuples[i] || null;
        }
    }
}
KForOf.decorators = [
    { type: Directive, args: [{ selector: '[kFor][kForOf]' },] },
];
/** @nocollapse */
KForOf.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: IterableDiffers }
];
KForOf.propDecorators = {
    kForOf: [{ type: Input }],
    kForTrackBy: [{ type: Input }],
    kForTemplate: [{ type: Input }]
};
/**
 * @hidden
 */
export function getTypeNameForDebugging(type) {
    return type.name || typeof type;
}
