import { makeExecutableSchema } from 'graphql-tools'

import Auth, * as auth from './auth'
import Comments, * as comments from './comments'
import Posts, * as posts from './posts'
import Users, * as users from './users'

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
`

const resolvers = {
  Mutation: {
    ...auth.mutations,
    ...comments.mutations,
    ...posts.mutations,
    ...users.mutations
  },
  Query: {
    ...auth.queries,
    ...comments.queries,
    ...posts.queries,
    ...users.queries
  }
}

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    ...Auth,
    ...Comments,
    ...Posts,
    ...Users
  ],
  resolvers
})

export default schema
