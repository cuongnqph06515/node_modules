import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { CollectionService, Item } from './collection.service';
/**
 * @hidden
 */
export declare abstract class CollectionComponent implements AfterContentInit, OnDestroy {
    protected configKey: string;
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    children: QueryList<Item>;
    private subscription;
    private items;
    constructor(configKey: string, configurationService: ConfigurationService, collectionService: CollectionService);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    private processChanges;
    private readItems;
    private change;
}
