/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/ml_parser/ast", ["require", "exports", "tslib", "@angular/compiler/src/ast_path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ast_path_1 = require("@angular/compiler/src/ast_path");
    var NodeWithI18n = /** @class */ (function () {
        function NodeWithI18n(sourceSpan, i18n) {
            this.sourceSpan = sourceSpan;
            this.i18n = i18n;
        }
        return NodeWithI18n;
    }());
    exports.NodeWithI18n = NodeWithI18n;
    var Text = /** @class */ (function (_super) {
        tslib_1.__extends(Text, _super);
        function Text(value, sourceSpan, i18n) {
            var _this = _super.call(this, sourceSpan, i18n) || this;
            _this.value = value;
            return _this;
        }
        Text.prototype.visit = function (visitor, context) {
            return visitor.visitText(this, context);
        };
        return Text;
    }(NodeWithI18n));
    exports.Text = Text;
    var Expansion = /** @class */ (function (_super) {
        tslib_1.__extends(Expansion, _super);
        function Expansion(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
            var _this = _super.call(this, sourceSpan, i18n) || this;
            _this.switchValue = switchValue;
            _this.type = type;
            _this.cases = cases;
            _this.switchValueSourceSpan = switchValueSourceSpan;
            return _this;
        }
        Expansion.prototype.visit = function (visitor, context) {
            return visitor.visitExpansion(this, context);
        };
        return Expansion;
    }(NodeWithI18n));
    exports.Expansion = Expansion;
    var ExpansionCase = /** @class */ (function () {
        function ExpansionCase(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
            this.value = value;
            this.expression = expression;
            this.sourceSpan = sourceSpan;
            this.valueSourceSpan = valueSourceSpan;
            this.expSourceSpan = expSourceSpan;
        }
        ExpansionCase.prototype.visit = function (visitor, context) {
            return visitor.visitExpansionCase(this, context);
        };
        return ExpansionCase;
    }());
    exports.ExpansionCase = ExpansionCase;
    var Attribute = /** @class */ (function (_super) {
        tslib_1.__extends(Attribute, _super);
        function Attribute(name, value, sourceSpan, valueSpan, i18n) {
            var _this = _super.call(this, sourceSpan, i18n) || this;
            _this.name = name;
            _this.value = value;
            _this.valueSpan = valueSpan;
            return _this;
        }
        Attribute.prototype.visit = function (visitor, context) {
            return visitor.visitAttribute(this, context);
        };
        return Attribute;
    }(NodeWithI18n));
    exports.Attribute = Attribute;
    var Element = /** @class */ (function (_super) {
        tslib_1.__extends(Element, _super);
        function Element(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan, i18n) {
            if (startSourceSpan === void 0) { startSourceSpan = null; }
            if (endSourceSpan === void 0) { endSourceSpan = null; }
            var _this = _super.call(this, sourceSpan, i18n) || this;
            _this.name = name;
            _this.attrs = attrs;
            _this.children = children;
            _this.startSourceSpan = startSourceSpan;
            _this.endSourceSpan = endSourceSpan;
            return _this;
        }
        Element.prototype.visit = function (visitor, context) {
            return visitor.visitElement(this, context);
        };
        return Element;
    }(NodeWithI18n));
    exports.Element = Element;
    var Comment = /** @class */ (function () {
        function Comment(value, sourceSpan) {
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        Comment.prototype.visit = function (visitor, context) {
            return visitor.visitComment(this, context);
        };
        return Comment;
    }());
    exports.Comment = Comment;
    function visitAll(visitor, nodes, context) {
        if (context === void 0) { context = null; }
        var result = [];
        var visit = visitor.visit ?
            function (ast) { return visitor.visit(ast, context) || ast.visit(visitor, context); } :
            function (ast) { return ast.visit(visitor, context); };
        nodes.forEach(function (ast) {
            var astResult = visit(ast);
            if (astResult) {
                result.push(astResult);
            }
        });
        return result;
    }
    exports.visitAll = visitAll;
    var RecursiveVisitor = /** @class */ (function () {
        function RecursiveVisitor() {
        }
        RecursiveVisitor.prototype.visitElement = function (ast, context) {
            this.visitChildren(context, function (visit) {
                visit(ast.attrs);
                visit(ast.children);
            });
        };
        RecursiveVisitor.prototype.visitAttribute = function (ast, context) { };
        RecursiveVisitor.prototype.visitText = function (ast, context) { };
        RecursiveVisitor.prototype.visitComment = function (ast, context) { };
        RecursiveVisitor.prototype.visitExpansion = function (ast, context) {
            return this.visitChildren(context, function (visit) {
                visit(ast.cases);
            });
        };
        RecursiveVisitor.prototype.visitExpansionCase = function (ast, context) { };
        RecursiveVisitor.prototype.visitChildren = function (context, cb) {
            var results = [];
            var t = this;
            function visit(children) {
                if (children)
                    results.push(visitAll(t, children, context));
            }
            cb(visit);
            return Array.prototype.concat.apply([], results);
        };
        return RecursiveVisitor;
    }());
    exports.RecursiveVisitor = RecursiveVisitor;
    function spanOf(ast) {
        var start = ast.sourceSpan.start.offset;
        var end = ast.sourceSpan.end.offset;
        if (ast instanceof Element) {
            if (ast.endSourceSpan) {
                end = ast.endSourceSpan.end.offset;
            }
            else if (ast.children && ast.children.length) {
                end = spanOf(ast.children[ast.children.length - 1]).end;
            }
        }
        return { start: start, end: end };
    }
    function findNode(nodes, position) {
        var path = [];
        var visitor = new /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.visit = function (ast, context) {
                var span = spanOf(ast);
                if (span.start <= position && position < span.end) {
                    path.push(ast);
                }
                else {
                    // Returning a value here will result in the children being skipped.
                    return true;
                }
            };
            return class_1;
        }(RecursiveVisitor));
        visitAll(visitor, nodes);
        return new ast_path_1.AstPath(path, position);
    }
    exports.findNode = findNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsMkRBQW9DO0lBU3BDO1FBQ0Usc0JBQW1CLFVBQTJCLEVBQVMsSUFBZTtZQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQUFTLFNBQUksR0FBSixJQUFJLENBQVc7UUFBRyxDQUFDO1FBRTVFLG1CQUFDO0lBQUQsQ0FBQyxBQUhELElBR0M7SUFIcUIsb0NBQVk7SUFLbEM7UUFBMEIsZ0NBQVk7UUFDcEMsY0FBbUIsS0FBYSxFQUFFLFVBQTJCLEVBQUUsSUFBZTtZQUE5RSxZQUNFLGtCQUFNLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FDeEI7WUFGa0IsV0FBSyxHQUFMLEtBQUssQ0FBUTs7UUFFaEMsQ0FBQztRQUNELG9CQUFLLEdBQUwsVUFBTSxPQUFnQixFQUFFLE9BQVk7WUFDbEMsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0gsV0FBQztJQUFELENBQUMsQUFQRCxDQUEwQixZQUFZLEdBT3JDO0lBUFksb0JBQUk7SUFTakI7UUFBK0IscUNBQVk7UUFDekMsbUJBQ1csV0FBbUIsRUFBUyxJQUFZLEVBQVMsS0FBc0IsRUFDOUUsVUFBMkIsRUFBUyxxQkFBc0MsRUFBRSxJQUFlO1lBRi9GLFlBR0Usa0JBQU0sVUFBVSxFQUFFLElBQUksQ0FBQyxTQUN4QjtZQUhVLGlCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQVMsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUFTLFdBQUssR0FBTCxLQUFLLENBQWlCO1lBQzFDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBaUI7O1FBRTlFLENBQUM7UUFDRCx5QkFBSyxHQUFMLFVBQU0sT0FBZ0IsRUFB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QUssT0FBQSxFQUFFLEdBQUcsS0FBQSxFQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQWdCLFFBQVEsQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7UUFDdEQsSUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO1FBRXhCLElBQU0sT0FBTyxHQUFHO1lBQWtCLG1DQUFnQjtZQUE5Qjs7WUFVcEIsQ0FBQztZQVRDLHVCQUFLLEdBQUwsVUFBTSxHQUFTLEVBQUUsT0FBWTtnQkFDM0IsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxvRUFBb0U7b0JBQ3BFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO1lBQ0gsQ0FBQztZQUNILGNBQUM7UUFBRCxDQUFDLEFBVm1CLENBQWMsZ0JBQWdCLEVBVWpELENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpCLE9BQU8sSUFBSSxrQkFBTyxDQUFPLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBbEJELDRCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBc3RQYXRofSBmcm9tICcuLi9hc3RfcGF0aCc7XG5pbXBvcnQge0kxOG5NZXRhfSBmcm9tICcuLi9pMThuL2kxOG5fYXN0JztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOb2RlV2l0aEkxOG4gaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGkxOG4/OiBJMThuTWV0YSkge31cbiAgYWJzdHJhY3QgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIE5vZGVXaXRoSTE4biB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb24gZXh0ZW5kcyBOb2RlV2l0aEkxOG4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzd2l0Y2hWYWx1ZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgY2FzZXM6IEV4cGFuc2lvbkNhc2VbXSxcbiAgICAgIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN3aXRjaFZhbHVlU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBpMThuPzogSTE4bk1ldGEpIHtcbiAgICBzdXBlcihzb3VyY2VTcGFuLCBpMThuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXhwYW5zaW9uKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb25DYXNlIGltcGxlbWVudHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uOiBOb2RlW10sIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgdmFsdWVTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBleHBTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG5cbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEV4cGFuc2lvbkNhc2UodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZSBleHRlbmRzIE5vZGVXaXRoSTE4biB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4sIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBdHRyaWJ1dGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBOb2RlV2l0aEkxOG4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhdHRyczogQXR0cmlidXRlW10sIHB1YmxpYyBjaGlsZHJlbjogTm9kZVtdLFxuICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RhcnRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCA9IG51bGwsXG4gICAgICBwdWJsaWMgZW5kU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFufG51bGwgPSBudWxsLCBpMThuPzogSTE4bk1ldGEpIHtcbiAgICBzdXBlcihzb3VyY2VTcGFuLCBpMThuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RWxlbWVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tbWVudCBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZ3xudWxsLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q29tbWVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpc2l0b3Ige1xuICAvLyBSZXR1cm5pbmcgYSB0cnV0aHkgdmFsdWUgZnJvbSBgdmlzaXQoKWAgd2lsbCBwcmV2ZW50IGB2aXNpdEFsbCgpYCBmcm9tIHRoZSBjYWxsIHRvIHRoZSB0eXBlZFxuICAvLyBtZXRob2QgYW5kIHJlc3VsdCByZXR1cm5lZCB3aWxsIGJlY29tZSB0aGUgcmVzdWx0IGluY2x1ZGVkIGluIGB2aXNpdEFsbCgpYHMgcmVzdWx0IGFycmF5LlxuICB2aXNpdD8obm9kZTogTm9kZSwgY29udGV4dDogYW55KTogYW55O1xuXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0QXR0cmlidXRlKGF0dHJpYnV0ZTogQXR0cmlidXRlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0VGV4dCh0ZXh0OiBUZXh0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q29tbWVudChjb21tZW50OiBDb21tZW50LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RXhwYW5zaW9uKGV4cGFuc2lvbjogRXhwYW5zaW9uLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RXhwYW5zaW9uQ2FzZShleHBhbnNpb25DYXNlOiBFeHBhbnNpb25DYXNlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdEFsbCh2aXNpdG9yOiBWaXNpdG9yLCBub2RlczogTm9kZVtdLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55W10ge1xuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG5cbiAgY29uc3QgdmlzaXQgPSB2aXNpdG9yLnZpc2l0ID9cbiAgICAgIChhc3Q6IE5vZGUpID0+IHZpc2l0b3IudmlzaXQhKGFzdCwgY29udGV4dCkgfHwgYXN0LnZpc2l0KHZpc2l0b3IsIGNvbnRleHQpIDpcbiAgICAgIChhc3Q6IE5vZGUpID0+IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgbm9kZXMuZm9yRWFjaChhc3QgPT4ge1xuICAgIGNvbnN0IGFzdFJlc3VsdCA9IHZpc2l0KGFzdCk7XG4gICAgaWYgKGFzdFJlc3VsdCkge1xuICAgICAgcmVzdWx0LnB1c2goYXN0UmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVmlzaXRvciBpbXBsZW1lbnRzIFZpc2l0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgIHZpc2l0KGFzdC5jaGlsZHJlbik7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdEF0dHJpYnV0ZShhc3Q6IEF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55IHt9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHQsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdENvbW1lbnQoYXN0OiBDb21tZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEV4cGFuc2lvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHtcbiAgICAgIHZpc2l0KGFzdC5jYXNlcyk7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoYXN0OiBFeHBhbnNpb25DYXNlLCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICBwcml2YXRlIHZpc2l0Q2hpbGRyZW48VCBleHRlbmRzIE5vZGU+KFxuICAgICAgY29udGV4dDogYW55LCBjYjogKHZpc2l0OiAoPFYgZXh0ZW5kcyBOb2RlPihjaGlsZHJlbjogVltdfHVuZGVmaW5lZCkgPT4gdm9pZCkpID0+IHZvaWQpIHtcbiAgICBsZXQgcmVzdWx0czogYW55W11bXSA9IFtdO1xuICAgIGxldCB0ID0gdGhpcztcbiAgICBmdW5jdGlvbiB2aXNpdDxUIGV4dGVuZHMgTm9kZT4oY2hpbGRyZW46IFRbXXx1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjaGlsZHJlbikgcmVzdWx0cy5wdXNoKHZpc2l0QWxsKHQsIGNoaWxkcmVuLCBjb250ZXh0KSk7XG4gICAgfVxuICAgIGNiKHZpc2l0KTtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgcmVzdWx0cyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgSHRtbEFzdFBhdGggPSBBc3RQYXRoPE5vZGU+O1xuXG5mdW5jdGlvbiBzcGFuT2YoYXN0OiBOb2RlKSB7XG4gIGNvbnN0IHN0YXJ0ID0gYXN0LnNvdXJjZVNwYW4uc3RhcnQub2Zmc2V0O1xuICBsZXQgZW5kID0gYXN0LnNvdXJjZVNwYW4uZW5kLm9mZnNldDtcbiAgaWYgKGFzdCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICBpZiAoYXN0LmVuZFNvdXJjZVNwYW4pIHtcbiAgICAgIGVuZCA9IGFzdC5lbmRTb3VyY2VTcGFuLmVuZC5vZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChhc3QuY2hpbGRyZW4gJiYgYXN0LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgZW5kID0gc3Bhbk9mKGFzdC5jaGlsZHJlblthc3QuY2hpbGRyZW4ubGVuZ3RoIC0gMV0pLmVuZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtzdGFydCwgZW5kfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlKG5vZGVzOiBOb2RlW10sIHBvc2l0aW9uOiBudW1iZXIpOiBIdG1sQXN0UGF0aCB7XG4gIGNvbnN0IHBhdGg6IE5vZGVbXSA9IFtdO1xuXG4gIGNvbnN0IHZpc2l0b3IgPSBuZXcgY2xhc3MgZXh0ZW5kcyBSZWN1cnNpdmVWaXNpdG9yIHtcbiAgICB2aXNpdChhc3Q6IE5vZGUsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgICBjb25zdCBzcGFuID0gc3Bhbk9mKGFzdCk7XG4gICAgICBpZiAoc3Bhbi5zdGFydCA8PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA8IHNwYW4uZW5kKSB7XG4gICAgICAgIHBhdGgucHVzaChhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuaW5nIGEgdmFsdWUgaGVyZSB3aWxsIHJlc3VsdCBpbiB0aGUgY2hpbGRyZW4gYmVpbmcgc2tpcHBlZC5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZpc2l0QWxsKHZpc2l0b3IsIG5vZGVzKTtcblxuICByZXR1cm4gbmV3IEFzdFBhdGg8Tm9kZT4ocGF0aCwgcG9zaXRpb24pO1xufVxuIl19