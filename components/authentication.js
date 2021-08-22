const { compare } = require('bcrypt')
const { Router } = require('express')
const mysql  = require('mysql2')
const router = Router()
const {creatRefreshToken, creatAccessToken} = require('./tokens')


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

         connection.query(`SELECT * FROM user WHERE (email = '${email}')`, async (error, result) => {
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
         }else{
            return new Promise( async (resolve, reject) => {
               
               connection.query(`SELECT * FROM user WHERE (login = '${login}')`, async (error, result) => {
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

         const setToken = await creatAccessToken(result[0].id)
         const refreshToken = await creatRefreshToken(result[0].id)
         const connection = await mysql.createConnection({

            host: "localhost",
            user: "root",
            database: "site",
            password: ""
      
         }).promise()
         if(login === undefined){
            await connection.query(`UPDATE user SET token ='${refreshToken}'  WHERE email = '${email}'`)
            .then(()=> {
               res.status(200).send('Добро пожаловать!')
            })
            .catch((error) => {
               res.status(500).send('неизвестная ошибка')
            })
            .finally(()=> {
               connection.end()
            })
         }
         if(email === undefined){
            await connection.query(`UPDATE user SET token ='${refreshToken}'  WHERE login = '${login}'`)
            .then(()=> {
               res.status(200).send('Добро пожаловать!')
            })
            .catch((error) => {
               console.log(error)
               res.status(500).send('неизвестная ошибка')
            })
            .finally(()=> {
               connection.end()
            })
         }else{
            connection.end()
            res.status(500).send('неизвестная ошибка')
         }
      })
      .catch((error) => {
         console.log(error)
         res.status(403).send('логин или пароль не совпадают')
      })
   }
})


module.exports = router