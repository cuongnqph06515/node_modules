import BaseSurface from '../core/surface';
import RootNode from './root-node';
import Group from '../shapes/group';
import transform from '../geometry/transform';
import renderSVG from './utils/render-svg';
import { SVG_NS } from './constants';
import { bindEvents, unbindEvents, elementStyles } from '../util';

import ArcNode from './arc-node';
import CircleNode from './circle-node';
import GroupNode from './group-node';
import ImageNode from './image-node';
import MultiPathNode from './multi-path-node';
import PathNode from './path-node';
import RectNode from './rect-node';
import TextNode from './text-node';
import NODE_MAP from './node-map';

NODE_MAP.Arc = ArcNode;
NODE_MAP.Circle = CircleNode;
NODE_MAP.Group = GroupNode;
NODE_MAP.Image = ImageNode;
NODE_MAP.MultiPath = MultiPathNode;
NODE_MAP.Path = PathNode;
NODE_MAP.Rect = RectNode;
NODE_MAP.Text = TextNode;

var RTL = 'rtl';

function alignToScreen(element) {
    var ctm;

    try {
        ctm = element.getScreenCTM ? element.getScreenCTM() : null;
    } catch (e) { } // eslint-disable-line no-empty

    if (ctm) {
        var left = - ctm.e % 1;
        var top = - ctm.f % 1;
        var style = element.style;

        if (left !== 0 || top !== 0) {
            style.left = left + "px";
            style.top = top + "px";
        }
    }
}

var Surface = (function (BaseSurface) {
    function Surface(element, options) {
        BaseSurface.call(this, element, options);

        this._root = new RootNode(Object.assign({
            rtl: elementStyles(element, 'direction').direction === RTL
        }, this.options));

        renderSVG(this.element, this._template());

        this._rootElement = this.element.firstElementChild;

        alignToScreen(this._rootElement);

        this._root.attachTo(this._rootElement);

        bindEvents(this.element, {
            click: this._click,
            mouseover: this._mouseenter,
            mouseout: this._mouseleave,
            mousemove: this._mousemove
        });

        this.resize();
    }

    if ( BaseSurface ) Surface.__proto__ = BaseSurface;
    Surface.prototype = Object.create( BaseSurface && BaseSurface.prototype );
    Surface.prototype.constructor = Surface;

    var prototypeAccessors = { type: { configurable: true } };

    prototypeAccessors.type.get = function () {
        return "svg";
    };

    Surface.prototype.destroy = function destroy () {
        if (this._root) {
            this._root.destroy();
            this._root = null;
            this._rootElement = null;
            unbindEvents(this.element, {
                click: this._click,
                mouseover: this._mouseenter,
                mouseout: this._mouseleave,
                mousemove: this._mousemove
            });
        }

        BaseSurface.prototype.destroy.call(this);
    };

    Surface.prototype.translate = function translate (offset) {
        var viewBox = (Math.round(offset.x)) + " " + (Math.round(offset.y)) + " " + (this._size.width) + " " + (this._size.height);

        this._offset = offset;
        this._rootElement.setAttribute("viewBox", viewBox);
    };

    Surface.prototype.draw = function draw (element) {
        BaseSurface.prototype.draw.call(this, element);
        this._root.load([ element ]);
    };

    Surface.prototype.clear = function clear () {
        BaseSurface.prototype.clear.call(this);
        this._root.clear();
    };

    Surface.prototype.svg = function svg () {
        return "<?xml version='1.0' ?>" + this._template();
    };

    Surface.prototype.exportVisual = function exportVisual () {
        var ref = this;
        var visual = ref._visual;
        var offset = ref._offset;

        if (offset) {
            var wrap = new Group();
            wrap.children.push(visual);

            wrap.transform(
                transform().translate(-offset.x, -offset.y)
            );

            visual = wrap;
        }

        return visual;
    };

    Surface.prototype._resize = function _resize () {
        if (this._offset) {
            this.translate(this._offset);
        }
    };

    Surface.prototype._template = function _template () {
        return ("<svg style='width: 100%; height: 100%; overflow: hidden;' xmlns='" + SVG_NS + "' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'>" + (this._root.render()) + "</svg>");
    };

    Object.defineProperties( Surface.prototype, prototypeAccessors );

    return Surface;
}(BaseSurface));

export default Surface;
