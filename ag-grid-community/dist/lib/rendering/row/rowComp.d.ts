import { Component } from "../../widgets/component";
import { RowContainerComp } from "../../gridBodyComp/rowContainer/rowContainerComp";
import { ICellRendererComp } from "../cellRenderers/iCellRenderer";
import { Beans } from "../beans";
import { RowController } from "./rowController";
import { Column } from "../../entities/column";
import { CellComp } from "../cellComp";
export declare class RowComp extends Component {
    private container;
    private fullWidthRowComponent;
    private beans;
    private pinned;
    private rowNode;
    private controller;
    private cellComps;
    constructor(controller: RowController, container: RowContainerComp, beans: Beans, pinned: string | null);
    private createFullWidthRowCell;
    onColumnChanged(): void;
    private ensureDomOrder;
    private isCellEligibleToBeRemoved;
    private newCellComp;
    getCellComp(id: string): CellComp | null;
    getCellCompSpanned(column: Column): CellComp | null;
    destroy(): void;
    private destroyAllCells;
    getContainer(): RowContainerComp;
    setFullWidthRowComp(fullWidthRowComponent: ICellRendererComp): void;
    getFullWidthRowComp(): ICellRendererComp | null | undefined;
    private createTemplate;
    private afterRowAttached;
    private addDomData;
    destroyCells(cellComps: CellComp[]): void;
    forEachCellComp(callback: (renderedCell: CellComp) => void): void;
}
