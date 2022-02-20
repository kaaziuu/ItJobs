import { createContext, useContext } from "react";
import { CompanyStore } from "./CompanyStore";
import { UserStore } from "./UserStore";

interface Store {
    userStore: UserStore;
    companyStore: CompanyStore;
}

export const store: Store = {
    userStore: new UserStore(),
    companyStore: new CompanyStore(),
};

export const StoreContext = createContext(store);

export function UseStore() {
    return useContext(StoreContext);
}
