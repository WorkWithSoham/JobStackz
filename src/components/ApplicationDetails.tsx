import {Application} from "../utils/inteface.ts";

export const ApplicationDetails = (props: {
    callback: (val: boolean) => void,
    application: Application
}) => {


    return (
        <div>
            <p>{props.application.company}</p>
        </div>
    )
}