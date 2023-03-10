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
        define("@angular/compiler-cli/src/transformers/node_emitter_transform", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/transformers/node_emitter", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var node_emitter_1 = require("@angular/compiler-cli/src/transformers/node_emitter");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    function getPreamble(original) {
        return "/**\n * @fileoverview This file was generated by the Angular template compiler. Do not edit.\n * " + original + "\n * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}\n * tslint:disable\n */";
    }
    /**
     * Returns a transformer that does two things for generated files (ngfactory etc):
     * - adds a fileoverview JSDoc comment containing Closure Compiler specific "suppress"ions in JSDoc.
     *   The new comment will contain any fileoverview comment text from the original source file this
     *   file was generated from.
     * - updates generated files that are not in the given map of generatedFiles to have an empty
     *   list of statements as their body.
     */
    function getAngularEmitterTransformFactory(generatedFiles, program, annotateForClosureCompiler) {
        return function () {
            var emitter = new node_emitter_1.TypeScriptNodeEmitter(annotateForClosureCompiler);
            return function (sourceFile) {
                var g = generatedFiles.get(sourceFile.fileName);
                var orig = g && program.getSourceFile(g.srcFileUrl);
                var originalComment = '';
                if (orig)
                    originalComment = getFileoverviewComment(orig);
                var preamble = getPreamble(originalComment);
                if (g && g.stmts) {
                    var orig_1 = program.getSourceFile(g.srcFileUrl);
                    var originalComment_1 = '';
                    if (orig_1)
                        originalComment_1 = getFileoverviewComment(orig_1);
                    var _a = tslib_1.__read(emitter.updateSourceFile(sourceFile, g.stmts, preamble), 1), newSourceFile = _a[0];
                    return newSourceFile;
                }
                else if (util_1.GENERATED_FILES.test(sourceFile.fileName)) {
                    // The file should be empty, but emitter.updateSourceFile would still add imports
                    // and various minutiae.
                    // Clear out the source file entirely, only including the preamble comment, so that
                    // ngc produces an empty .js file.
                    return ts.updateSourceFileNode(sourceFile, [emitter.createCommentStatement(sourceFile, preamble)]);
                }
                return sourceFile;
            };
        };
    }
    exports.getAngularEmitterTransformFactory = getAngularEmitterTransformFactory;
    /**
     * Parses and returns the comment text (without start and end markers) of a \@fileoverview comment
     * in the given source file. Returns the empty string if no such comment can be found.
     */
    function getFileoverviewComment(sourceFile) {
        var trivia = sourceFile.getFullText().substring(0, sourceFile.getStart());
        var leadingComments = ts.getLeadingCommentRanges(trivia, 0);
        if (!leadingComments || leadingComments.length === 0)
            return '';
        var comment = leadingComments[0];
        if (comment.kind !== ts.SyntaxKind.MultiLineCommentTrivia)
            return '';
        // Only comments separated with a \n\n from the file contents are considered file-level comments
        // in TypeScript.
        if (sourceFile.getFullText().substring(comment.end, comment.end + 2) !== '\n\n')
            return '';
        var commentText = sourceFile.getFullText().substring(comment.pos, comment.end);
        // Closure Compiler ignores @suppress and similar if the comment contains @license.
        if (commentText.indexOf('@license') !== -1)
            return '';
        return commentText.replace(/^\/\*\*/, '').replace(/ ?\*\/$/, '');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9lbWl0dGVyX3RyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL25vZGVfZW1pdHRlcl90cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBR0gsK0JBQWlDO0lBRWpDLG9GQUFxRDtJQUNyRCxvRUFBdUM7SUFFdkMsU0FBUyxXQUFXLENBQUMsUUFBZ0I7UUFDbkMsT0FBTyxzR0FFSixRQUFRLGtJQUdULENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFNBQWdCLGlDQUFpQyxDQUM3QyxjQUEwQyxFQUFFLE9BQW1CLEVBQy9ELDBCQUFtQztRQUNyQyxPQUFPO1lBQ0wsSUFBTSxPQUFPLEdBQUcsSUFBSSxvQ0FBcUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sVUFBUyxVQUF5QjtnQkFDdkMsSUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELElBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixJQUFJLElBQUk7b0JBQUUsZUFBZSxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6RCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLElBQU0sTUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLGlCQUFlLEdBQUcsRUFBRSxDQUFDO29CQUN6QixJQUFJLE1BQUk7d0JBQUUsaUJBQWUsR0FBRyxzQkFBc0IsQ0FBQyxNQUFJLENBQUMsQ0FBQztvQkFDbkQsSUFBQSwrRUFBeUUsRUFBeEUscUJBQXdFLENBQUM7b0JBQ2hGLE9BQU8sYUFBYSxDQUFDO2lCQUN0QjtxQkFBTSxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDcEQsaUZBQWlGO29CQUNqRix3QkFBd0I7b0JBQ3hCLG1GQUFtRjtvQkFDbkYsa0NBQWtDO29CQUNsQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FDMUIsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pFO2dCQUNELE9BQU8sVUFBVSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNKLENBQUM7SUE1QkQsOEVBNEJDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxVQUF5QjtRQUN2RCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDaEUsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3JFLGdHQUFnRztRQUNoRyxpQkFBaUI7UUFDakIsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDM0YsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRixtRkFBbUY7UUFDbkYsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RELE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0dlbmVyYXRlZEZpbGV9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge1R5cGVTY3JpcHROb2RlRW1pdHRlcn0gZnJvbSAnLi9ub2RlX2VtaXR0ZXInO1xuaW1wb3J0IHtHRU5FUkFURURfRklMRVN9IGZyb20gJy4vdXRpbCc7XG5cbmZ1bmN0aW9uIGdldFByZWFtYmxlKG9yaWdpbmFsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAvKipcbiAqIEBmaWxlb3ZlcnZpZXcgVGhpcyBmaWxlIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIEFuZ3VsYXIgdGVtcGxhdGUgY29tcGlsZXIuIERvIG5vdCBlZGl0LlxuICogJHtvcmlnaW5hbH1cbiAqIEBzdXBwcmVzcyB7c3VzcGljaW91c0NvZGUsdXNlbGVzc0NvZGUsbWlzc2luZ1Byb3BlcnRpZXMsbWlzc2luZ092ZXJyaWRlLGNoZWNrVHlwZXMsZXh0cmFSZXF1aXJlfVxuICogdHNsaW50OmRpc2FibGVcbiAqL2A7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHRyYW5zZm9ybWVyIHRoYXQgZG9lcyB0d28gdGhpbmdzIGZvciBnZW5lcmF0ZWQgZmlsZXMgKG5nZmFjdG9yeSBldGMpOlxuICogLSBhZGRzIGEgZmlsZW92ZXJ2aWV3IEpTRG9jIGNvbW1lbnQgY29udGFpbmluZyBDbG9zdXJlIENvbXBpbGVyIHNwZWNpZmljIFwic3VwcHJlc3NcImlvbnMgaW4gSlNEb2MuXG4gKiAgIFRoZSBuZXcgY29tbWVudCB3aWxsIGNvbnRhaW4gYW55IGZpbGVvdmVydmlldyBjb21tZW50IHRleHQgZnJvbSB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGUgdGhpc1xuICogICBmaWxlIHdhcyBnZW5lcmF0ZWQgZnJvbS5cbiAqIC0gdXBkYXRlcyBnZW5lcmF0ZWQgZmlsZXMgdGhhdCBhcmUgbm90IGluIHRoZSBnaXZlbiBtYXAgb2YgZ2VuZXJhdGVkRmlsZXMgdG8gaGF2ZSBhbiBlbXB0eVxuICogICBsaXN0IG9mIHN0YXRlbWVudHMgYXMgdGhlaXIgYm9keS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ3VsYXJFbWl0dGVyVHJhbnNmb3JtRmFjdG9yeShcbiAgICBnZW5lcmF0ZWRGaWxlczogTWFwPHN0cmluZywgR2VuZXJhdGVkRmlsZT4sIHByb2dyYW06IHRzLlByb2dyYW0sXG4gICAgYW5ub3RhdGVGb3JDbG9zdXJlQ29tcGlsZXI6IGJvb2xlYW4pOiAoKSA9PiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkgPT4gdHMuU291cmNlRmlsZSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IFR5cGVTY3JpcHROb2RlRW1pdHRlcihhbm5vdGF0ZUZvckNsb3N1cmVDb21waWxlcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Tb3VyY2VGaWxlIHtcbiAgICAgIGNvbnN0IGcgPSBnZW5lcmF0ZWRGaWxlcy5nZXQoc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICBjb25zdCBvcmlnID0gZyAmJiBwcm9ncmFtLmdldFNvdXJjZUZpbGUoZy5zcmNGaWxlVXJsKTtcbiAgICAgIGxldCBvcmlnaW5hbENvbW1lbnQgPSAnJztcbiAgICAgIGlmIChvcmlnKSBvcmlnaW5hbENvbW1lbnQgPSBnZXRGaWxlb3ZlcnZpZXdDb21tZW50KG9yaWcpO1xuICAgICAgY29uc3QgcHJlYW1ibGUgPSBnZXRQcmVhbWJsZShvcmlnaW5hbENvbW1lbnQpO1xuICAgICAgaWYgKGcgJiYgZy5zdG10cykge1xuICAgICAgICBjb25zdCBvcmlnID0gcHJvZ3JhbS5nZXRTb3VyY2VGaWxlKGcuc3JjRmlsZVVybCk7XG4gICAgICAgIGxldCBvcmlnaW5hbENvbW1lbnQgPSAnJztcbiAgICAgICAgaWYgKG9yaWcpIG9yaWdpbmFsQ29tbWVudCA9IGdldEZpbGVvdmVydmlld0NvbW1lbnQob3JpZyk7XG4gICAgICAgIGNvbnN0IFtuZXdTb3VyY2VGaWxlXSA9IGVtaXR0ZXIudXBkYXRlU291cmNlRmlsZShzb3VyY2VGaWxlLCBnLnN0bXRzLCBwcmVhbWJsZSk7XG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VGaWxlO1xuICAgICAgfSBlbHNlIGlmIChHRU5FUkFURURfRklMRVMudGVzdChzb3VyY2VGaWxlLmZpbGVOYW1lKSkge1xuICAgICAgICAvLyBUaGUgZmlsZSBzaG91bGQgYmUgZW1wdHksIGJ1dCBlbWl0dGVyLnVwZGF0ZVNvdXJjZUZpbGUgd291bGQgc3RpbGwgYWRkIGltcG9ydHNcbiAgICAgICAgLy8gYW5kIHZhcmlvdXMgbWludXRpYWUuXG4gICAgICAgIC8vIENsZWFyIG91dCB0aGUgc291cmNlIGZpbGUgZW50aXJlbHksIG9ubHkgaW5jbHVkaW5nIHRoZSBwcmVhbWJsZSBjb21tZW50LCBzbyB0aGF0XG4gICAgICAgIC8vIG5nYyBwcm9kdWNlcyBhbiBlbXB0eSAuanMgZmlsZS5cbiAgICAgICAgcmV0dXJuIHRzLnVwZGF0ZVNvdXJjZUZpbGVOb2RlKFxuICAgICAgICAgICAgc291cmNlRmlsZSwgW2VtaXR0ZXIuY3JlYXRlQ29tbWVudFN0YXRlbWVudChzb3VyY2VGaWxlLCBwcmVhbWJsZSldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogUGFyc2VzIGFuZCByZXR1cm5zIHRoZSBjb21tZW50IHRleHQgKHdpdGhvdXQgc3RhcnQgYW5kIGVuZCBtYXJrZXJzKSBvZiBhIFxcQGZpbGVvdmVydmlldyBjb21tZW50XG4gKiBpbiB0aGUgZ2l2ZW4gc291cmNlIGZpbGUuIFJldHVybnMgdGhlIGVtcHR5IHN0cmluZyBpZiBubyBzdWNoIGNvbW1lbnQgY2FuIGJlIGZvdW5kLlxuICovXG5mdW5jdGlvbiBnZXRGaWxlb3ZlcnZpZXdDb21tZW50KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBzdHJpbmcge1xuICBjb25zdCB0cml2aWEgPSBzb3VyY2VGaWxlLmdldEZ1bGxUZXh0KCkuc3Vic3RyaW5nKDAsIHNvdXJjZUZpbGUuZ2V0U3RhcnQoKSk7XG4gIGNvbnN0IGxlYWRpbmdDb21tZW50cyA9IHRzLmdldExlYWRpbmdDb21tZW50UmFuZ2VzKHRyaXZpYSwgMCk7XG4gIGlmICghbGVhZGluZ0NvbW1lbnRzIHx8IGxlYWRpbmdDb21tZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgY29uc3QgY29tbWVudCA9IGxlYWRpbmdDb21tZW50c1swXTtcbiAgaWYgKGNvbW1lbnQua2luZCAhPT0gdHMuU3ludGF4S2luZC5NdWx0aUxpbmVDb21tZW50VHJpdmlhKSByZXR1cm4gJyc7XG4gIC8vIE9ubHkgY29tbWVudHMgc2VwYXJhdGVkIHdpdGggYSBcXG5cXG4gZnJvbSB0aGUgZmlsZSBjb250ZW50cyBhcmUgY29uc2lkZXJlZCBmaWxlLWxldmVsIGNvbW1lbnRzXG4gIC8vIGluIFR5cGVTY3JpcHQuXG4gIGlmIChzb3VyY2VGaWxlLmdldEZ1bGxUZXh0KCkuc3Vic3RyaW5nKGNvbW1lbnQuZW5kLCBjb21tZW50LmVuZCArIDIpICE9PSAnXFxuXFxuJykgcmV0dXJuICcnO1xuICBjb25zdCBjb21tZW50VGV4dCA9IHNvdXJjZUZpbGUuZ2V0RnVsbFRleHQoKS5zdWJzdHJpbmcoY29tbWVudC5wb3MsIGNvbW1lbnQuZW5kKTtcbiAgLy8gQ2xvc3VyZSBDb21waWxlciBpZ25vcmVzIEBzdXBwcmVzcyBhbmQgc2ltaWxhciBpZiB0aGUgY29tbWVudCBjb250YWlucyBAbGljZW5zZS5cbiAgaWYgKGNvbW1lbnRUZXh0LmluZGV4T2YoJ0BsaWNlbnNlJykgIT09IC0xKSByZXR1cm4gJyc7XG4gIHJldHVybiBjb21tZW50VGV4dC5yZXBsYWNlKC9eXFwvXFwqXFwqLywgJycpLnJlcGxhY2UoLyA/XFwqXFwvJC8sICcnKTtcbn1cbiJdfQ==