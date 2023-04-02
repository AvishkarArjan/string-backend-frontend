// Constants.js
const prod = {
    url: {
     API_URL: 'https://string-backend-server.vercel.app',}
   };
   const dev = {
    url: {
     API_URL: 'https://string-backend-server.vercel.app'
    }

   };
   export const config = process.env.NODE_ENV === 'development' ? dev : prod;
  //  https://string-backend-server.onrender.com