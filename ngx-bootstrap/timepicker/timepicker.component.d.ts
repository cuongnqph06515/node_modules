import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlValueAccessorModel } from './models';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { TimepickerConfig } from './timepicker.config';
import { TimeChangeSource, TimepickerComponentState, TimepickerControls } from './timepicker.models';
import * as ɵngcc0 from '@angular/core';
export declare const TIMEPICKER_CONTROL_VALUE_ACCESSOR: ControlValueAccessorModel;
export declare class TimepickerComponent implements ControlValueAccessor, TimepickerComponentState, TimepickerControls, OnChanges, OnDestroy {
    private _cd;
    private _store;
    private _timepickerActions;
    /** hours change step */
    hourStep: number;
    /** minutes change step */
    minuteStep: number;
    /** seconds change step */
    secondsStep: number;
    /** if true hours and minutes fields will be readonly */
    readonlyInput: boolean;
    /** if true hours and minutes fields will be disabled */
    disabled: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel: boolean;
    /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
    arrowkeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners: boolean;
    /** if true meridian button will be shown */
    showMeridian: boolean;
    /** show minutes in timepicker */
    showMinutes: boolean;
    /** show seconds in timepicker */
    showSeconds: boolean;
    /** meridian labels based on locale */
    meridians: string[];
    /** minimum time user can select */
    min?: Date;
    /** maximum time user can select */
    max?: Date;
    /** placeholder for hours field in timepicker */
    hoursPlaceholder: string;
    /** placeholder for minutes field in timepicker */
    minutesPlaceholder: string;
    /** placeholder for seconds field in timepicker */
    secondsPlaceholder: string;
    /** emits true if value is a valid date */
    isValid: EventEmitter<boolean>;
    hours: string;
    minutes: string;
    seconds: string;
    meridian: string;
    invalidHours: boolean;
    invalidMinutes: boolean;
    invalidSeconds: boolean;
    labelHours: string;
    labelMinutes: string;
    labelSeconds: string;
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;
    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;
    canToggleMeridian: boolean;
    onChange: Function;
    onTouched: Function;
    timepickerSub: Subscription;
    constructor(_config: TimepickerConfig, _cd: ChangeDetectorRef, _store: TimepickerStore, _timepickerActions: TimepickerActions);
    /** @deprecated - please use `isEditable` instead */
    get isSpinnersVisible(): boolean;
    get isEditable(): boolean;
    resetValidation(): void;
    isPM(): boolean;
    prevDef($event: Event): void;
    wheelSign($event: WheelEventInit): number;
    ngOnChanges(): void;
    changeHours(step: number, source?: TimeChangeSource): void;
    changeMinutes(step: number, source?: TimeChangeSource): void;
    changeSeconds(step: number, source?: TimeChangeSource): void;
    updateHours(target?: Partial<EventTarget> | null): void;
    updateMinutes(target: Partial<EventTarget> | null): void;
    updateSeconds(target: Partial<EventTarget> | null): void;
    isValidLimit(): boolean;
    _updateTime(): void;
    toggleMeridian(): void;
    /**
     * Write a new value to the element.
     */
    writeValue(obj?: string | Date): void;
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => void): void;
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => void): void;
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    ngOnDestroy(): void;
    private _renderTime;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TimepickerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TimepickerComponent, "timepicker", never, { "hourStep": "hourStep"; "minuteStep": "minuteStep"; "secondsStep": "secondsStep"; "readonlyInput": "readonlyInput"; "disabled": "disabled"; "mousewheel": "mousewheel"; "arrowkeys": "arrowkeys"; "showSpinners": "showSpinners"; "showMeridian": "showMeridian"; "showMinutes": "showMinutes"; "showSeconds": "showSeconds"; "meridians": "meridians"; "hoursPlaceholder": "hoursPlaceholder"; "minutesPlaceholder": "minutesPlaceholder"; "secondsPlaceholder": "secondsPlaceholder"; "min": "min"; "max": "max"; }, { "isValid": "isValid"; }, never, never>;
}

//# sourceMappingURL=timepicker.component.d.ts.map