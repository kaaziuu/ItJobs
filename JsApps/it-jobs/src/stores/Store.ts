import { createContext, useContext } from "react";
import { CompanyStore } from "./CompanyStore";
import { JobOfferStore } from "./JobOfferStore";
import { UserStore } from "./UserStore";

interface Store {
    userStore: UserStore;
    companyStore: CompanyStore;
    jobOfferStore: JobOfferStore;
}

export const store: Store = {
    userStore: new UserStore(),
    companyStore: new CompanyStore(),
    jobOfferStore: new JobOfferStore(),
};

export const StoreContext = createContext(store);

export function UseStore() {
    return useContext(StoreContext);
}
