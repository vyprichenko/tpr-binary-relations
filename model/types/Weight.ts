import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import Variant from './Variant';
import Expert from './Expert';

export default class Weight {
    readonly id: string;
    _value: number = 0;

    constructor(public variant: Variant, public expert: Expert) {
        this.id = uuidv4();
        makeAutoObservable(this);
    }

    get value() {
        return this._value;
    }

    set value(w: number) {
        if (w >= 0) {
            this._value = w;
        } else {
            throw new Error('Weight must be a positive number.');
        }
    }
}
