(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/affix'), require('ng-zorro-antd/alert'), require('ng-zorro-antd/anchor'), require('ng-zorro-antd/auto-complete'), require('ng-zorro-antd/avatar'), require('ng-zorro-antd/back-top'), require('ng-zorro-antd/badge'), require('ng-zorro-antd/breadcrumb'), require('ng-zorro-antd/button'), require('ng-zorro-antd/calendar'), require('ng-zorro-antd/card'), require('ng-zorro-antd/carousel'), require('ng-zorro-antd/cascader'), require('ng-zorro-antd/checkbox'), require('ng-zorro-antd/collapse'), require('ng-zorro-antd/comment'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/trans-button'), require('ng-zorro-antd/core/wave'), require('ng-zorro-antd/date-picker'), require('ng-zorro-antd/descriptions'), require('ng-zorro-antd/divider'), require('ng-zorro-antd/drawer'), require('ng-zorro-antd/dropdown'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/form'), require('ng-zorro-antd/grid'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input'), require('ng-zorro-antd/input-number'), require('ng-zorro-antd/layout'), require('ng-zorro-antd/list'), require('ng-zorro-antd/mention'), require('ng-zorro-antd/menu'), require('ng-zorro-antd/message'), require('ng-zorro-antd/modal'), require('ng-zorro-antd/notification'), require('ng-zorro-antd/page-header'), require('ng-zorro-antd/pagination'), require('ng-zorro-antd/popconfirm'), require('ng-zorro-antd/popover'), require('ng-zorro-antd/progress'), require('ng-zorro-antd/radio'), require('ng-zorro-antd/rate'), require('ng-zorro-antd/result'), require('ng-zorro-antd/select'), require('ng-zorro-antd/skeleton'), require('ng-zorro-antd/slider'), require('ng-zorro-antd/spin'), require('ng-zorro-antd/statistic'), require('ng-zorro-antd/steps'), require('ng-zorro-antd/switch'), require('ng-zorro-antd/table'), require('ng-zorro-antd/tabs'), require('ng-zorro-antd/tag'), require('ng-zorro-antd/time-picker'), require('ng-zorro-antd/timeline'), require('ng-zorro-antd/tooltip'), require('ng-zorro-antd/transfer'), require('ng-zorro-antd/tree'), require('ng-zorro-antd/tree-select'), require('ng-zorro-antd/typography'), require('ng-zorro-antd/upload'), require('ng-zorro-antd/version'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/environments'), require('ng-zorro-antd/core/highlight'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/pipe'), require('ng-zorro-antd/core/polyfill'), require('ng-zorro-antd/core/resize-observers'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/testing'), require('ng-zorro-antd/core/time'), require('ng-zorro-antd/core/transition-patch'), require('ng-zorro-antd/core/tree'), require('ng-zorro-antd/core/types'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd', ['exports', '@angular/core', 'ng-zorro-antd/affix', 'ng-zorro-antd/alert', 'ng-zorro-antd/anchor', 'ng-zorro-antd/auto-complete', 'ng-zorro-antd/avatar', 'ng-zorro-antd/back-top', 'ng-zorro-antd/badge', 'ng-zorro-antd/breadcrumb', 'ng-zorro-antd/button', 'ng-zorro-antd/calendar', 'ng-zorro-antd/card', 'ng-zorro-antd/carousel', 'ng-zorro-antd/cascader', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/collapse', 'ng-zorro-antd/comment', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/trans-button', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/date-picker', 'ng-zorro-antd/descriptions', 'ng-zorro-antd/divider', 'ng-zorro-antd/drawer', 'ng-zorro-antd/dropdown', 'ng-zorro-antd/empty', 'ng-zorro-antd/form', 'ng-zorro-antd/grid', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon', 'ng-zorro-antd/input', 'ng-zorro-antd/input-number', 'ng-zorro-antd/layout', 'ng-zorro-antd/list', 'ng-zorro-antd/mention', 'ng-zorro-antd/menu', 'ng-zorro-antd/message', 'ng-zorro-antd/modal', 'ng-zorro-antd/notification', 'ng-zorro-antd/page-header', 'ng-zorro-antd/pagination', 'ng-zorro-antd/popconfirm', 'ng-zorro-antd/popover', 'ng-zorro-antd/progress', 'ng-zorro-antd/radio', 'ng-zorro-antd/rate', 'ng-zorro-antd/result', 'ng-zorro-antd/select', 'ng-zorro-antd/skeleton', 'ng-zorro-antd/slider', 'ng-zorro-antd/spin', 'ng-zorro-antd/statistic', 'ng-zorro-antd/steps', 'ng-zorro-antd/switch', 'ng-zorro-antd/table', 'ng-zorro-antd/tabs', 'ng-zorro-antd/tag', 'ng-zorro-antd/time-picker', 'ng-zorro-antd/timeline', 'ng-zorro-antd/tooltip', 'ng-zorro-antd/transfer', 'ng-zorro-antd/tree', 'ng-zorro-antd/tree-select', 'ng-zorro-antd/typography', 'ng-zorro-antd/upload', 'ng-zorro-antd/version', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/highlight', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/pipe', 'ng-zorro-antd/core/polyfill', 'ng-zorro-antd/core/resize-observers', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/testing', 'ng-zorro-antd/core/time', 'ng-zorro-antd/core/transition-patch', 'ng-zorro-antd/core/tree', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/util'], factory) :
    (global = global || self, factory(global['ng-zorro-antd'] = {}, global.ng.core, global['ng-zorro-antd'].affix, global['ng-zorro-antd'].alert, global['ng-zorro-antd'].anchor, global['ng-zorro-antd']['auto-complete'], global['ng-zorro-antd'].avatar, global['ng-zorro-antd']['back-top'], global['ng-zorro-antd'].badge, global['ng-zorro-antd'].breadcrumb, global['ng-zorro-antd'].button, global['ng-zorro-antd'].calendar, global['ng-zorro-antd'].card, global['ng-zorro-antd'].carousel, global['ng-zorro-antd'].cascader, global['ng-zorro-antd'].checkbox, global['ng-zorro-antd'].collapse, global['ng-zorro-antd'].comment, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core['trans-button'], global['ng-zorro-antd'].core.wave, global['ng-zorro-antd']['date-picker'], global['ng-zorro-antd'].descriptions, global['ng-zorro-antd'].divider, global['ng-zorro-antd'].drawer, global['ng-zorro-antd'].dropdown, global['ng-zorro-antd'].empty, global['ng-zorro-antd'].form, global['ng-zorro-antd'].grid, global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].input, global['ng-zorro-antd']['input-number'], global['ng-zorro-antd'].layout, global['ng-zorro-antd'].list, global['ng-zorro-antd'].mention, global['ng-zorro-antd'].menu, global['ng-zorro-antd'].message, global['ng-zorro-antd'].modal, global['ng-zorro-antd'].notification, global['ng-zorro-antd']['page-header'], global['ng-zorro-antd'].pagination, global['ng-zorro-antd'].popconfirm, global['ng-zorro-antd'].popover, global['ng-zorro-antd'].progress, global['ng-zorro-antd'].radio, global['ng-zorro-antd'].rate, global['ng-zorro-antd'].result, global['ng-zorro-antd'].select, global['ng-zorro-antd'].skeleton, global['ng-zorro-antd'].slider, global['ng-zorro-antd'].spin, global['ng-zorro-antd'].statistic, global['ng-zorro-antd'].steps, global['ng-zorro-antd'].switch, global['ng-zorro-antd'].table, global['ng-zorro-antd'].tabs, global['ng-zorro-antd'].tag, global['ng-zorro-antd']['time-picker'], global['ng-zorro-antd'].timeline, global['ng-zorro-antd'].tooltip, global['ng-zorro-antd'].transfer, global['ng-zorro-antd'].tree, global['ng-zorro-antd']['tree-select'], global['ng-zorro-antd'].typography, global['ng-zorro-antd'].upload, global['ng-zorro-antd'].version, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.environments, global['ng-zorro-antd'].core.highlight, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.pipe, global['ng-zorro-antd'].core.polyfill, global['ng-zorro-antd'].core['resize-observers'], global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.testing, global['ng-zorro-antd'].core.time, global['ng-zorro-antd'].core['transition-patch'], global['ng-zorro-antd'].core.tree, global['ng-zorro-antd'].core.types, global['ng-zorro-antd'].core.util));
}(this, (function (exports, core, affix, alert, anchor, autoComplete, avatar, backTop, badge, breadcrumb, button, calendar, card, carousel, cascader, checkbox, collapse, comment, logger, noAnimation, transButton, wave, datePicker, descriptions, divider, drawer, dropdown, empty, form, grid, i18n, icon, input, inputNumber, layout, list, mention, menu, message, modal, notification, pageHeader, pagination, popconfirm, popover, progress, radio, rate, result, select, skeleton, slider, spin, statistic, steps, _switch, table, tabs, tag, timePicker, timeline, tooltip, transfer, tree, treeSelect, typography, upload, version, animation, config, environments, highlight, outlet, overlay, pipe, polyfill, resizeObservers, services, testing, time, transitionPatch, tree$1, types, util) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: ng-zorro-antd.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgZorroAntdModule = /** @class */ (function () {
        function NgZorroAntdModule() {
            logger.warnDeprecation("The `NgZorroAntdModule` has been deprecated and will be removed in 10.0.0. Please use secondary entry instead.\ne.g. `import { NzButtonModule } from 'ng-zorro-antd/button';`");
        }
        NgZorroAntdModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [
                            affix.NzAffixModule,
                            alert.NzAlertModule,
                            anchor.NzAnchorModule,
                            autoComplete.NzAutocompleteModule,
                            avatar.NzAvatarModule,
                            backTop.NzBackTopModule,
                            badge.NzBadgeModule,
                            button.NzButtonModule,
                            breadcrumb.NzBreadCrumbModule,
                            calendar.NzCalendarModule,
                            card.NzCardModule,
                            carousel.NzCarouselModule,
                            cascader.NzCascaderModule,
                            checkbox.NzCheckboxModule,
                            collapse.NzCollapseModule,
                            comment.NzCommentModule,
                            datePicker.NzDatePickerModule,
                            descriptions.NzDescriptionsModule,
                            divider.NzDividerModule,
                            drawer.NzDrawerModule,
                            dropdown.NzDropDownModule,
                            empty.NzEmptyModule,
                            form.NzFormModule,
                            grid.NzGridModule,
                            i18n.NzI18nModule,
                            icon.NzIconModule,
                            input.NzInputModule,
                            inputNumber.NzInputNumberModule,
                            layout.NzLayoutModule,
                            list.NzListModule,
                            mention.NzMentionModule,
                            menu.NzMenuModule,
                            message.NzMessageModule,
                            modal.NzModalModule,
                            noAnimation.NzNoAnimationModule,
                            notification.NzNotificationModule,
                            pageHeader.NzPageHeaderModule,
                            pagination.NzPaginationModule,
                            popconfirm.NzPopconfirmModule,
                            popover.NzPopoverModule,
                            progress.NzProgressModule,
                            radio.NzRadioModule,
                            rate.NzRateModule,
                            result.NzResultModule,
                            select.NzSelectModule,
                            skeleton.NzSkeletonModule,
                            slider.NzSliderModule,
                            spin.NzSpinModule,
                            statistic.NzStatisticModule,
                            steps.NzStepsModule,
                            _switch.NzSwitchModule,
                            table.NzTableModule,
                            tabs.NzTabsModule,
                            tag.NzTagModule,
                            timePicker.NzTimePickerModule,
                            timeline.NzTimelineModule,
                            tooltip.NzToolTipModule,
                            transButton.NzTransButtonModule,
                            transfer.NzTransferModule,
                            tree.NzTreeModule,
                            treeSelect.NzTreeSelectModule,
                            typography.NzTypographyModule,
                            upload.NzUploadModule,
                            wave.NzWaveModule
                        ]
                    },] }
        ];
        /** @nocollapse */
        NgZorroAntdModule.ctorParameters = function () { return []; };
        return NgZorroAntdModule;
    }());

    Object.defineProperty(exports, 'NzAffixComponent', {
        enumerable: true,
        get: function () {
            return affix.NzAffixComponent;
        }
    });
    Object.defineProperty(exports, 'NzAffixModule', {
        enumerable: true,
        get: function () {
            return affix.NzAffixModule;
        }
    });
    Object.defineProperty(exports, 'NzAlertComponent', {
        enumerable: true,
        get: function () {
            return alert.NzAlertComponent;
        }
    });
    Object.defineProperty(exports, 'NzAlertModule', {
        enumerable: true,
        get: function () {
            return alert.NzAlertModule;
        }
    });
    Object.defineProperty(exports, 'NzAnchorComponent', {
        enumerable: true,
        get: function () {
            return anchor.NzAnchorComponent;
        }
    });
    Object.defineProperty(exports, 'NzAnchorLinkComponent', {
        enumerable: true,
        get: function () {
            return anchor.NzAnchorLinkComponent;
        }
    });
    Object.defineProperty(exports, 'NzAnchorModule', {
        enumerable: true,
        get: function () {
            return anchor.NzAnchorModule;
        }
    });
    Object.defineProperty(exports, 'NZ_AUTOCOMPLETE_VALUE_ACCESSOR', {
        enumerable: true,
        get: function () {
            return autoComplete.NZ_AUTOCOMPLETE_VALUE_ACCESSOR;
        }
    });
    Object.defineProperty(exports, 'NzAutocompleteComponent', {
        enumerable: true,
        get: function () {
            return autoComplete.NzAutocompleteComponent;
        }
    });
    Object.defineProperty(exports, 'NzAutocompleteModule', {
        enumerable: true,
        get: function () {
            return autoComplete.NzAutocompleteModule;
        }
    });
    Object.defineProperty(exports, 'NzAutocompleteOptgroupComponent', {
        enumerable: true,
        get: function () {
            return autoComplete.NzAutocompleteOptgroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzAutocompleteOptionComponent', {
        enumerable: true,
        get: function () {
            return autoComplete.NzAutocompleteOptionComponent;
        }
    });
    Object.defineProperty(exports, 'NzAutocompleteTriggerDirective', {
        enumerable: true,
        get: function () {
            return autoComplete.NzAutocompleteTriggerDirective;
        }
    });
    Object.defineProperty(exports, 'NzOptionSelectionChange', {
        enumerable: true,
        get: function () {
            return autoComplete.NzOptionSelectionChange;
        }
    });
    Object.defineProperty(exports, 'getNzAutocompleteMissingPanelError', {
        enumerable: true,
        get: function () {
            return autoComplete.getNzAutocompleteMissingPanelError;
        }
    });
    Object.defineProperty(exports, 'NzAvatarComponent', {
        enumerable: true,
        get: function () {
            return avatar.NzAvatarComponent;
        }
    });
    Object.defineProperty(exports, 'NzAvatarModule', {
        enumerable: true,
        get: function () {
            return avatar.NzAvatarModule;
        }
    });
    Object.defineProperty(exports, 'NzBackTopComponent', {
        enumerable: true,
        get: function () {
            return backTop.NzBackTopComponent;
        }
    });
    Object.defineProperty(exports, 'NzBackTopModule', {
        enumerable: true,
        get: function () {
            return backTop.NzBackTopModule;
        }
    });
    Object.defineProperty(exports, 'NzBadgeComponent', {
        enumerable: true,
        get: function () {
            return badge.NzBadgeComponent;
        }
    });
    Object.defineProperty(exports, 'NzBadgeModule', {
        enumerable: true,
        get: function () {
            return badge.NzBadgeModule;
        }
    });
    Object.defineProperty(exports, 'NzBreadCrumbComponent', {
        enumerable: true,
        get: function () {
            return breadcrumb.NzBreadCrumbComponent;
        }
    });
    Object.defineProperty(exports, 'NzBreadCrumbItemComponent', {
        enumerable: true,
        get: function () {
            return breadcrumb.NzBreadCrumbItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzBreadCrumbModule', {
        enumerable: true,
        get: function () {
            return breadcrumb.NzBreadCrumbModule;
        }
    });
    Object.defineProperty(exports, 'NzBreadCrumbSeparatorComponent', {
        enumerable: true,
        get: function () {
            return breadcrumb.NzBreadCrumbSeparatorComponent;
        }
    });
    Object.defineProperty(exports, 'NzButtonComponent', {
        enumerable: true,
        get: function () {
            return button.NzButtonComponent;
        }
    });
    Object.defineProperty(exports, 'NzButtonGroupComponent', {
        enumerable: true,
        get: function () {
            return button.NzButtonGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzButtonModule', {
        enumerable: true,
        get: function () {
            return button.NzButtonModule;
        }
    });
    Object.defineProperty(exports, 'NzCalendarComponent', {
        enumerable: true,
        get: function () {
            return calendar.NzCalendarComponent;
        }
    });
    Object.defineProperty(exports, 'NzCalendarHeaderComponent', {
        enumerable: true,
        get: function () {
            return calendar.NzCalendarHeaderComponent;
        }
    });
    Object.defineProperty(exports, 'NzCalendarModule', {
        enumerable: true,
        get: function () {
            return calendar.NzCalendarModule;
        }
    });
    Object.defineProperty(exports, 'NzDateCellDirective', {
        enumerable: true,
        get: function () {
            return calendar.NzDateCellDirective;
        }
    });
    Object.defineProperty(exports, 'NzDateFullCellDirective', {
        enumerable: true,
        get: function () {
            return calendar.NzDateFullCellDirective;
        }
    });
    Object.defineProperty(exports, 'NzMonthCellDirective', {
        enumerable: true,
        get: function () {
            return calendar.NzMonthCellDirective;
        }
    });
    Object.defineProperty(exports, 'NzMonthFullCellDirective', {
        enumerable: true,
        get: function () {
            return calendar.NzMonthFullCellDirective;
        }
    });
    Object.defineProperty(exports, 'NzCardComponent', {
        enumerable: true,
        get: function () {
            return card.NzCardComponent;
        }
    });
    Object.defineProperty(exports, 'NzCardGridDirective', {
        enumerable: true,
        get: function () {
            return card.NzCardGridDirective;
        }
    });
    Object.defineProperty(exports, 'NzCardLoadingComponent', {
        enumerable: true,
        get: function () {
            return card.NzCardLoadingComponent;
        }
    });
    Object.defineProperty(exports, 'NzCardMetaComponent', {
        enumerable: true,
        get: function () {
            return card.NzCardMetaComponent;
        }
    });
    Object.defineProperty(exports, 'NzCardModule', {
        enumerable: true,
        get: function () {
            return card.NzCardModule;
        }
    });
    Object.defineProperty(exports, 'NzCardTabComponent', {
        enumerable: true,
        get: function () {
            return card.NzCardTabComponent;
        }
    });
    Object.defineProperty(exports, 'NZ_CAROUSEL_CUSTOM_STRATEGIES', {
        enumerable: true,
        get: function () {
            return carousel.NZ_CAROUSEL_CUSTOM_STRATEGIES;
        }
    });
    Object.defineProperty(exports, 'NzCarouselBaseStrategy', {
        enumerable: true,
        get: function () {
            return carousel.NzCarouselBaseStrategy;
        }
    });
    Object.defineProperty(exports, 'NzCarouselComponent', {
        enumerable: true,
        get: function () {
            return carousel.NzCarouselComponent;
        }
    });
    Object.defineProperty(exports, 'NzCarouselContentDirective', {
        enumerable: true,
        get: function () {
            return carousel.NzCarouselContentDirective;
        }
    });
    Object.defineProperty(exports, 'NzCarouselModule', {
        enumerable: true,
        get: function () {
            return carousel.NzCarouselModule;
        }
    });
    Object.defineProperty(exports, 'NzCascaderComponent', {
        enumerable: true,
        get: function () {
            return cascader.NzCascaderComponent;
        }
    });
    Object.defineProperty(exports, 'NzCascaderModule', {
        enumerable: true,
        get: function () {
            return cascader.NzCascaderModule;
        }
    });
    Object.defineProperty(exports, 'NzCascaderOptionComponent', {
        enumerable: true,
        get: function () {
            return cascader.NzCascaderOptionComponent;
        }
    });
    Object.defineProperty(exports, 'NzCascaderService', {
        enumerable: true,
        get: function () {
            return cascader.NzCascaderService;
        }
    });
    Object.defineProperty(exports, 'isChildOption', {
        enumerable: true,
        get: function () {
            return cascader.isChildOption;
        }
    });
    Object.defineProperty(exports, 'isParentOption', {
        enumerable: true,
        get: function () {
            return cascader.isParentOption;
        }
    });
    Object.defineProperty(exports, 'isShowSearchObject', {
        enumerable: true,
        get: function () {
            return cascader.isShowSearchObject;
        }
    });
    Object.defineProperty(exports, 'NzCheckboxComponent', {
        enumerable: true,
        get: function () {
            return checkbox.NzCheckboxComponent;
        }
    });
    Object.defineProperty(exports, 'NzCheckboxGroupComponent', {
        enumerable: true,
        get: function () {
            return checkbox.NzCheckboxGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzCheckboxModule', {
        enumerable: true,
        get: function () {
            return checkbox.NzCheckboxModule;
        }
    });
    Object.defineProperty(exports, 'NzCheckboxWrapperComponent', {
        enumerable: true,
        get: function () {
            return checkbox.NzCheckboxWrapperComponent;
        }
    });
    Object.defineProperty(exports, 'NzCollapseComponent', {
        enumerable: true,
        get: function () {
            return collapse.NzCollapseComponent;
        }
    });
    Object.defineProperty(exports, 'NzCollapseModule', {
        enumerable: true,
        get: function () {
            return collapse.NzCollapseModule;
        }
    });
    Object.defineProperty(exports, 'NzCollapsePanelComponent', {
        enumerable: true,
        get: function () {
            return collapse.NzCollapsePanelComponent;
        }
    });
    Object.defineProperty(exports, 'NzCommentActionComponent', {
        enumerable: true,
        get: function () {
            return comment.NzCommentActionComponent;
        }
    });
    Object.defineProperty(exports, 'NzCommentActionHostDirective', {
        enumerable: true,
        get: function () {
            return comment.NzCommentActionHostDirective;
        }
    });
    Object.defineProperty(exports, 'NzCommentAvatarDirective', {
        enumerable: true,
        get: function () {
            return comment.NzCommentAvatarDirective;
        }
    });
    Object.defineProperty(exports, 'NzCommentComponent', {
        enumerable: true,
        get: function () {
            return comment.NzCommentComponent;
        }
    });
    Object.defineProperty(exports, 'NzCommentContentDirective', {
        enumerable: true,
        get: function () {
            return comment.NzCommentContentDirective;
        }
    });
    Object.defineProperty(exports, 'NzCommentModule', {
        enumerable: true,
        get: function () {
            return comment.NzCommentModule;
        }
    });
    Object.defineProperty(exports, 'PREFIX', {
        enumerable: true,
        get: function () {
            return logger.PREFIX;
        }
    });
    Object.defineProperty(exports, 'log', {
        enumerable: true,
        get: function () {
            return logger.log;
        }
    });
    Object.defineProperty(exports, 'warn', {
        enumerable: true,
        get: function () {
            return logger.warn;
        }
    });
    Object.defineProperty(exports, 'warnDeprecation', {
        enumerable: true,
        get: function () {
            return logger.warnDeprecation;
        }
    });
    Object.defineProperty(exports, 'NzNoAnimationDirective', {
        enumerable: true,
        get: function () {
            return noAnimation.NzNoAnimationDirective;
        }
    });
    Object.defineProperty(exports, 'NzNoAnimationModule', {
        enumerable: true,
        get: function () {
            return noAnimation.NzNoAnimationModule;
        }
    });
    Object.defineProperty(exports, 'NzTransButtonDirective', {
        enumerable: true,
        get: function () {
            return transButton.NzTransButtonDirective;
        }
    });
    Object.defineProperty(exports, 'NzTransButtonModule', {
        enumerable: true,
        get: function () {
            return transButton.NzTransButtonModule;
        }
    });
    Object.defineProperty(exports, 'NZ_WAVE_GLOBAL_CONFIG', {
        enumerable: true,
        get: function () {
            return wave.NZ_WAVE_GLOBAL_CONFIG;
        }
    });
    Object.defineProperty(exports, 'NZ_WAVE_GLOBAL_CONFIG_FACTORY', {
        enumerable: true,
        get: function () {
            return wave.NZ_WAVE_GLOBAL_CONFIG_FACTORY;
        }
    });
    Object.defineProperty(exports, 'NZ_WAVE_GLOBAL_DEFAULT_CONFIG', {
        enumerable: true,
        get: function () {
            return wave.NZ_WAVE_GLOBAL_DEFAULT_CONFIG;
        }
    });
    Object.defineProperty(exports, 'NzWaveDirective', {
        enumerable: true,
        get: function () {
            return wave.NzWaveDirective;
        }
    });
    Object.defineProperty(exports, 'NzWaveModule', {
        enumerable: true,
        get: function () {
            return wave.NzWaveModule;
        }
    });
    Object.defineProperty(exports, 'NzWaveRenderer', {
        enumerable: true,
        get: function () {
            return wave.NzWaveRenderer;
        }
    });
    Object.defineProperty(exports, 'LibPackerModule', {
        enumerable: true,
        get: function () {
            return datePicker.LibPackerModule;
        }
    });
    Object.defineProperty(exports, 'NzDatePickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.NzDatePickerComponent;
        }
    });
    Object.defineProperty(exports, 'NzDatePickerModule', {
        enumerable: true,
        get: function () {
            return datePicker.NzDatePickerModule;
        }
    });
    Object.defineProperty(exports, 'NzMonthPickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.NzMonthPickerComponent;
        }
    });
    Object.defineProperty(exports, 'NzRangePickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.NzRangePickerComponent;
        }
    });
    Object.defineProperty(exports, 'NzWeekPickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.NzWeekPickerComponent;
        }
    });
    Object.defineProperty(exports, 'NzYearPickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.NzYearPickerComponent;
        }
    });
    Object.defineProperty(exports, 'PREFIX_CLASS', {
        enumerable: true,
        get: function () {
            return datePicker.PREFIX_CLASS;
        }
    });
    Object.defineProperty(exports, 'getTimeConfig', {
        enumerable: true,
        get: function () {
            return datePicker.getTimeConfig;
        }
    });
    Object.defineProperty(exports, 'isAllowedDate', {
        enumerable: true,
        get: function () {
            return datePicker.isAllowedDate;
        }
    });
    Object.defineProperty(exports, 'isTimeValid', {
        enumerable: true,
        get: function () {
            return datePicker.isTimeValid;
        }
    });
    Object.defineProperty(exports, 'isTimeValidByConfig', {
        enumerable: true,
        get: function () {
            return datePicker.isTimeValidByConfig;
        }
    });
    Object.defineProperty(exports, 'transCompatFormat', {
        enumerable: true,
        get: function () {
            return datePicker.transCompatFormat;
        }
    });
    Object.defineProperty(exports, '??AbstractPanelHeader', {
        enumerable: true,
        get: function () {
            return datePicker.??AbstractPanelHeader;
        }
    });
    Object.defineProperty(exports, '??AbstractTable', {
        enumerable: true,
        get: function () {
            return datePicker.??AbstractTable;
        }
    });
    Object.defineProperty(exports, '??CalendarFooterComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??CalendarFooterComponent;
        }
    });
    Object.defineProperty(exports, '??DateHeaderComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??DateHeaderComponent;
        }
    });
    Object.defineProperty(exports, '??DatePickerService', {
        enumerable: true,
        get: function () {
            return datePicker.??DatePickerService;
        }
    });
    Object.defineProperty(exports, '??DateRangePopupComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??DateRangePopupComponent;
        }
    });
    Object.defineProperty(exports, '??DateTableComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??DateTableComponent;
        }
    });
    Object.defineProperty(exports, '??DecadeHeaderComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??DecadeHeaderComponent;
        }
    });
    Object.defineProperty(exports, '??DecadeTableComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??DecadeTableComponent;
        }
    });
    Object.defineProperty(exports, '??InnerPopupComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??InnerPopupComponent;
        }
    });
    Object.defineProperty(exports, '??MonthHeaderComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??MonthHeaderComponent;
        }
    });
    Object.defineProperty(exports, '??MonthTableComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??MonthTableComponent;
        }
    });
    Object.defineProperty(exports, '??NzPickerComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??NzPickerComponent;
        }
    });
    Object.defineProperty(exports, '??YearHeaderComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??YearHeaderComponent;
        }
    });
    Object.defineProperty(exports, '??YearTableComponent', {
        enumerable: true,
        get: function () {
            return datePicker.??YearTableComponent;
        }
    });
    Object.defineProperty(exports, 'NzDescriptionsComponent', {
        enumerable: true,
        get: function () {
            return descriptions.NzDescriptionsComponent;
        }
    });
    Object.defineProperty(exports, 'NzDescriptionsItemComponent', {
        enumerable: true,
        get: function () {
            return descriptions.NzDescriptionsItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzDescriptionsModule', {
        enumerable: true,
        get: function () {
            return descriptions.NzDescriptionsModule;
        }
    });
    Object.defineProperty(exports, 'NzDividerComponent', {
        enumerable: true,
        get: function () {
            return divider.NzDividerComponent;
        }
    });
    Object.defineProperty(exports, 'NzDividerModule', {
        enumerable: true,
        get: function () {
            return divider.NzDividerModule;
        }
    });
    Object.defineProperty(exports, 'DRAWER_ANIMATE_DURATION', {
        enumerable: true,
        get: function () {
            return drawer.DRAWER_ANIMATE_DURATION;
        }
    });
    Object.defineProperty(exports, 'DrawerBuilderForService', {
        enumerable: true,
        get: function () {
            return drawer.DrawerBuilderForService;
        }
    });
    Object.defineProperty(exports, 'NzDrawerComponent', {
        enumerable: true,
        get: function () {
            return drawer.NzDrawerComponent;
        }
    });
    Object.defineProperty(exports, 'NzDrawerModule', {
        enumerable: true,
        get: function () {
            return drawer.NzDrawerModule;
        }
    });
    Object.defineProperty(exports, 'NzDrawerRef', {
        enumerable: true,
        get: function () {
            return drawer.NzDrawerRef;
        }
    });
    Object.defineProperty(exports, 'NzDrawerService', {
        enumerable: true,
        get: function () {
            return drawer.NzDrawerService;
        }
    });
    Object.defineProperty(exports, 'NzDrawerServiceModule', {
        enumerable: true,
        get: function () {
            return drawer.NzDrawerServiceModule;
        }
    });
    Object.defineProperty(exports, 'NzContextMenuService', {
        enumerable: true,
        get: function () {
            return dropdown.NzContextMenuService;
        }
    });
    Object.defineProperty(exports, 'NzContextMenuServiceModule', {
        enumerable: true,
        get: function () {
            return dropdown.NzContextMenuServiceModule;
        }
    });
    Object.defineProperty(exports, 'NzDropDownADirective', {
        enumerable: true,
        get: function () {
            return dropdown.NzDropDownADirective;
        }
    });
    Object.defineProperty(exports, 'NzDropDownDirective', {
        enumerable: true,
        get: function () {
            return dropdown.NzDropDownDirective;
        }
    });
    Object.defineProperty(exports, 'NzDropDownModule', {
        enumerable: true,
        get: function () {
            return dropdown.NzDropDownModule;
        }
    });
    Object.defineProperty(exports, 'NzDropdownButtonDirective', {
        enumerable: true,
        get: function () {
            return dropdown.NzDropdownButtonDirective;
        }
    });
    Object.defineProperty(exports, 'NzDropdownMenuComponent', {
        enumerable: true,
        get: function () {
            return dropdown.NzDropdownMenuComponent;
        }
    });
    Object.defineProperty(exports, 'NZ_EMPTY_COMPONENT_NAME', {
        enumerable: true,
        get: function () {
            return empty.NZ_EMPTY_COMPONENT_NAME;
        }
    });
    Object.defineProperty(exports, 'NzEmbedEmptyComponent', {
        enumerable: true,
        get: function () {
            return empty.NzEmbedEmptyComponent;
        }
    });
    Object.defineProperty(exports, 'NzEmptyComponent', {
        enumerable: true,
        get: function () {
            return empty.NzEmptyComponent;
        }
    });
    Object.defineProperty(exports, 'NzEmptyDefaultComponent', {
        enumerable: true,
        get: function () {
            return empty.NzEmptyDefaultComponent;
        }
    });
    Object.defineProperty(exports, 'NzEmptyModule', {
        enumerable: true,
        get: function () {
            return empty.NzEmptyModule;
        }
    });
    Object.defineProperty(exports, 'NzEmptySimpleComponent', {
        enumerable: true,
        get: function () {
            return empty.NzEmptySimpleComponent;
        }
    });
    Object.defineProperty(exports, 'NzFormControlComponent', {
        enumerable: true,
        get: function () {
            return form.NzFormControlComponent;
        }
    });
    Object.defineProperty(exports, 'NzFormDirective', {
        enumerable: true,
        get: function () {
            return form.NzFormDirective;
        }
    });
    Object.defineProperty(exports, 'NzFormItemComponent', {
        enumerable: true,
        get: function () {
            return form.NzFormItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzFormLabelComponent', {
        enumerable: true,
        get: function () {
            return form.NzFormLabelComponent;
        }
    });
    Object.defineProperty(exports, 'NzFormModule', {
        enumerable: true,
        get: function () {
            return form.NzFormModule;
        }
    });
    Object.defineProperty(exports, 'NzFormSplitComponent', {
        enumerable: true,
        get: function () {
            return form.NzFormSplitComponent;
        }
    });
    Object.defineProperty(exports, 'NzFormTextComponent', {
        enumerable: true,
        get: function () {
            return form.NzFormTextComponent;
        }
    });
    Object.defineProperty(exports, 'NzColDirective', {
        enumerable: true,
        get: function () {
            return grid.NzColDirective;
        }
    });
    Object.defineProperty(exports, 'NzGridModule', {
        enumerable: true,
        get: function () {
            return grid.NzGridModule;
        }
    });
    Object.defineProperty(exports, 'NzRowDirective', {
        enumerable: true,
        get: function () {
            return grid.NzRowDirective;
        }
    });
    Object.defineProperty(exports, 'DATE_HELPER_SERVICE_FACTORY', {
        enumerable: true,
        get: function () {
            return i18n.DATE_HELPER_SERVICE_FACTORY;
        }
    });
    Object.defineProperty(exports, 'DateHelperByDateFns', {
        enumerable: true,
        get: function () {
            return i18n.DateHelperByDateFns;
        }
    });
    Object.defineProperty(exports, 'DateHelperByDatePipe', {
        enumerable: true,
        get: function () {
            return i18n.DateHelperByDatePipe;
        }
    });
    Object.defineProperty(exports, 'DateHelperService', {
        enumerable: true,
        get: function () {
            return i18n.DateHelperService;
        }
    });
    Object.defineProperty(exports, 'NZ_DATE_CONFIG', {
        enumerable: true,
        get: function () {
            return i18n.NZ_DATE_CONFIG;
        }
    });
    Object.defineProperty(exports, 'NZ_DATE_CONFIG_DEFAULT', {
        enumerable: true,
        get: function () {
            return i18n.NZ_DATE_CONFIG_DEFAULT;
        }
    });
    Object.defineProperty(exports, 'NZ_DATE_FNS_COMPATIBLE', {
        enumerable: true,
        get: function () {
            return i18n.NZ_DATE_FNS_COMPATIBLE;
        }
    });
    Object.defineProperty(exports, 'NZ_DATE_LOCALE', {
        enumerable: true,
        get: function () {
            return i18n.NZ_DATE_LOCALE;
        }
    });
    Object.defineProperty(exports, 'NZ_I18N', {
        enumerable: true,
        get: function () {
            return i18n.NZ_I18N;
        }
    });
    Object.defineProperty(exports, 'NzI18nModule', {
        enumerable: true,
        get: function () {
            return i18n.NzI18nModule;
        }
    });
    Object.defineProperty(exports, 'NzI18nPipe', {
        enumerable: true,
        get: function () {
            return i18n.NzI18nPipe;
        }
    });
    Object.defineProperty(exports, 'NzI18nService', {
        enumerable: true,
        get: function () {
            return i18n.NzI18nService;
        }
    });
    Object.defineProperty(exports, 'ar_EG', {
        enumerable: true,
        get: function () {
            return i18n.ar_EG;
        }
    });
    Object.defineProperty(exports, 'az_AZ', {
        enumerable: true,
        get: function () {
            return i18n.az_AZ;
        }
    });
    Object.defineProperty(exports, 'bg_BG', {
        enumerable: true,
        get: function () {
            return i18n.bg_BG;
        }
    });
    Object.defineProperty(exports, 'ca_ES', {
        enumerable: true,
        get: function () {
            return i18n.ca_ES;
        }
    });
    Object.defineProperty(exports, 'convertTokens', {
        enumerable: true,
        get: function () {
            return i18n.convertTokens;
        }
    });
    Object.defineProperty(exports, 'cs_CZ', {
        enumerable: true,
        get: function () {
            return i18n.cs_CZ;
        }
    });
    Object.defineProperty(exports, 'da_DK', {
        enumerable: true,
        get: function () {
            return i18n.da_DK;
        }
    });
    Object.defineProperty(exports, 'de_DE', {
        enumerable: true,
        get: function () {
            return i18n.de_DE;
        }
    });
    Object.defineProperty(exports, 'el_GR', {
        enumerable: true,
        get: function () {
            return i18n.el_GR;
        }
    });
    Object.defineProperty(exports, 'en_GB', {
        enumerable: true,
        get: function () {
            return i18n.en_GB;
        }
    });
    Object.defineProperty(exports, 'en_US', {
        enumerable: true,
        get: function () {
            return i18n.en_US;
        }
    });
    Object.defineProperty(exports, 'es_ES', {
        enumerable: true,
        get: function () {
            return i18n.es_ES;
        }
    });
    Object.defineProperty(exports, 'et_EE', {
        enumerable: true,
        get: function () {
            return i18n.et_EE;
        }
    });
    Object.defineProperty(exports, 'fa_IR', {
        enumerable: true,
        get: function () {
            return i18n.fa_IR;
        }
    });
    Object.defineProperty(exports, 'fi_FI', {
        enumerable: true,
        get: function () {
            return i18n.fi_FI;
        }
    });
    Object.defineProperty(exports, 'fr_BE', {
        enumerable: true,
        get: function () {
            return i18n.fr_BE;
        }
    });
    Object.defineProperty(exports, 'fr_FR', {
        enumerable: true,
        get: function () {
            return i18n.fr_FR;
        }
    });
    Object.defineProperty(exports, 'he_IL', {
        enumerable: true,
        get: function () {
            return i18n.he_IL;
        }
    });
    Object.defineProperty(exports, 'hi_IN', {
        enumerable: true,
        get: function () {
            return i18n.hi_IN;
        }
    });
    Object.defineProperty(exports, 'hr_HR', {
        enumerable: true,
        get: function () {
            return i18n.hr_HR;
        }
    });
    Object.defineProperty(exports, 'hu_HU', {
        enumerable: true,
        get: function () {
            return i18n.hu_HU;
        }
    });
    Object.defineProperty(exports, 'hy_AM', {
        enumerable: true,
        get: function () {
            return i18n.hy_AM;
        }
    });
    Object.defineProperty(exports, 'id_ID', {
        enumerable: true,
        get: function () {
            return i18n.id_ID;
        }
    });
    Object.defineProperty(exports, 'is_IS', {
        enumerable: true,
        get: function () {
            return i18n.is_IS;
        }
    });
    Object.defineProperty(exports, 'it_IT', {
        enumerable: true,
        get: function () {
            return i18n.it_IT;
        }
    });
    Object.defineProperty(exports, 'ja_JP', {
        enumerable: true,
        get: function () {
            return i18n.ja_JP;
        }
    });
    Object.defineProperty(exports, 'ka_GE', {
        enumerable: true,
        get: function () {
            return i18n.ka_GE;
        }
    });
    Object.defineProperty(exports, 'kn_IN', {
        enumerable: true,
        get: function () {
            return i18n.kn_IN;
        }
    });
    Object.defineProperty(exports, 'ko_KR', {
        enumerable: true,
        get: function () {
            return i18n.ko_KR;
        }
    });
    Object.defineProperty(exports, 'ku_IQ', {
        enumerable: true,
        get: function () {
            return i18n.ku_IQ;
        }
    });
    Object.defineProperty(exports, 'lv_LV', {
        enumerable: true,
        get: function () {
            return i18n.lv_LV;
        }
    });
    Object.defineProperty(exports, 'mergeDateConfig', {
        enumerable: true,
        get: function () {
            return i18n.mergeDateConfig;
        }
    });
    Object.defineProperty(exports, 'mk_MK', {
        enumerable: true,
        get: function () {
            return i18n.mk_MK;
        }
    });
    Object.defineProperty(exports, 'mn_MN', {
        enumerable: true,
        get: function () {
            return i18n.mn_MN;
        }
    });
    Object.defineProperty(exports, 'ms_MY', {
        enumerable: true,
        get: function () {
            return i18n.ms_MY;
        }
    });
    Object.defineProperty(exports, 'nb_NO', {
        enumerable: true,
        get: function () {
            return i18n.nb_NO;
        }
    });
    Object.defineProperty(exports, 'ne_NP', {
        enumerable: true,
        get: function () {
            return i18n.ne_NP;
        }
    });
    Object.defineProperty(exports, 'nl_BE', {
        enumerable: true,
        get: function () {
            return i18n.nl_BE;
        }
    });
    Object.defineProperty(exports, 'nl_NL', {
        enumerable: true,
        get: function () {
            return i18n.nl_NL;
        }
    });
    Object.defineProperty(exports, 'pl_PL', {
        enumerable: true,
        get: function () {
            return i18n.pl_PL;
        }
    });
    Object.defineProperty(exports, 'pt_BR', {
        enumerable: true,
        get: function () {
            return i18n.pt_BR;
        }
    });
    Object.defineProperty(exports, 'pt_PT', {
        enumerable: true,
        get: function () {
            return i18n.pt_PT;
        }
    });
    Object.defineProperty(exports, 'ro_RO', {
        enumerable: true,
        get: function () {
            return i18n.ro_RO;
        }
    });
    Object.defineProperty(exports, 'ru_RU', {
        enumerable: true,
        get: function () {
            return i18n.ru_RU;
        }
    });
    Object.defineProperty(exports, 'sk_SK', {
        enumerable: true,
        get: function () {
            return i18n.sk_SK;
        }
    });
    Object.defineProperty(exports, 'sl_SI', {
        enumerable: true,
        get: function () {
            return i18n.sl_SI;
        }
    });
    Object.defineProperty(exports, 'sr_RS', {
        enumerable: true,
        get: function () {
            return i18n.sr_RS;
        }
    });
    Object.defineProperty(exports, 'sv_SE', {
        enumerable: true,
        get: function () {
            return i18n.sv_SE;
        }
    });
    Object.defineProperty(exports, 'ta_IN', {
        enumerable: true,
        get: function () {
            return i18n.ta_IN;
        }
    });
    Object.defineProperty(exports, 'th_TH', {
        enumerable: true,
        get: function () {
            return i18n.th_TH;
        }
    });
    Object.defineProperty(exports, 'tr_TR', {
        enumerable: true,
        get: function () {
            return i18n.tr_TR;
        }
    });
    Object.defineProperty(exports, 'uk_UA', {
        enumerable: true,
        get: function () {
            return i18n.uk_UA;
        }
    });
    Object.defineProperty(exports, 'vi_VN', {
        enumerable: true,
        get: function () {
            return i18n.vi_VN;
        }
    });
    Object.defineProperty(exports, 'zh_CN', {
        enumerable: true,
        get: function () {
            return i18n.zh_CN;
        }
    });
    Object.defineProperty(exports, 'zh_TW', {
        enumerable: true,
        get: function () {
            return i18n.zh_TW;
        }
    });
    Object.defineProperty(exports, 'DEFAULT_TWOTONE_COLOR', {
        enumerable: true,
        get: function () {
            return icon.DEFAULT_TWOTONE_COLOR;
        }
    });
    Object.defineProperty(exports, 'NZ_ICONS', {
        enumerable: true,
        get: function () {
            return icon.NZ_ICONS;
        }
    });
    Object.defineProperty(exports, 'NZ_ICONS_PATCH', {
        enumerable: true,
        get: function () {
            return icon.NZ_ICONS_PATCH;
        }
    });
    Object.defineProperty(exports, 'NZ_ICON_DEFAULT_TWOTONE_COLOR', {
        enumerable: true,
        get: function () {
            return icon.NZ_ICON_DEFAULT_TWOTONE_COLOR;
        }
    });
    Object.defineProperty(exports, 'NzIconDirective', {
        enumerable: true,
        get: function () {
            return icon.NzIconDirective;
        }
    });
    Object.defineProperty(exports, 'NzIconModule', {
        enumerable: true,
        get: function () {
            return icon.NzIconModule;
        }
    });
    Object.defineProperty(exports, 'NzIconPatchService', {
        enumerable: true,
        get: function () {
            return icon.NzIconPatchService;
        }
    });
    Object.defineProperty(exports, 'NzIconService', {
        enumerable: true,
        get: function () {
            return icon.NzIconService;
        }
    });
    Object.defineProperty(exports, 'NzAutosizeDirective', {
        enumerable: true,
        get: function () {
            return input.NzAutosizeDirective;
        }
    });
    Object.defineProperty(exports, 'NzInputDirective', {
        enumerable: true,
        get: function () {
            return input.NzInputDirective;
        }
    });
    Object.defineProperty(exports, 'NzInputGroupComponent', {
        enumerable: true,
        get: function () {
            return input.NzInputGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzInputGroupSlotComponent', {
        enumerable: true,
        get: function () {
            return input.NzInputGroupSlotComponent;
        }
    });
    Object.defineProperty(exports, 'NzInputGroupWhitSuffixOrPrefixDirective', {
        enumerable: true,
        get: function () {
            return input.NzInputGroupWhitSuffixOrPrefixDirective;
        }
    });
    Object.defineProperty(exports, 'NzInputModule', {
        enumerable: true,
        get: function () {
            return input.NzInputModule;
        }
    });
    Object.defineProperty(exports, 'NzInputNumberComponent', {
        enumerable: true,
        get: function () {
            return inputNumber.NzInputNumberComponent;
        }
    });
    Object.defineProperty(exports, 'NzInputNumberModule', {
        enumerable: true,
        get: function () {
            return inputNumber.NzInputNumberModule;
        }
    });
    Object.defineProperty(exports, 'NzContentComponent', {
        enumerable: true,
        get: function () {
            return layout.NzContentComponent;
        }
    });
    Object.defineProperty(exports, 'NzFooterComponent', {
        enumerable: true,
        get: function () {
            return layout.NzFooterComponent;
        }
    });
    Object.defineProperty(exports, 'NzHeaderComponent', {
        enumerable: true,
        get: function () {
            return layout.NzHeaderComponent;
        }
    });
    Object.defineProperty(exports, 'NzLayoutComponent', {
        enumerable: true,
        get: function () {
            return layout.NzLayoutComponent;
        }
    });
    Object.defineProperty(exports, 'NzLayoutModule', {
        enumerable: true,
        get: function () {
            return layout.NzLayoutModule;
        }
    });
    Object.defineProperty(exports, 'NzSiderComponent', {
        enumerable: true,
        get: function () {
            return layout.NzSiderComponent;
        }
    });
    Object.defineProperty(exports, '??NzSiderTriggerComponent', {
        enumerable: true,
        get: function () {
            return layout.??NzSiderTriggerComponent;
        }
    });
    Object.defineProperty(exports, 'NzListComponent', {
        enumerable: true,
        get: function () {
            return list.NzListComponent;
        }
    });
    Object.defineProperty(exports, 'NzListEmptyComponent', {
        enumerable: true,
        get: function () {
            return list.NzListEmptyComponent;
        }
    });
    Object.defineProperty(exports, 'NzListFooterComponent', {
        enumerable: true,
        get: function () {
            return list.NzListFooterComponent;
        }
    });
    Object.defineProperty(exports, 'NzListGridDirective', {
        enumerable: true,
        get: function () {
            return list.NzListGridDirective;
        }
    });
    Object.defineProperty(exports, 'NzListHeaderComponent', {
        enumerable: true,
        get: function () {
            return list.NzListHeaderComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemActionComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemActionComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemActionsComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemActionsComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemExtraComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemExtraComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemMetaAvatarComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemMetaAvatarComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemMetaComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemMetaComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemMetaDescriptionComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemMetaDescriptionComponent;
        }
    });
    Object.defineProperty(exports, 'NzListItemMetaTitleComponent', {
        enumerable: true,
        get: function () {
            return list.NzListItemMetaTitleComponent;
        }
    });
    Object.defineProperty(exports, 'NzListLoadMoreDirective', {
        enumerable: true,
        get: function () {
            return list.NzListLoadMoreDirective;
        }
    });
    Object.defineProperty(exports, 'NzListModule', {
        enumerable: true,
        get: function () {
            return list.NzListModule;
        }
    });
    Object.defineProperty(exports, 'NzListPaginationComponent', {
        enumerable: true,
        get: function () {
            return list.NzListPaginationComponent;
        }
    });
    Object.defineProperty(exports, 'NZ_MENTION_TRIGGER_ACCESSOR', {
        enumerable: true,
        get: function () {
            return mention.NZ_MENTION_TRIGGER_ACCESSOR;
        }
    });
    Object.defineProperty(exports, 'NzMentionComponent', {
        enumerable: true,
        get: function () {
            return mention.NzMentionComponent;
        }
    });
    Object.defineProperty(exports, 'NzMentionModule', {
        enumerable: true,
        get: function () {
            return mention.NzMentionModule;
        }
    });
    Object.defineProperty(exports, 'NzMentionService', {
        enumerable: true,
        get: function () {
            return mention.NzMentionService;
        }
    });
    Object.defineProperty(exports, 'NzMentionSuggestionDirective', {
        enumerable: true,
        get: function () {
            return mention.NzMentionSuggestionDirective;
        }
    });
    Object.defineProperty(exports, 'NzMentionTriggerDirective', {
        enumerable: true,
        get: function () {
            return mention.NzMentionTriggerDirective;
        }
    });
    Object.defineProperty(exports, 'MenuDropDownTokenFactory', {
        enumerable: true,
        get: function () {
            return menu.MenuDropDownTokenFactory;
        }
    });
    Object.defineProperty(exports, 'MenuGroupFactory', {
        enumerable: true,
        get: function () {
            return menu.MenuGroupFactory;
        }
    });
    Object.defineProperty(exports, 'MenuService', {
        enumerable: true,
        get: function () {
            return menu.MenuService;
        }
    });
    Object.defineProperty(exports, 'MenuServiceFactory', {
        enumerable: true,
        get: function () {
            return menu.MenuServiceFactory;
        }
    });
    Object.defineProperty(exports, 'NzIsMenuInsideDropDownToken', {
        enumerable: true,
        get: function () {
            return menu.NzIsMenuInsideDropDownToken;
        }
    });
    Object.defineProperty(exports, 'NzMenuDirective', {
        enumerable: true,
        get: function () {
            return menu.NzMenuDirective;
        }
    });
    Object.defineProperty(exports, 'NzMenuDividerDirective', {
        enumerable: true,
        get: function () {
            return menu.NzMenuDividerDirective;
        }
    });
    Object.defineProperty(exports, 'NzMenuGroupComponent', {
        enumerable: true,
        get: function () {
            return menu.NzMenuGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzMenuItemDirective', {
        enumerable: true,
        get: function () {
            return menu.NzMenuItemDirective;
        }
    });
    Object.defineProperty(exports, 'NzMenuModule', {
        enumerable: true,
        get: function () {
            return menu.NzMenuModule;
        }
    });
    Object.defineProperty(exports, 'NzMenuServiceLocalToken', {
        enumerable: true,
        get: function () {
            return menu.NzMenuServiceLocalToken;
        }
    });
    Object.defineProperty(exports, 'NzSubMenuComponent', {
        enumerable: true,
        get: function () {
            return menu.NzSubMenuComponent;
        }
    });
    Object.defineProperty(exports, 'NzSubMenuTitleComponent', {
        enumerable: true,
        get: function () {
            return menu.NzSubMenuTitleComponent;
        }
    });
    Object.defineProperty(exports, 'NzSubmenuInlineChildComponent', {
        enumerable: true,
        get: function () {
            return menu.NzSubmenuInlineChildComponent;
        }
    });
    Object.defineProperty(exports, 'NzSubmenuNoneInlineChildComponent', {
        enumerable: true,
        get: function () {
            return menu.NzSubmenuNoneInlineChildComponent;
        }
    });
    Object.defineProperty(exports, 'NzSubmenuService', {
        enumerable: true,
        get: function () {
            return menu.NzSubmenuService;
        }
    });
    Object.defineProperty(exports, 'NzMNComponent', {
        enumerable: true,
        get: function () {
            return message.NzMNComponent;
        }
    });
    Object.defineProperty(exports, 'NzMNContainerComponent', {
        enumerable: true,
        get: function () {
            return message.NzMNContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzMNService', {
        enumerable: true,
        get: function () {
            return message.NzMNService;
        }
    });
    Object.defineProperty(exports, 'NzMessageComponent', {
        enumerable: true,
        get: function () {
            return message.NzMessageComponent;
        }
    });
    Object.defineProperty(exports, 'NzMessageContainerComponent', {
        enumerable: true,
        get: function () {
            return message.NzMessageContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzMessageModule', {
        enumerable: true,
        get: function () {
            return message.NzMessageModule;
        }
    });
    Object.defineProperty(exports, 'NzMessageService', {
        enumerable: true,
        get: function () {
            return message.NzMessageService;
        }
    });
    Object.defineProperty(exports, 'NzMessageServiceModule', {
        enumerable: true,
        get: function () {
            return message.NzMessageServiceModule;
        }
    });
    Object.defineProperty(exports, 'BaseModalContainer', {
        enumerable: true,
        get: function () {
            return modal.BaseModalContainer;
        }
    });
    Object.defineProperty(exports, 'FADE_CLASS_NAME_MAP', {
        enumerable: true,
        get: function () {
            return modal.FADE_CLASS_NAME_MAP;
        }
    });
    Object.defineProperty(exports, 'MODAL_MASK_CLASS_NAME', {
        enumerable: true,
        get: function () {
            return modal.MODAL_MASK_CLASS_NAME;
        }
    });
    Object.defineProperty(exports, 'ModalOptions', {
        enumerable: true,
        get: function () {
            return modal.ModalOptions;
        }
    });
    Object.defineProperty(exports, 'NZ_CONFIG_COMPONENT_NAME', {
        enumerable: true,
        get: function () {
            return modal.NZ_CONFIG_COMPONENT_NAME;
        }
    });
    Object.defineProperty(exports, 'NzModalCloseComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalCloseComponent;
        }
    });
    Object.defineProperty(exports, 'NzModalComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalComponent;
        }
    });
    Object.defineProperty(exports, 'NzModalConfirmContainerComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalConfirmContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzModalContainerComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzModalFooterComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalFooterComponent;
        }
    });
    Object.defineProperty(exports, 'NzModalFooterDirective', {
        enumerable: true,
        get: function () {
            return modal.NzModalFooterDirective;
        }
    });
    Object.defineProperty(exports, 'NzModalLegacyAPI', {
        enumerable: true,
        get: function () {
            return modal.NzModalLegacyAPI;
        }
    });
    Object.defineProperty(exports, 'NzModalModule', {
        enumerable: true,
        get: function () {
            return modal.NzModalModule;
        }
    });
    Object.defineProperty(exports, 'NzModalRef', {
        enumerable: true,
        get: function () {
            return modal.NzModalRef;
        }
    });
    Object.defineProperty(exports, 'NzModalService', {
        enumerable: true,
        get: function () {
            return modal.NzModalService;
        }
    });
    Object.defineProperty(exports, 'NzModalTitleComponent', {
        enumerable: true,
        get: function () {
            return modal.NzModalTitleComponent;
        }
    });
    Object.defineProperty(exports, 'ZOOM_CLASS_NAME_MAP', {
        enumerable: true,
        get: function () {
            return modal.ZOOM_CLASS_NAME_MAP;
        }
    });
    Object.defineProperty(exports, 'applyConfigDefaults', {
        enumerable: true,
        get: function () {
            return modal.applyConfigDefaults;
        }
    });
    Object.defineProperty(exports, 'getConfigFromComponent', {
        enumerable: true,
        get: function () {
            return modal.getConfigFromComponent;
        }
    });
    Object.defineProperty(exports, 'getValueWithConfig', {
        enumerable: true,
        get: function () {
            return modal.getValueWithConfig;
        }
    });
    Object.defineProperty(exports, 'nzModalAnimations', {
        enumerable: true,
        get: function () {
            return modal.nzModalAnimations;
        }
    });
    Object.defineProperty(exports, 'setContentInstanceParams', {
        enumerable: true,
        get: function () {
            return modal.setContentInstanceParams;
        }
    });
    Object.defineProperty(exports, 'throwNzModalContentAlreadyAttachedError', {
        enumerable: true,
        get: function () {
            return modal.throwNzModalContentAlreadyAttachedError;
        }
    });
    Object.defineProperty(exports, 'NzNotificationComponent', {
        enumerable: true,
        get: function () {
            return notification.NzNotificationComponent;
        }
    });
    Object.defineProperty(exports, 'NzNotificationContainerComponent', {
        enumerable: true,
        get: function () {
            return notification.NzNotificationContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzNotificationModule', {
        enumerable: true,
        get: function () {
            return notification.NzNotificationModule;
        }
    });
    Object.defineProperty(exports, 'NzNotificationService', {
        enumerable: true,
        get: function () {
            return notification.NzNotificationService;
        }
    });
    Object.defineProperty(exports, 'NzNotificationServiceModule', {
        enumerable: true,
        get: function () {
            return notification.NzNotificationServiceModule;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderAvatarDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderAvatarDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderBreadcrumbDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderBreadcrumbDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderComponent', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderComponent;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderContentDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderContentDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderExtraDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderExtraDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderFooterDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderFooterDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderModule', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderModule;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderSubtitleDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderSubtitleDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderTagDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderTagDirective;
        }
    });
    Object.defineProperty(exports, 'NzPageHeaderTitleDirective', {
        enumerable: true,
        get: function () {
            return pageHeader.NzPageHeaderTitleDirective;
        }
    });
    Object.defineProperty(exports, 'NzPaginationComponent', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationComponent;
        }
    });
    Object.defineProperty(exports, 'NzPaginationDefaultComponent', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationDefaultComponent;
        }
    });
    Object.defineProperty(exports, 'NzPaginationItemComponent', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzPaginationModule', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationModule;
        }
    });
    Object.defineProperty(exports, 'NzPaginationOptionsComponent', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationOptionsComponent;
        }
    });
    Object.defineProperty(exports, 'NzPaginationSimpleComponent', {
        enumerable: true,
        get: function () {
            return pagination.NzPaginationSimpleComponent;
        }
    });
    Object.defineProperty(exports, 'NzPopconfirmComponent', {
        enumerable: true,
        get: function () {
            return popconfirm.NzPopconfirmComponent;
        }
    });
    Object.defineProperty(exports, 'NzPopconfirmDirective', {
        enumerable: true,
        get: function () {
            return popconfirm.NzPopconfirmDirective;
        }
    });
    Object.defineProperty(exports, 'NzPopconfirmModule', {
        enumerable: true,
        get: function () {
            return popconfirm.NzPopconfirmModule;
        }
    });
    Object.defineProperty(exports, 'NzPopoverComponent', {
        enumerable: true,
        get: function () {
            return popover.NzPopoverComponent;
        }
    });
    Object.defineProperty(exports, 'NzPopoverDirective', {
        enumerable: true,
        get: function () {
            return popover.NzPopoverDirective;
        }
    });
    Object.defineProperty(exports, 'NzPopoverModule', {
        enumerable: true,
        get: function () {
            return popover.NzPopoverModule;
        }
    });
    Object.defineProperty(exports, 'NzProgressComponent', {
        enumerable: true,
        get: function () {
            return progress.NzProgressComponent;
        }
    });
    Object.defineProperty(exports, 'NzProgressModule', {
        enumerable: true,
        get: function () {
            return progress.NzProgressModule;
        }
    });
    Object.defineProperty(exports, 'NzRadioButtonDirective', {
        enumerable: true,
        get: function () {
            return radio.NzRadioButtonDirective;
        }
    });
    Object.defineProperty(exports, 'NzRadioComponent', {
        enumerable: true,
        get: function () {
            return radio.NzRadioComponent;
        }
    });
    Object.defineProperty(exports, 'NzRadioGroupComponent', {
        enumerable: true,
        get: function () {
            return radio.NzRadioGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzRadioModule', {
        enumerable: true,
        get: function () {
            return radio.NzRadioModule;
        }
    });
    Object.defineProperty(exports, 'NzRadioService', {
        enumerable: true,
        get: function () {
            return radio.NzRadioService;
        }
    });
    Object.defineProperty(exports, 'NzRateComponent', {
        enumerable: true,
        get: function () {
            return rate.NzRateComponent;
        }
    });
    Object.defineProperty(exports, 'NzRateItemComponent', {
        enumerable: true,
        get: function () {
            return rate.NzRateItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzRateModule', {
        enumerable: true,
        get: function () {
            return rate.NzRateModule;
        }
    });
    Object.defineProperty(exports, 'NzResultComponent', {
        enumerable: true,
        get: function () {
            return result.NzResultComponent;
        }
    });
    Object.defineProperty(exports, 'NzResultContentDirective', {
        enumerable: true,
        get: function () {
            return result.NzResultContentDirective;
        }
    });
    Object.defineProperty(exports, 'NzResultExtraDirective', {
        enumerable: true,
        get: function () {
            return result.NzResultExtraDirective;
        }
    });
    Object.defineProperty(exports, 'NzResultIconDirective', {
        enumerable: true,
        get: function () {
            return result.NzResultIconDirective;
        }
    });
    Object.defineProperty(exports, 'NzResultModule', {
        enumerable: true,
        get: function () {
            return result.NzResultModule;
        }
    });
    Object.defineProperty(exports, 'NzResultSubtitleDirective', {
        enumerable: true,
        get: function () {
            return result.NzResultSubtitleDirective;
        }
    });
    Object.defineProperty(exports, 'NzResultTitleDirective', {
        enumerable: true,
        get: function () {
            return result.NzResultTitleDirective;
        }
    });
    Object.defineProperty(exports, '??NzResultNotFoundComponent', {
        enumerable: true,
        get: function () {
            return result.??NzResultNotFoundComponent;
        }
    });
    Object.defineProperty(exports, '??NzResultServerErrorComponent', {
        enumerable: true,
        get: function () {
            return result.??NzResultServerErrorComponent;
        }
    });
    Object.defineProperty(exports, '??NzResultUnauthorizedComponent', {
        enumerable: true,
        get: function () {
            return result.??NzResultUnauthorizedComponent;
        }
    });
    Object.defineProperty(exports, 'NzOptionComponent', {
        enumerable: true,
        get: function () {
            return select.NzOptionComponent;
        }
    });
    Object.defineProperty(exports, 'NzOptionContainerComponent', {
        enumerable: true,
        get: function () {
            return select.NzOptionContainerComponent;
        }
    });
    Object.defineProperty(exports, 'NzOptionGroupComponent', {
        enumerable: true,
        get: function () {
            return select.NzOptionGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzOptionItemComponent', {
        enumerable: true,
        get: function () {
            return select.NzOptionItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzOptionItemGroupComponent', {
        enumerable: true,
        get: function () {
            return select.NzOptionItemGroupComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectArrowComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectArrowComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectClearComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectClearComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectItemComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectModule', {
        enumerable: true,
        get: function () {
            return select.NzSelectModule;
        }
    });
    Object.defineProperty(exports, 'NzSelectPlaceholderComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectPlaceholderComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectSearchComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectSearchComponent;
        }
    });
    Object.defineProperty(exports, 'NzSelectTopControlComponent', {
        enumerable: true,
        get: function () {
            return select.NzSelectTopControlComponent;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonComponent', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonComponent;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonElementAvatarComponent', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonElementAvatarComponent;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonElementButtonComponent', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonElementButtonComponent;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonElementDirective', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonElementDirective;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonElementInputComponent', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonElementInputComponent;
        }
    });
    Object.defineProperty(exports, 'NzSkeletonModule', {
        enumerable: true,
        get: function () {
            return skeleton.NzSkeletonModule;
        }
    });
    Object.defineProperty(exports, 'NzMarks', {
        enumerable: true,
        get: function () {
            return slider.NzMarks;
        }
    });
    Object.defineProperty(exports, 'NzSliderComponent', {
        enumerable: true,
        get: function () {
            return slider.NzSliderComponent;
        }
    });
    Object.defineProperty(exports, 'NzSliderModule', {
        enumerable: true,
        get: function () {
            return slider.NzSliderModule;
        }
    });
    Object.defineProperty(exports, '??NzSliderHandleComponent', {
        enumerable: true,
        get: function () {
            return slider.??NzSliderHandleComponent;
        }
    });
    Object.defineProperty(exports, '??NzSliderMarksComponent', {
        enumerable: true,
        get: function () {
            return slider.??NzSliderMarksComponent;
        }
    });
    Object.defineProperty(exports, '??NzSliderService', {
        enumerable: true,
        get: function () {
            return slider.??NzSliderService;
        }
    });
    Object.defineProperty(exports, '??NzSliderStepComponent', {
        enumerable: true,
        get: function () {
            return slider.??NzSliderStepComponent;
        }
    });
    Object.defineProperty(exports, '??NzSliderTrackComponent', {
        enumerable: true,
        get: function () {
            return slider.??NzSliderTrackComponent;
        }
    });
    Object.defineProperty(exports, 'NzSpinComponent', {
        enumerable: true,
        get: function () {
            return spin.NzSpinComponent;
        }
    });
    Object.defineProperty(exports, 'NzSpinModule', {
        enumerable: true,
        get: function () {
            return spin.NzSpinModule;
        }
    });
    Object.defineProperty(exports, 'NzCountdownComponent', {
        enumerable: true,
        get: function () {
            return statistic.NzCountdownComponent;
        }
    });
    Object.defineProperty(exports, 'NzStatisticComponent', {
        enumerable: true,
        get: function () {
            return statistic.NzStatisticComponent;
        }
    });
    Object.defineProperty(exports, 'NzStatisticModule', {
        enumerable: true,
        get: function () {
            return statistic.NzStatisticModule;
        }
    });
    Object.defineProperty(exports, 'NzStatisticNumberComponent', {
        enumerable: true,
        get: function () {
            return statistic.NzStatisticNumberComponent;
        }
    });
    Object.defineProperty(exports, 'NzStepComponent', {
        enumerable: true,
        get: function () {
            return steps.NzStepComponent;
        }
    });
    Object.defineProperty(exports, 'NzStepsComponent', {
        enumerable: true,
        get: function () {
            return steps.NzStepsComponent;
        }
    });
    Object.defineProperty(exports, 'NzStepsModule', {
        enumerable: true,
        get: function () {
            return steps.NzStepsModule;
        }
    });
    Object.defineProperty(exports, 'NzSwitchComponent', {
        enumerable: true,
        get: function () {
            return _switch.NzSwitchComponent;
        }
    });
    Object.defineProperty(exports, 'NzSwitchModule', {
        enumerable: true,
        get: function () {
            return _switch.NzSwitchModule;
        }
    });
    Object.defineProperty(exports, 'NzCellAlignDirective', {
        enumerable: true,
        get: function () {
            return table.NzCellAlignDirective;
        }
    });
    Object.defineProperty(exports, 'NzCellBreakWordDirective', {
        enumerable: true,
        get: function () {
            return table.NzCellBreakWordDirective;
        }
    });
    Object.defineProperty(exports, 'NzCellEllipsisDirective', {
        enumerable: true,
        get: function () {
            return table.NzCellEllipsisDirective;
        }
    });
    Object.defineProperty(exports, 'NzCellFixedDirective', {
        enumerable: true,
        get: function () {
            return table.NzCellFixedDirective;
        }
    });
    Object.defineProperty(exports, 'NzFilterTriggerComponent', {
        enumerable: true,
        get: function () {
            return table.NzFilterTriggerComponent;
        }
    });
    Object.defineProperty(exports, 'NzRowExpandButtonDirective', {
        enumerable: true,
        get: function () {
            return table.NzRowExpandButtonDirective;
        }
    });
    Object.defineProperty(exports, 'NzRowIndentDirective', {
        enumerable: true,
        get: function () {
            return table.NzRowIndentDirective;
        }
    });
    Object.defineProperty(exports, 'NzTableCellDirective', {
        enumerable: true,
        get: function () {
            return table.NzTableCellDirective;
        }
    });
    Object.defineProperty(exports, 'NzTableComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableContentComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableContentComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableDataService', {
        enumerable: true,
        get: function () {
            return table.NzTableDataService;
        }
    });
    Object.defineProperty(exports, 'NzTableFilterComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableFilterComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableFixedRowComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableFixedRowComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableInnerDefaultComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableInnerDefaultComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableInnerScrollComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableInnerScrollComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableModule', {
        enumerable: true,
        get: function () {
            return table.NzTableModule;
        }
    });
    Object.defineProperty(exports, 'NzTableSelectionComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableSelectionComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableSortersComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableSortersComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableStyleService', {
        enumerable: true,
        get: function () {
            return table.NzTableStyleService;
        }
    });
    Object.defineProperty(exports, 'NzTableTitleFooterComponent', {
        enumerable: true,
        get: function () {
            return table.NzTableTitleFooterComponent;
        }
    });
    Object.defineProperty(exports, 'NzTableVirtualScrollDirective', {
        enumerable: true,
        get: function () {
            return table.NzTableVirtualScrollDirective;
        }
    });
    Object.defineProperty(exports, 'NzTbodyComponent', {
        enumerable: true,
        get: function () {
            return table.NzTbodyComponent;
        }
    });
    Object.defineProperty(exports, 'NzTdAddOnComponent', {
        enumerable: true,
        get: function () {
            return table.NzTdAddOnComponent;
        }
    });
    Object.defineProperty(exports, 'NzThAddOnComponent', {
        enumerable: true,
        get: function () {
            return table.NzThAddOnComponent;
        }
    });
    Object.defineProperty(exports, 'NzThMeasureDirective', {
        enumerable: true,
        get: function () {
            return table.NzThMeasureDirective;
        }
    });
    Object.defineProperty(exports, 'NzThSelectionComponent', {
        enumerable: true,
        get: function () {
            return table.NzThSelectionComponent;
        }
    });
    Object.defineProperty(exports, 'NzTheadComponent', {
        enumerable: true,
        get: function () {
            return table.NzTheadComponent;
        }
    });
    Object.defineProperty(exports, 'NzTrDirective', {
        enumerable: true,
        get: function () {
            return table.NzTrDirective;
        }
    });
    Object.defineProperty(exports, 'NzTrExpandDirective', {
        enumerable: true,
        get: function () {
            return table.NzTrExpandDirective;
        }
    });
    Object.defineProperty(exports, 'NzTrMeasureComponent', {
        enumerable: true,
        get: function () {
            return table.NzTrMeasureComponent;
        }
    });
    Object.defineProperty(exports, 'NzTabBodyComponent', {
        enumerable: true,
        get: function () {
            return tabs.NzTabBodyComponent;
        }
    });
    Object.defineProperty(exports, 'NzTabChangeEvent', {
        enumerable: true,
        get: function () {
            return tabs.NzTabChangeEvent;
        }
    });
    Object.defineProperty(exports, 'NzTabComponent', {
        enumerable: true,
        get: function () {
            return tabs.NzTabComponent;
        }
    });
    Object.defineProperty(exports, 'NzTabDirective', {
        enumerable: true,
        get: function () {
            return tabs.NzTabDirective;
        }
    });
    Object.defineProperty(exports, 'NzTabLabelDirective', {
        enumerable: true,
        get: function () {
            return tabs.NzTabLabelDirective;
        }
    });
    Object.defineProperty(exports, 'NzTabLinkDirective', {
        enumerable: true,
        get: function () {
            return tabs.NzTabLinkDirective;
        }
    });
    Object.defineProperty(exports, 'NzTabSetComponent', {
        enumerable: true,
        get: function () {
            return tabs.NzTabSetComponent;
        }
    });
    Object.defineProperty(exports, 'NzTabsInkBarDirective', {
        enumerable: true,
        get: function () {
            return tabs.NzTabsInkBarDirective;
        }
    });
    Object.defineProperty(exports, 'NzTabsModule', {
        enumerable: true,
        get: function () {
            return tabs.NzTabsModule;
        }
    });
    Object.defineProperty(exports, 'NzTabsNavComponent', {
        enumerable: true,
        get: function () {
            return tabs.NzTabsNavComponent;
        }
    });
    Object.defineProperty(exports, 'NzTagComponent', {
        enumerable: true,
        get: function () {
            return tag.NzTagComponent;
        }
    });
    Object.defineProperty(exports, 'NzTagModule', {
        enumerable: true,
        get: function () {
            return tag.NzTagModule;
        }
    });
    Object.defineProperty(exports, 'NzTimePickerComponent', {
        enumerable: true,
        get: function () {
            return timePicker.NzTimePickerComponent;
        }
    });
    Object.defineProperty(exports, 'NzTimePickerModule', {
        enumerable: true,
        get: function () {
            return timePicker.NzTimePickerModule;
        }
    });
    Object.defineProperty(exports, 'NzTimePickerPanelComponent', {
        enumerable: true,
        get: function () {
            return timePicker.NzTimePickerPanelComponent;
        }
    });
    Object.defineProperty(exports, 'NzTimeValueAccessorDirective', {
        enumerable: true,
        get: function () {
            return timePicker.NzTimeValueAccessorDirective;
        }
    });
    Object.defineProperty(exports, 'NzTimelineComponent', {
        enumerable: true,
        get: function () {
            return timeline.NzTimelineComponent;
        }
    });
    Object.defineProperty(exports, 'NzTimelineItemComponent', {
        enumerable: true,
        get: function () {
            return timeline.NzTimelineItemComponent;
        }
    });
    Object.defineProperty(exports, 'NzTimelineModule', {
        enumerable: true,
        get: function () {
            return timeline.NzTimelineModule;
        }
    });
    Object.defineProperty(exports, 'TimelineService', {
        enumerable: true,
        get: function () {
            return timeline.TimelineService;
        }
    });
    Object.defineProperty(exports, 'NzToolTipComponent', {
        enumerable: true,
        get: function () {
            return tooltip.NzToolTipComponent;
        }
    });
    Object.defineProperty(exports, 'NzToolTipModule', {
        enumerable: true,
        get: function () {
            return tooltip.NzToolTipModule;
        }
    });
    Object.defineProperty(exports, 'NzTooltipBaseComponent', {
        enumerable: true,
        get: function () {
            return tooltip.NzTooltipBaseComponent;
        }
    });
    Object.defineProperty(exports, 'NzTooltipBaseDirective', {
        enumerable: true,
        get: function () {
            return tooltip.NzTooltipBaseDirective;
        }
    });
    Object.defineProperty(exports, 'NzTooltipDirective', {
        enumerable: true,
        get: function () {
            return tooltip.NzTooltipDirective;
        }
    });
    Object.defineProperty(exports, 'isTooltipEmpty', {
        enumerable: true,
        get: function () {
            return tooltip.isTooltipEmpty;
        }
    });
    Object.defineProperty(exports, 'NzTransferComponent', {
        enumerable: true,
        get: function () {
            return transfer.NzTransferComponent;
        }
    });
    Object.defineProperty(exports, 'NzTransferListComponent', {
        enumerable: true,
        get: function () {
            return transfer.NzTransferListComponent;
        }
    });
    Object.defineProperty(exports, 'NzTransferModule', {
        enumerable: true,
        get: function () {
            return transfer.NzTransferModule;
        }
    });
    Object.defineProperty(exports, 'NzTransferSearchComponent', {
        enumerable: true,
        get: function () {
            return transfer.NzTransferSearchComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeIndentComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeIndentComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeModule', {
        enumerable: true,
        get: function () {
            return tree.NzTreeModule;
        }
    });
    Object.defineProperty(exports, 'NzTreeNode', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNode;
        }
    });
    Object.defineProperty(exports, 'NzTreeNodeCheckboxComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNodeCheckboxComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeNodeComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNodeComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeNodeSwitcherComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNodeSwitcherComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeNodeTitleComponent', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNodeTitleComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeService', {
        enumerable: true,
        get: function () {
            return tree.NzTreeService;
        }
    });
    Object.defineProperty(exports, 'NzTreeServiceFactory', {
        enumerable: true,
        get: function () {
            return tree.NzTreeServiceFactory;
        }
    });
    Object.defineProperty(exports, 'NzTreeSelectComponent', {
        enumerable: true,
        get: function () {
            return treeSelect.NzTreeSelectComponent;
        }
    });
    Object.defineProperty(exports, 'NzTreeSelectModule', {
        enumerable: true,
        get: function () {
            return treeSelect.NzTreeSelectModule;
        }
    });
    Object.defineProperty(exports, 'NzTreeSelectService', {
        enumerable: true,
        get: function () {
            return treeSelect.NzTreeSelectService;
        }
    });
    Object.defineProperty(exports, 'higherOrderServiceFactory', {
        enumerable: true,
        get: function () {
            return treeSelect.higherOrderServiceFactory;
        }
    });
    Object.defineProperty(exports, 'NzTextCopyComponent', {
        enumerable: true,
        get: function () {
            return typography.NzTextCopyComponent;
        }
    });
    Object.defineProperty(exports, 'NzTextEditComponent', {
        enumerable: true,
        get: function () {
            return typography.NzTextEditComponent;
        }
    });
    Object.defineProperty(exports, 'NzTypographyComponent', {
        enumerable: true,
        get: function () {
            return typography.NzTypographyComponent;
        }
    });
    Object.defineProperty(exports, 'NzTypographyModule', {
        enumerable: true,
        get: function () {
            return typography.NzTypographyModule;
        }
    });
    Object.defineProperty(exports, 'NzShowUploadListInterface', {
        enumerable: true,
        get: function () {
            return upload.NzShowUploadListInterface;
        }
    });
    Object.defineProperty(exports, 'NzUploadBtnComponent', {
        enumerable: true,
        get: function () {
            return upload.NzUploadBtnComponent;
        }
    });
    Object.defineProperty(exports, 'NzUploadComponent', {
        enumerable: true,
        get: function () {
            return upload.NzUploadComponent;
        }
    });
    Object.defineProperty(exports, 'NzUploadListComponent', {
        enumerable: true,
        get: function () {
            return upload.NzUploadListComponent;
        }
    });
    Object.defineProperty(exports, 'NzUploadModule', {
        enumerable: true,
        get: function () {
            return upload.NzUploadModule;
        }
    });
    Object.defineProperty(exports, 'VERSION', {
        enumerable: true,
        get: function () {
            return version.VERSION;
        }
    });
    Object.defineProperty(exports, 'AnimationCurves', {
        enumerable: true,
        get: function () {
            return animation.AnimationCurves;
        }
    });
    Object.defineProperty(exports, 'AnimationDuration', {
        enumerable: true,
        get: function () {
            return animation.AnimationDuration;
        }
    });
    Object.defineProperty(exports, 'collapseMotion', {
        enumerable: true,
        get: function () {
            return animation.collapseMotion;
        }
    });
    Object.defineProperty(exports, 'fadeMotion', {
        enumerable: true,
        get: function () {
            return animation.fadeMotion;
        }
    });
    Object.defineProperty(exports, 'helpMotion', {
        enumerable: true,
        get: function () {
            return animation.helpMotion;
        }
    });
    Object.defineProperty(exports, 'moveUpMotion', {
        enumerable: true,
        get: function () {
            return animation.moveUpMotion;
        }
    });
    Object.defineProperty(exports, 'notificationMotion', {
        enumerable: true,
        get: function () {
            return animation.notificationMotion;
        }
    });
    Object.defineProperty(exports, 'slideAlertMotion', {
        enumerable: true,
        get: function () {
            return animation.slideAlertMotion;
        }
    });
    Object.defineProperty(exports, 'slideMotion', {
        enumerable: true,
        get: function () {
            return animation.slideMotion;
        }
    });
    Object.defineProperty(exports, 'treeCollapseMotion', {
        enumerable: true,
        get: function () {
            return animation.treeCollapseMotion;
        }
    });
    Object.defineProperty(exports, 'zoomBadgeMotion', {
        enumerable: true,
        get: function () {
            return animation.zoomBadgeMotion;
        }
    });
    Object.defineProperty(exports, 'zoomBigMotion', {
        enumerable: true,
        get: function () {
            return animation.zoomBigMotion;
        }
    });
    Object.defineProperty(exports, 'zoomMotion', {
        enumerable: true,
        get: function () {
            return animation.zoomMotion;
        }
    });
    Object.defineProperty(exports, 'NZ_CONFIG', {
        enumerable: true,
        get: function () {
            return config.NZ_CONFIG;
        }
    });
    Object.defineProperty(exports, 'NzConfigService', {
        enumerable: true,
        get: function () {
            return config.NzConfigService;
        }
    });
    Object.defineProperty(exports, 'WithConfig', {
        enumerable: true,
        get: function () {
            return config.WithConfig;
        }
    });
    Object.defineProperty(exports, 'environment', {
        enumerable: true,
        get: function () {
            return environments.environment;
        }
    });
    Object.defineProperty(exports, 'NzHighlightModule', {
        enumerable: true,
        get: function () {
            return highlight.NzHighlightModule;
        }
    });
    Object.defineProperty(exports, 'NzHighlightPipe', {
        enumerable: true,
        get: function () {
            return highlight.NzHighlightPipe;
        }
    });
    Object.defineProperty(exports, 'NzOutletModule', {
        enumerable: true,
        get: function () {
            return outlet.NzOutletModule;
        }
    });
    Object.defineProperty(exports, 'NzStringTemplateOutletDirective', {
        enumerable: true,
        get: function () {
            return outlet.NzStringTemplateOutletDirective;
        }
    });
    Object.defineProperty(exports, 'DEFAULT_CASCADER_POSITIONS', {
        enumerable: true,
        get: function () {
            return overlay.DEFAULT_CASCADER_POSITIONS;
        }
    });
    Object.defineProperty(exports, 'DEFAULT_MENTION_BOTTOM_POSITIONS', {
        enumerable: true,
        get: function () {
            return overlay.DEFAULT_MENTION_BOTTOM_POSITIONS;
        }
    });
    Object.defineProperty(exports, 'DEFAULT_MENTION_TOP_POSITIONS', {
        enumerable: true,
        get: function () {
            return overlay.DEFAULT_MENTION_TOP_POSITIONS;
        }
    });
    Object.defineProperty(exports, 'DEFAULT_TOOLTIP_POSITIONS', {
        enumerable: true,
        get: function () {
            return overlay.DEFAULT_TOOLTIP_POSITIONS;
        }
    });
    Object.defineProperty(exports, 'NzConnectedOverlayDirective', {
        enumerable: true,
        get: function () {
            return overlay.NzConnectedOverlayDirective;
        }
    });
    Object.defineProperty(exports, 'NzOverlayModule', {
        enumerable: true,
        get: function () {
            return overlay.NzOverlayModule;
        }
    });
    Object.defineProperty(exports, 'POSITION_MAP', {
        enumerable: true,
        get: function () {
            return overlay.POSITION_MAP;
        }
    });
    Object.defineProperty(exports, 'getPlacementName', {
        enumerable: true,
        get: function () {
            return overlay.getPlacementName;
        }
    });
    Object.defineProperty(exports, 'NzPipesModule', {
        enumerable: true,
        get: function () {
            return pipe.NzPipesModule;
        }
    });
    Object.defineProperty(exports, 'NzTimeRangePipe', {
        enumerable: true,
        get: function () {
            return pipe.NzTimeRangePipe;
        }
    });
    Object.defineProperty(exports, 'NzToCssUnitPipe', {
        enumerable: true,
        get: function () {
            return pipe.NzToCssUnitPipe;
        }
    });
    Object.defineProperty(exports, 'cancelRequestAnimationFrame', {
        enumerable: true,
        get: function () {
            return polyfill.cancelRequestAnimationFrame;
        }
    });
    Object.defineProperty(exports, 'reqAnimFrame', {
        enumerable: true,
        get: function () {
            return polyfill.reqAnimFrame;
        }
    });
    Object.defineProperty(exports, 'NzResizeObserver', {
        enumerable: true,
        get: function () {
            return resizeObservers.NzResizeObserver;
        }
    });
    Object.defineProperty(exports, 'NzResizeObserversModule', {
        enumerable: true,
        get: function () {
            return resizeObservers.NzResizeObserversModule;
        }
    });
    Object.defineProperty(exports, '??a', {
        enumerable: true,
        get: function () {
            return resizeObservers.??a;
        }
    });
    Object.defineProperty(exports, 'NzBreakpointEnum', {
        enumerable: true,
        get: function () {
            return services.NzBreakpointEnum;
        }
    });
    Object.defineProperty(exports, 'NzBreakpointService', {
        enumerable: true,
        get: function () {
            return services.NzBreakpointService;
        }
    });
    Object.defineProperty(exports, 'NzDragService', {
        enumerable: true,
        get: function () {
            return services.NzDragService;
        }
    });
    Object.defineProperty(exports, 'NzResizeService', {
        enumerable: true,
        get: function () {
            return services.NzResizeService;
        }
    });
    Object.defineProperty(exports, 'NzScrollService', {
        enumerable: true,
        get: function () {
            return services.NzScrollService;
        }
    });
    Object.defineProperty(exports, 'NzSingletonService', {
        enumerable: true,
        get: function () {
            return services.NzSingletonService;
        }
    });
    Object.defineProperty(exports, 'gridResponsiveMap', {
        enumerable: true,
        get: function () {
            return services.gridResponsiveMap;
        }
    });
    Object.defineProperty(exports, 'siderResponsiveMap', {
        enumerable: true,
        get: function () {
            return services.siderResponsiveMap;
        }
    });
    Object.defineProperty(exports, 'FakeViewportRuler', {
        enumerable: true,
        get: function () {
            return testing.FakeViewportRuler;
        }
    });
    Object.defineProperty(exports, 'MockNgZone', {
        enumerable: true,
        get: function () {
            return testing.MockNgZone;
        }
    });
    Object.defineProperty(exports, 'createFakeEvent', {
        enumerable: true,
        get: function () {
            return testing.createFakeEvent;
        }
    });
    Object.defineProperty(exports, 'createKeyboardEvent', {
        enumerable: true,
        get: function () {
            return testing.createKeyboardEvent;
        }
    });
    Object.defineProperty(exports, 'createMouseEvent', {
        enumerable: true,
        get: function () {
            return testing.createMouseEvent;
        }
    });
    Object.defineProperty(exports, 'createTouchEvent', {
        enumerable: true,
        get: function () {
            return testing.createTouchEvent;
        }
    });
    Object.defineProperty(exports, 'dispatchEvent', {
        enumerable: true,
        get: function () {
            return testing.dispatchEvent;
        }
    });
    Object.defineProperty(exports, 'dispatchFakeEvent', {
        enumerable: true,
        get: function () {
            return testing.dispatchFakeEvent;
        }
    });
    Object.defineProperty(exports, 'dispatchKeyboardEvent', {
        enumerable: true,
        get: function () {
            return testing.dispatchKeyboardEvent;
        }
    });
    Object.defineProperty(exports, 'dispatchMouseEvent', {
        enumerable: true,
        get: function () {
            return testing.dispatchMouseEvent;
        }
    });
    Object.defineProperty(exports, 'dispatchTouchEvent', {
        enumerable: true,
        get: function () {
            return testing.dispatchTouchEvent;
        }
    });
    Object.defineProperty(exports, 'typeInElement', {
        enumerable: true,
        get: function () {
            return testing.typeInElement;
        }
    });
    Object.defineProperty(exports, 'wrappedErrorMessage', {
        enumerable: true,
        get: function () {
            return testing.wrappedErrorMessage;
        }
    });
    Object.defineProperty(exports, '??createComponentBed', {
        enumerable: true,
        get: function () {
            return testing.??createComponentBed;
        }
    });
    Object.defineProperty(exports, 'CandyDate', {
        enumerable: true,
        get: function () {
            return time.CandyDate;
        }
    });
    Object.defineProperty(exports, 'cloneDate', {
        enumerable: true,
        get: function () {
            return time.cloneDate;
        }
    });
    Object.defineProperty(exports, 'normalizeRangeValue', {
        enumerable: true,
        get: function () {
            return time.normalizeRangeValue;
        }
    });
    Object.defineProperty(exports, 'sortRangeValue', {
        enumerable: true,
        get: function () {
            return time.sortRangeValue;
        }
    });
    Object.defineProperty(exports, 'timeUnits', {
        enumerable: true,
        get: function () {
            return time.timeUnits;
        }
    });
    Object.defineProperty(exports, '??NzTransitionPatchDirective', {
        enumerable: true,
        get: function () {
            return transitionPatch.??NzTransitionPatchDirective;
        }
    });
    Object.defineProperty(exports, '??NzTransitionPatchModule', {
        enumerable: true,
        get: function () {
            return transitionPatch.??NzTransitionPatchModule;
        }
    });
    Object.defineProperty(exports, 'NzTreeBase', {
        enumerable: true,
        get: function () {
            return tree$1.NzTreeBase;
        }
    });
    Object.defineProperty(exports, 'NzTreeBaseService', {
        enumerable: true,
        get: function () {
            return tree$1.NzTreeBaseService;
        }
    });
    Object.defineProperty(exports, 'NzTreeHigherOrderServiceToken', {
        enumerable: true,
        get: function () {
            return tree$1.NzTreeHigherOrderServiceToken;
        }
    });
    Object.defineProperty(exports, 'flattenTreeData', {
        enumerable: true,
        get: function () {
            return tree$1.flattenTreeData;
        }
    });
    Object.defineProperty(exports, 'getKey', {
        enumerable: true,
        get: function () {
            return tree$1.getKey;
        }
    });
    Object.defineProperty(exports, 'getPosition', {
        enumerable: true,
        get: function () {
            return tree$1.getPosition;
        }
    });
    Object.defineProperty(exports, 'isCheckDisabled', {
        enumerable: true,
        get: function () {
            return tree$1.isCheckDisabled;
        }
    });
    Object.defineProperty(exports, 'isInArray', {
        enumerable: true,
        get: function () {
            return tree$1.isInArray;
        }
    });
    Object.defineProperty(exports, 'InputBoolean', {
        enumerable: true,
        get: function () {
            return util.InputBoolean;
        }
    });
    Object.defineProperty(exports, 'InputCssPixel', {
        enumerable: true,
        get: function () {
            return util.InputCssPixel;
        }
    });
    Object.defineProperty(exports, 'InputNumber', {
        enumerable: true,
        get: function () {
            return util.InputNumber;
        }
    });
    Object.defineProperty(exports, 'arraysEqual', {
        enumerable: true,
        get: function () {
            return util.arraysEqual;
        }
    });
    Object.defineProperty(exports, 'createDebugEle', {
        enumerable: true,
        get: function () {
            return util.createDebugEle;
        }
    });
    Object.defineProperty(exports, 'ensureInBounds', {
        enumerable: true,
        get: function () {
            return util.ensureInBounds;
        }
    });
    Object.defineProperty(exports, 'ensureNumberInRange', {
        enumerable: true,
        get: function () {
            return util.ensureNumberInRange;
        }
    });
    Object.defineProperty(exports, 'filterNotEmptyNode', {
        enumerable: true,
        get: function () {
            return util.filterNotEmptyNode;
        }
    });
    Object.defineProperty(exports, 'getCaretCoordinates', {
        enumerable: true,
        get: function () {
            return util.getCaretCoordinates;
        }
    });
    Object.defineProperty(exports, 'getElementOffset', {
        enumerable: true,
        get: function () {
            return util.getElementOffset;
        }
    });
    Object.defineProperty(exports, 'getEventPosition', {
        enumerable: true,
        get: function () {
            return util.getEventPosition;
        }
    });
    Object.defineProperty(exports, 'getMentions', {
        enumerable: true,
        get: function () {
            return util.getMentions;
        }
    });
    Object.defineProperty(exports, 'getPercent', {
        enumerable: true,
        get: function () {
            return util.getPercent;
        }
    });
    Object.defineProperty(exports, 'getPrecision', {
        enumerable: true,
        get: function () {
            return util.getPrecision;
        }
    });
    Object.defineProperty(exports, 'getRegExp', {
        enumerable: true,
        get: function () {
            return util.getRegExp;
        }
    });
    Object.defineProperty(exports, 'getRepeatedElement', {
        enumerable: true,
        get: function () {
            return util.getRepeatedElement;
        }
    });
    Object.defineProperty(exports, 'getStyleAsText', {
        enumerable: true,
        get: function () {
            return util.getStyleAsText;
        }
    });
    Object.defineProperty(exports, 'inNextTick', {
        enumerable: true,
        get: function () {
            return util.inNextTick;
        }
    });
    Object.defineProperty(exports, 'isComponent', {
        enumerable: true,
        get: function () {
            return util.isComponent;
        }
    });
    Object.defineProperty(exports, 'isEmpty', {
        enumerable: true,
        get: function () {
            return util.isEmpty;
        }
    });
    Object.defineProperty(exports, 'isInteger', {
        enumerable: true,
        get: function () {
            return util.isInteger;
        }
    });
    Object.defineProperty(exports, 'isNil', {
        enumerable: true,
        get: function () {
            return util.isNil;
        }
    });
    Object.defineProperty(exports, 'isNonEmptyString', {
        enumerable: true,
        get: function () {
            return util.isNonEmptyString;
        }
    });
    Object.defineProperty(exports, 'isNotNil', {
        enumerable: true,
        get: function () {
            return util.isNotNil;
        }
    });
    Object.defineProperty(exports, 'isPromise', {
        enumerable: true,
        get: function () {
            return util.isPromise;
        }
    });
    Object.defineProperty(exports, 'isStyleSupport', {
        enumerable: true,
        get: function () {
            return util.isStyleSupport;
        }
    });
    Object.defineProperty(exports, 'isTemplateRef', {
        enumerable: true,
        get: function () {
            return util.isTemplateRef;
        }
    });
    Object.defineProperty(exports, 'isTouchEvent', {
        enumerable: true,
        get: function () {
            return util.isTouchEvent;
        }
    });
    Object.defineProperty(exports, 'measure', {
        enumerable: true,
        get: function () {
            return util.measure;
        }
    });
    Object.defineProperty(exports, 'measureScrollbar', {
        enumerable: true,
        get: function () {
            return util.measureScrollbar;
        }
    });
    Object.defineProperty(exports, 'padEnd', {
        enumerable: true,
        get: function () {
            return util.padEnd;
        }
    });
    Object.defineProperty(exports, 'padStart', {
        enumerable: true,
        get: function () {
            return util.padStart;
        }
    });
    Object.defineProperty(exports, 'properties', {
        enumerable: true,
        get: function () {
            return util.properties;
        }
    });
    Object.defineProperty(exports, 'pxToNumber', {
        enumerable: true,
        get: function () {
            return util.pxToNumber;
        }
    });
    Object.defineProperty(exports, 'scrollIntoView', {
        enumerable: true,
        get: function () {
            return util.scrollIntoView;
        }
    });
    Object.defineProperty(exports, 'shallowCopyArray', {
        enumerable: true,
        get: function () {
            return util.shallowCopyArray;
        }
    });
    Object.defineProperty(exports, 'shallowEqual', {
        enumerable: true,
        get: function () {
            return util.shallowEqual;
        }
    });
    Object.defineProperty(exports, 'silentEvent', {
        enumerable: true,
        get: function () {
            return util.silentEvent;
        }
    });
    Object.defineProperty(exports, 'toArray', {
        enumerable: true,
        get: function () {
            return util.toArray;
        }
    });
    Object.defineProperty(exports, 'toBoolean', {
        enumerable: true,
        get: function () {
            return util.toBoolean;
        }
    });
    Object.defineProperty(exports, 'toCssPixel', {
        enumerable: true,
        get: function () {
            return util.toCssPixel;
        }
    });
    Object.defineProperty(exports, 'toNumber', {
        enumerable: true,
        get: function () {
            return util.toNumber;
        }
    });
    Object.defineProperty(exports, 'valueFunctionProp', {
        enumerable: true,
        get: function () {
            return util.valueFunctionProp;
        }
    });
    Object.defineProperty(exports, 'wrapIntoObservable', {
        enumerable: true,
        get: function () {
            return util.wrapIntoObservable;
        }
    });
    exports.NgZorroAntdModule = NgZorroAntdModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd.umd.js.map
