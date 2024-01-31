import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import connectDatabase from './src/database/db.js';

import useRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import newsRoute from './src/routes/news.route.js';
import swaggerRoute from './src/routes/swagger.route.js';

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/user', useRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/doc', swaggerRoute);

// para mostrar no navegador
app.get("/", (req, res) => res.send("Hello From Express"));
app.all("*", (req, res) => res.send("That route doesn't exist"));

const username = process.env.BD_USERNAME
const password = process.env.BD_PASSWORD

connectDatabase(username, password);

app.listen(port, () => console.log(`App listening on port: http://localhost:${port}`));