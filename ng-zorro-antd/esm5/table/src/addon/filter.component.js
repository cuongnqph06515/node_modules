/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/filter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @record
 */
function NzThItemInterface() { }
if (false) {
    /** @type {?} */
    NzThItemInterface.prototype.text;
    /** @type {?} */
    NzThItemInterface.prototype.value;
    /** @type {?} */
    NzThItemInterface.prototype.checked;
}
var NzTableFilterComponent = /** @class */ (function () {
    function NzTableFilterComponent(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChanged = false;
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
    }
    /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    NzTableFilterComponent.prototype.trackByValue = /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    function (_, item) {
        return item.value;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    NzTableFilterComponent.prototype.check = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.isChanged = true;
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item === filter) {
                    return __assign(__assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            }));
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return __assign(__assign({}, item), { checked: item === filter });
            }));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.confirm = /**
     * @return {?}
     */
    function () {
        this.isVisible = false;
        this.emitFilterData();
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.isChanged = true;
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzTableFilterComponent.prototype.onVisibleChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.emitFilterData = /**
     * @return {?}
     */
    function () {
        if (this.isChanged) {
            /** @type {?} */
            var listOfChecked = this.listOfParsedFilter.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.checked; })).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.value; }));
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
            }
            this.isChanged = false;
        }
    };
    /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    NzTableFilterComponent.prototype.parseListOfFilter = /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    function (listOfFilter, reset) {
        return listOfFilter.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked: checked };
        }));
    };
    /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    NzTableFilterComponent.prototype.getCheckedStatus = /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    function (listOfParsedFilter) {
        return listOfParsedFilter.some((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.checked; }));
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = _this.i18n.getLocaleData('Table');
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var listOfFilter = changes.listOfFilter;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-filter',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <span class=\"ant-table-filter-column-title\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </span>\n    <ng-container *ngIf=\"!customFilter; else extraTemplate\">\n      <nz-filter-trigger\n        [nzVisible]=\"isVisible\"\n        [nzActive]=\"isChecked\"\n        [nzDropdownMenu]=\"filterMenu\"\n        (nzVisibleChange)=\"onVisibleChange($event)\"\n      >\n        <i nz-icon nzType=\"filter\" nzTheme=\"fill\"></i>\n      </nz-filter-trigger>\n      <nz-dropdown-menu #filterMenu=\"nzDropdownMenu\">\n        <div class=\"ant-table-filter-dropdown\">\n          <ul nz-menu>\n            <li nz-menu-item [nzSelected]=\"f.checked\" *ngFor=\"let f of listOfParsedFilter; trackBy: trackByValue\" (click)=\"check(f)\">\n              <label nz-radio *ngIf=\"!filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <label nz-checkbox *ngIf=\"filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <span>{{ f.text }}</span>\n            </li>\n          </ul>\n          <div class=\"ant-table-filter-dropdown-btns\">\n            <button nz-button nzType=\"link\" nzSize=\"small\" (click)=\"reset()\" [disabled]=\"!isChecked\">{{ locale.filterReset }}</button>\n            <button nz-button nzType=\"primary\" nzSize=\"small\" (click)=\"confirm()\">{{ locale.filterConfirm }}</button>\n          </div>\n        </div>\n      </nz-dropdown-menu>\n    </ng-container>\n  ",
                    host: {
                        '[class.ant-table-filter-column]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTableFilterComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzI18nService }
    ]; };
    NzTableFilterComponent.propDecorators = {
        contentTemplate: [{ type: Input }],
        customFilter: [{ type: Input }],
        extraTemplate: [{ type: Input }],
        filterMultiple: [{ type: Input }],
        listOfFilter: [{ type: Input }],
        filterChange: [{ type: Output }]
    };
    return NzTableFilterComponent;
}());
export { NzTableFilterComponent };
if (false) {
    /** @type {?} */
    NzTableFilterComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.customFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.extraTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterMultiple;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterChange;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.destroy$;
    /** @type {?} */
    NzTableFilterComponent.prototype.locale;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChanged;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChecked;
    /** @type {?} */
    NzTableFilterComponent.prototype.isVisible;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfParsedFilter;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGFibGUvIiwic291cmNlcyI6WyJzcmMvYWRkb24vZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzNDLGdDQUlDOzs7SUFIQyxpQ0FBYTs7SUFDYixrQ0FBaUI7O0lBQ2pCLG9DQUFpQjs7QUFHbkI7SUF1SEUsZ0NBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBL0U5RCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3RFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUF3QixFQUFFLENBQUM7SUFvRTZCLENBQUM7Ozs7OztJQWxFM0UsNkNBQVk7Ozs7O0lBQVos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QUFDO1NBQ2pFO0lBQ0gsQ0FBQzs7OztJQUNELDRDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOztnQkExSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLHc5Q0E2QlQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGlDQUFpQyxFQUFFLE1BQU07cUJBQzFDO2lCQUNGOzs7O2dCQTlEQyxpQkFBaUI7Z0JBYVYsYUFBYTs7O2tDQW1EbkIsS0FBSzsrQkFDTCxLQUFLO2dDQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLE1BQU07O0lBOEZULDZCQUFDO0NBQUEsQUEzSUQsSUEySUM7U0FwR1ksc0JBQXNCOzs7SUFDakMsaURBQStEOztJQUMvRCw4Q0FBOEI7O0lBQzlCLCtDQUE2RDs7SUFDN0QsZ0RBQStCOztJQUMvQiw4Q0FBOEM7O0lBQzlDLDhDQUE4RTs7Ozs7SUFDOUUsMENBQWlDOztJQUNqQyx3Q0FBOEI7O0lBQzlCLDJDQUFrQjs7SUFDbEIsMkNBQWtCOztJQUNsQiwyQ0FBa0I7O0lBQ2xCLG9EQUE2Qzs7Ozs7SUFvRWpDLHFDQUE4Qjs7Ozs7SUFBRSxzQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpUYWJsZUkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUYWJsZUZpbHRlckxpc3QgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbmludGVyZmFjZSBOelRoSXRlbUludGVyZmFjZSB7XG4gIHRleHQ6IHN0cmluZztcbiAgdmFsdWU6IE56U2FmZUFueTtcbiAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFibGUtZmlsdGVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1jb2x1bW4tdGl0bGVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvc3Bhbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWN1c3RvbUZpbHRlcjsgZWxzZSBleHRyYVRlbXBsYXRlXCI+XG4gICAgICA8bnotZmlsdGVyLXRyaWdnZXJcbiAgICAgICAgW256VmlzaWJsZV09XCJpc1Zpc2libGVcIlxuICAgICAgICBbbnpBY3RpdmVdPVwiaXNDaGVja2VkXCJcbiAgICAgICAgW256RHJvcGRvd25NZW51XT1cImZpbHRlck1lbnVcIlxuICAgICAgICAobnpWaXNpYmxlQ2hhbmdlKT1cIm9uVmlzaWJsZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJmaWx0ZXJcIiBuelRoZW1lPVwiZmlsbFwiPjwvaT5cbiAgICAgIDwvbnotZmlsdGVyLXRyaWdnZXI+XG4gICAgICA8bnotZHJvcGRvd24tbWVudSAjZmlsdGVyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFibGUtZmlsdGVyLWRyb3Bkb3duXCI+XG4gICAgICAgICAgPHVsIG56LW1lbnU+XG4gICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIFtuelNlbGVjdGVkXT1cImYuY2hlY2tlZFwiICpuZ0Zvcj1cImxldCBmIG9mIGxpc3RPZlBhcnNlZEZpbHRlcjsgdHJhY2tCeTogdHJhY2tCeVZhbHVlXCIgKGNsaWNrKT1cImNoZWNrKGYpXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBuei1yYWRpbyAqbmdJZj1cIiFmaWx0ZXJNdWx0aXBsZVwiIFtuZ01vZGVsXT1cImYuY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrKGYpXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsIG56LWNoZWNrYm94ICpuZ0lmPVwiZmlsdGVyTXVsdGlwbGVcIiBbbmdNb2RlbF09XCJmLmNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVjayhmKVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGYudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93bi1idG5zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBuelR5cGU9XCJsaW5rXCIgbnpTaXplPVwic21hbGxcIiAoY2xpY2spPVwicmVzZXQoKVwiIFtkaXNhYmxlZF09XCIhaXNDaGVja2VkXCI+e3sgbG9jYWxlLmZpbHRlclJlc2V0IH19PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBuelR5cGU9XCJwcmltYXJ5XCIgbnpTaXplPVwic21hbGxcIiAoY2xpY2spPVwiY29uZmlybSgpXCI+e3sgbG9jYWxlLmZpbHRlckNvbmZpcm0gfX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1maWx0ZXItY29sdW1uXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFibGVGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBleHRyYVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGZpbHRlck11bHRpcGxlID0gdHJ1ZTtcbiAgQElucHV0KCkgbGlzdE9mRmlsdGVyOiBOelRhYmxlRmlsdGVyTGlzdCA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOelNhZmVBbnlbXSB8IE56U2FmZUFueT4oKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIGxvY2FsZSE6IE56VGFibGVJMThuSW50ZXJmYWNlO1xuICBpc0NoYW5nZWQgPSBmYWxzZTtcbiAgaXNDaGVja2VkID0gZmFsc2U7XG4gIGlzVmlzaWJsZSA9IGZhbHNlO1xuICBsaXN0T2ZQYXJzZWRGaWx0ZXI6IE56VGhJdGVtSW50ZXJmYWNlW10gPSBbXTtcblxuICB0cmFja0J5VmFsdWUoXzogbnVtYmVyLCBpdGVtOiBOelRoSXRlbUludGVyZmFjZSk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gIH1cblxuICBjaGVjayhmaWx0ZXI6IE56VGhJdGVtSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgdGhpcy5pc0NoYW5nZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmZpbHRlck11bHRpcGxlKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyLm1hcChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IGZpbHRlcikge1xuICAgICAgICAgIHJldHVybiB7IC4uLml0ZW0sIGNoZWNrZWQ6ICFmaWx0ZXIuY2hlY2tlZCB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGZpbHRlci5jaGVja2VkID0gIWZpbHRlci5jaGVja2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgY2hlY2tlZDogaXRlbSA9PT0gZmlsdGVyIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICB9XG5cbiAgY29uZmlybSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdEZpbHRlckRhdGEoKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyID0gdGhpcy5wYXJzZUxpc3RPZkZpbHRlcih0aGlzLmxpc3RPZkZpbHRlciwgdHJ1ZSk7XG4gICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICAgIHRoaXMuZW1pdEZpbHRlckRhdGEoKTtcbiAgfVxuXG4gIG9uVmlzaWJsZUNoYW5nZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNWaXNpYmxlID0gdmFsdWU7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy5lbWl0RmlsdGVyRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRGaWx0ZXJEYXRhKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQ2hhbmdlZCkge1xuICAgICAgY29uc3QgbGlzdE9mQ2hlY2tlZCA9IHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyLmZpbHRlcihpdGVtID0+IGl0ZW0uY2hlY2tlZCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5maWx0ZXJNdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmZpbHRlckNoYW5nZS5lbWl0KGxpc3RPZkNoZWNrZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2UuZW1pdChsaXN0T2ZDaGVja2VkLmxlbmd0aCA+IDAgPyBsaXN0T2ZDaGVja2VkWzBdIDogbnVsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlTGlzdE9mRmlsdGVyKGxpc3RPZkZpbHRlcjogTnpUYWJsZUZpbHRlckxpc3QsIHJlc2V0PzogYm9vbGVhbik6IE56VGhJdGVtSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiBsaXN0T2ZGaWx0ZXIubWFwKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZCA9IHJlc2V0ID8gZmFsc2UgOiAhIWl0ZW0uYnlEZWZhdWx0O1xuICAgICAgcmV0dXJuIHsgdGV4dDogaXRlbS50ZXh0LCB2YWx1ZTogaXRlbS52YWx1ZSwgY2hlY2tlZCB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZFN0YXR1cyhsaXN0T2ZQYXJzZWRGaWx0ZXI6IE56VGhJdGVtSW50ZXJmYWNlW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGlzdE9mUGFyc2VkRmlsdGVyLnNvbWUoaXRlbSA9PiBpdGVtLmNoZWNrZWQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGkxOG46IE56STE4blNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZURhdGEoJ1RhYmxlJyk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxpc3RPZkZpbHRlciB9ID0gY2hhbmdlcztcbiAgICBpZiAobGlzdE9mRmlsdGVyICYmIHRoaXMubGlzdE9mRmlsdGVyICYmIHRoaXMubGlzdE9mRmlsdGVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLnBhcnNlTGlzdE9mRmlsdGVyKHRoaXMubGlzdE9mRmlsdGVyKTtcbiAgICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5nZXRDaGVja2VkU3RhdHVzKHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=