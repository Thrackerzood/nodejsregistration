const { sign } = require('jsonwebtoken')

const creatAccessToken = (userId) => {
   return sign ({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
   })
}

const creatRefreshToken = (userId) => {
   return sign ({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d'
   })
}

module.exports = {
   creatAccessToken,
   creatRefreshToken
}