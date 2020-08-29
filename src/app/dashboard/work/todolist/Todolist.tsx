import React from "react";
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
} from "grommet";
import Todo from "./Todo";
import createPersistedState from "use-persisted-state";
import { Add } from "grommet-icons";

const Todolist: React.FC = () => {
  const myTodos = [new Todo("hi"), new Todo("hello"), new Todo("eat")];

  const useTodosState = createPersistedState("todos");
  const [todos, setTodos] = useTodosState<Todo[]>(myTodos);

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
            <CardHeader>Todos</CardHeader>
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
                  <TextInput plain={true} placeholder="add a new todo" />
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
