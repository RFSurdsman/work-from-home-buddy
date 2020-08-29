import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card } from "grommet";
import createPersistedState from "use-persisted-state";
import { WorkModeTheme, HomeModeTheme } from "../styles/themes";
import Todolist from "../../todolist";
import { WindowInfo } from "../types";
import updateWindows from "../components/UpdateWindows";
import toggleBookmarks from "../components/ToggleBookmarks";

  
const DashboardApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");
  const useHomeBookmarksIdState = createPersistedState('homeBookmarksId');
  const useWorkBookmarksIdState = createPersistedState('workBookmarksId');
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [homeBookmarksId, setHomeBookmarksId] = useHomeBookmarksIdState('');
  const [workBookmarksId, setWorkBookmarksId] = useWorkBookmarksIdState('');
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  });

  
  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme} full>
      <Box fill align="center" justify="center" background="brand">
        <h6>WFH Buddy</h6>
        <h3>Good morning, Tony</h3>
        <h1>{new Date(time).toLocaleTimeString()}</h1>
        {/* <Image fit="cover" src={cityGif} /> */}
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            updateWindows(savedWindows, setSavedWindows);
            let workMode = !isWorkMode;
            toggleBookmarks(workMode, workBookmarksId, homeBookmarksId, setWorkBookmarksId, setHomeBookmarksId);
            setIsWorkMode(workMode);
          }}
        />
        <Todolist />
      </Box>
    </Grommet>
  );
};

export default DashboardApp;