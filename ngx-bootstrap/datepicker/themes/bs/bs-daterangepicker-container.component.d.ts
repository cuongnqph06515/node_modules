import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { CalendarCellViewModel, DayViewModel } from '../../models';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsCustomDates } from './bs-custom-dates-view.component';
import * as ɵngcc0 from '@angular/core';
export declare class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent implements OnInit, OnDestroy {
    private _config;
    private _store;
    private _element;
    private _actions;
    private _positionService;
    set value(value: Date[]);
    valueChange: EventEmitter<Date[]>;
    animationState: string;
    _rangeStack: Date[];
    chosenRange: Date[];
    _subs: Subscription[];
    constructor(_renderer: Renderer2, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _actions: BsDatepickerActions, _effects: BsDatepickerEffects, _positionService: PositioningService);
    ngOnInit(): void;
    get isTopPosition(): boolean;
    positionServiceEnable(): void;
    daySelectHandler(day: DayViewModel): void;
    monthSelectHandler(day: CalendarCellViewModel): void;
    yearSelectHandler(day: CalendarCellViewModel): void;
    rangesProcessing(day: CalendarCellViewModel): void;
    ngOnDestroy(): void;
    setRangeOnCalendar(dates: BsCustomDates): void;
    setMaxDateRangeOnCalendar(currentSelection: Date): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BsDaterangepickerContainerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<BsDaterangepickerContainerComponent, "bs-daterangepicker-container", never, {}, {}, never, never>;
}

//# sourceMappingURL=bs-daterangepicker-container.component.d.ts.map