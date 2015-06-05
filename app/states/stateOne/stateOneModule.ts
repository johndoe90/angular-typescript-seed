/// <reference path="./../../references.ts" />

import * as angular from 'angular';
import {StateOneController} from './stateOneController';
import {IStateOneController} from './stateOneController';

configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
function configuration($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

    $stateProvider
        .state('stateOne', {
            url: '/stateOne',
            controller: 'stateOneController as stateOneController',
            templateUrl: 'app/states/stateOne/stateOnePartial.html'
        });

    $urlRouterProvider
        .otherwise('/stateOne');
}

export var stateOneModule = angular
    .module('stateOne', ['ui.router'])
    .config(configuration)
    .controller('stateOneController', StateOneController);