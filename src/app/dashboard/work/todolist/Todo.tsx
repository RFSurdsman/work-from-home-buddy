class Todo {
  static nextId: number = 0;
  id: number;
  description: string;
  done: boolean = false;

  constructor(description: string) {
    this.id = Todo.nextId++;
    this.description = description;
  }
}

export default Todo;
