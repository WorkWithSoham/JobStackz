import React from "react";
import {listIcon, newIcon, notesIcon, settingsIcon} from "../../assets/icons/svgs.tsx"

export const TabComponent = (props: { callback: (idx: string) => void, setIndex: string }) => {

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
        },
        {
            name: "Settings",
            icon: settingsIcon
        }
    ]

    return (
        <div className="border-b border-accent/40">
            <ul className="inline-flex text-xs text-secondary/70 justify-center">
                {tabs.map((tab, idx) => {
                    return (
                        <li key={idx}>
                            {props.setIndex !== idx.toString() ?
                                <button
                                    id={idx.toString()}
                                    className="inline-flex p-2 rounded-t-lg border-b-2 border-transparent
                                               hover:text-secondary hover:border-secondary/60 group"
                                    onClick={() => {
                                        props.callback(idx.toString())
                                    }}
                                >
                                    {tab.icon}
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