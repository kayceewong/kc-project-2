// src/controllers/api/my/posts/update.js

import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const updateSchema = yup.object({
  content: yup.string().required()
})

const controllersApiMyPostsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.post.update({ where: { id: Number(id) }, data: verifiedData })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsUpdate
