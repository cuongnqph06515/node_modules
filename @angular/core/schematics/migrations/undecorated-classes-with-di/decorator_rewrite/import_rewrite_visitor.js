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
        define("@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/import_rewrite_visitor", ["require", "exports", "path", "typescript", "@angular/core/schematics/utils/typescript/imports", "@angular/core/schematics/utils/typescript/symbol", "@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/path_format", "@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/source_file_exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const path_1 = require("path");
    const ts = require("typescript");
    const imports_1 = require("@angular/core/schematics/utils/typescript/imports");
    const symbol_1 = require("@angular/core/schematics/utils/typescript/symbol");
    const path_format_1 = require("@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/path_format");
    const source_file_exports_1 = require("@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/source_file_exports");
    /**
     * Factory that creates a TypeScript transformer which ensures that
     * referenced identifiers are available at the target file location.
     *
     * Imports cannot be just added as sometimes identifiers collide in the
     * target source file and the identifier needs to be aliased.
     */
    class ImportRewriteTransformerFactory {
        constructor(importManager, typeChecker, compilerHost) {
            this.importManager = importManager;
            this.typeChecker = typeChecker;
            this.compilerHost = compilerHost;
            this.sourceFileExports = new Map();
        }
        create(ctx, newSourceFile) {
            const visitNode = (node) => {
                if (ts.isIdentifier(node)) {
                    // Record the identifier reference and return the new identifier. The identifier
                    // name can change if the generated import uses an namespaced import or aliased
                    // import identifier (to avoid collisions).
                    return this._recordIdentifierReference(node, newSourceFile);
                }
                return ts.visitEachChild(node, visitNode, ctx);
            };
            return (node) => ts.visitNode(node, visitNode);
        }
        _recordIdentifierReference(node, targetSourceFile) {
            // For object literal elements we don't want to check identifiers that describe the
            // property name. These identifiers do not refer to a value but rather to a property
            // name and therefore don't need to be imported. The exception is that for shorthand
            // property assignments the "name" identifier is both used as value and property name.
            if (ts.isObjectLiteralElementLike(node.parent) &&
                !ts.isShorthandPropertyAssignment(node.parent) && node.parent.name === node) {
                return node;
            }
            const resolvedImport = imports_1.getImportOfIdentifier(this.typeChecker, node);
            const sourceFile = node.getSourceFile();
            if (resolvedImport) {
                const symbolName = resolvedImport.name;
                const moduleFileName = this.compilerHost.moduleNameToFileName(resolvedImport.importModule, sourceFile.fileName);
                // In case the identifier refers to an export in the target source file, we need to use
                // the local identifier in the scope of the target source file. This is necessary because
                // the export could be aliased and the alias is not available to the target source file.
                if (moduleFileName && path_1.resolve(moduleFileName) === path_1.resolve(targetSourceFile.fileName)) {
                    const resolvedExport = this._getSourceFileExports(targetSourceFile).find(e => e.exportName === symbolName);
                    if (resolvedExport) {
                        return resolvedExport.identifier;
                    }
                }
                return this.importManager.addImportToSourceFile(targetSourceFile, symbolName, this._rewriteModuleImport(resolvedImport, targetSourceFile));
            }
            else {
                let symbol = symbol_1.getValueSymbolOfDeclaration(node, this.typeChecker);
                if (symbol) {
                    // If the symbol refers to a shorthand property assignment, we want to resolve the
                    // value symbol of the shorthand property assignment. This is necessary because the
                    // value symbol is ambiguous for shorthand property assignment identifiers as the
                    // identifier resolves to both property name and property value.
                    if (symbol.valueDeclaration && ts.isShorthandPropertyAssignment(symbol.valueDeclaration)) {
                        symbol = this.typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
                    }
                    const resolvedExport = this._getSourceFileExports(sourceFile).find(e => e.symbol === symbol);
                    if (resolvedExport) {
                        return this.importManager.addImportToSourceFile(targetSourceFile, resolvedExport.exportName, path_format_1.getPosixPath(this.compilerHost.fileNameToModuleName(sourceFile.fileName, targetSourceFile.fileName)));
                    }
                }
                // The referenced identifier cannot be imported. In that case we throw an exception
                // which can be handled outside of the transformer.
                throw new UnresolvedIdentifierError();
            }
        }
        /**
         * Gets the resolved exports of a given source file. Exports are cached
         * for subsequent calls.
         */
        _getSourceFileExports(sourceFile) {
            if (this.sourceFileExports.has(sourceFile)) {
                return this.sourceFileExports.get(sourceFile);
            }
            const sourceFileExports = source_file_exports_1.getExportSymbolsOfFile(sourceFile, this.typeChecker);
            this.sourceFileExports.set(sourceFile, sourceFileExports);
            return sourceFileExports;
        }
        /** Rewrites a module import to be relative to the target file location. */
        _rewriteModuleImport(resolvedImport, newSourceFile) {
            if (!resolvedImport.importModule.startsWith('.')) {
                return resolvedImport.importModule;
            }
            const importFilePath = resolvedImport.node.getSourceFile().fileName;
            const resolvedModulePath = path_1.resolve(path_1.dirname(importFilePath), resolvedImport.importModule);
            const relativeModuleName = this.compilerHost.fileNameToModuleName(resolvedModulePath, newSourceFile.fileName);
            return path_format_1.getPosixPath(relativeModuleName);
        }
    }
    exports.ImportRewriteTransformerFactory = ImportRewriteTransformerFactory;
    /** Error that will be thrown if a given identifier cannot be resolved. */
    class UnresolvedIdentifierError extends Error {
    }
    exports.UnresolvedIdentifierError = UnresolvedIdentifierError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0X3Jld3JpdGVfdmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3VuZGVjb3JhdGVkLWNsYXNzZXMtd2l0aC1kaS9kZWNvcmF0b3JfcmV3cml0ZS9pbXBvcnRfcmV3cml0ZV92aXNpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBR0gsK0JBQXNDO0lBQ3RDLGlDQUFpQztJQUdqQywrRUFBZ0Y7SUFDaEYsNkVBQTZFO0lBRTdFLCtIQUEyQztJQUMzQywrSUFBNkU7SUFHN0U7Ozs7OztPQU1HO0lBQ0gsTUFBYSwrQkFBK0I7UUFHMUMsWUFDWSxhQUE0QixFQUFVLFdBQTJCLEVBQ2pFLFlBQTZCO1lBRDdCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1lBQ2pFLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtZQUpqQyxzQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBbUMsQ0FBQztRQUkzQixDQUFDO1FBRTdDLE1BQU0sQ0FBb0IsR0FBNkIsRUFBRSxhQUE0QjtZQUVuRixNQUFNLFNBQVMsR0FBZSxDQUFDLElBQWEsRUFBRSxFQUFFO2dCQUM5QyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3pCLGdGQUFnRjtvQkFDaEYsK0VBQStFO29CQUMvRSwyQ0FBMkM7b0JBQzNDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDN0Q7Z0JBRUQsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDO1lBRUYsT0FBTyxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFD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eUI7WUFDckQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFFLENBQUM7YUFDaEQ7WUFFRCxNQUFNLGlCQUFpQixHQUFHLDRDQUFzQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMxRCxPQUFPLGlCQUFpQixDQUFDO1FBQzNCLENBQUM7UUFFRCwyRUFBMkU7UUFDbkUsb0JBQW9CLENBQUMsY0FBc0IsRUFBRSxhQUE0QjtZQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQzthQUNwQztZQUVELE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3BFLE1BQU0sa0JBQWtCLEdBQUcsY0FBTyxDQUFDLGNBQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekYsTUFBTSxrQkFBa0IsR0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkYsT0FBTywwQkFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUNGO0lBaEhELDBFQWdIQztJQUVELDBFQUEwRTtJQUMxRSxNQUFhLHlCQUEwQixTQUFRLEtBQUs7S0FBRztJQUF2RCw4REFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW90Q29tcGlsZXJIb3N0fSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge2Rpcm5hbWUsIHJlc29sdmV9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7SW1wb3J0TWFuYWdlcn0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaW1wb3J0X21hbmFnZXInO1xuaW1wb3J0IHtnZXRJbXBvcnRPZklkZW50aWZpZXIsIEltcG9ydH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9pbXBvcnRzJztcbmltcG9ydCB7Z2V0VmFsdWVTeW1ib2xPZkRlY2xhcmF0aW9ufSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlc2NyaXB0L3N5bWJvbCc7XG5cbmltcG9ydCB7Z2V0UG9zaXhQYXRofSBmcm9tICcuL3BhdGhfZm9ybWF0JztcbmltcG9ydCB7Z2V0RXhwb3J0U3ltYm9sc09mRmlsZSwgUmVzb2x2ZWRFeHBvcnR9IGZyb20gJy4vc291cmNlX2ZpbGVfZXhwb3J0cyc7XG5cblxuLyoqXG4gKiBGYWN0b3J5IHRoYXQgY3JlYXRlcyBhIFR5cGVTY3JpcHQgdHJhbnNmb3JtZXIgd2hpY2ggZW5zdXJlcyB0aGF0XG4gKiByZWZlcmVuY2VkIGlkZW50aWZpZXJzIGFyZSBhdmFpbGFibGUgYXQgdGhlIHRhcmdldCBmaWxlIGxvY2F0aW9uLlxuICpcbiAqIEltcG9ydHMgY2Fubm90IGJlIGp1c3QgYWRkZWQgYXMgc29tZXRpbWVzIGlkZW50aWZpZXJzIGNvbGxpZGUgaW4gdGhlXG4gKiB0YXJnZXQgc291cmNlIGZpbGUgYW5kIHRoZSBpZGVudGlmaWVyIG5lZWRzIHRvIGJlIGFsaWFzZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbXBvcnRSZXdyaXRlVHJhbnNmb3JtZXJGYWN0b3J5IHtcbiAgcHJpdmF0ZSBzb3VyY2VGaWxlRXhwb3J0cyA9IG5ldyBNYXA8dHMuU291cmNlRmlsZSwgUmVzb2x2ZWRFeHBvcnRbXT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgaW1wb3J0TWFuYWdlcjogSW1wb3J0TWFuYWdlciwgcHJpdmF0ZSB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsXG4gICAgICBwcml2YXRlIGNvbXBpbGVySG9zdDogQW90Q29tcGlsZXJIb3N0KSB7fVxuXG4gIGNyZWF0ZTxUIGV4dGVuZHMgdHMuTm9kZT4oY3R4OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQsIG5ld1NvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOlxuICAgICAgdHMuVHJhbnNmb3JtZXI8VD4ge1xuICAgIGNvbnN0IHZpc2l0Tm9kZTogdHMuVmlzaXRvciA9IChub2RlOiB0cy5Ob2RlKSA9PiB7XG4gICAgICBpZiAodHMuaXNJZGVudGlmaWVyKG5vZGUpKSB7XG4gICAgICAgIC8vIFJlY29yZCB0aGUgaWRlbnRpZmllciByZWZlcmVuY2UgYW5kIHJldHVybiB0aGUgbmV3IGlkZW50aWZpZXIuIFRoZSBpZGVudGlmaWVyXG4gICAgICAgIC8vIG5hbWUgY2FuIGNoYW5nZSBpZiB0aGUgZ2VuZXJhdGVkIGltcG9ydCB1c2VzIGFuIG5hbWVzcGFjZWQgaW1wb3J0IG9yIGFsaWFzZWRcbiAgICAgICAgLy8gaW1wb3J0IGlkZW50aWZpZXIgKHRvIGF2b2lkIGNvbGxpc2lvbnMpLlxuICAgICAgICByZXR1cm4gdGhpcy5fcmVjb3JkSWRlbnRpZmllclJlZmVyZW5jZShub2RlLCBuZXdTb3VyY2VGaWxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIHZpc2l0Tm9kZSwgY3R4KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChub2RlOiBUKSA9PiB0cy52aXNpdE5vZGUobm9kZSwgdmlzaXROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlY29yZElkZW50aWZpZXJSZWZlcmVuY2Uobm9kZTogdHMuSWRlbnRpZmllciwgdGFyZ2V0U291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6XG4gICAgICB0cy5Ob2RlIHtcbiAgICAvLyBGb3Igb2JqZWN0IGxpdGVyYWwgZWxlbWVudHMgd2UgZG9uJ3Qgd2FudCB0byBjaGVjayBpZGVudGlmaWVycyB0aGF0IGRlc2NyaWJlIHRoZVxuICAgIC8vIHByb3BlcnR5IG5hbWUuIFRoZXNlIGlkZW50aWZpZXJzIGRvIG5vdCByZWZlciB0byBhIHZhbHVlIGJ1dCByYXRoZXIgdG8gYSBwcm9wZXJ0eVxuICAgIC8vIG5hbWUgYW5kIHRoZXJlZm9yZSBkb24ndCBuZWVkIHRvIGJlIGltcG9ydGVkLiBUaGUgZXhjZXB0aW9uIGlzIHRoYXQgZm9yIHNob3J0aGFuZFxuICAgIC8vIHByb3BlcnR5IGFzc2lnbm1lbnRzIHRoZSBcIm5hbWVcIiBpZGVudGlmaWVyIGlzIGJvdGggdXNlZCBhcyB2YWx1ZSBhbmQgcHJvcGVydHkgbmFtZS5cbiAgICBpZiAodHMuaXNPYmplY3RMaXRlcmFsRWxlbWVudExpa2Uobm9kZS5wYXJlbnQpICYmXG4gICAgICAgICF0cy5pc1Nob3J0aGFuZFByb3BlcnR5QXNzaWdubWVudChub2RlLnBhcmVudCkgJiYgbm9kZS5wYXJlbnQubmFtZSA9PT0gbm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzb2x2ZWRJbXBvcnQgPSBnZXRJbXBvcnRPZklkZW50aWZpZXIodGhpcy50eXBlQ2hlY2tlciwgbm9kZSk7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9IG5vZGUuZ2V0U291cmNlRmlsZSgpO1xuXG4gICAgaWYgKHJlc29sdmVkSW1wb3J0KSB7XG4gICAgICBjb25zdCBzeW1ib2xOYW1lID0gcmVzb2x2ZWRJbXBvcnQubmFtZTtcbiAgICAgIGNvbnN0IG1vZHVsZUZpbGVOYW1lID1cbiAgICAgICAgICB0aGlzLmNvbXBpbGVySG9zdC5tb2R1bGVOYW1lVG9GaWxlTmFtZShyZXNvbHZlZEltcG9ydC5pbXBvcnRNb2R1bGUsIHNvdXJjZUZpbGUuZmlsZU5hbWUpO1xuXG4gICAgICAvLyBJbiBjYXNlIHRoZSBpZGVudGlmaWVyIHJlZmVycyB0byBhbiBleHBvcnQgaW4gdGhlIHRhcmdldCBzb3VyY2UgZmlsZSwgd2UgbmVlZCB0byB1c2VcbiAgICAgIC8vIHRoZSBsb2NhbCBpZGVudGlmaWVyIGluIHRoZSBzY29wZSBvZiB0aGUgdGFyZ2V0IHNvdXJjZSBmaWxlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gICAgICAvLyB0aGUgZXhwb3J0IGNvdWxkIGJlIGFsaWFzZWQgYW5kIHRoZSBhbGlhcyBpcyBub3QgYXZhaWxhYmxlIHRvIHRoZSB0YXJnZXQgc291cmNlIGZpbGUuXG4gICAgICBpZiAobW9kdWxlRmlsZU5hbWUgJiYgcmVzb2x2ZShtb2R1bGVGaWxlTmFtZSkgPT09IHJlc29sdmUodGFyZ2V0U291cmNlRmlsZS5maWxlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRFeHBvcnQgPVxuICAgICAgICAgICAgdGhpcy5fZ2V0U291cmNlRmlsZUV4cG9ydHModGFyZ2V0U291cmNlRmlsZSkuZmluZChlID0+IGUuZXhwb3J0TmFtZSA9PT0gc3ltYm9sTmFtZSk7XG4gICAgICAgIGlmIChyZXNvbHZlZEV4cG9ydCkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlZEV4cG9ydC5pZGVudGlmaWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmltcG9ydE1hbmFnZXIuYWRkSW1wb3J0VG9Tb3VyY2VGaWxlKFxuICAgICAgICAgIHRhcmdldFNvdXJjZUZpbGUsIHN5bWJvbE5hbWUsXG4gICAgICAgICAgdGhpcy5fcmV3cml0ZU1vZHVsZUltcG9ydChyZXNvbHZlZEltcG9ydCwgdGFyZ2V0U291cmNlRmlsZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3ltYm9sID0gZ2V0VmFsdWVTeW1ib2xPZkRlY2xhcmF0aW9uKG5vZGUsIHRoaXMudHlwZUNoZWNrZXIpO1xuXG4gICAgICBpZiAoc3ltYm9sKSB7XG4gICAgICAgIC8vIElmIHRoZSBzeW1ib2wgcmVmZXJzIHRvIGEgc2hvcnRoYW5kIHByb3BlcnR5IGFzc2lnbm1lbnQsIHdlIHdhbnQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgICAgLy8gdmFsdWUgc3ltYm9sIG9mIHRoZSBzaG9ydGhhbmQgcHJvcGVydHkgYXNzaWdubWVudC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB0aGVcbiAgICAgICAgLy8gdmFsdWUgc3ltYm9sIGlzIGFtYmlndW91cyBmb3Igc2hvcnRoYW5kIHByb3BlcnR5IGFzc2lnbm1lbnQgaWRlbnRpZmllcnMgYXMgdGhlXG4gICAgICAgIC8vIGlkZW50aWZpZXIgcmVzb2x2ZXMgdG8gYm90aCBwcm9wZXJ0eSBuYW1lIGFuZCBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgICAgaWYgKHN5bWJvbC52YWx1ZURlY2xhcmF0aW9uICYmIHRzLmlzU2hvcnRoYW5kUHJvcGVydHlBc3NpZ25tZW50KHN5bWJvbC52YWx1ZURlY2xhcmF0aW9uKSkge1xuICAgICAgICAgIHN5bWJvbCA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0U2hvcnRoYW5kQXNzaWdubWVudFZhbHVlU3ltYm9sKHN5bWJvbC52YWx1ZURlY2xhcmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc29sdmVkRXhwb3J0ID1cbiAgICAgICAgICAgIHRoaXMuX2dldFNvdXJjZUZpbGVFeHBvcnRzKHNvdXJjZUZpbGUpLmZpbmQoZSA9PiBlLnN5bWJvbCA9PT0gc3ltYm9sKTtcblxuICAgICAgICBpZiAocmVzb2x2ZWRFeHBvcnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbXBvcnRNYW5hZ2VyLmFkZEltcG9ydFRvU291cmNlRmlsZShcbiAgICAgICAgICAgICAgdGFyZ2V0U291cmNlRmlsZSwgcmVzb2x2ZWRFeHBvcnQuZXhwb3J0TmFtZSxcbiAgICAgICAgICAgICAgZ2V0UG9zaXhQYXRoKHRoaXMuY29tcGlsZXJIb3N0LmZpbGVOYW1lVG9Nb2R1bGVOYW1lKFxuICAgICAgICAgICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSwgdGFyZ2V0U291cmNlRmlsZS5maWxlTmFtZSkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVmZXJlbmNlZCBpZGVudGlmaWVyIGNhbm5vdCBiZSBpbXBvcnRlZC4gSW4gdGhhdCBjYXNlIHdlIHRocm93IGFuIGV4Y2VwdGlvblxuICAgICAgLy8gd2hpY2ggY2FuIGJlIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgdHJhbnNmb3JtZXIuXG4gICAgICB0aHJvdyBuZXcgVW5yZXNvbHZlZElkZW50aWZpZXJFcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByZXNvbHZlZCBleHBvcnRzIG9mIGEgZ2l2ZW4gc291cmNlIGZpbGUuIEV4cG9ydHMgYXJlIGNhY2hlZFxuICAgKiBmb3Igc3Vic2VxdWVudCBjYWxscy5cbiAgICovXG4gIHByaXZhdGUgX2dldFNvdXJjZUZpbGVFeHBvcnRzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBSZXNvbHZlZEV4cG9ydFtdIHtcbiAgICBpZiAodGhpcy5zb3VyY2VGaWxlRXhwb3J0cy5oYXMoc291cmNlRmlsZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZUZpbGVFeHBvcnRzLmdldChzb3VyY2VGaWxlKSE7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlRmlsZUV4cG9ydHMgPSBnZXRFeHBvcnRTeW1ib2xzT2ZGaWxlKHNvdXJjZUZpbGUsIHRoaXMudHlwZUNoZWNrZXIpO1xuICAgIHRoaXMuc291cmNlRmlsZUV4cG9ydHMuc2V0KHNvdXJjZUZpbGUsIHNvdXJjZUZpbGVFeHBvcnRzKTtcbiAgICByZXR1cm4gc291cmNlRmlsZUV4cG9ydHM7XG4gIH1cblxuICAvKiogUmV3cml0ZXMgYSBtb2R1bGUgaW1wb3J0IHRvIGJlIHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQgZmlsZSBsb2NhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfcmV3cml0ZU1vZHVsZUltcG9ydChyZXNvbHZlZEltcG9ydDogSW1wb3J0LCBuZXdTb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogc3RyaW5nIHtcbiAgICBpZiAoIXJlc29sdmVkSW1wb3J0LmltcG9ydE1vZHVsZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgIHJldHVybiByZXNvbHZlZEltcG9ydC5pbXBvcnRNb2R1bGU7XG4gICAgfVxuXG4gICAgY29uc3QgaW1wb3J0RmlsZVBhdGggPSByZXNvbHZlZEltcG9ydC5ub2RlLmdldFNvdXJjZUZpbGUoKS5maWxlTmFtZTtcbiAgICBjb25zdCByZXNvbHZlZE1vZHVsZVBhdGggPSByZXNvbHZlKGRpcm5hbWUoaW1wb3J0RmlsZVBhdGgpLCByZXNvbHZlZEltcG9ydC5pbXBvcnRNb2R1bGUpO1xuICAgIGNvbnN0IHJlbGF0aXZlTW9kdWxlTmFtZSA9XG4gICAgICAgIHRoaXMuY29tcGlsZXJIb3N0LmZpbGVOYW1lVG9Nb2R1bGVOYW1lKHJlc29sdmVkTW9kdWxlUGF0aCwgbmV3U291cmNlRmlsZS5maWxlTmFtZSk7XG5cbiAgICByZXR1cm4gZ2V0UG9zaXhQYXRoKHJlbGF0aXZlTW9kdWxlTmFtZSk7XG4gIH1cbn1cblxuLyoqIEVycm9yIHRoYXQgd2lsbCBiZSB0aHJvd24gaWYgYSBnaXZlbiBpZGVudGlmaWVyIGNhbm5vdCBiZSByZXNvbHZlZC4gKi9cbmV4cG9ydCBjbGFzcyBVbnJlc29sdmVkSWRlbnRpZmllckVycm9yIGV4dGVuZHMgRXJyb3Ige31cbiJdfQ==