import {Application} from "../utils/inteface.ts";
import React from "react";
import moment from "moment";

export const ApplicationDetails = (props: {
    callback: (val: boolean, app: Application) => void,
    application: Application
}) => {

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const valueSet: EventTarget & HTMLFormElement = e.currentTarget
        const data: Application = {
            company: valueSet.company.value,
            status: valueSet.status.value,
            jobLink: valueSet.jobLink.value,
            position: valueSet.position.value,
            notes: valueSet.notes.value,
            id: props.application.id,
            app_date: moment(Date.now()).format("YYYY-MM-DD")
        }
        valueSet.reset();

        props.callback(false, data)
    }


    return (
        <div className="p-3">
            <form onSubmit={formSubmit}>
                <p className="text-start">Company</p>
                <input
                    className="w-full my-1 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="company"
                    placeholder="Company name"
                    defaultValue={props.application.company}
                />

                <p className="text-start">Position</p>
                <input
                    className="w-full my-1 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="position"
                    placeholder="Position"
                    defaultValue={props.application.position}
                />

                <p className="text-start">Job Link</p>
                <input
                    className="w-full my-1 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="jobLink"
                    placeholder="Job Link"
                    defaultValue={props.application.jobLink}
                />

                <p className="text-start">Application Date</p>
                <input type="date" name="app_date" className="w-full my-1 rounded p-1 bg-accent/30"
                       defaultValue={moment(props.application.app_date).format("YYYY-MM-DD")}
                       min="2000-01-01"
                       max="2030-12-31"/>

                <p className="text-start">Status</p>
                <select
                    className="w-full my-1 h-10 rounded p-1 bg-accent/30"
                    name="status"
                    defaultValue={props.application.status}
                >
                    <option value="..." disabled={true}>Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Reject">Reject</option>
                    <option value="Process">In Process</option>
                </select>

                <p className="text-start">Notes</p>
                <textarea
                    className="w-full my-1 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="notes"
                    rows={5}
                    placeholder="Notes"
                    defaultValue={props.application.notes}
                />

                <button className="bg-emerald-600/50 rounded-3xl p-3" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    )
}