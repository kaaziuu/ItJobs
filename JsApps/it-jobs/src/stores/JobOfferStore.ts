import { makeAutoObservable, runInAction } from "mobx";
import BaseResponse from "../service/baseDto/BaseResponse";
import CreateUpdateJobOfferRequest from "../service/jobOffer/dto/CreateUpdateJobOfferRequest";
import JobOfferResponse from "../service/jobOffer/dto/JobOfferResponse";
import ListJobOfferResponse from "../service/jobOffer/dto/ListJobOfferResponse";
import { MapFromJobOfferResponseToJobOffer } from "../service/jobOffer/JobOfferMappers";
import {
    CreateJobOffer,
    FetchAllJobOffes,
    FetchJobOffer,
    FetchMyJobOffers,
    UpdateJobOffer,
} from "../service/jobOffer/JobOfferService";
import JobOffer from "../service/jobOffer/models/JobOffer";

export class JobOfferStore {
    jobOffers: JobOffer[] = [];
    choosedJobOffer?: JobOffer;
    error?: string;
    isLoading: boolean = false;
    maxCount: number = 0;
    currentCount: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get getJobOffers() {
        return this.jobOffers;
    }

    get getChoosedJobOffer() {
        return this.choosedJobOffer;
    }

    get getError() {
        return this.error;
    }

    fetchAllJobOffes = async (searchArg?: string) => {
        this.isLoading = true;
        try {
            const resp = await FetchAllJobOffes(searchArg);
            this._responseJobOfferLisAction(resp);
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.jobOffers = [];
            });
        }
    };

    fetchMyJobOffer = async (accessToken: string, searchArg?: string) => {
        this.isLoading = true;
        try {
            const resp = await FetchMyJobOffers(accessToken, searchArg);
            this._responseJobOfferLisAction(resp);
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.jobOffers = [];
            });
        }
    };

    chooseJobOffer = async (uuid: string) => {
        this.isLoading = true;
        this.choosedJobOffer = this.jobOffers.find((x) => x.uuid === uuid);
        if (this.choosedJobOffer === undefined) {
            try {
                const response = await FetchJobOffer(uuid);
                runInAction(() => {
                    if (response.isSuccess) {
                        this.choosedJobOffer = MapFromJobOfferResponseToJobOffer(response.data);
                        this.error = undefined;
                    } else {
                        this.error = response.message;
                    }
                });
            } catch (e) {
                console.log(e);
                runInAction(() => {
                    this.error = "something went wrong";
                });
            }
        }
        runInAction(() => {
            this.isLoading = false;
        });
    };

    createJobOffer = async (form: CreateUpdateJobOfferRequest, accessToken: string) => {
        this.isLoading = true;
        try {
            const resp = await CreateJobOffer(form, accessToken);
            runInAction(() => {
                if (resp.isSuccess) {
                    this.error = undefined;
                    this.choosedJobOffer = MapFromJobOfferResponseToJobOffer(resp.data);
                } else {
                    this.error = resp.message;
                }

                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = "something went wrong";
                this.isLoading = false;
            });
        }
    };

    updateJobOffer = async (form: CreateUpdateJobOfferRequest, uuid: string, accessToken: string) => {
        this.isLoading = true;
        try {
            const resp = await UpdateJobOffer(form, uuid, accessToken);
            runInAction(() => {
                if (resp.isSuccess) {
                    this.error = undefined;
                    this.choosedJobOffer = MapFromJobOfferResponseToJobOffer(resp.data);
                } else {
                    this.error = resp.message;
                }
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.error = "smoething went wrong";
                this.isLoading = false;
            });
        }
    };

    _responseJobOfferLisAction = (resp: BaseResponse<ListJobOfferResponse>) => {
        runInAction(() => {
            if (resp.isSuccess) {
                this.jobOffers = resp.data.jobOffers.map((x: JobOfferResponse) => MapFromJobOfferResponseToJobOffer(x));
                this.maxCount = resp.data.maxCount;
                this.currentCount = resp.data.currentCount;
                this.error = undefined;
            } else {
                this.error = resp.message;
            }
            this.isLoading = false;
        });
    };
}
