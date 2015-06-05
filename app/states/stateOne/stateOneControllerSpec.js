'use strict';
define(["require", "exports", 'angular', './stateOneModule', './stateOneController', './../../components/greeter/greeterModule'], function (require, exports, angular, stateOneModule_1, stateOneController_1, greeterModule_1) {
    describe('State One Controller Tests', function () {
        var greeterService, stateOneController;
        beforeEach(function () {
            angular.mock.module(greeterModule_1.greeterModule.name);
            angular.mock.module(stateOneModule_1.stateOneModule.name);
        });
        beforeEach(angular.mock.inject(function (_greeterService_) {
            greeterService = _greeterService_;
        }));
        it('should work', function () {
            stateOneController = new stateOneController_1.StateOneController(greeterService);
            stateOneController.name = 'Thomas';
            var greeting = stateOneController.greet();
            var spy = spyOn(greeterService, 'greet');
            stateOneController.greet();
            expect(greeting).toBe('Hello, Thomas!');
            expect(spy).toHaveBeenCalled();
        });
    });
});
