const JobOfferApiPath = {
    fetchAll: "/api/job-offer/public",
    fetchMy: "/api/job-offer",
    fetchOne: (uuid: string) => `/api/job-offer/public/${uuid}`,
    create: "/api/job-offer",
    update: (uuid: string) => `/api/job-offer/update/${uuid}`,
};

export default JobOfferApiPath;
