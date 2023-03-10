import { Input, Output, EventEmitter } from '@angular/core';
import { merge } from 'rxjs';
import { LocalEditService } from './local-edit.service';
import { AddEvent } from '../events';
import { groupResources, assignValues, clone, setField, getField } from '../common/util';
import { diff, areEqual, seriesDate } from './utils';
/**
 * @hidden
 */
export class EditingDirectiveBase {
    constructor(scheduler, localDataChangesService, dialogsService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
        this.dialogsService = dialogsService;
        /**
         * Fires before the editing directive renders the **Add** dialog.
         */
        this.add = new EventEmitter();
        /**
         * Fires before the editing directive renders the **Edit** dialog.
         */
        this.edit = new EventEmitter();
        this.defaultTitle = 'No title';
        this.defaultEditService = this.createDefaultService();
        this.scheduler.editable = true;
    }
    /**
     * The edit service that will handle the editing operations.
     */
    set editService(value) {
        this.userEditService = value;
    }
    get editService() {
        return this.userEditService || this.defaultEditService;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = merge(this.scheduler.slotDblClick, this.scheduler.create).subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.scheduler.removeConfirmed.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.scheduler.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.scheduler.resizeEndConfirmed.subscribe(this.resizeEndHandler.bind(this)));
        this.subscriptions.add(this.scheduler.dragEndConfirmed.subscribe(this.dragEndHandler.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    createDefaultService() {
        return new LocalEditService(this.scheduler, this.localDataChangesService);
    }
    addHandler(args) {
        this.closeEditor();
        if (!this.isEnabled('add')) {
            return;
        }
        const fields = this.scheduler.modelFields;
        const dataItem = {};
        setField(dataItem, fields.start, args.start);
        setField(dataItem, fields.end, args.end);
        setField(dataItem, fields.isAllDay, args.isAllDay);
        setField(dataItem, fields.title, args.title);
        const resources = groupResources(this.scheduler.group, this.scheduler.resources);
        const slotResources = args.resources;
        for (let idx = 0; idx < resources.length; idx++) {
            const resource = resources[idx];
            const value = getField(slotResources[idx], resource.valueField);
            setField(dataItem, resource.field, resource.multiple ? [value] : value);
        }
        const addArgs = new AddEvent(this.scheduler, { dataItem });
        this.add.emit(addArgs);
        if (!addArgs.isDefaultPrevented()) {
            this.scheduler.addEvent(this.createModel({
                action: 'add',
                isNew: true,
                dataItem
            }));
        }
    }
    removeHandler({ dataItem }) {
        if (!this.isEnabled('remove')) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(1 /* Remove */)
                .subscribe((editMode) => {
                if (editMode !== undefined) {
                    this.handleRemove(dataItem, editMode);
                }
            });
        }
        else {
            this.dialogsService.openRemoveConfirmationDialog()
                .subscribe((shouldRemove) => {
                if (shouldRemove) {
                    this.handleRemove(dataItem, 0 /* Event */);
                }
            });
        }
    }
    cancelHandler() {
        this.closeEditor();
    }
    closeEditor() {
        this.scheduler.closeEvent();
    }
    handleUpdate(item, value, mode) {
        const svc = this.editService;
        if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.update(item, value) :
                svc.createException(item, value);
        }
        else {
            // Item is not recurring or we're editing the entire series
            svc.update(item, value);
        }
    }
    handleRemove(item, mode) {
        const svc = this.editService;
        if (mode === 2 /* Series */) {
            svc.removeSeries(item);
        }
        else if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.remove(item) :
                svc.removeOccurrence(item);
        }
        else {
            // Item is not recurring
            svc.remove(item);
        }
    }
    resizeEndHandler({ event, start, end }) {
        if (areEqual(start, event.start) && areEqual(end, event.end)) {
            return;
        }
        const dataItem = event.dataItem;
        const fields = this.scheduler.modelFields;
        let value = {};
        setField(value, fields.start, start);
        setField(value, fields.end, end);
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe((result) => {
                let target = dataItem;
                if (result === 2 /* Series */) {
                    target = this.editService.findRecurrenceMaster(dataItem);
                    setField(value, fields.start, seriesDate(target, dataItem, value, fields.start));
                    setField(value, fields.end, seriesDate(target, dataItem, value, fields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    }
    dragEndHandler({ event: { dataItem }, start, end, resources, isAllDay }) {
        const modelFields = this.scheduler.modelFields;
        const resourceFields = groupResources(this.scheduler.group, this.scheduler.resources).map(r => r.field);
        const fields = [modelFields.start, modelFields.end, modelFields.isAllDay].concat(resourceFields);
        let value = clone(resources);
        setField(value, modelFields.start, start);
        setField(value, modelFields.end, end);
        setField(value, modelFields.isAllDay, isAllDay);
        if (!diff(dataItem, value, fields)) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe((result) => {
                let target = dataItem;
                if (result === 2 /* Series */) {
                    target = this.editService.findRecurrenceMaster(dataItem);
                    setField(value, modelFields.start, seriesDate(target, dataItem, value, modelFields.start));
                    setField(value, modelFields.end, seriesDate(target, dataItem, value, modelFields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    }
    isEnabled(action) {
        const editable = this.scheduler.editable;
        return editable && editable[action] !== false;
    }
}
EditingDirectiveBase.propDecorators = {
    add: [{ type: Output }],
    edit: [{ type: Output }],
    editService: [{ type: Input }]
};
