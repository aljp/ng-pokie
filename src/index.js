import angular from 'angular';

import { NgPokieComponent } from './ng-pokie.component.js';

export default angular.module('NgPokie', [])
    .component('ngPokie', NgPokieComponent)
    .name;
