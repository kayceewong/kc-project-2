// src/controllers/api/posts/create.js
import yup from 'yup'

import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const createSchema = yup.object({
  content: yup.string().required()
})

const controllersApiTweetsCreate = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newTweet = await prisma.tweet.create({ data: verifiedData })
    return res.status(201).json(newTweet)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiTweetsCreate
