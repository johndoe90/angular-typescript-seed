/// <reference path="./../../references.ts" />
'use strict';
define(["require", "exports", 'angular', './greeterService', './greeterDirective'], function (require, exports, angular, greeterService_1, greeterDirective_1) {
    exports.greeterModule = angular
        .module('greeter', [])
        .service('greeterService', greeterService_1.GreeterService)
        .directive('greeterDirective', greeterDirective_1.GreeterDirective.Factory());
});
//# sourceMappingURL=greeterModule.js.map