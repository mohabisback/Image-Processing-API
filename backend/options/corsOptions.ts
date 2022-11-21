import cors from 'cors';
const options: cors.CorsOptions = {
  origin: ['https://mohabisback.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};
export default options;
