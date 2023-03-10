import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RecurrenceService, Frequency } from './recurrence.service';
/**
 * @hidden
 */
export declare const RECURRENCE_VALUE_ACCESSOR: any;
/**
 * Represents the Kendo UI Recurrence Editor component for Angular.
 */
export declare class RecurrenceEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private recurrenceService;
    cssClass: boolean;
    /**
     * Specifies the start date of the event.
     */
    start: Date;
    /**
     * Specifies the id of the timezone that will be used.
     */
    timezone: string;
    /**
     * Fires when the value of the component has changed.
     */
    valueChange: EventEmitter<string>;
    private _start;
    private subscriptions;
    constructor(recurrenceService: RecurrenceService);
    /**
     * @hidden
     */
    readonly currentFreq: Frequency;
    /**
     * @hidden
     */
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    writeValue(rrule: any): void;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    private emitChange;
}
