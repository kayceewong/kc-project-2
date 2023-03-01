import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
  content: yup.string().required(),
  images: yup.array().of(yup.object({
    name: yup.string().required().label('image')
  }))
})

const controllersApiMyPostsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        verifiedData,
        images: {
          set: [],
          connectOrCreate: verifiedData?.images?.map((image) => ({
            where: image,
            create: image
          }))
        }
      }
    })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiMyPostsUpdate
]
