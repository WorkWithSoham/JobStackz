import React, {useEffect, useState} from "react";
import {api} from "../data/api.service.ts";

export const Notes = () => {

    useEffect(() => {
        const get_data = async (): Promise<void> => {
            const saved_linkedin_message = await api.get_linkedin_message();
            const saved_resources = await api.get_resources();

            setLinkedInMessage(saved_linkedin_message ?? "")
            setResources(saved_resources ?? "")
        }

        get_data().then()

    }, []);


    const [linkedInMessage, setLinkedInMessage] = useState("")
    const [resources, setResources] = useState("")


    const onLinkedInMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value: EventTarget & HTMLFormElement = e.currentTarget
        await api.set_linkedin_message(value.notes.value)
    }

    const onResourcesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value: EventTarget & HTMLFormElement = e.currentTarget
        await api.set_resources(value.resources.value)
    }

    return (
        <div className="text-start m-2">
            <form onSubmit={onLinkedInMessageSubmit}>
                <label> LinkedIn Connection Request message...</label>
                <textarea
                    required={true}
                    className="w-full my-1 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="notes"
                    maxLength={300}
                    rows={5}
                    placeholder="Enter your message..."
                    onChange={(e) => {
                        setLinkedInMessage(e.target.value)

                    }}
                    defaultValue={linkedInMessage}
                />
                <input
                    type="submit"
                    value="Save"
                    className="!float-end rounded p-2 bg-accent/30 cursor-pointer"
                />
                <input
                    disabled={true}
                    className="bg-transparent w-2/3"
                    value={`${linkedInMessage.length}/300 (LinkedIn character limit)`}
                />
            </form>

            <form className="mt-10" onSubmit={onResourcesSubmit}>
                <label>Keep your resources handy...</label>
                <textarea
                    required={true}
                    className="w-full my-1 rounded p-1 bg-accent/30 placeholder-primary/60"
                    name="resources"
                    rows={5}
                    placeholder="Enter your resources..."
                    defaultValue={resources}
                />
                <input
                    type="submit"
                    value="Save"
                    className="!float-end rounded p-2 bg-accent/30 cursor-pointer"
                />
            </form>
        </div>
    )
}