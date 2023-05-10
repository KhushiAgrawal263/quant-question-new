const express = require('express');
const dotenv = require('dotenv');
const {mongoose} = require('mongoose');
const bodyParser = require('body-parser')
const {JWT_SECRET,MOGOURI} = require('./config/keys')
const cors = require('cors');
const app = express();

// imports

const authController = require('./routes/auth')
const questionsController = require('./routes/questions');
const userController = require('./routes/user');
const categoryController = require('./routes/category');
const resourceController = require('./routes/resource');

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(MOGOURI,()=>{
    console.log("DB connection successful!!!");
})

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

app.use('/auth',authController);
app.use('/question',questionsController);
app.use('/user',userController);
app.use('/category',categoryController);
app.use('/resources',resourceController);

if(process.env.NODE_ENV == "production"){
    const path = require('path');
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(8000,()=>{
    console.log(`Server is listening at 8000`);
})