import {Main} from "./components/Main.tsx";
import {useEffect, useState} from "react";
import {api} from "./data/api.service.ts";

function App() {

    useEffect(() => {
        const getTheme = async () => {
            const saved_theme = await api.get_theme();
            setTheme(saved_theme)
        }

        getTheme().then()
    }, []);

    const [theme, setTheme] = useState("dark");

    const setThemeCallback = (set_theme: string) => {
        setTheme(set_theme);
        const save_theme = async () => {
            await api.set_theme(set_theme)
        }

        save_theme().then()
    }

    return (
        <div className="mx-auto container text-primary text-xs h-screen w-screen bg-bkg" id="app"
             data-theme={theme}>
            <Main setThemeCallback={setThemeCallback}/>
        </div>
    )
}

export default App
