import { writable } from "svelte/store";
import { Client } from "./client";
import type {Activity, InstanceResponse } from "./types";

let client: Client;
export const makeClient = (url: string) => {
    client = new Client(url);
}

export {client};

/**
 * Stores API so other components can access it.
 */
export const apiData = writable<InstanceResponse>();
export const responseTime = writable<number>();
export const activityData = writable<Activity[]>([]);