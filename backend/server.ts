import express from 'express';
import cors from 'cors';
import corsOptions from './options/corsOptions';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import imgRouter from './routers/imgRouter';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.set('trust proxy', 1);

//MiddleWares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./'));

//Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-HTTP-Method-Override',
  );
  next();
});

//Routers
app.use('/api/images', imgRouter);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Page not found...' });
});

app.listen(port, () => {
  console.log(`[server]: running at port: ${port}`);
});

export default app;
