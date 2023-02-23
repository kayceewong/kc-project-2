// src/controllers/api/my/posts/index.js

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyPostsIndex = async (req, res) => {
  try {
    const foundPosts = await prisma.post.findMany()
    return res.status(200).json(foundPosts)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsIndex
