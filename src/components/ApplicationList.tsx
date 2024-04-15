import {infoIcon, trashIcon} from "../assets/icons/svgs.tsx";
import {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails.tsx";
import {Application} from "../utils/inteface.ts";
import {api} from "../data/api.service.ts";



export const ApplicationList = () => {

    const [applications, setApplications] = useState<Application[]>([]);

    //TODO
    useEffect(() => {
        api.get_all_applications()
            .then(data => {
                setApplications(data)
            })
    }, []);

    const columns: string[] = ["Position", "Company", "Status", "Action"]
    const [edit, setEdit] = useState(false)
    const [currApp, setCurrApp] = useState(applications[0])

    const editButtonClick = (application: Application) => {
        setCurrApp(application)
        setEdit(true)
    }

    const deleteButtonClick = async (app: Application) => {
        const newAppsState = applications.filter(x => (x.id !== app.id))
        setApplications(newAppsState)

        await api.set_all_applications(newAppsState)
    }

    const updateApplicationCallback = async (val: boolean, app: Application) => {

        const newAppsState = applications.map(x => (x.id === app.id ? app : x))
        setApplications(newAppsState)
        setEdit(val)

        await api.set_all_applications(newAppsState)

    }


    return (

        !edit ?
            <table
                className="container text-[9px] table-fixed w-full border border-secondary/40">
                <thead className="bg-accent/35 font-bold border border-secondary/40">
                <tr>
                    {
                        columns.map((column, i) => {
                            return (
                                <th key={i} className="border border-secondary/20">{column}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    applications.map((app, index) => {

                        return (
                            <tr key={index}>
                                <td className="border border-secondary/10 p-[1.5px]">{app.position}</td>
                                <td className="border border-secondary/10 p-[1.5px]">{app.company}</td>
                                <td className="border border-secondary/10 p-[1.5px]">{app.status}</td>
                                <td className="border border-secondary/10 p-[1.5px]">
                                    <button
                                        onClick={() => editButtonClick(app)}>{infoIcon}</button>
                                    <button
                                        onClick={() => deleteButtonClick(app)}>{trashIcon}</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <ApplicationDetails
                updateApplicationCallback={updateApplicationCallback}
                application={currApp}
                tabChangeCallback={() => setEdit(false)}
            />
    )
}