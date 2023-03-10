/**
 * @hidden
 */
export declare const hasClasses: (element: HTMLElement, classNames: string) => boolean;
/**
 * @hidden
 */
export declare const matchesClasses: (classNames: string) => (element: HTMLElement) => boolean;
/**
 * @hidden
 */
export declare const closest: (node: any, predicate: any) => any;
/**
 * @hidden
 */
export declare const firstElementChild: (node: any) => any;
/**
 * @hidden
 */
export declare const closestInScope: (node: any, predicate: any, scope: any) => any;
/**
 * @hidden
 */
export declare const wheelDeltaY: (e: any) => any;
/**
 * @hidden
 */
export declare const preventLockedScroll: (el: any) => (event: any) => void;
/**
 * @hidden
 */
export declare function scrollbarWidth(): number;
/**
 * @hidden
 */
export declare function hasScrollbar(element: any, type: string): boolean;
/**
 * @hidden
 */
export declare function rtlScrollPosition(element: any, position: number): number;
/**
 * @hidden
 */
export declare const isVisible: (element: any) => boolean;
