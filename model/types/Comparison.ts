import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import Expert from './Expert';
import Variant from './Variant';

export default class Comparison {
    readonly id: string;
    readonly minValue = 0;
    readonly maxValue = 2;
    private _value: number = -1;

    constructor(
        public variant1: Variant,
        public variant2: Variant,
        public expert: Expert
    ) {
        this.id = uuidv4();
        makeAutoObservable(this);
    }

    set value(v: number | null) {
        if (v === null) {
            this._value = -1;
            return;
        }
        if (this.variant1 == this.variant2) {
            return;
        }
        if (v >= this.minValue && v <= this.maxValue) {
            this._value = v;
        } else {
            throw new Error(
                `Value must be a number in range ${this.minValue}-${this.maxValue}, but got ${v}.`
            );
        }
    }

    get value(): number {
        return this._value;
    }

    getRelativeValue(variant: Variant) {
        const median = (this.minValue + this.maxValue) / 2;
        if (this.value < 0) {
            return this.value;
        }
        if (variant == this.variant1) {
            return this.value;
        }
        if (variant == this.variant2 && this.value > median) {
            return this.value - this.maxValue;
        }
        if (variant == this.variant2 && this.value < median) {
            return this.value + this.maxValue;
        }
        if (variant == this.variant2 && this.value == median) {
            return this.value;
        }
    }

    valueOf() {
        if (this._value < 0) return 0;
        return this._value - 1;
    }

    toStringValue() {
        if (this.variant1 == this.variant2) {
            return '0';
        }
        if (this.value < 0) {
            return '–';
        }
        return `${this.value - 1}`;
    }

    matches(that: Comparison) {
        // prettier-ignore
        return (
            (this.variant1 == that.variant1 && this.variant2 == that.variant2)
            ||
            (this.variant1 == that.variant2 && this.variant2 == that.variant1)
        );
    }
}
