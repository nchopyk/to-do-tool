exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.string('username').notNullable();
    table.string('full_name');
    table.string('avatar_url');

    table.string('activation_link');
    table.string('refresh_token');
    table.dateTime('last_login');
    table.string('last_ip');

    table.boolean('verified');
    table.boolean('blocked');
    table.boolean('notifications');

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'email']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
