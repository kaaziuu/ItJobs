import axios, { AxiosError, AxiosResponse } from "axios";
import GetBaseRequestConfig from "../../utils/axios/AxioxUtils";
import Config from "../../utils/config/Config";
import BaseResponse from "../baseDto/BaseResponse";
import CompanyApiPath from "./CompanyApiPath";
import CompanyResponse from "./dto/CompanyResponse";
import CreateUpdateCompanyRequest from "./dto/CreateUpdateCompanyRequest";

export const GetMyCompany = async (accessToken: string): Promise<BaseResponse<CompanyResponse>> => {
    const response = await axios
        .get<null, AxiosResponse<BaseResponse<CompanyResponse>>>(
            `${Config.serverUrl}${CompanyApiPath.getCompany}`,
            GetBaseRequestConfig(accessToken)
        )
        .then((resp) => resp.data)
        .catch((error: AxiosError) => {
            return {
                isSuccess: false,
                message: error.message,
            } as BaseResponse<CompanyResponse>;
        });
    return response;
};

export const CreateCompany = async (
    createForm: CreateUpdateCompanyRequest,
    accessToken: string
): Promise<BaseResponse<CompanyResponse>> => {
    const response = await axios
        .post<CreateUpdateCompanyRequest, AxiosResponse<BaseResponse<CompanyResponse>>>(
            `${Config.serverUrl}${CompanyApiPath.createCompany}`,
            createForm,
            GetBaseRequestConfig(accessToken)
        )
        .then((resp) => resp.data)
        .catch((error) => {
            return {
                isSuccess: false,
                message: error.message,
            } as BaseResponse<CompanyResponse>;
        });
    return response;
};

export const UpdateCompany = async (
    createForm: CreateUpdateCompanyRequest,
    accessToken: string
): Promise<BaseResponse<CompanyResponse>> => {
    const response = await axios
        .post<CreateUpdateCompanyRequest, AxiosResponse<BaseResponse<CompanyResponse>>>(
            `${Config.serverUrl}${CompanyApiPath.updateCompany}`,
            createForm,
            GetBaseRequestConfig(accessToken)
        )
        .then((resp) => resp.data)
        .catch((error) => {
            return {
                isSuccess: false,
                message: error.message,
            } as BaseResponse<CompanyResponse>;
        });
    return response;
};
