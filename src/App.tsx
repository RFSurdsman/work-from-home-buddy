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

const update_windows = (savedWindows: WindowInfo[], setSavedWindows: (windows: WindowInfo[]) => void) => {
  chrome.windows.getAll({populate: true}, (windows) => {
    const saved_windows: WindowInfo[] = windows.map(window => {
      const window_state = _.pick(window, ['height', 'width', 'top', 'left', 'type', 'state']);
      const urls = window.tabs!
                    .map(tab => tab.url!)
                    .filter(url => !url.startsWith("chrome://newtab"));
      chrome.windows.remove(window.id);
      console.log(urls)
      return {...window_state, url: urls};
    });

    savedWindows.forEach((window: WindowInfo, i: Number) => {
        (i === savedWindows.length - 1) ?
          chrome.windows.create({...window, url: ["chrome://newtab", ...window.url]})
        :
          chrome.windows.create({...window})
    })

    setSavedWindows(saved_windows);
  });
}

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");

  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);

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
            update_windows(savedWindows, setSavedWindows);
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
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
            console.log("BUTTON CLICKED");
            
            update_windows(savedWindows, setSavedWindows);
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  )
}