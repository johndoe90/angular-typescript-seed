/// <reference path="./../../references.ts" />
'use strict';
define(["require", "exports", 'angular', './greeterService'], function (require, exports, angular, greeterService_1) {
    exports.greeterModule = angular
        .module('greeter', [])
        .service('greeterService', greeterService_1.GreeterService);
});

//# sourceMappingURL=../../components/greeter/greeterModule.js.map