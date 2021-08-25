import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";


export default function Registration() {

   const [state, setState] = useState(true)
   
   return (<>

   <span onClick={() => setState(true)}>Вход</span> <span onClick={() => setState(false)}>Регистрация</span>

   {state ? <Login/> : <Register/>}
   </>)
    
}