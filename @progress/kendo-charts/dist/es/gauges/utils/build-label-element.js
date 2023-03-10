import { geometry as geo, drawing } from '@progress/kendo-drawing';
import pad from './pad';

var Group = drawing.Group;
var Path = drawing.Path;
var Text = drawing.Text;

export default function buildLabelElement(label, options) {
    var labelBox = label.box;
    var textBox = label.children[0].box;
    var border = options.border || {};
    var background = options.background || "";

    var wrapper = Path.fromRect(new geo.Rect([ labelBox.x1, labelBox.y1 ], [ labelBox.width(), labelBox.height() ]), {
        stroke: {}
    });

    var text = new Text(label.text, new geo.Point(textBox.x1, textBox.y1), {
        font: options.font,
        fill: { color: options.color }
    });

    var styleGeometry = pad(text.bbox().clone(), options.padding);

    var styleBox = Path.fromRect(styleGeometry, {
        stroke: {
            color: border.width ? border.color : "",
            width: border.width,
            dashType: border.dashType,
            lineJoin: "round",
            lineCap: "round"
        },
        fill: {
            color: background
        }
    });

    var elements = new Group();
    elements.append(wrapper);
    elements.append(styleBox);
    elements.append(text);

    return elements;
}