import { Border } from './border.interface';
import { BulletTargetLine } from './bullet-target-line.interface';
/**
 * The appearance settings for the target of the Bullet series.
 */
export interface BulletTarget {
    /**
     * The width of the border in pixels.
     * By default, the border width is set to `zero`, which means that the border is not visible.
     */
    border?: Border;
    /**
     * The target color.
     */
    color?: string;
    /**
     * The appearance settings for the target line of the Bullet series.
     */
    line?: BulletTargetLine;
}
