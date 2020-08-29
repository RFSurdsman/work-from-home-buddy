import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  Button,
  Image,
  Card,
  Heading,
  Clock,
  Grid,
  Meter,
  CardBody,
} from "grommet";
import { DateList } from "./StartWorkDashboard";
import Todolist from "./todolist";
import createPersistedState from "use-persisted-state";

interface MainWorkDashboardProps {
  startHomeMode: () => void;
}

let event = {
  date: "Mon, 31 Aug 2020",
  events: [
    {
      title: "Sprint Planning",
      time: "10.00am - 11.00am",
    },
    {
      title: "Design Layout Review",
      time: "11.30am - 12.30pm",
    },
  ],
};

const MainWorkDashboard: React.FC<MainWorkDashboardProps> = (
  props: MainWorkDashboardProps
): JSX.Element => {
  const { startHomeMode } = props;
  const [isBreak, setIsBreak] = createPersistedState("isBreak")(false);

  return (
    <Box
      fill
      justify="center"
      align="center"
      pad={{ bottom: "xlarge", left: "large", right: "xlarge" }}
    >
      <Grid
        fill
        rows={["auto"]}
        columns={["1/3", "1/3", "1/3"]}
        gap="medium"
        areas={[
          { name: "calendar", start: [1, 0], end: [1, 0] },
          { name: "yesterday", start: [0, 0], end: [0, 0] },
          { name: "tomorrow", start: [2, 0], end: [2, 0] },
        ]}
      >
        <Box
          gridArea="yesterday"
          background="rgba(0, 0, 0, 0.5);"
          justify="center"
          align="center"
          round="medium"
          pad="medium"
        >
          <CardBody pad="medium" direction="row">
            <Box align="center" justify="center" height="100%" width="50%">
              <Clock type="digital" precision="minutes" size="xlarge" />
              <Heading level="3" style={{ textAlign: "center" }}>
                Break in 17 minutes.
              </Heading>
              <Button
                primary
                label="Start"
                color="secondary"
                onClick={() => {
                  setIsBreak(true);
                }}
              />
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
        </Box>
        <Box
          gridArea="calendar"
          round="medium"
          background="rgba(0, 0, 0, 0.5);"
          pad="medium"
        >
          <Heading level={3} margin="none" color="white">
            Schedule
          </Heading>
          {DateList(event)}
        </Box>

        <Box gridArea="tomorrow">
          <Todolist title="What I'll do today" />
        </Box>
      </Grid>
      <br />
      <Button
        primary
        color="secondary"
        label="Finish Your Day"
        size="large"
        margin={{ top: "20px" }}
        onClick={startHomeMode}
      />
    </Box>
  );
};

export default MainWorkDashboard;
