exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.text('description');
    table.string('status').notNullable();
    table.float('progress').notNullable().defaultTo(0);

    table.dateTime('active_at');
    table.dateTime('deadline_at');

    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('cascade').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();
    table.integer('child_id').unsigned().references('id').inTable('tasks').onDelete('cascade').notNullable();
    table.integer('parent_id').unsigned().references('id').inTable('tasks').onDelete('cascade').notNullable();

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
