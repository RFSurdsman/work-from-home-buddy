import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableLocation,
} from "react-beautiful-dnd";
import {
  Card,
  CardHeader,
  CardFooter,
  TextInput,
  Box,
  Heading,
  CheckBox,
} from "grommet";
import Todo from "./Todo";
import createPersistedState from "use-persisted-state";
import { Add, Close } from "grommet-icons";

interface Props {
  id: number;
  title: string;
  myTodos: Todo[];
  mySetTodos: (prevState: any) => any;
  otherTodos: Todo[];
  otherSetTodos: (prevState: any) => any;
}

const Todolist: React.FC<Props> = (props: Props): JSX.Element => {
  const { id, title, myTodos, mySetTodos, otherTodos, otherSetTodos } = props;

  const [addTodoValue, setAddTodoValue] = useState("");

  const handleAddTodo = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const newTodo = new Todo(addTodoValue);
      mySetTodos((prevState: Todo[]) => [...prevState, newTodo]);
      setAddTodoValue("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    mySetTodos((prevState: Todo[]) =>
      prevState.filter((todo) => todo.id !== id)
    );
  };

  const handleTodoChecked = (id: number, checked: boolean) => {
    mySetTodos((prevState: Todo[]) =>
      prevState.map((todo) => {
        if (id === todo.id) {
          todo.done = checked;
        }
        return todo;
      })
    );
  };

  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <Card
          fill
          pad="medium"
          round="medium"
          background="rgba(0, 0, 0, 0.5);"
          width="medium"
          {...provided.droppableProps}
          ref={provided.innerRef}
          align="stretch"
          justify="center"
        >
          <CardHeader pad="small">
            <Heading level="2" size="small" margin="none" color="#FFFFFF">
              {title}
            </Heading>
          </CardHeader>
          {myTodos.map((todo, index) => (
            <Draggable
              key={todo.id}
              draggableId={todo.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <>
                  <Card
                    direction="row"
                    background={todo.done ? "todoDone" : "todo"}
                    pad="small"
                    margin="small"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    justify="between"
                  >
                    <Box direction="row">
                      <Close
                        onClick={() => handleRemoveTodo(todo.id)}
                        style={{ marginRight: "12px" }}
                      />
                      {todo.description}
                    </Box>
                    <CheckBox
                      checked={todo.done}
                      onChange={(event) =>
                        handleTodoChecked(todo.id, event.target.checked)
                      }
                    />
                  </Card>
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <CardFooter>
            <Card
              background="brand"
              pad="none"
              margin="small"
              ref={provided.innerRef}
              width="full"
              direction="row"
            >
              <TextInput
                icon={<Add />}
                plain={true}
                placeholder="new"
                value={addTodoValue}
                onChange={(event) => setAddTodoValue(event.target.value)}
                onKeyDown={handleAddTodo}
              />
            </Card>
          </CardFooter>
        </Card>
      )}
    </Droppable>
  );
};

export default Todolist;
