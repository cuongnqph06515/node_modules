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
        define("@angular/core/schematics/migrations/missing-injectable/definition_collector", ["require", "exports", "typescript", "@angular/core/schematics/utils/ng_decorators", "@angular/core/schematics/utils/typescript/property_name"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const ng_decorators_1 = require("@angular/core/schematics/utils/ng_decorators");
    const property_name_1 = require("@angular/core/schematics/utils/typescript/property_name");
    /**
     * Visitor that walks through specified TypeScript nodes and collects all
     * found NgModule, Directive or Component definitions.
     */
    class NgDefinitionCollector {
        constructor(typeChecker) {
            this.typeChecker = typeChecker;
            this.resolvedModules = [];
            this.resolvedDirectives = [];
        }
        visitNode(node) {
            if (ts.isClassDeclaration(node)) {
                this.visitClassDeclaration(node);
            }
            ts.forEachChild(node, n => this.visitNode(n));
        }
        visitClassDeclaration(node) {
            if (!node.decorators || !node.decorators.length) {
                return;
            }
            const ngDecorators = ng_decorators_1.getAngularDecorators(this.typeChecker, node.decorators);
            const directiveDecorator = ngDecorators.find(({ name }) => name === 'Component' || name == 'Directive');
            const ngModuleDecorator = ngDecorators.find(({ name }) => name === 'NgModule');
            if (ngModuleDecorator) {
                this._visitNgModuleClass(node, ngModuleDecorator);
            }
            else if (directiveDecorator) {
                this._visitDirectiveClass(node, directiveDecorator);
            }
        }
        _visitDirectiveClass(node, decorator) {
            const decoratorCall = decorator.node.expression;
            const metadata = decoratorCall.arguments[0];
            if (!metadata || !ts.isObjectLiteralExpression(metadata)) {
                return;
            }
            const providersNode = metadata.properties.filter(ts.isPropertyAssignment)
                .find(p => property_name_1.getPropertyNameText(p.name) === 'providers');
            const viewProvidersNode = metadata.properties.filter(ts.isPropertyAssignment)
                .find(p => property_name_1.getPropertyNameText(p.name) === 'viewProviders');
            this.resolvedDirectives.push({
                name: node.name ? node.name.text : 'default',
                node,
                decorator,
                providersExpr: providersNode !== undefined ? providersNode.initializer : null,
                viewProvidersExpr: viewProvidersNode !== undefined ? viewProvidersNode.initializer : null,
            });
        }
        _visitNgModuleClass(node, decorator) {
            const decoratorCall = decorator.node.expression;
            const metadata = decoratorCall.arguments[0];
            if (!metadata || !ts.isObjectLiteralExpression(metadata)) {
                return;
            }
            const providersNode = metadata.properties.filter(ts.isPropertyAssignment)
                .find(p => property_name_1.getPropertyNameText(p.name) === 'providers');
            this.resolvedModules.push({
                name: node.name ? node.name.text : 'default',
                node,
                decorator,
                providersExpr: providersNode !== undefined ? providersNode.initializer : null,
            });
        }
    }
    exports.NgDefinitionCollector = NgDefinitionCollector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbl9jb2xsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvbWlncmF0aW9ucy9taXNzaW5nLWluamVjdGFibGUvZGVmaW5pdGlvbl9jb2xsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCxpQ0FBaUM7SUFFakMsZ0ZBQTRFO0lBQzVFLDJGQUF5RTtJQWlCekU7OztPQUdHO0lBQ0gsTUFBYSxxQkFBcUI7UUFJaEMsWUFBbUIsV0FBMkI7WUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1lBSDlDLG9CQUFlLEdBQXVCLEVBQUUsQ0FBQztZQUN6Qyx1QkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBRUksQ0FBQztRQUVsRCxTQUFTLENBQUMsSUFBYTtZQUNyQixJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVPLHFCQUFxQixDQUFDLElBQXlCO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUVELE1BQU0sWUFBWSxHQUFHLG9DQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sa0JBQWtCLEdBQ3BCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUUsQ0FB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QUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUk7YUFDOUUsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBdkVELHNEQXVFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7Z2V0QW5ndWxhckRlY29yYXRvcnMsIE5nRGVjb3JhdG9yfSBmcm9tICcuLi8uLi91dGlscy9uZ19kZWNvcmF0b3JzJztcbmltcG9ydCB7Z2V0UHJvcGVydHlOYW1lVGV4dH0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9wcm9wZXJ0eV9uYW1lJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXNvbHZlZE5nTW9kdWxlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICBkZWNvcmF0b3I6IE5nRGVjb3JhdG9yO1xuICBwcm92aWRlcnNFeHByOiB0cy5FeHByZXNzaW9ufG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb2x2ZWREaXJlY3RpdmUge1xuICBuYW1lOiBzdHJpbmc7XG4gIG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb247XG4gIGRlY29yYXRvcjogTmdEZWNvcmF0b3I7XG4gIHByb3ZpZGVyc0V4cHI6IHRzLkV4cHJlc3Npb258bnVsbDtcbiAgdmlld1Byb3ZpZGVyc0V4cHI6IHRzLkV4cHJlc3Npb258bnVsbDtcbn1cblxuLyoqXG4gKiBWaXNpdG9yIHRoYXQgd2Fsa3MgdGhyb3VnaCBzcGVjaWZpZWQgVHlwZVNjcmlwdCBub2RlcyBhbmQgY29sbGVjdHMgYWxsXG4gKiBmb3VuZCBOZ01vZHVsZSwgRGlyZWN0aXZlIG9yIENvbXBvbmVudCBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nRGVmaW5pdGlvbkNvbGxlY3RvciB7XG4gIHJlc29sdmVkTW9kdWxlczogUmVzb2x2ZWROZ01vZHVsZVtdID0gW107XG4gIHJlc29sdmVkRGlyZWN0aXZlczogUmVzb2x2ZWREaXJlY3RpdmVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIpIHt9XG5cbiAgdmlzaXROb2RlKG5vZGU6IHRzLk5vZGUpIHtcbiAgICBpZiAodHMuaXNDbGFzc0RlY2xhcmF0aW9uKG5vZGUpKSB7XG4gICAgICB0aGlzLnZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlKTtcbiAgICB9XG5cbiAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgbiA9PiB0aGlzLnZpc2l0Tm9kZShuKSk7XG4gIH1cblxuICBwcml2YXRlIHZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKSB7XG4gICAgaWYgKCFub2RlLmRlY29yYXRvcnMgfHwgIW5vZGUuZGVjb3JhdG9ycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZ0RlY29yYXRvcnMgPSBnZXRBbmd1bGFyRGVjb3JhdG9ycyh0aGlzLnR5cGVDaGVja2VyLCBub2RlLmRlY29yYXRvcnMpO1xuICAgIGNvbnN0IGRpcmVjdGl2ZURlY29yYXRvciA9XG4gICAgICAgIG5nRGVjb3JhdG9ycy5maW5kKCh7bmFtZX0pID0+IG5hbWUgPT09ICdDb21wb25lbnQnIHx8IG5hbWUgPT0gJ0RpcmVjdGl2ZScpO1xuICAgIGNvbnN0IG5nTW9kdWxlRGVjb3JhdG9yID0gbmdEZWNvcmF0b3JzLmZpbmQoKHtuYW1lfSkgPT4gbmFtZSA9PT0gJ05nTW9kdWxlJyk7XG5cbiAgICBpZiAobmdNb2R1bGVEZWNvcmF0b3IpIHtcbiAgICAgIHRoaXMuX3Zpc2l0TmdNb2R1bGVDbGFzcyhub2RlLCBuZ01vZHVsZURlY29yYXRvcik7XG4gICAgfSBlbHNlIGlmIChkaXJlY3RpdmVEZWNvcmF0b3IpIHtcbiAgICAgIHRoaXMuX3Zpc2l0RGlyZWN0aXZlQ2xhc3Mobm9kZSwgZGlyZWN0aXZlRGVjb3JhdG9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF92aXNpdERpcmVjdGl2ZUNsYXNzKG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sIGRlY29yYXRvcjogTmdEZWNvcmF0b3IpIHtcbiAgICBjb25zdCBkZWNvcmF0b3JDYWxsID0gZGVjb3JhdG9yLm5vZGUuZXhwcmVzc2lvbjtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGRlY29yYXRvckNhbGwuYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKCFtZXRhZGF0YSB8fCAhdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihtZXRhZGF0YSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm92aWRlcnNOb2RlID0gbWV0YWRhdGEucHJvcGVydGllcy5maWx0ZXIodHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZChwID0+IGdldFByb3BlcnR5TmFtZVRleHQocC5uYW1lKSA9PT0gJ3Byb3ZpZGVycycpO1xuXG4gICAgY29uc3Qgdmlld1Byb3ZpZGVyc05vZGUgPSBtZXRhZGF0YS5wcm9wZXJ0aWVzLmZpbHRlcih0cy5pc1Byb3BlcnR5QXNzaWdubWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZChwID0+IGdldFByb3BlcnR5TmFtZVRleHQocC5uYW1lKSA9PT0gJ3ZpZXdQcm92aWRlcnMnKTtcblxuICAgIHRoaXMucmVzb2x2ZWREaXJlY3RpdmVzLnB1c2goe1xuICAgICAgbmFtZTogbm9kZS5uYW1lID8gbm9kZS5uYW1lLnRleHQgOiAnZGVmYXVsdCcsXG4gICAgICBub2RlLFxuICAgICAgZGVjb3JhdG9yLFxuICAgICAgcHJvdmlkZXJzRXhwcjogcHJvdmlkZXJzTm9kZSAhPT0gdW5kZWZpbmVkID8gcHJvdmlkZXJzTm9kZS5pbml0aWFsaXplciA6IG51bGwsXG4gICAgICB2aWV3UHJvdmlkZXJzRXhwcjogdmlld1Byb3ZpZGVyc05vZGUgIT09IHVuZGVmaW5lZCA/IHZpZXdQcm92aWRlcnNOb2RlLmluaXRpYWxpemVyIDogbnVsbCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0TmdNb2R1bGVDbGFzcyhub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uLCBkZWNvcmF0b3I6IE5nRGVjb3JhdG9yKSB7XG4gICAgY29uc3QgZGVjb3JhdG9yQ2FsbCA9IGRlY29yYXRvci5ub2RlLmV4cHJlc3Npb247XG4gICAgY29uc3QgbWV0YWRhdGEgPSBkZWNvcmF0b3JDYWxsLmFyZ3VtZW50c1swXTtcblxuICAgIGlmICghbWV0YWRhdGEgfHwgIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24obWV0YWRhdGEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdmlkZXJzTm9kZSA9IG1ldGFkYXRhLnByb3BlcnRpZXMuZmlsdGVyKHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQocCA9PiBnZXRQcm9wZXJ0eU5hbWVUZXh0KHAubmFtZSkgPT09ICdwcm92aWRlcnMnKTtcbiAgICB0aGlzLnJlc29sdmVkTW9kdWxlcy5wdXNoKHtcbiAgICAgIG5hbWU6IG5vZGUubmFtZSA/IG5vZGUubmFtZS50ZXh0IDogJ2RlZmF1bHQnLFxuICAgICAgbm9kZSxcbiAgICAgIGRlY29yYXRvcixcbiAgICAgIHByb3ZpZGVyc0V4cHI6IHByb3ZpZGVyc05vZGUgIT09IHVuZGVmaW5lZCA/IHByb3ZpZGVyc05vZGUuaW5pdGlhbGl6ZXIgOiBudWxsLFxuICAgIH0pO1xuICB9XG59XG4iXX0=