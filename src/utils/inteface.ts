export interface Application {
    id: number,
    app_date: string,
    position: string,
    company: string,
    location: string,
    status: string,
    jobLink: string,
    notes: string
}


export const emptyApplication: Application = {
    id: -1,
    app_date: "",
    position: "",
    company: "",
    location: "",
    status: "",
    jobLink: "",
    notes: ""
}