import { useContext } from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "../context/context"


export default function Account() {

  const [user] = useContext(UserContext)

   if(!user.accessToken) return <Redirect from = '' to='login'/>
   
   return (<>
      a
   </>)
    
}