import { objectType, extendType, nonNull, stringArg, idArg } from "nexus";

export const Todo = objectType({
  name: "Todo",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("title");
    t.nonNull.boolean("completed");
  },
});

export const TodoQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("todos", {
      type: Todo,
      resolve(parent, args, context, info) {
        return context.prisma.todo.findMany();
      },
    });
  },
});

export const TodoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTodo", {
      type: Todo,
      args: {
        title: nonNull(stringArg()),
      },
      resolve(parent, { title }, context, info) {
        return context.prisma.todo.create({
          data: {
            title,
          },
        });
      },
    });

    t.nonNull.field("updateTodo", {
      type: Todo,
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, { id }, context, info) {
        return context.prisma.todo.update({
          where: { id: parseInt(id) },
          data: { completed: true },
        });
      },
    });

    t.nonNull.field("deleteTodo", {
      type: Todo,
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, { id }, context, info) {
        return context.prisma.todo.delete({
          where: { id: parseInt(id) },
        });
      },
    });
  },
});
