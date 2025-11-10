import {createTheme} from "@mui/material/styles";
import {ThemeMode} from "@/app/app-reducer.ts";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgb(120,168,133)'
            }
        }
    })
}