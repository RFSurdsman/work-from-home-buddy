import React from "react";
import { Box, Button, Heading, Grid, CheckBox, Paragraph } from "grommet";
import Todolist from "./todolist";
import TitleBar from "../components/TitleBar";

let tasks = [
  "Watch Lecture",
  "Review Chris PR",
  "Prepare for Interviews",
  "Make presentation slides",
];

interface Event {
  title: string;
  time: string;
}

interface DateSchedule {
  date: string;
  events: Event[];
}

let events: DateSchedule[] = [
  {
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
  },
  {
    date: "Tue, 01 Sep 2020",
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
  },
];

const ToDoItem = (task: string) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box pad="small" margin="xsmall" background="dark-2">
      <CheckBox
        name={task + "-todo-item"}
        checked={checked}
        label={task}
        onChange={(event) => setChecked(event.target.checked)}
      />
    </Box>
  );
};

export const DateList = (dateSchedule: DateSchedule) => {
  return (
    <Box margin="small">
      <Box border="bottom">
        <Heading level={4} margin="none" color="white">
          {dateSchedule.date}
        </Heading>
      </Box>
      {dateSchedule.events.map((event) => (
        <Box background="brand" margin="xsmall" round="small" pad="small">
          <Heading level={5} margin="xsmall">
            {event.title}
          </Heading>
          <Paragraph size="small" margin="xsmall">
            {event.time}
          </Paragraph>
        </Box>
      ))}
    </Box>
  );
};

interface StartWorkDashboardProps {
  startWork: () => void;
  time: number;
}
const StartWorkDashboard = (props: StartWorkDashboardProps) => {
  const { startWork, time } = props;

  return (
    <Box
      fill
      justify="center"
      align="center"
      pad={{ bottom: "xlarge", left: "large", right: "xlarge" }}
    >
      <Grid
        fill
        rows={["xsmall", "auto"]}
        columns={["1/3", "1/3", "1/3"]}
        gap="medium"
        areas={[
          { name: "header", start: [0, 0], end: [2, 0] },
          { name: "calendar", start: [0, 1], end: [0, 1] },
          { name: "yesterday", start: [1, 1], end: [1, 1] },
          { name: "tomorrow", start: [2, 1], end: [2, 1] },
        ]}
      >
        <Box gridArea="header" justify="center">
          <Heading>Plan Your Day</Heading>
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
          {events.map((dateSchedule) => DateList(dateSchedule))}
        </Box>
        <Box gridArea="yesterday">
          <Todolist title="What I did yesterday" />
        </Box>
        <Box gridArea="tomorrow">
          <Todolist title="What I'll do today" />
        </Box>
      </Grid>
      <Button
        primary
        color="secondary"
        label="Start Your Day"
        size="large"
        margin={{ top: "20px" }}
        onClick={startWork}
      />
    </Box>
  );
};

export default StartWorkDashboard;
