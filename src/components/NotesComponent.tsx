import React, {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api} from "../data/api.service.ts";
import {copyIcon} from "../assets/icons/svgs.tsx";

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
        toast.success("Message saved successfully ✅")
    }

    const onResourcesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value: EventTarget & HTMLFormElement = e.currentTarget
        await api.set_resources(value.resources.value)
        toast.success("Resources saved successfully ✅")
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
                    className="!float-end rounded p-1 bg-accent/30 cursor-pointer"
                />
                <button
                    type="button"
                    className="!float-end rounded mx-1 p-1 bg-accent/30 cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(linkedInMessage).then()
                        toast.success("Message copied!")
                    }}>
                    {copyIcon}
                </button>
                <input
                    disabled={true}
                    className="text-xs bg-transparent w-2/3"
                    value={`${linkedInMessage.length}/300 (LinkedIn char limit)`}
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
                    className="!float-end rounded p-1 bg-accent/30 cursor-pointer"
                />
            </form>
        </div>
    )
}