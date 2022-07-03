const Joi = require('@hapi/joi');

module.exports = {
  ofCreate: {
    body: Joi.object({
      projectId: Joi.number().integer().min(1).required(),
      sectionId: Joi.number().integer().min(1),

      name: Joi.string().max(255).required(),
      description: Joi.string().max(500),
      priority: Joi.number().integer().min(0).max(5).default(0),

      scheduledAt: Joi.date(),
      deadlineAt: Joi.date(),
    }),
  },

  ofGetById: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
  },

  ofGetAll: {
    params: Joi.object({
      projectId: Joi.number().integer().min(1).required(),
    }),
    querystring: Joi.object({
      sectionId: Joi.number().integer().min(1),

      sortSectionsBy: Joi.string().valid('id', 'name', 'createdAt', 'updatedAt').default('createdAt'),
      orderSectionsBy: Joi.string().valid('ASC', 'DESC').default('ASC'),

      sortTasksBy: Joi.string().valid('id', 'name', 'priority', 'done', 'scheduledAt', 'deadlineAt', 'createdAt', 'updatedAt').default('id'),
      orderTasksBy: Joi.string().valid('ASC', 'DESC').default('DESC'),
    }),
  },

  ofUpdate: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
    body: Joi.object({
      sectionId: Joi.number().integer().min(1),

      name: Joi.string().max(255),
      description: Joi.string().max(500),
      priority: Joi.number().integer().min(0).max(5),
      done: Joi.boolean(),

      scheduledAt: Joi.date(),
      deadlineAt: Joi.date(),
    }),
  },

  ofDelete: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
  },
};
