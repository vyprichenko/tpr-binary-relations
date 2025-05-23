import { v4 as uuidv4 } from 'uuid';

/**
 * Одна з порівнюваних альтернатив.
 */
export default class Variant {
    readonly id: string;

    constructor(public name: string = '', public description: string = '') {
        this.id = uuidv4();
    }

    toString() {
        return this.name;
    }
}
