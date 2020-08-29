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
import cityGif from "../../resources/city.gif";

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

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  });

  const workHomeSwitch = () => {
    updateWindows(savedWindows, setSavedWindows);
    setTimeout(() => {
      let workMode = !isWorkMode;
      toggleBookmarks(workMode, workBookmarksId, homeBookmarksId, setWorkBookmarksId, setHomeBookmarksId);
      setIsWorkMode(workMode);
    }, 100);
  }

  return (
    <Grommet theme={isWorkMode ? workModeTheme : homeModeTheme} full>
      <Box background="brand" fill>
        <Box
          background={"url(" + cityGif + ")"}
          align="center"
          justify="center"
          fill
        >
          <Heading level="2">WFH Buddy</Heading>
          {isWorkMode ? (
            <WorkDashboard startHomeMode={workHomeSwitch} time={time} />
          ) : (
            <HomeDashboard startWorkMode={workHomeSwitch} time={time} />
          )}
        </Box>
      </Box>

    </Grommet>
  );
};

export default DashboardApp;
