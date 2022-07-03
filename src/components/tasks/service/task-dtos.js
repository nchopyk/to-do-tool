module.exports = {
  toBaseDto: (rawTaskData) => ({
    id: rawTaskData.id,
    name: rawTaskData.name,
    priority: rawTaskData.priority,
    done: rawTaskData.done,
    scheduledAt: rawTaskData.scheduledAt,
    deadlineAt: rawTaskData.deadlineAt,
  }),

};
