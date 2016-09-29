// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password: 'root',
      database : 'try-node-dev'
    },
    migrations: {
      directory: './migrations'
    },
    debug: true
  }
}
