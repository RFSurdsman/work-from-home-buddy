import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button } from "grommet";
import createPersistedState from "use-persisted-state";

const commonTheme = {
  font: {
    family: "Roboto",
    size: "18px",
    height: "20px",
  },
};

const HomeModeTheme = {
  global: {
    ...commonTheme,
    colors: {
      brand: "rgb(50, 250, 200)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

const WorkModeTheme = {
  global: {
    ...commonTheme,
    colors: {
      brand: "rgb(50, 200, 250)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme}>
      <Box
        height="medium"
        width="medium"
        align="center"
        justify="center"
        background="brand"
      >
        <h1>WFH Buddy</h1>
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme} full>
      <Box fill align="center" justify="center" background="brand">
        <h1>WFH Buddy</h1>
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};
