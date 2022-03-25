const Joi = require('@hapi/joi');

module.exports = {
  ofCreate: {
    body: Joi.object({
      name: Joi.string().required(),
      sortTasksBy: Joi.string().valid('id', 'name', 'priority', 'createdAt', 'updatedAt', 'deadlineAt').default('id'),
      orderTasksBy: Joi.string().valid('ASC', 'DESC').default('DESC'),
    }),
  },

  ofGetById: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
  },

  ofGetAll: {
    querystring: Joi.object({
      limit: Joi.number().integer().min(0).max(100).default(50),
      skip: Joi.number().integer().min(0).default(0),
      sort: Joi.string().valid('id', 'name', 'createdAt', 'updatedAt').default('id'),
      order: Joi.string().valid('ASC', 'DESC').default('DESC'),
      onlyActive: Joi.boolean(),
      onlyInactive: Joi.boolean(),
    }).oxor('onlyActive', 'onlyInactive'),
  },

  ofUpdate: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
    body: Joi.object({
      name: Joi.string(),
      active: Joi.boolean(),
      sortTasksBy: Joi.string().valid('id', 'name', 'priority', 'createdAt', 'updatedAt', 'deadlineAt'),
      orderTasksBy: Joi.string().valid('ASC', 'DESC'),
    }),
  },

  ofDelete: {
    params: Joi.object({
      id: Joi.number().integer().min(1).required()
    }),
  },
};
