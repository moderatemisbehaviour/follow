const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

function createLoginRoute(databaseClient) {
  return async (req, res, next) => {
    if (!req.body.idToken) {
      const error = new Error('No ID token provided.')
      error.status = 400
      return next(error)
    }

    try {
      const payload = await verifyGoogleIdToken(req.body.idToken)

      const user = {
        email: payload.email,
        image: payload.picture,
        name: payload.name
      }
      const upsertedUser = await upsertUser(user)
      req.session.userId = upsertedUser._id

      setAuthCookies(payload.exp, req, res)

      return res.send()
    } catch (error) {
      return next(error)
    }

    function setAuthCookies(payloadExpiry, req, res) {
      const tokenExpiryUnixSeconds = payloadExpiry
      const expiryDate = new Date(tokenExpiryUnixSeconds * 1000)
      const now = new Date()
      const maxAge = expiryDate - now
      req.session.cookie.maxAge = maxAge

      res.cookie('isLoggedIn', true, { maxAge })
    }

    async function upsertUser(user) {
      const usersCollection = databaseClient.db.collection('users')
      const result = await usersCollection.findOneAndReplace(
        { email: user.email },
        { ...user },
        {
          returnOriginal: false, // Without this null is returned when the document does not already exist.
          upsert: true
        }
      ) // Have to shallow clone the object because insertOne mutates the original to add _id.

      return result.value
    }
  }
}

async function verifyGoogleIdToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  const payload = ticket.getPayload()
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload
}

module.exports = createLoginRoute
