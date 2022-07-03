const validatorCompiler = require('../../utils/validator-compiler');
const tasksValidationSchemas = require('./task-validation-schemas');
const tasksController = require('./task-controller');


const initRouter = (fastify, opts, done) => {
  fastify.post('/', {
    schema: tasksValidationSchemas.ofCreate,
    validatorCompiler,
  }, tasksController.create);

  fastify.get('/:id', {
    schema: tasksValidationSchemas.ofGetById,
    validatorCompiler,
  }, tasksController.getById);

  fastify.get('/project/:projectId', {
    schema: tasksValidationSchemas.ofGetAll,
    validatorCompiler,
  }, tasksController.getAllForProject);

  fastify.patch('/:id', {
    schema: tasksValidationSchemas.ofUpdate,
    validatorCompiler,
  }, tasksController.update);

  fastify.delete('/:id', {
    schema: tasksValidationSchemas.ofDelete,
    validatorCompiler,
  }, tasksController.delete);

  done();
};

module.exports = initRouter;
