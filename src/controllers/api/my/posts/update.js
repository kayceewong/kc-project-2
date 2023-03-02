import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const updateSchema = yup.object({
  content: yup.string().required(),
  images: yup.array().of(yup.object({
    id: yup.mixed().notRequired(),
    url: yup.mixed().when('id', {
      is: (val) => !!val,
      then: yup.mixed().notRequired(),
      otherwise: yup.mixed().required()
    }).label('Image')
  }))
})

const controllersApiMyPostsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...verifiedData,
        images: {
          set: verifiedData?.images?.filter((img) => !!img.id)?.map((img) => ({ id: Number(img.id) })) || [],
          create: verifiedData?.images?.filter((img) => !img.id) || []
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
