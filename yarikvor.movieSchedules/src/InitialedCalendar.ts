import { authenticate } from "@google-cloud/local-auth";
import { promises } from "fs";
import { google } from "googleapis";
import path from "path";

export default class InitiatedCalendar
{
  public static readonly SCOPES = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  public static readonly TOKEN_PATH = path.join(__dirname, "token.json");
  public static readonly CREDENTIALS_PATH = path.join(__dirname, "client_secret.json");

  private static async loadSavedCredentialsIfExist() {
    try {
      const content = await promises.readFile(InitiatedCalendar.TOKEN_PATH);
      const credentials = JSON.parse(content.toString());
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  private static async saveCredentials(client: any) {
    const content = await promises.readFile(InitiatedCalendar.CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized__user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await promises.writeFile(InitiatedCalendar.TOKEN_PATH, payload);
  }

  private static async authorize() {
    let client = await InitiatedCalendar.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    let newClient = await authenticate({
      scopes: InitiatedCalendar.SCOPES,
      keyfilePath: InitiatedCalendar.CREDENTIALS_PATH,
    });
    if (newClient.credentials) {
      await InitiatedCalendar.saveCredentials(newClient);
    }
    return newClient;
  }

  public static async createCalendarAsync()
  {
    const auth = await InitiatedCalendar.authorize();
    const calendar = google.calendar({version: 'v3', auth: auth as any});
    return calendar;
  };
}