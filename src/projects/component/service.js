const errors = require('../../utils/errors');

class ProjectService {
  constructor(projectsDataManager, DTOs) {
    this.projectsDataManager = projectsDataManager;
    this.DTOs = DTOs;
  }

  async create({ userId, name, sortTasksBy, orderTasksBy }) {
    const newProjectId = await this.projectsDataManager.create({ userId, name, sortTasksBy, orderTasksBy });
    const newProject = await this.projectsDataManager.getById({ projectId: newProjectId, userId });

    return this.DTOs.toDetailDto(newProject);
  }

  async getById({ projectId, userId }) {
    const project = await this.projectsDataManager.getById({ projectId, userId });

    if (!project) throw new errors.NotFoundError('Project with such id not found');

    return this.DTOs.toDetailDto(project);
  }

  async getAll({ userId, limit, skip, sort, order, onlyActive, onlyInactive }) {
    const active = onlyInactive ? [] : await this.projectsDataManager.getAllActive({ userId, limit, skip, sort, order });
    const inactive = onlyActive ? [] : await this.projectsDataManager.getAllInactive({ userId, limit, skip, sort, order });

    return {
      active: active.map((project) => this.DTOs.toBaseDto(project)),
      inactive: inactive.map((project) => this.DTOs.toBaseDto(project))
    };
  }

  async update({ projectId, userId, name, active, sortTasksBy, orderTasksBy }) {
    const success = await this.projectsDataManager.update({ projectId, userId, name, active, sortTasksBy, orderTasksBy });

    if (!success) throw new errors.NotFoundError('Project with such id not found');

    return this.projectsDataManager.getById({ projectId, userId });
  }

  async delete({ projectId, userId }) {
    return this.projectsDataManager.delete({ projectId, userId });
  }
}


function initService() {
  const projectsDataManager = require('./data-manager');
  const projectsDTOs = require('./dtos');
  return new ProjectService(projectsDataManager, projectsDTOs);
}

module.exports = initService();
