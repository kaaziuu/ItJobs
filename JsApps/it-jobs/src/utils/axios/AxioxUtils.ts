import { AxiosRequestConfig } from "axios";

const GetBaseRequestConfig = (accessToken: string): AxiosRequestConfig => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

export default GetBaseRequestConfig;
