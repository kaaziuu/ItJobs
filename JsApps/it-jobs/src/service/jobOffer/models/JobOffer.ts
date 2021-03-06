import Company from "../../company/models/Company";

export default interface JobOffer {
    uuid: string;
    minimumSalary: number;
    maximumSalary: number;
    description: string;
    position: string;
    email: string;
    createAt: Date;
    company: Company;
}
