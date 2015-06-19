/// <reference path="./../../references.ts" />

import * as angular from 'angular';
import {StateOneController} from './stateOneController';
import {IStateOneController} from './stateOneController';

configuration.$inject = ['$stateProvider'];
function configuration($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider
        .state('app.stateOne', {
            url: '/',
            controller: 'stateOneController as stateOneController',
            templateUrl: 'app/states/stateOne/stateOnePartial.html'
        });
}

export var stateOneModule = angular
    .module('stateOne', ['ui.router', 'pascalprecht.translate'])
    .config(configuration)
    .controller('stateOneController', StateOneController);