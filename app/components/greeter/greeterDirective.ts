/// <reference path="./../../references.ts" />

'use strict';

import {IGreeterService} from './greeterService';

interface IGreeterScope extends ng.IScope {
    name: string;
    greet(): void;
}

export class GreeterDirective {

    public scope = {};
    public restrict = 'AE';
    public templateUrl = 'app/components/greeter/greeterPartial.html';
    public link: (scope: IGreeterScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

    private _greeterService: IGreeterService;

    constructor(greeterService: IGreeterService) {
        this._greeterService = greeterService;

        this.link = (scope: IGreeterScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            scope.greet = this.greet.bind(this, scope);
        };
    }

    public greet(scope) {
        this._greeterService.greet(scope.name);
    }

    static Factory() {
        var directive = (greeterService: IGreeterService) => {
            return new GreeterDirective(greeterService);
        };

        directive['$inject'] = ['greeterService'];

        return directive;
    }
}