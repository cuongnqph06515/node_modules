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
        define("@angular/compiler/src/ng_module_compiler", ["require", "exports", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/identifiers", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/parse_util", "@angular/compiler/src/provider_analyzer", "@angular/compiler/src/view_compiler/provider_compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var identifiers_1 = require("@angular/compiler/src/identifiers");
    var o = require("@angular/compiler/src/output/output_ast");
    var parse_util_1 = require("@angular/compiler/src/parse_util");
    var provider_analyzer_1 = require("@angular/compiler/src/provider_analyzer");
    var provider_compiler_1 = require("@angular/compiler/src/view_compiler/provider_compiler");
    var NgModuleCompileResult = /** @class */ (function () {
        function NgModuleCompileResult(ngModuleFactoryVar) {
            this.ngModuleFactoryVar = ngModuleFactoryVar;
        }
        return NgModuleCompileResult;
    }());
    exports.NgModuleCompileResult = NgModuleCompileResult;
    var LOG_VAR = o.variable('_l');
    var NgModuleCompiler = /** @class */ (function () {
        function NgModuleCompiler(reflector) {
            this.reflector = reflector;
        }
        NgModuleCompiler.prototype.compile = function (ctx, ngModuleMeta, extraProviders) {
            var sourceSpan = parse_util_1.typeSourceSpan('NgModule', ngModuleMeta.type);
            var entryComponentFactories = ngModuleMeta.transitiveModule.entryComponents;
            var bootstrapComponents = ngModuleMeta.bootstrapComponents;
            var providerParser = new provider_analyzer_1.NgModuleProviderAnalyzer(this.reflector, ngModuleMeta, extraProviders, sourceSpan);
            var providerDefs = [provider_compiler_1.componentFactoryResolverProviderDef(this.reflector, ctx, 0 /* None */, entryComponentFactories)]
                .concat(providerParser.parse().map(function (provider) { return provider_compiler_1.providerDef(ctx, provider); }))
                .map(function (_a) {
                var providerExpr = _a.providerExpr, depsExpr = _a.depsExpr, flags = _a.flags, tokenExpr = _a.tokenExpr;
                return o.importExpr(identifiers_1.Identifiers.moduleProviderDef).callFn([
                    o.literal(flags), tokenExpr, providerExpr, depsExpr
                ]);
            });
            var ngModuleDef = o.importExpr(identifiers_1.Identifiers.moduleDef).callFn([o.literalArr(providerDefs)]);
            var ngModuleDefFactory = o.fn([new o.FnParam(LOG_VAR.name)], [new o.ReturnStatement(ngModuleDef)], o.INFERRED_TYPE);
            var ngModuleFactoryVar = compile_metadata_1.identifierName(ngModuleMeta.type) + "NgFactory";
            this._createNgModuleFactory(ctx, ngModuleMeta.type.reference, o.importExpr(identifiers_1.Identifiers.createModuleFactory).callFn([
                ctx.importExpr(ngModuleMeta.type.reference),
                o.literalArr(bootstrapComponents.map(function (id) { return ctx.importExpr(id.reference); })),
                ngModuleDefFactory
            ]));
            if (ngModuleMeta.id) {
                var id = typeof ngModuleMeta.id === 'string' ? o.literal(ngModuleMeta.id) :
                    ctx.importExpr(ngModuleMeta.id);
                var registerFactoryStmt = o.importExpr(identifiers_1.Identifiers.RegisterModuleFactoryFn)
                    .callFn([id, o.variable(ngModuleFactoryVar)])
                    .toStmt();
                ctx.statements.push(registerFactoryStmt);
            }
            return new NgModuleCompileResult(ngModuleFactoryVar);
        };
        NgModuleCompiler.prototype.createStub = function (ctx, ngModuleReference) {
            this._createNgModuleFactory(ctx, ngModuleReference, o.NULL_EXPR);
        };
        NgModuleCompiler.prototype._createNgModuleFactory = function (ctx, reference, value) {
            var ngModuleFactoryVar = compile_metadata_1.identifierName({ reference: reference }) + "NgFactory";
            var ngModuleFactoryStmt = o.variable(ngModuleFactoryVar)
                .set(value)
                .toDeclStmt(o.importType(identifiers_1.Identifiers.NgModuleFactory, [o.expressionType(ctx.importExpr(reference))], [o.TypeModifier.Const]), [o.StmtModifier.Final, o.StmtModifier.Exported]);
            ctx.statements.push(ngModuleFactoryStmt);
        };
        return NgModuleCompiler;
    }());
    exports.NgModuleCompiler = NgModuleCompiler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL25nX21vZHVsZV9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDJFQUFvRztJQUdwRyxpRUFBMEM7SUFDMUMsMkRBQXlDO0lBQ3pDLCtEQUE0QztJQUM1Qyw2RUFBNkQ7SUFFN0QsMkZBQTJHO0lBRTNHO1FBQ0UsK0JBQW1CLGtCQUEwQjtZQUExQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVE7UUFBRyxDQUFDO1FBQ25ELDRCQUFDO0lBQUQsQ0FBQyxBQUZELElBRUM7SUFGWSxzREFBcUI7SUFJbEMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqQztRQUNFLDBCQUFvQixTQUEyQjtZQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFHLENBQUM7UUFDbkQsa0NBQU8sR0FBUCxVQUNJLEdBQWtCLEVBQUUsWUFBcUMsRUFDekQsY0FBeUM7WUFDM0MsSUFBTSxVQUFVLEdBQUcsMkJBQWMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQU0sdUJBQXVCLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztZQUM5RSxJQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztZQUM3RCxJQUFNLGNBQWMsR0FDaEIsSUFBSSw0Q0FBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDM0YsSUFBTSxZQUFZLEdBQ2QsQ0FBQyx1REFBbUMsQ0FDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLGdCQUFrQix1QkFBdUIsQ0FBQyxDQUFDO2lCQUM5RCxNQUFN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QVcsQ0FBQztZQUNoRixJQUFNLG1CQUFtQixHQUNyQixDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO2lCQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDO2lCQUNWLFVBQVUsQ0FDUCxDQUFDLENBQUMsVUFBVSxDQUNSLHlCQUFXLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUMsRUFDM0UsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzNCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTdELEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQTdERCxJQTZEQztJQTdEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVJlZmxlY3Rvcn0gZnJvbSAnLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge05vZGVGbGFnc30gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4vaWRlbnRpZmllcnMnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7dHlwZVNvdXJjZVNwYW59IGZyb20gJy4vcGFyc2VfdXRpbCc7XG5pbXBvcnQge05nTW9kdWxlUHJvdmlkZXJBbmFseXplcn0gZnJvbSAnLi9wcm92aWRlcl9hbmFseXplcic7XG5pbXBvcnQge091dHB1dENvbnRleHR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlclByb3ZpZGVyRGVmLCBkZXBEZWYsIHByb3ZpZGVyRGVmfSBmcm9tICcuL3ZpZXdfY29tcGlsZXIvcHJvdmlkZXJfY29tcGlsZXInO1xuXG5leHBvcnQgY2xhc3MgTmdNb2R1bGVDb21waWxlUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5nTW9kdWxlRmFjdG9yeVZhcjogc3RyaW5nKSB7fVxufVxuXG5jb25zdCBMT0dfVkFSID0gby52YXJpYWJsZSgnX2wnKTtcblxuZXhwb3J0IGNsYXNzIE5nTW9kdWxlQ29tcGlsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3Rvcikge31cbiAgY29tcGlsZShcbiAgICAgIGN0eDogT3V0cHV0Q29udGV4dCwgbmdNb2R1bGVNZXRhOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSxcbiAgICAgIGV4dHJhUHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdKTogTmdNb2R1bGVDb21waWxlUmVzdWx0IHtcbiAgICBjb25zdCBzb3VyY2VTcGFuID0gdHlwZVNvdXJjZVNwYW4oJ05nTW9kdWxlJywgbmdNb2R1bGVNZXRhLnR5cGUpO1xuICAgIGNvbnN0IGVudHJ5Q29tcG9uZW50RmFjdG9yaWVzID0gbmdNb2R1bGVNZXRhLnRyYW5zaXRpdmVNb2R1bGUuZW50cnlDb21wb25lbnRzO1xuICAgIGNvbnN0IGJvb3RzdHJhcENvbXBvbmVudHMgPSBuZ01vZHVsZU1ldGEuYm9vdHN0cmFwQ29tcG9uZW50cztcbiAgICBjb25zdCBwcm92aWRlclBhcnNlciA9XG4gICAgICAgIG5ldyBOZ01vZHVsZVByb3ZpZGVyQW5hbHl6ZXIodGhpcy5yZWZsZWN0b3IsIG5nTW9kdWxlTWV0YSwgZXh0cmFQcm92aWRlcnMsIHNvdXJjZVNwYW4pO1xuICAgIGNvbnN0IHByb3ZpZGVyRGVmcyA9XG4gICAgICAgIFtjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJQcm92aWRlckRlZihcbiAgICAgICAgICAgICB0aGlzLnJlZmxlY3RvciwgY3R4LCBOb2RlRmxhZ3MuTm9uZSwgZW50cnlDb21wb25lbnRGYWN0b3JpZXMpXVxuICAgICAgICAgICAgLmNvbmNhdChwcm92aWRlclBhcnNlci5wYXJzZSgpLm1hcCgocHJvdmlkZXIpID0+IHByb3ZpZGVyRGVmKGN0eCwgcHJvdmlkZXIpKSlcbiAgICAgICAgICAgIC5tYXAoKHtwcm92aWRlckV4cHIsIGRlcHNFeHByLCBmbGFncywgdG9rZW5FeHByfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLm1vZHVsZVByb3ZpZGVyRGVmKS5jYWxsRm4oW1xuICAgICAgICAgICAgICAgIG8ubGl0ZXJhbChmbGFncyksIHRva2VuRXhwciwgcHJvdmlkZXJFeHByLCBkZXBzRXhwclxuICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgY29uc3QgbmdNb2R1bGVEZWYgPSBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMubW9kdWxlRGVmKS5jYWxsRm4oW28ubGl0ZXJhbEFycihwcm92aWRlckRlZnMpXSk7XG4gICAgY29uc3QgbmdNb2R1bGVEZWZGYWN0b3J5ID1cbiAgICAgICAgby5mbihbbmV3IG8uRm5QYXJhbShMT0dfVkFSLm5hbWUhKV0sIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQobmdNb2R1bGVEZWYpXSwgby5JTkZFUlJFRF9UWVBFKTtcblxuICAgIGNvbnN0IG5nTW9kdWxlRmFjdG9yeVZhciA9IGAke2lkZW50aWZpZXJOYW1lKG5nTW9kdWxlTWV0YS50eXBlKX1OZ0ZhY3RvcnlgO1xuICAgIHRoaXMuX2NyZWF0ZU5nTW9kdWxlRmFjdG9yeShcbiAgICAgICAgY3R4LCBuZ01vZHVsZU1ldGEudHlwZS5yZWZlcmVuY2UsIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5jcmVhdGVNb2R1bGVGYWN0b3J5KS5jYWxsRm4oW1xuICAgICAgICAgIGN0eC5pbXBvcnRFeHByKG5nTW9kdWxlTWV0YS50eXBlLnJlZmVyZW5jZSksXG4gICAgICAgICAgby5saXRlcmFsQXJyKGJvb3RzdHJhcENvbXBvbmVudHMubWFwKGlkID0+IGN0eC5pbXBvcnRFeHByKGlkLnJlZmVyZW5jZSkpKSxcbiAgICAgICAgICBuZ01vZHVsZURlZkZhY3RvcnlcbiAgICAgICAgXSkpO1xuXG4gICAgaWYgKG5nTW9kdWxlTWV0YS5pZCkge1xuICAgICAgY29uc3QgaWQgPSB0eXBlb2YgbmdNb2R1bGVNZXRhLmlkID09PSAnc3RyaW5nJyA/IG8ubGl0ZXJhbChuZ01vZHVsZU1ldGEuaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguaW1wb3J0RXhwcihuZ01vZHVsZU1ldGEuaWQpO1xuICAgICAgY29uc3QgcmVnaXN0ZXJGYWN0b3J5U3RtdCA9IG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5SZWdpc3Rlck1vZHVsZUZhY3RvcnlGbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbihbaWQsIG8udmFyaWFibGUobmdNb2R1bGVGYWN0b3J5VmFyKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0bXQoKTtcbiAgICAgIGN0eC5zdGF0ZW1lbnRzLnB1c2gocmVnaXN0ZXJGYWN0b3J5U3RtdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBOZ01vZHVsZUNvbXBpbGVSZXN1bHQobmdNb2R1bGVGYWN0b3J5VmFyKTtcbiAgfVxuXG4gIGNyZWF0ZVN0dWIoY3R4OiBPdXRwdXRDb250ZXh0LCBuZ01vZHVsZVJlZmVyZW5jZTogYW55KSB7XG4gICAgdGhpcy5fY3JlYXRlTmdNb2R1bGVGYWN0b3J5KGN0eCwgbmdNb2R1bGVSZWZlcmVuY2UsIG8uTlVMTF9FWFBSKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU5nTW9kdWxlRmFjdG9yeShjdHg6IE91dHB1dENvbnRleHQsIHJlZmVyZW5jZTogYW55LCB2YWx1ZTogby5FeHByZXNzaW9uKSB7XG4gICAgY29uc3QgbmdNb2R1bGVGYWN0b3J5VmFyID0gYCR7aWRlbnRpZmllck5hbWUoe3JlZmVyZW5jZTogcmVmZXJlbmNlfSl9TmdGYWN0b3J5YDtcbiAgICBjb25zdCBuZ01vZHVsZUZhY3RvcnlTdG10ID1cbiAgICAgICAgby52YXJpYWJsZShuZ01vZHVsZUZhY3RvcnlWYXIpXG4gICAgICAgICAgICAuc2V0KHZhbHVlKVxuICAgICAgICAgICAgLnRvRGVjbFN0bXQoXG4gICAgICAgICAgICAgICAgby5pbXBvcnRUeXBlKFxuICAgICAgICAgICAgICAgICAgICBJZGVudGlmaWVycy5OZ01vZHVsZUZhY3RvcnksIFtvLmV4cHJlc3Npb25UeXBlKGN0eC5pbXBvcnRFeHByKHJlZmVyZW5jZSkpIV0sXG4gICAgICAgICAgICAgICAgICAgIFtvLlR5cGVNb2RpZmllci5Db25zdF0pLFxuICAgICAgICAgICAgICAgIFtvLlN0bXRNb2RpZmllci5GaW5hbCwgby5TdG10TW9kaWZpZXIuRXhwb3J0ZWRdKTtcblxuICAgIGN0eC5zdGF0ZW1lbnRzLnB1c2gobmdNb2R1bGVGYWN0b3J5U3RtdCk7XG4gIH1cbn1cbiJdfQ==