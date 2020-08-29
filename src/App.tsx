import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button } from "grommet";
import _ from "lodash";
import createPersistedState from "use-persisted-state";


interface WindowInfo {
  url: string[];
  height?: number | undefined;
  width?: number | undefined;
  top?: number | undefined;
  left?: number | undefined;
  type: string;
  state: string;
}

const commonTheme = {
  font: {
    family: "Roboto",
    size: "36px",
    height: "20px",
  },
};

const HomeModeTheme = {
  global: {
    ...commonTheme,
    colors: {
      brand: "rgb(40, 230, 150)",
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

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");

  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
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
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            chrome.windows.getAll({populate: true}, (windows) => {
              const saved_windows: WindowInfo[] = windows.map(window => {
                const window_state = _.pick(window, ['height', 'width', 'top', 'left', 'type', 'state']);
                const urls = window.tabs!.map(tab => tab.url!);
                chrome.windows.remove(window.id);
                return {...window_state, url: urls};
              })
              savedWindows.forEach((window: WindowInfo) => {
                chrome.windows.create({...window});
              });

              setSavedWindows(saved_windows);
              // open new window to dashboard
              chrome.windows.create({});
            })

            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  )
}