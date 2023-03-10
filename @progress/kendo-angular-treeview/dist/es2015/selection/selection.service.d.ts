import { Subject } from "rxjs";
/**
 * @hidden
 */
export declare class SelectionService {
    readonly changes: Subject<{
        dataItem: any;
        index: string;
    }>;
    private firstIndex;
    isFirstSelected(index: string): boolean;
    setFirstSelected(index: string, selected: boolean): void;
    select(index: string, dataItem: any): void;
}
