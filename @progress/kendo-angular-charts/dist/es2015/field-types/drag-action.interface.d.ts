import { LockAxis } from './lock-axis';
import { ModifierKey } from './modifier-key';
/**
 * Configures the drag behavior during the pan and zoom operations.
 */
export interface DragAction {
    /**
     * Specifies a keyboard key that has to be pressed to activate the gesture.
     */
    key?: ModifierKey;
    /**
     * Specifies an axis that should not be panned or zoomed.
     */
    lock?: LockAxis;
}
