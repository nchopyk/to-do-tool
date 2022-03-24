exports.up = function(knex) {
  return knex.schema.createTable('medias', (table) => {
    table.increments('id');
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();
    table.integer('taskId').unsigned().references('id').inTable('tasks').onDelete('cascade').notNullable();

    table.string('name').notNullable();

    table.string('thumbnailUrl', 500);
    table.string('contentUrl', 500);

    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());

    table.unique(['id', 'userId', 'taskId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
