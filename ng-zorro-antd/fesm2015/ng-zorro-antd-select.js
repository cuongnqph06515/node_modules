import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, Optional, TemplateRef, ElementRef, Renderer2, Host, forwardRef, ChangeDetectorRef, ContentChildren, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { __decorate, __metadata } from 'tslib';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { startWith, takeUntil, switchMap } from 'rxjs/operators';
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { BACKSPACE, ESCAPE, TAB, SPACE, ENTER, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin, CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { zoomMotion, slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective, NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { ɵNzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * @fileoverview added by tsickle
 * Generated from: option-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzOptionGroupComponent {
    constructor() {
        this.nzLabel = null;
        this.changes = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.changes.next();
    }
}
NzOptionGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-group',
                exportAs: 'nzOptionGroup',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `
            }] }
];
NzOptionGroupComponent.propDecorators = {
    nzLabel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzOptionGroupComponent.prototype.nzLabel;
    /** @type {?} */
    NzOptionGroupComponent.prototype.changes;
}

/**
 * @fileoverview added by tsickle
 * Generated from: option-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzOptionContainerComponent {
    constructor() {
        this.notFoundContent = undefined;
        this.menuItemSelectedIcon = null;
        this.dropdownRender = null;
        this.activatedValue = null;
        this.listOfSelectedValue = [];
        this.mode = 'default';
        this.matchWidth = true;
        this.itemSize = 32;
        this.maxItemLength = 8;
        this.listOfContainerItem = [];
        this.itemClick = new EventEmitter();
        this.scrollToBottom = new EventEmitter();
        this.scrolledIndex = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onItemClick(value) {
        this.itemClick.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onItemHover(value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    }
    /**
     * @param {?} _index
     * @param {?} option
     * @return {?}
     */
    trackValue(_index, option) {
        return option.key;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onScrolledIndexChange(index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength) {
            this.scrollToBottom.emit();
        }
    }
    /**
     * @return {?}
     */
    scrollToActivatedValue() {
        /** @type {?} */
        const index = this.listOfContainerItem.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => this.compareWith(item.key, this.activatedValue)));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { listOfContainerItem, activatedValue } = changes;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this.scrollToActivatedValue()));
    }
}
NzOptionContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-container',
                exportAs: 'nzOptionContainer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="ant-select-item-empty">
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          <ng-container [ngSwitch]="item.type">
            <nz-option-item-group *ngSwitchCase="'group'" [nzLabel]="item.groupLabel"></nz-option-item-group>
            <nz-option-item
              *ngSwitchCase="'item'"
              [icon]="menuItemSelectedIcon"
              [customContent]="item.nzCustomContent"
              [template]="item.template"
              [grouped]="!!item.groupLabel"
              [disabled]="item.nzDisabled"
              [showState]="mode === 'tags' || mode === 'multiple'"
              [label]="item.nzLabel"
              [compareWith]="compareWith"
              [activatedValue]="activatedValue"
              [listOfSelectedValue]="listOfSelectedValue"
              [value]="item.nzValue"
              (itemHover)="onItemHover($event)"
              (itemClick)="onItemClick($event)"
            ></nz-option-item>
          </ng-container>
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
                host: {
                    '[class.ant-select-dropdown]': 'true'
                }
            }] }
];
NzOptionContainerComponent.propDecorators = {
    notFoundContent: [{ type: Input }],
    menuItemSelectedIcon: [{ type: Input }],
    dropdownRender: [{ type: Input }],
    activatedValue: [{ type: Input }],
    listOfSelectedValue: [{ type: Input }],
    compareWith: [{ type: Input }],
    mode: [{ type: Input }],
    matchWidth: [{ type: Input }],
    itemSize: [{ type: Input }],
    maxItemLength: [{ type: Input }],
    listOfContainerItem: [{ type: Input }],
    itemClick: [{ type: Output }],
    scrollToBottom: [{ type: Output }],
    cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { static: true },] }]
};
if (false) {
    /** @type {?} */
    NzOptionContainerComponent.prototype.notFoundContent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.menuItemSelectedIcon;
    /** @type {?} */
    NzOptionContainerComponent.prototype.dropdownRender;
    /** @type {?} */
    NzOptionContainerComponent.prototype.activatedValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfSelectedValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype.compareWith;
    /** @type {?} */
    NzOptionContainerComponent.prototype.mode;
    /** @type {?} */
    NzOptionContainerComponent.prototype.matchWidth;
    /** @type {?} */
    NzOptionContainerComponent.prototype.itemSize;
    /** @type {?} */
    NzOptionContainerComponent.prototype.maxItemLength;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfContainerItem;
    /** @type {?} */
    NzOptionContainerComponent.prototype.itemClick;
    /** @type {?} */
    NzOptionContainerComponent.prototype.scrollToBottom;
    /** @type {?} */
    NzOptionContainerComponent.prototype.cdkVirtualScrollViewport;
    /**
     * @type {?}
     * @private
     */
    NzOptionContainerComponent.prototype.scrolledIndex;
}

/**
 * @fileoverview added by tsickle
 * Generated from: option.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzOptionComponent {
    /**
     * @param {?} nzOptionGroupComponent
     */
    constructor(nzOptionGroupComponent) {
        this.nzOptionGroupComponent = nzOptionGroupComponent;
        this.destroy$ = new Subject();
        this.changes = new Subject();
        this.groupLabel = null;
        this.nzLabel = null;
        this.nzValue = null;
        this.nzDisabled = false;
        this.nzHide = false;
        this.nzCustomContent = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nzOptionGroupComponent) {
            this.nzOptionGroupComponent.changes.pipe(startWith(true), takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            () => {
                this.groupLabel = this.nzOptionGroupComponent.nzLabel;
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.changes.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option',
                exportAs: 'nzOption',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NzOptionComponent.ctorParameters = () => [
    { type: NzOptionGroupComponent, decorators: [{ type: Optional }] }
];
NzOptionComponent.propDecorators = {
    template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    nzLabel: [{ type: Input }],
    nzValue: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzHide: [{ type: Input }],
    nzCustomContent: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzOptionComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzOptionComponent.prototype, "nzHide", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzOptionComponent.prototype, "nzCustomContent", void 0);
if (false) {
    /** @type {?} */
    NzOptionComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzOptionComponent.ngAcceptInputType_nzHide;
    /** @type {?} */
    NzOptionComponent.ngAcceptInputType_nzCustomContent;
    /**
     * @type {?}
     * @private
     */
    NzOptionComponent.prototype.destroy$;
    /** @type {?} */
    NzOptionComponent.prototype.changes;
    /** @type {?} */
    NzOptionComponent.prototype.groupLabel;
    /** @type {?} */
    NzOptionComponent.prototype.template;
    /** @type {?} */
    NzOptionComponent.prototype.nzLabel;
    /** @type {?} */
    NzOptionComponent.prototype.nzValue;
    /** @type {?} */
    NzOptionComponent.prototype.nzDisabled;
    /** @type {?} */
    NzOptionComponent.prototype.nzHide;
    /** @type {?} */
    NzOptionComponent.prototype.nzCustomContent;
    /**
     * @type {?}
     * @private
     */
    NzOptionComponent.prototype.nzOptionGroupComponent;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-search.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectSearchComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} focusMonitor
     */
    constructor(elementRef, renderer, focusMonitor) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.focusMonitor = focusMonitor;
        this.disabled = false;
        this.mirrorSync = false;
        this.showInput = true;
        this.focusTrigger = false;
        this.value = '';
        this.autofocus = false;
        this.valueChange = new EventEmitter();
        this.isComposingChange = new EventEmitter();
    }
    /**
     * @param {?} isComposing
     * @return {?}
     */
    setCompositionState(isComposing) {
        this.isComposingChange.next(isComposing);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onValueChange(value) {
        /** @type {?} */
        const inputDOM = this.inputElement.nativeElement;
        inputDOM.value = value;
        this.value = value;
        this.valueChange.next(value);
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
    }
    /**
     * @return {?}
     */
    clearInputValue() {
        this.onValueChange('');
    }
    /**
     * @return {?}
     */
    syncMirrorWidth() {
        /** @type {?} */
        const mirrorDOM = (/** @type {?} */ (this.mirrorElement)).nativeElement;
        /** @type {?} */
        const hostDOM = this.elementRef.nativeElement;
        /** @type {?} */
        const inputDOM = this.inputElement.nativeElement;
        this.renderer.removeStyle(hostDOM, 'width');
        mirrorDOM.innerHTML = `${inputDOM.value}&nbsp;`;
        this.renderer.setStyle(hostDOM, 'width', `${mirrorDOM.scrollWidth}px`);
    }
    /**
     * @return {?}
     */
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    /**
     * @return {?}
     */
    blur() {
        this.inputElement.nativeElement.blur();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const inputDOM = this.inputElement.nativeElement;
        const { focusTrigger, showInput } = changes;
        if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
            inputDOM.focus();
        }
        if (showInput) {
            if (this.showInput) {
                this.renderer.removeAttribute(inputDOM, 'readonly');
            }
            else {
                this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
        if (this.autofocus) {
            this.focus();
        }
    }
}
NzSelectSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-search',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <input
      #inputElement
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    <span #mirrorElement *ngIf="mirrorSync" class="ant-select-selection-search-mirror"></span>
  `,
                host: {
                    '[class.ant-select-selection-search]': 'true'
                }
            }] }
];
/** @nocollapse */
NzSelectSearchComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: FocusMonitor }
];
NzSelectSearchComponent.propDecorators = {
    disabled: [{ type: Input }],
    mirrorSync: [{ type: Input }],
    showInput: [{ type: Input }],
    focusTrigger: [{ type: Input }],
    value: [{ type: Input }],
    autofocus: [{ type: Input }],
    valueChange: [{ type: Output }],
    isComposingChange: [{ type: Output }],
    inputElement: [{ type: ViewChild, args: ['inputElement', { static: true },] }],
    mirrorElement: [{ type: ViewChild, args: ['mirrorElement', { static: false },] }]
};
if (false) {
    /** @type {?} */
    NzSelectSearchComponent.prototype.disabled;
    /** @type {?} */
    NzSelectSearchComponent.prototype.mirrorSync;
    /** @type {?} */
    NzSelectSearchComponent.prototype.showInput;
    /** @type {?} */
    NzSelectSearchComponent.prototype.focusTrigger;
    /** @type {?} */
    NzSelectSearchComponent.prototype.value;
    /** @type {?} */
    NzSelectSearchComponent.prototype.autofocus;
    /** @type {?} */
    NzSelectSearchComponent.prototype.valueChange;
    /** @type {?} */
    NzSelectSearchComponent.prototype.isComposingChange;
    /** @type {?} */
    NzSelectSearchComponent.prototype.inputElement;
    /** @type {?} */
    NzSelectSearchComponent.prototype.mirrorElement;
    /**
     * @type {?}
     * @private
     */
    NzSelectSearchComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzSelectSearchComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzSelectSearchComponent.prototype.focusMonitor;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-top-control.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectTopControlComponent {
    /**
     * @param {?=} noAnimation
     */
    constructor(noAnimation) {
        this.noAnimation = noAnimation;
        this.showSearch = false;
        this.placeHolder = null;
        this.open = false;
        this.maxTagCount = Infinity;
        this.autofocus = false;
        this.disabled = false;
        this.mode = 'default';
        this.customTemplate = null;
        this.maxTagPlaceholder = null;
        this.removeIcon = null;
        this.listOfTopItem = [];
        this.tokenSeparators = [];
        this.tokenize = new EventEmitter();
        this.inputValueChange = new EventEmitter();
        this.animationEnd = new EventEmitter();
        this.deleteItem = new EventEmitter();
        this.openChange = new EventEmitter();
        this.listOfSlicedItem = [];
        this.isShowPlaceholder = true;
        this.isShowSingleLabel = false;
        this.isComposing = false;
        this.inputValue = null;
    }
    /**
     * @return {?}
     */
    onHostClick() {
        if (!this.disabled) {
            this.openChange.next(!this.open);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onHostKeydown(e) {
        /** @type {?} */
        const inputValue = ((/** @type {?} */ (e.target))).value;
        if (e.keyCode === BACKSPACE && this.mode !== 'default' && !inputValue && this.listOfTopItem.length > 0) {
            e.preventDefault();
            this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]);
        }
    }
    /**
     * @return {?}
     */
    updateTemplateVariable() {
        /** @type {?} */
        const isSelectedValueEmpty = this.listOfTopItem.length === 0;
        this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
        this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    }
    /**
     * @param {?} isComposing
     * @return {?}
     */
    isComposingChange(isComposing) {
        this.isComposing = isComposing;
        this.updateTemplateVariable();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInputValueChange(value) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.updateTemplateVariable();
            this.inputValueChange.emit(value);
            this.tokenSeparate(value, this.tokenSeparators);
        }
    }
    /**
     * @param {?} inputValue
     * @param {?} tokenSeparators
     * @return {?}
     */
    tokenSeparate(inputValue, tokenSeparators) {
        /** @type {?} */
        const includesSeparators = (/**
         * @param {?} str
         * @param {?} separators
         * @return {?}
         */
        (str, separators) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < separators.length; ++i) {
                if (str.lastIndexOf(separators[i]) > 0) {
                    return true;
                }
            }
            return false;
        });
        /** @type {?} */
        const splitBySeparators = (/**
         * @param {?} str
         * @param {?} separators
         * @return {?}
         */
        (str, separators) => {
            /** @type {?} */
            const reg = new RegExp(`[${separators.join()}]`);
            /** @type {?} */
            const array = ((/** @type {?} */ (str))).split(reg).filter((/**
             * @param {?} token
             * @return {?}
             */
            token => token));
            return [...new Set(array)];
        });
        if (inputValue &&
            inputValue.length &&
            tokenSeparators.length &&
            this.mode !== 'default' &&
            includesSeparators(inputValue, tokenSeparators)) {
            /** @type {?} */
            const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
            this.tokenize.next(listOfLabel);
        }
    }
    /**
     * @return {?}
     */
    clearInputValue() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.clearInputValue();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.focus();
        }
    }
    /**
     * @return {?}
     */
    blur() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.blur();
        }
    }
    /**
     * @param {?} _index
     * @param {?} option
     * @return {?}
     */
    trackValue(_index, option) {
        return option.nzValue;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onDeleteItem(item) {
        if (!this.disabled && !item.nzDisabled) {
            this.deleteItem.next(item);
        }
    }
    /**
     * @return {?}
     */
    onAnimationEnd() {
        this.animationEnd.next();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
        if (listOfTopItem) {
            this.updateTemplateVariable();
        }
        if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
            /** @type {?} */
            const listOfSlicedItem = this.listOfTopItem.slice(0, this.maxTagCount).map((/**
             * @param {?} o
             * @return {?}
             */
            o => {
                return {
                    nzLabel: o.nzLabel,
                    nzValue: o.nzValue,
                    nzDisabled: o.nzDisabled,
                    contentTemplateOutlet: this.customTemplate,
                    contentTemplateOutletContext: o
                };
            }));
            if (this.listOfTopItem.length > this.maxTagCount) {
                /** @type {?} */
                const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
                /** @type {?} */
                const listOfSelectedValue = this.listOfTopItem.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.nzValue));
                /** @type {?} */
                const exceededItem = {
                    nzLabel: exceededLabel,
                    nzValue: '$$__nz_exceeded_item',
                    nzDisabled: true,
                    contentTemplateOutlet: this.maxTagPlaceholder,
                    contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
                };
                listOfSlicedItem.push(exceededItem);
            }
            this.listOfSlicedItem = listOfSlicedItem;
        }
    }
}
NzSelectTopControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-top-control',
                exportAs: 'nzSelectTopControl',
                preserveWhitespaces: false,
                animations: [zoomMotion],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <!--single mode-->
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'default'">
        <nz-select-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [removeIcon]="removeIcon"
          [label]="listOfTopItem[0].nzLabel"
          [contentTemplateOutlet]="customTemplate"
          [contentTemplateOutletContext]="listOfTopItem[0]"
        ></nz-select-item>
        <nz-select-search
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="open && showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!--multiple or tags mode-->
        <nz-select-item
          *ngFor="let item of listOfSlicedItem; trackBy: trackValue"
          [@zoomMotion]
          [@.disabled]="noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          [removeIcon]="removeIcon"
          [label]="item.nzLabel"
          [disabled]="item.nzDisabled || disabled"
          [contentTemplateOutlet]="item.contentTemplateOutlet"
          [deletable]="true"
          [contentTemplateOutletContext]="item.contentTemplateOutletContext"
          (@zoomMotion.done)="onAnimationEnd()"
          (delete)="onDeleteItem(item.contentTemplateOutletContext)"
        >
        </nz-select-item>
        <nz-select-search
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      </ng-container>
    </ng-container>
    <nz-select-placeholder *ngIf="isShowPlaceholder" [placeholder]="placeHolder"></nz-select-placeholder>
  `,
                host: {
                    '[class.ant-select-selector]': 'true',
                    '(click)': 'onHostClick()',
                    '(keydown)': 'onHostKeydown($event)'
                }
            }] }
];
/** @nocollapse */
NzSelectTopControlComponent.ctorParameters = () => [
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzSelectTopControlComponent.propDecorators = {
    showSearch: [{ type: Input }],
    placeHolder: [{ type: Input }],
    open: [{ type: Input }],
    maxTagCount: [{ type: Input }],
    autofocus: [{ type: Input }],
    disabled: [{ type: Input }],
    mode: [{ type: Input }],
    customTemplate: [{ type: Input }],
    maxTagPlaceholder: [{ type: Input }],
    removeIcon: [{ type: Input }],
    listOfTopItem: [{ type: Input }],
    tokenSeparators: [{ type: Input }],
    tokenize: [{ type: Output }],
    inputValueChange: [{ type: Output }],
    animationEnd: [{ type: Output }],
    deleteItem: [{ type: Output }],
    openChange: [{ type: Output }],
    nzSelectSearchComponent: [{ type: ViewChild, args: [NzSelectSearchComponent,] }]
};
if (false) {
    /** @type {?} */
    NzSelectTopControlComponent.prototype.showSearch;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.placeHolder;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.open;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.maxTagCount;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.autofocus;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.disabled;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.mode;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.customTemplate;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.maxTagPlaceholder;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.removeIcon;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.listOfTopItem;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.tokenSeparators;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.tokenize;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.inputValueChange;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.animationEnd;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.deleteItem;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.openChange;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzSelectSearchComponent;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.listOfSlicedItem;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.isShowPlaceholder;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.isShowSingleLabel;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.isComposing;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.inputValue;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.noAnimation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultFilterOption = (/**
 * @param {?} searchValue
 * @param {?} item
 * @return {?}
 */
(searchValue, item) => {
    if (item && item.nzLabel) {
        return item.nzLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }
    else {
        return false;
    }
});
const ɵ0 = defaultFilterOption;
/** @type {?} */
const NZ_CONFIG_COMPONENT_NAME = 'select';
class NzSelectComponent {
    /**
     * @param {?} nzConfigService
     * @param {?} cdr
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} focusMonitor
     * @param {?=} noAnimation
     */
    constructor(nzConfigService, cdr, elementRef, platform, focusMonitor, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.platform = platform;
        this.focusMonitor = focusMonitor;
        this.noAnimation = noAnimation;
        this.nzSize = 'default';
        this.nzOptionHeightPx = 32;
        this.nzOptionOverflowSize = 8;
        this.nzDropdownClassName = null;
        this.nzDropdownMatchSelectWidth = true;
        this.nzDropdownStyle = null;
        this.nzNotFoundContent = undefined;
        this.nzPlaceHolder = null;
        this.nzMaxTagCount = Infinity;
        this.nzDropdownRender = null;
        this.nzCustomTemplate = null;
        this.nzSuffixIcon = null;
        this.nzClearIcon = null;
        this.nzRemoveIcon = null;
        this.nzMenuItemSelectedIcon = null;
        this.nzShowArrow = true;
        this.nzTokenSeparators = [];
        this.nzMaxTagPlaceholder = null;
        this.nzMaxMultipleCount = Infinity;
        this.nzMode = 'default';
        this.nzFilterOption = defaultFilterOption;
        this.compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        (o1, o2) => o1 === o2);
        this.nzAllowClear = false;
        this.nzBorderless = false;
        this.nzShowSearch = false;
        this.nzLoading = false;
        this.nzAutoFocus = false;
        this.nzAutoClearSearchValue = true;
        this.nzServerSearch = false;
        this.nzDisabled = false;
        this.nzOpen = false;
        this.nzOptions = [];
        this.nzOnSearch = new EventEmitter();
        this.nzScrollToBottom = new EventEmitter();
        this.nzOpenChange = new EventEmitter();
        this.nzBlur = new EventEmitter();
        this.nzFocus = new EventEmitter();
        this.listOfValue$ = new BehaviorSubject([]);
        this.listOfTemplateItem$ = new BehaviorSubject([]);
        this.listOfTagAndTemplateItem = [];
        this.searchValue = '';
        this.isReactiveDriven = false;
        this.destroy$ = new Subject();
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.dropDownPosition = 'bottom';
        this.triggerWidth = null;
        this.listOfContainerItem = [];
        this.listOfTopItem = [];
        this.activatedValue = null;
        this.listOfValue = [];
        this.focused = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    generateTagItem(value) {
        return {
            nzValue: value,
            nzLabel: value,
            type: 'item'
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onItemClick(value) {
        this.activatedValue = value;
        if (this.nzMode === 'default') {
            if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
                this.updateListOfValue([value]);
            }
            this.setOpenState(false);
        }
        else {
            /** @type {?} */
            const targetIndex = this.listOfValue.findIndex((/**
             * @param {?} o
             * @return {?}
             */
            o => this.compareWith(o, value)));
            if (targetIndex !== -1) {
                /** @type {?} */
                const listOfValueAfterRemoved = this.listOfValue.filter((/**
                 * @param {?} _
                 * @param {?} i
                 * @return {?}
                 */
                (_, i) => i !== targetIndex));
                this.updateListOfValue(listOfValueAfterRemoved);
            }
            else if (this.listOfValue.length < this.nzMaxMultipleCount) {
                /** @type {?} */
                const listOfValueAfterAdded = [...this.listOfValue, value];
                this.updateListOfValue(listOfValueAfterAdded);
            }
            this.focus();
            if (this.nzAutoClearSearchValue) {
                this.clearInput();
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onItemDelete(item) {
        /** @type {?} */
        const listOfSelectedValue = this.listOfValue.filter((/**
         * @param {?} v
         * @return {?}
         */
        v => !this.compareWith(v, item.nzValue)));
        this.updateListOfValue(listOfSelectedValue);
        this.clearInput();
    }
    /**
     * @return {?}
     */
    updateListOfContainerItem() {
        /** @type {?} */
        let listOfContainerItem = this.listOfTagAndTemplateItem
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !item.nzHide))
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (!this.nzServerSearch && this.searchValue) {
                return this.nzFilterOption(this.searchValue, item);
            }
            else {
                return true;
            }
        }));
        if (this.nzMode === 'tags' && this.searchValue) {
            /** @type {?} */
            const matchedItem = this.listOfTagAndTemplateItem.find((/**
             * @param {?} item
             * @return {?}
             */
            item => item.nzLabel === this.searchValue));
            if (!matchedItem) {
                /** @type {?} */
                const tagItem = this.generateTagItem(this.searchValue);
                listOfContainerItem = [tagItem, ...listOfContainerItem];
                this.activatedValue = tagItem.nzValue;
            }
            else {
                this.activatedValue = matchedItem.nzValue;
            }
        }
        if (this.listOfValue.length !== 0 &&
            listOfContainerItem.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            item => this.compareWith(item.nzValue, this.activatedValue))) === -1) {
            /** @type {?} */
            const activatedItem = listOfContainerItem.find((/**
             * @param {?} item
             * @return {?}
             */
            item => this.compareWith(item.nzValue, this.listOfValue[0]))) || listOfContainerItem[0];
            this.activatedValue = (activatedItem && activatedItem.nzValue) || null;
        }
        /** @type {?} */
        let listOfGroupLabel = [];
        if (this.isReactiveDriven) {
            listOfGroupLabel = [...new Set(this.nzOptions.filter((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o.groupLabel)).map((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => (/** @type {?} */ (o.groupLabel)))))];
        }
        else {
            if (this.listOfNzOptionGroupComponent) {
                listOfGroupLabel = this.listOfNzOptionGroupComponent.map((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o.nzLabel));
            }
        }
        /** insert group item **/
        listOfGroupLabel.forEach((/**
         * @param {?} label
         * @return {?}
         */
        label => {
            /** @type {?} */
            const index = listOfContainerItem.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            item => label === item.groupLabel));
            if (index > -1) {
                /** @type {?} */
                const groupItem = (/** @type {?} */ ({ groupLabel: label, type: 'group', key: label }));
                listOfContainerItem.splice(index, 0, groupItem);
            }
        }));
        this.listOfContainerItem = [...listOfContainerItem];
        this.updateCdkConnectedOverlayPositions();
    }
    /**
     * @return {?}
     */
    clearInput() {
        this.nzSelectTopControlComponent.clearInputValue();
    }
    /**
     * @param {?} listOfValue
     * @return {?}
     */
    updateListOfValue(listOfValue) {
        /** @type {?} */
        const covertListToModel = (/**
         * @param {?} list
         * @param {?} mode
         * @return {?}
         */
        (list, mode) => {
            if (mode === 'default') {
                if (list.length > 0) {
                    return list[0];
                }
                else {
                    return null;
                }
            }
            else {
                return list;
            }
        });
        /** @type {?} */
        const model = covertListToModel(listOfValue, this.nzMode);
        if (this.value !== model) {
            this.listOfValue = listOfValue;
            this.listOfValue$.next(listOfValue);
            this.value = model;
            this.onChange(this.value);
        }
    }
    /**
     * @param {?} listOfLabel
     * @return {?}
     */
    onTokenSeparate(listOfLabel) {
        /** @type {?} */
        const listOfMatchedValue = this.listOfTagAndTemplateItem
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => listOfLabel.findIndex((/**
         * @param {?} label
         * @return {?}
         */
        label => label === item.nzLabel)) !== -1))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.nzValue))
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => this.listOfValue.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        v => this.compareWith(v, item))) === -1));
        if (this.nzMode === 'multiple') {
            this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue]);
        }
        else if (this.nzMode === 'tags') {
            /** @type {?} */
            const listOfUnMatchedLabel = listOfLabel.filter((/**
             * @param {?} label
             * @return {?}
             */
            label => this.listOfTagAndTemplateItem.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            item => item.nzLabel === label)) === -1));
            this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
        }
        this.clearInput();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (this.nzDisabled) {
            return;
        }
        /** @type {?} */
        const listOfFilteredOptionNotDisabled = this.listOfContainerItem.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.type === 'item')).filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !item.nzDisabled));
        /** @type {?} */
        const activatedIndex = listOfFilteredOptionNotDisabled.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => this.compareWith(item.nzValue, this.activatedValue)));
        switch (e.keyCode) {
            case UP_ARROW:
                e.preventDefault();
                if (this.nzOpen) {
                    /** @type {?} */
                    const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
                    this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
                }
                break;
            case DOWN_ARROW:
                e.preventDefault();
                if (this.nzOpen) {
                    /** @type {?} */
                    const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
                    this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
                }
                else {
                    this.setOpenState(true);
                }
                break;
            case ENTER:
                e.preventDefault();
                if (this.nzOpen) {
                    if (this.activatedValue) {
                        this.onItemClick(this.activatedValue);
                    }
                }
                else {
                    this.setOpenState(true);
                }
                break;
            case SPACE:
                if (!this.nzOpen) {
                    this.setOpenState(true);
                    e.preventDefault();
                }
                break;
            case TAB:
                this.setOpenState(false);
                break;
            case ESCAPE:
                this.setOpenState(false);
                break;
            default:
                if (!this.nzOpen) {
                    this.setOpenState(true);
                }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setOpenState(value) {
        if (this.nzOpen !== value) {
            this.nzOpen = value;
            this.nzOpenChange.emit(value);
            this.onOpenChange();
            this.cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    onOpenChange() {
        this.updateCdkConnectedOverlayStatus();
        this.clearInput();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInputValueChange(value) {
        this.searchValue = value;
        this.updateListOfContainerItem();
        this.nzOnSearch.emit(value);
        this.updateCdkConnectedOverlayPositions();
    }
    /**
     * @return {?}
     */
    onClearSelection() {
        this.updateListOfValue([]);
    }
    /**
     * @return {?}
     */
    focus() {
        this.nzSelectTopControlComponent.focus();
    }
    /**
     * @return {?}
     */
    blur() {
        this.nzSelectTopControlComponent.blur();
    }
    /**
     * @param {?} position
     * @return {?}
     */
    onPositionChange(position) {
        this.dropDownPosition = position.connectionPair.originY;
    }
    /**
     * @return {?}
     */
    updateCdkConnectedOverlayStatus() {
        if (this.platform.isBrowser && this.originElement.nativeElement) {
            this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
        }
    }
    /**
     * @return {?}
     */
    updateCdkConnectedOverlayPositions() {
        if (this.cdkConnectedOverlay.overlayRef) {
            this.cdkConnectedOverlay.overlayRef.updatePosition();
        }
    }
    /**
     * @param {?} modelValue
     * @return {?}
     */
    writeValue(modelValue) {
        /** https://github.com/angular/angular/issues/14988 **/
        if (this.value !== modelValue) {
            this.value = modelValue;
            /** @type {?} */
            const covertModelToList = (/**
             * @param {?} model
             * @param {?} mode
             * @return {?}
             */
            (model, mode) => {
                if (model === null || model === undefined) {
                    return [];
                }
                else if (mode === 'default') {
                    return [model];
                }
                else {
                    return model;
                }
            });
            /** @type {?} */
            const listOfValue = covertModelToList(modelValue, this.nzMode);
            this.listOfValue = listOfValue;
            this.listOfValue$.next(listOfValue);
            this.cdr.markForCheck();
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        if (disabled) {
            this.setOpenState(false);
        }
        this.cdr.markForCheck();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { nzOpen, nzDisabled, nzOptions } = changes;
        if (nzOpen) {
            this.onOpenChange();
        }
        if (nzDisabled && this.nzDisabled) {
            this.setOpenState(false);
        }
        if (nzOptions) {
            this.isReactiveDriven = true;
            /** @type {?} */
            const listOfOptions = this.nzOptions || [];
            /** @type {?} */
            const listOfTransformedItem = listOfOptions.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                return {
                    template: item.label instanceof TemplateRef ? item.label : null,
                    nzLabel: typeof item.label === 'string' ? item.label : null,
                    nzValue: item.value,
                    nzDisabled: item.disabled || false,
                    nzHide: item.hide || false,
                    nzCustomContent: item.label instanceof TemplateRef,
                    groupLabel: item.groupLabel || null,
                    type: 'item',
                    key: item.value
                };
            }));
            this.listOfTemplateItem$.next(listOfTransformedItem);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        focusOrigin => {
            if (!focusOrigin) {
                this.focused = false;
                this.cdr.markForCheck();
                this.nzBlur.emit();
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => {
                    this.onTouched();
                }));
            }
            else {
                this.focused = true;
                this.cdr.markForCheck();
                this.nzFocus.emit();
            }
        }));
        combineLatest([this.listOfValue$, this.listOfTemplateItem$])
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([listOfSelectedValue, listOfTemplateItem]) => {
            /** @type {?} */
            const listOfTagItem = listOfSelectedValue
                .filter((/**
             * @return {?}
             */
            () => this.nzMode === 'tags'))
                .filter((/**
             * @param {?} value
             * @return {?}
             */
            value => listOfTemplateItem.findIndex((/**
             * @param {?} o
             * @return {?}
             */
            o => this.compareWith(o.nzValue, value))) === -1))
                .map((/**
             * @param {?} value
             * @return {?}
             */
            value => this.listOfTopItem.find((/**
             * @param {?} o
             * @return {?}
             */
            o => this.compareWith(o.nzValue, value))) || this.generateTagItem(value)));
            this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
            this.listOfTopItem = this.listOfValue
                .map((/**
             * @param {?} v
             * @return {?}
             */
            v => (/** @type {?} */ ([...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find((/**
             * @param {?} item
             * @return {?}
             */
            item => this.compareWith(v, item.nzValue)))))))
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item));
            this.updateListOfContainerItem();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateCdkConnectedOverlayStatus();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.isReactiveDriven) {
            merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes)
                .pipe(startWith(true), switchMap((/**
             * @return {?}
             */
            () => merge(...[
                this.listOfNzOptionComponent.changes,
                this.listOfNzOptionGroupComponent.changes,
                ...this.listOfNzOptionComponent.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                option => option.changes)),
                ...this.listOfNzOptionGroupComponent.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                option => option.changes))
            ]).pipe(startWith(true)))), takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const listOfOptionInterface = this.listOfNzOptionComponent.toArray().map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    const { template, nzLabel, nzValue, nzDisabled, nzHide, nzCustomContent, groupLabel } = item;
                    return { template, nzLabel, nzValue, nzDisabled, nzHide, nzCustomContent, groupLabel, type: 'item', key: nzValue };
                }));
                this.listOfTemplateItem$.next(listOfOptionInterface);
                this.cdr.markForCheck();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select',
                exportAs: 'nzSelect',
                preserveWhitespaces: false,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NzSelectComponent)),
                        multi: true
                    }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [slideMotion],
                template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (animationEnd)="updateCdkConnectedOverlayPositions()"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
      (openChange)="setOpenState($event)"
    ></nz-select-top-control>
    <nz-select-clear
      *ngIf="nzAllowClear && !nzDisabled && listOfValue.length"
      [clearIcon]="nzClearIcon"
      (clear)="onClearSelection()"
    ></nz-select-clear>
    <nz-select-arrow
      *ngIf="nzShowArrow && nzMode === 'default'"
      [loading]="nzLoading"
      [search]="nzOpen && nzShowSearch"
      [suffixIcon]="nzSuffixIcon"
    ></nz-select-arrow>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      (backdropClick)="setOpenState(false)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayOpen]="nzOpen"
    >
      <nz-option-container
        [ngStyle]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      ></nz-option-container>
    </ng-template>
  `,
                host: {
                    '[class.ant-select]': 'true',
                    '[class.ant-select-lg]': 'nzSize === "large"',
                    '[class.ant-select-sm]': 'nzSize === "small"',
                    '[class.ant-select-show-arrow]': `nzShowArrow && nzMode === 'default'`,
                    '[class.ant-select-disabled]': 'nzDisabled',
                    '[class.ant-select-show-search]': `nzShowSearch || nzMode !== 'default'`,
                    '[class.ant-select-allow-clear]': 'nzAllowClear',
                    '[class.ant-select-borderless]': 'nzBorderless',
                    '[class.ant-select-open]': 'nzOpen',
                    '[class.ant-select-focused]': 'nzOpen || focused',
                    '[class.ant-select-single]': `nzMode === 'default'`,
                    '[class.ant-select-multiple]': `nzMode !== 'default'`
                }
            }] }
];
/** @nocollapse */
NzSelectComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Platform },
    { type: FocusMonitor },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzSelectComponent.propDecorators = {
    nzSize: [{ type: Input }],
    nzOptionHeightPx: [{ type: Input }],
    nzOptionOverflowSize: [{ type: Input }],
    nzDropdownClassName: [{ type: Input }],
    nzDropdownMatchSelectWidth: [{ type: Input }],
    nzDropdownStyle: [{ type: Input }],
    nzNotFoundContent: [{ type: Input }],
    nzPlaceHolder: [{ type: Input }],
    nzMaxTagCount: [{ type: Input }],
    nzDropdownRender: [{ type: Input }],
    nzCustomTemplate: [{ type: Input }],
    nzSuffixIcon: [{ type: Input }],
    nzClearIcon: [{ type: Input }],
    nzRemoveIcon: [{ type: Input }],
    nzMenuItemSelectedIcon: [{ type: Input }],
    nzShowArrow: [{ type: Input }],
    nzTokenSeparators: [{ type: Input }],
    nzMaxTagPlaceholder: [{ type: Input }],
    nzMaxMultipleCount: [{ type: Input }],
    nzMode: [{ type: Input }],
    nzFilterOption: [{ type: Input }],
    compareWith: [{ type: Input }],
    nzAllowClear: [{ type: Input }],
    nzBorderless: [{ type: Input }],
    nzShowSearch: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzAutoFocus: [{ type: Input }],
    nzAutoClearSearchValue: [{ type: Input }],
    nzServerSearch: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzOpen: [{ type: Input }],
    nzOptions: [{ type: Input }],
    nzOnSearch: [{ type: Output }],
    nzScrollToBottom: [{ type: Output }],
    nzOpenChange: [{ type: Output }],
    nzBlur: [{ type: Output }],
    nzFocus: [{ type: Output }],
    originElement: [{ type: ViewChild, args: [CdkOverlayOrigin, { static: true, read: ElementRef },] }],
    cdkConnectedOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: true },] }],
    nzSelectTopControlComponent: [{ type: ViewChild, args: [NzSelectTopControlComponent, { static: true },] }],
    listOfNzOptionComponent: [{ type: ContentChildren, args: [NzOptionComponent, { descendants: true },] }],
    listOfNzOptionGroupComponent: [{ type: ContentChildren, args: [NzOptionGroupComponent, { descendants: true },] }],
    nzOptionGroupComponentElement: [{ type: ViewChild, args: [NzOptionGroupComponent, { static: true, read: ElementRef },] }],
    nzSelectTopControlComponentElement: [{ type: ViewChild, args: [NzSelectTopControlComponent, { static: true, read: ElementRef },] }]
};
__decorate([
    WithConfig(NZ_CONFIG_COMPONENT_NAME),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzSuffixIcon", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzAllowClear", void 0);
__decorate([
    WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzBorderless", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzShowSearch", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzAutoClearSearchValue", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzServerSearch", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSelectComponent.prototype, "nzOpen", void 0);
if (false) {
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzAllowClear;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzBorderless;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzShowSearch;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzLoading;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzAutoFocus;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzAutoClearSearchValue;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzServerSearch;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzSelectComponent.ngAcceptInputType_nzOpen;
    /** @type {?} */
    NzSelectComponent.prototype.nzSize;
    /** @type {?} */
    NzSelectComponent.prototype.nzOptionHeightPx;
    /** @type {?} */
    NzSelectComponent.prototype.nzOptionOverflowSize;
    /** @type {?} */
    NzSelectComponent.prototype.nzDropdownClassName;
    /** @type {?} */
    NzSelectComponent.prototype.nzDropdownMatchSelectWidth;
    /** @type {?} */
    NzSelectComponent.prototype.nzDropdownStyle;
    /** @type {?} */
    NzSelectComponent.prototype.nzNotFoundContent;
    /** @type {?} */
    NzSelectComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    NzSelectComponent.prototype.nzMaxTagCount;
    /** @type {?} */
    NzSelectComponent.prototype.nzDropdownRender;
    /** @type {?} */
    NzSelectComponent.prototype.nzCustomTemplate;
    /** @type {?} */
    NzSelectComponent.prototype.nzSuffixIcon;
    /** @type {?} */
    NzSelectComponent.prototype.nzClearIcon;
    /** @type {?} */
    NzSelectComponent.prototype.nzRemoveIcon;
    /** @type {?} */
    NzSelectComponent.prototype.nzMenuItemSelectedIcon;
    /** @type {?} */
    NzSelectComponent.prototype.nzShowArrow;
    /** @type {?} */
    NzSelectComponent.prototype.nzTokenSeparators;
    /** @type {?} */
    NzSelectComponent.prototype.nzMaxTagPlaceholder;
    /** @type {?} */
    NzSelectComponent.prototype.nzMaxMultipleCount;
    /** @type {?} */
    NzSelectComponent.prototype.nzMode;
    /** @type {?} */
    NzSelectComponent.prototype.nzFilterOption;
    /** @type {?} */
    NzSelectComponent.prototype.compareWith;
    /** @type {?} */
    NzSelectComponent.prototype.nzAllowClear;
    /** @type {?} */
    NzSelectComponent.prototype.nzBorderless;
    /** @type {?} */
    NzSelectComponent.prototype.nzShowSearch;
    /** @type {?} */
    NzSelectComponent.prototype.nzLoading;
    /** @type {?} */
    NzSelectComponent.prototype.nzAutoFocus;
    /** @type {?} */
    NzSelectComponent.prototype.nzAutoClearSearchValue;
    /** @type {?} */
    NzSelectComponent.prototype.nzServerSearch;
    /** @type {?} */
    NzSelectComponent.prototype.nzDisabled;
    /** @type {?} */
    NzSelectComponent.prototype.nzOpen;
    /** @type {?} */
    NzSelectComponent.prototype.nzOptions;
    /** @type {?} */
    NzSelectComponent.prototype.nzOnSearch;
    /** @type {?} */
    NzSelectComponent.prototype.nzScrollToBottom;
    /** @type {?} */
    NzSelectComponent.prototype.nzOpenChange;
    /** @type {?} */
    NzSelectComponent.prototype.nzBlur;
    /** @type {?} */
    NzSelectComponent.prototype.nzFocus;
    /** @type {?} */
    NzSelectComponent.prototype.originElement;
    /** @type {?} */
    NzSelectComponent.prototype.cdkConnectedOverlay;
    /** @type {?} */
    NzSelectComponent.prototype.nzSelectTopControlComponent;
    /** @type {?} */
    NzSelectComponent.prototype.listOfNzOptionComponent;
    /** @type {?} */
    NzSelectComponent.prototype.listOfNzOptionGroupComponent;
    /** @type {?} */
    NzSelectComponent.prototype.nzOptionGroupComponentElement;
    /** @type {?} */
    NzSelectComponent.prototype.nzSelectTopControlComponentElement;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.listOfValue$;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.listOfTemplateItem$;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.listOfTagAndTemplateItem;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.searchValue;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.isReactiveDriven;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.value;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.destroy$;
    /** @type {?} */
    NzSelectComponent.prototype.onChange;
    /** @type {?} */
    NzSelectComponent.prototype.onTouched;
    /** @type {?} */
    NzSelectComponent.prototype.dropDownPosition;
    /** @type {?} */
    NzSelectComponent.prototype.triggerWidth;
    /** @type {?} */
    NzSelectComponent.prototype.listOfContainerItem;
    /** @type {?} */
    NzSelectComponent.prototype.listOfTopItem;
    /** @type {?} */
    NzSelectComponent.prototype.activatedValue;
    /** @type {?} */
    NzSelectComponent.prototype.listOfValue;
    /** @type {?} */
    NzSelectComponent.prototype.focused;
    /** @type {?} */
    NzSelectComponent.prototype.nzConfigService;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    NzSelectComponent.prototype.focusMonitor;
    /** @type {?} */
    NzSelectComponent.prototype.noAnimation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: option-item-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzOptionItemGroupComponent {
    constructor() {
        this.nzLabel = null;
    }
}
NzOptionItemGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-item-group',
                template: ` <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-select-item]': 'true',
                    '[class.ant-select-item-group]': 'true'
                }
            }] }
];
NzOptionItemGroupComponent.propDecorators = {
    nzLabel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzOptionItemGroupComponent.prototype.nzLabel;
}

/**
 * @fileoverview added by tsickle
 * Generated from: option-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzOptionItemComponent {
    constructor() {
        this.selected = false;
        this.activated = false;
        this.grouped = false;
        this.customContent = false;
        this.template = null;
        this.disabled = false;
        this.showState = false;
        this.label = null;
        this.value = null;
        this.activatedValue = null;
        this.listOfSelectedValue = [];
        this.icon = null;
        this.itemClick = new EventEmitter();
        this.itemHover = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onHostMouseEnter() {
        if (!this.disabled) {
            this.itemHover.next(this.value);
        }
    }
    /**
     * @return {?}
     */
    onHostClick() {
        if (!this.disabled) {
            this.itemClick.next(this.value);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { value, activatedValue, listOfSelectedValue } = changes;
        if (value || listOfSelectedValue) {
            this.selected = this.listOfSelectedValue.some((/**
             * @param {?} v
             * @return {?}
             */
            v => this.compareWith(v, this.value)));
        }
        if (value || activatedValue) {
            this.activated = this.compareWith(this.activatedValue, this.value);
        }
    }
}
NzOptionItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-item',
                template: `
    <div class="ant-select-item-option-content">
      <ng-container *ngIf="!customContent">{{ label }}</ng-container>
      <ng-container *ngIf="customContent">
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      </ng-container>
    </div>
    <div *ngIf="showState && selected" class="ant-select-item-option-state" style="user-select: none" unselectable="on">
      <i nz-icon nzType="check" class="ant-select-selected-icon" *ngIf="!icon; else icon"></i>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-select-item]': 'true',
                    '[class.ant-select-item-option]': 'true',
                    '[class.ant-select-item-option-grouped]': 'grouped',
                    '[class.ant-select-item-option-selected]': 'selected && !disabled',
                    '[class.ant-select-item-option-disabled]': 'disabled',
                    '[class.ant-select-item-option-active]': 'activated && !disabled',
                    '(mouseenter)': 'onHostMouseEnter()',
                    '(click)': 'onHostClick()'
                }
            }] }
];
NzOptionItemComponent.propDecorators = {
    grouped: [{ type: Input }],
    customContent: [{ type: Input }],
    template: [{ type: Input }],
    disabled: [{ type: Input }],
    showState: [{ type: Input }],
    label: [{ type: Input }],
    value: [{ type: Input }],
    activatedValue: [{ type: Input }],
    listOfSelectedValue: [{ type: Input }],
    icon: [{ type: Input }],
    compareWith: [{ type: Input }],
    itemClick: [{ type: Output }],
    itemHover: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NzOptionItemComponent.prototype.selected;
    /** @type {?} */
    NzOptionItemComponent.prototype.activated;
    /** @type {?} */
    NzOptionItemComponent.prototype.grouped;
    /** @type {?} */
    NzOptionItemComponent.prototype.customContent;
    /** @type {?} */
    NzOptionItemComponent.prototype.template;
    /** @type {?} */
    NzOptionItemComponent.prototype.disabled;
    /** @type {?} */
    NzOptionItemComponent.prototype.showState;
    /** @type {?} */
    NzOptionItemComponent.prototype.label;
    /** @type {?} */
    NzOptionItemComponent.prototype.value;
    /** @type {?} */
    NzOptionItemComponent.prototype.activatedValue;
    /** @type {?} */
    NzOptionItemComponent.prototype.listOfSelectedValue;
    /** @type {?} */
    NzOptionItemComponent.prototype.icon;
    /** @type {?} */
    NzOptionItemComponent.prototype.compareWith;
    /** @type {?} */
    NzOptionItemComponent.prototype.itemClick;
    /** @type {?} */
    NzOptionItemComponent.prototype.itemHover;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-arrow.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectArrowComponent {
    constructor() {
        this.loading = false;
        this.search = false;
        this.suffixIcon = null;
    }
}
NzSelectArrowComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-arrow',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i nz-icon nzType="loading" *ngIf="loading; else defaultArrow"></i>
    <ng-template #defaultArrow>
      <ng-container *ngIf="!suffixIcon; else suffixTemplate">
        <i nz-icon nzType="down" *ngIf="!search"></i>
        <i nz-icon nzType="search" *ngIf="search"></i>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </ng-template>
    </ng-template>
  `,
                host: {
                    '[class.ant-select-arrow]': 'true',
                    '[class.ant-select-arrow-loading]': 'loading'
                }
            }] }
];
NzSelectArrowComponent.propDecorators = {
    loading: [{ type: Input }],
    search: [{ type: Input }],
    suffixIcon: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzSelectArrowComponent.prototype.loading;
    /** @type {?} */
    NzSelectArrowComponent.prototype.search;
    /** @type {?} */
    NzSelectArrowComponent.prototype.suffixIcon;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-clear.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectClearComponent {
    constructor() {
        this.clearIcon = null;
        this.clear = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.clear.emit(e);
    }
}
NzSelectClearComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-clear',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <i nz-icon nzType="close-circle" nzTheme="fill" *ngIf="!clearIcon; else clearIcon" class="ant-select-close-icon"></i> `,
                host: {
                    '(click)': 'onClick($event)',
                    '[class.ant-select-clear]': 'true'
                }
            }] }
];
NzSelectClearComponent.propDecorators = {
    clearIcon: [{ type: Input }],
    clear: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NzSelectClearComponent.prototype.clearIcon;
    /** @type {?} */
    NzSelectClearComponent.prototype.clear;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectItemComponent {
    constructor() {
        this.disabled = false;
        this.label = null;
        this.deletable = false;
        this.removeIcon = null;
        this.contentTemplateOutletContext = null;
        this.contentTemplateOutlet = null;
        this.delete = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.delete.next(e);
        }
    }
}
NzSelectItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-item',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }">
      <div class="ant-select-selection-item-content" *ngIf="deletable; else labelTemplate">{{ label }}</div>
      <ng-template #labelTemplate>{{ label }}</ng-template>
    </ng-container>
    <span *ngIf="deletable && !disabled" class="ant-select-selection-item-remove" (click)="onDelete($event)">
      <i nz-icon nzType="close" *ngIf="!removeIcon; else removeIcon"></i>
    </span>
  `,
                host: {
                    '[attr.title]': 'label',
                    '[class.ant-select-selection-item]': 'true',
                    '[class.ant-select-selection-item-disabled]': 'disabled'
                }
            }] }
];
NzSelectItemComponent.propDecorators = {
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    deletable: [{ type: Input }],
    removeIcon: [{ type: Input }],
    contentTemplateOutletContext: [{ type: Input }],
    contentTemplateOutlet: [{ type: Input }],
    delete: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NzSelectItemComponent.prototype.disabled;
    /** @type {?} */
    NzSelectItemComponent.prototype.label;
    /** @type {?} */
    NzSelectItemComponent.prototype.deletable;
    /** @type {?} */
    NzSelectItemComponent.prototype.removeIcon;
    /** @type {?} */
    NzSelectItemComponent.prototype.contentTemplateOutletContext;
    /** @type {?} */
    NzSelectItemComponent.prototype.contentTemplateOutlet;
    /** @type {?} */
    NzSelectItemComponent.prototype.delete;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select-placeholder.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectPlaceholderComponent {
    constructor() {
        this.placeholder = null;
    }
}
NzSelectPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-placeholder',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *nzStringTemplateOutlet="placeholder">
      {{ placeholder }}
    </ng-container>
  `,
                host: {
                    '[class.ant-select-selection-placeholder]': 'true'
                }
            }] }
];
NzSelectPlaceholderComponent.propDecorators = {
    placeholder: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzSelectPlaceholderComponent.prototype.placeholder;
}

/**
 * @fileoverview added by tsickle
 * Generated from: select.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSelectModule {
}
NzSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NzI18nModule,
                    FormsModule,
                    PlatformModule,
                    OverlayModule,
                    NzIconModule,
                    NzOutletModule,
                    NzEmptyModule,
                    NzOverlayModule,
                    NzNoAnimationModule,
                    ɵNzTransitionPatchModule,
                    ScrollingModule,
                    A11yModule
                ],
                declarations: [
                    NzOptionComponent,
                    NzSelectComponent,
                    NzOptionContainerComponent,
                    NzOptionGroupComponent,
                    NzOptionItemComponent,
                    NzSelectTopControlComponent,
                    NzSelectSearchComponent,
                    NzSelectItemComponent,
                    NzSelectClearComponent,
                    NzSelectArrowComponent,
                    NzSelectPlaceholderComponent,
                    NzOptionItemGroupComponent
                ],
                exports: [
                    NzOptionComponent,
                    NzSelectComponent,
                    NzOptionGroupComponent,
                    NzSelectArrowComponent,
                    NzSelectClearComponent,
                    NzSelectItemComponent,
                    NzSelectPlaceholderComponent,
                    NzSelectSearchComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: select.types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function NzSelectItemInterface() { }
if (false) {
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.template;
    /** @type {?} */
    NzSelectItemInterface.prototype.nzLabel;
    /** @type {?} */
    NzSelectItemInterface.prototype.nzValue;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.nzDisabled;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.nzHide;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.nzCustomContent;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.groupLabel;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.type;
    /** @type {?|undefined} */
    NzSelectItemInterface.prototype.key;
}
/**
 * @record
 */
function NzSelectOptionInterface() { }
if (false) {
    /** @type {?} */
    NzSelectOptionInterface.prototype.label;
    /** @type {?} */
    NzSelectOptionInterface.prototype.value;
    /** @type {?|undefined} */
    NzSelectOptionInterface.prototype.disabled;
    /** @type {?|undefined} */
    NzSelectOptionInterface.prototype.hide;
    /** @type {?|undefined} */
    NzSelectOptionInterface.prototype.groupLabel;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-select.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzOptionComponent, NzOptionContainerComponent, NzOptionGroupComponent, NzOptionItemComponent, NzOptionItemGroupComponent, NzSelectArrowComponent, NzSelectClearComponent, NzSelectComponent, NzSelectItemComponent, NzSelectModule, NzSelectPlaceholderComponent, NzSelectSearchComponent, NzSelectTopControlComponent };
//# sourceMappingURL=ng-zorro-antd-select.js.map
