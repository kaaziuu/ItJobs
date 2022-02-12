import { makeAutoObservable, runInAction } from "mobx";
import LoginReguest from "../service/user/dto/LoginRequest";
import User from "../service/user/models/User";
import { GetDefultUser, FetchUserData, Login, Register } from "../service/user/UserService";
import { MapFromAuthToUser } from "../service/user/UserMapper";
import RegisterReguest from "../service/user/dto/RegisterRequest";

export class UserStore {
    user: User = GetDefultUser();
    isLoggedIn: boolean = false;
    isLoading: boolean = false;
    error?: string;

    constructor() {
        makeAutoObservable(this);
    }

    get getUser() {
        return this.user;
    }

    get getisLoggedIn() {
        return this.isLoggedIn;
    }

    get getMessage() {
        return this.error;
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

    register = async (registerRequest: RegisterReguest) => {
        this.isLoading = true;
        try {
            const response = await Register(registerRequest);
            runInAction(() => {
                if (response.isSuccess) {
                    this.user = MapFromAuthToUser(response.data, response.accessToken);
                    this.isLoggedIn = true;
                } else {
                    this.user = GetDefultUser();
                    this.error = response.message;
                }
                this.isLoading = false;
            });
        } catch (e: any) {
            runInAction(() => {
                this.user = GetDefultUser();
                this.error = e.message;
                this.isLoading = false;
            });
        }
    };

    logout = (): void => {
        runInAction(() => {
            this.user = GetDefultUser();
            this.isLoggedIn = false;
        });
    };
}
