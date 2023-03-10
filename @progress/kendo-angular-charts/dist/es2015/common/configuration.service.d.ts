import { NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * @hidden
 */
export declare const THROTTLE_MS: number;
/**
 * @hidden
 */
export declare class Change {
    key: string;
    value: any;
    constructor(key: string, value: any);
}
/**
 * @hidden
 */
export declare class ConfigurationService {
    protected ngZone: NgZone;
    onChange$: Observable<any>;
    onFastChange$: Observable<any>;
    store: any;
    protected source: BehaviorSubject<any>;
    constructor(ngZone: NgZone);
    protected initSource(): void;
    push(store: any): void;
    notify(change: Change): void;
    protected set(field: string, value: any): void;
    protected next(): void;
}
