import React from "react";
import { useLocation } from "react-router-dom";

export type JobOfferParam = {
    uuid: string;
};

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const GetUrl = (path: string, arg: string, nameOfParma: string): string => {
    return path.replace(`:${nameOfParma}`, arg);
};

const Path = {
    home: "/",
    login: "/login",
    register: "/register",
    myComany: "/my-company",
    createCompany: "/create-company",
    updateCompany: "/update-company",
    jobOfferCreate: "/job-offer/create",
    jobOfferDetails: "/job-offer/:uuid",
    jobOfferUpdate: "/job-offer/:uuid/update",
};

export default Path;
