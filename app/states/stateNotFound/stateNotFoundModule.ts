/**
 * Created by johndoe on 19.06.15.
 */

/// <reference path="./../../references.ts" />

import * as angular from 'angular';

configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
function configuration($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'app/states/stateNotFound/stateNotFoundPartial.html'
        });

    $urlRouterProvider.otherwise('/404');
}

export var stateNotFoundModule = angular
    .module('stateNotFound', ['ui.router', 'pascalprecht.translate'])
    .config(configuration);