import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import createPersistedState from "use-persisted-state";
import { WindowInfo } from "../types";
import updateWindows from "../components/UpdateWindows";
import toggleBookmarks from "../components/ToggleBookmarks";
import HomeDashboard from "./home/HomeDashboard";
import WorkDashboard from "./work/WorkDashboard";
import MenuButton from "./components/MenuButton";
  
import { workModeTheme, homeModeTheme } from "../styles/theme";

const DashboardApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");
  const useHomeBookmarksIdState = createPersistedState("homeBookmarksId");
  const useWorkBookmarksIdState = createPersistedState("workBookmarksId");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [homeBookmarksId, setHomeBookmarksId] = useHomeBookmarksIdState("");
  const [workBookmarksId, setWorkBookmarksId] = useWorkBookmarksIdState("");
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);
  const [time, setTime] = useState(Date.now());

  const workHomeSwitch = () => {
    let workMode = !isWorkMode;
    updateWindows(savedWindows, setSavedWindows, () => {setIsWorkMode(workMode);});
    toggleBookmarks(workMode, workBookmarksId, homeBookmarksId, setWorkBookmarksId, setHomeBookmarksId);
  }

  return (
    <Grommet theme={isWorkMode ? workModeTheme : homeModeTheme} full>
      <Box fill align="center" justify="center" background="brand">
        {/* <Heading level="1">{new Date(time).toLocaleTimeString()}</Heading> */}
        {/* <Image fit="cover" src={cityGif} /> */}
        {isWorkMode ? (
          <WorkDashboard startHomeMode={workHomeSwitch} time={time} />
        ) : (
          <HomeDashboard startWorkMode={workHomeSwitch} time={time} />
        )}
      </Box>

    </Grommet>
  );
};

export default DashboardApp;
