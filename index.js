import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send("hello world")
})
const PORT = 4000;
app.listen(PORT, ()=>{
    console.log("listning on port " + PORT)
});