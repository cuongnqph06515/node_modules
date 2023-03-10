import { ElementRef, OnChanges, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationService } from './navigation/navigation.service';
import { SelectionService } from './selection/selection.service';
/**
 * @hidden
 *
 * A directive which manages the expanded state of the TreeView.
 */
export declare class TreeViewItemContentDirective implements OnChanges, OnInit, OnDestroy {
    private element;
    private navigationService;
    private selectionService;
    private renderer;
    dataItem: any;
    index: string;
    initialSelection: boolean;
    isSelected: <T>(item: T, index: string) => boolean;
    private subscriptions;
    constructor(element: ElementRef, navigationService: NavigationService, selectionService: SelectionService, renderer: Renderer2);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateItem;
    private updateSelection;
    private render;
}
