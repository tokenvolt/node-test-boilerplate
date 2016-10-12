import { makeExecutableSchema } from 'graphql-tools'
import R from 'ramda'
import User from './User'
import Project from './Project'
import loadModules from '../utils/loadModules'


export default makeExecutableSchema(loadModules([User, Project]))