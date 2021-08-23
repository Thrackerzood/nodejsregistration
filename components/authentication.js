const { compare } = require('bcrypt')
const { Router } = require('express')
const mysql  = require('mysql2')
const router = Router()
const { creatRefreshToken , creatAccessToken , sendAccessToken , sendRefreshToken } = require('./tokens')


router.post('/', async (req, res) => {

   const connection = await mysql.createConnection({

      host: "localhost",
      user: "root",
      database: "site",
      password: ""

   })

   const { email , login , password } = await req.body
   if((email === undefined && login === undefined) || password === undefined){

      await res.status(400).send('Данные введены неверно')

   }else{
   let result = () => {

      if(login === undefined){
      return new Promise( async (resolve, reject) => {

         connection.query(`SELECT * FROM user WHERE email = '${email}'`, async (error, result) => {
            await connection.end()
            if(error){

               reject(error)
            }else{
               
               const valid = await compare(password, result[0].password.trim())
               
               if(!valid){
                  
                  reject(error)
               }else{

                  resolve(result)
               }
            }
         })
      })
   }
      if(email === undefined){

      return new Promise( async (resolve, reject) => {

         connection.query(`SELECT * FROM user WHERE login = '${login}'`, async (error, result) => {
            await connection.end()
            if(error){

               reject(error)
            }else{
               
               const valid = await compare(password, result[0].password.trim())

               if(!valid){

                  reject(error)
               }else{

                  resolve(result)
               }
            }
         })
      })
   }
   }
   
   result()
   .then( async (result) => {

         const accessToken = await creatAccessToken(result[0].email)
         const refreshToken = await creatRefreshToken(result[0].email)
         
         // задаем токен
         const connection = await mysql.createConnection({

            host: "localhost",
            user: "root",
            database: "site",
            password: ""
      
         }).promise()

            // добавляем токен
            await connection.query(`UPDATE user SET token ='${refreshToken}'  WHERE email = '${result[0].email}'`)
            .then(async ()=> {
               await sendRefreshToken( res , refreshToken )

               await sendAccessToken( res, req, accessToken )
            })
            .catch((error) => {

               res.status(500).send('неизвестная ошибка')
            })
            .finally(()=> {

               connection.end()
            })
   })
   .catch((error) => {

         res.status(403).send('логин или пароль не совпадают')
   })
   }
})

module.exports = router