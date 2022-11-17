import { ITodo } from './Todo.model';

interface TodoFields {
  id?: string;
  title: string;
  complete: boolean;
}

interface TodoService {
  find(): ITodo[];
  create(a: TodoFields): ITodo;
  findByIdAndRemove(id: string): ITodo;
  findOneAndUpdate(a: object, b: object, c: object): ITodo;
}

interface TodoContext {
  Todo: TodoService;
}

const resolvers = {
  Query: {
    async todos(parent: undefined, args: TodoFields, context: TodoContext) {
      return await context.Todo.find();
    },
  },
  Mutation: {
    async createTodo(
      parent: undefined,
      args: TodoFields,
      context: TodoContext
    ) {
      const { title, complete } = args;
      return await context.Todo.create({
        title,
        complete,
      });
    },
    async updateTodo(
      parent: undefined,
      args: TodoFields,
      context: TodoContext
    ) {
      const { id, title, complete } = args;
      return await context.Todo.findOneAndUpdate(
        { _id: id },
        { $set: { title, complete } },
        { new: true, useFindAndModify: false }
      );
    },
    async deleteTodo(
      parent: undefined,
      args: TodoFields,
      context: TodoContext
    ) {
      const { id } = args;
      return await context.Todo.findByIdAndRemove(id!);
    },
  },
};

export default resolvers;
