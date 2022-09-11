const resolvers = {
  Query: {
    async todos(_, __, { Todo }) {
      return await Todo.find();
    },
  },
  Mutation: {
    async createTodo(_, { title, complete }, { Todo }) {
      return await Todo.create({
        title,
        complete,
      });
    },
    async updateTodo(_, { id, title, complete }, { Todo }) {
      return await Todo.findOneAndUpdate(
        { _id: id },
        { $set: { title, complete } },
        { new: true, useFindAndModify: false }
      );
    },
    async deleteTodo(_, { id }, { Todo }) {
      return await Todo.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
