/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getUrlScheme, Identifiers, syntaxError } from '@angular/compiler';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ChangeDetectionStrategy, ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, LOCALE_ID, NgModuleFactory, NgModuleRef, QueryList, Renderer2, SecurityContext, TemplateRef, TRANSLATIONS_FORMAT, ViewContainerRef, ViewEncapsulation, ɵand, ɵccf, ɵcmf, ɵCodegenComponentFactoryResolver, ɵcrt, ɵdid, ɵeld, ɵEMPTY_ARRAY, ɵEMPTY_MAP, ɵinlineInterpolate, ɵinterpolate, ɵmod, ɵmpd, ɵncd, ɵnov, ɵpad, ɵpid, ɵpod, ɵppd, ɵprd, ɵqud, ɵReflectionCapabilities as ReflectionCapabilities, ɵregisterModuleFactory, ɵstringify as stringify, ɵted, ɵunv, ɵvid } from '@angular/core';
export var MODULE_SUFFIX = '';
var builtinExternalReferences = createBuiltinExternalReferencesMap();
var JitReflector = /** @class */ (function () {
    function JitReflector() {
        this.reflectionCapabilities = new ReflectionCapabilities();
    }
    JitReflector.prototype.componentModuleUrl = function (type, cmpMetadata) {
        var moduleId = cmpMetadata.moduleId;
        if (typeof moduleId === 'string') {
            var scheme = getUrlScheme(moduleId);
            return scheme ? moduleId : "package:" + moduleId + MODULE_SUFFIX;
        }
        else if (moduleId !== null && moduleId !== void 0) {
            throw syntaxError("moduleId should be a string in \"" + stringify(type) + "\". See https://goo.gl/wIDDiL for more information.\n" +
                "If you're using Webpack you should inline the template and the styles, see https://goo.gl/X2J8zc.");
        }
        return "./" + stringify(type);
    };
    JitReflector.prototype.parameters = function (typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    };
    JitReflector.prototype.tryAnnotations = function (typeOrFunc) {
        return this.annotations(typeOrFunc);
    };
    JitReflector.prototype.annotations = function (typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    };
    JitReflector.prototype.shallowAnnotations = function (typeOrFunc) {
        throw new Error('Not supported in JIT mode');
    };
    JitReflector.prototype.propMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    };
    JitReflector.prototype.hasLifecycleHook = function (type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    };
    JitReflector.prototype.guards = function (type) {
        return this.reflectionCapabilities.guards(type);
    };
    JitReflector.prototype.resolveExternalReference = function (ref) {
        return builtinExternalReferences.get(ref) || ref.runtime;
    };
    return JitReflector;
}());
export { JitReflector };
function createBuiltinExternalReferencesMap() {
    var map = new Map();
    map.set(Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS, ANALYZE_FOR_ENTRY_COMPONENTS);
    map.set(Identifiers.ElementRef, ElementRef);
    map.set(Identifiers.NgModuleRef, NgModuleRef);
    map.set(Identifiers.ViewContainerRef, ViewContainerRef);
    map.set(Identifiers.ChangeDetectorRef, ChangeDetectorRef);
    map.set(Identifiers.Renderer2, Renderer2);
    map.set(Identifiers.QueryList, QueryList);
    map.set(Identifiers.TemplateRef, TemplateRef);
    map.set(Identifiers.CodegenComponentFactoryResolver, ɵCodegenComponentFactoryResolver);
    map.set(Identifiers.ComponentFactoryResolver, ComponentFactoryResolver);
    map.set(Identifiers.ComponentFactory, ComponentFactory);
    map.set(Identifiers.ComponentRef, ComponentRef);
    map.set(Identifiers.NgModuleFactory, NgModuleFactory);
    map.set(Identifiers.createModuleFactory, ɵcmf);
    map.set(Identifiers.moduleDef, ɵmod);
    map.set(Identifiers.moduleProviderDef, ɵmpd);
    map.set(Identifiers.RegisterModuleFactoryFn, ɵregisterModuleFactory);
    map.set(Identifiers.Injector, Injector);
    map.set(Identifiers.ViewEncapsulation, ViewEncapsulation);
    map.set(Identifiers.ChangeDetectionStrategy, ChangeDetectionStrategy);
    map.set(Identifiers.SecurityContext, SecurityContext);
    map.set(Identifiers.LOCALE_ID, LOCALE_ID);
    map.set(Identifiers.TRANSLATIONS_FORMAT, TRANSLATIONS_FORMAT);
    map.set(Identifiers.inlineInterpolate, ɵinlineInterpolate);
    map.set(Identifiers.interpolate, ɵinterpolate);
    map.set(Identifiers.EMPTY_ARRAY, ɵEMPTY_ARRAY);
    map.set(Identifiers.EMPTY_MAP, ɵEMPTY_MAP);
    map.set(Identifiers.viewDef, ɵvid);
    map.set(Identifiers.elementDef, ɵeld);
    map.set(Identifiers.anchorDef, ɵand);
    map.set(Identifiers.textDef, ɵted);
    map.set(Identifiers.directiveDef, ɵdid);
    map.set(Identifiers.providerDef, ɵprd);
    map.set(Identifiers.queryDef, ɵqud);
    map.set(Identifiers.pureArrayDef, ɵpad);
    map.set(Identifiers.pureObjectDef, ɵpod);
    map.set(Identifiers.purePipeDef, ɵppd);
    map.set(Identifiers.pipeDef, ɵpid);
    map.set(Identifiers.nodeValue, ɵnov);
    map.set(Identifiers.ngContentDef, ɵncd);
    map.set(Identifiers.unwrapValue, ɵunv);
    map.set(Identifiers.createRendererType2, ɵcrt);
    map.set(Identifiers.createComponentFactory, ɵccf);
    return map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfcmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9jb21waWxlcl9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlHLE9BQU8sRUFBQyw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBYSxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFFLHNCQUFzQixFQUFFLFVBQVUsSUFBSSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFN29CLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDaEMsSUFBTSx5QkFBeUIsR0FBRyxrQ0FBa0MsRUFBRSxDQUFDO0FBRXZFO0lBQUE7UUFDVSwyQkFBc0IsR0FBRyxJ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QyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3IsIEV4dGVybmFsUmVmZXJlbmNlLCBnZXRVcmxTY2hlbWUsIElkZW50aWZpZXJzLCBzeW50YXhFcnJvcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBMT0NBTEVfSUQsIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVSZWYsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBTZWN1cml0eUNvbnRleHQsIFRlbXBsYXRlUmVmLCBUUkFOU0xBVElPTlNfRk9STUFULCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgybVhbmQsIMm1Y2NmLCDJtWNtZiwgybVDb2RlZ2VuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCDJtWNydCwgybVkaWQsIMm1ZWxkLCDJtUVNUFRZX0FSUkFZLCDJtUVNUFRZX01BUCwgybVpbmxpbmVJbnRlcnBvbGF0ZSwgybVpbnRlcnBvbGF0ZSwgybVtb2QsIMm1bXBkLCDJtW5jZCwgybVub3YsIMm1cGFkLCDJtXBpZCwgybVwb2QsIMm1cHBkLCDJtXByZCwgybVxdWQsIMm1UmVmbGVjdGlvbkNhcGFiaWxpdGllcyBhcyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLCDJtXJlZ2lzdGVyTW9kdWxlRmFjdG9yeSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5LCDJtXRlZCwgybV1bnYsIMm1dmlkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE1PRFVMRV9TVUZGSVggPSAnJztcbmNvbnN0IGJ1aWx0aW5FeHRlcm5hbFJlZmVyZW5jZXMgPSBjcmVhdGVCdWlsdGluRXh0ZXJuYWxSZWZlcmVuY2VzTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBKaXRSZWZsZWN0b3IgaW1wbGVtZW50cyBDb21waWxlUmVmbGVjdG9yIHtcbiAgcHJpdmF0ZSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcblxuICBjb21wb25lbnRNb2R1bGVVcmwodHlwZTogYW55LCBjbXBNZXRhZGF0YTogQ29tcG9uZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBtb2R1bGVJZCA9IGNtcE1ldGFkYXRhLm1vZHVsZUlkO1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHNjaGVtZSA9IGdldFVybFNjaGVtZShtb2R1bGVJZCk7XG4gICAgICByZXR1cm4gc2NoZW1lID8gbW9kdWxlSWQgOiBgcGFja2FnZToke21vZHVsZUlkfSR7TU9EVUxFX1NVRkZJWH1gO1xuICAgIH0gZWxzZSBpZiAobW9kdWxlSWQgIT09IG51bGwgJiYgbW9kdWxlSWQgIT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgc3ludGF4RXJyb3IoXG4gICAgICAgICAgYG1vZHVsZUlkIHNob3VsZCBiZSBhIHN0cmluZyBpbiBcIiR7XG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh0eXBlKX1cIi4gU2VlIGh0dHBzOi8vZ29vLmdsL3dJRERpTCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cXG5gICtcbiAgICAgICAgICBgSWYgeW91J3JlIHVzaW5nIFdlYnBhY2sgeW91IHNob3VsZCBpbmxpbmUgdGhlIHRlbXBsYXRlIGFuZCB0aGUgc3R5bGVzLCBzZWUgaHR0cHM6Ly9nb28uZ2wvWDJKOHpjLmApO1xuICAgIH1cblxuICAgIHJldHVybiBgLi8ke3N0cmluZ2lmeSh0eXBlKX1gO1xuICB9XG4gIHBhcmFtZXRlcnModHlwZU9yRnVuYzogLypUeXBlKi8gYW55KTogYW55W11bXSB7XG4gICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGVPckZ1bmMpO1xuICB9XG4gIHRyeUFubm90YXRpb25zKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5hbm5vdGF0aW9ucyh0eXBlT3JGdW5jKTtcbiAgfVxuICBhbm5vdGF0aW9ucyh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5hbm5vdGF0aW9ucyh0eXBlT3JGdW5jKTtcbiAgfVxuICBzaGFsbG93QW5ub3RhdGlvbnModHlwZU9yRnVuYzogLypUeXBlKi8gYW55KTogYW55W10ge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnRlZCBpbiBKSVQgbW9kZScpO1xuICB9XG4gIHByb3BNZXRhZGF0YSh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55W119IHtcbiAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnByb3BNZXRhZGF0YSh0eXBlT3JGdW5jKTtcbiAgfVxuICBoYXNMaWZlY3ljbGVIb29rKHR5cGU6IGFueSwgbGNQcm9wZXJ0eTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5oYXNMaWZlY3ljbGVIb29rKHR5cGUsIGxjUHJvcGVydHkpO1xuICB9XG4gIGd1YXJkcyh0eXBlOiBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5ndWFyZHModHlwZSk7XG4gIH1cbiAgcmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKHJlZjogRXh0ZXJuYWxSZWZlcmVuY2UpOiBhbnkge1xuICAgIHJldHVybiBidWlsdGluRXh0ZXJuYWxSZWZlcmVuY2VzLmdldChyZWYpIHx8IHJlZi5ydW50aW1lO1xuICB9XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQnVpbHRpbkV4dGVybmFsUmVmZXJlbmNlc01hcCgpIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxFeHRlcm5hbFJlZmVyZW5jZSwgYW55PigpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLkFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLkVsZW1lbnRSZWYsIEVsZW1lbnRSZWYpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLk5nTW9kdWxlUmVmLCBOZ01vZHVsZVJlZik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZiwgVmlld0NvbnRhaW5lclJlZik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdG9yUmVmKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5SZW5kZXJlcjIsIFJlbmRlcmVyMik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuUXVlcnlMaXN0LCBRdWVyeUxpc3QpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLlRlbXBsYXRlUmVmLCBUZW1wbGF0ZVJlZik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuQ29kZWdlbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgybVDb2RlZ2VuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50RmFjdG9yeSk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuQ29tcG9uZW50UmVmLCBDb21wb25lbnRSZWYpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLk5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVGYWN0b3J5KTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5jcmVhdGVNb2R1bGVGYWN0b3J5LCDJtWNtZik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMubW9kdWxlRGVmLCDJtW1vZCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMubW9kdWxlUHJvdmlkZXJEZWYsIMm1bXBkKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5SZWdpc3Rlck1vZHVsZUZhY3RvcnlGbiwgybVyZWdpc3Rlck1vZHVsZUZhY3RvcnkpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLkluamVjdG9yLCBJbmplY3Rvcik7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuVmlld0VuY2Fwc3VsYXRpb24sIFZpZXdFbmNhcHN1bGF0aW9uKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5DaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLlNlY3VyaXR5Q29udGV4dCwgU2VjdXJpdHlDb250ZXh0KTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5MT0NBTEVfSUQsIExPQ0FMRV9JRCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuVFJBTlNMQVRJT05TX0ZPUk1BVCwgVFJBTlNMQVRJT05TX0ZPUk1BVCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuaW5saW5lSW50ZXJwb2xhdGUsIMm1aW5saW5lSW50ZXJwb2xhdGUpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLmludGVycG9sYXRlLCDJtWludGVycG9sYXRlKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5FTVBUWV9BUlJBWSwgybVFTVBUWV9BUlJBWSk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuRU1QVFlfTUFQLCDJtUVNUFRZX01BUCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMudmlld0RlZiwgybV2aWQpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLmVsZW1lbnREZWYsIMm1ZWxkKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5hbmNob3JEZWYsIMm1YW5kKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy50ZXh0RGVmLCDJtXRlZCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMuZGlyZWN0aXZlRGVmLCDJtWRpZCk7XG4gIG1hcC5zZXQoSWRlbnRpZmllcnMucHJvdmlkZXJEZWYsIMm1cHJkKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5xdWVyeURlZiwgybVxdWQpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLnB1cmVBcnJheURlZiwgybVwYWQpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLnB1cmVPYmplY3REZWYsIMm1cG9kKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5wdXJlUGlwZURlZiwgybVwcGQpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLnBpcGVEZWYsIMm1cGlkKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5ub2RlVmFsdWUsIMm1bm92KTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5uZ0NvbnRlbnREZWYsIMm1bmNkKTtcbiAgbWFwLnNldChJZGVudGlmaWVycy51bndyYXBWYWx1ZSwgybV1bnYpO1xuICBtYXAuc2V0KElkZW50aWZpZXJzLmNyZWF0ZVJlbmRlcmVyVHlwZTIsIMm1Y3J0KTtcbiAgbWFwLnNldChJZGVudGlmaWVycy5jcmVhdGVDb21wb25lbnRGYWN0b3J5LCDJtWNjZik7XG4gIHJldHVybiBtYXA7XG59XG4iXX0=