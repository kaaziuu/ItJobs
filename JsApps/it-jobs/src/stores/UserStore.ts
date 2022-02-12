import { makeAutoObservable, runInAction } from "mobx";
import LoginReguest from "../service/user/dto/LoginRequest";
import User from "../service/user/models/User";
import { GetDefultUser, FetchUserData, Login, Logout } from "../service/user/UserService";
import { MapFromAuthToUser } from "../service/user/UserMapper";

export class UserStore {
    user: User = GetDefultUser();
    isLoggedIn: boolean = false;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getUser() {
        return this.user;
    }

    get getisLoggedIn() {
        return this.isLoggedIn;
    }

    intiLoad = async (token?: string): Promise<void> => {
        const response = await FetchUserData(token);
        runInAction(() => {
            if (response.isSuccess) {
                this.user = MapFromAuthToUser(response.data, response.accessToken);
                this.isLoggedIn = true;
            } else {
                this.user = GetDefultUser();
            }
        });
    };

    login = async (loginRequest: LoginReguest): Promise<void> => {
        this.isLoading = true;
        try {
            const response = await Login(loginRequest);
            runInAction(() => {
                if (response.isSuccess) {
                    this.user = MapFromAuthToUser(response.data, response.accessToken);
                    this.isLoggedIn = true;
                } else {
                    this.user = GetDefultUser();
                }
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.user = GetDefultUser();
                this.isLoading = false;
            });
        }
    };

    logout = (): void => {};
}
