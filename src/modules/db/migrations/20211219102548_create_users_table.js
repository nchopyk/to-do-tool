exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.string('username').notNullable();
    table.string('fullName');

    table.string('avatarUrl');

    table.boolean('activated').defaultTo(false);
    table.string('activationLink').unique();
    table.boolean('blocked').defaultTo(false);

    table.string('theme', 20);
    table.boolean('notifications').defaultTo(true);
    table.string('timezone', 20).defaultTo('Europe/Kiev');

    table.bigInteger('fileStorageLimitBytes').defaultTo(1073741824); // 1 gb
    table.bigInteger('fileStorageUsedBytes').defaultTo(0);

    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAat').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique(['id', 'email']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
