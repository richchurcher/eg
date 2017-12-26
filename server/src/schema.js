import { makeExecutableSchema } from 'graphql-tools'

import * as auth from './auth'
import * as comments from './comments'
import * as posts from './posts'
import * as users from './users'

const typeDefs = `
  type Mutation {
    login (credentials: CredentialsInput!): AuthResult
    logout: AuthResult

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
  type AuthResult { success: Boolean, message: String }
  input CredentialsInput { name: String!, password: String! }

  type Comment { id: ID, body: String }
  input CommentInput { id: ID, body: String! }

  type Post { id: ID, title: String, body: String }
  input PostInput { id: ID, title: String!, body: String! }

  type User { id: ID, name: String }
  input UserInput { id: ID, name: String, password: String }
`

const resolvers = {
  Mutation: {
    login: users.validateCredentials(auth.login),
    logout: (_, __, { db }) => auth.logout(db)(),

    createComment: (_, { comment }, { db }) => comments.create(db)(comment),
    deleteComment: (_, { commentId }, { db }) => comments.remove(db)(commentId),
    updateComment: (_, { comment }, { db }) => comments.update(db)(comment),

    createPost: (_, { post }, { db }) => posts.create(db)(post),
    deletePost: (_, { postId }, { db }) => posts.remove(db)(postId),
    updatePost: (_, { post }, { db }) => posts.update(db)(post),

    createUser: (_, { user }, { db }) => users.create(db)(user),
    deleteUser: (_, { userId }, { db }) => users.remove(db)(userId),
    updateUser: (_, { user }, { db }) => users.update(db)(user)
  },
  Query: {
    comment: (_, { commentId }, { db }) => comments.withId(db)(commentId),
    comments: (_, __, { db }) => comments.all(db)(),

    post: (_, { postId }, { db }) => posts.withId(db)(postId),
    posts: (_, __, { db }) => posts.all(db)(),

    user: (_, { userId }, { db }) => users.withId(db)(userId),
    users: (_, __, { db }) => users.all(db)()
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
