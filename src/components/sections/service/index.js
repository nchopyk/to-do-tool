const errors = require('../../../utils/errors');

class SectionsService {
  constructor({ sectionsDataManager, DTOs }) {
    this.sectionsDataManager = sectionsDataManager;
    this.DTOs = DTOs;
  }

  async getById({ sectionId, projectId }) {
    console.log({ sectionId, projectId  });
    const [section] = await this.sectionsDataManager.getById({ sectionId, projectId });

    return section;
  }

  async getAllOfProject({ projectId, sort, order }) {
    const sections = await this.sectionsDataManager.getAllOfProject({ projectId, sort, order });

    return sections.map((section) => this.DTOs.toBaseDto(section));
  }

  async _throwIfSectionNotExists({ sectionId, projectId }) {
    const sectionExists = await this.sectionsDataManager.isExist({ sectionId, projectId });

    if (!sectionExists) throw new errors.NotFoundError('Section with such id not found');
  }

}

function initService() {
  const sectionsDataManager = require('./section-repository');
  const sectionsDTOs = require('./section-dtos');
  return new SectionsService({ sectionsDataManager, DTOs: sectionsDTOs });
}

module.exports = initService();
