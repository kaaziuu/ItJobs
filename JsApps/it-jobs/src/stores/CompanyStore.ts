import { makeAutoObservable, runInAction } from "mobx";
import { MapFromCompanyResponseToCompany } from "../service/company/CompanyMappers";
import { CreateCompany, GetMyCompany } from "../service/company/CompanyService";
import CreateCompanyRequest from "../service/company/dto/CreateCompanyRequest";
import Company from "../service/company/models/Company";

export class CompanyStore {
    company?: Company;
    isLoading: boolean = false;
    isCompanyLoaded: boolean = false;
    error?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get getCompany() {
        return this.company;
    }

    get getIsLoading() {
        return this.isLoading;
    }

    get getIsCompanyLoaded() {
        return this.isCompanyLoaded;
    }

    fetchMyCompany = async (accessToken: string): Promise<void> => {
        this.isLoading = true;
        try {
            const response = await GetMyCompany(accessToken);
            runInAction(() => {
                if (response.isSuccess) {
                    this.company = MapFromCompanyResponseToCompany(response.data);
                } else {
                    this.company = undefined;
                    this.error = response.message;
                }
                this.isLoading = false;
                this.isCompanyLoaded = true;
            });
        } catch (e) {
            runInAction(() => {
                this.company = undefined;
                this.isLoading = false;
                this.isCompanyLoaded = true;
                console.log(e);
            });
        }
    };

    createCompany = async (createForm: CreateCompanyRequest, accessToken: string): Promise<void> => {
        this.isLoading = true;
        try {
            const response = await CreateCompany(createForm, accessToken);
            runInAction(() => {
                if (response.isSuccess) {
                    this.company = MapFromCompanyResponseToCompany(response.data);
                    this.error = undefined;
                } else {
                    this.error = response.message;
                }
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.company = undefined;
                this.isLoading = false;
                console.log(e);
            });
        }
    };
}
