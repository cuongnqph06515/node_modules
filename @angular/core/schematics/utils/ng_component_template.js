/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/utils/ng_component_template", ["require", "exports", "fs", "path", "typescript", "@angular/core/schematics/utils/line_mappings", "@angular/core/schematics/utils/ng_decorators", "@angular/core/schematics/utils/typescript/functions", "@angular/core/schematics/utils/typescript/property_name"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fs_1 = require("fs");
    const path_1 = require("path");
    const ts = require("typescript");
    const line_mappings_1 = require("@angular/core/schematics/utils/line_mappings");
    const ng_decorators_1 = require("@angular/core/schematics/utils/ng_decorators");
    const functions_1 = require("@angular/core/schematics/utils/typescript/functions");
    const property_name_1 = require("@angular/core/schematics/utils/typescript/property_name");
    /**
     * Visitor that can be used to determine Angular templates referenced within given
     * TypeScript source files (inline templates or external referenced templates)
     */
    class NgComponentTemplateVisitor {
        constructor(typeChecker) {
            this.typeChecker = typeChecker;
            this.resolvedTemplates = [];
        }
        visitNode(node) {
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                this.visitClassDeclaration(node);
            }
            ts.forEachChild(node, n => this.visitNode(n));
        }
        visitClassDeclaration(node) {
            if (!node.decorators || !node.decorators.length) {
                return;
            }
            const ngDecorators = ng_decorators_1.getAngularDecorators(this.typeChecker, node.decorators);
            const componentDecorator = ngDecorators.find(dec => dec.name === 'Component');
            // In case no "@Component" decorator could be found on the current class, skip.
            if (!componentDecorator) {
                return;
            }
            const decoratorCall = componentDecorator.node.expression;
            // In case the component decorator call is not valid, skip this class declaration.
            if (decoratorCall.arguments.length !== 1) {
                return;
            }
            const componentMetadata = functions_1.unwrapExpression(decoratorCall.arguments[0]);
            // Ensure that the component metadata is an object literal expression.
            if (!ts.isObjectLiteralExpression(componentMetadata)) {
                return;
            }
            const sourceFile = node.getSourceFile();
            const sourceFileName = sourceFile.fileName;
            // Walk through all component metadata properties and determine the referenced
            // HTML templates (either external or inline)
            componentMetadata.properties.forEach(property => {
                if (!ts.isPropertyAssignment(property)) {
                    return;
                }
                const propertyName = property_name_1.getPropertyNameText(property.name);
                // In case there is an inline template specified, ensure that the value is statically
                // analyzable by checking if the initializer is a string literal-like node.
                if (propertyName === 'template' && ts.isStringLiteralLike(property.initializer)) {
                    // Need to add an offset of one to the start because the template quotes are
                    // not part of the template content.
                    const templateStartIdx = property.initializer.getStart() + 1;
                    const filePath = path_1.resolve(sourceFileName);
                    this.resolvedTemplates.push({
                        filePath: filePath,
                        container: node,
                        content: property.initializer.text,
                        inline: true,
                        start: templateStartIdx,
                        getCharacterAndLineOfPosition: pos => ts.getLineAndCharacterOfPosition(sourceFile, pos + templateStartIdx)
                    });
                }
                if (propertyName === 'templateUrl' && ts.isStringLiteralLike(property.initializer)) {
                    const templatePath = path_1.resolve(path_1.dirname(sourceFileName), property.initializer.text);
                    // In case the template does not exist in the file system, skip this
                    // external template.
                    if (!fs_1.existsSync(templatePath)) {
                        return;
                    }
                    const fileContent = fs_1.readFileSync(templatePath, 'utf8');
                    const lineStartsMap = line_mappings_1.computeLineStartsMap(fileContent);
                    this.resolvedTemplates.push({
                        filePath: templatePath,
                        container: node,
                        content: fileContent,
                        inline: false,
                        start: 0,
                        getCharacterAndLineOfPosition: pos => line_mappings_1.getLineAndCharacterFromPosition(lineStartsMap, pos),
                    });
                }
            });
        }
    }
    exports.NgComponentTemplateVisitor = NgComponentTemplateVisitor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29tcG9uZW50X3RlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zY2hlbWF0aWNzL3V0aWxzL25nX2NvbXBvbmVudF90ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDJCQUE0QztJQUM1QywrQkFBc0M7SUFDdEMsaUNBQWlDO0lBRWpDLGdGQUFzRjtJQUN0RixnRkFBcUQ7SUFDckQsbUZBQXdEO0lBQ3hELDJGQUErRDtJQXVCL0Q7OztPQUdHO0lBQ0gsTUFBYSwwQkFBMEI7UUFHckMsWUFBbUIsV0FBMkI7WUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1lBRjlDLHNCQUFpQixHQUF1QixFQUFFLENBQUM7UUFFTSxDQUFDO1FBRWxELFNBQVMsQ0FBQyxJQUFhO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFO2dCQUNoRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBMkIsQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVPLHFCQUFxQixDQUFDLElBQXlCO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUVELE1BQU0sWUFBWSxHQUFHLG9DQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFD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QkFDMUYsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUE1RkQsZ0VBNEZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2V4aXN0c1N5bmMsIHJlYWRGaWxlU3luY30gZnJvbSAnZnMnO1xuaW1wb3J0IHtkaXJuYW1lLCByZXNvbHZlfSBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2NvbXB1dGVMaW5lU3RhcnRzTWFwLCBnZXRMaW5lQW5kQ2hhcmFjdGVyRnJvbVBvc2l0aW9ufSBmcm9tICcuL2xpbmVfbWFwcGluZ3MnO1xuaW1wb3J0IHtnZXRBbmd1bGFyRGVjb3JhdG9yc30gZnJvbSAnLi9uZ19kZWNvcmF0b3JzJztcbmltcG9ydCB7dW53cmFwRXhwcmVzc2lvbn0gZnJvbSAnLi90eXBlc2NyaXB0L2Z1bmN0aW9ucyc7XG5pbXBvcnQge2dldFByb3BlcnR5TmFtZVRleHR9IGZyb20gJy4vdHlwZXNjcmlwdC9wcm9wZXJ0eV9uYW1lJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXNvbHZlZFRlbXBsYXRlIHtcbiAgLyoqIENsYXNzIGRlY2xhcmF0aW9uIHRoYXQgY29udGFpbnMgdGhpcyB0ZW1wbGF0ZS4gKi9cbiAgY29udGFpbmVyOiB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAvKiogRmlsZSBjb250ZW50IG9mIHRoZSBnaXZlbiB0ZW1wbGF0ZS4gKi9cbiAgY29udGVudDogc3RyaW5nO1xuICAvKiogU3RhcnQgb2Zmc2V0IG9mIHRoZSB0ZW1wbGF0ZSBjb250ZW50IChlLmcuIGluIHRoZSBpbmxpbmUgc291cmNlIGZpbGUpICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpcyBpbmxpbmUgb3Igbm90LiAqL1xuICBpbmxpbmU6IGJvb2xlYW47XG4gIC8qKiBQYXRoIHRvIHRoZSBmaWxlIHRoYXQgY29udGFpbnMgdGhpcyB0ZW1wbGF0ZS4gKi9cbiAgZmlsZVBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIEdldHMgdGhlIGNoYXJhY3RlciBhbmQgbGluZSBvZiBhIGdpdmVuIHBvc2l0aW9uIGluZGV4IGluIHRoZSB0ZW1wbGF0ZS5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGlzIGRlY2xhcmVkIGlubGluZSB3aXRoaW4gYSBUeXBlU2NyaXB0IHNvdXJjZSBmaWxlLCB0aGUgbGluZSBhbmRcbiAgICogY2hhcmFjdGVyIGFyZSBiYXNlZCBvbiB0aGUgZnVsbCBzb3VyY2UgZmlsZSBjb250ZW50LlxuICAgKi9cbiAgZ2V0Q2hhcmFjdGVyQW5kTGluZU9mUG9zaXRpb246IChwb3M6IG51bWJlcikgPT4ge1xuICAgIGNoYXJhY3RlcjogbnVtYmVyLCBsaW5lOiBudW1iZXJcbiAgfTtcbn1cblxuLyoqXG4gKiBWaXNpdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIEFuZ3VsYXIgdGVtcGxhdGVzIHJlZmVyZW5jZWQgd2l0aGluIGdpdmVuXG4gKiBUeXBlU2NyaXB0IHNvdXJjZSBmaWxlcyAoaW5saW5lIHRlbXBsYXRlcyBvciBleHRlcm5hbCByZWZlcmVuY2VkIHRlbXBsYXRlcylcbiAqL1xuZXhwb3J0IGNsYXNzIE5nQ29tcG9uZW50VGVtcGxhdGVWaXNpdG9yIHtcbiAgcmVzb2x2ZWRUZW1wbGF0ZXM6IFJlc29sdmVkVGVtcGxhdGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIpIHt9XG5cbiAgdmlzaXROb2RlKG5vZGU6IHRzLk5vZGUpIHtcbiAgICBpZiAobm9kZS5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24pIHtcbiAgICAgIHRoaXMudmlzaXRDbGFzc0RlY2xhcmF0aW9uKG5vZGUgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbik7XG4gICAgfVxuXG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIG4gPT4gdGhpcy52aXNpdE5vZGUobikpO1xuICB9XG5cbiAgcHJpdmF0ZSB2aXNpdENsYXNzRGVjbGFyYXRpb24obm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbikge1xuICAgIGlmICghbm9kZS5kZWNvcmF0b3JzIHx8ICFub2RlLmRlY29yYXRvcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmdEZWNvcmF0b3JzID0gZ2V0QW5ndWxhckRlY29yYXRvcnModGhpcy50eXBlQ2hlY2tlciwgbm9kZS5kZWNvcmF0b3JzKTtcbiAgICBjb25zdCBjb21wb25lbnREZWNvcmF0b3IgPSBuZ0RlY29yYXRvcnMuZmluZChkZWMgPT4gZGVjLm5hbWUgPT09ICdDb21wb25lbnQnKTtcblxuICAgIC8vIEluIGNhc2Ugbm8gXCJAQ29tcG9uZW50XCIgZGVjb3JhdG9yIGNvdWxkIGJlIGZvdW5kIG9uIHRoZSBjdXJyZW50IGNsYXNzLCBza2lwLlxuICAgIGlmICghY29tcG9uZW50RGVjb3JhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb3JhdG9yQ2FsbCA9IGNvbXBvbmVudERlY29yYXRvci5ub2RlLmV4cHJlc3Npb247XG5cbiAgICAvLyBJbiBjYXNlIHRoZSBjb21wb25lbnQgZGVjb3JhdG9yIGNhbGwgaXMgbm90IHZhbGlkLCBza2lwIHRoaXMgY2xhc3MgZGVjbGFyYXRpb24uXG4gICAgaWYgKGRlY29yYXRvckNhbGwuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudE1ldGFkYXRhID0gdW53cmFwRXhwcmVzc2lvbihkZWNvcmF0b3JDYWxsLmFyZ3VtZW50c1swXSk7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgY29tcG9uZW50IG1ldGFkYXRhIGlzIGFuIG9iamVjdCBsaXRlcmFsIGV4cHJlc3Npb24uXG4gICAgaWYgKCF0cy5pc09iamVjdExpdGVyYWxFeHByZXNzaW9uKGNvbXBvbmVudE1ldGFkYXRhKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBub2RlLmdldFNvdXJjZUZpbGUoKTtcbiAgICBjb25zdCBzb3VyY2VGaWxlTmFtZSA9IHNvdXJjZUZpbGUuZmlsZU5hbWU7XG5cbiAgICAvLyBXYWxrIHRocm91Z2ggYWxsIGNvbXBvbmVudCBtZXRhZGF0YSBwcm9wZXJ0aWVzIGFuZCBkZXRlcm1pbmUgdGhlIHJlZmVyZW5jZWRcbiAgICAvLyBIVE1MIHRlbXBsYXRlcyAoZWl0aGVyIGV4dGVybmFsIG9yIGlubGluZSlcbiAgICBjb21wb25lbnRNZXRhZGF0YS5wcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgaWYgKCF0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwcm9wZXJ0eSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBnZXRQcm9wZXJ0eU5hbWVUZXh0KHByb3BlcnR5Lm5hbWUpO1xuXG4gICAgICAvLyBJbiBjYXNlIHRoZXJlIGlzIGFuIGlubGluZSB0ZW1wbGF0ZSBzcGVjaWZpZWQsIGVuc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBzdGF0aWNhbGx5XG4gICAgICAvLyBhbmFseXphYmxlIGJ5IGNoZWNraW5nIGlmIHRoZSBpbml0aWFsaXplciBpcyBhIHN0cmluZyBsaXRlcmFsLWxpa2Ugbm9kZS5cbiAgICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09ICd0ZW1wbGF0ZScgJiYgdHMuaXNTdHJpbmdMaXRlcmFsTGlrZShwcm9wZXJ0eS5pbml0aWFsaXplcikpIHtcbiAgICAgICAgLy8gTmVlZCB0byBhZGQgYW4gb2Zmc2V0IG9mIG9uZSB0byB0aGUgc3RhcnQgYmVjYXVzZSB0aGUgdGVtcGxhdGUgcXVvdGVzIGFyZVxuICAgICAgICAvLyBub3QgcGFydCBvZiB0aGUgdGVtcGxhdGUgY29udGVudC5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVTdGFydElkeCA9IHByb3BlcnR5LmluaXRpYWxpemVyLmdldFN0YXJ0KCkgKyAxO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHJlc29sdmUoc291cmNlRmlsZU5hbWUpO1xuICAgICAgICB0aGlzLnJlc29sdmVkVGVtcGxhdGVzLnB1c2goe1xuICAgICAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgICBjb250YWluZXI6IG5vZGUsXG4gICAgICAgICAgY29udGVudDogcHJvcGVydHkuaW5pdGlhbGl6ZXIudGV4dCxcbiAgICAgICAgICBpbmxpbmU6IHRydWUsXG4gICAgICAgICAgc3RhcnQ6IHRlbXBsYXRlU3RhcnRJZHgsXG4gICAgICAgICAgZ2V0Q2hhcmFjdGVyQW5kTGluZU9mUG9zaXRpb246IHBvcyA9PlxuICAgICAgICAgICAgICB0cy5nZXRMaW5lQW5kQ2hhcmFjdGVyT2ZQb3NpdGlvbihzb3VyY2VGaWxlLCBwb3MgKyB0ZW1wbGF0ZVN0YXJ0SWR4KVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09ICd0ZW1wbGF0ZVVybCcgJiYgdHMuaXNTdHJpbmdMaXRlcmFsTGlrZShwcm9wZXJ0eS5pbml0aWFsaXplcikpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVQYXRoID0gcmVzb2x2ZShkaXJuYW1lKHNvdXJjZUZpbGVOYW1lKSwgcHJvcGVydHkuaW5pdGlhbGl6ZXIudGV4dCk7XG5cbiAgICAgICAgLy8gSW4gY2FzZSB0aGUgdGVtcGxhdGUgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGZpbGUgc3lzdGVtLCBza2lwIHRoaXNcbiAgICAgICAgLy8gZXh0ZXJuYWwgdGVtcGxhdGUuXG4gICAgICAgIGlmICghZXhpc3RzU3luYyh0ZW1wbGF0ZVBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSByZWFkRmlsZVN5bmModGVtcGxhdGVQYXRoLCAndXRmOCcpO1xuICAgICAgICBjb25zdCBsaW5lU3RhcnRzTWFwID0gY29tcHV0ZUxpbmVTdGFydHNNYXAoZmlsZUNvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZWRUZW1wbGF0ZXMucHVzaCh7XG4gICAgICAgICAgZmlsZVBhdGg6IHRlbXBsYXRlUGF0aCxcbiAgICAgICAgICBjb250YWluZXI6IG5vZGUsXG4gICAgICAgICAgY29udGVudDogZmlsZUNvbnRlbnQsXG4gICAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICBnZXRDaGFyYWN0ZXJBbmRMaW5lT2ZQb3NpdGlvbjogcG9zID0+IGdldExpbmVBbmRDaGFyYWN0ZXJGcm9tUG9zaXRpb24obGluZVN0YXJ0c01hcCwgcG9zKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==