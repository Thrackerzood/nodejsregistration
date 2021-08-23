const { Router } = require('express')
const { verify } = require('jsonwebtoken')
const { creatAccessToken , sendRefreshToken , creatRefreshToken } = require('./tokens')
const router = Router()
const mysql  = require('mysql2')

router.post('/', async (req, res) => {

   const token = req.cookies.refreshToken
   if(!token){
      return res.send({accessToken: ''})
   }
   let payload = null
   try{
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET)

   }catch (error){
      return res.send({ accessToken: '' })
   }
   const connection = await mysql.createConnection({

      host: "localhost",
      user: "root",
      database: "site",
      password: ""

   }).promise()
   await connection.query(`SELECT * FROM user WHERE email = '${payload.userId}'`)
   .then( async (result) => {
      if(result[0][0].token !== token){
         connection.end()
         return res.send({accessToken: ''})
      }

      const accessToken = await creatAccessToken(result[0][0].email)
      const refreshToken = await creatRefreshToken(result[0][0].email)

      await connection.query(`UPDATE user SET token ='${refreshToken}'  WHERE email = '${result[0][0].email}'`)
      .then((result) => {

         connection.end()
         sendRefreshToken(res, refreshToken)
         return res.send({ accessToken })
      })
      .catch((error) => {

         connection.end()
         return res.send({accessToken: ''})
      })

      
   })
   .catch((error) => {

      connection.end()
      res.send({accessToken: ''})
   })
})




module.exports = router