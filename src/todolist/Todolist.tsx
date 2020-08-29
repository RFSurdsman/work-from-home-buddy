import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import {
  Card,
  CardHeader,
  CardFooter,
  Form,
  TextInput,
  FormField,
  Box,
  Heading,
  CheckBox,
} from "grommet";
import Todo from "./Todo";
import createPersistedState from "use-persisted-state";
import { Add } from "grommet-icons";

const Todolist: React.FC = () => {
  const myTodos = [new Todo("hi"), new Todo("hello"), new Todo("eat")];

  const useTodosState = createPersistedState("todos");
  const [todos, setTodos] = useTodosState<Todo[]>(myTodos);

  const [addTodoValue, setAddTodoValue] = useState("");

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

  const handleAddTodo = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const newTodo = new Todo(addTodoValue);
      setTodos((prevState) => [...prevState, newTodo]);
      setAddTodoValue("");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided, snapshot) => (
          <Card
            margin="medium"
            pad="small"
            background="secondary"
            width="medium"
            {...provided.droppableProps}
            ref={provided.innerRef}
            align="stretch"
            justify="center"
          >
            <CardHeader pad="small">
              <Heading level="2" size="small" margin="none">
                Todos
              </Heading>
            </CardHeader>
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    direction="row"
                    background="brand"
                    pad="small"
                    margin="small"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {todo.description}
                    <CheckBox
                      checked={todo.done}
                      onChange={(event) => (todo.done = event.target.checked)}
                    />
                  </Card>
                )}
              </Draggable>
            ))}
            <CardFooter>
              <Card
                background="brand"
                pad="none"
                margin="small"
                ref={provided.innerRef}
                width="full"
                direction="row"
              >
                <Box
                  direction="row"
                  align="center"
                  pad="none"
                  pad-left="medium"
                >
                  <Add size="medium" />
                  <TextInput
                    plain={true}
                    placeholder="add a new todo"
                    value={addTodoValue}
                    onChange={(event) => setAddTodoValue(event.target.value)}
                    onKeyDown={handleAddTodo}
                    width="auto"
                  />
                </Box>
              </Card>
            </CardFooter>
          </Card>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todolist;
