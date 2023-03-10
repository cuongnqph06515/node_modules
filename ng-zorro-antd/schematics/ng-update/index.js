"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
const chalk_1 = require("chalk");
const upgrade_data_1 = require("./upgrade-data");
const calendar_input_rule_1 = require("./upgrade-rules/checks/calendar-input-rule");
const carousel_like_template_rule_1 = require("./upgrade-rules/checks/carousel-like-template-rule");
const dropdown_class_rule_1 = require("./upgrade-rules/checks/dropdown-class-rule");
const dropdown_template_rule_1 = require("./upgrade-rules/checks/dropdown-template-rule");
const form_template_rule_1 = require("./upgrade-rules/checks/form-template-rule");
const icon_template_rule_1 = require("./upgrade-rules/checks/icon-template-rule");
const injection_token_rule_1 = require("./upgrade-rules/checks/injection-token-rule");
const secondary_entry_points_rule_1 = require("./upgrade-rules/checks/secondary-entry-points-rule");
const tooltip_like_template_rule_1 = require("./upgrade-rules/checks/tooltip-like-template-rule");
/** Entry point for the migration schematics with target of NG-ZORRO v7 */
function updateToV7() {
    return schematics_1.createMigrationSchematicRule(schematics_1.TargetVersion.V7, [tooltip_like_template_rule_1.TooltipLikeTemplateRule], upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV7 = updateToV7;
/** Entry point for the migration schematics with target of NG-ZORRO v9 */
function updateToV9() {
    return schematics_1.createMigrationSchematicRule(schematics_1.TargetVersion.V9, [
        tooltip_like_template_rule_1.TooltipLikeTemplateRule,
        dropdown_template_rule_1.DropdownTemplateRule,
        dropdown_class_rule_1.DropdownClassRule,
        icon_template_rule_1.IconTemplateRule,
        calendar_input_rule_1.CalendarTemplateRule,
        carousel_like_template_rule_1.CarouselTemplateRule,
        injection_token_rule_1.InjectionTokenRule,
        form_template_rule_1.FormTemplateRule,
        secondary_entry_points_rule_1.SecondaryEntryPointsRule
    ], upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV9 = updateToV9;
/** Post-update schematic to be called when update is finished. */
function postUpdate() {
    return () => {
        console.log();
        console.log(chalk_1.default.green('  ???  NG-ZORRO update complete'));
        console.log();
        console.log(chalk_1.default.yellow('  ???  Please check the output above for any issues that were detected ' +
            'but could not be automatically fixed.'));
    };
}
exports.postUpdate = postUpdate;
//# sourceMappingURL=index.js.map