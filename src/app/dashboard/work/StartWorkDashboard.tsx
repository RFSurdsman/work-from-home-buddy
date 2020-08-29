import React from "react";
import { Box, Button, Heading, Grid, CheckBox, Paragraph } from "grommet";
import Todolist from "./todolist";
import TitleBar from "../components/TitleBar";
import Todo from "./todolist/Todo";
import createPersistedState from "use-persisted-state";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableLocation,
} from "react-beautiful-dnd";

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

  const fakeTodos = [new Todo("hi"), new Todo("hello"), new Todo("eat")];

  for (let i = 0; i < 100; ++i) {
    new Todo("THROWAWAY");
  }

  const fakeTodos2 = [new Todo("bye"), new Todo("goodbye"), new Todo("starve")];

  const useTodosState1 = createPersistedState("yesterday");
  const [myTodos, mySetTodos] = useTodosState1<Todo[]>(fakeTodos);

  const useTodosState2 = createPersistedState("tomorrow");
  const [otherTodos, otherSetTodos] = useTodosState2<Todo[]>(fakeTodos2);

  const move = (
    source: Todo[],
    dest: Todo[],
    droppableSource: DraggableLocation,
    droppableDest: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(dest);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDest.index, 0, removed);

    const result: Record<string, Todo[]> = {};
    const sourceId = droppableSource.droppableId;
    const destId = droppableDest.droppableId;
    result[sourceId] = sourceClone;
    result[destId] = destClone;

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const reorder = (list: any[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const { source, destination: dest } = result;

    if (!dest) {
      return;
    }

    const sourceId = source.droppableId;
    const destId = dest.droppableId;

    if (sourceId === destId) {
      if (sourceId === "What I did yesterday") {
        mySetTodos(reorder(myTodos, source.index, dest.index));
      } else {
        otherSetTodos(reorder(myTodos, source.index, dest.index));
      }
    } else {
      if (sourceId === "What I did yesterday") {
        const result = move(myTodos, otherTodos, source, dest);
        mySetTodos(result[sourceId]);
        otherSetTodos(result[destId]);
      } else {
        const result = move(otherTodos, myTodos, source, dest);
        otherSetTodos(result[sourceId]);
        mySetTodos(result[destId]);
      }
    }
  };

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Box gridArea="yesterday">
            <Todolist
              id={1}
              title="What I did yesterday"
              myTodos={myTodos}
              mySetTodos={mySetTodos}
              otherTodos={otherTodos}
              otherSetTodos={otherSetTodos}
            />
          </Box>
          <Box gridArea="tomorrow">
            <Todolist
              id={2}
              title="What I'll do today"
              myTodos={otherTodos}
              mySetTodos={otherSetTodos}
              otherTodos={myTodos}
              otherSetTodos={mySetTodos}
            />
          </Box>
        </DragDropContext>
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
