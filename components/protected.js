const { Router } = require('express')
const router = Router()
const { isAuth } = require('./isAuth')


router.post('/', async ( req , res ) => {
   try{
      const userId = isAuth(req)
      if(userId !== null){
         res.send({
            data: 'This is protected data'
         })
      }
   }catch(error){
      res.send({
         error: `${error.message}`
      })
   }
})

module.exports = router