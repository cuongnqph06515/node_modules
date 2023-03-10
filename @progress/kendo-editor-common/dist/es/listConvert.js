var msoListRegExp = /style=['"]?[^'"]*?mso-list:\s*[a-zA-Z]+(\d+)\s[a-zA-Z]+(\d+)\s(\w+)/gi;
var extractListLevels = function (html) {
    html = html.replace(msoListRegExp, function (match, list, level) {
        return "datalist=\"" + list + "\" datalevel=\"" + level + "\" " + match;
    });
    return html;
};
var isPartOfListItem = function (element) {
    return /^MsoListParagraph/.test(element.className);
};
var innerText = function (node) {
    var text = node.innerHTML;
    text = text.replace(/<!--(.|\s)*?-->/gi, '');
    text = text.replace(/<\/?[^>]+?\/?>/gm, '');
    return text;
};
var createList = function (type, styleType) {
    var list = document.createElement(type);
    list.style.listStyleType = styleType;
    return list;
};
var guessUnorderedListStyle = function (symbol) {
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
var guessOrderedListStyle = function (symbol) {
    var type = null;
    if (!/^\d/.test(symbol)) {
        type = (/^[a-z]/.test(symbol) ? 'lower-' : 'upper-') +
            (/^[ivxlcdm]/i.test(symbol) ? 'roman' : 'alpha');
    }
    return type;
};
var mapListsCandidates = function (nodes, groups) {
    var group = [];
    Array.from(nodes).forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        var element = node;
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
                Array.from(element.querySelectorAll('td,th')).forEach(function (cell) {
                    mapListsCandidates(cell.children, groups);
                });
            }
        }
    });
};
var listTypes = function (p) {
    var html = p.innerHTML;
    var trimStartText = function (t) {
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
var convertToLi = function (p) {
    var content, name = p.nodeName.toLowerCase();
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
    var li = document.createElement('li');
    li.innerHTML = content;
    return li;
};
var toList = function (blockNodes) {
    var lastMargin = -1, levels = {}, li, rootMargin, rootIndex, lastRootLi, isLastRootLi, rootList, items, i, p, type, margin, list, listData;
    for (i = 0; i < blockNodes.length; i++) {
        p = blockNodes[i];
        listData = {
            datalist: p.getAttribute('datalist'),
            datalevel: p.getAttribute('datalevel')
        };
        var listIndex = listData.datalist;
        var listType = listTypes(p);
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
        var levelType = type + listIndex;
        if (!levels[margin]) {
            levels[margin] = {};
        }
        if (!rootMargin || rootMargin < 0) {
            rootMargin = margin;
            rootIndex = listIndex;
            items = blockNodes.filter(function (e) { return e.getAttribute('datalist') === String(rootIndex); });
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
export var convertMsLists = function (html) {
    var container = document.createElement('div');
    container.innerHTML = extractListLevels(html);
    var groups = new Set();
    mapListsCandidates(container.children, groups);
    groups.forEach(function (listsCandidates) { return toList(listsCandidates); });
    return container.innerHTML;
};
