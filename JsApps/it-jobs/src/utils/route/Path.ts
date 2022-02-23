export type JobOfferParam = {
    uuid: string;
};

const Path = {
    home: "/",
    login: "/login",
    register: "/register",
    myComany: "/my-company",
    createCompany: "/create-company",
    updateCompany: "/update-company",
    jobOffer: "/job-offer",
    jobOfferDetails: "/job-offer/:uuid",
};

export default Path;
