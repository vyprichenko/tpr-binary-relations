import { v4 as uuidv4 } from 'uuid';
import Jabber from 'jabber';
import JobPosition from '@/types/JobPosition';
import AcademicDegree from '@/types/AcademicDegree';

const JOB_WEIGHTS = {
    [JobPosition.LeadingEngeneer]: 1,
    [JobPosition.Researcher]: 1,
    [JobPosition.LeadingResearcher]: 2,
    [JobPosition.SectorLaboratoryHead]: 3,
    [JobPosition.DepartmentHead]: 5,
    [JobPosition.ComplexHead]: 7,
    [JobPosition.Director]: 10
};

const DEGREE_WEIGHTS = {
    [AcademicDegree.NonDegreeSpecialist]: 1,
    [AcademicDegree.PhD]: 4,
    [AcademicDegree.DSc]: 7,
    [AcademicDegree.Academician]: 10
};

const jabber = new Jabber();

export default class Expert {
    static generateName() {
        return jabber.createFullName(false);
    }

    readonly id: string;

    constructor(
        public name: string,
        public knowlege: number,
        public theory: number,
        public experience: number,
        public literature: number,
        public intuition: number,
        public jobPosition?: JobPosition,
        public academicDegree?: AcademicDegree
    ) {
        this.id = uuidv4();
    }

    get weight() {
        // TODO: old parameters, currently not in use
        if (this.jobPosition && this.academicDegree) {
            return (
                (JOB_WEIGHTS[this.jobPosition] +
                    DEGREE_WEIGHTS[this.academicDegree] * 5) *
                (100 / (100 - Math.min(99, this.experience)) / 10)
            );
        }
        return (
            (this.knowlege +
                this.theory +
                this.experience +
                this.literature +
                this.intuition) /
            2
        );
    }

    toString() {
        return this.name;
    }
}
