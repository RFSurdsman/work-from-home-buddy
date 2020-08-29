import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card } from "grommet";
import createPersistedState from "use-persisted-state";
import { WorkModeTheme, HomeModeTheme } from "../styles/themes";
import Todolist from "../../todolist";
import { WindowInfo } from "../types";
import updateWindows from "../components/UpdateWindows";
import toggleBookmarks from "../components/ToggleBookmarks";
import HomeDashboard from "./components/HomeDashboard";
import WorkDashboard from "./components/WorkDashboard";
  
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

  const workHomeSwitch = () => {
    updateWindows(savedWindows, setSavedWindows);
    let workMode = !isWorkMode;
    toggleBookmarks(workMode, workBookmarksId, homeBookmarksId, setWorkBookmarksId, setHomeBookmarksId);
    setIsWorkMode(workMode);
  }

  
  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme} full>
      <Box fill align="center" justify="center" background="brand">
        <h6>WFH Buddy</h6>
        {(isWorkMode) ?
          <WorkDashboard 
            startHomeMode={workHomeSwitch}
            time={time}
          />
        :
          <HomeDashboard 
            startWorkMode={workHomeSwitch}
            time={time}
          />
        }
      </Box>
    </Grommet>
  );
};

export default DashboardApp;