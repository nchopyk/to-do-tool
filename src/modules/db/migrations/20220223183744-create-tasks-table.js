exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.integer('projectId').unsigned().references('id').inTable('projects').onDelete('cascade').notNullable();
    table.integer('sectionId').unsigned().references('id').inTable('sections').onDelete('cascade');
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('cascade');

    table.string('name').notNullable();
    table.string('description', 500);

    table.integer('priority').defaultTo(0);
    table.boolean('done').defaultTo(false);

    table.dateTime('scheduledAt');
    table.dateTime('deadlineAt');

    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'projectId', 'sectionId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
