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
var KForOfContext = /** @class */ (function () {
    function KForOfContext($implicit, kForOf, index, count) {
        this.$implicit = $implicit;
        this.kForOf = kForOf;
        this.index = index;
        this.count = count;
    }
    Object.defineProperty(KForOfContext.prototype, "first", {
        get: function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "last", {
        get: function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "even", {
        get: function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "odd", {
        get: function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return KForOfContext;
}());
export { KForOfContext };
/**
 * @hidden
 */
var KForOf = /** @class */ (function () {
    function KForOf(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    Object.defineProperty(KForOf.prototype, "kForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    KForOf.prototype.ngOnChanges = function (changes) {
        if ('kForOf' in changes) {
            var value = changes.kForOf.currentValue;
            if (this._differ || !value) {
                return;
            }
            try {
                this._differ = this._differs.find(value).create(this.kForTrackBy);
            }
            catch (e) {
                throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'.");
            }
        }
    };
    KForOf.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this.kForOf);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    };
    KForOf.prototype._applyChanges = function (changes) {
        if (!isDocumentAvailable()) {
            return;
        }
        var viewContainerLength = this._viewContainer.length;
        var dataLength = this.kForOf.length;
        var tuples = {};
        changes.forEachOperation(function (record, _, currentIndex) {
            if (currentIndex !== null) {
                tuples[currentIndex] = record.item;
            }
        });
        for (var i = viewContainerLength; i < dataLength; i++) {
            this._viewContainer.createEmbeddedView(this._template, new KForOfContext(null, this.kForOf, -1, -1), i);
        }
        for (var i = this._viewContainer.length; i > dataLength; i--) {
            this._viewContainer.remove(i - 1);
        }
        for (var i = 0; i < this._viewContainer.length; i++) {
            var view = this._viewContainer.get(i);
            view.context.index = i;
            view.context.count = length;
            view.context.$implicit = tuples[i] || null;
        }
    };
    KForOf.decorators = [
        { type: Directive, args: [{ selector: '[kFor][kForOf]' },] },
    ];
    /** @nocollapse */
    KForOf.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TemplateRef },
        { type: IterableDiffers }
    ]; };
    KForOf.propDecorators = {
        kForOf: [{ type: Input }],
        kForTrackBy: [{ type: Input }],
        kForTemplate: [{ type: Input }]
    };
    return KForOf;
}());
export { KForOf };
/**
 * @hidden
 */
export function getTypeNameForDebugging(type) {
    return type.name || typeof type;
}
