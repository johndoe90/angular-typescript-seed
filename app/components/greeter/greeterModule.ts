/// <reference path="./../../references.ts" />

'use strict';

import angular = require('angular');
import {GreeterService} from './greeterService';

export var greeterModule = angular
    .module('greeter', [])
    .service('greeterService', GreeterService);