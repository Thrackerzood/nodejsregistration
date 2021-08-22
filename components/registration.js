const { hash } = require('bcrypt')
const { Router } = require('express')
const mysql  = require('mysql2')
const router = Router()


router.post('/', async (req, res) => {
   

   const { date_registration , login , email , password } = await req.body


   if(date_registration === undefined || login === undefined || email === undefined || password === undefined){

      res.status(401).send({message: 'Данные введены не корректно!'})
      
   }else{

      const connection = await mysql.createConnection({
         host: "localhost",
         user: "root",
         database: "site",
         password: ""
      }).promise()

   try{

      const hashedPassword = await hash( password , 10 )
      
      await connection.query(`INSERT user( login , email , date_registration , password , folder , token) VALUES( '${login}' , '${email}' , '${date_registration}' ,' ${hashedPassword}' , '${ login }', ' ' ) `)
      .then( async () => {

         await connection.end()
         await res.status(201).send({message: 'Регистрация прошла успешно!'})

      }).catch( async ( error ) => {
         if(/Duplicate entry/.test(error.message) === true){

            await connection.end()
            await res.status(417).send({message: 'Такой логин или пароль уже зарегестрированы!'})
         }else{

            await connection.end()
            await res.status(403).send({message: 'Неизвестная ошибка'})
         }
      })

   }catch ( error ) {

      console.log(error)

      }
   }
})

module.exports = router