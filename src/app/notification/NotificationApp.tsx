import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  Card,
  CardHeader,
  CardBody,
  Meter,
  Button,
} from "grommet";
import createPersistedState from "use-persisted-state";

const theme = {
  global: {
    font: {
      family: "Roboto",
    },
    colors: {
      brand: "rgb(40, 230, 150)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

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

  if (!isShowing) {
    return null;
  }

  return (
    <Grommet theme={theme}>
      <Card
        animation="fadeIn"
        pad="10px"
        height="200px"
        width="400px"
        align="center"
        justify="center"
        background="brand"
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
            <h2 style={{ textAlign: "center" }}>Time for a break soon!</h2>
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
                  label: "sixty",
                  color: isBreak ? "rgb(0, 255, 0)" : "secondary",
                  onClick: () => {},
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
  );
};

export default NotificationApp;
