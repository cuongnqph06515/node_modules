/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MissingTranslationStrategy } from '../core';
import { HtmlParser } from '../ml_parser/html_parser';
import { I18nError } from './parse_util';
import { escapeXml } from './serializers/xml_helper';
/**
 * A container for translated messages
 */
export class TranslationBundle {
    constructor(_i18nNodesByMsgId = {}, locale, digest, mapperFactory, missingTranslationStrategy = MissingTranslationStrategy.Warning, console) {
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this.digest = digest;
        this.mapperFactory = mapperFactory;
        this._i18nToHtml = new I18nToHtmlVisitor(_i18nNodesByMsgId, locale, digest, mapperFactory, missingTranslationStrategy, console);
    }
    // Creates a `TranslationBundle` by parsing the given `content` with the `serializer`.
    static load(content, url, serializer, missingTranslationStrategy, console) {
        const { locale, i18nNodesByMsgId } = serializer.load(content, url);
        const digestFn = (m) => serializer.digest(m);
        const mapperFactory = (m) => serializer.createNameMapper(m);
        return new TranslationBundle(i18nNodesByMsgId, locale, digestFn, mapperFactory, missingTranslationStrategy, console);
    }
    // Returns the translation as HTML nodes from the given source message.
    get(srcMsg) {
        const html = this._i18nToHtml.convert(srcMsg);
        if (html.errors.length) {
            throw new Error(html.errors.join('\n'));
        }
        return html.nodes;
    }
    has(srcMsg) {
        return this.digest(srcMsg) in this._i18nNodesByMsgId;
    }
}
class I18nToHtmlVisitor {
    constructor(_i18nNodesByMsgId = {}, _locale, _digest, _mapperFactory, _missingTranslationStrategy, _console) {
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this._locale = _locale;
        this._digest = _digest;
        this._mapperFactory = _mapperFactory;
        this._missingTranslationStrategy = _missingTranslationStrategy;
        this._console = _console;
        this._contextStack = [];
        this._errors = [];
    }
    convert(srcMsg) {
        this._contextStack.length = 0;
        this._errors.length = 0;
        // i18n to text
        const text = this._convertToText(srcMsg);
        // text to html
        const url = srcMsg.nodes[0].sourceSpan.start.file.url;
        const html = new HtmlParser().parse(text, url, { tokenizeExpansionForms: true });
        return {
            nodes: html.rootNodes,
            errors: [...this._errors, ...html.errors],
        };
    }
    visitText(text, context) {
        // `convert()` uses an `HtmlParser` to return `html.Node`s
        // we should then make sure that any special characters are escaped
        return escapeXml(text.value);
    }
    visitContainer(container, context) {
        return container.children.map(n => n.visit(this)).join('');
    }
    visitIcu(icu, context) {
        const cases = Object.keys(icu.cases).map(k => `${k} {${icu.cases[k].visit(this)}}`);
        // TODO(vicb): Once all format switch to using expression placeholders
        // we should throw when the placeholder is not in the source message
        const exp = this._srcMsg.placeholders.hasOwnProperty(icu.expression) ?
            this._srcMsg.placeholders[icu.expression] :
            icu.expression;
        return `{${exp}, ${icu.type}, ${cases.join(' ')}}`;
    }
    visitPlaceholder(ph, context) {
        const phName = this._mapper(ph.name);
        if (this._srcMsg.placeholders.hasOwnProperty(phName)) {
            return this._srcMsg.placeholders[phName];
        }
        if (this._srcMsg.placeholderToMessage.hasOwnProperty(phName)) {
            return this._convertToText(this._srcMsg.placeholderToMessage[phName]);
        }
        this._addError(ph, `Unknown placeholder "${ph.name}"`);
        return '';
    }
    // Loaded message contains only placeholders (vs tag and icu placeholders).
    // However when a translation can not be found, we need to serialize the source message
    // which can contain tag placeholders
    visitTagPlaceholder(ph, context) {
        const tag = `${ph.tag}`;
        const attrs = Object.keys(ph.attrs).map(name => `${name}="${ph.attrs[name]}"`).join(' ');
        if (ph.isVoid) {
            return `<${tag} ${attrs}/>`;
        }
        const children = ph.children.map((c) => c.visit(this)).join('');
        return `<${tag} ${attrs}>${children}</${tag}>`;
    }
    // Loaded message contains only placeholders (vs tag and icu placeholders).
    // However when a translation can not be found, we need to serialize the source message
    // which can contain tag placeholders
    visitIcuPlaceholder(ph, context) {
        // An ICU placeholder references the source message to be serialized
        return this._convertToText(this._srcMsg.placeholderToMessage[ph.name]);
    }
    /**
     * Convert a source message to a translated text string:
     * - text nodes are replaced with their translation,
     * - placeholders are replaced with their content,
     * - ICU nodes are converted to ICU expressions.
     */
    _convertToText(srcMsg) {
        const id = this._digest(srcMsg);
        const mapper = this._mapperFactory ? this._mapperFactory(srcMsg) : null;
        let nodes;
        this._contextStack.push({ msg: this._srcMsg, mapper: this._mapper });
        this._srcMsg = srcMsg;
        if (this._i18nNodesByMsgId.hasOwnProperty(id)) {
            // When there is a translation use its nodes as the source
            // And create a mapper to convert serialized placeholder names to internal names
            nodes = this._i18nNodesByMsgId[id];
            this._mapper = (name) => mapper ? mapper.toInternalName(name) : name;
        }
        else {
            // When no translation has been found
            // - report an error / a warning / nothing,
            // - use the nodes from the original message
            // - placeholders are already internal and need no mapper
            if (this._missingTranslationStrategy === MissingTranslationStrategy.Error) {
                const ctx = this._locale ? ` for locale "${this._locale}"` : '';
                this._addError(srcMsg.nodes[0], `Missing translation for message "${id}"${ctx}`);
            }
            else if (this._console &&
                this._missingTranslationStrategy === MissingTranslationStrategy.Warning) {
                const ctx = this._locale ? ` for locale "${this._locale}"` : '';
                this._console.warn(`Missing translation for message "${id}"${ctx}`);
            }
            nodes = srcMsg.nodes;
            this._mapper = (name) => name;
        }
        const text = nodes.map(node => node.visit(this)).join('');
        const context = this._contextStack.pop();
        this._srcMsg = context.msg;
        this._mapper = context.mapper;
        return text;
    }
    _addError(el, msg) {
        this._errors.push(new I18nError(el.sourceSpan, msg));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2kxOG4vdHJhbnNsYXRpb25fYnVuZGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVuRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFJcEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBRzVCLFlBQ1ksb0JBQW9ELEVBQUUsRUFBRSxNQUFtQixFQUM1RSxNQUFtQyxFQUNuQyxhQUFzRCxFQUM3RCw2QkFBeUQsMEJBQTBCLENBQUMsT0FBTyxFQUMzRixPQUFpQjtRQUpULHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUM7UUFDdkQsV0FBTSxHQUFOLE1BQU0sQ0FBNkI7UUFDbkMsa0JBQWEsR0FBYixhQUFhLENBQXlDO1FBRy9ELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxpQkFBaUIsQ0FDcEMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFjLEVBQUUsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELHNGQUFzRjtJQUN0RixNQUFNLENBQUMsSUFBSSxDQUNQLE9BQWUsRUFBRSxHQUFXLEVBQUUsVUFBc0IsRUFDcEQsMEJBQXNELEVBQ3RELE9BQWlCO1FBQ25CLE1BQU0sRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRSxNQUFNLFFBQVEsR0FBRyxDQUFDLENB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LElBQ0gsSUFBSSxDQUFDLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLDJCQUEyQixLQUFLLDBCQUEwQixDQUFDLE9BQU8sRUFBRTtnQkFDM0UsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDckU7WUFDRCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDdkM7UUFDRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sU0FBUyxDQUFDLEVBQWEsRUFBRSxHQUFXO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0ICogYXMgaHRtbCBmcm9tICcuLi9tbF9wYXJzZXIvYXN0JztcbmltcG9ydCB7SHRtbFBhcnNlcn0gZnJvbSAnLi4vbWxfcGFyc2VyL2h0bWxfcGFyc2VyJztcbmltcG9ydCB7Q29uc29sZX0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCAqIGFzIGkxOG4gZnJvbSAnLi9pMThuX2FzdCc7XG5pbXBvcnQge0kxOG5FcnJvcn0gZnJvbSAnLi9wYXJzZV91dGlsJztcbmltcG9ydCB7UGxhY2Vob2xkZXJNYXBwZXIsIFNlcmlhbGl6ZXJ9IGZyb20gJy4vc2VyaWFsaXplcnMvc2VyaWFsaXplcic7XG5pbXBvcnQge2VzY2FwZVhtbH0gZnJvbSAnLi9zZXJpYWxpemVycy94bWxfaGVscGVyJztcblxuXG4vKipcbiAqIEEgY29udGFpbmVyIGZvciB0cmFuc2xhdGVkIG1lc3NhZ2VzXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gIHByaXZhdGUgX2kxOG5Ub0h0bWw6IEkxOG5Ub0h0bWxWaXNpdG9yO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfaTE4bk5vZGVzQnlNc2dJZDoge1ttc2dJZDogc3RyaW5nXTogaTE4bi5Ob2RlW119ID0ge30sIGxvY2FsZTogc3RyaW5nfG51bGwsXG4gICAgICBwdWJsaWMgZGlnZXN0OiAobTogaTE4bi5NZXNzYWdlKSA9PiBzdHJpbmcsXG4gICAgICBwdWJsaWMgbWFwcGVyRmFjdG9yeT86IChtOiBpMThuLk1lc3NhZ2UpID0+IFBsYWNlaG9sZGVyTWFwcGVyLFxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3k6IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5ID0gTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuV2FybmluZyxcbiAgICAgIGNvbnNvbGU/OiBDb25zb2xlKSB7XG4gICAgdGhpcy5faTE4blRvSHRtbCA9IG5ldyBJMThuVG9IdG1sVmlzaXRvcihcbiAgICAgICAgX2kxOG5Ob2Rlc0J5TXNnSWQsIGxvY2FsZSwgZGlnZXN0LCBtYXBwZXJGYWN0b3J5ISwgbWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3ksIGNvbnNvbGUpO1xuICB9XG5cbiAgLy8gQ3JlYXRlcyBhIGBUcmFuc2xhdGlvbkJ1bmRsZWAgYnkgcGFyc2luZyB0aGUgZ2l2ZW4gYGNvbnRlbnRgIHdpdGggdGhlIGBzZXJpYWxpemVyYC5cbiAgc3RhdGljIGxvYWQoXG4gICAgICBjb250ZW50OiBzdHJpbmcsIHVybDogc3RyaW5nLCBzZXJpYWxpemVyOiBTZXJpYWxpemVyLFxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3k6IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5LFxuICAgICAgY29uc29sZT86IENvbnNvbGUpOiBUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgY29uc3Qge2xvY2FsZSwgaTE4bk5vZGVzQnlNc2dJZH0gPSBzZXJpYWxpemVyLmxvYWQoY29udGVudCwgdXJsKTtcbiAgICBjb25zdCBkaWdlc3RGbiA9IChtOiBpMThuLk1lc3NhZ2UpID0+IHNlcmlhbGl6ZXIuZGlnZXN0KG0pO1xuICAgIGNvbnN0IG1hcHBlckZhY3RvcnkgPSAobTogaTE4bi5NZXNzYWdlKSA9PiBzZXJpYWxpemVyLmNyZWF0ZU5hbWVNYXBwZXIobSkhO1xuICAgIHJldHVybiBuZXcgVHJhbnNsYXRpb25CdW5kbGUoXG4gICAgICAgIGkxOG5Ob2Rlc0J5TXNnSWQsIGxvY2FsZSwgZGlnZXN0Rm4sIG1hcHBlckZhY3RvcnksIG1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5LCBjb25zb2xlKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIGFzIEhUTUwgbm9kZXMgZnJvbSB0aGUgZ2l2ZW4gc291cmNlIG1lc3NhZ2UuXG4gIGdldChzcmNNc2c6IGkxOG4uTWVzc2FnZSk6IGh0bWwuTm9kZVtdIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5faTE4blRvSHRtbC5jb252ZXJ0KHNyY01zZyk7XG5cbiAgICBpZiAoaHRtbC5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoaHRtbC5lcnJvcnMuam9pbignXFxuJykpO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sLm5vZGVzO1xuICB9XG5cbiAgaGFzKHNyY01zZzogaTE4bi5NZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlnZXN0KHNyY01zZykgaW4gdGhpcy5faTE4bk5vZGVzQnlNc2dJZDtcbiAgfVxufVxuXG5jbGFzcyBJMThuVG9IdG1sVmlzaXRvciBpbXBsZW1lbnRzIGkxOG4uVmlzaXRvciB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9zcmNNc2chOiBpMThuLk1lc3NhZ2U7XG4gIHByaXZhdGUgX2NvbnRleHRTdGFjazoge21zZzogaTE4bi5NZXNzYWdlLCBtYXBwZXI6IChuYW1lOiBzdHJpbmcpID0+IHN0cmluZ31bXSA9IFtdO1xuICBwcml2YXRlIF9lcnJvcnM6IEkxOG5FcnJvcltdID0gW107XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9tYXBwZXIhOiAobmFtZTogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9pMThuTm9kZXNCeU1zZ0lkOiB7W21zZ0lkOiBzdHJpbmddOiBpMThuLk5vZGVbXX0gPSB7fSwgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmd8bnVsbCxcbiAgICAgIHByaXZhdGUgX2RpZ2VzdDogKG06IGkxOG4uTWVzc2FnZSkgPT4gc3RyaW5nLFxuICAgICAgcHJpdmF0ZSBfbWFwcGVyRmFjdG9yeTogKG06IGkxOG4uTWVzc2FnZSkgPT4gUGxhY2Vob2xkZXJNYXBwZXIsXG4gICAgICBwcml2YXRlIF9taXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneTogTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3ksIHByaXZhdGUgX2NvbnNvbGU/OiBDb25zb2xlKSB7XG4gIH1cblxuICBjb252ZXJ0KHNyY01zZzogaTE4bi5NZXNzYWdlKToge25vZGVzOiBodG1sLk5vZGVbXSwgZXJyb3JzOiBJMThuRXJyb3JbXX0ge1xuICAgIHRoaXMuX2NvbnRleHRTdGFjay5sZW5ndGggPSAwO1xuICAgIHRoaXMuX2Vycm9ycy5sZW5ndGggPSAwO1xuXG4gICAgLy8gaTE4biB0byB0ZXh0XG4gICAgY29uc3QgdGV4dCA9IHRoaXMuX2NvbnZlcnRUb1RleHQoc3JjTXNnKTtcblxuICAgIC8vIHRleHQgdG8gaHRtbFxuICAgIGNvbnN0IHVybCA9IHNyY01zZy5ub2Rlc1swXS5zb3VyY2VTcGFuLnN0YXJ0LmZpbGUudXJsO1xuICAgIGNvbnN0IGh0bWwgPSBuZXcgSHRtbFBhcnNlcigpLnBhcnNlKHRleHQsIHVybCwge3Rva2VuaXplRXhwYW5zaW9uRm9ybXM6IHRydWV9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBub2RlczogaHRtbC5yb290Tm9kZXMsXG4gICAgICBlcnJvcnM6IFsuLi50aGlzLl9lcnJvcnMsIC4uLmh0bWwuZXJyb3JzXSxcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IGkxOG4uVGV4dCwgY29udGV4dD86IGFueSk6IHN0cmluZyB7XG4gICAgLy8gYGNvbnZlcnQoKWAgdXNlcyBhbiBgSHRtbFBhcnNlcmAgdG8gcmV0dXJuIGBodG1sLk5vZGVgc1xuICAgIC8vIHdlIHNob3VsZCB0aGVuIG1ha2Ugc3VyZSB0aGF0IGFueSBzcGVjaWFsIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWRcbiAgICByZXR1cm4gZXNjYXBlWG1sKHRleHQudmFsdWUpO1xuICB9XG5cbiAgdmlzaXRDb250YWluZXIoY29udGFpbmVyOiBpMThuLkNvbnRhaW5lciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5jaGlsZHJlbi5tYXAobiA9PiBuLnZpc2l0KHRoaXMpKS5qb2luKCcnKTtcbiAgfVxuXG4gIHZpc2l0SWN1KGljdTogaTE4bi5JY3UsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGNhc2VzID0gT2JqZWN0LmtleXMoaWN1LmNhc2VzKS5tYXAoayA9PiBgJHtrfSB7JHtpY3UuY2FzZXNba10udmlzaXQodGhpcyl9fWApO1xuXG4gICAgLy8gVE9ETyh2aWNiKTogT25jZSBhbGwgZm9ybWF0IHN3aXRjaCB0byB1c2luZyBleHByZXNzaW9uIHBsYWNlaG9sZGVyc1xuICAgIC8vIHdlIHNob3VsZCB0aHJvdyB3aGVuIHRoZSBwbGFjZWhvbGRlciBpcyBub3QgaW4gdGhlIHNvdXJjZSBtZXNzYWdlXG4gICAgY29uc3QgZXhwID0gdGhpcy5fc3JjTXNnLnBsYWNlaG9sZGVycy5oYXNPd25Qcm9wZXJ0eShpY3UuZXhwcmVzc2lvbikgP1xuICAgICAgICB0aGlzLl9zcmNNc2cucGxhY2Vob2xkZXJzW2ljdS5leHByZXNzaW9uXSA6XG4gICAgICAgIGljdS5leHByZXNzaW9uO1xuXG4gICAgcmV0dXJuIGB7JHtleHB9LCAke2ljdS50eXBlfSwgJHtjYXNlcy5qb2luKCcgJyl9fWA7XG4gIH1cblxuICB2aXNpdFBsYWNlaG9sZGVyKHBoOiBpMThuLlBsYWNlaG9sZGVyLCBjb250ZXh0PzogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBwaE5hbWUgPSB0aGlzLl9tYXBwZXIocGgubmFtZSk7XG4gICAgaWYgKHRoaXMuX3NyY01zZy5wbGFjZWhvbGRlcnMuaGFzT3duUHJvcGVydHkocGhOYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NyY01zZy5wbGFjZWhvbGRlcnNbcGhOYW1lXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3JjTXNnLnBsYWNlaG9sZGVyVG9NZXNzYWdlLmhhc093blByb3BlcnR5KHBoTmFtZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0VG9UZXh0KHRoaXMuX3NyY01zZy5wbGFjZWhvbGRlclRvTWVzc2FnZVtwaE5hbWVdKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRFcnJvcihwaCwgYFVua25vd24gcGxhY2Vob2xkZXIgXCIke3BoLm5hbWV9XCJgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvLyBMb2FkZWQgbWVzc2FnZSBjb250YWlucyBvbmx5IHBsYWNlaG9sZGVycyAodnMgdGFnIGFuZCBpY3UgcGxhY2Vob2xkZXJzKS5cbiAgLy8gSG93ZXZlciB3aGVuIGEgdHJhbnNsYXRpb24gY2FuIG5vdCBiZSBmb3VuZCwgd2UgbmVlZCB0byBzZXJpYWxpemUgdGhlIHNvdXJjZSBtZXNzYWdlXG4gIC8vIHdoaWNoIGNhbiBjb250YWluIHRhZyBwbGFjZWhvbGRlcnNcbiAgdmlzaXRUYWdQbGFjZWhvbGRlcihwaDogaTE4bi5UYWdQbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHN0cmluZyB7XG4gICAgY29uc3QgdGFnID0gYCR7cGgudGFnfWA7XG4gICAgY29uc3QgYXR0cnMgPSBPYmplY3Qua2V5cyhwaC5hdHRycykubWFwKG5hbWUgPT4gYCR7bmFtZX09XCIke3BoLmF0dHJzW25hbWVdfVwiYCkuam9pbignICcpO1xuICAgIGlmIChwaC5pc1ZvaWQpIHtcbiAgICAgIHJldHVybiBgPCR7dGFnfSAke2F0dHJzfS8+YDtcbiAgICB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSBwaC5jaGlsZHJlbi5tYXAoKGM6IGkxOG4uTm9kZSkgPT4gYy52aXNpdCh0aGlzKSkuam9pbignJyk7XG4gICAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cnN9PiR7Y2hpbGRyZW59PC8ke3RhZ30+YDtcbiAgfVxuXG4gIC8vIExvYWRlZCBtZXNzYWdlIGNvbnRhaW5zIG9ubHkgcGxhY2Vob2xkZXJzICh2cyB0YWcgYW5kIGljdSBwbGFjZWhvbGRlcnMpLlxuICAvLyBIb3dldmVyIHdoZW4gYSB0cmFuc2xhdGlvbiBjYW4gbm90IGJlIGZvdW5kLCB3ZSBuZWVkIHRvIHNlcmlhbGl6ZSB0aGUgc291cmNlIG1lc3NhZ2VcbiAgLy8gd2hpY2ggY2FuIGNvbnRhaW4gdGFnIHBsYWNlaG9sZGVyc1xuICB2aXNpdEljdVBsYWNlaG9sZGVyKHBoOiBpMThuLkljdVBsYWNlaG9sZGVyLCBjb250ZXh0PzogYW55KTogc3RyaW5nIHtcbiAgICAvLyBBbiBJQ1UgcGxhY2Vob2xkZXIgcmVmZXJlbmNlcyB0aGUgc291cmNlIG1lc3NhZ2UgdG8gYmUgc2VyaWFsaXplZFxuICAgIHJldHVybiB0aGlzLl9jb252ZXJ0VG9UZXh0KHRoaXMuX3NyY01zZy5wbGFjZWhvbGRlclRvTWVzc2FnZVtwaC5uYW1lXSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIHNvdXJjZSBtZXNzYWdlIHRvIGEgdHJhbnNsYXRlZCB0ZXh0IHN0cmluZzpcbiAgICogLSB0ZXh0IG5vZGVzIGFyZSByZXBsYWNlZCB3aXRoIHRoZWlyIHRyYW5zbGF0aW9uLFxuICAgKiAtIHBsYWNlaG9sZGVycyBhcmUgcmVwbGFjZWQgd2l0aCB0aGVpciBjb250ZW50LFxuICAgKiAtIElDVSBub2RlcyBhcmUgY29udmVydGVkIHRvIElDVSBleHByZXNzaW9ucy5cbiAgICovXG4gIHByaXZhdGUgX2NvbnZlcnRUb1RleHQoc3JjTXNnOiBpMThuLk1lc3NhZ2UpOiBzdHJpbmcge1xuICAgIGNvbnN0IGlkID0gdGhpcy5fZGlnZXN0KHNyY01zZyk7XG4gICAgY29uc3QgbWFwcGVyID0gdGhpcy5fbWFwcGVyRmFjdG9yeSA/IHRoaXMuX21hcHBlckZhY3Rvcnkoc3JjTXNnKSA6IG51bGw7XG4gICAgbGV0IG5vZGVzOiBpMThuLk5vZGVbXTtcblxuICAgIHRoaXMuX2NvbnRleHRTdGFjay5wdXNoKHttc2c6IHRoaXMuX3NyY01zZywgbWFwcGVyOiB0aGlzLl9tYXBwZXJ9KTtcbiAgICB0aGlzLl9zcmNNc2cgPSBzcmNNc2c7XG5cbiAgICBpZiAodGhpcy5faTE4bk5vZGVzQnlNc2dJZC5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgYSB0cmFuc2xhdGlvbiB1c2UgaXRzIG5vZGVzIGFzIHRoZSBzb3VyY2VcbiAgICAgIC8vIEFuZCBjcmVhdGUgYSBtYXBwZXIgdG8gY29udmVydCBzZXJpYWxpemVkIHBsYWNlaG9sZGVyIG5hbWVzIHRvIGludGVybmFsIG5hbWVzXG4gICAgICBub2RlcyA9IHRoaXMuX2kxOG5Ob2Rlc0J5TXNnSWRbaWRdO1xuICAgICAgdGhpcy5fbWFwcGVyID0gKG5hbWU6IHN0cmluZykgPT4gbWFwcGVyID8gbWFwcGVyLnRvSW50ZXJuYWxOYW1lKG5hbWUpISA6IG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdoZW4gbm8gdHJhbnNsYXRpb24gaGFzIGJlZW4gZm91bmRcbiAgICAgIC8vIC0gcmVwb3J0IGFuIGVycm9yIC8gYSB3YXJuaW5nIC8gbm90aGluZyxcbiAgICAgIC8vIC0gdXNlIHRoZSBub2RlcyBmcm9tIHRoZSBvcmlnaW5hbCBtZXNzYWdlXG4gICAgICAvLyAtIHBsYWNlaG9sZGVycyBhcmUgYWxyZWFkeSBpbnRlcm5hbCBhbmQgbmVlZCBubyBtYXBwZXJcbiAgICAgIGlmICh0aGlzLl9taXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSA9PT0gTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuRXJyb3IpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fbG9jYWxlID8gYCBmb3IgbG9jYWxlIFwiJHt0aGlzLl9sb2NhbGV9XCJgIDogJyc7XG4gICAgICAgIHRoaXMuX2FkZEVycm9yKHNyY01zZy5ub2Rlc1swXSwgYE1pc3NpbmcgdHJhbnNsYXRpb24gZm9yIG1lc3NhZ2UgXCIke2lkfVwiJHtjdHh9YCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMuX2NvbnNvbGUgJiZcbiAgICAgICAgICB0aGlzLl9taXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSA9PT0gTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuV2FybmluZykge1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9sb2NhbGUgPyBgIGZvciBsb2NhbGUgXCIke3RoaXMuX2xvY2FsZX1cImAgOiAnJztcbiAgICAgICAgdGhpcy5fY29uc29sZS53YXJuKGBNaXNzaW5nIHRyYW5zbGF0aW9uIGZvciBtZXNzYWdlIFwiJHtpZH1cIiR7Y3R4fWApO1xuICAgICAgfVxuICAgICAgbm9kZXMgPSBzcmNNc2cubm9kZXM7XG4gICAgICB0aGlzLl9tYXBwZXIgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gbm9kZXMubWFwKG5vZGUgPT4gbm9kZS52aXNpdCh0aGlzKSkuam9pbignJyk7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2NvbnRleHRTdGFjay5wb3AoKSE7XG4gICAgdGhpcy5fc3JjTXNnID0gY29udGV4dC5tc2c7XG4gICAgdGhpcy5fbWFwcGVyID0gY29udGV4dC5tYXBwZXI7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBwcml2YXRlIF9hZGRFcnJvcihlbDogaTE4bi5Ob2RlLCBtc2c6IHN0cmluZykge1xuICAgIHRoaXMuX2Vycm9ycy5wdXNoKG5ldyBJMThuRXJyb3IoZWwuc291cmNlU3BhbiwgbXNnKSk7XG4gIH1cbn1cbiJdfQ==