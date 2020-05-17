import { Interest } from './interest.interface';
import { AcademicList } from './academic-list.interface';

export interface UserProfile {
    address: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    logo: string;
    phoneNumber: string;
    secondLastName: string;
    age: number;
    job: string;
    academicList: Array<AcademicList>;
    interestList: Array<Interest>;
}
