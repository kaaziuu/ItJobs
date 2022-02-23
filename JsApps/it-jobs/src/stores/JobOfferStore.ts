import { makeAutoObservable, runInAction } from "mobx";
import JobOfferResponse from "../service/jobOffer/dto/JobOfferResponse";
import { MapFromJobOfferResponseToJobOffer } from "../service/jobOffer/JobOfferMappers";
import { fetchAllJobOffes, fetchJobOffer } from "../service/jobOffer/JobOfferService";
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

    fetchAllJobOffes = async () => {
        this.isLoading = true;
        try {
            const resp = await fetchAllJobOffes();
            runInAction(() => {
                if (resp.isSuccess) {
                    this.jobOffers = resp.data.jobOffers.map((x: JobOfferResponse) =>
                        MapFromJobOfferResponseToJobOffer(x)
                    );
                    this.maxCount = resp.data.maxCount;
                    this.currentCount = resp.data.currentCount;
                    this.error = undefined;
                } else {
                    this.error = resp.message;
                }
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.jobOffers = [];
            });
        }
    };

    chooseJobOffer = async (uuid: string) => {
        this.isLoading = true;
        this.choosedJobOffer = this.jobOffers.find((x) => x.uuid == uuid);
        if (this.choosedJobOffer === undefined) {
            try {
                const response = await fetchJobOffer(uuid);
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
}
