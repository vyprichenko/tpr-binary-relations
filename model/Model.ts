import { makeObservable, observable, computed, action } from 'mobx';
import zip from 'lodash.zip';
import Variant from '@/model/types/Variant';
import Expert from '@/model/types/Expert';
import Comparison from '@/model/types/Comparison';
import Weight from '@/model/types/Weight';
import CalculationMethod from '@/types/CalculationMethod';
import ExpertsWeights from '@/types/ExpertsWeights';
import ValidationResult from '@/types/ValidationResult';
import cartesianIterator from '@/utils/cartesianIterator';

class Model {
    /**
     * Максимальна кількість варіантів для порівняння.
     */
    variantsLimit = 10;

    /**
     * Максимальна кількість експертів.
     */
    expertsLimit = 5;

    /**
     * Початкові варіанти для порівняння.
     */
    // prettier-ignore
    variants: Variant[] = [
        new Variant('Використання IT студентами для презентації матеріалів, тем на заняттях'),
        new Variant('Використання IT студентами для розвитку навичок мислення високого рівня'),
        new Variant('Використання IT студентами для пошуку інформації, щоб підготувати завдання'),
        new Variant('Використання IT студентами для самостійних навчальних досліджень'),
        new Variant('Використання IT студентами для спілкування та розваг'),
        new Variant('Використання IT студентами для проведення дозвілля, показу фільмів, перегляду фото тощо')
    ];

    /**
     * Початковий перелік експертів.
     */
    experts: Expert[] = [
        new Expert('Денис Бобок', 0.5, 0.2, 0.2, 0.1, 0.05),
        new Expert('Гліб Чекмарьов', 1, 0.3, 0.4, 0.1, 0.04),
        new Expert('Максим Лабунський', 0.7, 0.2, 0.5, 0.08, 0.04),
        new Expert('Іван Скалига', 0.3, 0.1, 0.2, 0.04, 0.02)
    ];

    /**
     * Експерт, який працює в даний момент.
     */
    currentExpert: Expert | null = this.experts[0] ?? null;

    /**
     * Врахувати компетентність експертів при визначенні результату.
     */
    considerExpertWeight: boolean = true;

    /**
     * Кроки виконання роботи.
     */
    steps: { link: string; label: string }[] = [
        { label: 'Альтернативи', link: '/variants' },
        { label: 'Експерти', link: '/experts' },
        { label: 'Порівняння', link: '/calculations' },
        { label: 'Результат', link: '/results' }
    ];

    /**
     * Метод порівняння альтернатив залежно від кількості експертів. 
     */
    calcMethod: CalculationMethod =
        this.experts.length > 1
            ? CalculationMethod.Weight
            : CalculationMethod.Comparison;

    constructor() {
        makeObservable(this, {
            variants: observable,
            experts: observable,
            currentExpert: observable,
            calcMethod: observable,
            considerExpertWeight: observable,
            expertsWeights: computed,
            comparisonsMatrix: computed,
            variantsTriades: computed,
            variantsMap: computed,
            weightsMatrix: computed,
            addVariant: action,
            addExpert: action,
            removeVariant: action,
            removeExpert: action
        });
    }

    /**
     * Перелік альтернатив з їх порядковими номерами.
     */
    get variantsMap() {
        return new Map(this.variants.map((v, i) => [v, i]));
    }

    /**
     * Матриця порівнянь альтернатив.
     * Для кожного експерта формується масив об'єктів Comparison.
     */
    get comparisonsMatrix() {
        return this.experts.map((e) =>
            this.variants.flatMap((v1) =>
                this.variants.map((v2) => new Comparison(v1, v2, e))
            )
        );
    }

    /**
     * Матриця зважених експертних оцінок.
     */
    get weightsMatrix() {
        return this.experts.map((e) =>
            this.variants.map((v) => new Weight(v, e))
        );
    }

    /**
     * Вагомість думки (впливовість) експертів.
     */
    get expertsWeights() {
        if (this.considerExpertWeight) {
            const totalWeight = this.experts.reduce(
                (summ, expert) => (summ += expert.weight),
                0
            );
            return this.experts.reduce<ExpertsWeights>(
                (summ, expert) => (
                    (summ[expert.id] = expert.weight / totalWeight), summ
                ),
                {}
            );
        }
        return this.experts.reduce<ExpertsWeights>(
            (summ, expert) => (
                (summ[expert.id] = 1 / this.experts.length), summ
            ),
            {}
        );
    }

    /**
     * Розміщення (комбінації) варіантів в кортежах по три елементи.
     * @returns всі можливі розміщення (варіанти в них можуть повторюватись).
     */
    get variantsTriades() {
        return cartesianIterator([this.variants, this.variants, this.variants]);
    }

    /**
     * Знаходить об'єкт порівняння по заданим параметрам.
     *
     * @param expert - експерт, що виконує порівняння.
     * @param variant1 - перша альтернатива у порівнянні.
     * @param variant2 - друга альтернатива у порівнянні.
     * @param strict - чи враховувати порядок варіантів.
     */
    findComparisons(
        expert: Expert,
        variant1?: Variant,
        variant2?: Variant,
        strict?: boolean
    ) {
        if (variant1 || variant2)
            return this.comparisonsMatrix
                .flat()
                .filter((c) => c.expert == expert)
                .filter((c) => {
                    if (variant2)
                        return (
                            (c.variant1 == variant1 &&
                                c.variant2 == variant2) ||
                            (c.variant1 == variant2 &&
                                c.variant2 == variant1 &&
                                !strict)
                        );

                    return (
                        c.variant1 == variant1 ||
                        (c.variant2 == variant1 && !strict)
                    );
                });
        else
            return this.comparisonsMatrix
                .flat()
                .filter((c) => c.expert == expert);
    }

    /**
     * Створює новий об'єкт альтернативи.
     *
     * @param name - назва альтернативи.
     * @param description - опис альтернативи.
     */
    addVariant(name: string, description: string = '') {
        if (this.variants.length >= this.variantsLimit) return;

        const variant = new Variant(name, description);
        if (!this.variants.some((v) => v.toString() == variant.toString())) {
            this.variants.push(variant);
        }
    }

    /**
     * Видаляє об'єкт порівняння.
     */
    removeVariant(value: Variant) {
        this.variants = this.variants.filter((v) => v != value);
    }

    /**
     * Додає експерта.
     *
     * @param name
     * @param experience
     * @param jobPosition
     * @param academicDegree
     */
    addExpert(
        name: string,
        knowlege: number,
        theory: number,
        experience: number,
        literature: number,
        intuition: number
    ) {
        if (this.experts.length >= this.expertsLimit) return;

        const expert = new Expert(
            name,
            knowlege,
            theory,
            experience,
            literature,
            intuition
        );
        this.experts.push(expert);
    }

    /**
     * Видаляє експерта.
     */
    removeExpert(value: Expert) {
        this.experts = this.experts.filter((v) => v != value);
    }

    /**
     * Дає оцінку порівнянню.
     */
    setComparisonValue(comparison: Comparison, value: number | null) {
        const { variant1, variant2, expert } = comparison;
        this.findComparisons(expert, variant1, variant2).forEach((c) => {
            if (value === null) {
                c.value = null;
            } else {
                c.variant1 == variant1
                    ? (c.value = value)
                    : (c.value = c.minValue + c.maxValue - value);
            }
        });
    }

    /**
     * Повертає масив оцінок порівнянь згідно порядку альтернатив.
     */
    calculateOrder(expert: Expert) {
        return this.variants.map((v) =>
            this.comparisonsMatrix[this.experts.indexOf(expert)]
                .filter(({ variant1 }) => variant1 == v)
                .reduce((sum, cii) => (sum += cii.valueOf()), 0)
        );
    }

    /**
     * Повертає масив ваг альтернатив з урахуванням коефіцієнта значущості експерта.
     */
    calculateWeights(expert?: Expert): number[] {
        if (expert)
            return this.variants.map((v) =>
                this.weightsMatrix[this.experts.indexOf(expert)]
                    .filter(({ variant }) => variant == v)
                    .reduce(
                        (sum, wei) =>
                            (sum += wei.valueOf(this.considerExpertWeight)),
                        0
                    )
            );

        return zip(...this.experts.map((e) => this.calculateWeights(e))).map(
            (col) =>
                col.reduce<number>((sum, wei) => (sum += wei ?? 0), 0) /
                this.experts.length
        );
    }

    /**
     * Виконує перевірку порівнянь на несуперечливість.
     */
    validateTriades(expert: Expert) {
        const { variantsMap, variantsTriades } = this;
        return [
            ...new Map(
                [...variantsTriades]
                    .filter(([v1, c2, v3]) => v1 != c2 && c2 != v3 && v1 != v3)
                    .map((t) =>
                        t.sort(
                            (v1, v2) =>
                                (variantsMap.get(v1) ?? -1) -
                                (variantsMap.get(v2) ?? -1)
                        )
                    )
                    .map((t) => [`${t[0].id};${t[1].id};${t[2].id}`, t])
            ).values()
        ]
            .map(([v1, v2, v3]): ValidationResult | null => {
                const c1 = this.findComparisons(expert, v1, v2, true)[0];
                const c2 = this.findComparisons(expert, v2, v3, true)[0];
                const c3 = this.findComparisons(expert, v1, v3, true)[0];
                const w1 = c1?.getRelativeValue(v1) ?? 0;
                const w2 = c2?.getRelativeValue(v2) ?? 0;
                const w3 = c3?.getRelativeValue(v1) ?? 0;
                // prettier-ignore
                const n1 = `<i>d</i><sub>${(variantsMap.get(v1) ?? -1) + 1}</sub>`;
                // prettier-ignore
                const n2 = `<i>d</i><sub>${(variantsMap.get(v2) ?? -1) + 1}</sub>`;
                // prettier-ignore
                const n3 = `<i>d</i><sub>${(variantsMap.get(v3) ?? -1) + 1}</sub>`;

                if (w1 < 0 || w2 < 0 || w3 < 0) {
                    return null;
                }
                if (w1 == w2 && w1 == w3) {
                    // prettier-ignore
                    return ['success', `${c1.toString(n1, n2)}, ${c2.toString(n2, n3)} ⇒ ${c3.toString(n1, n3)} — оцінка узгоджена.`];
                }
                if (w1 == w2 && w1 != w3) {
                    // prettier-ignore
                    return ['error', `${c1.toString(n1, n2)}, ${c2.toString(n2, n3)} ⇒ ${c3.toString(n1, n3)} — оцінка неузгоджена!`];
                }
                // prettier-ignore
                return ['info', `Транзитивність відношення ${c1.toString(n1, n2)}, ${c2.toString(n2, n3)} не можна перевірити.`];
            })
            .reduce<ValidationResult[]>((results, message) => {
                if (message) results.push(message);
                return results;
            }, []);
    }
}

const modelInstance = new Model();

export default modelInstance;
