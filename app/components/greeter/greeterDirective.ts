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

    private _scope: IGreeterScope;
    private _greeterService: IGreeterService;

    constructor(greeterService: IGreeterService) {
        this._greeterService = greeterService;

        this.link = (scope: IGreeterScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            this._scope = scope;
            this._scope.greet = this.greet.bind(this);
        };
    }

    public greet() {
        this._greeterService.greet(this._scope.name);
    }

    static Factory() {
        var directive = (greeterService: IGreeterService) => {
          return new GreeterDirective(greeterService);
        };

        directive['$inject'] = ['greeterService'];

        return directive;
    }
}