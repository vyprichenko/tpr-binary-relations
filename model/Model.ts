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

class Model {
    variantsLimit = 10;

    expertsLimit = 10;

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
            'Layton Mclean',
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
        // makePersistable(this, {
        //     name: 'Lab123ModelStore',
        //     properties: ['variants', 'experts'],
        //     storage:
        //         typeof window == 'undefined' ? undefined : window.localStorage
        // });
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

    setCalcMethod(value: CalculationMethod) {
        this.calcMethod = value;
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
}

const modelInstance = new Model();

export default modelInstance;

