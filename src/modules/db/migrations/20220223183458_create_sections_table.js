exports.up = function(knex) {
  return knex.schema.createTable('sections', (table) => {
    table.increments('id');
    table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('cascade').notNullable();

    table.string('name').notNullable();

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'project_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
