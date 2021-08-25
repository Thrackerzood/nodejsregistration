import { ajax } from '../middleware/ajax'

import React , { useState , useContext , useEffect } from 'react'

import { UserContext } from '../context/context'

export default function Login() {

   const [ body , setBody ] = useState({})
   const [ user , setUser ] = useContext(UserContext)
   
   const sendRequest = async() => {

     const result:any = await ajax( 'http://localhost:3300/login', 'POST', body )
     if(result.accessToken){
        setUser({
           accessToken: result.accessToken
         })
     }
     console.log(result)
   }
   
   function onchange(event:any){
      setBody({ ...body , [event.name] : event.value })
   }

   useEffect( () => {

      
    } , [user, body] )





   return (<>
      <form onSubmit={(event:any) => { 
         event.preventDefault()
         sendRequest()
         }}>
         <input type="text" onChange = { (event:any) => onchange(event.target) } name = "email" />
         <input type="password" onChange = { (event:any) => onchange(event.target)} name = "password" />
         <button type="submit">Отправить</button>
      </form>
   </>)
    
}