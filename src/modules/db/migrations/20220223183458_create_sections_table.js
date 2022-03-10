exports.up = function(knex) {
  return knex.schema.createTable('sections', (table) => {
    table.increments('id');
    table.integer('projectId').unsigned().references('id').inTable('projects').onDelete('cascade').notNullable();

    table.string('name').notNullable();

    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'projectId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
