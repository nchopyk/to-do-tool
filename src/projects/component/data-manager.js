class ProjectsDataManager {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async create({ userId, name, sortTasksBy, orderTasksBy }) {
    const [newProjectId] = await this.dbClient('projects').insert({ userId, name, sortTasksBy, orderTasksBy });
    return newProjectId;
  }

  async getById({ projectId, userId }) {
    const [project] = await this.dbClient
      .select()
      .from('projects')
      .where({ id: projectId })
      .andWhere({ userId });

    return project;
  }

  async getAll({ userId, limit, skip, sort, order }) {
    return this.dbClient
      .select()
      .from('projects')
      .where({ userId })
      .offset(skip)
      .limit(limit)
      .orderBy(sort, order);
  }

  async getAllActive({ userId, limit, skip, sort, order }) {
    return this.dbClient
      .select()
      .from('projects')
      .where({ userId, active: true })
      .offset(skip)
      .limit(limit)
      .orderBy(sort, order);
  }

  async getAllInactive({ userId, limit, skip, sort, order }) {
    return this.dbClient
      .select()
      .from('projects')
      .where({ userId, active: false })
      .offset(skip)
      .limit(limit)
      .orderBy(sort, order);
  }

  async update({ projectId, userId, name, active, sortTasksBy, orderTasksBy }) {
    return this.dbClient('projects')
      .where({ id: projectId })
      .andWhere({ userId })
      .update({ name, active, sortTasksBy, orderTasksBy });
  }

  async delete({ projectId, userId }) {
    return this.dbClient('projects')
      .where({ id: projectId, userId })
      .del();
  }
}

const initDataManager = () => {
  const initDbConnection = require('../../modules/db/mysqlClient');
  const dbClient = initDbConnection();
  return new ProjectsDataManager(dbClient);
};

module.exports = initDataManager();
