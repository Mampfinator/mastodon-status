import type { Activity, InstanceResponse } from "./types";

export class Client {
    readonly baseUrl;
    constructor(
        baseUrl: string
    ) {
        if (!baseUrl.startsWith(`http`)) baseUrl =  `https://` + baseUrl;

        const url = new URL(baseUrl);

        if (!url.pathname.includes("api")) {
            url.pathname = `api/v1/`;
        }

        this.baseUrl = url.toString();
    }

    public async getActivities(): Promise<Activity[]> {
        return fetch(`${this.baseUrl}instance/activity`).then(res => res.json());
    }

    public async getInstance(): Promise<InstanceResponse> {
        return fetch(`${this.baseUrl}instance`).then(res => res.json());
    }
}