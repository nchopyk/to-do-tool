exports.up = function (knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.float('overall_progress').notNullable().defaultTo(0);

    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
