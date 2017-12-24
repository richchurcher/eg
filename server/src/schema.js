import { makeExecutableSchema } from 'graphql-tools'
import * as comments from './comments'
import * as posts from './posts'
import * as users from './users'

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

export default schema
