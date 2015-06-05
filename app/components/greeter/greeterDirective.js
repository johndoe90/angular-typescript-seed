/// <reference path="./../../references.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    var GreeterDirective = (function () {
        function GreeterDirective(greeterService) {
            var _this = this;
            this.scope = {};
            this.restrict = 'AE';
            this.templateUrl = 'app/components/greeter/greeterPartial.html';
            this._greeterService = greeterService;
            this.link = function (scope, element, attrs) {
                _this._scope = scope;
                _this._scope.greet = _this.greet.bind(_this);
            };
        }
        GreeterDirective.prototype.greet = function () {
            this._greeterService.greet(this._scope.name);
        };
        GreeterDirective.Factory = function () {
            var directive = function (greeterService) {
                return new GreeterDirective(greeterService);
            };
            directive['$inject'] = ['greeterService'];
            return directive;
        };
        return GreeterDirective;
    })();
    exports.GreeterDirective = GreeterDirective;
});
