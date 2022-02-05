import axios, { AxiosError, AxiosResponse } from "axios";
import Config from "../../utils/config/Config";
import AuthResponse from "./dto/AuthResponse";
import LoginReguest from "./dto/LoginRequest";
import User from "./models/User";
import UserApiPath from "./UserApiPaht";
import { MapFromAuthToUser } from "./UserMapper";

export const Login = async (form: LoginReguest): Promise<User> => {
    const resp = await axios
        .post<LoginReguest, AxiosResponse<AuthResponse>>(`${Config.serverUrl}${UserApiPath.login}`, form, {})
        .then((resp) => resp.data)
        .catch((err: AxiosError) => {
            return { id: -1 } as AuthResponse;
        });

    return resp.id === -1 ? GetDefultUser() : MapFromAuthToUser(resp);
};

export const GetRefreshToken = async (): Promise<User> => {
    const resp = await axios
        .post<null, AxiosResponse<AuthResponse>>(`${Config.serverUrl}${UserApiPath.refreshToken}`, null, {})
        .then((resp) => resp.data)
        .catch((err: AxiosError) => {
            return {
                id: -1,
            } as AuthResponse;
        });

    return resp.id === -1 ? GetDefultUser() : MapFromAuthToUser(resp);
};

export const Logout = async (accessToken: string): Promise<User> => {
    await axios.post<null, AxiosResponse>(`${Config.serverUrl}${UserApiPath.logout}`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return GetDefultUser();
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
