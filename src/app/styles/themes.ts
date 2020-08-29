export const commonTheme = {
    font: {
      family: "Roboto",
      size: "36px",
      height: "40px",
    },
  };
  
export const HomeModeTheme = {
    global: {
      ...commonTheme,
      colors: {
        brand: "rgb(40, 230, 150)",
        secondary: "rgb(50, 150, 250)",
        text: "#ebebeb",
      },
    },
  };
  
export const WorkModeTheme = {
    global: {
      ...commonTheme,
      colors: {
        brand: "rgb(50, 200, 250)",
        secondary: "rgb(50, 150, 250)",
        text: "#ebebeb",
      },
    },
  };