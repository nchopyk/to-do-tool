exports.up = function(knex) {
  return knex.schema.createTable('medias', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();
    table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('cascade').notNullable();

    table.string('name').notNullable();

    table.string('thumbnail_url', 500);
    table.string('content_url', 500);

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());

    table.unique(['id', 'user_id', 'task_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
