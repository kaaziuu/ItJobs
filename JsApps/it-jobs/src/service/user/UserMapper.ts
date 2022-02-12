import Config from "../../utils/config/Config";
import AuthResponse from "./dto/AuthResponse";
import User from "./models/User";

export const MapFromAuthToUser = (auth: AuthResponse, accessToken: string): User => {
    const now = new Date();
    console.log("MapFromAuthToUser", accessToken);
    return {
        accessToken: accessToken,
        expireTokenDate: new Date(now.getTime() + Config.howManyDaysTokenIsValid * 3600 * 24 * 60000),
        id: auth.id,
        name: auth.name,
        surname: auth.surname,
        username: auth.username,
    };
};
