const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PinsRoute = require("./routes/pins");
const UsersRoute = require("./routes/users");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
});

PORT= process.env.PORT || 5000

app.use("/api/pins", PinsRoute);
app.use("/api/users", UsersRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
