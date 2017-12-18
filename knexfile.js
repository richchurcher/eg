module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'egdev'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'eg',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
