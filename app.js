require('dotenv').config();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
//My Routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
//DataBase Connectivity
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
});
//Request Fetching
app.get("/",(req,res)=>{
    return res.send("Hello App")
});
//MiddileWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
//Port Defining
const port=process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`App is up and running at port:${port}`);
});
