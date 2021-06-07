import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post should have a title'],
    },
    message: {
      type: String,
      required: [true, 'A post should contain some message'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
  }
)
const Post = mongoose.model('Post', postSchema)
export default Post
