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

const sendAccessToken = ( res, req, accessToken ) => {
   if(req.body.email === undefined){
      res.send({
         accessToken,
         login: req.body.login
      })
   }
   if(req.body.login === undefined){
   res.send({
         accessToken,
         email: req.body.email
      })
   }  
}

const sendRefreshToken = (res, refreshToken ) => {
   res.cookie('refreshToken' , refreshToken , {
      httpOnly: true,
      path: '/refresh',
   })
}


module.exports = {
   creatAccessToken,
   creatRefreshToken,
   sendAccessToken,
   sendRefreshToken
}