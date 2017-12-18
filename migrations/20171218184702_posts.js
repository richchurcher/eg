exports.up = (knex, Promise) =>
  knex.schema.createTable('posts', t => {
    t.increments()
    t.bigInteger('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    t.string('title')
    t.text('body')
    t.timestamps(true, true)
  })

exports.down = (knex, Promise) => knex.schema.dropTable('posts')
