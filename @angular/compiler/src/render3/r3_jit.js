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
        define("@angular/compiler/src/render3/r3_jit", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implementation of `CompileReflector` which resolves references to @angular/core
     * symbols at runtime, according to a consumer-provided mapping.
     *
     * Only supports `resolveExternalReference`, all other methods throw.
     */
    var R3JitReflector = /** @class */ (function () {
        function R3JitReflector(context) {
            this.context = context;
        }
        R3JitReflector.prototype.resolveExternalReference = function (ref) {
            // This reflector only handles @angular/core imports.
            if (ref.moduleName !== '@angular/core') {
                throw new Error("Cannot resolve external reference to " + ref.moduleName + ", only references to @angular/core are supported.");
            }
            if (!this.context.hasOwnProperty(ref.name)) {
                throw new Error("No value provided for @angular/core symbol '" + ref.name + "'.");
            }
            return this.context[ref.name];
        };
        R3JitReflector.prototype.parameters = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.annotations = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.shallowAnnotations = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.tryAnnotations = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.propMetadata = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.hasLifecycleHook = function (type, lcProperty) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.guards = function (typeOrFunc) {
            throw new Error('Not implemented.');
        };
        R3JitReflector.prototype.componentModuleUrl = function (type, cmpMetadata) {
            throw new Error('Not implemented.');
        };
        return R3JitReflector;
    }());
    exports.R3JitReflector = R3JitReflector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfaml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfaml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBS0g7Ozs7O09BS0c7SUFDSDtRQUNFLHdCQUFvQixPQUE2QjtZQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUFHLENBQUM7UUFFckQsaURBQXdCLEdBQXhCLFVBQXlCLEdBQXdCO1lBQy9DLHFEQUFxRDtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssZUFBZSxFQUFFO2dCQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUNaLEdBQUcsQ0FBQyxVQUFVLHNEQUFtRCxDQUFDLENBQUM7YUFDeEU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUssQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUErQyxHQUFHLENBQUMsSUFBSyxPQUFJLENBQUMsQ0FBQzthQUMvRTtZQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELG1DQUFVLEdBQVYsVUFBVyxVQUFlO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsb0NBQVcsR0FBWCxVQUFZLFVBQWU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCwyQ0FBa0IsR0FBbEIsVUFBbUIsVUFBZTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELHVDQUFjLEdBQWQsVUFBZSxVQUFlO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQscUNBQVksR0FBWixVQUFhLFVBQWU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCx5Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBUyxFQUFFLFVBQWtCO1lBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsK0JBQU0sR0FBTixVQUFPLFVBQWU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCwyQ0FBa0IsR0FBbEIsVUFBbUIsSUFBUyxFQUFFLFdBQWdCO1lBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0gscUJBQUM7SUFBRCxDQUFDLEFBOUNELElBOENDO0lBOUNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIGBDb21waWxlUmVmbGVjdG9yYCB3aGljaCByZXNvbHZlcyByZWZlcmVuY2VzIHRvIEBhbmd1bGFyL2NvcmVcbiAqIHN5bWJvbHMgYXQgcnVudGltZSwgYWNjb3JkaW5nIHRvIGEgY29uc3VtZXItcHJvdmlkZWQgbWFwcGluZy5cbiAqXG4gKiBPbmx5IHN1cHBvcnRzIGByZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2VgLCBhbGwgb3RoZXIgbWV0aG9kcyB0aHJvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIFIzSml0UmVmbGVjdG9yIGltcGxlbWVudHMgQ29tcGlsZVJlZmxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDoge1trZXk6IHN0cmluZ106IGFueX0pIHt9XG5cbiAgcmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKHJlZjogby5FeHRlcm5hbFJlZmVyZW5jZSk6IGFueSB7XG4gICAgLy8gVGhpcyByZWZsZWN0b3Igb25seSBoYW5kbGVzIEBhbmd1bGFyL2NvcmUgaW1wb3J0cy5cbiAgICBpZiAocmVmLm1vZHVsZU5hbWUgIT09ICdAYW5ndWxhci9jb3JlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVzb2x2ZSBleHRlcm5hbCByZWZlcmVuY2UgdG8gJHtcbiAgICAgICAgICByZWYubW9kdWxlTmFtZX0sIG9ubHkgcmVmZXJlbmNlcyB0byBAYW5ndWxhci9jb3JlIGFyZSBzdXBwb3J0ZWQuYCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb250ZXh0Lmhhc093blByb3BlcnR5KHJlZi5uYW1lISkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsdWUgcHJvdmlkZWQgZm9yIEBhbmd1bGFyL2NvcmUgc3ltYm9sICcke3JlZi5uYW1lIX0nLmApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb250ZXh0W3JlZi5uYW1lIV07XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdW10ge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbiAgYW5ub3RhdGlvbnModHlwZU9yRnVuYzogYW55KTogYW55W10ge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbiAgc2hhbGxvd0Fubm90YXRpb25zKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuXG4gIHRyeUFubm90YXRpb25zKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuXG4gIHByb3BNZXRhZGF0YSh0eXBlT3JGdW5jOiBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55W107fSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cblxuICBoYXNMaWZlY3ljbGVIb29rKHR5cGU6IGFueSwgbGNQcm9wZXJ0eTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cblxuICBndWFyZHModHlwZU9yRnVuYzogYW55KToge1trZXk6IHN0cmluZ106IGFueTt9IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuXG4gIGNvbXBvbmVudE1vZHVsZVVybCh0eXBlOiBhbnksIGNtcE1ldGFkYXRhOiBhbnkpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xuICB9XG59XG4iXX0=