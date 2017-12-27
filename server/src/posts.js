export const all = db => () => db('posts')
export const create = db => post => db('posts').insert(post)
export const remove = db => postId => db('posts').where('id', postId).del()
export const update = db => post => db('posts').where('id', post.id).update(post)
export const withId = db => postId => db('posts').where('id', postId)

export const mutations = {
  createPost: (_, { post }, { db }) => create(db)(post),
  deletePost: (_, { postId }, { db }) => remove(db)(postId),
  updatePost: (_, { post }, { db }) => update(db)(post)
}

export const queries = {
  post: (_, { postId }, { db }) => withId(db)(postId),
  posts: (_, __, { db }) => all(db)()
}

const Post = 'type Post { id: ID, title: String, body: String }'
const PostInput = 'input PostInput { id: ID, title: String!, body: String! }'

export default [ Post, PostInput ]
