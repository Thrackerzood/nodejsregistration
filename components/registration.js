const { hash } = require('bcrypt')
const { Router } = require('express')
const mysql  = require('mysql2')
const router = Router()


router.post('/', async (req, res) => {

   const connection = await mysql.createConnection({
      
      host: "localhost",
      user: "root",
      database: "site",
      password: ""

   }).promise()

   const { date_registration , login , email , password } = await req.body
   
   try{

      const hashedPassword = await hash( password , 10 )
      
      await connection.query(`INSERT user( login , email , date_registration , password , folder) VALUES( '${login}' , '${email}' , '${date_registration}' ,' ${hashedPassword}' , '${ login }' ) `)
      .then( async () => {

         await connection.end()
         await res.status(201).send({message: 'Регистрация прошла успешно!'})

      }).catch( async ( error ) => {
         
         if(error.message.match(/Duplicate entry/)){

            await connection.end()
            await res.status(304).send({message: 'Такой логин или email уже используются!'})

         }else{

            await connection.end()
            await res.status(500).send({message: 'Неизвестная ошибка'})
            
         }
      })

   }catch ( error ) {

      await connection.end()
      await res.status(500).send({message: 'Неизвестная ошибка'})

   }
})

module.exports = router