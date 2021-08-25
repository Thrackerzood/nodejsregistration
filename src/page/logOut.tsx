import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/context";

export default function LogOut() {

   const [ user , setUser] = useContext(UserContext)

   useEffect(()=> {
      (async()=> {
         await fetch('http://localhost:3300/logout/logout', 
         {
            method: 'POST',
            credentials: 'include'
         })
         setUser({accessToken : ''})
      })()
      window.location.reload();
   }, [user])

   return <Redirect from = '' to='/'/>
}