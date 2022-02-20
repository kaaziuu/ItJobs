import CompanyResponse from "./dto/CompanyResponse";
import Company from "./models/Company";

export const MapFromCompanyResponseToCompany = (response: CompanyResponse): Company => {
    return {
        id: response.id,
        description: response.description,
        name: response.name,
        size: response.size,
        motto: response.motto,
    };
};
