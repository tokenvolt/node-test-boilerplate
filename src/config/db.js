import knex from 'knex'
import config from 'config/knexfile'

export default knex(config[process.env.APP_ENV])
