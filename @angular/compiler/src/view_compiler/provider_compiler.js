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
        define("@angular/compiler/src/view_compiler/provider_compiler", ["require", "exports", "@angular/compiler/src/identifiers", "@angular/compiler/src/lifecycle_reflector", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/output/value_util", "@angular/compiler/src/template_parser/template_ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var identifiers_1 = require("@angular/compiler/src/identifiers");
    var lifecycle_reflector_1 = require("@angular/compiler/src/lifecycle_reflector");
    var o = require("@angular/compiler/src/output/output_ast");
    var value_util_1 = require("@angular/compiler/src/output/value_util");
    var template_ast_1 = require("@angular/compiler/src/template_parser/template_ast");
    function providerDef(ctx, providerAst) {
        var flags = 0 /* None */;
        if (!providerAst.eager) {
            flags |= 4096 /* LazyProvider */;
        }
        if (providerAst.providerType === template_ast_1.ProviderAstType.PrivateService) {
            flags |= 8192 /* PrivateProvider */;
        }
        if (providerAst.isModule) {
            flags |= 1073741824 /* TypeModuleProvider */;
        }
        providerAst.lifecycleHooks.forEach(function (lifecycleHook) {
            // for regular providers, we only support ngOnDestroy
            if (lifecycleHook === lifecycle_reflector_1.LifecycleHooks.OnDestroy ||
                providerAst.providerType === template_ast_1.ProviderAstType.Directive ||
                providerAst.providerType === template_ast_1.ProviderAstType.Component) {
                flags |= lifecycleHookToNodeFlag(lifecycleHook);
            }
        });
        var _a = providerAst.multiProvider ?
            multiProviderDef(ctx, flags, providerAst.providers) :
            singleProviderDef(ctx, flags, providerAst.providerType, providerAst.providers[0]), providerExpr = _a.providerExpr, providerFlags = _a.flags, depsExpr = _a.depsExpr;
        return {
            providerExpr: providerExpr,
            flags: providerFlags,
            depsExpr: depsExpr,
            tokenExpr: tokenExpr(ctx, providerAst.token),
        };
    }
    exports.providerDef = providerDef;
    function multiProviderDef(ctx, flags, providers) {
        var allDepDefs = [];
        var allParams = [];
        var exprs = providers.map(function (provider, providerIndex) {
            var expr;
            if (provider.useClass) {
                var depExprs = convertDeps(providerIndex, provider.deps || provider.useClass.diDeps);
                expr = ctx.importExpr(provider.useClass.reference).instantiate(depExprs);
            }
            else if (provider.useFactory) {
                var depExprs = convertDeps(providerIndex, provider.deps || provider.useFactory.diDeps);
                expr = ctx.importExpr(provider.useFactory.reference).callFn(depExprs);
            }
            else if (provider.useExisting) {
                var depExprs = convertDeps(providerIndex, [{ token: provider.useExisting }]);
                expr = depExprs[0];
            }
            else {
                expr = value_util_1.convertValueToOutputAst(ctx, provider.useValue);
            }
            return expr;
        });
        var providerExpr = o.fn(allParams, [new o.ReturnStatement(o.literalArr(exprs))], o.INFERRED_TYPE);
        return {
            providerExpr: providerExpr,
            flags: flags | 1024 /* TypeFactoryProvider */,
            depsExpr: o.literalArr(allDepDefs)
        };
        function convertDeps(providerIndex, deps) {
            return deps.map(function (dep, depIndex) {
                var paramName = "p" + providerIndex + "_" + depIndex;
                allParams.push(new o.FnParam(paramName, o.DYNAMIC_TYPE));
                allDepDefs.push(depDef(ctx, dep));
                return o.variable(paramName);
            });
        }
    }
    function singleProviderDef(ctx, flags, providerType, providerMeta) {
        var providerExpr;
        var deps;
        if (providerType === template_ast_1.ProviderAstType.Directive || providerType === template_ast_1.ProviderAstType.Component) {
            providerExpr = ctx.importExpr(providerMeta.useClass.reference);
            flags |= 16384 /* TypeDirective */;
            deps = providerMeta.deps || providerMeta.useClass.diDeps;
        }
        else {
            if (providerMeta.useClass) {
                providerExpr = ctx.importExpr(providerMeta.useClass.reference);
                flags |= 512 /* TypeClassProvider */;
                deps = providerMeta.deps || providerMeta.useClass.diDeps;
            }
            else if (providerMeta.useFactory) {
                providerExpr = ctx.importExpr(providerMeta.useFactory.reference);
                flags |= 1024 /* TypeFactoryProvider */;
                deps = providerMeta.deps || providerMeta.useFactory.diDeps;
            }
            else if (providerMeta.useExisting) {
                providerExpr = o.NULL_EXPR;
                flags |= 2048 /* TypeUseExistingProvider */;
                deps = [{ token: providerMeta.useExisting }];
            }
            else {
                providerExpr = value_util_1.convertValueToOutputAst(ctx, providerMeta.useValue);
                flags |= 256 /* TypeValueProvider */;
                deps = [];
            }
        }
        var depsExpr = o.literalArr(deps.map(function (dep) { return depDef(ctx, dep); }));
        return { providerExpr: providerExpr, flags: flags, depsExpr: depsExpr };
    }
    function tokenExpr(ctx, tokenMeta) {
        return tokenMeta.identifier ? ctx.importExpr(tokenMeta.identifier.reference) :
            o.literal(tokenMeta.value);
    }
    function depDef(ctx, dep) {
        // Note: the following fields have already been normalized out by provider_analyzer:
        // - isAttribute, isHost
        var expr = dep.isValue ? value_util_1.convertValueToOutputAst(ctx, dep.value) : tokenExpr(ctx, dep.token);
        var flags = 0 /* None */;
        if (dep.isSkipSelf) {
            flags |= 1 /* SkipSelf */;
        }
        if (dep.isOptional) {
            flags |= 2 /* Optional */;
        }
        if (dep.isSelf) {
            flags |= 4 /* Self */;
        }
        if (dep.isValue) {
            flags |= 8 /* Value */;
        }
        return flags === 0 /* None */ ? expr : o.literalArr([o.literal(flags), expr]);
    }
    exports.depDef = depDef;
    function lifecycleHookToNodeFlag(lifecycleHook) {
        var nodeFlag = 0 /* None */;
        switch (lifecycleHook) {
            case lifecycle_reflector_1.LifecycleHooks.AfterContentChecked:
                nodeFlag = 2097152 /* AfterContentChecked */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.AfterContentInit:
                nodeFlag = 1048576 /* AfterContentInit */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.AfterViewChecked:
                nodeFlag = 8388608 /* AfterViewChecked */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.AfterViewInit:
                nodeFlag = 4194304 /* AfterViewInit */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.DoCheck:
                nodeFlag = 262144 /* DoCheck */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.OnChanges:
                nodeFlag = 524288 /* OnChanges */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.OnDestroy:
                nodeFlag = 131072 /* OnDestroy */;
                break;
            case lifecycle_reflector_1.LifecycleHooks.OnInit:
                nodeFlag = 65536 /* OnInit */;
                break;
        }
        return nodeFlag;
    }
    exports.lifecycleHookToNodeFlag = lifecycleHookToNodeFlag;
    function componentFactoryResolverProviderDef(reflector, ctx, flags, entryComponents) {
        var entryComponentFactories = entryComponents.map(function (entryComponent) { return ctx.importExpr(entryComponent.componentFactory); });
        var token = identifiers_1.createTokenForExternalReference(reflector, identifiers_1.Identifiers.ComponentFactoryResolver);
        var classMeta = {
            diDeps: [
                { isValue: true, value: o.literalArr(entryComponentFactories) },
                { token: token, isSkipSelf: true, isOptional: true },
                { token: identifiers_1.createTokenForExternalReference(reflector, identifiers_1.Identifiers.NgModuleRef) },
            ],
            lifecycleHooks: [],
            reference: reflector.resolveExternalReference(identifiers_1.Identifiers.CodegenComponentFactoryResolver)
        };
        var _a = singleProviderDef(ctx, flags, template_ast_1.ProviderAstType.PrivateService, {
            token: token,
            multi: false,
            useClass: classMeta,
        }), providerExpr = _a.providerExpr, providerFlags = _a.flags, depsExpr = _a.depsExpr;
        return { providerExpr: providerExpr, flags: providerFlags, depsExpr: depsExpr, tokenExpr: tokenExpr(ctx, token) };
    }
    exports.componentFactoryResolverProviderDef = componentFactoryResolverProviderDef;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvdmlld19jb21waWxlci9wcm92aWRlcl9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUtILGlFQUE0RTtJQUM1RSxpRkFBc0Q7SUFDdEQsMkRBQTBDO0lBQzFDLHNFQUE2RDtJQUM3RCxtRkFBNkU7SUFHN0UsU0FBZ0IsV0FBVyxDQUFDLEdBQWtCLEVBQUUsV0FBd0I7UUFNdEUsSUFBSSxLQUFLLGVBQWlCLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdEIsS0FBSywyQkFBMEIsQ0FBQztTQUNqQztRQUNELElBQUksV0FBVyxDQUFDLFlBQVksS0FBSyw4QkFBZSxDQUFDLGNBQWMsRUFBRTtZQUMvRCxLQUFLLDhCQUE2QixDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3hCLEtBQUssdUNBQWdDLENBQUM7U0FDdkM7UUFDRCxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWE7WUFDL0MscURBQXFEO1lBQ3JELElBQUksYUFBYSxLQUFLLG9DQUFjLENBQUMsU0FBUztnQkFDMUMsV0FBVyxDQUFDLFlBQVksS0FBSyw4QkFBZSxDQUFDLFNBQVM7Z0JBQ3RELFdBQVcsQ0FBQyxZQUFZLEtBQUssOEJBQWUsQ0FBQyxTQUFTLEVBQUU7Z0JBQzFELEtBQUssSUFBSSx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNqRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0csSUFBQTs7NkZBRStFLEVBRjlFLDhCQUFZLEVBQUUsd0JBQW9CLEVBQUUsc0JBRTBDLENBQUM7UUFDdEYsT0FBTztZQUNMLFlBQVksY0FBQTtZQUNaLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFFBQVEsVUFBQTtZQUNSLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDN0MsQ0FBQztJQUNKLENBQUM7SUFqQ0Qsa0NBaUNDO0lBRUQsU0FBUyxnQkFBZ0IsQ0FDckIsR0FBa0IsRUFBRSxLQUFnQixFQUFFLFNBQW9DO1FBRTVFLElBQU0sVUFBVSxHQUFtQixFQUFFLENBQUM7UUFDdEMsSUFBTSxTQUFTLEdBQWdCLEVBQUUsQ0FBQztRQUNsQyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxFQUFFLGFBQWE7WUFDbEQsSUFBSSxJQUFrQixDQUFDO1lBQ3ZCLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZGLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFFO2lCQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDOUIsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pGLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDL0IsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLG9DQUF1QixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEQ7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxZQUFZLEdBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25GLE9BQU87WUFDTCxZQUFZLGNBQUE7WUFDWixLQUFLLEVBQUUsS0FBSyxpQ0FBZ0M7WUFDNUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQ25DLENBQUM7UUFFRixTQUFTLFdBQVcsQ0FBQyxhQUFxQixFQUFFLElBQW1DO1lBQzdFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxRQUFRO2dCQUM1QixJQUFNLFNBQVMsR0FBRyxNQUFJLGFBQWEsU0FBSSxRQUFVLENBQUM7Z0JBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDekQsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsU0FBUyxpQkFBaUIsQ0FDdEIsR0FBa0IsRUFBRSxLQUFnQixFQUFFLFlBQTZCLEVBQ25FLFlBQXFDO1FBRXZDLElBQUksWUFBMEIsQ0FBQztRQUMvQixJQUFJLElBQW1DLENBQUM7UUFDeEMsSUFBSSxZQUFZLEtBQUssOEJBQWUsQ0FBQyxTQUFTLElBQUksWUFBWSxLQUFLLDhCQUFlLENBQUMsU0FBUyxFQUFFO1lBQzVGLFlBQVksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEUsS0FBSyw2QkFBMkIsQ0FBQztZQUNqQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsUUFBUyxDQUFDLE1BQU0sQ0FBQztTQUMzRDthQUFNO1lBQ0wsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO2dCQUN6QixZQUFZLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvRCxLQUFLLCtCQUErQixDQUFDO2dCQUNyQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUMxRDtpQkFBTSxJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xDLFlBQVksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pFLEtBQUssa0NBQWlDLENBQUM7Z0JBQ3ZDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2FBQzVEO2lCQUFNLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRTtnQkFDbkMsWUFBWSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzNCLEtBQUssc0NBQXFDLENBQUM7Z0JBQzNDLElBQUksR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLFlBQVksR0FBRyxvQ0FBdUIsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRSxLQUFLLCtCQUErQixDQUFDO2dCQUNyQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQ1g7U0FDRjtRQUNELElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sRUFBQyxZQUFZLGNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxRQUFRLFVBQUEsRUFBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUFrQixFQUFFLFNBQStCO1FBQ3BFLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQWdCLE1BQU0sQ0FBQyxHQUFrQixFQUFFLEdBQWdDO1FBQ3pFLG9GQUFvRjtRQUNwRix3QkFBd0I7UUFDeEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0NBQXVCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBTSxDQUFDLENBQUM7UUFDaEcsSUFBSSxLQUFLLGVBQWdCLENBQUM7UUFDMUIsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ2xCLEtBQUssb0JBQXFCLENBQUM7U0FDNUI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDbEIsS0FBSyxvQkFBcUIsQ0FBQztTQUM1QjtRQUNELElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNkLEtBQUssZ0JBQWlCLENBQUM7U0FDeEI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLGlCQUFrQixDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxLQUFLLGlCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQWxCRCx3QkFrQkM7SUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxhQUE2QjtRQUNuRSxJQUFJLFFBQVEsZUFBaUIsQ0FBQztRQUM5QixRQUFRLGFBQWEsRUFBRTtZQUNyQixLQUFLLG9DQUFjLENBQUMsbUJBQW1CO2dCQUNyQyxRQUFRLG9DQUFnQyxDQUFDO2dCQUN6QyxNQUFNO1lBQ1IsS0FBSyxvQ0FBYyxDQUFDLGdCQUFnQjtnQkFDbEMsUUFBUSxpQ0FBNkIsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssb0NBQWMsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLFFBQVEsaUNBQTZCLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLG9DQUFjLENBQUMsYUFBYTtnQkFDL0IsUUFBUSw4QkFBMEIsQ0FBQztnQkFDbkMsTUFBTTtZQUNSLEtBQUssb0NBQWMsQ0FBQyxPQUFPO2dCQUN6QixRQUFRLHVCQUFvQixDQUFDO2dCQUM3QixNQUFNO1lBQ1IsS0FBSyxvQ0FBYyxDQUFDLFNBQVM7Z0JBQzNCLFFBQVEseUJBQXNCLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLG9DQUFjLENBQUMsU0FBUztnQkFDM0IsUUFBUSx5QkFBc0IsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLEtBQUssb0NBQWMsQ0FBQyxNQUFNO2dCQUN4QixRQUFRLHFCQUFtQixDQUFDO2dCQUM1QixNQUFNO1NBQ1Q7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBN0JELDBEQTZCQztJQUVELFNBQWdCLG1DQUFtQyxDQUMvQyxTQUEyQixFQUFFLEdBQWtCLEVBQUUsS0FBZ0IsRUFDakUsZUFBZ0Q7UUFNbEQsSUFBTSx1QkFBdUIsR0FDekIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQS9DLENBQStDLENBQUMsQ0FBQztRQUM3RixJQUFNLEtBQUssR0FBRyw2Q0FBK0IsQ0FBQyxTQUFTLEVBQUUseUJBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9GLElBQU0sU0FBUyxHQUFHO1lBQ2hCLE1BQU0sRUFBRTtnQkFDTixFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFBQztnQkFDN0QsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQztnQkFDbEQsRUFBQyxLQUFLLEVBQUUsNkNBQStCLENBQUMsU0FBUyxFQUFFLHlCQUFXLENBQUMsV0FBVyxDQUFDLEVBQUM7YUFDN0U7WUFDRCxjQUFjLEVBQUUsRUFBRTtZQUNsQixTQUFTLEVBQUUsU0FBUyxDQUFDLHdCQUF3QixDQUFDLHlCQUFXLENBQUMsK0JBQStCLENBQUM7U0FDM0YsQ0FBQztRQUNJLElBQUE7Ozs7VUFLQSxFQUxDLDhCQUFZLEVBQUUsd0JBQW9CLEVBQUUsc0JBS3JDLENBQUM7UUFDUCxPQUFPLEVBQUMsWUFBWSxjQUFBLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLFVBQUEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQzFGLENBQUM7SUEzQkQsa0ZBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSwgQ29tcGlsZUVudHJ5Q29tcG9uZW50TWV0YWRhdGEsIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLCBDb21waWxlVG9rZW5NZXRhZGF0YX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7RGVwRmxhZ3MsIE5vZGVGbGFnc30gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge2NyZWF0ZVRva2VuRm9yRXh0ZXJuYWxSZWZlcmVuY2UsIElkZW50aWZpZXJzfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzfSBmcm9tICcuLi9saWZlY3ljbGVfcmVmbGVjdG9yJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtjb252ZXJ0VmFsdWVUb091dHB1dEFzdH0gZnJvbSAnLi4vb3V0cHV0L3ZhbHVlX3V0aWwnO1xuaW1wb3J0IHtQcm92aWRlckFzdCwgUHJvdmlkZXJBc3RUeXBlfSBmcm9tICcuLi90ZW1wbGF0ZV9wYXJzZXIvdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7T3V0cHV0Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlckRlZihjdHg6IE91dHB1dENvbnRleHQsIHByb3ZpZGVyQXN0OiBQcm92aWRlckFzdCk6IHtcbiAgcHJvdmlkZXJFeHByOiBvLkV4cHJlc3Npb24sXG4gIGZsYWdzOiBOb2RlRmxhZ3MsXG4gIGRlcHNFeHByOiBvLkV4cHJlc3Npb24sXG4gIHRva2VuRXhwcjogby5FeHByZXNzaW9uXG59IHtcbiAgbGV0IGZsYWdzID0gTm9kZUZsYWdzLk5vbmU7XG4gIGlmICghcHJvdmlkZXJBc3QuZWFnZXIpIHtcbiAgICBmbGFncyB8PSBOb2RlRmxhZ3MuTGF6eVByb3ZpZGVyO1xuICB9XG4gIGlmIChwcm92aWRlckFzdC5wcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Qcml2YXRlU2VydmljZSkge1xuICAgIGZsYWdzIHw9IE5vZGVGbGFncy5Qcml2YXRlUHJvdmlkZXI7XG4gIH1cbiAgaWYgKHByb3ZpZGVyQXN0LmlzTW9kdWxlKSB7XG4gICAgZmxhZ3MgfD0gTm9kZUZsYWdzLlR5cGVNb2R1bGVQcm92aWRlcjtcbiAgfVxuICBwcm92aWRlckFzdC5saWZlY3ljbGVIb29rcy5mb3JFYWNoKChsaWZlY3ljbGVIb29rKSA9PiB7XG4gICAgLy8gZm9yIHJlZ3VsYXIgcHJvdmlkZXJzLCB3ZSBvbmx5IHN1cHBvcnQgbmdPbkRlc3Ryb3lcbiAgICBpZiAobGlmZWN5Y2xlSG9vayA9PT0gTGlmZWN5Y2xlSG9va3MuT25EZXN0cm95IHx8XG4gICAgICAgIHByb3ZpZGVyQXN0LnByb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLkRpcmVjdGl2ZSB8fFxuICAgICAgICBwcm92aWRlckFzdC5wcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQpIHtcbiAgICAgIGZsYWdzIHw9IGxpZmVjeWNsZUhvb2tUb05vZGVGbGFnKGxpZmVjeWNsZUhvb2spO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHtwcm92aWRlckV4cHIsIGZsYWdzOiBwcm92aWRlckZsYWdzLCBkZXBzRXhwcn0gPSBwcm92aWRlckFzdC5tdWx0aVByb3ZpZGVyID9cbiAgICAgIG11bHRpUHJvdmlkZXJEZWYoY3R4LCBmbGFncywgcHJvdmlkZXJBc3QucHJvdmlkZXJzKSA6XG4gICAgICBzaW5nbGVQcm92aWRlckRlZihjdHgsIGZsYWdzLCBwcm92aWRlckFzdC5wcm92aWRlclR5cGUsIHByb3ZpZGVyQXN0LnByb3ZpZGVyc1swXSk7XG4gIHJldHVybiB7XG4gICAgcHJvdmlkZXJFeHByLFxuICAgIGZsYWdzOiBwcm92aWRlckZsYWdzLFxuICAgIGRlcHNFeHByLFxuICAgIHRva2VuRXhwcjogdG9rZW5FeHByKGN0eCwgcHJvdmlkZXJBc3QudG9rZW4pLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtdWx0aVByb3ZpZGVyRGVmKFxuICAgIGN0eDogT3V0cHV0Q29udGV4dCwgZmxhZ3M6IE5vZGVGbGFncywgcHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdKTpcbiAgICB7cHJvdmlkZXJFeHByOiBvLkV4cHJlc3Npb24sIGZsYWdzOiBOb2RlRmxhZ3MsIGRlcHNFeHByOiBvLkV4cHJlc3Npb259IHtcbiAgY29uc3QgYWxsRGVwRGVmczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgY29uc3QgYWxsUGFyYW1zOiBvLkZuUGFyYW1bXSA9IFtdO1xuICBjb25zdCBleHBycyA9IHByb3ZpZGVycy5tYXAoKHByb3ZpZGVyLCBwcm92aWRlckluZGV4KSA9PiB7XG4gICAgbGV0IGV4cHI6IG8uRXhwcmVzc2lvbjtcbiAgICBpZiAocHJvdmlkZXIudXNlQ2xhc3MpIHtcbiAgICAgIGNvbnN0IGRlcEV4cHJzID0gY29udmVydERlcHMocHJvdmlkZXJJbmRleCwgcHJvdmlkZXIuZGVwcyB8fCBwcm92aWRlci51c2VDbGFzcy5kaURlcHMpO1xuICAgICAgZXhwciA9IGN0eC5pbXBvcnRFeHByKHByb3ZpZGVyLnVzZUNsYXNzLnJlZmVyZW5jZSkuaW5zdGFudGlhdGUoZGVwRXhwcnMpO1xuICAgIH0gZWxzZSBpZiAocHJvdmlkZXIudXNlRmFjdG9yeSkge1xuICAgICAgY29uc3QgZGVwRXhwcnMgPSBjb252ZXJ0RGVwcyhwcm92aWRlckluZGV4LCBwcm92aWRlci5kZXBzIHx8IHByb3ZpZGVyLnVzZUZhY3RvcnkuZGlEZXBzKTtcbiAgICAgIGV4cHIgPSBjdHguaW1wb3J0RXhwcihwcm92aWRlci51c2VGYWN0b3J5LnJlZmVyZW5jZSkuY2FsbEZuKGRlcEV4cHJzKTtcbiAgICB9IGVsc2UgaWYgKHByb3ZpZGVyLnVzZUV4aXN0aW5nKSB7XG4gICAgICBjb25zdCBkZXBFeHBycyA9IGNvbnZlcnREZXBzKHByb3ZpZGVySW5kZXgsIFt7dG9rZW46IHByb3ZpZGVyLnVzZUV4aXN0aW5nfV0pO1xuICAgICAgZXhwciA9IGRlcEV4cHJzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHByID0gY29udmVydFZhbHVlVG9PdXRwdXRBc3QoY3R4LCBwcm92aWRlci51c2VWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBleHByO1xuICB9KTtcbiAgY29uc3QgcHJvdmlkZXJFeHByID1cbiAgICAgIG8uZm4oYWxsUGFyYW1zLCBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KG8ubGl0ZXJhbEFycihleHBycykpXSwgby5JTkZFUlJFRF9UWVBFKTtcbiAgcmV0dXJuIHtcbiAgICBwcm92aWRlckV4cHIsXG4gICAgZmxhZ3M6IGZsYWdzIHwgTm9kZUZsYWdzLlR5cGVGYWN0b3J5UHJvdmlkZXIsXG4gICAgZGVwc0V4cHI6IG8ubGl0ZXJhbEFycihhbGxEZXBEZWZzKVxuICB9O1xuXG4gIGZ1bmN0aW9uIGNvbnZlcnREZXBzKHByb3ZpZGVySW5kZXg6IG51bWJlciwgZGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW10pIHtcbiAgICByZXR1cm4gZGVwcy5tYXAoKGRlcCwgZGVwSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtTmFtZSA9IGBwJHtwcm92aWRlckluZGV4fV8ke2RlcEluZGV4fWA7XG4gICAgICBhbGxQYXJhbXMucHVzaChuZXcgby5GblBhcmFtKHBhcmFtTmFtZSwgby5EWU5BTUlDX1RZUEUpKTtcbiAgICAgIGFsbERlcERlZnMucHVzaChkZXBEZWYoY3R4LCBkZXApKTtcbiAgICAgIHJldHVybiBvLnZhcmlhYmxlKHBhcmFtTmFtZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2luZ2xlUHJvdmlkZXJEZWYoXG4gICAgY3R4OiBPdXRwdXRDb250ZXh0LCBmbGFnczogTm9kZUZsYWdzLCBwcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSxcbiAgICBwcm92aWRlck1ldGE6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhKTpcbiAgICB7cHJvdmlkZXJFeHByOiBvLkV4cHJlc3Npb24sIGZsYWdzOiBOb2RlRmxhZ3MsIGRlcHNFeHByOiBvLkV4cHJlc3Npb259IHtcbiAgbGV0IHByb3ZpZGVyRXhwcjogby5FeHByZXNzaW9uO1xuICBsZXQgZGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW107XG4gIGlmIChwcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5EaXJlY3RpdmUgfHwgcHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuQ29tcG9uZW50KSB7XG4gICAgcHJvdmlkZXJFeHByID0gY3R4LmltcG9ydEV4cHIocHJvdmlkZXJNZXRhLnVzZUNsYXNzIS5yZWZlcmVuY2UpO1xuICAgIGZsYWdzIHw9IE5vZGVGbGFncy5UeXBlRGlyZWN0aXZlO1xuICAgIGRlcHMgPSBwcm92aWRlck1ldGEuZGVwcyB8fCBwcm92aWRlck1ldGEudXNlQ2xhc3MhLmRpRGVwcztcbiAgfSBlbHNlIHtcbiAgICBpZiAocHJvdmlkZXJNZXRhLnVzZUNsYXNzKSB7XG4gICAgICBwcm92aWRlckV4cHIgPSBjdHguaW1wb3J0RXhwcihwcm92aWRlck1ldGEudXNlQ2xhc3MucmVmZXJlbmNlKTtcbiAgICAgIGZsYWdzIHw9IE5vZGVGbGFncy5UeXBlQ2xhc3NQcm92aWRlcjtcbiAgICAgIGRlcHMgPSBwcm92aWRlck1ldGEuZGVwcyB8fCBwcm92aWRlck1ldGEudXNlQ2xhc3MuZGlEZXBzO1xuICAgIH0gZWxzZSBpZiAocHJvdmlkZXJNZXRhLnVzZUZhY3RvcnkpIHtcbiAgICAgIHByb3ZpZGVyRXhwciA9IGN0eC5pbXBvcnRFeHByKHByb3ZpZGVyTWV0YS51c2VGYWN0b3J5LnJlZmVyZW5jZSk7XG4gICAgICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZUZhY3RvcnlQcm92aWRlcjtcbiAgICAgIGRlcHMgPSBwcm92aWRlck1ldGEuZGVwcyB8fCBwcm92aWRlck1ldGEudXNlRmFjdG9yeS5kaURlcHM7XG4gICAgfSBlbHNlIGlmIChwcm92aWRlck1ldGEudXNlRXhpc3RpbmcpIHtcbiAgICAgIHByb3ZpZGVyRXhwciA9IG8uTlVMTF9FWFBSO1xuICAgICAgZmxhZ3MgfD0gTm9kZUZsYWdzLlR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyO1xuICAgICAgZGVwcyA9IFt7dG9rZW46IHByb3ZpZGVyTWV0YS51c2VFeGlzdGluZ31dO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm92aWRlckV4cHIgPSBjb252ZXJ0VmFsdWVUb091dHB1dEFzdChjdHgsIHByb3ZpZGVyTWV0YS51c2VWYWx1ZSk7XG4gICAgICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZVZhbHVlUHJvdmlkZXI7XG4gICAgICBkZXBzID0gW107XG4gICAgfVxuICB9XG4gIGNvbnN0IGRlcHNFeHByID0gby5saXRlcmFsQXJyKGRlcHMubWFwKGRlcCA9PiBkZXBEZWYoY3R4LCBkZXApKSk7XG4gIHJldHVybiB7cHJvdmlkZXJFeHByLCBmbGFncywgZGVwc0V4cHJ9O1xufVxuXG5mdW5jdGlvbiB0b2tlbkV4cHIoY3R4OiBPdXRwdXRDb250ZXh0LCB0b2tlbk1ldGE6IENvbXBpbGVUb2tlbk1ldGFkYXRhKTogby5FeHByZXNzaW9uIHtcbiAgcmV0dXJuIHRva2VuTWV0YS5pZGVudGlmaWVyID8gY3R4LmltcG9ydEV4cHIodG9rZW5NZXRhLmlkZW50aWZpZXIucmVmZXJlbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbCh0b2tlbk1ldGEudmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVwRGVmKGN0eDogT3V0cHV0Q29udGV4dCwgZGVwOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEpOiBvLkV4cHJlc3Npb24ge1xuICAvLyBOb3RlOiB0aGUgZm9sbG93aW5nIGZpZWxkcyBoYXZlIGFscmVhZHkgYmVlbiBub3JtYWxpemVkIG91dCBieSBwcm92aWRlcl9hbmFseXplcjpcbiAgLy8gLSBpc0F0dHJpYnV0ZSwgaXNIb3N0XG4gIGNvbnN0IGV4cHIgPSBkZXAuaXNWYWx1ZSA/IGNvbnZlcnRWYWx1ZVRvT3V0cHV0QXN0KGN0eCwgZGVwLnZhbHVlKSA6IHRva2VuRXhwcihjdHgsIGRlcC50b2tlbiEpO1xuICBsZXQgZmxhZ3MgPSBEZXBGbGFncy5Ob25lO1xuICBpZiAoZGVwLmlzU2tpcFNlbGYpIHtcbiAgICBmbGFncyB8PSBEZXBGbGFncy5Ta2lwU2VsZjtcbiAgfVxuICBpZiAoZGVwLmlzT3B0aW9uYWwpIHtcbiAgICBmbGFncyB8PSBEZXBGbGFncy5PcHRpb25hbDtcbiAgfVxuICBpZiAoZGVwLmlzU2VsZikge1xuICAgIGZsYWdzIHw9IERlcEZsYWdzLlNlbGY7XG4gIH1cbiAgaWYgKGRlcC5pc1ZhbHVlKSB7XG4gICAgZmxhZ3MgfD0gRGVwRmxhZ3MuVmFsdWU7XG4gIH1cbiAgcmV0dXJuIGZsYWdzID09PSBEZXBGbGFncy5Ob25lID8gZXhwciA6IG8ubGl0ZXJhbEFycihbby5saXRlcmFsKGZsYWdzKSwgZXhwcl0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlmZWN5Y2xlSG9va1RvTm9kZUZsYWcobGlmZWN5Y2xlSG9vazogTGlmZWN5Y2xlSG9va3MpOiBOb2RlRmxhZ3Mge1xuICBsZXQgbm9kZUZsYWcgPSBOb2RlRmxhZ3MuTm9uZTtcbiAgc3dpdGNoIChsaWZlY3ljbGVIb29rKSB7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlckNvbnRlbnRDaGVja2VkOlxuICAgICAgbm9kZUZsYWcgPSBOb2RlRmxhZ3MuQWZ0ZXJDb250ZW50Q2hlY2tlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50SW5pdDpcbiAgICAgIG5vZGVGbGFnID0gTm9kZUZsYWdzLkFmdGVyQ29udGVudEluaXQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0NoZWNrZWQ6XG4gICAgICBub2RlRmxhZyA9IE5vZGVGbGFncy5BZnRlclZpZXdDaGVja2VkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlclZpZXdJbml0OlxuICAgICAgbm9kZUZsYWcgPSBOb2RlRmxhZ3MuQWZ0ZXJWaWV3SW5pdDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuRG9DaGVjazpcbiAgICAgIG5vZGVGbGFnID0gTm9kZUZsYWdzLkRvQ2hlY2s7XG4gICAgICBicmVhaztcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLk9uQ2hhbmdlczpcbiAgICAgIG5vZGVGbGFnID0gTm9kZUZsYWdzLk9uQ2hhbmdlcztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuT25EZXN0cm95OlxuICAgICAgbm9kZUZsYWcgPSBOb2RlRmxhZ3MuT25EZXN0cm95O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5PbkluaXQ6XG4gICAgICBub2RlRmxhZyA9IE5vZGVGbGFncy5PbkluaXQ7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gbm9kZUZsYWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJQcm92aWRlckRlZihcbiAgICByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsIGN0eDogT3V0cHV0Q29udGV4dCwgZmxhZ3M6IE5vZGVGbGFncyxcbiAgICBlbnRyeUNvbXBvbmVudHM6IENvbXBpbGVFbnRyeUNvbXBvbmVudE1ldGFkYXRhW10pOiB7XG4gIHByb3ZpZGVyRXhwcjogby5FeHByZXNzaW9uLFxuICBmbGFnczogTm9kZUZsYWdzLFxuICBkZXBzRXhwcjogby5FeHByZXNzaW9uLFxuICB0b2tlbkV4cHI6IG8uRXhwcmVzc2lvblxufSB7XG4gIGNvbnN0IGVudHJ5Q29tcG9uZW50RmFjdG9yaWVzID1cbiAgICAgIGVudHJ5Q29tcG9uZW50cy5tYXAoKGVudHJ5Q29tcG9uZW50KSA9PiBjdHguaW1wb3J0RXhwcihlbnRyeUNvbXBvbmVudC5jb21wb25lbnRGYWN0b3J5KSk7XG4gIGNvbnN0IHRva2VuID0gY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZShyZWZsZWN0b3IsIElkZW50aWZpZXJzLkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG4gIGNvbnN0IGNsYXNzTWV0YSA9IHtcbiAgICBkaURlcHM6IFtcbiAgICAgIHtpc1ZhbHVlOiB0cnVlLCB2YWx1ZTogby5saXRlcmFsQXJyKGVudHJ5Q29tcG9uZW50RmFjdG9yaWVzKX0sXG4gICAgICB7dG9rZW46IHRva2VuLCBpc1NraXBTZWxmOiB0cnVlLCBpc09wdGlvbmFsOiB0cnVlfSxcbiAgICAgIHt0b2tlbjogY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZShyZWZsZWN0b3IsIElkZW50aWZpZXJzLk5nTW9kdWxlUmVmKX0sXG4gICAgXSxcbiAgICBsaWZlY3ljbGVIb29rczogW10sXG4gICAgcmVmZXJlbmNlOiByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkNvZGVnZW5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gIH07XG4gIGNvbnN0IHtwcm92aWRlckV4cHIsIGZsYWdzOiBwcm92aWRlckZsYWdzLCBkZXBzRXhwcn0gPVxuICAgICAgc2luZ2xlUHJvdmlkZXJEZWYoY3R4LCBmbGFncywgUHJvdmlkZXJBc3RUeXBlLlByaXZhdGVTZXJ2aWNlLCB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBtdWx0aTogZmFsc2UsXG4gICAgICAgIHVzZUNsYXNzOiBjbGFzc01ldGEsXG4gICAgICB9KTtcbiAgcmV0dXJuIHtwcm92aWRlckV4cHIsIGZsYWdzOiBwcm92aWRlckZsYWdzLCBkZXBzRXhwciwgdG9rZW5FeHByOiB0b2tlbkV4cHIoY3R4LCB0b2tlbil9O1xufVxuIl19