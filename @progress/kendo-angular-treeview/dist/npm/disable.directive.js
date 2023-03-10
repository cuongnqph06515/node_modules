"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var treeview_component_1 = require("./treeview.component");
/**
 * A directive which manages the disabled in-memory state of the TreeView node
 * ([see example]({% slug disabledstate_treeview %})).
 */
var DisableDirective = /** @class */ (function () {
    function DisableDirective(treeView, cdr) {
        var _this = this;
        this.treeView = treeView;
        this.cdr = cdr;
        /**
         * Defines the collection that will store the disabled keys.
         */
        this.disabledKeys = [];
        this.treeView.isDisabled = function (dataItem, index) { return (_this.disabledKeys.indexOf(_this.itemKey({ dataItem: dataItem, index: index })) > -1); };
    }
    Object.defineProperty(DisableDirective.prototype, "isDisabled", {
        /**
         * @hidden
         */
        set: function (value) {
            this.treeView.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    DisableDirective.prototype.ngOnChanges = function (changes) {
        if (changes === void 0) { changes = {}; }
        var disabledKeys = changes.disabledKeys;
        if (disabledKeys && !disabledKeys.firstChange) {
            this.cdr.markForCheck();
        }
    };
    DisableDirective.prototype.itemKey = function (e) {
        if (!this.disableKey) {
            return e.index;
        }
        if (typeof this.disableKey === "string") {
            return e.dataItem[this.disableKey];
        }
        if (typeof this.disableKey === "function") {
            return this.disableKey(e);
        }
    };
    DisableDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewDisable]' },] },
    ];
    /** @nocollapse */
    DisableDirective.ctorParameters = function () { return [
        { type: treeview_component_1.TreeViewComponent },
        { type: core_1.ChangeDetectorRef }
    ]; };
    DisableDirective.propDecorators = {
        isDisabled: [{ type: core_1.Input }],
        disableKey: [{ type: core_1.Input, args: ["kendoTreeViewDisable",] }],
        disabledKeys: [{ type: core_1.Input }]
    };
    return DisableDirective;
}());
exports.DisableDirective = DisableDirective;
