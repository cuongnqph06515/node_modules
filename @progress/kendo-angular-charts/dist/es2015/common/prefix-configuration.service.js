import { Injectable, Inject, InjectionToken, NgZone } from '@angular/core';
import { ConfigurationService, Change } from './configuration.service';
import { RootConfigurationService } from './root-configuration.service';
/**
 * @hidden
 */
export const PREFIX = new InjectionToken('configuration prefix');
/**
 * @hidden
 */
export class PrefixConfigurationService extends ConfigurationService {
    constructor(rootService, prefix, ngZone) {
        super(ngZone);
        this.rootService = rootService;
        this.prefix = prefix;
    }
    push(store) {
        this.rootService.notify(new Change(this.prefix, store));
    }
    notify(change) {
        change.key = this.prefix + (change.key ? `.${change.key}` : '');
        this.rootService.notify(change);
    }
}
PrefixConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PrefixConfigurationService.ctorParameters = () => [
    { type: RootConfigurationService, decorators: [{ type: Inject, args: [RootConfigurationService,] }] },
    { type: String, decorators: [{ type: Inject, args: [PREFIX,] }] },
    { type: NgZone }
];
