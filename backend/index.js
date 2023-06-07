const express  = require('express');
const app= express();
var cors = require('cors')
app.use(cors())
const connectToMongoDB = require("./db.js");
app.use(express.json());
connectToMongoDB();

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use("/api/auth",require("./routes/auth.js"));
app.use("/api/managejobs",require("./routes/manageJobs.js"));
app.use("/api/manageprofiles",require("./routes/manageProfiles.js"));
app.use("/api/manageapplications",require("./routes/manageApplications.js"));

app.listen(process.env.PORT||5000,()=>{
    
})
