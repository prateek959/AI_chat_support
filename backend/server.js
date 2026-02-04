import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './middleware/error.middleware.js'
import { msgRoute } from './routes/message.route.js';
import { db } from './connection/db.connect.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin:"*"
}));


app.use('/chat', msgRoute);


app.use(errorHandler)

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
    await db();
    console.log(`Server is running on ${PORT}`)
});


