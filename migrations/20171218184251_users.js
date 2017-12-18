exports.up = (knex, Promise) =>
  knex.schema.createTable('users', t => {
    t.increments()
    t.string('name')
    t.timestamps(true, true)
  })

exports.down = (knex, Promise) => knex.schema.dropTable('users')
