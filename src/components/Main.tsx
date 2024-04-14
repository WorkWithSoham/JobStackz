import {TabComponent} from "./ElementComponents/TabComponent.tsx";
import {useEffect, useState} from "react";
import {ApplicationList} from "./ApplicationList.tsx";
import {Create} from "./Create.tsx";
import {Application, emptyApplication} from "../utils/inteface.ts";
import moment from "moment";
import {max_id} from "../data/api.service.ts";
import {Notes} from "./NotesComponent.tsx";

export const Main = () => {

    //TODO
    useEffect(() => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            const currentTabId = tabs[0].id ?? 0;
            const currentTabUrl = tabs[0].url;

            const currentWebsite: string | null = parseURL(currentTabUrl!);

            if (currentWebsite !== null) {
                setTimeout(() => {
                    chrome.tabs.sendMessage(
                        currentTabId,
                        JSON.stringify({msg: "request", url: currentWebsite}),
                        (res) => {
                            const defaultApplication: Application = {
                                position: res.position ?? "",
                                company: res.company ?? "",
                                status: "Applied",
                                jobLink: currentTabUrl ?? "",
                                app_date: moment(Date.now()).format("YYYY-MM-DD"),
                                notes: "",
                                id: max_id
                            }
                            console.log("Message sent", defaultApplication)
                            setDefaultApplication(defaultApplication)
                            setIndex("1")
                            setCurrentTab("1")
                        }
                    )
                }, 1000)
            }
        });
    }, []);

    const parseURL = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;

            if (hostname.includes("linkedin")) {
                return "linkedin";
            } else if (hostname.includes("greenhouse")) {
                return "greenhouse";
            } else if (hostname.includes("lever")) {
                return "lever";
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    const [index, setIndex] = useState("0");
    const [currentTab, setCurrentTab] = useState<string>("0");
    const [defaultApplication, setDefaultApplication] = useState<Application>(emptyApplication)

    const tabComponentCallback = (index: string) => {
        setCurrentTab(index);
    }

    const renderSwitch = () => {
        switch (currentTab) {
            case "0":
                return <ApplicationList/>;
            case "1":
                return <Create app={defaultApplication}/>;
            case "2":
                return <Notes/>
        }
    }

    return (
        <div className="p-1 text-center text-xs">
            <h1 className="text-xl text-center underline underline-offset-4 text-primary">Applications
                Tracker</h1>
            <TabComponent callback={tabComponentCallback} setIndex={index}/>
            <div className="container border h-[415px] overflow-y-scroll mt-2 border-accent/60">
                {
                    renderSwitch()
                }
            </div>
        </div>
    )
}