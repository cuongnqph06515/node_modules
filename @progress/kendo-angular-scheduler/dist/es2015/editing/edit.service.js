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
export class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(debounceTime(0));
    }
    endEdit() {
        const formGroup = this.hasNewEvent ? this.newEventGroup.group : this.editedEvent.formGroup;
        this.changes.emit({ action: 'cancel', formGroup });
    }
    removeEvent(dataItem) {
        this.changes.emit({ action: 'remove', dataItem });
    }
    addEvent(formGroup) {
        this.newEventGroup = { formGroup };
        this.onChanged();
    }
    editEvent(dataItem, formGroup = undefined, mode) {
        this.editedEvent = { dataItem, formGroup, mode };
        this.onChanged();
    }
    close() {
        this.newEventGroup = this.editedEvent = null;
        this.onChanged();
    }
    save() {
        const { dataItem, formGroup } = this.context;
        this.changes.emit({
            action: 'save',
            dataItem,
            formGroup,
            isNew: this.hasNewEvent,
            mode: this.occurrenceEditMode
        });
    }
    isEditing() {
        return isPresent(this.context);
    }
    get occurrenceEditMode() {
        if (this.hasNewEvent) {
            return 2 /* Series */;
        }
        else {
            return this.editedEvent.mode || 0 /* Event */;
        }
    }
    get hasNewEvent() {
        return isPresent(this.newEventGroup);
    }
    get newEvent() {
        if (this.hasNewEvent) {
            return this.newEventGroup.group.value;
        }
        return {};
    }
    get context() {
        if (this.hasNewEvent) {
            return this.newEventGroup;
        }
        return this.editedEvent;
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];
