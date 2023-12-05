import express from 'express'
// import dotenv from 'dotenv';
import { Register, login, logout } from './controllers/user.js';
import { errorMiddleware } from './middleware/error.js';
import { connectDB } from './data/database.js';
import { addTaskToList, deleteList, getMyList, newList } from './controllers/list.js';
import { isAuthenticated } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config({
    path: "./data/config.env"
})
// console.log('Environment variables configured:', process.env);

connectDB();

export const app = express();

//using middleware
app.use(express.json())
app.use(cookieParser());


//Routes
app.get('/health', (req, res) => {
    try {
        const currentDate = new Date().toLocaleString();
        // Response when everything is fine
        res.status(200).json({
            status: 'OK',
            servername: 'Weeklist',
            currentDateAndTime: currentDate,
        });
    } catch (error) {
        console.error('Error in /health endpoint:', error);
        res.status(500).json({
            status: 'Error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});


app.get("/", (req, res) => {
    res.send("Nice")
})

app.post("/register", Register)

app.post("/login", login)

app.post("/newlist", isAuthenticated, newList)

app.get("/getmylist", isAuthenticated, getMyList)

app.get("/logout", logout);

app.delete("/:id/delete", isAuthenticated, deleteList);

app.post("/add-task/:id", isAuthenticated, addTaskToList);





app.use((req, res, next) => {
    res.status(404).send("Not Found ");
});

app.use(errorMiddleware)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is working on port: ${port} `)
})