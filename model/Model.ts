import { makeObservable, observable, computed, action, flow } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import Variant from '@/model/types/Variant';
import Expert from '@/model/types/Expert';
import Comparison from '@/model/types/Comparison';
import Weight from '@/model/types/Weight';
import CalculationMethod from '@/types/CalculationMethod';
import JobPosition from '@/types/JobPosition';
import AcademicDegree from '@/types/AcademicDegree';
import ExpertsWeights from '@/types/ExpertsWeights';
import cartesianIterator from '@/utils/cartesianIterator';

class Model {
    variantsLimit = 10;

    expertsLimit = 1;

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
            'Dmytro Vyprichenko',
            5,
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
            weightsMatrix: computed,
            addVariant: action,
            addExpert: action,
            removeVariant: action,
            removeExpert: action
        });
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
        this.comparisonsMatrix
            .flat()
            .filter((c) => c.expert == expert)
            .filter(
                (c) =>
                    (c.variant1 == variant1 && c.variant2 == variant2) ||
                    (c.variant1 == variant2 && c.variant2 == variant1)
            )
            .forEach((c) => {
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

    validateTriades() {
        const comparisons = this.comparisonsMatrix[0];
        return [
            ...new Map(
                [...this.variantsTriades]
                    .filter((t) => t[0] != t[1] && t[1] != t[2] && t[2] != t[0])
                    .map((t) =>
                        t.sort((v1, v2) => {
                            if (v1.name > v2.name) return 1;
                            if (v1.name < v2.name) return -1;
                            return 0;
                        })
                    )
                    .map((t) => [`${t[0].id};${t[1].id};${t[2].id}`, t])
            ).values()
        ]
            .map(([d1, d2, d3]) => {
                const c1 = comparisons.find(
                    (c) =>
                        (c.variant1 == d1 && c.variant2 == d2) ||
                        (c.variant1 == d2 && c.variant2 == d1)
                );
                const c2 = comparisons.find(
                    (c) =>
                        (c.variant1 == d2 && c.variant2 == d3) ||
                        (c.variant1 == d3 && c.variant1 == d1)
                );
                const c3 = comparisons.find(
                    (c) =>
                        (c.variant1 == d1 && c.variant2 == d3) ||
                        (c.variant1 == d3 && c.variant2 == d1)
                );
                const w1 = c1?.getRelativeValue(d1) ?? 0;
                const w2 = c2?.getRelativeValue(d2) ?? 0;
                const w3 = c3?.getRelativeValue(d1) ?? 0;

                if (w1 == w2 && w1 != w3) {
                    return `Оцінка ${d1}, ${d2}, ${d3} неузгоджена!`;
                }
                return null;
            })
            .reduce<string[]>((results, message) => {
                if (message) results.push(message);
                return results;
            }, []);
    }
}

const modelInstance = new Model();

export default modelInstance;
