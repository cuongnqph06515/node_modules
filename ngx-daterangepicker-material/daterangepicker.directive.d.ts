import { ViewContainerRef, ComponentFactoryResolver, ElementRef, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers, EventEmitter, Renderer2 } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import * as _moment from 'moment';
import { LocaleConfig } from './daterangepicker.config';
import { LocaleService } from './locale.service';
export declare class DaterangepickerDirective implements OnInit, OnChanges, DoCheck {
    viewContainerRef: ViewContainerRef;
    _changeDetectorRef: ChangeDetectorRef;
    private _componentFactoryResolver;
    private _el;
    private _renderer;
    private differs;
    private _localeService;
    private elementRef;
    picker: DaterangepickerComponent;
    private _onChange;
    private _onTouched;
    private _validatorChange;
    private _value;
    private localeDiffer;
    minDate: _moment.Moment;
    maxDate: _moment.Moment;
    autoApply: boolean;
    alwaysShowCalendars: boolean;
    showCustomRangeLabel: boolean;
    linkedCalendars: boolean;
    dateLimit: number;
    singleDatePicker: boolean;
    showWeekNumbers: boolean;
    showISOWeekNumbers: boolean;
    showDropdowns: boolean;
    isInvalidDate: Function;
    isCustomDate: Function;
    isTooltipDate: Function;
    showClearButton: boolean;
    customRangeDirection: boolean;
    ranges: any;
    opens: string;
    drops: string;
    firstMonthDayClass: string;
    lastMonthDayClass: string;
    emptyWeekRowClass: string;
    firstDayOfNextMonthClass: string;
    lastDayOfPreviousMonthClass: string;
    keepCalendarOpeningWithRange: boolean;
    showRangeLabelOnInput: boolean;
    showCancel: boolean;
    lockStartDate: boolean;
    timePicker: Boolean;
    timePicker24Hour: Boolean;
    timePickerIncrement: number;
    timePickerSeconds: Boolean;
    closeOnAutoApply: boolean;
    _locale: LocaleConfig;
    locale: any;
    private _endKey;
    private _startKey;
    startKey: any;
    endKey: any;
    notForChangesProperty: Array<string>;
    value: any;
    onChange: EventEmitter<Object>;
    rangeClicked: EventEmitter<Object>;
    datesUpdated: EventEmitter<Object>;
    startDateChanged: EventEmitter<Object>;
    endDateChanged: EventEmitter<Object>;
    constructor(viewContainerRef: ViewContainerRef, _changeDetectorRef: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver, _el: ElementRef, _renderer: Renderer2, differs: KeyValueDiffers, _localeService: LocaleService, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    onBlur(): void;
    open(event?: any): void;
    hide(e?: any): void;
    toggle(e?: any): void;
    clear(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private setValue;
    /**
     * Set position of the calendar
     */
    setPosition(): void;
    inputChanged(e: any): void;
    /**
     * For click outside of the calendar's container
     * @param event event object
     */
    outsideClick(event: any): void;
}
