export interface Application {
    id: number,
    company: string,
    position: string,
    status: string,
    jobLink: string,
    app_date: string,
    notes: string
}

export interface ApplicationPatch {
    id: number,
    company: string,
    position: string,
    status: string,
    jobLink?: string,
    app_date?: string,
    notes?: string
}

export const emptyApplication: Application = {
    app_date: "",
    company: "",
    id: -1,
    jobLink: "",
    notes: "",
    position: "",
    status: ""
}