import { convertMsLists } from './listConvert';
/**
 * @hidden
 */
export const sanitize = (html) => {
    html = html.replace(/^[\s\S]+?<!--StartFragment-->\s*([\s\S]*?)\s*<!--EndFragment-->[\s\S]+$/, '$1');
    html = html.replace(/<\/?[ovw]:[^>]*?>/gi, ''); // MS elements, e.g. <o:p>, <w:sdtPr>, <v:
    html = html.replace(/<\\?\??xml[^>]*>/gi, ''); // XML namespaces
    html = html.replace(/<(?:link|meta) [^>]+?>/ig, '');
    html = html.replace(/<style[^>]*?>\s*<\/style>/ig, '');
    html = html.replace(/<\/?st1:.*?>/gi, '');
    html = html.replace(/<a name="[a-zA-Z0-9_]+">/gmi, '');
    html = html.replace(/v:shapes?="[^"]+"/ig, '');
    html = html.replace(/<!\[if !supportLists\]>/ig, '');
    html = html.replace(/<!\[endif\]>/ig, '');
    return html;
};
/**
 * @hidden
 */
export const removeComments = (html) => {
    return html.replace(/<!--[\s\S]+?-->/g, '');
};
/**
 * @hidden
 */
export const removeTag = (html, tagPattern) => {
    return html.replace(new RegExp('<\\/?(' + tagPattern + ')(?:\\s[^>]*?)?>', 'gi'), '');
};
/**
 * @hidden
 */
export const removeAttribute = (attr) => {
    if (attr.ownerElement) {
        attr.ownerElement.removeAttribute(attr.name);
    }
};
/**
 * @hidden
 */
export const sanitizeClassAttr = (attr) => {
    if (/^Mso/.test(attr.value)) {
        removeAttribute(attr);
    }
};
const stylesSplit = /\s*;\s*/;
const styleValueSplit = /\s*:\s*/;
/**
 * @hidden
 */
export const sanitizeStyleAttr = (attr) => {
    const styles = attr.value.split(stylesSplit).filter(st => Boolean(st));
    const element = attr.ownerElement;
    const supportedStyles = element.style;
    let result = '', name, value;
    styles.forEach(style => {
        [name, value] = style.split(styleValueSplit);
        if (supportedStyles[name] !== undefined) {
            result += `${name}: ${value}; `;
        }
    });
    result = result.trim();
    if (result) {
        attr.value = result;
    }
    else {
        removeAttribute(attr);
    }
};
const removeNode = (node) => {
    const parentNode = node.parentNode;
    if (parentNode) {
        while (node.firstChild) {
            parentNode.insertBefore(node.firstChild, node);
        }
        parentNode.removeChild(node);
    }
};
const sanitizeNode = (node, attributes) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
        for (let i = node.attributes.length - 1; i >= 0; i--) {
            const attr = node.attributes[i];
            if (attributes[attr.name]) {
                attributes[attr.name](attr);
            }
            else if (attributes['*']) {
                attributes['*'](attr);
            }
        }
        if (node.nodeName === 'SPAN' && node.attributes.length === 0) {
            removeNode(node);
        }
    }
};
/**
 * @hidden
 */
export const pasteCleanup = (html, settings) => {
    let result = html;
    if (settings.convertMsLists) {
        result = convertMsLists(result);
    }
    if (settings.stripTags) {
        result = removeTag(result, settings.stripTags);
    }
    if (settings.attributes) {
        const div = document.createElement('div');
        div.innerHTML = result;
        Array.from(div.querySelectorAll('*')).forEach(node => sanitizeNode(node, settings.attributes));
        result = div.innerHTML;
    }
    return result;
};
