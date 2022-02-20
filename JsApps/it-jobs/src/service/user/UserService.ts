import axios, { AxiosError, AxiosResponse } from "axios";
import Config from "../../utils/config/Config";
import BaseResponse from "../baseDto/BaseResponse";
import AuthResponse from "./dto/AuthResponse";
import LoginReguest from "./dto/LoginRequest";
import RegisterReguest from "./dto/RegisterRequest";
import User from "./models/User";
import UserApiPath from "./UserApiPath";
import jwt_decode from "jwt-decode";
import AccessToken from "./models/AccessToken";

export const Login = async (form: LoginReguest): Promise<BaseResponse<AuthResponse>> => {
    const resp = await axios
        .post<LoginReguest, AxiosResponse<BaseResponse<AuthResponse>>>(
            `${Config.serverUrl}${UserApiPath.login}`,
            form,
            {}
        )
        .then((resp) => resp.data)
        .catch((err: AxiosError) => {
            return { isSuccess: false, message: "invalid username or password" } as BaseResponse<AuthResponse>;
        });

    return resp;
};

export const FetchUserData = async (token?: string): Promise<BaseResponse<AuthResponse>> => {
    const resp = await axios
        .post<string | undefined, AxiosResponse<BaseResponse<AuthResponse>>>(
            `${Config.serverUrl}${UserApiPath.userData}`,
            token,
            {}
        )
        .then((resp) => resp.data)
        .catch((err: AxiosError) => {
            return {
                isSuccess: false,
                message: "error",
            } as BaseResponse<AuthResponse>;
        });

    return resp;
};

export const Logout = async (accessToken: string): Promise<User> => {
    await axios.post<null, AxiosResponse>(`${Config.serverUrl}${UserApiPath.logout}`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return GetDefultUser();
};

export const Register = async (registerRequest: RegisterReguest): Promise<BaseResponse<AuthResponse>> => {
    const resp = await axios
        .post<RegisterReguest, AxiosResponse<BaseResponse<AuthResponse>>>(
            `${Config.serverUrl}${UserApiPath.register}`,
            registerRequest
        )
        .then((resp) => resp.data)
        .catch((e: AxiosError) => {
            return {
                isSuccess: false,
                message: e.message,
            } as BaseResponse<AuthResponse>;
        });
    return resp;
};

export const GetDefultUser = (): User => {
    return {
        accessToken: "",
        expireTokenDate: new Date(),
        id: -1,
        isLogin: false,
        name: "",
        surname: "",
        username: "",
    } as User;
};

export const GetRolesFromAccessToken = (accessToken: string): string[] => {
    const decodedAccessToken = jwt_decode<AccessToken>(accessToken);
    return decodedAccessToken.roles;
};
