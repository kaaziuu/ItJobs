export default interface BaseResponse<T> {
    isSuccess: boolean;
    message: string;
    accessToken: string;
    data: T;
}
