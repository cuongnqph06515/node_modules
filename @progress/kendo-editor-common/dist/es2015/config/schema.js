import { tableNodes } from 'prosemirror-tables';
const hole = 0;
const blockquoteDOM = ['blockquote', hole], hrDOM = ['hr'], preDOM = ['pre', ['code', hole]];
const olDOM = ['ol', 0], ulDOM = ['ul', 0], liDOM = ['li', 0];
/**
 * @hidden
 */
const getAttributes = (dom) => {
    const result = {};
    let attributes = dom.attributes, attr;
    for (let i = 0; i < attributes.length; i++) {
        attr = attributes[i];
        result[attr.name] = attr.value;
    }
    return result;
};
/**
 * @hidden
 */
const commonAttributes = () => {
    return {
        style: { default: null },
        class: { default: null },
        id: { default: null }
    };
};
/**
 * @hidden
 */
const hasAttrs = (attrs, exclude) => {
    for (let attr in attrs) {
        if (attr && attrs[attr] !== null && attr !== exclude) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
const getAttrs = (attrs, exclude) => {
    const result = {};
    for (let attr in attrs) {
        if (attr && attrs[attr] !== null && attr !== exclude) {
            result[attr] = attrs[attr];
        }
    }
    return result;
};
/**
 * @hidden
 */
const tagMark = tag => {
    return {
        [tag]: {
            name: tag,
            inclusive: true,
            parseDOM: [{ tag: tag }],
            toDOM: () => [tag, hole]
        }
    };
};
/**
 * @hidden
 */
const marks = Object.assign({ 
    // :: MarkSpec A link. Has `href` and `title` attributes. `title`
    // defaults to the empty string. Rendered and parsed as an `<a>`
    // element.
    link: {
        attrs: Object.assign({}, commonAttributes(), { href: { default: null }, target: { default: null }, title: { default: null } }),
        inclusive: false,
        parseDOM: [{ tag: 'a', getAttrs: getAttributes }],
        toDOM: (node) => ['a', getAttrs(node.attrs), hole]
    } }, tagMark('strong'), tagMark('b'), tagMark('em'), tagMark('i'), tagMark('u'), tagMark('del'), tagMark('sub'), tagMark('sup'), tagMark('code'), { style: {
        attrs: Object.assign({}, commonAttributes()),
        parseDOM: [{
                tag: 'span',
                getAttrs: getAttributes
            }],
        toDOM: node => hasAttrs(node.attrs) ?
            ['span', getAttrs(node.attrs), hole] : ['span', hole]
    } });
/**
 * @hidden
 */
const nodes = Object.assign({ 
    // :: NodeSpec The top level document node.
    doc: {
        content: 'block+'
    }, 
    // :: NodeSpec A plain paragraph textblock. Represented in the DOM
    // as a `<p>` element.
    paragraph: {
        content: 'inline*',
        group: 'block',
        attrs: Object.assign({}, commonAttributes()),
        parseDOM: [{
                tag: 'p',
                getAttrs: getAttributes
            }],
        toDOM: node => hasAttrs(node.attrs) ? ['p', getAttrs(node.attrs), hole] : ['p', hole]
    }, div: {
        // Uncaught SyntaxError: Mixing inline and block content (in content expression '(block | inline)*')
        // content: '(block | inline)*',
        content: 'block*',
        group: 'block',
        attrs: Object.assign({}, commonAttributes()),
        parseDOM: [{
                tag: 'div',
                getAttrs: getAttributes
            }],
        toDOM: node => hasAttrs(node.attrs) ? ['div', getAttrs(node.attrs), hole] : ['div', hole]
    }, 
    // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
    blockquote: {
        attrs: Object.assign({}, commonAttributes()),
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [{ tag: 'blockquote' }],
        toDOM: () => blockquoteDOM
    }, 
    // :: NodeSpec A horizontal rule (`<hr>`).
    horizontal_rule: {
        group: 'block',
        parseDOM: [{ tag: 'hr' }],
        toDOM: () => hrDOM
    }, 
    // :: NodeSpec A heading textblock, with a `level` attribute that
    // has to hold the numbers from 1 to 6. Parsed and serialized as `<h1>` to
    // `<h6>` elements.
    heading: {
        attrs: Object.assign({}, commonAttributes(), { level: { default: 1 } }),
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
            { tag: 'h1', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 1 })) },
            { tag: 'h2', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 2 })) },
            { tag: 'h3', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 3 })) },
            { tag: 'h4', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 4 })) },
            { tag: 'h5', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 5 })) },
            { tag: 'h6', getAttrs: node => (Object.assign({}, getAttributes(node), { level: 6 })) }
        ],
        toDOM: node => hasAttrs(node.attrs, 'level') ?
            ['h' + node.attrs.level, getAttrs(node.attrs, 'level'), hole] :
            ['h' + node.attrs.level, hole]
    }, 
    // :: NodeSpec A code listing. Disallows marks or non-text inline
    // nodes by default. Represented as a `<pre>` element with a
    // `<code>` element inside it.
    code_block: {
        content: 'text*',
        marks: '',
        group: 'block',
        code: true,
        defining: true,
        parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
        toDOM: () => preDOM
    }, 
    // :: NodeSpec The text node.
    text: {
        inline: true,
        group: 'inline'
    }, 
    // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
    // `alt`, and `href` attributes. The latter two default to an empty
    // string.
    image: {
        inline: true,
        attrs: Object.assign({ src: { default: null }, alt: { default: null }, title: { default: null }, width: { default: null }, height: { default: null } }, commonAttributes()),
        group: 'inline',
        draggable: true,
        parseDOM: [{ tag: 'img', getAttrs: getAttributes }],
        toDOM: node => hasAttrs(node.attrs) ? ['img', getAttrs(node.attrs)] : ['img']
    }, 
    // :: NodeSpec A hard line break represented in the DOM as a `<br>` element.
    hard_break: {
        inline: true,
        attrs: Object.assign({}, commonAttributes()),
        group: 'inline',
        selectable: false,
        parseDOM: [{
                tag: 'br',
                getAttrs: getAttributes
            }],
        toDOM: node => hasAttrs(node.attrs) ? ['br', getAttrs(node.attrs)] : ['br']
    }, 
    // :: NodeSpec
    // An ordered list [node spec](#model.NodeSpec). Has a single
    // attribute, `order`, which determines the number at which the list
    // starts counting, and defaults to 1. Represented as an `<ol>`
    // element.
    ordered_list: {
        content: 'list_item+',
        group: 'block',
        attrs: Object.assign({}, commonAttributes(), { type: { default: null }, order: { default: 1 } }),
        parseDOM: [{ tag: 'ol', getAttrs: (dom) => {
                    return Object.assign({}, getAttributes(dom), { order: dom.hasAttribute('start') ? parseInt(dom.getAttribute('start') || '1', 10) : 1 });
                } }],
        toDOM: node => {
            return node.attrs.order === 1 ?
                (hasAttrs(node.attrs, 'order') ? ['ol', getAttrs(node.attrs, 'order'), hole] : olDOM) :
                ['ol', Object.assign({}, getAttrs(node.attrs, 'order'), { start: node.attrs.order }), hole];
        }
    }, 
    // :: NodeSpec
    // A bullet list node specification represented in the DOM as a `<ul>` element.
    bullet_list: {
        content: 'list_item+',
        group: 'block',
        attrs: Object.assign({}, commonAttributes()),
        parseDOM: [{ tag: 'ul', getAttrs: getAttributes }],
        toDOM: node => hasAttrs(node.attrs) ? ['ul', getAttrs(node.attrs), hole] : ulDOM
    }, 
    // :: NodeSpec
    // A list item (`<li>`) specification.
    list_item: {
        content: 'block*',
        attrs: Object.assign({}, commonAttributes()),
        parseDOM: [{ tag: 'li', getAttrs: getAttributes }],
        toDOM: node => hasAttrs(node.attrs) ? ['li', getAttrs(node.attrs), hole] : liDOM,
        defining: true
    } }, tableNodes({ tableGroup: 'block', cellContent: 'block+', cellAttributes: {} }));
export { nodes, marks };
