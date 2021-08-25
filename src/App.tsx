
import { useEffect, useState } from 'react';
import Footer from './components/footer';
import Nav from './components/nav';
import { UserContext } from './context/context';
import checkRefreshToken from './middleware/refreshToken';




export default function App() {

  const [user, setUser] = useState({accessToken: ''});
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ( async ()=> {
      let result = await checkRefreshToken()
      await setUser({
        accessToken: result
      })
      await setLoading(true)

      await (await fetch('http://localhost:3300/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${user.accessToken}`,
        },
      }))
    })()
   
  }, []);


  if(!loading){
    return <p>Loading...</p>
  }
  return (<UserContext.Provider value={[user, setUser]}>
    <Nav />
    <Footer />
  </UserContext.Provider>);  
}