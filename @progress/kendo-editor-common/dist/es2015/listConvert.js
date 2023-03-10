const msoListRegExp = /style=['"]?[^'"]*?mso-list:\s*[a-zA-Z]+(\d+)\s[a-zA-Z]+(\d+)\s(\w+)/gi;
const extractListLevels = (html) => {
    html = html.replace(msoListRegExp, (match, list, level) => {
        return `datalist="${list}" datalevel="${level}" ${match}`;
    });
    return html;
};
const isPartOfListItem = (element) => {
    return /^MsoListParagraph/.test(element.className);
};
const innerText = (node) => {
    let text = node.innerHTML;
    text = text.replace(/<!--(.|\s)*?-->/gi, '');
    text = text.replace(/<\/?[^>]+?\/?>/gm, '');
    return text;
};
const createList = (type, styleType) => {
    const list = document.createElement(type);
    list.style.listStyleType = styleType;
    return list;
};
const guessUnorderedListStyle = (symbol) => {
    if (/^[\u2022\u00b7\u00FC\u00D8\u002dv-]/.test(symbol)) {
        return null; // return "disc"; //default CSS value
    }
    else if (/^o/.test(symbol)) {
        return 'circle';
    }
    else {
        return 'square';
    }
};
const guessOrderedListStyle = (symbol) => {
    let type = null;
    if (!/^\d/.test(symbol)) {
        type = (/^[a-z]/.test(symbol) ? 'lower-' : 'upper-') +
            (/^[ivxlcdm]/i.test(symbol) ? 'roman' : 'alpha');
    }
    return type;
};
const mapListsCandidates = (nodes, groups) => {
    let group = [];
    Array.from(nodes).forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        let element = node;
        if (element.getAttribute('datalist')) {
            group.push(node);
            groups.add(group);
        }
        else if (isPartOfListItem(element) && group.length) {
            group.push(node);
        }
        else {
            group = [];
            if (element.nodeName === 'DIV') {
                mapListsCandidates(element.children, groups);
            }
            else if (element.nodeName === 'TABLE') {
                Array.from(element.querySelectorAll('td,th')).forEach(cell => {
                    mapListsCandidates(cell.children, groups);
                });
            }
        }
    });
};
const listTypes = (p) => {
    let html = p.innerHTML;
    let trimStartText = (t) => {
        return t.replace(/^(?:&nbsp;|[\u00a0\n\r\s])+/, '');
    };
    html = html.replace(/<\/?\w+[^>]*>/g, '').replace(/&nbsp;/g, '\u00a0');
    if ((/^[\u2022\u00b7\u00a7\u00d8o????vn][\u00a0 ]+/.test(html))) {
        return {
            tag: 'ul',
            style: guessUnorderedListStyle(trimStartText(innerText(p)))
        };
    }
    if (/^\s*\w+[\.\)][\u00a0 ]{2,}/.test(html)) {
        return {
            tag: 'ol',
            style: guessOrderedListStyle(trimStartText(innerText(p)))
        };
    }
};
const convertToLi = (p) => {
    let content, name = p.nodeName.toLowerCase();
    if (p.firstChild && p.firstChild.nodeType === Node.COMMENT_NODE) {
        p.removeChild(p.firstChild);
    }
    if (p.childNodes.length === 1) {
        content = p.firstChild.nodeType === Node.TEXT_NODE ?
            innerText(p) : p.firstChild.innerHTML.replace(/^\w+[\.\)](&nbsp;)+ /, '');
    }
    else {
        p.removeChild(p.firstChild);
        // check for Roman numerals
        if (p.firstChild.nodeType === 3) {
            if (/^[ivxlcdm]+\.$/i.test(p.firstChild.nodeValue)) {
                p.removeChild(p.firstChild);
            }
        }
        if (/^(&nbsp;|\s)+$/i.test(p.firstChild.innerHTML)) {
            p.removeChild(p.firstChild);
        }
        if (name !== 'p') {
            content = '<' + name + '>' + p.innerHTML + '</' + name + '>';
        }
        else {
            content = p.innerHTML;
        }
    }
    p.parentNode.removeChild(p);
    const li = document.createElement('li');
    li.innerHTML = content;
    return li;
};
const toList = (blockNodes) => {
    let lastMargin = -1, levels = {}, li, rootMargin, rootIndex, lastRootLi, isLastRootLi, rootList, items, i, p, type, margin, list, listData;
    for (i = 0; i < blockNodes.length; i++) {
        p = blockNodes[i];
        listData = {
            datalist: p.getAttribute('datalist'),
            datalevel: p.getAttribute('datalevel')
        };
        let listIndex = listData.datalist;
        let listType = listTypes(p);
        type = listType && listType.tag;
        if (!type) {
            if (li && (!isLastRootLi || isPartOfListItem(p))) {
                if (p.style.marginLeft) {
                    p.style.marginLeft = '';
                }
                if (p.style.marginLeft) {
                    // tests runner/framework fails to delete marginLeft
                    p.style.margin = '';
                }
                li.appendChild(p);
            }
            continue;
        }
        margin = listData.datalevel || parseFloat(p.style.marginLeft || 0);
        if (!listData.datalevel && !p.style.marginLeft) {
            continue;
        }
        let levelType = type + listIndex;
        if (!levels[margin]) {
            levels[margin] = {};
        }
        if (!rootMargin || rootMargin < 0) {
            rootMargin = margin;
            rootIndex = listIndex;
            items = blockNodes.filter(e => e.getAttribute('datalist') === String(rootIndex));
            lastRootLi = items[items.length - 1];
            rootList = createList(type, listType && listType.style);
            p.parentNode.insertBefore(rootList, p);
            lastMargin = margin;
            levels[margin][levelType] = rootList;
        }
        isLastRootLi = lastRootLi === p;
        list = levels[margin][levelType];
        if (margin > lastMargin || !list) {
            list = createList(type, listType && listType.style);
            levels[margin][levelType] = list;
            li.appendChild(list);
        }
        li = convertToLi(p);
        list.appendChild(li);
        if (isLastRootLi) {
            rootMargin = lastMargin = -1;
        }
        else {
            lastMargin = margin;
        }
    }
};
/**
 * @hidden
 */
export const convertMsLists = (html) => {
    const container = document.createElement('div');
    container.innerHTML = extractListLevels(html);
    const groups = new Set();
    mapListsCandidates(container.children, groups);
    groups.forEach(listsCandidates => toList(listsCandidates));
    return container.innerHTML;
};
