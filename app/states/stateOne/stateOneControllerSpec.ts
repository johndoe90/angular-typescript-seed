'use strict';

import angular = require('angular');
import {stateOneModule} from './stateOneModule';
import {IStateOneController} from './stateOneController';
import {StateOneController} from './stateOneController';
import {greeterModule} from './../../components/greeter/greeterModule';

describe('State One Controller Tests', () => {
    var greeterService, stateOneController: IStateOneController;

    beforeEach(function() {
        angular.mock.module(greeterModule.name);
        angular.mock.module(stateOneModule.name);
    });

    beforeEach(angular.mock.inject(function(_greeterService_) {
        greeterService = _greeterService_;
    }));

    it('should work', () => {
        stateOneController = new StateOneController(greeterService);
        stateOneController.name = 'Thomas';

        var greeting = stateOneController.greet();

        var spy = spyOn(greeterService, 'greet');
        stateOneController.greet();

        expect(greeting).toBe('Hello, Thomas!');
        expect(spy).toHaveBeenCalled();
    });
});