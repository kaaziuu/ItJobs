import JobOfferResponse from "./JobOfferResponse";

export default interface ListJobOfferResponse {
    jobOffers: JobOfferResponse[];
    maxCount: number;
    currentCount: number;
}
