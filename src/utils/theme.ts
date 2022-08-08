import { createTheme } from '@mui/material/styles';

export const colors = {
    primary: {
        main: "#25d09d",
        dark: "#3a9e80",
        light: "#25d09d2b",
    }
}

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    backgroundColor: "#ffffff",
                    borderRadius: "30px",
                },
                standard: {
                    backgroundColor: "#ffffff",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "30px"
                },
                contained: {
                    backgroundColor: colors.primary.main,
                    "&:hover": {
                        backgroundColor: colors.primary.dark,
                        borderColor: colors.primary.dark,
                    }
                },
                outlined: {
                    borderColor: colors.primary.main,
                    color: colors.primary.main,
                    "&:hover": {
                        backgroundColor: colors.primary.main,
                        color: "#ffffff",
                        borderColor: colors.primary.main
                    }
                },
                text: {
                    color: colors.primary.main,
                    "&:hover": {
                        backgroundColor: colors.primary.light
                    }
                }
            }
        },
        MuiSvgIcon:{
            styleOverrides: {
                root: {
                    color: colors.primary.main,
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderRadius: "30px",
                    color: "#000000",
                    borderColor: "#ffffff",
                },
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary.main
                    },
                    "&:active .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary.main
                    },
                    "&:focus .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary.main
                    }
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root:{
                    backgroundColor: colors.primary.light
                },
                barColorPrimary: {
                    color: colors.primary.main,
                    backgroundColor: colors.primary.main
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: "#FFFFFF"
                }
            }
        }
    }
})

export default theme;
