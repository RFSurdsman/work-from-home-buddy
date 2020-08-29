import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button, Image, Card } from "grommet";
import createPersistedState from "use-persisted-state";
import cityGif from "./resources/city.gif";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import Todo from "./Todo";

const commonTheme = {
  font: {
    family: "Roboto",
    size: "36px",
    height: "40px",
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

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

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
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  const myTodos = [new Todo("hi"), new Todo("hello"), new Todo("eat")];

  const useTodosState = createPersistedState("todos");
  const [todos, setTodos] = useTodosState<Todo[]>(myTodos);

  const [time, setTime] = useState(Date.now());

  const onDragEnd = (result: DropResult) => {
    const reorder = (list: any[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    if (!result.destination) {
      return;
    }

    setTodos(reorder(todos, result.source.index, result.destination.index));
  };

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
        {/* <Image fit="cover" src={cityGif} /> */}
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todoList">
            {(provided, snapshot) => (
              <Card
                margin="medium"
                pad="small"
                background="secondary"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4>Todos</h4>
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        background="brand"
                        pad="small"
                        margin="small"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {todo.description}
                      </Card>
                    )}
                  </Draggable>
                ))}
              </Card>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Grommet>
  );
};

// <>

// </>
