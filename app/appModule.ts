/// <reference path="references.ts" />

'use strict';

import * as angular from 'angular';
import {partialsModule} from './partials';
import {stateOneModule} from 'states/stateOne/stateOneModule';
import {greeterModule} from 'components/greeter/greeterModule';

configuration.$inject = ['$locationProvider', '$translateProvider'];
function configuration($locationProvider: ng.ILocationProvider, $translateProvider): void {
    $locationProvider.html5Mode(true);

		$translateProvider.translations('en', {
			TITLE: 'Welcome,'
		});

		$translateProvider.translations('de', {
			TITLE: 'Wilkommen,'
		});

    console.log('APP MODULE CONFIGURATION');
}

export var appModule = angular
    .module('app', ['ui.router', 'pascalprecht.translate', partialsModule.name, greeterModule.name, stateOneModule.name])
    .config(configuration)
	.controller('appController', function($stateParams, $translate) {
		$translate.use($stateParams.lang);
	});
