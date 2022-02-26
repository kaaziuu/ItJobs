import CompanyResponse from "../../company/dto/CompanyResponse";

export default interface AuthResponse {
    name: string;
    surname: string;
    username: string;
    id: number;
    company?: CompanyResponse;
}
