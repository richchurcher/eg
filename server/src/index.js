import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

const app = new Koa()
const router = new KoaRouter()
const PORT = 3000

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema: `` }))
router.get('/graphql', graphqlKoa({ schema: `` }))

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)

console.log('GraphQL up')
