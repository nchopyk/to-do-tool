exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('cascade').notNullable();
    table.integer('section_id').unsigned().references('id').inTable('sections').onDelete('cascade');

    table.string('name').notNullable();
    table.string('description', 1000);

    table.integer('priority').defaultTo(0);
    table.boolean('done').defaultTo(false);

    table.dateTime('scheduled_at');
    table.dateTime('deadline_at');

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'project_id', 'section_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
