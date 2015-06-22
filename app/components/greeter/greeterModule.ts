/// <reference path="./../../references.ts" />

'use strict';

import * as angular from 'angular';
import {GreeterService} from './greeterService';
import {GreeterDirectiveFactory} from './greeterDirective';

export var greeterModule = angular
    .module('greeter', [])
    .service('greeterService', GreeterService)
    .directive('greeterDirective', GreeterDirectiveFactory);
