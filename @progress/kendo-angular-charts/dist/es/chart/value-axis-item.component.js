import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { ValueAxisItemComponentGenerated } from './value-axis-item.component.generated';
/**
 * The configuration component for a value axis.
 */
var ValueAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisItemComponent, _super);
    // Place custom properties here
    function ValueAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    ValueAxisItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ConfigurationService],
                    selector: 'kendo-chart-value-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return ValueAxisItemComponent;
}(ValueAxisItemComponentGenerated));
export { ValueAxisItemComponent };
