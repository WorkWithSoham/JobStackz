import {TabComponent} from "./ElementComponents/TabComponent.tsx";
import {useState} from "react";
import {ApplicationList} from "./ApplicationList.tsx";
import {Create} from "./Create.tsx";

export const Main = () => {

    const [currentTab, setCurrentTab] = useState<string>("0");

    const tabComponentCallback = (index: string) => {
        setCurrentTab(index);
    }

    const renderSwitch = () => {
        switch (currentTab) {
            case "0":
                return <ApplicationList/>;
            case "1":
                return <Create />;
        }
    }

    return (
        <div className="p-1 text-center text-xs">
            <h1 className="text-xl text-center underline underline-offset-4 text-primary">Applications Tracker</h1>
            <TabComponent callback={tabComponentCallback}/>
            <div className="container border h-[415px] overflow-y-scroll mt-2 border-accent/60">
                {
                    renderSwitch()
                }
            </div>
        </div>
    )
}