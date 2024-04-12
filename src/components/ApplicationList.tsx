import {editIcon, trashIcon} from "../assets/icons/svgs.tsx";
import {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails.tsx";
import {Application} from "../utils/inteface.ts";
import {api} from "../data/api.service.ts";


export const ApplicationList = () => {

    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        api.get_all_applications()
            .then(data => {
                setApplications(data)
            })
    }, []);

    const [edit, setEdit] = useState(false)
    const [currApp, setCurrApp] = useState(applications[0])

    const editButtonClick = (application: Application) => {
        setCurrApp(application)
        setEdit(true)
    }

    const deleteButtonClick = () => {
    }

    const columns: string[] = ["Position", "Company", "Status", "Action"]

    return (

        !edit ?
            <table className="container text-[9px] table-fixed w-full border border-secondary/40">
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
                                <td className="border border-secondary/10">{app.position}</td>
                                <td className="border border-secondary/10">{app.company}</td>
                                <td className="border border-secondary/10">{app.status}</td>
                                <td className="border border-secondary/10">
                                    <button
                                        onClick={() => editButtonClick(app)}>{editIcon}</button>
                                    <button onClick={deleteButtonClick}>{trashIcon}</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table> : <ApplicationDetails callback={(val: boolean) => {
                setEdit(val)
            }} application={currApp}/>
    )
}