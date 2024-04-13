/// <reference types="chrome"/>

import {Application} from "../utils/inteface.ts";

export const api = {
    get_all_applications,
    set_application,
    set_all_applications
}

export let max_id: number = 0
export let apps: Application[] = []

async function get_all_applications() {
    const data = await chrome.storage.local.get("applications");
    apps = JSON.parse(data.applications)
    max_id = apps.length
    return apps;
}

async function set_application(app: Application) {
    apps.push(app)
    await chrome.storage.local.set({"applications": JSON.stringify(apps)})
}

async function set_all_applications(apps: Application[]) {
    await chrome.storage.local.set({"applications": JSON.stringify(apps)})
}