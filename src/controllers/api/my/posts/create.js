// src/controllers/api/my/posts/create.js
import yup from 'yup'
import uploadFileAsync from '../../../_helpers/upload-file.js'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  content: yup.string().required(),
  images: yup.array().of(yup.object({
    url: yup.string().required()
  }))
})

const controllersApiMyPostsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const newPost = await prisma.post.create({
      data: {
        ...verifiedData,
        user: {
          connect: { id: userId }
        },
        images: {
          connectOrCreate: verifiedData?.images?.map((image) => ({
            where: image,
            create: image
          }))
        }
      }
    })
    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsCreate
