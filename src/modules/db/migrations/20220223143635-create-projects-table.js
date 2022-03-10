exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();

    table.string('name').notNullable();
    table.boolean('active').defaultTo(true);

    table.string('sortTasksBy', 15).defaultTo('createdAt');
    table.string('orderTasksBy', 15).defaultTo('DESC');

    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'userId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
