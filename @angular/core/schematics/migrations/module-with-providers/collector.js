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
        define("@angular/core/schematics/migrations/module-with-providers/collector", ["require", "exports", "typescript", "@angular/core/schematics/utils/ng_decorators", "@angular/core/schematics/migrations/module-with-providers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const ng_decorators_1 = require("@angular/core/schematics/utils/ng_decorators");
    const util_1 = require("@angular/core/schematics/migrations/module-with-providers/util");
    /**
     * Visitor that walks through specified TypeScript nodes and collects all
     * found NgModule static methods without types and all ModuleWithProviders
     * usages without generic types attached.
     */
    class Collector {
        constructor(typeChecker) {
            this.typeChecker = typeChecker;
            this.resolvedModules = [];
            this.resolvedNonGenerics = [];
        }
        visitNode(node) {
            if (ts.isClassDeclaration(node)) {
                this.visitClassDeclaration(node);
            }
            else if (util_1.isModuleWithProvidersNotGeneric(this.typeChecker, node)) {
                this.resolvedNonGenerics.push(node);
            }
            ts.forEachChild(node, n => this.visitNode(n));
        }
        visitClassDeclaration(node) {
            if (!node.decorators || !node.decorators.length) {
                return;
            }
            const ngDecorators = ng_decorators_1.getAngularDecorators(this.typeChecker, node.decorators);
            const ngModuleDecorator = ngDecorators.find(({ name }) => name === 'NgModule');
            if (ngModuleDecorator) {
                this._visitNgModuleClass(node, ngModuleDecorator);
            }
        }
        _visitNgModuleClass(node, decorator) {
            const decoratorCall = decorator.node.expression;
            const metadata = decoratorCall.arguments[0];
            if (!metadata || !ts.isObjectLiteralExpression(metadata)) {
                return;
            }
            this.resolvedModules.push({
                name: node.name ? node.name.text : 'default',
                node,
                decorator,
                staticMethodsWithoutType: node.members.filter(isStaticMethodNoType),
            });
        }
    }
    exports.Collector = Collector;
    function isStaticMethodNoType(node) {
        return ts.isMethodDeclaration(node) && !!node.modifiers &&
            node.modifiers.findIndex(m => m.kind === ts.SyntaxKind.StaticKeyword) > -1 && !node.type;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zY2hlbWF0aWNzL21pZ3JhdGlvbnMvbW9kdWxlLXdpdGgtcHJvdmlkZXJzL2NvbGxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILGlDQUFpQztJQUVqQyxnRkFBNEU7SUFFNUUseUZBQXVEO0lBYXZEOzs7O09BSUc7SUFDSCxNQUFhLFNBQVM7UUFJcEIsWUFBbUIsV0FBMkI7WUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1lBSDlDLG9CQUFlLEdBQXVCLEVBQUUsQ0FBQztZQUN6Qyx3QkFBbUIsR0FBMkIsRUFBRSxDQUFDO1FBRUEsQ0FBQztRQUVsRCxTQUFTLENBQUMsSUFBYTtZQUNyQixJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNLElBQUksc0NBQStCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQztZQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFTyxxQkFBcUIsQ0FBQyxJQUF5QjtZQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUMvQyxPQUFPO2FBQ1I7WUFFRCxNQUFNLFlBQVksR0FBRyxvQ0FBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RSxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUM7WUFFN0UsSUFBSSxpQkFBaUIsRUFBRTtnQkFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQ25EO1FBQ0gsQ0FBQztRQUVPLG1CQUFtQixDQUFDLElBQXlCLEVBQUUsU0FBc0I7WUFDM0UsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDaEQsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4RCxPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUM1QyxJQUFJO2dCQUNKLFNBQVM7Z0JBQ1Qsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7YUFDcEUsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBNUNELDhCQTRDQztJQUVELFNBQVMsb0JBQW9CLENBQUMsSUFBcUI7UUFDakQsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMvRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtnZXRBbmd1bGFyRGVjb3JhdG9ycywgTmdEZWNvcmF0b3J9IGZyb20gJy4uLy4uL3V0aWxzL25nX2RlY29yYXRvcnMnO1xuXG5pbXBvcnQge2lzTW9kdWxlV2l0aFByb3ZpZGVyc05vdEdlbmVyaWN9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb2x2ZWROZ01vZHVsZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgbm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgZGVjb3JhdG9yOiBOZ0RlY29yYXRvcjtcbiAgLyoqXG4gICAqIExpc3Qgb2YgZm91bmQgc3RhdGljIG1ldGhvZCBkZWNsYXJhdGlvbnMgb24gdGhlIG1vZHVsZSB3aGljaCBkbyBub3RcbiAgICogZGVjbGFyZSBhbiBleHBsaWNpdCByZXR1cm4gdHlwZS5cbiAgICovXG4gIHN0YXRpY01ldGhvZHNXaXRob3V0VHlwZTogdHMuTWV0aG9kRGVjbGFyYXRpb25bXTtcbn1cblxuLyoqXG4gKiBWaXNpdG9yIHRoYXQgd2Fsa3MgdGhyb3VnaCBzcGVjaWZpZWQgVHlwZVNjcmlwdCBub2RlcyBhbmQgY29sbGVjdHMgYWxsXG4gKiBmb3VuZCBOZ01vZHVsZSBzdGF0aWMgbWV0aG9kcyB3aXRob3V0IHR5cGVzIGFuZCBhbGwgTW9kdWxlV2l0aFByb3ZpZGVyc1xuICogdXNhZ2VzIHdpdGhvdXQgZ2VuZXJpYyB0eXBlcyBhdHRhY2hlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxlY3RvciB7XG4gIHJlc29sdmVkTW9kdWxlczogUmVzb2x2ZWROZ01vZHVsZVtdID0gW107XG4gIHJlc29sdmVkTm9uR2VuZXJpY3M6IHRzLlR5cGVSZWZlcmVuY2VOb2RlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyKSB7fVxuXG4gIHZpc2l0Tm9kZShub2RlOiB0cy5Ob2RlKSB7XG4gICAgaWYgKHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgdGhpcy52aXNpdENsYXNzRGVjbGFyYXRpb24obm9kZSk7XG4gICAgfSBlbHNlIGlmIChpc01vZHVsZVdpdGhQcm92aWRlcnNOb3RHZW5lcmljKHRoaXMudHlwZUNoZWNrZXIsIG5vZGUpKSB7XG4gICAgICB0aGlzLnJlc29sdmVkTm9uR2VuZXJpY3MucHVzaChub2RlKTtcbiAgICB9XG5cbiAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgbiA9PiB0aGlzLnZpc2l0Tm9kZShuKSk7XG4gIH1cblxuICBwcml2YXRlIHZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKSB7XG4gICAgaWYgKCFub2RlLmRlY29yYXRvcnMgfHwgIW5vZGUuZGVjb3JhdG9ycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZ0RlY29yYXRvcnMgPSBnZXRBbmd1bGFyRGVjb3JhdG9ycyh0aGlzLnR5cGVDaGVja2VyLCBub2RlLmRlY29yYXRvcnMpO1xuICAgIGNvbnN0IG5nTW9kdWxlRGVjb3JhdG9yID0gbmdEZWNvcmF0b3JzLmZpbmQoKHtuYW1lfSkgPT4gbmFtZSA9PT0gJ05nTW9kdWxlJyk7XG5cbiAgICBpZiAobmdNb2R1bGVEZWNvcmF0b3IpIHtcbiAgICAgIHRoaXMuX3Zpc2l0TmdNb2R1bGVDbGFzcyhub2RlLCBuZ01vZHVsZURlY29yYXRvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXROZ01vZHVsZUNsYXNzKG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sIGRlY29yYXRvcjogTmdEZWNvcmF0b3IpIHtcbiAgICBjb25zdCBkZWNvcmF0b3JDYWxsID0gZGVjb3JhdG9yLm5vZGUuZXhwcmVzc2lvbjtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGRlY29yYXRvckNhbGwuYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKCFtZXRhZGF0YSB8fCAhdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihtZXRhZGF0YSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlc29sdmVkTW9kdWxlcy5wdXNoKHtcbiAgICAgIG5hbWU6IG5vZGUubmFtZSA/IG5vZGUubmFtZS50ZXh0IDogJ2RlZmF1bHQnLFxuICAgICAgbm9kZSxcbiAgICAgIGRlY29yYXRvcixcbiAgICAgIHN0YXRpY01ldGhvZHNXaXRob3V0VHlwZTogbm9kZS5tZW1iZXJzLmZpbHRlcihpc1N0YXRpY01ldGhvZE5vVHlwZSksXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTdGF0aWNNZXRob2ROb1R5cGUobm9kZTogdHMuQ2xhc3NFbGVtZW50KTogbm9kZSBpcyB0cy5NZXRob2REZWNsYXJhdGlvbiB7XG4gIHJldHVybiB0cy5pc01ldGhvZERlY2xhcmF0aW9uKG5vZGUpICYmICEhbm9kZS5tb2RpZmllcnMgJiZcbiAgICAgIG5vZGUubW9kaWZpZXJzLmZpbmRJbmRleChtID0+IG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5TdGF0aWNLZXl3b3JkKSA+IC0xICYmICFub2RlLnR5cGU7XG59XG4iXX0=