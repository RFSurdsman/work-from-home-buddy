import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button } from "grommet";
import _ from "lodash";
import util from "util";

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

function App() {
  const [isWorkMode, setIsWorkMode] = useState(false);

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
            
            setIsWorkMode(!isWorkMode);
            //const remove_window = util.promisify(chrome.windows.remove);
            chrome.windows.getAll({populate: true}, (windows) => {
              const saved_windows = windows.map(window => {
                const window_state = _.pick(window, ['height', 'width', 'top', 'left', 'type', 'state']);
                const urls = window.tabs!.map(tab => tab.url!);
                chrome.windows.remove(window.id);
                return {...window_state, url: urls};
              })
              // open new window to dashboard
              chrome.windows.create({});
            })
          }
        }
        />
      </Box>
    </Grommet>
  );
}

export default App;
