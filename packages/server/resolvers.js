const resolvers = {
  Query: {
    async todos(parent, args, { Todo }) {
      return Todo.find();
    },
  },
  Mutation: {
    async createTodo(parent, { title, complete }, { Todo }) {
      return Todo.create({
        title,
        complete,
      });
    },
    async updateTodo(parent, { id, title, complete }, { Todo }) {
      return Todo.findOneAndUpdate(
        { _id: id },
        { $set: { title, complete } },
        { new: true, useFindAndModify: false }
      );
    },
    async deleteTodo(parent, { id }, { Todo }) {
      return Todo.findByIdAndRemove({ _id: id });
    },
  },
};

module.exports = resolvers;
