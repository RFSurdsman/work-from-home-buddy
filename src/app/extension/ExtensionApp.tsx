import React from "react";
import { Box, Grommet, Button, Heading, Clock, CardBody, Meter } from "grommet";
import createPersistedState from "use-persisted-state";
import { WindowInfo } from "../types";
import updateWindows from "../components/UpdateWindows";
import { theme } from "../styles/theme";

const ExtensionApp: React.FC = (): JSX.Element => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");

  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);

  return (
    <Grommet theme={theme}>
      <Box
        height="medium"
        width="medium"
        align="center"
        justify="center"
        background={isWorkMode ? "work" : "home"}
      >
        <Heading level="1">WFH Buddy</Heading>
        <Clock type="digital" size="xlarge" margin="medium" />
        {isWorkMode && (
          <CardBody pad="medium" direction="row">
            <Box align="center" justify="center" height="100%" width="50%">
              <Heading level="2" style={{ textAlign: "center" }}>
                Break in 17 minutes.
              </Heading>
            </Box>
            <Box align="center" justify="center" height="100%" width="50%">
              <Meter
                values={[
                  {
                    value: 36,
                    color: "secondary",
                  },
                ]}
                round
                type="circle"
                aria-label="meter"
                thickness="large"
              />
            </Box>
          </CardBody>
        )}
        <br />
        <Box direction="row" align="center" justify="center" gap="small">
          <Button
            primary
            label={isWorkMode ? "End Work" : "Start Work"}
            color="secondary"
            onClick={() => {
              updateWindows(savedWindows, setSavedWindows);
              setIsWorkMode(!isWorkMode);
            }}
          />
          <Button
            primary
            label="Open Dashboard"
            color="secondary"
            onClick={() => {
              chrome.tabs.create({
                url: chrome.runtime.getURL("newtab.html"),
              });
            }}
          />
        </Box>
        <br />
      </Box>
    </Grommet>
  );
};

export default ExtensionApp;
