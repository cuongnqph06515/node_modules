/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FIELDS = ['bottom', 'left', 'right', 'top'];
/**
 * Represents the Kendo UI PDFMargin component for Angular.
 */
var PDFMarginComponent = /** @class */ (function () {
    function PDFMarginComponent() {
    }
    Object.defineProperty(PDFMarginComponent.prototype, "options", {
        /**
         * @hidden
         */
        get: function () {
            var options = {};
            for (var idx = 0; idx < FIELDS.length; idx++) {
                var field = FIELDS[idx];
                var value = this[field];
                if (typeof value !== 'undefined') {
                    options[field] = value;
                }
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    PDFMarginComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-pdf-export-margin',
                    template: ""
                },] },
    ];
    PDFMarginComponent.propDecorators = {
        left: [{ type: core_1.Input }],
        top: [{ type: core_1.Input }],
        right: [{ type: core_1.Input }],
        bottom: [{ type: core_1.Input }]
    };
    return PDFMarginComponent;
}());
exports.PDFMarginComponent = PDFMarginComponent;
