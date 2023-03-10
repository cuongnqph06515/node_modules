import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisNotesLabelComponentGenerated } from '../x-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
export class XAxisNotesLabelComponent extends XAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
XAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
