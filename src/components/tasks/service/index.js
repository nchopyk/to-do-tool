const errors = require('../../../utils/errors');

class TasksService {
  constructor({ DTOs, tasksDataManager, projectsService, sectionsService }) {
    this.tasksDataManager = tasksDataManager;
    this.DTOs = DTOs;
    this.projectsService = projectsService;
    this.sectionsService = sectionsService;
  }

  async create({ userId, projectId, sectionId, name, description, priority, scheduledAt, deadlineAt }) {
    await this.projectsService.throwIfProjectNotExists({ projectId, userId });
    // TODO: check if section exists
    const newTaskId = await this.tasksDataManager.create({ userId, projectId, sectionId, name, description, priority, scheduledAt, deadlineAt });

    return this.getById({ taskId: newTaskId, userId });
  }

  async getById({ taskId, userId }) {
    const task = await this.tasksDataManager.getById({ taskId, userId });

    if (!task) throw new errors.NotFoundError('Task with such id not found');

    return task;
  }

  async getAllForProject({ projectId, userId, sectionId, sortSectionsBy, orderSectionsBy, sortTasksBy, orderTasksBy }) {
    await this.projectsService.throwIfProjectNotExists({ projectId, userId });

    /* [{ id: 1, sectionName: "", tasks: [] }, ...] */
    if (sectionId) return this._getTasksListForSection({ sectionId, projectId, sortTasksBy, orderTasksBy });

    const tasksWithoutSection = await this._getTasksListWithoutSections({ projectId, sortTasksBy, orderTasksBy });
    const tasksWithSection = await this._getTasksListForAllSections({ projectId, sortSectionsBy, orderSectionsBy, sortTasksBy, orderTasksBy });

    return tasksWithoutSection.concat(tasksWithSection);
  }

  async update({ taskId, userId, sectionId, name, description, priority, done, scheduledAt, deadlineAt }) {
    const task = await this.getById({ taskId, userId });

    if (sectionId) await this.sectionsService._throwIfSectionNotExists({ sectionId, projectId: task.projectId });

    await this.tasksDataManager.update({ taskId, userId, sectionId, name, description, priority, done, scheduledAt, deadlineAt });

    return this.getById({ taskId, userId });
  }

  async delete({ taskId, userId }) {
    return this.tasksDataManager.delete({ taskId, userId });
  }

  async _getTasksListForSection({ sectionId, projectId, sortTasksBy, orderTasksBy }) {
    const section = await this.sectionsService.getById({ sectionId, projectId });
    const sectionTasks = await this.tasksDataManager.getAllOfProjectSection({ projectId, sectionId, sort: sortTasksBy, order: orderTasksBy });

    return [{ sectionId, sectionName: section.name, tasks: sectionTasks.map((task) => this.DTOs.toBaseDto(task)) }];
  }

  async _getTasksListForAllSections({ projectId, sortSectionsBy, orderSectionsBy, sortTasksBy, orderTasksBy }) {
    const projectSections = await this.sectionsService.getAllOfProject({ projectId, sort: sortSectionsBy, order: orderSectionsBy });

    return Promise.all(projectSections.map(
      async (section) => {
        const sectionTasks = await this.tasksDataManager.getAllOfProjectSection({
          projectId, sectionId: section.id, sort: sortTasksBy, order: orderTasksBy
        });

        return { sectionId: section.id, sectionName: section.name, tasks: sectionTasks.map((task) => this.DTOs.toBaseDto(task)) };
      }
    ));
  }

  async _getTasksListWithoutSections({ projectId, sortTasksBy, orderTasksBy }) {
    const tasksWithoutSection = await this.tasksDataManager.getAllOfProjectSection({
      projectId, sectionId: null, sort: sortTasksBy, order: orderTasksBy
    });

    return [{ sectionId: null, sectionName: null, tasks: tasksWithoutSection.map((task) => this.DTOs.toBaseDto(task)) }];
  }

  async _throwIfTaskNotExists({ taskId, userId }) {
    const taskExists = await this.tasksDataManager.isExist({ taskId, userId });

    if (!taskExists) throw new errors.NotFoundError('Task with such id not found');
  }
}

function initService() {
  const tasksDataManager = require('./task-repository');
  const tasksDTOs = require('./task-dtos');
  const projectsService = require('../../projects/service');
  const sectionsService = require('../../sections/service');

  return new TasksService({ tasksDataManager, DTOs: tasksDTOs, projectsService, sectionsService });
}

module.exports = initService();
