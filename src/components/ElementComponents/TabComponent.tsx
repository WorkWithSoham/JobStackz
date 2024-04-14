import React, {useEffect, useState} from "react";
import {listIcon, newIcon, notesIcon} from "../../assets/icons/svgs.tsx"

export const TabComponent = (props: { callback: (idx: string) => void, setIndex: string }) => {

    useEffect(() => {
        if (props.setIndex === "1") {
            setCurrentTab("1")
        }
    }, [props.setIndex]);

    const tabs: Array<{ name: string, icon: React.JSX.Element }> = [
        {
            name: "Applications",
            icon: listIcon
        },
        {
            name: "New",
            icon: newIcon
        },
        {
            name: "Notes",
            icon: notesIcon
        }
    ]

    const [currentTab, setCurrentTab] = useState("0")

    return (
        <div className="border-b border-accent/40">
            <ul className="inline-flex text-xs text-secondary/70 justify-center">
                {tabs.map((tab, idx) => {
                    return (
                        <li key={idx}>
                            {currentTab !== idx.toString() ?
                                <button
                                    id={idx.toString()}
                                    className="inline-flex p-2 rounded-t-lg border-b-2 border-transparent
                                               hover:text-secondary hover:border-secondary/60 group"
                                    onClick={(e) => {
                                        setCurrentTab(e.currentTarget.id)
                                        props.callback(idx.toString())
                                    }}
                                >
                                    {tab.icon} {tab.name}
                                </button> :
                                <button
                                    className="inline-flex p-2 rounded-t-lg border-b-2 text-primary border-secondary group"
                                >
                                    {tab.icon} {tab.name}
                                </button>
                            }
                        </li>)
                })}
            </ul>
        </div>
    )
}