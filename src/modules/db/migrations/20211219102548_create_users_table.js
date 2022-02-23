exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.string('username').notNullable();
    table.string('full_name');

    table.string('avatar_url');

    table.boolean('activated').defaultTo(false);
    table.string('activation_link').unique();
    table.boolean('blocked').defaultTo(false);

    table.string('theme');
    table.boolean('notifications').defaultTo(true);
    table.string('timezone').defaultTo('Europe/Kiev');

    table.bigInteger('file_store_limit_bytes').defaultTo(1073741824); // 1 gb
    table.bigInteger('file_store_used_bytes').defaultTo(0);

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'email']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
