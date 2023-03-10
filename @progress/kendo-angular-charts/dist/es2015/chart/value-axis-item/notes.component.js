import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisNotesComponentGenerated } from '../value-axis-item/notes.component.generated';
/**
 * The configuration of the value axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
export class ValueAxisNotesComponent extends ValueAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
