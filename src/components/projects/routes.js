const validatorCompiler = require('../../utils/validatorCompiler');
const projectsValidationSchemas = require('./validationSchemas');
const projectsController = require('./controller');


const initRouter = (fastify, opts, done) => {
  fastify.post('/', {
    schema: projectsValidationSchemas.ofCreate,
    validatorCompiler,
  }, projectsController.create);

  fastify.get('/:id', {
    schema: projectsValidationSchemas.ofGetById,
    validatorCompiler,
  }, projectsController.getById);

  fastify.get('/', {
    schema: projectsValidationSchemas.ofGetAll,
    validatorCompiler,
  }, projectsController.getAll);

  fastify.patch('/:id', {
    schema: projectsValidationSchemas.ofUpdate,
    validatorCompiler,
  }, projectsController.update);

  fastify.delete('/:id', {
    schema: projectsValidationSchemas.ofDelete,
    validatorCompiler,
  }, projectsController.delete);

  done();
};

module.exports = initRouter;
