import { MapFromCompanyResponseToCompany } from "../company/CompanyMappers";
import JobOfferResponse from "./dto/JobOfferResponse";
import JobOffer from "./models/JobOffer";

export const MapFromJobOfferResponseToJobOffer = (jobOfferResponse: JobOfferResponse): JobOffer => {
    return {
        company: MapFromCompanyResponseToCompany(jobOfferResponse.companyResponse),
        description: jobOfferResponse.description,
        maximumSalary: jobOfferResponse.maximumSalary,
        minimumSalary: jobOfferResponse.minimumSalary,
        position: jobOfferResponse.position,
        uuid: jobOfferResponse.uuid,
    } as JobOffer;
};
