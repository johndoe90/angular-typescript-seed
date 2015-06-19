/// <reference path="references.ts" />

'use strict';

import * as angular from 'angular';
import {partialsModule} from './partials';
import {AppController} from './appController';
import {stateOneModule} from 'states/stateOne/stateOneModule';
import {greeterModule} from 'components/greeter/greeterModule';
import {stateNotFoundModule} from 'states/stateNotFound/stateNotFoundModule';

configuration.$inject = ['$locationProvider', '$translateProvider', '$stateProvider'];
function configuration($locationProvider: ng.ILocationProvider, $translateProvider: ng.translate.ITranslateProvider, $stateProvider: angular.ui.IStateProvider): void {
	$stateProvider
		.state('app', {
			abstract: true,
			url: '/{lang:(?:en|de)}',
			template: '<ui-view />',
			controller: 'appController'
		});

	$locationProvider.html5Mode(true);

	$translateProvider.translations('en', {
		TITLE: 'Welcome,'
	});

	$translateProvider.translations('de', {
		TITLE: 'Wilkommen,'
	});
}

export var appModule = angular
    .module('app', ['ui.router', 'pascalprecht.translate', partialsModule.name, greeterModule.name, stateOneModule.name, stateNotFoundModule.name])
    .config(configuration)
	.controller('appController', AppController);
