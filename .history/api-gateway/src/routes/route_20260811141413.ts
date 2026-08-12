import express, { Request, Response } from 'express';
const app = express();

app.get('/api/users/:id',(req:Request,res:Response)=>{
    
const userId = req.params.id;
const user ={
    id:userId,
    name:"",
    password:"",
}
if(!user === null || !user === undefined)
{
    res.status(404).json({
        message:"user not found"
    });
}
});


app.post('/api/users',(req:Request,res:Response)=>{
 const {name,password} = req.body;
 const user = {
    id:Math.floor(Math.random()*1000).toString(),
    name:name,
    password:password
 };
 if(!user == null || !user == undefined)
 {
     res.status(400).json({
         message:"Invalid user data"
     });
 }
 user.save().then(()=>{
    res.status(201).json({
        message:"user  created "
 })

})
});
