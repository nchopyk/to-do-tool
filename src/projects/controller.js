class ProjectsController {
  constructor(projectsService) {
    this.projectsService = projectsService;
  }

  create = async (request, reply) => {
    const { name, sortTasksBy, orderTasksBy } = request.body;
    const userId = 1; // TODO: retrieve from JWT

    const newProject = await this.projectsService.create({ userId, name, sortTasksBy, orderTasksBy });

    return reply.send(newProject);
  };

  getById = async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = 1; // TODO: retrieve from JWT

    const project = await this.projectsService.getById({ projectId, userId });

    return reply.send(project);
  };

  getAll = async (request, reply) => {
    const { limit, skip, sort, order, onlyActive, onlyInactive } = request.query;
    const userId = 1; // TODO: retrieve from JWT

    const projects = await this.projectsService.getAll({ userId, limit, skip, sort, order, onlyActive, onlyInactive });

    return reply.send(projects);
  };

  update = async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = 1; // TODO: retrieve from JWT
    const { name, active, sortTasksBy, orderTasksBy } = request.body;

    const updatedProject = await this.projectsService.update({
      projectId,
      userId,
      name,
      active,
      sortTasksBy,
      orderTasksBy
    });

    return reply.send(updatedProject);
  };

  delete = async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = 1; // TODO: retrieve from JWT

    await this.projectsService.delete({ projectId, userId });

    return reply.send();
  };
}

const initController = () => {
  const projectsService = require('./component/service');
  return new ProjectsController(projectsService);
};

module.exports = initController();
