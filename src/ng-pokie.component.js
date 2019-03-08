import template from './ng-pokie.html';
import './ng-pokie.scss';

export const NgPokieComponent = {
    template,
    bindings: {
        value: '<',
        minColumns: '<',
        spinTime: '<'
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

            let colsAmount = this.minColumns || numAsString.length;

            let emptyColumnsAmount = 0;
            if (numAsString.length < colsAmount) {
                emptyColumnsAmount = colsAmount - numAsString.length;

                for (let i = 0; i < emptyColumnsAmount; i++) {
                    numAsString = 0 + numAsString;
                }
            }

            for (let i = 0; i < colsAmount; i++) {
                let column = {
                    digits: [],
                    isSpun: false
                };

                let char = numAsString[i];
                let numberIndex = this.minFullSpins * 10 + Number(char) + 1;
                for (let j = 0; j < numberIndex; j++) {
                    let asStr = String(j);
                    let displayNum = asStr[asStr.length - 1];
                    column.digits.push(displayNum);
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

        initSpinTime() {
            if (this.spinTime && !this.minColumns) {
                this.spinDelay = 0;
                this.spinAnimationTime = this.spinTime;
            } else if (this.spinTime) {
                this.spinDelay = this.spinTime / 2 / this.minColumns;
                this.spinAnimationTime = this.spinTime / 2;
            } else {
                this.spinAnimationTime = this.spinTime;
            }
        }

        getColumnStyles(digitColumn) {
            let columnsShiftAmount = digitColumn.isSpun ? digitColumn.digits.length - 1 : 0;

            return {
                'transition': `transform ${this.spinAnimationTime}ms ease-out`,
                'transform': `translateX(-50%) translateY(calc(-100% * ${columnsShiftAmount}))`
            };
        }

        $onInit() {
            this.$scope.$watch(() => this.value, (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this.rollAll();
                }
            });

            this.initDigits();
            this.initSpinTime();
        }
    }
};
