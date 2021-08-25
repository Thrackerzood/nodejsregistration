
import { useEffect, useState } from 'react';
import Footer from './components/footer';
import Nav from './components/nav';
import { UserContext } from './context/context';
import checkRefreshToken from './middleware/refreshToken';




export default function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    ( async ()=> {
      let result = await checkRefreshToken()
      await setUser({
        accessToken: result
      })
    })()
   
  }, []);

  return (<UserContext.Provider value={[user, setUser]}>
    <Nav />
    <Footer />
  </UserContext.Provider>);  
}
