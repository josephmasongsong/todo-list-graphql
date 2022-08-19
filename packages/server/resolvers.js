const resolvers = {
  Query: {
    async todos(parent, args, { Todo }) {
      return Todo.find();
    },
  },
  Mutation: {
    async createTodo(parent, { title, complete }, context) {
      return context.Todo.create({
        title,
        complete,
      });
    },
    async updateTodo(parent, { id, title, complete }, context) {
      return context.Todo.findOneAndUpdate(
        { _id: id },
        { $set: { title, complete } },
        { new: true, useFindAndModify: false }
      );
    },
    async deleteTodo(parent, { id }, context) {
      return context.Todo.findByIdAndRemove({ _id: id });
    },
  },
};

module.exports = resolvers;
