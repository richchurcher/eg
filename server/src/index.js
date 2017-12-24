import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

import knex from './knex'
import schema from './schema'

const app = new Koa()
app.context.db = knex

const router = new KoaRouter()

router.post('/graphql', koaBody(), (context, next) => graphqlKoa({ schema, context })(context, next))
router.get('/graphql', (context, next) => graphqlKoa({ schema, context })(context, next))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = 3000
app.listen(PORT, () => console.log('GraphQL up'))
