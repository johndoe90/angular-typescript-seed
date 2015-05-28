/// <reference path="references.ts" />
'use strict';
define(["require", "exports", 'angular', 'states/stateOne/stateOneModule', 'components/greeter/greeterModule'], function (require, exports, angular, stateOneModule_1, greeterModule_1) {
    function configuration() {
        console.log('APP MODULE CONFIGURATION');
    }
    exports.appModule = angular
        .module('app', ['ui.router', greeterModule_1.greeterModule.name, stateOneModule_1.stateOneModule.name])
        .config(configuration);
});

//# sourceMappingURL=appModule.js.map