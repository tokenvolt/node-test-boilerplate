exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('assignees', function (table) {
      table.increments();
      table.integer('project_id').unsigned().references('projects.id');
      table.integer('user_id').unsigned().references('users.id');
      table.boolean('is_project_manager');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('assignees')
  ])
};
