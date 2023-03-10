import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isPresent } from '../common/util';
// const toSimilarDate = (date: ZonedDate): Date => new Date(
//     date.getFullYear(), date.getMonth(), date.getDay(),
//     date.getHours(), date.getMinutes(), date.getSeconds(),
//     date.getMilliseconds()
//   );
// const toUTCDateTime = (localDate: Date): Date => new Date(Date.UTC(
//       localDate.getFullYear(),
//       localDate.getMonth(),
//       localDate.getDate(),
//       localDate.getHours(),
//       localDate.getMinutes(),
//       localDate.getSeconds(),
//       localDate.getMilliseconds()
//     ));
/**
 * @hidden
 */
var EditService = /** @class */ (function () {
    function EditService(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(debounceTime(0));
    }
    EditService.prototype.endEdit = function () {
        var formGroup = this.hasNewEvent ? this.newEventGroup.group : this.editedEvent.formGroup;
        this.changes.emit({ action: 'cancel', formGroup: formGroup });
    };
    EditService.prototype.removeEvent = function (dataItem) {
        this.changes.emit({ action: 'remove', dataItem: dataItem });
    };
    EditService.prototype.addEvent = function (formGroup) {
        this.newEventGroup = { formGroup: formGroup };
        this.onChanged();
    };
    EditService.prototype.editEvent = function (dataItem, formGroup, mode) {
        if (formGroup === void 0) { formGroup = undefined; }
        this.editedEvent = { dataItem: dataItem, formGroup: formGroup, mode: mode };
        this.onChanged();
    };
    EditService.prototype.close = function () {
        this.newEventGroup = this.editedEvent = null;
        this.onChanged();
    };
    EditService.prototype.save = function () {
        var _a = this.context, dataItem = _a.dataItem, formGroup = _a.formGroup;
        this.changes.emit({
            action: 'save',
            dataItem: dataItem,
            formGroup: formGroup,
            isNew: this.hasNewEvent,
            mode: this.occurrenceEditMode
        });
    };
    EditService.prototype.isEditing = function () {
        return isPresent(this.context);
    };
    Object.defineProperty(EditService.prototype, "occurrenceEditMode", {
        get: function () {
            if (this.hasNewEvent) {
                return 2 /* Series */;
            }
            else {
                return this.editedEvent.mode || 0 /* Event */;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "hasNewEvent", {
        get: function () {
            return isPresent(this.newEventGroup);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "newEvent", {
        get: function () {
            if (this.hasNewEvent) {
                return this.newEventGroup.group.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "context", {
        get: function () {
            if (this.hasNewEvent) {
                return this.newEventGroup;
            }
            return this.editedEvent;
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.onChanged = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.changedSource.next();
        });
    };
    EditService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return EditService;
}());
export { EditService };
