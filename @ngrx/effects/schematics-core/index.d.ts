/// <amd-module name="@ngrx/effects/schematics-core" />
import { dasherize, decamelize, camelize, classify, underscore, group, capitalize, featurePath, pluralize } from './utility/strings';
export { isIvyEnabled } from './utility/angular-utils';
export { findNodes, getSourceNodes, getDecoratorMetadata, getContentOfKeyLiteral, insertAfterLastOccurrence, insertImport, addBootstrapToModule, addDeclarationToModule, addExportToModule, addImportToModule, addProviderToModule, replaceImport, containsProperty, } from './utility/ast-utils';
export { Host, Change, NoopChange, InsertChange, RemoveChange, ReplaceChange, createReplaceChange, createChangeRecorder, commitChanges, } from './utility/change';
export { AppConfig, getWorkspace, getWorkspacePath } from './utility/config';
export { findModule, findModuleFromOptions, buildRelativePath, ModuleOptions, } from './utility/find-module';
export { findPropertyInAstObject } from './utility/json-utilts';
export { addReducerToState, addReducerToStateInterface, addReducerImportToNgModule, addReducerToActionReducerMap, omit, } from './utility/ngrx-utils';
export { getProjectPath, getProject, isLib } from './utility/project';
export declare const stringUtils: {
    dasherize: typeof dasherize;
    decamelize: typeof decamelize;
    camelize: typeof camelize;
    classify: typeof classify;
    underscore: typeof underscore;
    group: typeof group;
    capitalize: typeof capitalize;
    featurePath: typeof featurePath;
    pluralize: typeof pluralize;
};
export { updatePackage } from './utility/update';
export { parseName } from './utility/parse-name';
export { addPackageToPackageJson } from './utility/package';
export { platformVersion } from './utility/libs-version';
export { visitTSSourceFiles, visitNgModuleImports } from './utility/visitors';
