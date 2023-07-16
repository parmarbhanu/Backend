const express = require("express");              //add express 
const app = express(); 
const mongoose = require("mongoose");            //add mongoose
// const dotenv = require("dotenv");                // add dotenv
// const cookieParser = require("cookie-parser");   //add cookies parser
const PORT = process.env.PORT || 5000;           //desfinr port
// const cors = require("cors");                    //add coros




      //add socket io
 const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);             
io.on('connection', (socket) => {
   console.log('a user connected');
 });


// dotenv.config();
// app.use(express.json());

// app.use(cors({
//     origin: [
//        "http://localhost:3000",
//     ],
//      credentials: true,
//    })
// );
// app.use(cookieParser());




// connect to mongoDB   this connect mongodb to a file named as .env
// mongoose.set('strictQuery', false)
// mongoose.connect(process.env.MDB_CONNECT) 
// .then(()=>{console.log('Mongodb connected')})
// .catch((err)=>{console.log("Error in connection",err)});





//  set up routes
// app.use("/Use",require("./router/userRouter"));

          


//return the port were our server is going to listen
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



//tahe the html content of the website from the file named as index.html ans display it on the local host
// const path=require("path");
// app.use(express.static('client/build'));
//  app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client','build','index.html'));
// });