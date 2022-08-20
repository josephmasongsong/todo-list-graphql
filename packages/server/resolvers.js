const resolvers = {
  Query: {
    async todos(parent, args, { Todo }) {
      return await Todo.find();
    },
  },
  Mutation: {
    async createTodo(parent, { title, complete }, { Todo }) {
      return await Todo.create({
        title,
        complete,
      });
    },
    async updateTodo(parent, { id, title, complete }, { Todo }) {
      return await Todo.findOneAndUpdate(
        { _id: id },
        { $set: { title, complete } },
        { new: true, useFindAndModify: false }
      );
    },
    async deleteTodo(parent, { id }, { Todo }) {
      return await Todo.findByIdAndRemove({ _id: id });
    },
  },
};

module.exports = resolvers;
