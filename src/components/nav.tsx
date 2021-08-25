import  { UserContext }  from '../context/context'
import { useContext } from 'react';
import {BrowserRouter as Router , Route , Switch , NavLink } from "react-router-dom";
import Account from "../page/account";
import Home from "../page/home";
import LogOut from "../page/logOut";
import Registration from "../page/registration";
import { NavS } from "../style/style";

export default function Nav() {

   const [user] = useContext(UserContext)

  return (
   <Router>
      <NavS>
        <nav>
           <ul>              
              <li>
                 <NavLink to='/' activeClassName='active' exact ><p>Домашняя</p></NavLink>
              </li>

              <li>
                 { user.accessToken ? <NavLink  to='/account' activeClassName='active' ><p> Аккаунт </p></NavLink>

                 : <NavLink  to='/login' activeClassName='active' ><p> Войти </p></NavLink> }

              </li>

              { user.accessToken ? <li>

                  <NavLink  to='/logout' activeClassName='active' ><p>Выход</p></NavLink>

              </li> : '' }
           </ul>
        </nav>

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


      </NavS> 
   </Router>)
   
}