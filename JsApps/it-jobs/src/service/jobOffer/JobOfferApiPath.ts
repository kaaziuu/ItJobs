const JobOfferApiPath = {
    fetchAll: "/api/job-offer/public",
    fetchOne: (uuid: string) => `/api/job-offer/public/${uuid}`,
    create: "/api/job-offer",
    update: (uuid: string) => `/api/job-offer/${uuid}`,
};

export default JobOfferApiPath;
