import CompanyResponse from "../../company/dto/CompanyResponse";

export default interface JobOfferResponse {
    uuid: string;
    minimumSalary: number;
    maximumSalary: number;
    description: string;
    position: string;
    email: string;
    createAt: Date;
    companyResponse: CompanyResponse;
}
