import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import Variant from './Variant';
import Expert from './Expert';

export default class Weight {
    readonly id: string;
    _value: number = 5;

    constructor(public variant: Variant, public expert: Expert) {
        this.id = uuidv4();
        makeAutoObservable(this);
    }

    get value() {
        return this._value;
    }

    set value(w: number) {
        if (w >= 0 && w <= 10) {
            this._value = w;
        } else {
            throw new Error('Weight must be a positive number.');
        }
    }

    valueOf(considerExpertWeight: boolean = true) {
        return this.value * (considerExpertWeight ? this.expert.weight : 1);
    }

    toString() {
        // prettier-ignore
        {
            if (this.value >= 8) 
                return `Напрямок є важливим і актуальним, реалізується в першу чергу`;
            if (this.value >= 6) 
                return `Напрямок має істотній вплив`;
            if (this.value >= 4) 
                return `Напрямок впливає, але його важко реалізувати`;
            if (this.value >= 1) 
                return `Напрямок робить слабкий вплив, його варто врахувати в майбутньому`;
        }
        return `Напрямок не впливає на дослідження`;
    }
}
