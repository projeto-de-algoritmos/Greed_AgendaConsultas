import { extendTheme } from "native-base";


const theme = extendTheme({
    components: {
        Button: {
            variants: {
                Form: ({
                    colorScheme
                }) => {
                    return {
                    bg: `${colorScheme}.500`,
                    rounded: "full"
                    };
                }
            }
        },
        Input: {
            variants: {
                Form: ({
                    colorScheme
                }) => {
                    return {
                    bg: "red",
                    rounded: "full",
                    h: 20,
                    w: 40,
                    
                    };
                }
            }
        },
    }
});

export default theme;