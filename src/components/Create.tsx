import React, {useState} from "react";
import {Application, emptyApplication} from "../utils/inteface.ts";
import {api, max_id} from "../data/api.service.ts";
import moment from "moment/moment";
import {toast} from "react-toastify";


export const Create = (props: {
    app: Application,
    tabComponentCallback: (index: string) => void
}) => {

    const [defaultApplication, setDefaultApplication] = useState<Application>(props.app)

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const valueSet: EventTarget & HTMLFormElement = e.currentTarget
        const data: Application = {
            id: max_id,
            app_date: moment(Date.now()).format("YYYY-MM-DD"),
            position: valueSet.position.value,
            company: valueSet.company.value,
            location: valueSet.location.value,
            status: valueSet.status.value,
            jobLink: valueSet.jobLink.value,
            notes: valueSet.notes.value
        }

        await api.set_application(data)

        valueSet.reset();
        toast.success("New Application saved! ✅")
        props.tabComponentCallback("0")
    }

    return (
        <div>
            <form className="p-3" onSubmit={formSubmit}>
                <p className="text-start">Company</p>
                <input
                    required={true}
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="company"
                    placeholder="Company name"
                    defaultValue={defaultApplication.company}
                />

                <p className="text-start">Position</p>
                <input
                    required={true}
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="position"
                    placeholder="Position"
                    defaultValue={defaultApplication.position}
                />

                <p className="text-start">Job Link</p>
                <input
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="jobLink"
                    placeholder="Job Link"
                    defaultValue={defaultApplication.jobLink}
                />

                <p className="text-start">Location</p>
                <input
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="location"
                    placeholder="Location"
                    defaultValue={defaultApplication.location}
                />

                <p className="text-start">Status</p>
                <select
                    className="w-full my-2 h-10 rounded p-1 bg-accent/30"
                    name="status" defaultValue={defaultApplication.status}
                >
                    <option value="..." disabled={true}>Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Bookmarked">Bookmarked</option>
                    <option value="Interview">Interview</option>
                    <option value="Process">In Process</option>
                    <option value="Offer">Offer</option>
                    <option value="Reject">Reject</option>
                </select>

                <p className="text-start">Notes</p>
                <textarea
                    className="w-full my-2 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="notes"
                    rows={5}
                    placeholder="Notes"
                    defaultValue={defaultApplication.notes}
                />

                <div className="inline-flex">
                    <input
                        className="bg-accent/50 mx-1 rounded-3xl p-3 cursor-pointer"
                        type="submit"
                        value="Save Changes"
                    />
                    <input
                        className="bg-accent/50 mx-1 rounded-3xl p-3 cursor-pointer"
                        type="reset"
                        onClick={() => setDefaultApplication(emptyApplication)}
                        value="Reset"
                    />
                </div>
            </form>
        </div>
    )
}