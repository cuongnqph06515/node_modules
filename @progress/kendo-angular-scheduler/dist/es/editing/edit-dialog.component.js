import { Component, Input, NgZone, ChangeDetectorRef, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { fromEvent } from 'rxjs';
import { isPresent } from '../common/util';
import { EditDialogTemplateDirective } from './edit-dialog-template.directive';
import { MultipleResourceEditorComponent } from './resource-multiple-editor.component';
import { SingleResourceEditorComponent } from './resource-single-editor.component';
import { Keys } from '@progress/kendo-angular-common';
import { filter, take } from 'rxjs/operators';
import { withModifiers, Modifiers } from '../common/modifiers';
import { FocusService } from '../navigation';
import { ZonedDate, toLocalDate } from '@progress/kendo-date-math';
import { toUTCDateTime, formValueOrDefault } from '../views/utils';
/**
 * @hidden
 */
var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(ngZone, editService, localization, changeDetector, element, focusService) {
        var _this = this;
        this.ngZone = ngZone;
        this.editService = editService;
        this.localization = localization;
        this.changeDetector = changeDetector;
        this.element = element;
        this.focusService = focusService;
        this.resources = [];
        this.timezone = 'Etc/UTC';
        this.setTimeZone = false;
        this.setSeparateStartEndTimeZones = false;
        this.subs = this.editService.changed.subscribe(function () {
            _this.ngZone.run(function () { _this.onChange(); });
        });
        this.subs.add(fromEvent(this.element.nativeElement, 'keydown')
            .pipe(filter(function () { return _this.isActive; }))
            .subscribe(function (e) {
            if (e.keyCode === Keys.Escape) {
                _this.reset();
            }
            if (e.keyCode === Keys.Enter && (withModifiers(e, Modifiers.CtrlKey) || withModifiers(e, Modifiers.MetaKey))) {
                _this.onSave(e);
            }
            e.stopPropagation();
        }));
    }
    Object.defineProperty(EditDialogComponent.prototype, "isEditingSeries", {
        get: function () {
            return this.editMode === 2 /* Series */ && Boolean(this.formGroup.get(this.fields.recurrenceRule));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "eventTimezone", {
        get: function () {
            return formValueOrDefault(this.formGroup, this.fields.startTimezone, this.timezone);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "endTimezone", {
        get: function () {
            return formValueOrDefault(this.formGroup, this.fields.endTimezone, this.eventTimezone);
        },
        enumerable: true,
        configurable: true
    });
    EditDialogComponent.prototype.onChange = function () {
        var _this = this;
        this.changeDetector.markForCheck();
        if (this.editService.hasNewEvent) {
            this.editMode = 2 /* Series */;
            this.formGroup = this.editService.context.formGroup;
            this.isNew = true;
            this.applyLocalTimezone();
        }
        else if (this.editService.isEditing()) {
            var _a = this.editService.context, dataItem = _a.dataItem, mode = _a.mode;
            this.formGroup = this.editService.context.formGroup;
            this.isNew = false;
            this.editedEvent = dataItem;
            this.editMode = isPresent(mode) ? mode : 2 /* Series */;
            this.applyLocalTimezone();
        }
        else {
            this.reset();
            return;
        }
        if (!this.editTemplate) {
            this.addTimeZoneCheckboxesToFormGroup();
            this.subscribeToFormGroupChanges();
        }
        if (isPresent(this.formGroup)) {
            this.recurrenceStart = this.formGroup.get(this.fields.start).value;
        }
        this.ngZone.onStable.pipe(take(1)).subscribe(function () {
            _this.titleInput.nativeElement.select();
        });
        this.isActive = true;
    };
    EditDialogComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    EditDialogComponent.prototype.onCancel = function (e) {
        e.preventDefault();
        this.onClose();
        this.changeDetector.markForCheck();
    };
    EditDialogComponent.prototype.onSave = function (e) {
        e.preventDefault();
        this.applyTimezone();
        this.editService.save();
        this.changeDetector.markForCheck();
    };
    EditDialogComponent.prototype.onClose = function () {
        this.editService.endEdit();
        this.changeDetector.markForCheck();
        this.focusService.focus();
    };
    Object.defineProperty(EditDialogComponent.prototype, "hasAllDay", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.isAllDay));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "hasStartTimeZone", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.startTimezone));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "isStartTimeZoneVisible", {
        get: function () {
            return this.formGroup && this.formGroup.get('startTimezoneCheckbox').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "hasEndTimeZone", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.endTimezone));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "isEndTimeZoneVisible", {
        get: function () {
            return this.formGroup && this.formGroup.get('endTimezoneCheckbox').value;
        },
        enumerable: true,
        configurable: true
    });
    EditDialogComponent.prototype.getFormValue = function (field) {
        if (field) {
            return this.formGroup.get(field);
        }
    };
    EditDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    EditDialogComponent.prototype.onResourceClick = function (resource) {
        var resourceEditors = resource.multiple ? this.multipleResourceEditors : this.singleResourceEditors;
        var currentEditor = resourceEditors.filter(function (editor) { return editor.resource.field === resource.field; }).pop();
        if (currentEditor) {
            currentEditor.focus();
        }
    };
    EditDialogComponent.prototype.reset = function () {
        this.isActive = false;
        this.setTimeZone = false;
        this.setSeparateStartEndTimeZones = false;
        this.removeTimeZoneCheckboxesFromFormGroup();
        this.focusService.focus();
    };
    EditDialogComponent.prototype.addTimeZoneCheckboxesToFormGroup = function () {
        if (isPresent(this.formGroup)) {
            var startField = this.fields.startTimezone;
            this.formGroup.addControl('startTimezoneCheckbox', new FormControl(this.formGroup.contains(startField) &&
                this.formGroup.get(startField).value));
            var endField = this.fields.endTimezone;
            this.formGroup.addControl('endTimezoneCheckbox', new FormControl(this.formGroup.contains(endField) &&
                this.formGroup.get(endField).value));
        }
    };
    EditDialogComponent.prototype.removeTimeZoneCheckboxesFromFormGroup = function () {
        if (isPresent(this.formGroup)) {
            this.formGroup.removeControl('startTimezoneCheckbox');
            this.formGroup.removeControl('endTimezoneCheckbox');
        }
    };
    EditDialogComponent.prototype.subscribeToFormGroupChanges = function () {
        var _this = this;
        if (isPresent(this.formGroup)) {
            var fields_1 = this.fields;
            this.formGroup.get('startTimezoneCheckbox').valueChanges.subscribe(function (isTrue) {
                if (!isTrue) {
                    _this.formGroup.get(fields_1.startTimezone).setValue(null, { emitEvent: false });
                    _this.formGroup.get(fields_1.endTimezone).setValue(null, { emitEvent: false });
                    _this.formGroup.get('endTimezoneCheckbox').setValue(false, { emitEvent: false });
                }
            });
            this.formGroup.get('endTimezoneCheckbox').valueChanges.subscribe(function (isTrue) {
                if (!isTrue) {
                    _this.formGroup.get(fields_1.endTimezone).setValue(null, { emitEvent: false });
                }
            });
            this.formGroup.get(fields_1.start).valueChanges.subscribe(function (newStart) {
                _this.recurrenceStart = newStart;
            });
        }
    };
    /**
     * Converts the event dates to "display dates" that look like the original date in its time zone.
     * The result does not represent the same moment in time and must be converted back to local dates.
     */
    EditDialogComponent.prototype.applyLocalTimezone = function () {
        var fields = this.fields;
        var start = this.readDateAsLocal(fields.start, this.eventTimezone);
        var end = this.readDateAsLocal(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    };
    /**
     * Converts the "display dates" used by the editors back to local dates that represent the true moment in time.
     */
    EditDialogComponent.prototype.applyTimezone = function () {
        var fields = this.fields;
        var start = this.readDateWithTimezone(fields.start, this.eventTimezone);
        var end = this.readDateWithTimezone(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    };
    EditDialogComponent.prototype.readDateWithTimezone = function (field, timezone) {
        var value = this.formGroup.get(field).value;
        return ZonedDate.fromUTCDate(toUTCDateTime(value), timezone).toLocalDate();
    };
    EditDialogComponent.prototype.readDateAsLocal = function (field, timezone) {
        var value = this.formGroup.get(field).value;
        return toLocalDate(ZonedDate.fromLocalDate(value, timezone).toUTCDate());
    };
    EditDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-edit-dialog',
                    template: "\n        <kendo-dialog (close)='onClose()' [minWidth]='700' *ngIf='isActive' title='{{ textFor(\"editorTitle\") }}' class='k-scheduler-edit-dialog'>\n            <ng-container *ngIf='!editTemplate'>\n                <div class='k-scheduler-edit-form'>\n                    <div class='k-edit-form-container'>\n                        <form novalidate [formGroup]='formGroup'>\n                            <div class='k-edit-label'>\n                                <label for='k-event-title'>{{ textFor('editorEventTitle') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <input #title id='k-event-title' class='k-textbox' placeholder='Title' [formControl]='formGroup.get(fields.title)' />\n                            </div>\n\n                            <div class='k-edit-label'>\n                                <label (click)=\"startDateTimePicker.focus()\">{{ textFor('editorEventStart') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <kendo-scheduler-datetime-picker #startDateTimePicker [formControl]='formGroup.get(fields.start)'\n                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>\n                                </kendo-scheduler-datetime-picker>\n                            </div>\n\n                            <ng-container *ngIf=\"isStartTimeZoneVisible\">\n                                <div class='k-edit-label'>\n                                    <label (click)=\"startTzPicker.focus()\">{{ textFor('editorEventStartTimeZone') }}</label>\n                                </div>\n\n                                <div class='k-edit-field'>\n                                    <kendo-timezone-editor #startTzPicker [formControl]='formGroup.get(fields.startTimezone)'></kendo-timezone-editor>\n                                </div>\n                            </ng-container>\n\n                            <div class='k-edit-label'>\n                                <label (click)=\"endDateTimePicker.focus()\">{{ textFor('editorEventEnd') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <kendo-scheduler-datetime-picker #endDateTimePicker [formControl]='formGroup.get(fields.end)'\n                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>\n                                </kendo-scheduler-datetime-picker>\n                            </div>\n\n                            <ng-container *ngIf=\"isEndTimeZoneVisible\">\n                                <div class='k-edit-label'>\n                                    <label (click)=\"endTzPicker.focus()\">{{ textFor('editorEventEndTimeZone') }}</label>\n                                </div>\n\n                                <div class='k-edit-field'>\n                                    <kendo-timezone-editor #endTzPicker [formControl]='formGroup.get(fields.endTimezone)'></kendo-timezone-editor>\n                                </div>\n                            </ng-container>\n\n                            <div class='k-edit-field' *ngIf=\"hasAllDay\">\n                                <input type='checkbox' id='k-is-allday-chkbox' class='k-checkbox' [formControl]='formGroup.get(fields.isAllDay)' />\n                                <label class='k-checkbox-label' for='k-is-allday-chkbox'>{{ textFor('editorEventAllDay') }}</label>\n                            </div>\n\n                            <div class='k-edit-field' *ngIf=\"hasStartTimeZone\">\n                                <input type='checkbox' id='k-set-timezone' class='k-checkbox'\n                                formControlName='startTimezoneCheckbox' />\n                                <label class='k-checkbox-label' for='k-set-timezone'>{{ textFor('editorEventTimeZone') }}</label>\n\n                                <ng-container *ngIf=\"isStartTimeZoneVisible && hasEndTimeZone\">\n                                    <input type='checkbox' id='k-use-separate' class='k-checkbox' formControlName='endTimezoneCheckbox' />\n                                    <label class='k-checkbox-label' for='k-use-separate'>{{ textFor('editorEventSeparateTimeZones') }}</label>\n                                </ng-container>\n                            </div>\n\n                            <ng-container *ngIf=\"isEditingSeries\">\n                                <kendo-recurrence-editor\n                                    [formControl]='formGroup.get(fields.recurrenceRule)'\n                                    [start]='recurrenceStart'\n                                    [timezone]='eventTimezone'\n                                ></kendo-recurrence-editor>\n                            </ng-container>\n\n                            <ng-container *ngIf='getFormValue(fields.description)'>\n                                <div class='k-edit-label'>\n                                    <label for='k-event-description'>{{ textFor('editorEventDescription') }}</label>\n                                </div>\n                                <div class='k-edit-field'>\n                                    <textarea id='k-event-description' class='k-textbox' [formControl]='formGroup.get(fields.description)'></textarea>\n                                </div>\n                            </ng-container>\n\n                            <ng-container *ngFor='let resource of resources'>\n                                <ng-container *ngIf='getFormValue(resource.field)'>\n                                    <div class='k-edit-label'>\n                                        <label (click)=\"onResourceClick(resource)\">\n                                            {{ resource.name ? resource.name : resource.field }}\n                                        </label>\n                                    </div>\n                                    <div class='k-edit-field'>\n                                        <kendo-multiple-resource-editor\n                                            *ngIf='resource.multiple'\n                                            [formControl]='formGroup.get(resource.field)'\n                                            [resource]='resource'>\n                                        </kendo-multiple-resource-editor>\n                                        <kendo-single-resource-editor\n                                            *ngIf='!resource.multiple'\n                                            [formControl]='formGroup.get(resource.field)'\n                                            [resource]='resource'>\n                                        </kendo-single-resource-editor>\n                                    </div>\n                                </ng-container>\n                            </ng-container>\n                        </form>\n                    </div>\n                </div>\n            </ng-container>\n\n            <ng-container *ngIf='editTemplate'>\n                <form novalidate [formGroup]='formGroup'>\n                    <ng-container [ngTemplateOutlet]='editTemplate.templateRef'\n                        [ngTemplateOutletContext]=\"{\n                            $implicit: formGroup,\n                            formGroup: formGroup,\n                            dataItem: editedEvent,\n                            editMode: editMode,\n                            isNew: isNew\n                        }\">\n                    </ng-container>\n                </form>\n            </ng-container>\n\n            <kendo-dialog-actions>\n                <button class=\"k-button\" (click)=\"onCancel($event)\">{{ textFor('cancel') }}</button>\n                <button class=\"k-button k-primary\" (click)=\"onSave($event)\" [disabled]=\"!formGroup.valid\">{{ textFor('save') }}</button>\n            </kendo-dialog-actions>\n        </kendo-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    EditDialogComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: EditService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FocusService }
    ]; };
    EditDialogComponent.propDecorators = {
        multipleResourceEditors: [{ type: ViewChildren, args: [MultipleResourceEditorComponent,] }],
        singleResourceEditors: [{ type: ViewChildren, args: [SingleResourceEditorComponent,] }],
        titleInput: [{ type: ViewChild, args: ['title',] }],
        resources: [{ type: Input }],
        timezone: [{ type: Input }],
        fields: [{ type: Input }],
        editTemplate: [{ type: Input }]
    };
    return EditDialogComponent;
}());
export { EditDialogComponent };
