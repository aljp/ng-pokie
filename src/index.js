import angular from 'angular';

import { NgPokieComponent } from './ng-pokie.component.js';

export const NgPokieModule = angular.module('NgPokie', [])
    .component('ngPokie', NgPokieComponent)
    .name;
