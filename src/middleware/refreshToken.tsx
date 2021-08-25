const checkRefreshToken = async () => {
   return await (await fetch('http://localhost:3300/refresh', {
     method: 'POST',
     credentials: 'include', // Needed to include the cookie
     headers: {
       'Content-Type': 'application/json',
     }
   })).json();
}

 export default checkRefreshToken