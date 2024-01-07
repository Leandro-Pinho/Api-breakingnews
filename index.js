import express from 'express';
import dotenv from 'dotenv';
import useRoute from './src/routes/user.route.js';
import connectDatabase from './src/database/db.js';

const app = express();
const port = 8080;

dotenv.config();

app.use(express.json());
app.use('/user', useRoute);


const username = process.env.BD_USERNAME
const password = process.env.BD_PASSWORD

connectDatabase(username, password);

app.listen(port, () => console.log(`App listening on port: http://localhost:${port}`));