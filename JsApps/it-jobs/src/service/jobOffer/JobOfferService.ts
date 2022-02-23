import axios, { AxiosError, AxiosResponse } from "axios";
import Config from "../../utils/config/Config";
import BaseResponse from "../baseDto/BaseResponse";
import JobOfferResponse from "./dto/JobOfferResponse";
import ListJobOfferResponse from "./dto/ListJobOfferResponse";
import JobOfferApiPath from "./JobOfferApiPath";

export const fetchAllJobOffes = async (): Promise<BaseResponse<ListJobOfferResponse>> => {
    const response = await axios
        .get<null, AxiosResponse<BaseResponse<ListJobOfferResponse>>>(`${Config.serverUrl}${JobOfferApiPath.fetchAll}`)
        .then((resp) => resp.data)
        .catch((e: AxiosError) => {
            return {
                isSuccess: false,
                message: e.message,
            } as BaseResponse<ListJobOfferResponse>;
        });
    return response;
};

export const fetchJobOffer = async (uuid: string): Promise<BaseResponse<JobOfferResponse>> => {
    const response = await axios
        .get<null, AxiosResponse<BaseResponse<JobOfferResponse>>>(
            `${Config.serverUrl}${JobOfferApiPath.fetchOne(uuid)}`
        )
        .then((resp) => resp.data)
        .catch((e: AxiosError) => {
            return {
                isSuccess: false,
                message: e.message,
            } as BaseResponse<JobOfferResponse>;
        });

    return response;
};
