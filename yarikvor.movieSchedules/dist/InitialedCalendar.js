"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const local_auth_1 = require("@google-cloud/local-auth");
const fs_1 = require("fs");
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
class InitiatedCalendar {
    static loadSavedCredentialsIfExist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield fs_1.promises.readFile(InitiatedCalendar.TOKEN_PATH);
                const credentials = JSON.parse(content.toString());
                return googleapis_1.google.auth.fromJSON(credentials);
            }
            catch (err) {
                return null;
            }
        });
    }
    static saveCredentials(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield fs_1.promises.readFile(InitiatedCalendar.CREDENTIALS_PATH);
            const keys = JSON.parse(content.toString());
            const key = keys.installed || keys.web;
            const payload = JSON.stringify({
                type: "authorized__user",
                client_id: key.client_id,
                client_secret: key.client_secret,
                refresh_token: client.credentials.refresh_token,
            });
            yield fs_1.promises.writeFile(InitiatedCalendar.TOKEN_PATH, payload);
        });
    }
    static authorize() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield InitiatedCalendar.loadSavedCredentialsIfExist();
            if (client) {
                return client;
            }
            let newClient = yield (0, local_auth_1.authenticate)({
                scopes: InitiatedCalendar.SCOPES,
                keyfilePath: InitiatedCalendar.CREDENTIALS_PATH,
            });
            if (newClient.credentials) {
                yield InitiatedCalendar.saveCredentials(newClient);
            }
            return newClient;
        });
    }
    static createCalendarAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = yield InitiatedCalendar.authorize();
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth: auth });
            return calendar;
        });
    }
    ;
}
InitiatedCalendar.SCOPES = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
];
InitiatedCalendar.TOKEN_PATH = path_1.default.join(__dirname, "token.json");
InitiatedCalendar.CREDENTIALS_PATH = path_1.default.join(__dirname, "client_secret.json");
exports.default = InitiatedCalendar;
//# sourceMappingURL=InitialedCalendar.js.map