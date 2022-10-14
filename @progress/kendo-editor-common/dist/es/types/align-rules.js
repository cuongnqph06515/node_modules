var style = function (name, value) {
    return { name: name, value: value };
};
/**
 * @hidden
 */
export var alignLeftRules = [
    { node: 'paragraph', style: [style('text-align', 'left')] },
    { node: 'heading', style: [style('text-align', 'left')] },
    { node: 'listItem', style: [style('text-align', 'left'), style('list-style-position', 'inside')] }
];
/**
 * @hidden
 */
export var alignRightRules = [
    { node: 'paragraph', style: [style('text-align', 'right')] },
    { node: 'heading', style: [style('text-align', 'right')] },
    { node: 'listItem', style: [style('text-align', 'right'), style('list-style-position', 'inside')] }
];
/**
 * @hidden
 */
export var alignCenterRules = [
    { node: 'paragraph', style: [style('text-align', 'center')] },
    { node: 'heading', style: [style('text-align', 'center')] },
    { node: 'listItem', style: [style('text-align', 'center'), style('list-style-position', 'inside')] }
];
/**
 * @hidden
 */
export var alignJustifyRules = [
    { node: 'paragraph', style: [style('text-align', 'justify')] },
    { node: 'heading', style: [style('text-align', 'justify')] },
    { node: 'listItem', style: [style('text-align', 'justify'), style('list-style-position', 'justify')] }
];
/**
 * @hidden
 */
export var alignRemoveRules = [
    { node: 'paragraph', style: [style('text-align', '')] },
    { node: 'heading', style: [style('text-align', '')] },
    { node: 'listItem', style: [style('text-align', ''), style('list-style-position', '')] }
];
