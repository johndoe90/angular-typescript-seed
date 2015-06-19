/**
 * Created by johndoe on 19.06.15.
 */

/// <reference path="references.ts" />

'use strict';

export class AppController {

    static $inject = ['$translate', '$stateParams'];

    constructor($translate: ng.translate.ITranslateService, $stateParams) {
        $translate.use($stateParams.lang);
    }
}