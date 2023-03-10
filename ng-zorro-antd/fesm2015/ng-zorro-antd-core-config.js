import { InjectionToken, Injectable, Optional, Inject, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function NzConfig() { }
if (false) {
    /** @type {?|undefined} */
    NzConfig.prototype.affix;
    /** @type {?|undefined} */
    NzConfig.prototype.select;
    /** @type {?|undefined} */
    NzConfig.prototype.alert;
    /** @type {?|undefined} */
    NzConfig.prototype.anchor;
    /** @type {?|undefined} */
    NzConfig.prototype.avatar;
    /** @type {?|undefined} */
    NzConfig.prototype.backTop;
    /** @type {?|undefined} */
    NzConfig.prototype.badge;
    /** @type {?|undefined} */
    NzConfig.prototype.button;
    /** @type {?|undefined} */
    NzConfig.prototype.card;
    /** @type {?|undefined} */
    NzConfig.prototype.carousel;
    /** @type {?|undefined} */
    NzConfig.prototype.cascader;
    /** @type {?|undefined} */
    NzConfig.prototype.codeEditor;
    /** @type {?|undefined} */
    NzConfig.prototype.collapse;
    /** @type {?|undefined} */
    NzConfig.prototype.collapsePanel;
    /** @type {?|undefined} */
    NzConfig.prototype.datePicker;
    /** @type {?|undefined} */
    NzConfig.prototype.descriptions;
    /** @type {?|undefined} */
    NzConfig.prototype.drawer;
    /** @type {?|undefined} */
    NzConfig.prototype.empty;
    /** @type {?|undefined} */
    NzConfig.prototype.form;
    /** @type {?|undefined} */
    NzConfig.prototype.icon;
    /** @type {?|undefined} */
    NzConfig.prototype.message;
    /** @type {?|undefined} */
    NzConfig.prototype.modal;
    /** @type {?|undefined} */
    NzConfig.prototype.notification;
    /** @type {?|undefined} */
    NzConfig.prototype.pageHeader;
    /** @type {?|undefined} */
    NzConfig.prototype.progress;
    /** @type {?|undefined} */
    NzConfig.prototype.rate;
    /** @type {?|undefined} */
    NzConfig.prototype.space;
    /** @type {?|undefined} */
    NzConfig.prototype.spin;
    /** @type {?|undefined} */
    NzConfig.prototype.switch;
    /** @type {?|undefined} */
    NzConfig.prototype.table;
    /** @type {?|undefined} */
    NzConfig.prototype.tabs;
    /** @type {?|undefined} */
    NzConfig.prototype.timePicker;
    /** @type {?|undefined} */
    NzConfig.prototype.tree;
    /** @type {?|undefined} */
    NzConfig.prototype.treeSelect;
    /** @type {?|undefined} */
    NzConfig.prototype.typography;
}
/**
 * @record
 */
function SelectConfig() { }
if (false) {
    /** @type {?|undefined} */
    SelectConfig.prototype.nzBorderless;
    /** @type {?|undefined} */
    SelectConfig.prototype.nzSuffixIcon;
}
/**
 * @record
 */
function AffixConfig() { }
if (false) {
    /** @type {?|undefined} */
    AffixConfig.prototype.nzOffsetBottom;
    /** @type {?|undefined} */
    AffixConfig.prototype.nzOffsetTop;
}
/**
 * @record
 */
function AlertConfig() { }
if (false) {
    /** @type {?|undefined} */
    AlertConfig.prototype.nzCloseable;
    /** @type {?|undefined} */
    AlertConfig.prototype.nzShowIcon;
}
/**
 * @record
 */
function AvatarConfig() { }
if (false) {
    /** @type {?|undefined} */
    AvatarConfig.prototype.nzShape;
    /** @type {?|undefined} */
    AvatarConfig.prototype.nzSize;
}
/**
 * @record
 */
function AnchorConfig() { }
if (false) {
    /** @type {?|undefined} */
    AnchorConfig.prototype.nzBounds;
    /** @type {?|undefined} */
    AnchorConfig.prototype.nzOffsetBottom;
    /** @type {?|undefined} */
    AnchorConfig.prototype.nzOffsetTop;
    /** @type {?|undefined} */
    AnchorConfig.prototype.nzShowInkInFixed;
}
/**
 * @record
 */
function BackTopConfig() { }
if (false) {
    /** @type {?|undefined} */
    BackTopConfig.prototype.nzVisibilityHeight;
}
/**
 * @record
 */
function BadgeConfig() { }
if (false) {
    /** @type {?|undefined} */
    BadgeConfig.prototype.nzColor;
    /** @type {?|undefined} */
    BadgeConfig.prototype.nzOverflowCount;
    /** @type {?|undefined} */
    BadgeConfig.prototype.nzShowZero;
}
/**
 * @record
 */
function ButtonConfig() { }
if (false) {
    /** @type {?|undefined} */
    ButtonConfig.prototype.nzSize;
}
/**
 * @record
 */
function CodeEditorConfig() { }
if (false) {
    /** @type {?|undefined} */
    CodeEditorConfig.prototype.assetsRoot;
    /** @type {?|undefined} */
    CodeEditorConfig.prototype.defaultEditorOption;
    /** @type {?|undefined} */
    CodeEditorConfig.prototype.useStaticLoading;
    /**
     * @return {?}
     */
    CodeEditorConfig.prototype.onLoad = function () { };
    /**
     * @return {?}
     */
    CodeEditorConfig.prototype.onFirstEditorInit = function () { };
    /**
     * @return {?}
     */
    CodeEditorConfig.prototype.onInit = function () { };
}
/**
 * @record
 */
function CardConfig() { }
if (false) {
    /** @type {?|undefined} */
    CardConfig.prototype.nzSize;
    /** @type {?|undefined} */
    CardConfig.prototype.nzHoverable;
    /** @type {?|undefined} */
    CardConfig.prototype.nzBordered;
}
/**
 * @record
 */
function CarouselConfig() { }
if (false) {
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzAutoPlay;
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzAutoPlaySpeed;
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzDots;
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzEffect;
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzEnableSwipe;
    /** @type {?|undefined} */
    CarouselConfig.prototype.nzVertical;
}
/**
 * @record
 */
function CascaderConfig() { }
if (false) {
    /** @type {?|undefined} */
    CascaderConfig.prototype.nzSize;
}
/**
 * @record
 */
function CollapseConfig() { }
if (false) {
    /** @type {?|undefined} */
    CollapseConfig.prototype.nzAccordion;
    /** @type {?|undefined} */
    CollapseConfig.prototype.nzBordered;
}
/**
 * @record
 */
function CollapsePanelConfig() { }
if (false) {
    /** @type {?|undefined} */
    CollapsePanelConfig.prototype.nzShowArrow;
}
/**
 * @record
 */
function DatePickerConfig() { }
if (false) {
    /** @type {?|undefined} */
    DatePickerConfig.prototype.nzSeparator;
    /** @type {?|undefined} */
    DatePickerConfig.prototype.nzSuffixIcon;
}
/**
 * @record
 */
function DescriptionsConfig() { }
if (false) {
    /** @type {?|undefined} */
    DescriptionsConfig.prototype.nzBorder;
    /** @type {?|undefined} */
    DescriptionsConfig.prototype.nzColumn;
    /** @type {?|undefined} */
    DescriptionsConfig.prototype.nzSize;
    /** @type {?|undefined} */
    DescriptionsConfig.prototype.nzColon;
}
/**
 * @record
 */
function DrawerConfig() { }
if (false) {
    /** @type {?|undefined} */
    DrawerConfig.prototype.nzMask;
    /** @type {?|undefined} */
    DrawerConfig.prototype.nzMaskClosable;
    /** @type {?|undefined} */
    DrawerConfig.prototype.nzCloseOnNavigation;
}
/**
 * @record
 */
function EmptyConfig() { }
if (false) {
    /** @type {?|undefined} */
    EmptyConfig.prototype.nzDefaultEmptyContent;
}
/**
 * @record
 */
function FormConfig() { }
if (false) {
    /** @type {?|undefined} */
    FormConfig.prototype.nzNoColon;
    /** @type {?|undefined} */
    FormConfig.prototype.nzAutoTips;
}
/**
 * @record
 */
function IconConfig() { }
if (false) {
    /** @type {?|undefined} */
    IconConfig.prototype.nzTheme;
    /** @type {?|undefined} */
    IconConfig.prototype.nzTwotoneColor;
}
/**
 * @record
 */
function MessageConfig() { }
if (false) {
    /** @type {?|undefined} */
    MessageConfig.prototype.nzAnimate;
    /** @type {?|undefined} */
    MessageConfig.prototype.nzDuration;
    /** @type {?|undefined} */
    MessageConfig.prototype.nzMaxStack;
    /** @type {?|undefined} */
    MessageConfig.prototype.nzPauseOnHover;
    /** @type {?|undefined} */
    MessageConfig.prototype.nzTop;
}
/**
 * @record
 */
function ModalConfig() { }
if (false) {
    /** @type {?|undefined} */
    ModalConfig.prototype.nzMask;
    /** @type {?|undefined} */
    ModalConfig.prototype.nzMaskClosable;
    /** @type {?|undefined} */
    ModalConfig.prototype.nzCloseOnNavigation;
}
/**
 * @record
 */
function NotificationConfig() { }
if (false) {
    /** @type {?|undefined} */
    NotificationConfig.prototype.nzTop;
    /** @type {?|undefined} */
    NotificationConfig.prototype.nzBottom;
    /** @type {?|undefined} */
    NotificationConfig.prototype.nzPlacement;
}
/**
 * @record
 */
function PageHeaderConfig() { }
if (false) {
    /** @type {?} */
    PageHeaderConfig.prototype.nzGhost;
}
/**
 * @record
 */
function ProgressConfig() { }
if (false) {
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzGapDegree;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzGapPosition;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzShowInfo;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzStrokeSwitch;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzStrokeWidth;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzSize;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzStrokeLinecap;
    /** @type {?|undefined} */
    ProgressConfig.prototype.nzStrokeColor;
}
/**
 * @record
 */
function RateConfig() { }
if (false) {
    /** @type {?|undefined} */
    RateConfig.prototype.nzAllowClear;
    /** @type {?|undefined} */
    RateConfig.prototype.nzAllowHalf;
}
/**
 * @record
 */
function SpaceConfig() { }
if (false) {
    /** @type {?|undefined} */
    SpaceConfig.prototype.nzSize;
}
/**
 * @record
 */
function SpinConfig() { }
if (false) {
    /** @type {?|undefined} */
    SpinConfig.prototype.nzIndicator;
}
/**
 * @record
 */
function SwitchConfig() { }
if (false) {
    /** @type {?} */
    SwitchConfig.prototype.nzSize;
}
/**
 * @record
 */
function TableConfig() { }
if (false) {
    /** @type {?|undefined} */
    TableConfig.prototype.nzBordered;
    /** @type {?|undefined} */
    TableConfig.prototype.nzSize;
    /** @type {?|undefined} */
    TableConfig.prototype.nzShowQuickJumper;
    /** @type {?|undefined} */
    TableConfig.prototype.nzLoadingIndicator;
    /** @type {?|undefined} */
    TableConfig.prototype.nzShowSizeChanger;
    /** @type {?|undefined} */
    TableConfig.prototype.nzSimple;
    /** @type {?|undefined} */
    TableConfig.prototype.nzHideOnSinglePage;
}
/**
 * @record
 */
function TabsConfig() { }
if (false) {
    /** @type {?|undefined} */
    TabsConfig.prototype.nzAnimated;
    /** @type {?|undefined} */
    TabsConfig.prototype.nzSize;
    /** @type {?|undefined} */
    TabsConfig.prototype.nzType;
    /** @type {?|undefined} */
    TabsConfig.prototype.nzTabBarGutter;
    /** @type {?|undefined} */
    TabsConfig.prototype.nzShowPagination;
}
/**
 * @record
 */
function TimePickerConfig() { }
if (false) {
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzAllowEmpty;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzClearText;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzFormat;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzHourStep;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzMinuteStep;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzSecondStep;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzPopupClassName;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzUse12Hours;
    /** @type {?|undefined} */
    TimePickerConfig.prototype.nzSuffixIcon;
}
/**
 * @record
 */
function TreeConfig() { }
if (false) {
    /** @type {?|undefined} */
    TreeConfig.prototype.nzBlockNode;
    /** @type {?|undefined} */
    TreeConfig.prototype.nzShowIcon;
    /** @type {?|undefined} */
    TreeConfig.prototype.nzHideUnMatched;
}
/**
 * @record
 */
function TreeSelectConfig() { }
if (false) {
    /** @type {?|undefined} */
    TreeSelectConfig.prototype.nzShowIcon;
    /** @type {?|undefined} */
    TreeSelectConfig.prototype.nzShowLine;
    /** @type {?|undefined} */
    TreeSelectConfig.prototype.nzDropdownMatchSelectWidth;
    /** @type {?|undefined} */
    TreeSelectConfig.prototype.nzHideUnMatched;
    /** @type {?|undefined} */
    TreeSelectConfig.prototype.nzSize;
}
/**
 * @record
 */
function TypographyConfig() { }
if (false) {
    /** @type {?|undefined} */
    TypographyConfig.prototype.nzEllipsisRows;
}
/**
 * User should provide an object implements this interface to set global configurations.
 * @type {?}
 */
const NZ_CONFIG = new InjectionToken('nz-config');

/**
 * @fileoverview added by tsickle
 * Generated from: config.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isDefined = (/**
 * @param {?=} value
 * @return {?}
 */
function (value) {
    return value !== undefined;
});
const ɵ0 = isDefined;
class NzConfigService {
    /**
     * @param {?=} defaultConfig
     */
    constructor(defaultConfig) {
        this.configUpdated$ = new Subject();
        this.config = defaultConfig || {};
    }
    /**
     * @template T
     * @param {?} componentName
     * @return {?}
     */
    getConfigForComponent(componentName) {
        return this.config[componentName];
    }
    /**
     * @param {?} componentName
     * @return {?}
     */
    getConfigChangeEventForComponent(componentName) {
        return this.configUpdated$.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n === componentName)), mapTo(undefined));
    }
    /**
     * @template T
     * @param {?} componentName
     * @param {?} value
     * @return {?}
     */
    set(componentName, value) {
        this.config[componentName] = Object.assign(Object.assign({}, this.config[componentName]), value);
        this.configUpdated$.next(componentName);
    }
}
NzConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_CONFIG,] }] }
];
/** @nocollapse */ NzConfigService.ɵprov = ɵɵdefineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(ɵɵinject(NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzConfigService.prototype.configUpdated$;
    /**
     * Global config holding property.
     * @type {?}
     * @private
     */
    NzConfigService.prototype.config;
}
// tslint:disable:no-invalid-this
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 * @template T
 * @param {?} componentName
 * @return {?}
 */
// tslint:disable-next-line:typedef
function WithConfig(componentName) {
    return (/**
     * @param {?} target
     * @param {?} propName
     * @param {?=} originalDescriptor
     * @return {?}
     */
    function ConfigDecorator(target, propName, originalDescriptor) {
        /** @type {?} */
        const privatePropName = `$$__assignedValue__${propName}`;
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });
        return {
            /**
             * @return {?}
             */
            get() {
                /** @type {?} */
                const originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                /** @type {?} */
                const assignedByUser = ((this.assignmentCount || {})[propName] || 0) > 1;
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                }
                /** @type {?} */
                const componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
                /** @type {?} */
                const configValue = componentConfig[propName];
                /** @type {?} */
                const ret = isDefined(configValue) ? configValue : originalValue;
                return ret;
            },
            /**
             * @param {?=} value
             * @return {?}
             */
            set(value) {
                // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                this.assignmentCount = this.assignmentCount || {};
                this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
                if (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(value);
                }
                else {
                    this[privatePropName] = value;
                }
            },
            configurable: true,
            enumerable: true
        };
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NZ_CONFIG, NzConfigService, WithConfig };
//# sourceMappingURL=ng-zorro-antd-core-config.js.map
