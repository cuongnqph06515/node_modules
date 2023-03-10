/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getHtmlTagDefinition } from './html_tags';
import { Parser } from './parser';
export { ParseTreeResult, TreeError } from './parser';
export class HtmlParser extends Parser {
    constructor() {
        super(getHtmlTagDefinition);
    }
    parse(source, url, options) {
        return super.parse(source, url, options);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvbWxfcGFyc2VyL2h0bWxfcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVqRCxPQUFPLEVBQUMsTUFBTSxFQUFrQixNQUFNLFVBQVUsQ0FBQztBQUVqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVwRCxNQUFNLE9BQU8sVUFBVyxTQUFRLE1BQU07SUFDcEM7UUFDRSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQWMsRUFBRSxHQUFXLEVBQUUsT0FBeUI7UUFDMUQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dldEh0bWxUYWdEZWZpbml0aW9ufSBmcm9tICcuL2h0bWxfdGFncyc7XG5pbXBvcnQge1Rva2VuaXplT3B0aW9uc30gZnJvbSAnLi9sZXhlcic7XG5pbXBvcnQge1BhcnNlciwgUGFyc2VUcmVlUmVzdWx0fSBmcm9tICcuL3BhcnNlcic7XG5cbmV4cG9ydCB7UGFyc2VUcmVlUmVzdWx0LCBUcmVlRXJyb3J9IGZyb20gJy4vcGFyc2VyJztcblxuZXhwb3J0IGNsYXNzIEh0bWxQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihnZXRIdG1sVGFnRGVmaW5pdGlvbik7XG4gIH1cblxuICBwYXJzZShzb3VyY2U6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBUb2tlbml6ZU9wdGlvbnMpOiBQYXJzZVRyZWVSZXN1bHQge1xuICAgIHJldHVybiBzdXBlci5wYXJzZShzb3VyY2UsIHVybCwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==