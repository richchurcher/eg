import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'

const app = new Koa()
const router = new KoaRouter()
const PORT = 3000

let comments = [
  {
    id: '1',
    body: 'No comment.'
  },
  {
    id: '2',
    body: 'Still no comment.'
  }
]

let posts = [
  {
    id: '1',
    title: 'Post 1',
    body: 'Some junk.'
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Some more junk. And stuff.'
  }
]

let users = [
  {
    id: '1',
    name: 'flargle'
  },
  {
    id: '2',
    name: 'wargle'
  }
]

const maxId = entities => entities
  .map(e => Number(e.id))
  .sort((a, b) => a < b ? 1 : a > b ? -1 : 0)[0]

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

  type User { id: ID, name: String }
  input UserInput { id: ID, name: String }
`

const resolvers = {
  Mutation: {
    createComment: (_, { comment }) => new Promise(resolve => {
      const newComment = { ...comment, id: maxId(comments) + 1 }
      comments = [ ...comments, newComment ]
      resolve(newComment)
    }),
    deleteComment: (_, { commentId }) => new Promise(resolve => {
      comments = comments.filter(c => c.id !== commentId)
      resolve(comments)
    }),
    updateComment: (_, { comment }) => new Promise(resolve => {
      const i = comments.findIndex(c => c.id === comment.id)
      comments[i] = { ...comments[i], ...comment }
      resolve(comments[i])
    }),

    createPost: (_, { post }) => new Promise(resolve => {
      const newPost = { ...post, id: maxId(posts) + 1 }
      posts = [ ...posts, newPost ]
      resolve(newPost)
    }),
    deletePost: (_, { postId }) => new Promise(resolve => {
      posts = posts.filter(c => c.id !== postId)
      resolve(posts)
    }),
    updatePost: (_, { post }) => new Promise(resolve => {
      const i = posts.findIndex(c => c.id === post.id)
      posts[i] = { ...posts[i], ...post }
      resolve(posts[i])
    }),

    createUser: (_, { user }) => new Promise(resolve => {
      const newUser = { ...user, id: maxId(users) + 1 }
      users = [ ...users, newUser ]
      resolve(newUser)
    }),
    deleteUser: (_, { userId }) => new Promise(resolve => {
      users = users.filter(c => c.id !== userId)
      resolve(users)
    }),
    updateUser: (_, { user }) => new Promise(resolve => {
      const i = users.findIndex(c => c.id === user.id)
      users[i] = { ...users[i], ...user }
      resolve(users[i])
    })

  },
  Query: {
    comment: (_, { id }) => Promise.resolve(comments.find(c => c.id === id)),
    comments: () => Promise.resolve(comments),
    post: (_, { id }) => Promise.resolve(posts.find(p => p.id === id)),
    posts: () => Promise.resolve(posts),
    user: (_, { id }) => Promise.resolve(users.find(u => u.id === id)),
    users: () => Promise.resolve(users)
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

router.post(
  '/graphql',
  koaBody(),
  (ctx, next) => graphqlKoa({ schema, ctx })(ctx, next)
)
router.get(
  '/graphql',
  (ctx, next) => graphqlKoa({ schema, ctx })(ctx, next)
)
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)

console.log('GraphQL up')
