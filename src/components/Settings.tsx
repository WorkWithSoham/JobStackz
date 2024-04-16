import {useEffect, useState} from "react";
import {JsonToCsv} from "react-json-csv";
import {
    darkIcon,
    deleteIcon,
    emailIcon,
    exportIcon, githubIcon,
    lightIcon,
    linkedinIcon, websiteIcon
} from "../assets/icons/svgs.tsx";
import {api, apps} from "../data/api.service.ts";


export const Settings = (props: { setThemeCallback: (set_theme: string) => void }) => {

    useEffect(() => {
        const getTheme = async () => {
            const savedTheme = await api.get_theme();
            setTheme(savedTheme)
        }
        getTheme().then()
    }, []);

    const [theme, setTheme] = useState("dark");
    const [warning, setWarning] = useState(false);

    const filename = 'Applications'
    const fields = {
        "id": "Application ID",
        "app_date": "Application Date",
        "position": "Position",
        "company": "Company Name",
        "location": "Job Location",
        "status": "Status",
        "jobLink": "Job Link",
        "notes": "Notes"
    }


    const activeClassName: string = "bg-accent border border-secondary/60 font-bold py-2 px-4" +
        " rounded"
    const inactiveClassName: string = "bg-accent/50 font-bold py-2 px-4 rounded"

    return (

        <div>
            <div className="flex items-center justify-between p-3 border-b border-secondary/10">
                <h2 className="font-bold">Set Theme</h2>
                <div className="flex">
                    <button
                        className={theme === "light" ? activeClassName : inactiveClassName}
                        onClick={() => {
                            setTheme("light")
                            props.setThemeCallback("light")
                        }}> {lightIcon}
                    </button>
                    <button
                        className={theme === "dark" ? activeClassName : inactiveClassName}
                        onClick={() => {
                            setTheme("dark")
                            props.setThemeCallback("dark")
                        }}> {darkIcon}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between p-3 border-b border-secondary/10">
                <h2 className="font-bold">Export Applications' List</h2>
                <div className="flex">
                    <button className="bg-accent/50 font-bold py-2 px-4 rounded">
                        <JsonToCsv
                            data={apps}
                            filename={filename}
                            fields={fields}
                            text={exportIcon}
                        />
                    </button>
                </div>
            </div>

            {!warning ? <div
                    className="flex items-center justify-between p-3 border-b border-secondary/10">
                    <h2 className="font-bold">Clear Data</h2>
                    <div className="flex">
                        <button
                            className="bg-accent/50 font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setWarning(true)
                            }}> {deleteIcon}
                        </button>
                    </div>
                </div> :
                <div
                    className="items-center justify-center p-3 border-b border-secondary/10">
                    <h2 className="font-bold text-red-500/70">Are you sure you want to clear all the
                        data?</h2>
                    <br/>
                    <div className="flex justify-center">
                        <button
                            className="bg-accent/50 font-bold py-2 px-4 rounded"
                            onClick={() => {
                                api.clear_data().then()
                                window.location.reload()
                            }}> Yes
                        </button>
                        <button
                            className="bg-accent/50 font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setWarning(false)
                            }}> No
                        </button>
                    </div>
                </div>
            }

            <div className="relative mt-28 m-2 mb-1 flex items-center">
                <div className="flex-grow border-t border-primary/60"></div>
                <span className="flex-shrink mx-2 text-sm text-primary/60">About</span>
                <div className="flex-grow border-t border-primary/60"></div>
            </div>

            <div className="font-sans text-center">
                <p className="text-base text-center"><span
                    className="font-extrabold">JobStackz v1.0.0</span> by Soham Tembe!</p>
                <p className="text-center font-extralight text-[9px]">Keep a track of your job
                    applications with ease!</p>
                <p className="font-extralight m-2 mx-5 text-xs">Find me online</p>
                <div className="flex justify-center">
                    <a href="mailto:sohamtembe98@gmail.com">{emailIcon}</a>
                    <a href="https://linkedin.com/in/sohamtembe" target="_blank">{linkedinIcon}</a>
                    <a href="https://github.com/workwithsoham" target="_blank">{githubIcon}</a>
                    <a href="https://sohamtembe.com" target="_blank">{websiteIcon}</a>
                </div>
            </div>
        </div>
    )
}