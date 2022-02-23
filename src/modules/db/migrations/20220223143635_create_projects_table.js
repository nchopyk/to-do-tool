exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();

    table.string('name').notNullable();
    table.boolean('active').defaultTo(true);

    table.string('sort_tasks_by').defaultTo('created_at');
    table.string('order_tasks_by').defaultTo('DESC');

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'user_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
