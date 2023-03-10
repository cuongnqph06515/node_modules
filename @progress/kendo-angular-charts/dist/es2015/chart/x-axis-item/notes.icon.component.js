import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisNotesIconComponentGenerated } from '../x-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class XAxisNotesIconComponent extends XAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
XAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
