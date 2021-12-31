exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.string('username').notNullable();
    table.string('full_name');
    table.string('avatar_url');

    table.string('activation_link').unique();
    table.string('refresh_token');
    table.dateTime('last_login');
    table.string('last_ip');

    table.boolean('verified').defaultTo(false);
    table.boolean('blocked').defaultTo(false);
    table.boolean('notifications').defaultTo(false);

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'email', 'activation_link']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
