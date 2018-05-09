import template from './ng-pokie.html';

export const NgPokieComponent = {
    template,
    bindings: {
        value: '<'
    },
    controller: class NgPokieComponent {
        constructor($scope, $timeout) {
            'ngInject';

            this.$scope = $scope;
            this.$timeout = $timeout;

            this.digits = [];
        }

        initDigits() {
            this.digits.length = 0; // Empty the array

            let numAsString = String(this.value);

            for (let char of numAsString) {
                this.digits.push(char);
            }
        }

        rollAll() {
            this.initDigits();
        }

        $onInit() {
            this.$scope.$watch(() => this.value, (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this.rollAll();
                }
            });

            if (typeof this.value === 'number' || typeof this.value === 'string') {
                this.rollAll();
            }
        }
    }
};
