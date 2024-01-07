import express from 'express';
import useRoute from './src/routes/user.route.js';

const app = express();

const port = 8080

app.use(express.json());
app.use('/', useRoute);


app.listen(port, () => console.log(`App listening on port: http://localhost:${port}`));