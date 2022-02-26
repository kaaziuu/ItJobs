import Company from "../../company/models/Company";

export default interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    expireTokenDate: Date;
    accessToken: string;
    company?: Company;
}
