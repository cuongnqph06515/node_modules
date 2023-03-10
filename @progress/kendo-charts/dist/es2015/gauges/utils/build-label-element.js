import { geometry as geo, drawing } from '@progress/kendo-drawing';
import pad from './pad';

const { Group, Path, Text } = drawing;

export default function buildLabelElement(label, options) {
    const labelBox = label.box;
    const textBox = label.children[0].box;
    const border = options.border || {};
    const background = options.background || "";

    const wrapper = Path.fromRect(new geo.Rect([ labelBox.x1, labelBox.y1 ], [ labelBox.width(), labelBox.height() ]), {
        stroke: {}
    });

    const text = new Text(label.text, new geo.Point(textBox.x1, textBox.y1), {
        font: options.font,
        fill: { color: options.color }
    });

    const styleGeometry = pad(text.bbox().clone(), options.padding);

    const styleBox = Path.fromRect(styleGeometry, {
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

    const elements = new Group();
    elements.append(wrapper);
    elements.append(styleBox);
    elements.append(text);

    return elements;
}