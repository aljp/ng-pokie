import template from './ng-pokie.html';
import './ng-pokie.scss';

export const NgPokieComponent = {
    template,
    bindings: {
        value: '<'
    },
    controller: class NgPokieComponent {
        constructor($scope, $interval) {
            'ngInject';

            this.$scope = $scope;
            this.$interval = $interval;

            this.digitColumns = [];
            this.spinDelay = 300;
            this.spinningIndex = 0;

            this.minFullSpins = 3;
        }

        initDigits() {
            this.digitColumns.length = 0; // Empty the array

            let numAsString = String(this.value);

            for (let char of numAsString) {
                let column = {
                    digits: [],
                    isSpun: false
                };

                let numberIndex = this.minFullSpins * 10 + Number(char);
                for (let i = 0; i < numberIndex; i++) {
                    let asStr = String(i);
                    let displayNum = asStr[asStr.length - 1];
                    column.digits.push(i);
                }

                this.digitColumns.push(column);
            }
        }

        spinDigitColumn(column) {
            column.isSpun = true;
        }

        rollAll() {
            this.initDigits();

            this.spinningIndex = 0;
            this.spinDigitColumn(this.digitColumns[this.spinningIndex]);

            this.spinInterval = this.$interval(() => {
                this.spinningIndex++;
                if (this.spinningIndex >= this.digitColumns.length) {
                    this.$interval.cancel(this.spinInterval);
                } else {
                    this.spinDigitColumn(this.digitColumns[this.spinningIndex]);
                }
            }, this.spinDelay);
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
