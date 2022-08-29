import { PrismaClient } from "@prisma/client";
import { data } from "./data";

const prisma = new PrismaClient();

const run = async () => {
  const newTodo = await Promise.all(
    data.map(async (task) => {
      return prisma.task.create({
        data: {
          title: task.title,
          status: task.status,
          description: task.description,
          todos:{
            create: task.todos.map((todo) => ({
                title:todo.title,
                completed:todo.completed
            }))
          }
        },
      });
    })
  );
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
