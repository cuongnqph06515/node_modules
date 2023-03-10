import withGeometry from '../mixins/with-geometry';
import Element from './element';
import Rect from '../geometry/rect';
import toMatrix from '../geometry/to-matrix';
import { defined } from '../util';


class Image extends withGeometry(Element, [ "rect" ]) {
    get nodeType() {
        return "Image";
    }

    constructor(src, rect = new Rect(), options = {}) {
        super(options);

        this.src(src);
        this.rect(rect);
    }

    src(value) {
        if (defined(value)) {
            this.options.set("src", value);
            return this;
        }

        return this.options.get("src");
    }

    bbox(transformation) {
        const combinedMatrix = toMatrix(this.currentTransform(transformation));
        return this._rect.bbox(combinedMatrix);
    }

    rawBBox() {
        return this._rect.bbox();
    }

    _containsPoint(point) {
        return this._rect.containsPoint(point);
    }

    _hasFill() {
        return this.src();
    }
}

export default Image;