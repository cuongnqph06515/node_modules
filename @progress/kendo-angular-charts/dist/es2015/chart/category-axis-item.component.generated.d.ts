import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { CollectionItemComponent } from '../common/collection-item.component';
import { ConfigurationService } from '../common/configuration.service';
import { AutoBaseUnitSteps, AxisLine, AxisTicks, CategoryBaseUnit, GridLines, PlotBand, WeekStartDay } from '../common/property-types';
import { CategoryAxisCrosshair, CategoryAxisLabels, CategoryAxisNotes, CategoryAxisSelect, CategoryAxisTitle, CategoryAxis } from '../common/property-types';
/**
 * @hidden
 */
export declare abstract class CategoryAxisItemComponentGenerated extends CollectionItemComponent implements CategoryAxis {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    autoBaseUnitSteps: AutoBaseUnitSteps;
    axisCrossingValue: any | any[];
    background: string;
    baseUnit: CategoryBaseUnit;
    baseUnitStep: number | 'auto';
    categories: any[];
    color: string;
    justified: boolean;
    line: AxisLine;
    majorGridLines: GridLines;
    majorTicks: AxisTicks;
    max: any;
    maxDateGroups: number;
    maxDivisions: number;
    min: any;
    minorGridLines: GridLines;
    minorTicks: AxisTicks;
    name: string;
    pane: string;
    plotBands: PlotBand[];
    reverse: boolean;
    roundToBaseUnit: boolean;
    startAngle: number;
    type: 'category' | 'date';
    visible: boolean;
    weekStartDay: WeekStartDay;
    crosshair: CategoryAxisCrosshair;
    labels: CategoryAxisLabels;
    notes: CategoryAxisNotes;
    select: CategoryAxisSelect;
    title: CategoryAxisTitle;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService, intl: IntlService, localeId: string);
}
