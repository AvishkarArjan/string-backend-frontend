// Constants.js
const prod = {
    url: {
     API_URL: 'https://string-backend-server.onrender.com',}
   };
   const dev = {
    url: {
     API_URL: 'https://string-backend-server.onrender.com'
    }

   };
   export const config = process.env.NODE_ENV === 'development' ? dev : prod;