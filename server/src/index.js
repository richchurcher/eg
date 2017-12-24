import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import knex from './knex'
import * as comments from './comments'
import * as posts from './posts'
import * as users from './users'

const app = new Koa()
app.context.db = knex

const typeDefs = `
  type Mutation {
    createComment (comment: CommentInput): Comment
    deleteComment (commentId: ID): [Comment]
    updateComment (comment: CommentInput): Comment

    createPost (post: PostInput): Post
    deletePost (postId: ID): [Post]
    updatePost (post: PostInput): Post

    createUser (user: UserInput): User
    deleteUser (userId: ID): [User]
    updateUser (user: UserInput): User
  }
  type Query {
    comment (id: ID): Comment
    comments: [Comment]

    post (id: ID): Post
    posts: [Post]

    user (id: ID): User
    users: [User]
  }
  type Comment { id: ID, body: String }
  input CommentInput { id: ID, body: String }

  type Post { id: ID, title: String, body: String }
  input PostInput { id: ID, title: String, body: String }

  type User { id: ID, name: String, hash: String }
  input UserInput { id: ID, name: String, hash: String }
`

const resolvers = {
  Mutation: {
    createComment: (_, { comment }, { db }) => comments.createComment(db)(comment),
    deleteComment: (_, { commentId }, { db }) => comments.deleteComment(db)(commentId),
    updateComment: (_, { comment }, { db }) => comments.updateComment(db)(comment),

    createPost: (_, { post }, { db }) => posts.createPost(db)(post),
    deletePost: (_, { postId }, { db }) => posts.deletePost(db)(postId),
    updatePost: (_, { post }, { db }) => posts.updatePost(db)(post),

    createUser: (_, { user }, { db }) => users.createUser(db)(user),
    deleteUser: (_, { userId }, { db }) => users.deleteUser(db)(userId),
    updateUser: (_, { user }, { db }) => users.updateUser(db)(user)
  },
  Query: {
    comment: (_, { commentId }, { db }) => comments.getComment(db)(commentId),
    comments: (_, __, { db }) => comments.getComments(db)(),
    post: (_, { postId }, { db }) => posts.getPost(db)(postId),
    posts: (_, __, { db }) => posts.getPosts(db)(),
    user: (_, { userId }, { db }) => users.getUser(db)(userId),
    users: (_, __, { db }) => users.getUsers(db)()
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const router = new KoaRouter()

router.post('/graphql', koaBody(), (context, next) => graphqlKoa({ schema, context })(context, next))
router.get('/graphql', (context, next) => graphqlKoa({ schema, context })(context, next))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 400
    ctx.body = `Uh-oh: ${err.message}`
    console.log('Error handler:', err.message)
  }
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = 3000
app.listen(PORT, () => console.log('GraphQL up'))
