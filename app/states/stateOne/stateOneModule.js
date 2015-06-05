/// <reference path="./../../references.ts" />
define(["require", "exports", 'angular', './stateOneController'], function (require, exports, angular, stateOneController_1) {
    function configuration($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stateOne', {
            url: '/stateOne',
            controller: 'stateOneController as stateOneController',
            //controllerAs: 'stateOneController',
            templateUrl: 'app/states/stateOne/stateOnePartial.html'
        });
        $urlRouterProvider
            .otherwise('/stateOne');
    }
    exports.stateOneModule = angular
        .module('stateOne', ['ui.router'])
        .config(configuration)
        .controller('stateOneController', stateOneController_1.StateOneController);
});
