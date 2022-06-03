import {  createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) =>({
    root:{
        background: theme.colors.customDarkColors[0],
        height: "100vh",

    },
    sidebar:{
        background: theme.colors.customDarkColors[1],
        height:"100vh",
    },

}))