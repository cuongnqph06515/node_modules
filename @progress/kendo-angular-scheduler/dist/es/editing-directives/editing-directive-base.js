import { Input, Output, EventEmitter } from '@angular/core';
import { merge } from 'rxjs';
import { LocalEditService } from './local-edit.service';
import { AddEvent } from '../events';
import { groupResources, assignValues, clone, setField, getField } from '../common/util';
import { diff, areEqual, seriesDate } from './utils';
/**
 * @hidden
 */
var EditingDirectiveBase = /** @class */ (function () {
    function EditingDirectiveBase(scheduler, localDataChangesService, dialogsService) {
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
    Object.defineProperty(EditingDirectiveBase.prototype, "editService", {
        get: function () {
            return this.userEditService || this.defaultEditService;
        },
        /**
         * The edit service that will handle the editing operations.
         */
        set: function (value) {
            this.userEditService = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnInit = function () {
        this.subscriptions = merge(this.scheduler.slotDblClick, this.scheduler.create).subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.scheduler.removeConfirmed.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.scheduler.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.scheduler.resizeEndConfirmed.subscribe(this.resizeEndHandler.bind(this)));
        this.subscriptions.add(this.scheduler.dragEndConfirmed.subscribe(this.dragEndHandler.bind(this)));
    };
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    EditingDirectiveBase.prototype.createDefaultService = function () {
        return new LocalEditService(this.scheduler, this.localDataChangesService);
    };
    EditingDirectiveBase.prototype.addHandler = function (args) {
        this.closeEditor();
        if (!this.isEnabled('add')) {
            return;
        }
        var fields = this.scheduler.modelFields;
        var dataItem = {};
        setField(dataItem, fields.start, args.start);
        setField(dataItem, fields.end, args.end);
        setField(dataItem, fields.isAllDay, args.isAllDay);
        setField(dataItem, fields.title, args.title);
        var resources = groupResources(this.scheduler.group, this.scheduler.resources);
        var slotResources = args.resources;
        for (var idx = 0; idx < resources.length; idx++) {
            var resource = resources[idx];
            var value = getField(slotResources[idx], resource.valueField);
            setField(dataItem, resource.field, resource.multiple ? [value] : value);
        }
        var addArgs = new AddEvent(this.scheduler, { dataItem: dataItem });
        this.add.emit(addArgs);
        if (!addArgs.isDefaultPrevented()) {
            this.scheduler.addEvent(this.createModel({
                action: 'add',
                isNew: true,
                dataItem: dataItem
            }));
        }
    };
    EditingDirectiveBase.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        if (!this.isEnabled('remove')) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(1 /* Remove */)
                .subscribe(function (editMode) {
                if (editMode !== undefined) {
                    _this.handleRemove(dataItem, editMode);
                }
            });
        }
        else {
            this.dialogsService.openRemoveConfirmationDialog()
                .subscribe(function (shouldRemove) {
                if (shouldRemove) {
                    _this.handleRemove(dataItem, 0 /* Event */);
                }
            });
        }
    };
    EditingDirectiveBase.prototype.cancelHandler = function () {
        this.closeEditor();
    };
    EditingDirectiveBase.prototype.closeEditor = function () {
        this.scheduler.closeEvent();
    };
    EditingDirectiveBase.prototype.handleUpdate = function (item, value, mode) {
        var svc = this.editService;
        if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.update(item, value) :
                svc.createException(item, value);
        }
        else {
            // Item is not recurring or we're editing the entire series
            svc.update(item, value);
        }
    };
    EditingDirectiveBase.prototype.handleRemove = function (item, mode) {
        var svc = this.editService;
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
    };
    EditingDirectiveBase.prototype.resizeEndHandler = function (_a) {
        var _this = this;
        var event = _a.event, start = _a.start, end = _a.end;
        if (areEqual(start, event.start) && areEqual(end, event.end)) {
            return;
        }
        var dataItem = event.dataItem;
        var fields = this.scheduler.modelFields;
        var value = {};
        setField(value, fields.start, start);
        setField(value, fields.end, end);
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe(function (result) {
                var target = dataItem;
                if (result === 2 /* Series */) {
                    target = _this.editService.findRecurrenceMaster(dataItem);
                    setField(value, fields.start, seriesDate(target, dataItem, value, fields.start));
                    setField(value, fields.end, seriesDate(target, dataItem, value, fields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                _this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    };
    EditingDirectiveBase.prototype.dragEndHandler = function (_a) {
        var _this = this;
        var dataItem = _a.event.dataItem, start = _a.start, end = _a.end, resources = _a.resources, isAllDay = _a.isAllDay;
        var modelFields = this.scheduler.modelFields;
        var resourceFields = groupResources(this.scheduler.group, this.scheduler.resources).map(function (r) { return r.field; });
        var fields = [modelFields.start, modelFields.end, modelFields.isAllDay].concat(resourceFields);
        var value = clone(resources);
        setField(value, modelFields.start, start);
        setField(value, modelFields.end, end);
        setField(value, modelFields.isAllDay, isAllDay);
        if (!diff(dataItem, value, fields)) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe(function (result) {
                var target = dataItem;
                if (result === 2 /* Series */) {
                    target = _this.editService.findRecurrenceMaster(dataItem);
                    setField(value, modelFields.start, seriesDate(target, dataItem, value, modelFields.start));
                    setField(value, modelFields.end, seriesDate(target, dataItem, value, modelFields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                _this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    };
    EditingDirectiveBase.prototype.isEnabled = function (action) {
        var editable = this.scheduler.editable;
        return editable && editable[action] !== false;
    };
    EditingDirectiveBase.propDecorators = {
        add: [{ type: Output }],
        edit: [{ type: Output }],
        editService: [{ type: Input }]
    };
    return EditingDirectiveBase;
}());
export { EditingDirectiveBase };
