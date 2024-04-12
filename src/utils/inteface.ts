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