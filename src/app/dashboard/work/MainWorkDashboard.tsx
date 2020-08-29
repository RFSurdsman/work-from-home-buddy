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
} from "grommet";
import { DateList } from "./StartWorkDashboard";
import Todolist from "./todolist";

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

  return (
    <>
      <Button
        primary
        label={"Finish Work"}
        color="secondary"
        onClick={startHomeMode}
      />
      <Grid
        rows={["large"]}
        columns={["1/4", "auto", "auto"]}
        areas={[
          { name: "time", start: [0, 0], end: [0, 0] },
          { name: "schedule", start: [1, 0], end: [1, 0] },
          { name: "tasks", start: [2, 0], end: [2, 0] },
        ]}
      >
        <Box
          gridArea="time"
          background="dark-2"
          justify="center"
          align="center"
        >
          <Clock type="digital" precision="minutes" size="xlarge" />
          <Button primary color="secondary" label="Take a Break" />
        </Box>
        <Box gridArea="schedule" background="light-5">
          {DateList(event)}
        </Box>
        <Box gridArea="tasks" background="light-2">
          <Todolist />
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
      </Grid>
    </>
  );
};

export default MainWorkDashboard;
