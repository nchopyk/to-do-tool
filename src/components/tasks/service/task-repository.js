class TasksDataManager {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async create({ userId, projectId, sectionId, name, description, priority, scheduledAt, deadlineAt }) {
    const [newTaskId] = await this.dbClient('tasks').insert({
      userId,
      projectId,
      sectionId,
      name,
      description,
      priority,
      scheduledAt,
      deadlineAt
    });

    return newTaskId;
  }

  async getById({ taskId, userId }) {
    const [task] = await this.dbClient.select().from('tasks').where({ id: taskId, userId });

    return task;
  }

  async getAllOfProjectSection({ projectId, sectionId, sort, order }) {
    return this.dbClient
      .select()
      .from('tasks')
      .where({ projectId, sectionId })
      .orderBy(sort, order);
  }

  async update({ taskId, userId, sectionId, name, description, priority, done, scheduledAt, deadlineAt }) {
    return this.dbClient('tasks')
      .update({ sectionId, name, description, priority, done, scheduledAt, deadlineAt })
      .where({ id: taskId, userId });
  }

  async delete({ taskId, userId }) {
    return this.dbClient('tasks').where({ id: taskId, userId }).del();
  }

  async isExist({ taskId, userId }) {
    const [task] = await this.dbClient.select('id').from('tasks').where({ id: taskId, userId });

    return !!task;
  }
}

const initDataManager = () => {
  const initDbConnection = require('../../../modules/db/mysql-client');
  const dbClient = initDbConnection();
  return new TasksDataManager(dbClient);
};

module.exports = initDataManager();
