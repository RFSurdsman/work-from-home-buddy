import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  Card,
  CardHeader,
  CardBody,
  Meter,
  Button,
  Heading,
} from "grommet";
import createPersistedState from "use-persisted-state";
import { theme } from "../styles/theme";

const NotificationApp: React.FC = (): JSX.Element | null => {
  const [isShowing, setIsShowing] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const [isBreak, setIsBreak] = createPersistedState("isBreak")(false);

  const incrementMeter = () => {
    if (isShowing) {
      setTimeout(() => {
        setProgressValue((p) => p + 0.1);
        incrementMeter();
      }, 100);
    }
  };

  useEffect(incrementMeter, []);
  useEffect(() => {
    if (progressValue >= 100) {
      setProgressValue(0);
    }
  }, [progressValue]);

  return isShowing ? (
    <Grommet theme={theme}>
      <Card
        animation="fadeIn"
        pad="10px"
        height="200px"
        width="400px"
        align="center"
        justify="center"
        background="work"
        round="large"
      >
        <div style={{ top: "10px", right: "10px", position: "absolute" }}>
          <Button
            size="small"
            primary
            label="X"
            color="red"
            onClick={() => {
              setIsShowing(false);
              setIsBreak(false);
            }}
          />
        </div>

        <CardHeader pad="small">
          <Box direction="row">
            <b>Pomodoro Notification</b>
          </Box>
        </CardHeader>
        <CardBody pad="medium" direction="row">
          <Box align="center" justify="center" height="100%" width="50%">
            <Heading level="2" style={{ textAlign: "center" }}>
              Time for a break soon!
            </Heading>
            <Button
              primary
              label="Start"
              color="secondary"
              onClick={() => {
                setIsBreak(true);
                setProgressValue(0);
                chrome.tabs.create({
                  url: chrome.runtime.getURL("newtab.html"),
                });
              }}
            />
          </Box>
          <Box align="center" justify="center" height="100%" width="50%">
            <Meter
              values={[
                {
                  value: progressValue,
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
      </Card>
    </Grommet>
  ) : null;
};

export default NotificationApp;
