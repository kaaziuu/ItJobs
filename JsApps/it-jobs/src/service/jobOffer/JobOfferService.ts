import axios, { AxiosError, AxiosResponse } from "axios";
import GetBaseRequestConfig from "../../utils/axios/AxioxUtils";
import Config from "../../utils/config/Config";
import BaseResponse from "../baseDto/BaseResponse";
import CreateUpdateJobOfferRequest from "./dto/CreateUpdateJobOfferRequest";
import JobOfferResponse from "./dto/JobOfferResponse";
import ListJobOfferResponse from "./dto/ListJobOfferResponse";
import JobOfferApiPath from "./JobOfferApiPath";

export const FetchAllJobOffes = async (searchArg?: string): Promise<BaseResponse<ListJobOfferResponse>> => {
    const search = searchArg ? `?search=${searchArg}` : "";
    const response = await axios
        .get<null, AxiosResponse<BaseResponse<ListJobOfferResponse>>>(
            `${Config.serverUrl}${JobOfferApiPath.fetchAll}${search}`
        )
        .then((resp) => resp.data)
        .catch((e: AxiosError) => {
            return {
                isSuccess: false,
                message: e.message,
            } as BaseResponse<ListJobOfferResponse>;
        });
    return response;
};

export const FetchMyJobOffers = async (
    accessToken: string,
    searchArg?: string
): Promise<BaseResponse<ListJobOfferResponse>> => {
    const search = searchArg ? `?search=${searchArg}` : "";

    const response = await axios
        .get<null, AxiosResponse<BaseResponse<ListJobOfferResponse>>>(
            `${Config.serverUrl}${JobOfferApiPath.fetchMy}${search}`,
            GetBaseRequestConfig(accessToken)
        )
        .then((resp) => resp.data)
        .catch((e: AxiosError) => {
            return {
                isSuccess: false,
                message: e.message,
            } as BaseResponse<ListJobOfferResponse>;
        });
    return response;
};

export const FetchJobOffer = async (uuid: string): Promise<BaseResponse<JobOfferResponse>> => {
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

export const CreateJobOffer = async (
    form: CreateUpdateJobOfferRequest,
    accessToken: string
): Promise<BaseResponse<JobOfferResponse>> => {
    const response = await axios
        .post<CreateUpdateJobOfferRequest, AxiosResponse<BaseResponse<JobOfferResponse>>>(
            `${Config.serverUrl}${JobOfferApiPath.create}`,
            form,
            GetBaseRequestConfig(accessToken)
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

export const UpdateJobOffer = async (
    form: CreateUpdateJobOfferRequest,
    uuid: string,
    accessToken: string
): Promise<BaseResponse<JobOfferResponse>> => {
    const response = await axios
        .post<CreateUpdateJobOfferRequest, AxiosResponse<BaseResponse<JobOfferResponse>>>(
            `${Config.serverUrl}${JobOfferApiPath.update(uuid)}`,
            form,
            GetBaseRequestConfig(accessToken)
        )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            return {
                isSuccess: false,
                message: error.message,
            } as BaseResponse<JobOfferResponse>;
        });

    return response;
};
