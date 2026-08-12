const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req:Request,res:Response)=>{
 res.json({
    message:"api gateway is running"
 });
});


app.listen(port,()=>{
    console.log(`${port}`);
})