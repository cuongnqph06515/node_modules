import { OnDestroy, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import * as ɵngcc0 from '@angular/core';
export declare class SlideComponent implements OnInit, OnDestroy {
    /** Is current slide active */
    active: boolean;
    itemWidth: string;
    order: number;
    isAnimated: boolean;
    /** Wraps element by appropriate CSS classes */
    addClass: boolean;
    /** Link to Parent(container-collection) component */
    protected carousel: CarouselComponent;
    constructor(carousel: CarouselComponent);
    /** Fires changes in container collection after adding a new slide instance */
    ngOnInit(): void;
    /** Fires changes in container collection after removing of this slide instance */
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SlideComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SlideComponent, "slide", never, { "active": "active"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=slide.component.d.ts.map