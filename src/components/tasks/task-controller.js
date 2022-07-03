class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  create = async (request, reply) => {
    const userId = 1; // TODO: retrieve from JWT
    const { projectId, sectionId, name, description, priority, scheduledAt, deadlineAt } = request.body;

    const newTask = await this.tasksService.create({ userId, projectId, sectionId, name, description, priority, scheduledAt, deadlineAt });

    return reply.send(newTask);
  };

  getById = async (request, reply) => {
    const userId = 1; // TODO: retrieve from JWT
    const { id: taskId } = request.params;

    const task = await this.tasksService.getById({ taskId, userId });

    return reply.send(task);
  };

  getAllForProject = async (request, reply) => {
    const userId = 1; // TODO: retrieve from JWT
    const { projectId } = request.params;
    const { sectionId, sortSectionsBy, orderSectionsBy, sortTasksBy, orderTasksBy } = request.query;

    const tasks = await this.tasksService.getAllForProject({
      projectId,
      userId,
      sectionId,
      sortSectionsBy,
      orderSectionsBy,
      sortTasksBy,
      orderTasksBy
    });

    return reply.send(tasks);
  };

  update = async (request, reply) => {
    const userId = 1; // TODO: retrieve from JWT
    const { id: taskId } = request.params;
    const { name, sectionId, description, priority, done, scheduledAt, deadlineAt } = request.body;

    const updatedProject = await this.tasksService.update({ taskId, userId, sectionId, name, description, priority, done, scheduledAt, deadlineAt });

    return reply.send(updatedProject);
  };

  delete = async (request, reply) => {
    const userId = 1; // TODO: retrieve from JWT
    const { id: taskId } = request.params;

    await this.tasksService.delete({ taskId, userId });

    return reply.send();
  };
}

const initController = () => {
  const tasksService = require('./service');
  return new TasksController(tasksService);
};

module.exports = initController();
