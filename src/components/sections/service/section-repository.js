class SectionsDataManager {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async getById({ sectionId, projectId }) {
    const [section] = await this.dbClient
      .select()
      .from('sections')
      .where({ id: sectionId, projectId });

    return section;
  }

  async getAllOfProject({ projectId, sort, order }) {
    return this.dbClient
      .select()
      .from('sections')
      .where({ projectId })
      .orderBy(sort, order);
  }

  async isExist({ sectionId, projectId }) {
    const [section] = await this.dbClient.select('id').from('sections').where({ id: sectionId, projectId });

    return !!section;
  }

}

const initDataManager = () => {
  const initDbConnection = require('../../../modules/db/mysql-client');
  const dbClient = initDbConnection();
  return new SectionsDataManager(dbClient);
};

module.exports = initDataManager();
