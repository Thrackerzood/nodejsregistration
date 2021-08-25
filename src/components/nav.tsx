import  { UserContext }  from '../context/context'
import { useContext } from 'react';
import {BrowserRouter as Router , Route , Switch , NavLink } from "react-router-dom";
import Account from "../page/account";
import Home from "../page/home";
import LogOut from "../page/logOut";
import Registration from "../page/registration";
import { NavS } from "../style/style";
import { useEffect } from 'react';
import { useState } from 'react';

export default function Nav() {

   const [user] = useContext(UserContext)
   const [data, setData] = useState({data : ''})

   useEffect(() => {
      ( async () => {
      let result = await (await fetch('http://localhost:3300/protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: user.accessToken.accessToken,
          },
        })).json();
        await setData(result)
      })()
    }, [user])
    
    console.log(user.accessToken.accessToken)
  return (
   <Router>
      <NavS>
        <nav>
           <ul>              
              <li>
                 <NavLink to='/' activeClassName='active' exact ><p>Домашняя</p></NavLink>
              </li>

              <li>
                 { user.accessToken.accessToken === '' ? <NavLink  to='/login' activeClassName='active' ><p> Войти </p></NavLink>

                 : <NavLink  to='/account' activeClassName='active' ><p> Аккаунт </p></NavLink> }

              </li>

              { user.accessToken.accessToken === '' ? null : <li>

                  <NavLink  to='/logout' activeClassName='active' ><p>Выход</p></NavLink>

              </li> }
           </ul>
        </nav>

      </NavS> 

      <Switch>

         <Route path='/account' >
            <Account />
         </Route>
         <Route path='/login' >
            <Registration />
         </Route>

         <Route path='/logout' >
            <LogOut />
         </Route>

         <Route path="/" >
            <Home />
         </Route>

      </Switch>

   </Router>)
}