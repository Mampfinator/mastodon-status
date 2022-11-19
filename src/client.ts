import type { Activity, InstanceResponse } from "./types";

export class Client {
    private readonly baseUrl;
    constructor(
        baseUrl: string
    ) {
        if (!baseUrl.includes("http")) {
            baseUrl = `https://${baseUrl}`;
        } 
        if (!baseUrl.endsWith("/")) baseUrl += "/";

        this.baseUrl = baseUrl;
    }

    public async getActivities(): Promise<Activity[]> {
        return fetch(`${this.baseUrl}v1/instance/activity`).then(res => res.json());
    }

    public async getInstance(): Promise<InstanceResponse> {
        return fetch(`${this.baseUrl}v1/instance`).then(res => res.json());
    }
}