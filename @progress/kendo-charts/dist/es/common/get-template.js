import { TemplateService } from '../services';
import isFunction from './is-function';

export default function getTemplate(options) {
    if ( options === void 0 ) options = {};

    var template;
    if (options.template) {
        options.template = template = TemplateService.compile(options.template);
    } else if (isFunction(options.content)) {
        template = options.content;
    }

    return template;
}