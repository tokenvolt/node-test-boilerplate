import knex from 'knex'
import bookshelf from 'bookshelf'
import config from 'config/knexfile'


export default bookshelf(
                          (knex(config[process.env.APP_ENV])),
                          { debug: process.env.APP_ENV === 'development' ? true : false }
                        )
