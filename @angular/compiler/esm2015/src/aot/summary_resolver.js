/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { deserializeSummaries } from './summary_serializer';
import { stripGeneratedFileSuffix, summaryFileName } from './util';
export class AotSummaryResolver {
    constructor(host, staticSymbolCache) {
        this.host = host;
        this.staticSymbolCache = staticSymbolCache;
        // Note: this will only contain StaticSymbols without members!
        this.summaryCache = new Map();
        this.loadedFilePaths = new Map();
        // Note: this will only contain StaticSymbols without members!
        this.importAs = new Map();
        this.knownFileNameToModuleNames = new Map();
    }
    isLibraryFile(filePath) {
        // Note: We need to strip the .ngfactory. file path,
        // so this method also works for generated files
        // (for which host.isSourceFile will always return false).
        return !this.host.isSourceFile(stripGeneratedFileSuffix(filePath));
    }
    toSummaryFileName(filePath, referringSrcFileName) {
        return this.host.toSummaryFileName(filePath, referringSrcFileName);
    }
    fromSummaryFileName(fileName, referringLibFileName) {
        return this.host.fromSummaryFileName(fileName, referringLibFileName);
    }
    resolveSummary(staticSymbol) {
        const rootSymbol = staticSymbol.members.length ?
            this.staticSymbolCache.get(staticSymbol.filePath, staticSymbol.name) :
            staticSymbol;
        let summary = this.summaryCache.get(rootSymbol);
        if (!summary) {
            this._loadSummaryFile(staticSymbol.filePath);
            summary = this.summaryCache.get(staticSymbol);
        }
        return (rootSymbol === staticSymbol && summary) || null;
    }
    getSymbolsOf(filePath) {
        if (this._loadSummaryFile(filePath)) {
            return Array.from(this.summaryCache.keys()).filter((symbol) => symbol.filePath === filePath);
        }
        return null;
    }
    getImportAs(staticSymbol) {
        staticSymbol.assertNoMembers();
        return this.importAs.get(staticSymbol);
    }
    /**
     * Converts a file path to a module name that can be used as an `import`.
     */
    getKnownModuleName(importedFilePath) {
        return this.knownFileNameToModuleNames.get(importedFilePath) || null;
    }
    addSummary(summary) {
        this.summaryCache.set(summary.symbol, summary);
    }
    _loadSummaryFile(filePath) {
        let hasSummary = this.loadedFilePaths.get(filePath);
        if (hasSummary != null) {
            return hasSummary;
        }
        let json = null;
        if (this.isLibraryFile(filePath)) {
            const summaryFilePath = summaryFileName(filePath);
            try {
                json = this.host.loadSummary(summaryFilePath);
            }
            catch (e) {
                console.error(`Error loading summary file ${summaryFilePath}`);
                throw e;
            }
        }
        hasSummary = json != null;
        this.loadedFilePaths.set(filePath, hasSummary);
        if (json) {
            const { moduleName, summaries, importAs } = deserializeSummaries(this.staticSymbolCache, this, filePath, json);
            summaries.forEach((summary) => this.summaryCache.set(summary.symbol, summary));
            if (moduleName) {
                this.knownFileNameToModuleNames.set(filePath, moduleName);
            }
            importAs.forEach((importAs) => {
                this.importAs.set(importAs.symbol, importAs.importAs);
            });
        }
        return hasSummary;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3Qvc3VtbWFyeV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsZUFBZSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBNkJqRSxNQUFNLE9BQU8sa0JBQWtCO0lBUTdCLFlBQW9CLElBQTRCLEVBQVUsaUJBQW9DO1FBQTFFLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVA5Riw4REFBOEQ7UUFDdEQsaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztRQUM5RCxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO1FBQ3JELDhEQUE4RDtRQUN0RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQThCLENBQUM7UUFDakQsK0JBQTBCLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFFa0MsQ0FBQztJQUVsRyxhQUFhLENBQUMsUUFBZ0I7UUFDNUIsb0RBQW9EO1FBQ3BELGdEQUFnRDtRQUNoRCwwREFBMEQ7UUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsb0JBQTRCO1FBQzlELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxvQkFBNEI7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxjQUFjLENBQUMsWUFBMEI7UUFDdkMsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEUsWUFBWSxDQUFDO1FBQ2pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUUsQ0FBQztTQUNoRDtRQUNELE9BQU8sQ0FBQyxVQUFVLEtBQUssWUFBWSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQztJQUMxRCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCO1FBQzNCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1NBQzlGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTBCO1FBQ3BDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQixDQUFDLGdCQUF3QjtRQUN6QyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDdkUsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUE4QjtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxRQUFnQjtRQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFDRCxJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQyxNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsSUFBSTtnQkFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDL0M7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7UUFDRCxVQUFVLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsR0FDbkMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9FLElBQUksVUFBVSxFQUFFO2dCQUNkLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N1bW1hcnksIFN1bW1hcnlSZXNvbHZlcn0gZnJvbSAnLi4vc3VtbWFyeV9yZXNvbHZlcic7XG5cbmltcG9ydCB7U3RhdGljU3ltYm9sLCBTdGF0aWNTeW1ib2xDYWNoZX0gZnJvbSAnLi9zdGF0aWNfc3ltYm9sJztcbmltcG9ydCB7ZGVzZXJpYWxpemVTdW1tYXJpZXN9IGZyb20gJy4vc3VtbWFyeV9zZXJpYWxpemVyJztcbmltcG9ydCB7c3RyaXBHZW5lcmF0ZWRGaWxlU3VmZml4LCBzdW1tYXJ5RmlsZU5hbWV9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW90U3VtbWFyeVJlc29sdmVySG9zdCB7XG4gIC8qKlxuICAgKiBMb2FkcyBhbiBOZ01vZHVsZS9EaXJlY3RpdmUvUGlwZSBzdW1tYXJ5IGZpbGVcbiAgICovXG4gIGxvYWRTdW1tYXJ5KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIGEgZmlsZSBpcyBhIHNvdXJjZSBmaWxlIG9yIG5vdC5cbiAgICovXG4gIGlzU291cmNlRmlsZShzb3VyY2VGaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgZmlsZSBuYW1lIGludG8gYSByZXByZXNlbnRhdGlvbiB0aGF0IHNob3VsZCBiZSBzdG9yZWQgaW4gYSBzdW1tYXJ5IGZpbGUuXG4gICAqIFRoaXMgaGFzIHRvIGluY2x1ZGUgY2hhbmdpbmcgdGhlIHN1ZmZpeCBhcyB3ZWxsLlxuICAgKiBFLmcuXG4gICAqIGBzb21lX2ZpbGUudHNgIC0+IGBzb21lX2ZpbGUuZC50c2BcbiAgICpcbiAgICogQHBhcmFtIHJlZmVycmluZ1NyY0ZpbGVOYW1lIHRoZSBzb3VyZSBmaWxlIHRoYXQgcmVmZXJzIHRvIGZpbGVOYW1lXG4gICAqL1xuICB0b1N1bW1hcnlGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCByZWZlcnJpbmdTcmNGaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGZpbGVOYW1lIHRoYXQgd2FzIHByb2Nlc3NlZCBieSBgdG9TdW1tYXJ5RmlsZU5hbWVgIGJhY2sgaW50byBhIHJlYWwgZmlsZU5hbWVcbiAgICogZ2l2ZW4gdGhlIGZpbGVOYW1lIG9mIHRoZSBsaWJyYXJ5IHRoYXQgaXMgcmVmZXJyaWcgdG8gaXQuXG4gICAqL1xuICBmcm9tU3VtbWFyeUZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcsIHJlZmVycmluZ0xpYkZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBb3RTdW1tYXJ5UmVzb2x2ZXIgaW1wbGVtZW50cyBTdW1tYXJ5UmVzb2x2ZXI8U3RhdGljU3ltYm9sPiB7XG4gIC8vIE5vdGU6IHRoaXMgd2lsbCBvbmx5IGNvbnRhaW4gU3RhdGljU3ltYm9scyB3aXRob3V0IG1lbWJlcnMhXG4gIHByaXZhdGUgc3VtbWFyeUNhY2hlID0gbmV3IE1hcDxTdGF0aWNTeW1ib2wsIFN1bW1hcnk8U3RhdGljU3ltYm9sPj4oKTtcbiAgcHJpdmF0ZSBsb2FkZWRGaWxlUGF0aHMgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgLy8gTm90ZTogdGhpcyB3aWxsIG9ubHkgY29udGFpbiBTdGF0aWNTeW1ib2xzIHdpdGhvdXQgbWVtYmVycyFcbiAgcHJpdmF0ZSBpbXBvcnRBcyA9IG5ldyBNYXA8U3RhdGljU3ltYm9sLCBTdGF0aWNTeW1ib2w+KCk7XG4gIHByaXZhdGUga25vd25GaWxlTmFtZVRvTW9kdWxlTmFtZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogQW90U3VtbWFyeVJlc29sdmVySG9zdCwgcHJpdmF0ZSBzdGF0aWNTeW1ib2xDYWNoZTogU3RhdGljU3ltYm9sQ2FjaGUpIHt9XG5cbiAgaXNMaWJyYXJ5RmlsZShmaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gTm90ZTogV2UgbmVlZCB0byBzdHJpcCB0aGUgLm5nZmFjdG9yeS4gZmlsZSBwYXRoLFxuICAgIC8vIHNvIHRoaXMgbWV0aG9kIGFsc28gd29ya3MgZm9yIGdlbmVyYXRlZCBmaWxlc1xuICAgIC8vIChmb3Igd2hpY2ggaG9zdC5pc1NvdXJjZUZpbGUgd2lsbCBhbHdheXMgcmV0dXJuIGZhbHNlKS5cbiAgICByZXR1cm4gIXRoaXMuaG9zdC5pc1NvdXJjZUZpbGUoc3RyaXBHZW5lcmF0ZWRGaWxlU3VmZml4KGZpbGVQYXRoKSk7XG4gIH1cblxuICB0b1N1bW1hcnlGaWxlTmFtZShmaWxlUGF0aDogc3RyaW5nLCByZWZlcnJpbmdTcmNGaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaG9zdC50b1N1bW1hcnlGaWxlTmFtZShmaWxlUGF0aCwgcmVmZXJyaW5nU3JjRmlsZU5hbWUpO1xuICB9XG5cbiAgZnJvbVN1bW1hcnlGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCByZWZlcnJpbmdMaWJGaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaG9zdC5mcm9tU3VtbWFyeUZpbGVOYW1lKGZpbGVOYW1lLCByZWZlcnJpbmdMaWJGaWxlTmFtZSk7XG4gIH1cblxuICByZXNvbHZlU3VtbWFyeShzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IFN1bW1hcnk8U3RhdGljU3ltYm9sPnxudWxsIHtcbiAgICBjb25zdCByb290U3ltYm9sID0gc3RhdGljU3ltYm9sLm1lbWJlcnMubGVuZ3RoID9cbiAgICAgICAgdGhpcy5zdGF0aWNTeW1ib2xDYWNoZS5nZXQoc3RhdGljU3ltYm9sLmZpbGVQYXRoLCBzdGF0aWNTeW1ib2wubmFtZSkgOlxuICAgICAgICBzdGF0aWNTeW1ib2w7XG4gICAgbGV0IHN1bW1hcnkgPSB0aGlzLnN1bW1hcnlDYWNoZS5nZXQocm9vdFN5bWJvbCk7XG4gICAgaWYgKCFzdW1tYXJ5KSB7XG4gICAgICB0aGlzLl9sb2FkU3VtbWFyeUZpbGUoc3RhdGljU3ltYm9sLmZpbGVQYXRoKTtcbiAgICAgIHN1bW1hcnkgPSB0aGlzLnN1bW1hcnlDYWNoZS5nZXQoc3RhdGljU3ltYm9sKSE7XG4gICAgfVxuICAgIHJldHVybiAocm9vdFN5bWJvbCA9PT0gc3RhdGljU3ltYm9sICYmIHN1bW1hcnkpIHx8IG51bGw7XG4gIH1cblxuICBnZXRTeW1ib2xzT2YoZmlsZVBhdGg6IHN0cmluZyk6IFN0YXRpY1N5bWJvbFtdfG51bGwge1xuICAgIGlmICh0aGlzLl9sb2FkU3VtbWFyeUZpbGUoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN1bW1hcnlDYWNoZS5rZXlzKCkpLmZpbHRlcigoc3ltYm9sKSA9PiBzeW1ib2wuZmlsZVBhdGggPT09IGZpbGVQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRJbXBvcnRBcyhzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IFN0YXRpY1N5bWJvbCB7XG4gICAgc3RhdGljU3ltYm9sLmFzc2VydE5vTWVtYmVycygpO1xuICAgIHJldHVybiB0aGlzLmltcG9ydEFzLmdldChzdGF0aWNTeW1ib2wpITtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGZpbGUgcGF0aCB0byBhIG1vZHVsZSBuYW1lIHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gYGltcG9ydGAuXG4gICAqL1xuICBnZXRLbm93bk1vZHVsZU5hbWUoaW1wb3J0ZWRGaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLmtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzLmdldChpbXBvcnRlZEZpbGVQYXRoKSB8fCBudWxsO1xuICB9XG5cbiAgYWRkU3VtbWFyeShzdW1tYXJ5OiBTdW1tYXJ5PFN0YXRpY1N5bWJvbD4pIHtcbiAgICB0aGlzLnN1bW1hcnlDYWNoZS5zZXQoc3VtbWFyeS5zeW1ib2wsIHN1bW1hcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZFN1bW1hcnlGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgaGFzU3VtbWFyeSA9IHRoaXMubG9hZGVkRmlsZVBhdGhzLmdldChmaWxlUGF0aCk7XG4gICAgaWYgKGhhc1N1bW1hcnkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGhhc1N1bW1hcnk7XG4gICAgfVxuICAgIGxldCBqc29uOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuaXNMaWJyYXJ5RmlsZShmaWxlUGF0aCkpIHtcbiAgICAgIGNvbnN0IHN1bW1hcnlGaWxlUGF0aCA9IHN1bW1hcnlGaWxlTmFtZShmaWxlUGF0aCk7XG4gICAgICB0cnkge1xuICAgICAgICBqc29uID0gdGhpcy5ob3N0LmxvYWRTdW1tYXJ5KHN1bW1hcnlGaWxlUGF0aCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGxvYWRpbmcgc3VtbWFyeSBmaWxlICR7c3VtbWFyeUZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgICBoYXNTdW1tYXJ5ID0ganNvbiAhPSBudWxsO1xuICAgIHRoaXMubG9hZGVkRmlsZVBhdGhzLnNldChmaWxlUGF0aCwgaGFzU3VtbWFyeSk7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIGNvbnN0IHttb2R1bGVOYW1lLCBzdW1tYXJpZXMsIGltcG9ydEFzfSA9XG4gICAgICAgICAgZGVzZXJpYWxpemVTdW1tYXJpZXModGhpcy5zdGF0aWNTeW1ib2xDYWNoZSwgdGhpcywgZmlsZVBhdGgsIGpzb24pO1xuICAgICAgc3VtbWFyaWVzLmZvckVhY2goKHN1bW1hcnkpID0+IHRoaXMuc3VtbWFyeUNhY2hlLnNldChzdW1tYXJ5LnN5bWJvbCwgc3VtbWFyeSkpO1xuICAgICAgaWYgKG1vZHVsZU5hbWUpIHtcbiAgICAgICAgdGhpcy5rbm93bkZpbGVOYW1lVG9Nb2R1bGVOYW1lcy5zZXQoZmlsZVBhdGgsIG1vZHVsZU5hbWUpO1xuICAgICAgfVxuICAgICAgaW1wb3J0QXMuZm9yRWFjaCgoaW1wb3J0QXMpID0+IHtcbiAgICAgICAgdGhpcy5pbXBvcnRBcy5zZXQoaW1wb3J0QXMuc3ltYm9sLCBpbXBvcnRBcy5pbXBvcnRBcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc1N1bW1hcnk7XG4gIH1cbn1cbiJdfQ==