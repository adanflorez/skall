import { Interest } from './interest.interface';
import { AcademicList } from './academic-list.interface';

export interface UserProfile {
    academicList: Array<AcademicList>;
    addressUser: string;
    ageUser: number;
    email: string;
    firstNameUser: string;
    genderUser: string;
    interestList: Array<Interest>;
    jobUser: string;
    lastNameUser: string;
    logo: string;
    name: string;
    notifyUrl: string;
    numberLesson: number;
    parlorDescription: string;
    phoneNumber: string;
    phoneUser: string;
    publicKey: string;
    secondLastNameUser: string;
    skillList: Array<any>;
    status: boolean;
    statusUser: boolean;
    subscribers: number;
    urlImgUser: string;
}
