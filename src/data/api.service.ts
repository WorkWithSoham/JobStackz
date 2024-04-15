/// <reference types="chrome"/>

import {Application} from "../utils/inteface.ts";


export const api = {
    get_all_applications,
    set_application,
    set_all_applications,
    set_resources,
    set_linkedin_message,
    get_resources,
    get_linkedin_message,
    get_theme,
    set_theme,
    clear_data
}


export let max_id: number = 0
export let apps: Application[] = []

async function get_all_applications() {
    const data = await chrome.storage.local.get("applications");
    apps = data.applications ? JSON.parse(data.applications) : [];
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

async function set_linkedin_message(message: string) {
    await chrome.storage.local.set({"linkedin_message": message})
}

async function get_linkedin_message() {
    const data = await chrome.storage.local.get("linkedin_message");
    return data.linkedin_message
}

async function set_resources(message: string) {
    await chrome.storage.local.set({"resources": message})
}

async function get_resources() {
    const data = await chrome.storage.local.get("resources");
    return data.resources
}

async function get_theme() {
    const data = await chrome.storage.local.get("theme");
    return data.theme
}

async function set_theme(theme: string) {
    await chrome.storage.local.set({"theme": theme})
}

async function clear_data() {
    await chrome.storage.local.clear()
}