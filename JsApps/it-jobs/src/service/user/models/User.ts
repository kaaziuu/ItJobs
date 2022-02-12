export default interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    expireTokenDate: Date;
    accessToken: string;
}
