const express = require('express');
const connectToMongo = require('./database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./Middleware/error');
connectToMongo();
const app = express();

const port = 8080;
const corsOptions = {
    origin: 'http://localhost:3000',  // frontend server
    credentials: true
};

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(errorMiddleware);

    app.use('/api/product', require('./routes/product'));
    app.use('/api/user', require('./routes/user'));

    app.listen(port,()=>{
        console.log(`Server is running on ${port}`);
    })