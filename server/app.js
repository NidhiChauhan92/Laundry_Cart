const express = require("express");
const mongoose = require('mongoose');
const loginRoutes = require("./routes/login");
const orderRoutes = require("./routes/order");
const SECRET = "restapi";
const bodyparser = require("body-parser");
const cors = require('cors')
var jwt = require('jsonwebtoken');
const User = require("./models/register");

mongoose.connect('mongodb+srv://nidhi_chauhan:mWTLp1sOR1BoyicQ@cluster0.qjfhybk.mongodb.net/nidhiProj?retryWrites=true&w=majority');
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://laundry-cart-frontend-nine.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


app.use(cors(
  {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }
));


app.use(bodyparser.json());


app.use("/api/v1/order", (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: "failed here1",
        message: "Token is missing"
    });
    }
    const token = authorization.replace("test ", "");
    jwt.verify(token, SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: "failed here2",
          message: "Invalid token"
      });
      }
      const _id  = payload.data;
      console.log(_id,payload.data)
      await User.find({ _id:_id }).then((userdata) => {
        req.user = userdata;
        console.log(req.user,userdata,"userdata")
        next();
      });
    });
});

// MIDDLEWARE FOR GET ROUTE ON USERDETAILS FOR ORDERS PAGE//
// app.use("/api/v1/get", (req, res, next) => {
//     var token = req.headers.authorization.split("test ")[1];
//     // console.log(token)
//     if(!token){
//         return res.status(401).json({
//             status: "failed",
//             message: "Token is missing"
//         })
//     }
//     // verify the token    
//     jwt.verify(token, SECRET, async function(err, decoded) {
//         if(err){
//             return res.status(401).json({
//                 status:"failed",
//                 message: "Invalid token"
//             })
//         }
//         req.user = decoded.data;
//         console.log(req.user)
//         next();
//     });
// });

app.use("/api/v1", loginRoutes);
app.use("/api/v1", orderRoutes);

app.listen(5000, () => console.log("server is started"));