import { Observable } from 'rxjs';
import { ClipboardParams, IClipboardResponse } from './interface';
/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
export declare class ClipboardService {
    document: any;
    private window;
    private copySubject;
    copyResponse$: Observable<IClipboardResponse>;
    private tempTextArea;
    private config;
    constructor(document: any, window: any);
    configure(config: ClipboardParams): void;
    copy(content: string): void;
    get isSupported(): boolean;
    isTargetValid(element: HTMLInputElement | HTMLTextAreaElement): boolean;
    /**
     * Attempts to copy from an input `targetElm`
     */
    copyFromInputElement(targetElm: HTMLInputElement | HTMLTextAreaElement, isFocus?: boolean): boolean;
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    isCopySuccessInIE11(): boolean;
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    copyFromContent(content: string, container?: HTMLElement): boolean;
    /**
     * Remove temporary textarea if any exists.
     */
    destroy(container?: HTMLElement): void;
    /**
     * Select the target html input element.
     */
    private selectTarget;
    private copyText;
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    private clearSelection;
    /**
     * Creates a fake textarea for copy command.
     */
    private createTempTextArea;
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    pushCopyResponse(response: IClipboardResponse): void;
    /**
     * @deprecated use pushCopyResponse instead.
     */
    pushCopyReponse(response: IClipboardResponse): void;
}
