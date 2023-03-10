/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var utils_1 = require("./utils");
var utils_2 = require("../common/utils");
var color_palette_service_1 = require("./services/color-palette.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var DEFAULT_TILE_SIZE = 24;
var DEFAULT_COLUMNS_COUNT = 10;
var DEFAULT_PRESET = 'office';
var DEFAULT_ACCESSIBLE_PRESET = 'accessible';
var serial = 0;
/**
 * The ColorPalette component provides a set of predefined palette presets and enables you to implement a custom color palette.
 * The ColorPalette is independently used by `kendo-colorpicker` and can be directly added to the page.
 */
var ColorPaletteComponent = /** @class */ (function () {
    function ColorPaletteComponent(service, localizationService) {
        var _this = this;
        this.service = service;
        /**
         * @hidden
         */
        this.id = "k-colorpalette-" + serial++;
        /**
         * Specifies the output format of the ColorPaletteComponent.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * The supported values are:
         * * (Default) `hex`
         * * `rgba`
         * * `name`
         */
        this.format = 'hex';
        /**
         * Specifies the size of a color cell.
         *
         * The possible values are:
         * * (Default) `tileSize = 24`
         * * `{ width: number, height: number }`
         */
        this.tileSize = { width: DEFAULT_TILE_SIZE, height: DEFAULT_TILE_SIZE };
        /**
         * Fires each time the color selection is changed.
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires each time the value is changed.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user selects a cell with the mouse or presses `Enter`.
         *
         * @hidden
         */
        this.cellSelection = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.hostClasses = true;
        this._tabindex = 0;
        this.notifyNgTouched = function () { };
        this.notifyNgChanged = function () { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ColorPaletteComponent.prototype, "paletteId", {
        /**
         * @hidden
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the initially selected color.
         */
        set: function (value) {
            this._value = utils_1.parseColor(value, this.format);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        /**
         * Specifies the number of columns that will be displayed.
         * Defaults to `10`.
         */
        set: function (value) {
            var minColumnsCount = 1;
            this._columns = value > minColumnsCount ? value : minColumnsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "palette", {
        get: function () {
            return this._palette;
        },
        /**
         * The color palette that will be displayed.
         *
         * The supported values are:
         * * The name of the predefined palette preset (for example, `office`, `basic`, and `apex`).
         * * A string with comma-separated colors.
         * * A string array.
         */
        set: function (value) {
            var _this = this;
            if (!utils_2.isPresent(value)) {
                value = DEFAULT_PRESET;
            }
            if (typeof value === 'string' && utils_2.isPresent(utils_1.PALETTEPRESETS[value])) {
                this.columns = this.columns || utils_1.PALETTEPRESETS[value].columns;
                value = utils_1.PALETTEPRESETS[value].colors;
            }
            var colors = (typeof value === 'string') ? value.split(',') : value;
            this._palette = colors.map(function (color) { return utils_1.parseColor(color, _this.format, false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "tabindex", {
        get: function () {
            return !this.disabled ? this._tabindex : undefined;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "tileLayout", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.tileSize !== 'number') {
                return this.tileSize;
            }
            return { width: this.tileSize, height: this.tileSize };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "colorRows", {
        /**
         * @hidden
         */
        get: function () {
            return this.service.colorRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "hostTabindex", {
        /**
         * @hidden
         */
        get: function () { return this.tabindex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () { return this.disabled; },
        enumerable: true,
        configurable: true
    });
    ColorPaletteComponent.prototype.ngOnInit = function () {
        if (this.colorRows.length === 0) {
            var defaultPreset = (this.format !== 'name') ? DEFAULT_PRESET : DEFAULT_ACCESSIBLE_PRESET;
            this.palette = this.palette || defaultPreset;
            this.setRows();
            this.focusedCell = this.service.getCellCoordsFor(this.value);
        }
    };
    ColorPaletteComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    ColorPaletteComponent.prototype.ngOnChanges = function (changes) {
        if (changes.palette || changes.columns) {
            this.setRows();
        }
        if (changes.palette || changes.value || changes.columns) {
            this.focusedCell = this.service.getCellCoordsFor(this.value);
        }
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleKeydown = function (event) {
        var isRTL = this.direction === 'rtl';
        switch (event.keyCode) {
            case kendo_angular_common_1.Keys.ArrowDown:
                this.handleCellNavigation(0, 1);
                break;
            case kendo_angular_common_1.Keys.ArrowUp:
                this.handleCellNavigation(0, -1);
                break;
            case kendo_angular_common_1.Keys.ArrowRight:
                this.handleCellNavigation(isRTL ? -1 : 1, 0);
                break;
            case kendo_angular_common_1.Keys.ArrowLeft:
                this.handleCellNavigation(isRTL ? 1 : -1, 0);
                break;
            case kendo_angular_common_1.Keys.Enter:
                this.handleEnter();
                break;
            default: return;
        }
        event.preventDefault();
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleHostBlur = function () {
        this.notifyNgTouched();
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleCellSelection = function (value, focusedCell) {
        if (this.readonly) {
            return;
        }
        this.focusedCell = focusedCell;
        var parsedColor = utils_1.parseColor(value, this.format, false);
        this.cellSelection.emit(parsedColor);
        if (this.value !== parsedColor) {
            this.value = parsedColor;
            this.valueChange.emit(parsedColor);
            this.notifyNgChanged(parsedColor);
        }
        if (this.selection !== parsedColor) {
            this.selection = parsedColor;
            this.selectionChange.emit(parsedColor);
        }
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.focusedCell = this.service.getCellCoordsFor(this.value);
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.registerOnChange = function (fn) {
        this.notifyNgChanged = fn;
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.registerOnTouched = function (fn) {
        this.notifyNgTouched = fn;
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    ColorPaletteComponent.prototype.isEmpty = function () {
        return false;
    };
    /**
     * Clears the color value of the ColorPalette.
     */
    ColorPaletteComponent.prototype.reset = function () {
        this.focusedCell = null;
        if (utils_2.isPresent(this.value)) {
            this._value = undefined;
            this.notifyNgChanged(undefined);
        }
    };
    ColorPaletteComponent.prototype.setRows = function () {
        if (!utils_2.isPresent(this.palette)) {
            return;
        }
        this.columns = this.columns || DEFAULT_COLUMNS_COUNT;
        this.service.setColorMatrix(this.palette, this.columns);
    };
    ColorPaletteComponent.prototype.handleCellNavigation = function (horizontalStep, verticalStep) {
        if (this.readonly) {
            return;
        }
        this.focusedCell = this.service.getNextCell(this.focusedCell, horizontalStep, verticalStep);
        var selection = this.service.getColorAt(this.focusedCell);
        if (this.selection !== selection) {
            this.selection = selection;
            this.selectionChange.emit(selection);
        }
    };
    ColorPaletteComponent.prototype.handleEnter = function () {
        if (!utils_2.isPresent(this.focusedCell)) {
            return;
        }
        var selectedColor = this.service.getColorAt(this.focusedCell);
        this.handleCellSelection(selectedColor, this.focusedCell);
    };
    ColorPaletteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-colorpalette',
                    providers: [
                        {
                            multi: true,
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return ColorPaletteComponent; }) // tslint:disable-line:no-forward-ref
                        }, {
                            provide: kendo_angular_common_1.KendoInput,
                            useExisting: core_1.forwardRef(function () { return ColorPaletteComponent; })
                        },
                        color_palette_service_1.ColorPaletteService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.colorpalette'
                        }
                    ],
                    template: "\n        <div role=\"grid\">\n            <table class=\"k-palette k-reset\" role=\"presentation\">\n                <tbody>\n                    <tr role=\"row\" *ngFor=\"let row of colorRows; let rowIndex = index\">\n                        <td *ngFor=\"let color of row; let colIndex = index\"\n                            [class.k-state-selected]=\"focusedCell?.row === rowIndex && focusedCell?.col === colIndex\"\n                            class=\"k-item\"\n                            [attr.value]=\"color\"\n                            (click)=\"handleCellSelection(color, { row: rowIndex, col: colIndex })\"\n                            [ngStyle]=\"{\n                                backgroundColor: color,\n                                width: tileLayout.width + 'px',\n                                height: tileLayout.height + 'px',\n                                minWidth: tileLayout.width + 'px'\n                            }\">\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPaletteComponent.ctorParameters = function () { return [
        { type: color_palette_service_1.ColorPaletteService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    ColorPaletteComponent.propDecorators = {
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        paletteId: [{ type: core_1.HostBinding, args: ['attr.id',] }],
        id: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        columns: [{ type: core_1.Input }],
        palette: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        tileSize: [{ type: core_1.Input }],
        selectionChange: [{ type: core_1.Output }],
        valueChange: [{ type: core_1.Output }],
        cellSelection: [{ type: core_1.Output }],
        hostTabindex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-colorpalette',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        handleKeydown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        handleHostBlur: [{ type: core_1.HostListener, args: ['blur',] }]
    };
    return ColorPaletteComponent;
}());
exports.ColorPaletteComponent = ColorPaletteComponent;
