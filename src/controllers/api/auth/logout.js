// src/controllers/auth/logout.js

import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiAuth = async (req, res) => {
  try {
    await req.session.destroy()

    return res.status(200).json('Successfully Logged Out!')
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuth
