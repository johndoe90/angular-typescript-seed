/// <reference path="references.ts" />

'use strict';

import angular = require('angular');
import {stateOneModule} from 'states/stateOne/stateOneModule';
import {greeterModule} from 'components/greeter/greeterModule';

function configuration(): void {
    console.log('APP MODULE CONFIGURATION');
}

export var appModule = angular
    .module('app', ['ui.router', greeterModule.name, stateOneModule.name])
    .config(configuration);