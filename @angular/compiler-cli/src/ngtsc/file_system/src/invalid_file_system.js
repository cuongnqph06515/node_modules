(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/file_system/src/invalid_file_system", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The default `FileSystem` that will always fail.
     *
     * This is a way of ensuring that the developer consciously chooses and
     * configures the `FileSystem` before using it; particularly important when
     * considering static functions like `absoluteFrom()` which rely on
     * the `FileSystem` under the hood.
     */
    var InvalidFileSystem = /** @class */ (function () {
        function InvalidFileSystem() {
        }
        InvalidFileSystem.prototype.exists = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.readFile = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.writeFile = function (path, data, exclusive) {
            throw makeError();
        };
        InvalidFileSystem.prototype.removeFile = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.symlink = function (target, path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.readdir = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.lstat = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.stat = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.pwd = function () {
            throw makeError();
        };
        InvalidFileSystem.prototype.chdir = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.extname = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.copyFile = function (from, to) {
            throw makeError();
        };
        InvalidFileSystem.prototype.moveFile = function (from, to) {
            throw makeError();
        };
        InvalidFileSystem.prototype.ensureDir = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.removeDeep = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.isCaseSensitive = function () {
            throw makeError();
        };
        InvalidFileSystem.prototype.resolve = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            throw makeError();
        };
        InvalidFileSystem.prototype.dirname = function (file) {
            throw makeError();
        };
        InvalidFileSystem.prototype.join = function (basePath) {
            var paths = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                paths[_i - 1] = arguments[_i];
            }
            throw makeError();
        };
        InvalidFileSystem.prototype.isRoot = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.isRooted = function (path) {
            throw makeError();
        };
        InvalidFileSystem.prototype.relative = function (from, to) {
            throw makeError();
        };
        InvalidFileSystem.prototype.basename = function (filePath, extension) {
            throw makeError();
        };
        InvalidFileSystem.prototype.realpath = function (filePath) {
            throw makeError();
        };
        InvalidFileSystem.prototype.getDefaultLibLocation = function () {
            throw makeError();
        };
        InvalidFileSystem.prototype.normalize = function (path) {
            throw makeError();
        };
        return InvalidFileSystem;
    }());
    exports.InvalidFileSystem = InvalidFileSystem;
    function makeError() {
        return new Error('FileSystem has not been configured. Please call `setFileSystem()` before calling this method.');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZF9maWxlX3N5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0vc3JjL2ludmFsaWRfZmlsZV9zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFTQTs7Ozs7OztPQU9HO0lBQ0g7UUFBQTtRQStFQSxDQUFDO1FBOUVDLGtDQUFNLEdBQU4sVUFBTyxJQUFvQjtZQUN6QixNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxvQ0FBUSxHQUFSLFVBQVMsSUFBb0I7WUFDM0IsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QscUNBQVMsR0FBVCxVQUFVLElBQW9CLEVBQUUsSUFBWSxFQUFFLFNBQW1CO1lBQy9ELE1BQU0sU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELHNDQUFVLEdBQVYsVUFBVyxJQUFvQjtZQUM3QixNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxtQ0FBTyxHQUFQLFVBQVEsTUFBc0IsRUFBRSxJQUFvQjtZQUNsRCxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxtQ0FBTyxHQUFQLFVBQVEsSUFBb0I7WUFDMUIsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsaUNBQUssR0FBTCxVQUFNLElBQW9CO1lBQ3hCLE1BQU0sU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELGdDQUFJLEdBQUosVUFBSyxJQUFvQjtZQUN2QixNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCwrQkFBRyxHQUFIO1lBQ0UsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsaUNBQUssR0FBTCxVQUFNLElBQW9CO1lBQ3hCLE1BQU0sU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELG1DQUFPLEdBQVAsVUFBUSxJQUFnQztZQUN0QyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxvQ0FBUSxHQUFSLFVBQVMsSUFBb0IsRUFBRSxFQUFrQjtZQUMvQyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxvQ0FBUSxHQUFSLFVBQVMsSUFBb0IsRUFBRSxFQUFrQjtZQUMvQyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxxQ0FBUyxHQUFULFVBQVUsSUFBb0I7WUFDNUIsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0Qsc0NBQVUsR0FBVixVQUFXLElBQW9CO1lBQzdCLE1BQU0sU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELDJDQUFlLEdBQWY7WUFDRSxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxtQ0FBTyxHQUFQO1lBQVEsZUFBa0I7aUJBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtnQkFBbEIsMEJBQWtCOztZQUN4QixNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxtQ0FBTyxHQUFQLFVBQThCLElBQU87WUFDbkMsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsZ0NBQUksR0FBSixVQUEyQixRQUFXO1lBQUUsZUFBa0I7aUJBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtnQkFBbEIsOEJBQWtCOztZQUN4RCxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxrQ0FBTSxHQUFOLFVBQU8sSUFBb0I7WUFDekIsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0Qsb0NBQVEsR0FBUixVQUFTLElBQVk7WUFDbkIsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0Qsb0NBQVEsR0FBUixVQUErQixJQUFPLEVBQUUsRUFBSztZQUMzQyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxvQ0FBUSxHQUFSLFVBQVMsUUFBZ0IsRUFBRSxTQUFrQjtZQUMzQyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxvQ0FBUSxHQUFSLFVBQVMsUUFBd0I7WUFDL0IsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsaURBQXFCLEdBQXJCO1lBQ0UsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QscUNBQVMsR0FBVCxVQUFnQyxJQUFPO1lBQ3JDLE1BQU0sU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0FBQyxBQS9FRCxJQStFQztJQS9FWSw4Q0FBaUI7SUFpRjlCLFNBQVMsU0FBUztRQUNoQixPQUFPLElBQUksS0FBSyxDQUNaLCtGQUErRixDQUFDLENBQUM7SUFDdkcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTdGF0cywgRmlsZVN5c3RlbSwgUGF0aFNlZ21lbnQsIFBhdGhTdHJpbmd9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGBGaWxlU3lzdGVtYCB0aGF0IHdpbGwgYWx3YXlzIGZhaWwuXG4gKlxuICogVGhpcyBpcyBhIHdheSBvZiBlbnN1cmluZyB0aGF0IHRoZSBkZXZlbG9wZXIgY29uc2Npb3VzbHkgY2hvb3NlcyBhbmRcbiAqIGNvbmZpZ3VyZXMgdGhlIGBGaWxlU3lzdGVtYCBiZWZvcmUgdXNpbmcgaXQ7IHBhcnRpY3VsYXJseSBpbXBvcnRhbnQgd2hlblxuICogY29uc2lkZXJpbmcgc3RhdGljIGZ1bmN0aW9ucyBsaWtlIGBhYnNvbHV0ZUZyb20oKWAgd2hpY2ggcmVseSBvblxuICogdGhlIGBGaWxlU3lzdGVtYCB1bmRlciB0aGUgaG9vZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEludmFsaWRGaWxlU3lzdGVtIGltcGxlbWVudHMgRmlsZVN5c3RlbSB7XG4gIGV4aXN0cyhwYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IGJvb2xlYW4ge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIHJlYWRGaWxlKHBhdGg6IEFic29sdXRlRnNQYXRoKTogc3RyaW5nIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICB3cml0ZUZpbGUocGF0aDogQWJzb2x1dGVGc1BhdGgsIGRhdGE6IHN0cmluZywgZXhjbHVzaXZlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIHJlbW92ZUZpbGUocGF0aDogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBzeW1saW5rKHRhcmdldDogQWJzb2x1dGVGc1BhdGgsIHBhdGg6IEFic29sdXRlRnNQYXRoKTogdm9pZCB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgcmVhZGRpcihwYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IFBhdGhTZWdtZW50W10ge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIGxzdGF0KHBhdGg6IEFic29sdXRlRnNQYXRoKTogRmlsZVN0YXRzIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBzdGF0KHBhdGg6IEFic29sdXRlRnNQYXRoKTogRmlsZVN0YXRzIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBwd2QoKTogQWJzb2x1dGVGc1BhdGgge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIGNoZGlyKHBhdGg6IEFic29sdXRlRnNQYXRoKTogdm9pZCB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgZXh0bmFtZShwYXRoOiBBYnNvbHV0ZUZzUGF0aHxQYXRoU2VnbWVudCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgY29weUZpbGUoZnJvbTogQWJzb2x1dGVGc1BhdGgsIHRvOiBBYnNvbHV0ZUZzUGF0aCk6IHZvaWQge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIG1vdmVGaWxlKGZyb206IEFic29sdXRlRnNQYXRoLCB0bzogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBlbnN1cmVEaXIocGF0aDogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICByZW1vdmVEZWVwKHBhdGg6IEFic29sdXRlRnNQYXRoKTogdm9pZCB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgaXNDYXNlU2Vuc2l0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIHJlc29sdmUoLi4ucGF0aHM6IHN0cmluZ1tdKTogQWJzb2x1dGVGc1BhdGgge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIGRpcm5hbWU8VCBleHRlbmRzIFBhdGhTdHJpbmc+KGZpbGU6IFQpOiBUIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBqb2luPFQgZXh0ZW5kcyBQYXRoU3RyaW5nPihiYXNlUGF0aDogVCwgLi4ucGF0aHM6IHN0cmluZ1tdKTogVCB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgaXNSb290KHBhdGg6IEFic29sdXRlRnNQYXRoKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgaXNSb290ZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgcmVsYXRpdmU8VCBleHRlbmRzIFBhdGhTdHJpbmc+KGZyb206IFQsIHRvOiBUKTogUGF0aFNlZ21lbnQge1xuICAgIHRocm93IG1ha2VFcnJvcigpO1xuICB9XG4gIGJhc2VuYW1lKGZpbGVQYXRoOiBzdHJpbmcsIGV4dGVuc2lvbj86IHN0cmluZyk6IFBhdGhTZWdtZW50IHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICByZWFscGF0aChmaWxlUGF0aDogQWJzb2x1dGVGc1BhdGgpOiBBYnNvbHV0ZUZzUGF0aCB7XG4gICAgdGhyb3cgbWFrZUVycm9yKCk7XG4gIH1cbiAgZ2V0RGVmYXVsdExpYkxvY2F0aW9uKCk6IEFic29sdXRlRnNQYXRoIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxuICBub3JtYWxpemU8VCBleHRlbmRzIFBhdGhTdHJpbmc+KHBhdGg6IFQpOiBUIHtcbiAgICB0aHJvdyBtYWtlRXJyb3IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlRXJyb3IoKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAnRmlsZVN5c3RlbSBoYXMgbm90IGJlZW4gY29uZmlndXJlZC4gUGxlYXNlIGNhbGwgYHNldEZpbGVTeXN0ZW0oKWAgYmVmb3JlIGNhbGxpbmcgdGhpcyBtZXRob2QuJyk7XG59XG4iXX0=