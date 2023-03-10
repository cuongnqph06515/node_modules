import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ProgressbarType } from './progressbar-type.interface';
import * as ɵngcc0 from '@angular/core';
export declare class BarComponent implements OnChanges {
    private el;
    private renderer;
    /** maximum total value of progress element */
    max: number;
    /** current value of progress bar */
    value?: number | undefined;
    /** if `true` changing value of progress bar will be animated */
    animate?: boolean | undefined;
    /** If `true`, striped classes are applied */
    striped?: boolean | undefined;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    type?: ProgressbarType;
    percent: number;
    get isBs3(): boolean;
    private _prevType?;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    private applyTypeClasses;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BarComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<BarComponent, "bar", never, { "max": "max"; "value": "value"; "animate": "animate"; "striped": "striped"; "type": "type"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=bar.component.d.ts.map