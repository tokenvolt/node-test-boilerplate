exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function (table) {
      table.increments();
      table.string('title');
  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects')
  ])
}
