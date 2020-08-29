import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvided,
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
  title: string;
}

const Todolist: React.FC<Props> = (props: Props): JSX.Element => {
  const { title } = props;
  const myTodos = [new Todo("hi"), new Todo("hello"), new Todo("eat")];

  const useTodosState = createPersistedState(title);
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

  const handleRemoveTodo = (id: number) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleTodoChecked = (id: number, checked: boolean) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (id === todo.id) {
          todo.done = checked;
        }
        return todo;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided, snapshot) => (
          <Card
            fill
            pad="medium"
            round="medium"
            background="light-2"
            width="medium"
            {...provided.droppableProps}
            ref={provided.innerRef}
            align="stretch"
            justify="center"
          >
            <CardHeader pad="small">
              <Heading level="2" size="small" margin="none" color="#000">
                {title}
              </Heading>
            </CardHeader>
            {todos.map((todo, index) => (
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
                  placeholder="add a new todo"
                  value={addTodoValue}
                  onChange={(event) => setAddTodoValue(event.target.value)}
                  onKeyDown={handleAddTodo}
                />
              </Card>
            </CardFooter>
          </Card>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todolist;
