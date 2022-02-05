import Config from "../../utils/config/Config";
import AuthResponse from "./dto/AuthResponse";
import User from "./models/User";

export const MapFromAuthToUser = (auth: AuthResponse): User => {
    const now = new Date();
    return {
        accessToken: auth.accessToken,
        expireTokenDate: new Date(now.getTime() + Config.howLongIsValidAccessToken * 60000),
        id: auth.id,
        isLogin: auth.accessToken === "" ? false : true,
        name: auth.name,
        surname: auth.surname,
        username: auth.username,
    };
};
