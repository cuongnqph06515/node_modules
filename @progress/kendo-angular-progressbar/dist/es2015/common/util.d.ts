import { SimpleChanges } from '@angular/core';
import { AnimationSettings } from '../main';
/**
 * @hidden
 */
export declare const reverseChunks: (orientation: string, reverse: boolean) => boolean;
/**
 * @hidden
 */
export declare const formatValue: Function;
/**
 * @hidden
 */
export declare const validateRange: (min: number, max: number) => void;
/**
 * @hidden
 */
export declare const adjustValueToRange: (min: number, max: number, value: number) => number;
/**
 * @hidden
 */
export declare const calculateRatio: (min: number, max: number, value: number) => number;
/**
 * @hidden
 */
export declare const extractValueFromChanges: (changes: SimpleChanges, type: string, value: number) => number;
/**
 * @hidden
 */
export declare const runAnimation: (changes: SimpleChanges, animation: boolean | AnimationSettings, previousValue: number, displayValue: number) => boolean;
