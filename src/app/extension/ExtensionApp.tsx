import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card } from "grommet";
import createPersistedState from "use-persisted-state";
import Todolist from "../dashboard/work/todolist";
import { WindowInfo } from "../types";
import updateWindows from "../components/UpdateWindows";
import { workModeTheme, homeModeTheme } from "../styles/theme";

const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");

  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);

  return (
    <Grommet theme={isWorkMode ? workModeTheme : homeModeTheme}>
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
            updateWindows(savedWindows, setSavedWindows);
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export default ExtensionApp;
