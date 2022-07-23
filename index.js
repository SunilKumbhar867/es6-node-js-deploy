import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoute from "./routes/user-login-route.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// });

mongoose.connect('mongodb://localhost:27017/amazona',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use('/api/users', UserRoute)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API STARTED ON ${PORT}`);
})





// app.post('/login',(req,res,next)=>{
//     const req_body = req.body;
//     console.log(req_body)
// });
