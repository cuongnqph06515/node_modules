import Point from '../geometry/point';
import ShapeMap from './shape-map';

const SEGMENT_REGEX = /([a-df-z]{1})([^a-df-z]*)(z)?/gi;
const SPLIT_REGEX = /[,\s]?([+\-]?(?:\d*\.\d+|\d+)(?:[eE][+\-]?\d+)?)/g;
const MOVE = "m";
const CLOSE = "z";

function parseParameters(str) {
    const parameters = [];
    str.replace(SPLIT_REGEX, function(match, number) {
        parameters.push(parseFloat(number));
    });
    return parameters;
}

function parsePath(pathInstance, str) {
    const position = new Point();
    let previousCommand;

    str.replace(SEGMENT_REGEX, (match, element, params, closePath) => {
        let command = element.toLowerCase();
        const isRelative = command === element;
        const parameters = parseParameters(params.trim());

        if (command === MOVE) {
            if (isRelative) {
                position.x += parameters[0];
                position.y += parameters[1];
            } else {
                position.x = parameters[0];
                position.y = parameters[1];
            }

            pathInstance.moveTo(position.x, position.y);

            if (parameters.length > 2) {
                command = "l";
                parameters.splice(0, 2);
            }
        }

        if (ShapeMap[command]) {
            ShapeMap[command](
                pathInstance, {
                    parameters: parameters,
                    position: position,
                    isRelative: isRelative,
                    previousCommand: previousCommand
                }
            );

            if (closePath && closePath.toLowerCase() === CLOSE) {
                pathInstance.close();
            }
        } else if (command !== MOVE) {
            throw new Error("Error while parsing SVG path. Unsupported command: " + command);
        }

        previousCommand = command;
    });

    return pathInstance;
}

export default parsePath;

