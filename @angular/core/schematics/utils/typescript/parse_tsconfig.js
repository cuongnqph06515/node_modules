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
        define("@angular/core/schematics/utils/typescript/parse_tsconfig", ["require", "exports", "path", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const path = require("path");
    const ts = require("typescript");
    function parseTsconfigFile(tsconfigPath, basePath) {
        const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
        const parseConfigHost = {
            useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
            fileExists: ts.sys.fileExists,
            readDirectory: ts.sys.readDirectory,
            readFile: ts.sys.readFile,
        };
        // Throw if incorrect arguments are passed to this function. Passing relative base paths
        // results in root directories not being resolved and in later type checking runtime errors.
        // More details can be found here: https://github.com/microsoft/TypeScript/issues/37731.
        if (!path.isAbsolute(basePath)) {
            throw Error('Unexpected relative base path has been specified.');
        }
        return ts.parseJsonConfigFileContent(config, parseConfigHost, basePath, {});
    }
    exports.parseTsconfigFile = parseTsconfigFile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdHNjb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvdXRpbHMvdHlwZXNjcmlwdC9wYXJzZV90c2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDZCQUE2QjtJQUM3QixpQ0FBaUM7SUFFakMsU0FBZ0IsaUJBQWlCLENBQUMsWUFBb0IsRUFBRSxRQUFnQjtRQUN0RSxNQUFNLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxNQUFNLGVBQWUsR0FBRztZQUN0Qix5QkFBeUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLHlCQUF5QjtZQUMzRCxVQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVO1lBQzdCLGFBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWE7WUFDbkMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUTtTQUMxQixDQUFDO1FBRUYsd0ZBQXdGO1FBQ3hGLDRGQUE0RjtRQUM1Rix3RkFBd0Y7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUNsRTtRQUVELE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFqQkQsOENBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRzY29uZmlnRmlsZSh0c2NvbmZpZ1BhdGg6IHN0cmluZywgYmFzZVBhdGg6IHN0cmluZyk6IHRzLlBhcnNlZENvbW1hbmRMaW5lIHtcbiAgY29uc3Qge2NvbmZpZ30gPSB0cy5yZWFkQ29uZmlnRmlsZSh0c2NvbmZpZ1BhdGgsIHRzLnN5cy5yZWFkRmlsZSk7XG4gIGNvbnN0IHBhcnNlQ29uZmlnSG9zdCA9IHtcbiAgICB1c2VDYXNlU2Vuc2l0aXZlRmlsZU5hbWVzOiB0cy5zeXMudXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcyxcbiAgICBmaWxlRXhpc3RzOiB0cy5zeXMuZmlsZUV4aXN0cyxcbiAgICByZWFkRGlyZWN0b3J5OiB0cy5zeXMucmVhZERpcmVjdG9yeSxcbiAgICByZWFkRmlsZTogdHMuc3lzLnJlYWRGaWxlLFxuICB9O1xuXG4gIC8vIFRocm93IGlmIGluY29ycmVjdCBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uLiBQYXNzaW5nIHJlbGF0aXZlIGJhc2UgcGF0aHNcbiAgLy8gcmVzdWx0cyBpbiByb290IGRpcmVjdG9yaWVzIG5vdCBiZWluZyByZXNvbHZlZCBhbmQgaW4gbGF0ZXIgdHlwZSBjaGVja2luZyBydW50aW1lIGVycm9ycy5cbiAgLy8gTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzM3NzMxLlxuICBpZiAoIXBhdGguaXNBYnNvbHV0ZShiYXNlUGF0aCkpIHtcbiAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCByZWxhdGl2ZSBiYXNlIHBhdGggaGFzIGJlZW4gc3BlY2lmaWVkLicpO1xuICB9XG5cbiAgcmV0dXJuIHRzLnBhcnNlSnNvbkNvbmZpZ0ZpbGVDb250ZW50KGNvbmZpZywgcGFyc2VDb25maWdIb3N0LCBiYXNlUGF0aCwge30pO1xufVxuIl19