import { makeObservable, observable, computed, action, flow } from 'mobx';
import Variant from '@/model/types/Variant';
import Expert from '@/model/types/Expert';
import Comparison from '@/model/types/Comparison';
import Weight from '@/model/types/Weight';
import CalculationMethod from '@/types/CalculationMethod';
import JobPosition from '@/types/JobPosition';
import AcademicDegree from '@/types/AcademicDegree';
import ExpertsWeights from '@/types/ExpertsWeights';
import ValidationResult from '@/types/ValidationResult';
import cartesianIterator from '@/utils/cartesianIterator';

class Model {
    variantsLimit = 10;

    expertsLimit = 5;

    variants: Variant[] = [
        new Variant('Audi'),
        new Variant('Nissan'),
        new Variant('Great Wall'),
        new Variant('Hyundai'),
        new Variant('Jeep'),
        new Variant('Lancia')
    ];

    experts: Expert[] = [
        new Expert(
            'Fabrice Bellard',
            25,
            JobPosition.LeadingEngeneer,
            AcademicDegree.NonDegreeSpecialist
        )
    ];

    steps: { link: string; label: string }[] = [
        { label: 'Альтернативи', link: '/variants' },
        // { label: 'Експерти', link: '/experts' },
        { label: 'Порівняння', link: '/calculations' },
        { label: 'Результат', link: '/results' }
    ];

    calcMethod: CalculationMethod = CalculationMethod.Comparison;

    constructor() {
        makeObservable(this, {
            variants: observable,
            experts: observable,
            calcMethod: observable,
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

    get variantsMap() {
        return new Map(this.variants.map((v, i) => [v, i]));
    }

    get comparisonsMatrix() {
        return this.experts.map((e) =>
            this.variants.flatMap((v1) =>
                this.variants.map((v2) => new Comparison(v1, v2, e))
            )
        );
    }

    get weightsMatrix() {
        return this.experts.map((e) =>
            this.variants.map((v) => new Weight(v, e))
        );
    }

    get expertsWeights() {
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

    get variantsTriades() {
        return cartesianIterator([this.variants, this.variants, this.variants]);
    }

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

    addVariant(name: string, description: string = '') {
        if (this.variants.length >= this.variantsLimit) return;

        const variant = new Variant(name, description);
        if (!this.variants.some((v) => v.toString() == variant.toString())) {
            this.variants.push(variant);
        }
    }

    removeVariant(value: Variant) {
        this.variants = this.variants.filter((v) => v != value);
    }

    addExpert(
        name: string,
        experience: number,
        jobPosition: JobPosition,
        academicDegree: AcademicDegree
    ) {
        if (this.experts.length >= this.expertsLimit) return;

        const expert = new Expert(
            name,
            experience,
            jobPosition,
            academicDegree
        );
        this.experts.push(expert);
    }

    removeExpert(value: Expert) {
        this.experts = this.experts.filter((v) => v != value);
    }

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

    calculateOrder() {
        return this.variants.map((v) =>
            this.comparisonsMatrix[0]
                .filter(({ variant1 }) => variant1 == v)
                .reduce((sum, cii) => (sum += cii.valueOf()), 0)
        );
    }

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
                    return ['success', `Оцінка ${c1.toString(n1, n2)}, ${c2.toString(n2, n3)}, ${c3.toString(n1, n3)} узгоджена.`];
                }
                if (w1 == w2 && w1 != w3) {
                    // prettier-ignore
                    return ['error', `Оцінка ${c1.toString(n1, n2)}, ${c2.toString(n2, n3)}, ${c3.toString(n1, n3)} неузгоджена!`];
                }
                // prettier-ignore
                return ['info', `Транзитивність ${c1.toString(n1, n2)}, ${c2.toString(n2, n3)} не можна перевірити.`];
            })
            .reduce<ValidationResult[]>((results, message) => {
                if (message) results.push(message);
                return results;
            }, []);
    }
}

const modelInstance = new Model();

export default modelInstance;
