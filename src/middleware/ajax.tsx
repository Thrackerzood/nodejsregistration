export const ajax = ( url:string , method:string , body:any = '' ) => {
   return fetch( url , {
      method,
      credentials: 'include',
      headers: {
         'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body)
   })
   .then((result) => result.json())
   .then((data) => data)
}