export default class InitiatedCalendar {
    static readonly SCOPES: string[];
    static readonly TOKEN_PATH: string;
    static readonly CREDENTIALS_PATH: string;
    private static loadSavedCredentialsIfExist;
    private static saveCredentials;
    private static authorize;
    static createCalendarAsync(): Promise<import("googleapis").calendar_v3.Calendar>;
}
