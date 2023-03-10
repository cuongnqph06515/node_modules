"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const project_targets_1 = require("@schematics/angular/utility/project-targets");
const schematics_1 = require("@angular-devkit/schematics");
// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;
/**
 * Resolves options for the build target of the given project
 */
function getProjectTargetOptions(project, buildTarget) {
    const targets = project_targets_1.getProjectTargets(project);
    if (targets && targets[buildTarget] && targets[buildTarget].options) {
        return targets[buildTarget].options;
    }
    throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
exports.getProjectTargetOptions = getProjectTargetOptions;
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
function getProjectStyleFile(project, extension) {
    const buildOptions = getProjectTargetOptions(project, 'build');
    if (buildOptions.styles && buildOptions.styles.length) {
        const styles = buildOptions.styles.map((s) => typeof s === 'string' ? s : s.input);
        // Look for the default style file that is generated for new projects by the Angular CLI. This
        // default style file is usually called `styles.ext` unless it has been changed explicitly.
        const defaultMainStylePath = styles.find((file) => extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file));
        if (defaultMainStylePath) {
            return core_1.normalize(defaultMainStylePath);
        }
        // If no default style file could be found, use the first style file that matches the given
        // extension. If no extension specified explicitly, we look for any file with a valid style
        // file extension.
        const fallbackStylePath = styles.find((file) => extension ? file.endsWith(`.${extension}`) : validStyleFileRegex.test(file));
        if (fallbackStylePath) {
            return core_1.normalize(fallbackStylePath);
        }
    }
    return null;
}
exports.getProjectStyleFile = getProjectStyleFile;
//# sourceMappingURL=project.js.map