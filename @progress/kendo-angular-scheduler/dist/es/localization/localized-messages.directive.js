import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoSchedulerLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));
export { LocalizedMessagesDirective };
