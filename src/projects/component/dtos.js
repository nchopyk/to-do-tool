module.exports = {
  toBaseDto: (rawProjectData) => ({
    id: rawProjectData.id,
    name: rawProjectData.name,
    sortTasksBy: rawProjectData.sortTasksBy,
    orderTasksBy: rawProjectData.orderTasksBy,
  }),

  toDetailDto: (rawProjectData) => ({
    id: rawProjectData.id,
    name: rawProjectData.name,
    active: rawProjectData.active,
    sortTasksBy: rawProjectData.sortTasksBy,
    orderTasksBy: rawProjectData.orderTasksBy,
    createdAt: rawProjectData.createdAt,
    updatedAt: rawProjectData.updatedAt,
  })

};
