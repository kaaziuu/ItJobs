import { makeAutoObservable, runInAction } from "mobx";
import LoginReguest from "../service/user/dto/LoginRequest";
import User from "../service/user/models/User";
import { GetDefultUser, GetRefreshToken, Login, Logout } from "../service/user/PlayerService";
import { MapFromAuthToUser } from "../service/user/UserMapper";

export class UserStore {
    user: User = GetDefultUser();
    isLoaded: boolean = false;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    get getUser() {
        return this.user;
    }

    get isLoggedIn() {
        return this.user.isLogin;
    }

    intiLoad = async (): Promise<void> => {
        console.log(this.isLoaded);
        if (!this.isLoaded) {
            this.isLoaded = true;
            const response = await GetRefreshToken();
            console.log(response);
            runInAction(() => {
                this.user = MapFromAuthToUser(response);
                console.log(this.user.isLogin);
            });
        }
    };

    login = async (loginRequest: LoginReguest): Promise<void> => {
        this.isLoading = true;
        try {
            const user = await Login(loginRequest);
            runInAction(() => {
                this.user = user;
            });
        } catch (e) {
            runInAction(() => {
                this.user = GetDefultUser();
            });
        }
        this.isLoading = false;
    };

    refreshToken = async (): Promise<void> => {
        const response = await GetRefreshToken();
        runInAction(() => {
            this.user.accessToken = response.accessToken;
        });
    };

    logout = async (): Promise<void> => {
        try {
            if (this.user.expireTokenDate.getDate() < new Date().getDate()) {
                this.refreshToken();
            }
            const user = await Logout(this.user.accessToken);
            runInAction(() => {
                this.user = user;
            });
        } catch (e) {
            console.log(e);
        }
    };
}
