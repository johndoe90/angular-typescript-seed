/// <reference path="./../../references.ts" />

import * as angular from 'angular';
import {StateOneController} from './stateOneController';
import {IStateOneController} from './stateOneController';

configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$stateParamsProvider'];
function configuration($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/{lang:(?:en|de)}',
            template: '<ui-view />'
        })
        .state('app.stateOne', {
            url: '/',
            controller: 'stateOneController as stateOneController',
            templateUrl: 'app/states/stateOne/stateOnePartial.html'
        });

    /*$urlRouterProvider
        .otherwise('/:lang/stateOne');*/
}

export var stateOneModule = angular
    .module('stateOne', ['ui.router'])
    .config(configuration)
    .controller('stateOneController', StateOneController);