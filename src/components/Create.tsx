import React from "react";
import {Application} from "../utils/inteface.ts";
import {api, max_id} from "../data/api.service.ts";
import moment from "moment/moment";

export const Create = () => {

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const valueSet: EventTarget & HTMLFormElement = e.currentTarget
        const data: Application = {
            company: valueSet.company.value,
            status: valueSet.status.value,
            jobLink: valueSet.jobLink.value,
            position: valueSet.position.value,
            notes: valueSet.notes.value,
            id: max_id,
            app_date: moment(Date.now()).format("YYYY-MM-DD")
        }

        await api.set_application(data)

        valueSet.reset();
    }

    return (
        <div>
            <form className="p-3" onSubmit={formSubmit}>
                <input
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="company"
                    placeholder="Company name"
                />
                <input
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="position"
                    placeholder="Position"
                />
                <input
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="jobLink"
                    placeholder="Job Link"
                />
                <select
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30"
                    name="status"
                >
                    <option value="..." disabled={true}>Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Reject">Reject</option>
                    <option value="Process">In Process</option>
                </select>
                <textarea
                    className="w-full my-2 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="notes"
                    rows={5}
                    placeholder="Notes"
                />
                <button className="bg-emerald-600/50 rounded-3xl p-3" type="submit">Submit</button>
            </form>
        </div>
    )
}