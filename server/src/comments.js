export const all = db => () => db('comments')
export const create = db => comment => db('comments').insert(comment)
export const remove = db => commentId => db('comments').where('id', commentId).del()
export const update = db => comment => db('comments').where('id', comment.id).update(comment)
export const withId = db => commentId => db('comments').where('id', commentId)

export const mutations = {
  createComment: (_, { comment }, { db }) => create(db)(comment),
  deleteComment: (_, { commentId }, { db }) => remove(db)(commentId),
  updateComment: (_, { comment }, { db }) => update(db)(comment)
}

export const queries = {
  comment: (_, { commentId }, { db }) => withId(db)(commentId),
  comments: (_, __, { db }) => all(db)()
}

const Comment = 'type Comment { id: ID, body: String }'
const CommentInput = 'input CommentInput { id: ID, body: String! }'

export default [ Comment, CommentInput ]
