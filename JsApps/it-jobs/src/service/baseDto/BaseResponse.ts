export default interface BaseResponse<T> {
    isSuccess: boolean;
    message: string;
    date: T;
}
