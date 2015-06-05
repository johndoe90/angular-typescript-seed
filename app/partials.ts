/// <reference path="references.ts" />

'use strict';

import * as angular from 'angular';

export var partialsModule = angular.module('partials', []);

/* inject:partials */(function() {  var module;try {  module = angular.module('partials');} catch (e) {  module = angular.module('partials', []);}module.run(['$templateCache', function($templateCache) {  $templateCache.put('app/components/greeter/greeterPartial.html',    '<div><img ng-src=public/img/smiley.jpg height=15 width=15> Greeter <input id=name type=text ng-model=name> <input type=button ng-click=greet() value=greet></div>');}]);})();(function() {  var module;try {  module = angular.module('partials');} catch (e) {  module = angular.module('partials', []);}module.run(['$templateCache', function($templateCache) {  $templateCache.put('app/states/stateOne/stateOnePartial.html',    '<div><h2>This is State One</h2><greeter-directive></greeter-directive></div>');}]);})();/* endinject */
