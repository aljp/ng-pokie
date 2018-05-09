var NgPokieRandomizerTemplate = `
    <button ng-click="$ctrl.randomize()">Randomize</button>
    <h3>Number: <strong ng-bind="$ctrl.randNum"></strong>
    <ng-pokie value="$ctrl.randNum"></ng-pokie>
`;

var NgPokieRandomizerComponent = {
    template: NgPokieRandomizerTemplate,
    controller: class NgPokieRandomizerComponent {
        constructor() {
            this.randNum = 0;
            this.digits = 5;
        }

        randomize() {
            this.randNum = Math.floor(Math.random() * 10000);
        }
    }
};

angular.module('NgPokieDemo', ['NgPokie'])
    .component('ngPokieRandomizer', NgPokieRandomizerComponent);
