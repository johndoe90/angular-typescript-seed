/// <reference path="references.ts" />

'use strict';

import * as angular from 'angular';
import {partialsModule} from './partials';
import {stateOneModule} from 'states/stateOne/stateOneModule';
import {greeterModule} from 'components/greeter/greeterModule';

configuration.$inject = ['$locationProvider'];
function configuration($locationProvider: ng.ILocationProvider): void {
    $locationProvider.html5Mode(true);

    console.log('APP MODULE CONFIGURATION');
}

export var appModule = angular
    .module('app', ['ui.router', partialsModule.name, greeterModule.name, stateOneModule.name])
    .config(configuration);