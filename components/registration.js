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

   const { date_registration , name , email , password } = await req.body
   await console.log(date_registration , name , email , password)
   
   try{

      const hashedPassword = await hash( password , 10 )
      
      await connection.query(`INSERT user( name , email , date_registration , password , folder) VALUES( '${name}' , '${email}' , '${date_registration}' ,' ${hashedPassword}' , '${ name }' ) `)
      .then( async () => {

         await connection.end()
         await res.send({message: 'Регистрация прошла успешно!'})

      }).catch( async ( error ) => {
         
         if(error.message.match(/Duplicate entry/)){

            await connection.end()
            await res.send({message: 'Такой логин или пароль уже зарегестрированы!'})

         }else{

            await connection.end()
            await res.send({message: 'Неизвестная ошибка'})
            
         }
      })

   }catch ( error ) {

      await connection.end()
      await res.send({message: 'Неизвестная ошибка'})

   }
})

module.exports = router