import { makeAutoObservable, runInAction } from "mobx";
import { MapFromCompanyResponseToCompany } from "../service/company/CompanyMappers";
import { CreateCompany, GetMyCompany, UpdateCompany } from "../service/company/CompanyService";
import CreateUpdateCompanyRequest from "../service/company/dto/CreateUpdateCompanyRequest";
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
        this.isCompanyLoaded = false;
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

    createCompany = async (createForm: CreateUpdateCompanyRequest, accessToken: string): Promise<void> => {
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

    updateCompany = async (updateForm: CreateUpdateCompanyRequest, accessToken: string): Promise<void> => {
        this.isLoading = true;
        try {
            const response = await UpdateCompany(updateForm, accessToken);
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
